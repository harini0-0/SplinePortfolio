-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

-- Enables pgvector — the extension that lets Postgres store and search vectors.
create extension if not exists vector;

-- One row per knowledge-base chunk. `embedding` holds the 768-number vector
-- produced by Gemini's text-embedding-004 model.
create table if not exists knowledge_chunks (
  id text primary key,
  category text not null,
  content text not null,
  embedding vector(768),
  created_at timestamptz default now()
);

-- Similarity search function: given a question's embedding, returns the
-- `match_count` chunks whose vectors are closest to it (cosine distance).
-- No ivfflat index needed at this scale (~20 chunks) — exact search over
-- that few rows is instant. Add one later only if the knowledge base grows
-- into the thousands of chunks.
create or replace function match_knowledge_chunks(
  query_embedding vector(768),
  match_count int default 4
)
returns table (
  id text,
  category text,
  content text,
  similarity float
)
language sql stable
as $$
  select
    id,
    category,
    content,
    1 - (embedding <=> query_embedding) as similarity
  from knowledge_chunks
  order by embedding <=> query_embedding
  limit match_count;
$$;
