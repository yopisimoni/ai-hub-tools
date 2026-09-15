-- AI Ops Router: Supabase persistence schema
-- Run this in the Supabase SQL editor for the project used by the demo.

create table if not exists public.automation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  requester_name text not null,
  requester_email text not null,
  request_text text not null,
  category text not null,
  priority text not null check (priority in ('low', 'medium', 'high', 'urgent')),
  summary text not null,
  suggested_action text not null,
  destination text not null,
  status text not null default 'new'
);

create index if not exists automation_requests_created_at_idx
  on public.automation_requests (created_at desc);

create index if not exists automation_requests_priority_idx
  on public.automation_requests (priority);

alter table public.automation_requests enable row level security;

-- No public insert/select policy is intentionally created.
-- The Next.js server route writes with SUPABASE_SERVICE_ROLE_KEY.
-- Keep that key server-side and never expose it to the browser.
