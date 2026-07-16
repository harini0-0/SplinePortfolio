// One-time (or re-run-on-change) script: embeds every chunk in knowledge-base.json
// via Gemini's embedding model, then writes {id, category, content, embedding} into
// Supabase. Re-run this any time knowledge-base.json changes.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load secrets from the root .env.local (this script lives in rag/, project root is one level up).
config({ path: join(__dirname, '..', '.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

for (const [name, val] of Object.entries({ GEMINI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY })) {
  if (!val) {
    console.error(`Missing ${name} in .env.local — aborting.`);
    process.exit(1);
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function embed(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/gemini-embedding-001',
      content: { parts: [{ text }] },
      outputDimensionality: 768,
    }),
  });
  if (!res.ok) {
    throw new Error(`Gemini embed failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.embedding.values; // array of 768 floats
}

async function main() {
  const chunks = JSON.parse(readFileSync(join(__dirname, 'knowledge-base.json'), 'utf-8'));
  console.log(`Embedding ${chunks.length} chunks...`);

  for (const chunk of chunks) {
    const embedding = await embed(chunk.text);

    const { error } = await supabase
      .from('knowledge_chunks')
      .upsert({
        id: chunk.id,
        category: chunk.category,
        content: chunk.text,
        embedding,
      });

    if (error) {
      console.error(`Failed to upsert ${chunk.id}:`, error.message);
    } else {
      console.log(`✓ ${chunk.id}`);
    }
  }

  console.log('Done.');
}

main();
