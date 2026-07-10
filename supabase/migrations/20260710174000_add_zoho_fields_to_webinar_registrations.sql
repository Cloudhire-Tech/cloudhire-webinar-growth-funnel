alter table public.webinar_registrations
  add column if not exists zoho_webinar_id text,
  add column if not exists zoho_attendee_id text,
  add column if not exists zoho_join_url text,
  add column if not exists zoho_registration_status text not null default 'pending';

create index if not exists webinar_registrations_zoho_registration_status_idx
  on public.webinar_registrations (zoho_registration_status);
