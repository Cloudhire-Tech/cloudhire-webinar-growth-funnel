-- Payment fields for paid webinar registration (Razorpay).

alter table public.webinar_registrations
  add column if not exists payment_status text not null default 'pending',
  add column if not exists payment_amount integer,
  add column if not exists payment_currency text,
  add column if not exists payment_provider text,
  add column if not exists payment_order_id text,
  add column if not exists payment_reference text,
  add column if not exists payment_completed_at timestamptz;

-- Preserve previously completed (pre-payment) registrations as paid.
update public.webinar_registrations
set
  payment_status = 'paid',
  payment_amount = coalesce(payment_amount, 0),
  payment_currency = coalesce(payment_currency, 'INR'),
  payment_provider = coalesce(payment_provider, 'legacy_free'),
  payment_completed_at = coalesce(payment_completed_at, registered_at)
where
  payment_status = 'pending'
  and (
    zoho_registration_status = 'registered'
    or zoho_join_url is not null
  );

create index if not exists webinar_registrations_payment_order_id_idx
  on public.webinar_registrations (payment_order_id)
  where payment_order_id is not null;

create index if not exists webinar_registrations_payment_status_idx
  on public.webinar_registrations (payment_status);
