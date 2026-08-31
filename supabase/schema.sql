-- ============================================================================
-- Grow Digital Branding — lead inbox schema
--
-- Run this once in the Supabase SQL editor (Dashboard > SQL Editor > New
-- query > paste > Run). It is idempotent, so re-running it is safe.
--
-- Design note: leads are written by the server using the service role key,
-- which bypasses RLS. Every policy below therefore governs what a signed-in
-- person can see and change, never how a lead gets in.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
do $$ begin
  create type user_role as enum ('admin', 'telecaller');
exception when duplicate_object then null; end $$;

-- The stages a real enquiry actually moves through. Kept deliberately short:
-- a status list nobody maintains is worse than none.
do $$ begin
  create type lead_status as enum (
    'new', 'contacted', 'qualified', 'site_visit', 'booked', 'lost'
  );
exception when duplicate_object then null; end $$;

-- Whether the lead reached Make. Separate from status, because delivery is
-- about our plumbing and status is about the buyer.
do $$ begin
  create type delivery_state as enum ('pending', 'delivered', 'failed');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- profiles — one row per person who can sign in, carrying their role
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users on delete cascade,
  email      text not null,
  full_name  text,
  role       user_role not null default 'telecaller',
  created_at timestamptz not null default now()
);

-- New sign-ups become telecallers. The first admin is promoted by hand, in
-- the SQL editor, so there is no path from "can sign up" to "can read the
-- webhook credential".
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  whatsapp        text not null,
  project         text not null,
  source          text not null default 'unknown',
  status          lead_status not null default 'new',
  assigned_to     uuid references public.profiles(id) on delete set null,
  delivery_status delivery_state not null default 'pending',
  delivery_error  text,
  submitted_at    timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- The inbox is always read newest first, and the two filters that matter are
-- status and delivery. Indexed so the list stays fast as volume grows.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_delivery_idx on public.leads (delivery_status);

-- ---------------------------------------------------------------------------
-- lead_notes — the follow-up trail
-- ---------------------------------------------------------------------------
create table if not exists public.lead_notes (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads(id) on delete cascade,
  author_id  uuid references public.profiles(id) on delete set null,
  body       text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx
  on public.lead_notes (lead_id, created_at desc);

-- ---------------------------------------------------------------------------
-- settings — small key/value store. Holds the Make webhook URL.
-- ---------------------------------------------------------------------------
create table if not exists public.settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_touch_updated_at on public.leads;
create trigger leads_touch_updated_at
  before update on public.leads
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- Every table is locked by default. These tables hold real people's names and
-- phone numbers, so "no policy" must mean "no access", never "all access".
-- ---------------------------------------------------------------------------
alter table public.profiles   enable row level security;
alter table public.leads      enable row level security;
alter table public.lead_notes enable row level security;
alter table public.settings   enable row level security;

-- Asking "is this user an admin?" from inside a profiles policy would re-enter
-- profiles and recurse. security definer reads the table without re-checking
-- the policy, which breaks the cycle.
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- profiles ------------------------------------------------------------------
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles" on public.profiles
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- leads ---------------------------------------------------------------------
-- Both roles work the inbox: that is the point of the dashboard.
drop policy if exists "signed in can read leads" on public.leads;
create policy "signed in can read leads" on public.leads
  for select to authenticated using (true);

drop policy if exists "signed in can update leads" on public.leads;
create policy "signed in can update leads" on public.leads
  for update to authenticated using (true) with check (true);

-- Deleting a lead destroys the only record of an enquiry, so it is an admin
-- action. There is no insert policy at all: leads arrive through the server's
-- service role, never from a browser.
drop policy if exists "admins delete leads" on public.leads;
create policy "admins delete leads" on public.leads
  for delete to authenticated using (public.is_admin());

-- lead_notes ----------------------------------------------------------------
drop policy if exists "signed in read notes" on public.lead_notes;
create policy "signed in read notes" on public.lead_notes
  for select to authenticated using (true);

-- A note is signed by whoever wrote it. The check stops anyone filing a note
-- under a colleague's name.
drop policy if exists "signed in write notes" on public.lead_notes;
create policy "signed in write notes" on public.lead_notes
  for insert to authenticated with check (author_id = (select auth.uid()));

drop policy if exists "authors delete own notes" on public.lead_notes;
create policy "authors delete own notes" on public.lead_notes
  for delete to authenticated
  using (author_id = (select auth.uid()) or public.is_admin());

-- settings ------------------------------------------------------------------
-- The Make webhook URL is a write credential: anyone holding it can inject
-- leads into the scenario. Admins only, for both reading and writing.
drop policy if exists "admins read settings" on public.settings;
create policy "admins read settings" on public.settings
  for select to authenticated using (public.is_admin());

drop policy if exists "admins write settings" on public.settings;
create policy "admins write settings" on public.settings
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- After running this:
--
--   1. Authentication > Users > Add user  (your own email + password)
--   2. Promote yourself, replacing the address below:
--
--      update public.profiles set role = 'admin' where email = 'you@example.com';
--
--   3. Sign in at /admin and paste the Make webhook URL under Settings.
-- ---------------------------------------------------------------------------
