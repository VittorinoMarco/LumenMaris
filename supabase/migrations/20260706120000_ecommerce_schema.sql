-- Lumen Maris — schema ecommerce
-- Esegui in Supabase SQL Editor o via CLI: supabase db push

-- Estensioni
create extension if not exists "pgcrypto";

-- ── Prodotti ────────────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  price_cents integer not null check (price_cents >= 0),
  size text not null default '100ml',
  image_url text,
  gender text check (gender in ('uomo', 'donna', 'unisex')),
  family text,
  badge text,
  top_notes text[] default '{}',
  heart_notes text[] default '{}',
  base_notes text[] default '{}',
  stripe_price_id text,
  active boolean not null default true,
  inventory integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_active_idx on public.products (active) where active = true;

-- ── Ordini ──────────────────────────────────────────────────────────────────
create type public.order_status as enum (
  'pending',
  'paid',
  'failed',
  'cancelled',
  'refunded'
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status public.order_status not null default 'pending',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  currency text not null default 'eur',
  metadata jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_stripe_session_idx on public.orders (stripe_checkout_session_id);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_email_idx on public.orders (customer_email);

-- ── Righe ordine ────────────────────────────────────────────────────────────
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_slug text not null,
  product_name text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0),
  image_url text,
  size text,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- ── Messaggi contatti ───────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ── updated_at trigger ──────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_messages enable row level security;

-- Catalogo: lettura pubblica prodotti attivi
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (active = true);

-- Ordini: nessun accesso client (solo service role)
drop policy if exists "orders_no_public" on public.orders;
create policy "orders_no_public"
  on public.orders for all
  using (false);

drop policy if exists "order_items_no_public" on public.order_items;
create policy "order_items_no_public"
  on public.order_items for all
  using (false);

-- Contatti: insert pubblico, no read
drop policy if exists "contact_insert" on public.contact_messages;
create policy "contact_insert"
  on public.contact_messages for insert
  with check (true);

drop policy if exists "contact_no_read" on public.contact_messages;
create policy "contact_no_read"
  on public.contact_messages for select
  using (false);
