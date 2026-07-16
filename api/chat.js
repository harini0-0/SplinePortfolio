// Vercel serverless function — the actual RAG endpoint.
// Flow: embed the question (Gemini) -> vector search (Supabase/pgvector) ->
// stuff top matches into a Claude prompt -> return the generated answer.

import { createClient } from '@supabase/supabase-js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Gemini occasionally returns 503 "high demand" — transient, not a real failure.
// Retry a couple times with a short backoff before giving up.
async function fetchWithRetry(url, options, retries = 2) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    const retryable = res.status === 503 || res.status === 429;
    if (!retryable || attempt >= retries) return res;
    await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
  }
}

async function embedQuestion(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;
  const res = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/gemini-embedding-001',
      content: { parts: [{ text }] },
      outputDimensionality: 768,
    }),
  });
  if (!res.ok) throw new Error(`Gemini embed failed: ${await res.text()}`);
  const data = await res.json();
  return data.embedding.values;
}

async function retrieveContext(questionEmbedding) {
  const { data, error } = await supabase.rpc('match_knowledge_chunks', {
    query_embedding: questionEmbedding,
    match_count: 4,
  });
  if (error) throw new Error(`Supabase search failed: ${error.message}`);
  return data; // [{ id, category, content, similarity }, ...]
}

async function generateAnswer(question, contextChunks) {
  const context = contextChunks
    .map(c => `[${c.category}] ${c.content}`)
    .join('\n\n');

  const prompt = `You are Harini Thirunavukkarasan's AI assistant, embedded in her portfolio site. You answer questions recruiters and visitors ask about her background, experience, and projects.

Rules:
- Answer ONLY using the context provided below. Do not invent details that aren't there.
- If the context doesn't contain the answer, say you don't have that information and suggest they ask Harini directly.
- Speak about Harini in the third person ("she built...", "her experience includes...").
- Be conversational and concise, not a dry list. Write like a knowledgeable colleague, not a search engine.

Context:
${context}

Question: ${question}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) throw new Error(`Gemini generate failed: ${await res.text()}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text.trim();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question } = req.body || {};
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing "question" in request body' });
  }

  try {
    const questionEmbedding = await embedQuestion(question);
    const contextChunks = await retrieveContext(questionEmbedding);
    const answer = await generateAnswer(question, contextChunks);
    return res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
