-- Webinar registration records for the recurring landing page funnel.

create table if not exists public.webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  whatsapp_number text not null,
  webinar_date date not null,
  webinar_time text not null,
  webinar_join_url text not null,
  registered_at timestamptz not null default now(),
  source text not null default 'webinar_landing_page',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists webinar_registrations_email_webinar_date_idx
  on public.webinar_registrations (lower(email), webinar_date);

create or replace function public.set_webinar_registrations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists webinar_registrations_updated_at on public.webinar_registrations;

create trigger webinar_registrations_updated_at
  before update on public.webinar_registrations
  for each row
  execute function public.set_webinar_registrations_updated_at();

alter table public.webinar_registrations enable row level security;

create index if not exists webinar_registrations_registered_at_idx
  on public.webinar_registrations (registered_at desc);

create index if not exists webinar_registrations_webinar_date_idx
  on public.webinar_registrations (webinar_date desc);
