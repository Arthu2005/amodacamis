-- A Moda Camis: estrutura do banco (Supabase / Postgres)
-- Rode no SQL Editor do Supabase. Leitura é pública; escrita só para a equipe cadastrada em public.admins.

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text,
  created_at timestamptz default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.home_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.collections (
  id text primary key,
  slug text unique not null,
  name text not null,
  intro text default '',
  cover jsonb,
  cover_is_provisional boolean default false,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists public.products (
  id text primary key default gen_random_uuid()::text,
  slug text unique not null,
  name text not null,
  name_to_confirm boolean default false,
  category text not null,
  subcategory text,
  description text default '',
  price numeric(10,2),               -- null = "Consulte o valor"
  compare_at_price numeric(10,2),
  sizes text[] default '{}',
  colors text[] default '{}',
  availability text not null default 'disponivel'
    check (availability in ('disponivel', 'sob-consulta', 'esgotado')),
  images jsonb not null default '[]'::jsonb, -- [{src, alt, credit}]
  is_new boolean default false,
  is_featured boolean default false,
  brand text,
  instagram_url text,
  active boolean default true,
  published_at date default current_date,
  updated_at timestamptz default now()
);

create table if not exists public.product_collections (
  product_id text references public.products (id) on delete cascade,
  collection_id text references public.collections (id) on delete cascade,
  primary key (product_id, collection_id)
);

create table if not exists public.instagram_posts (
  id text primary key,
  url text not null,
  image jsonb not null,
  date date not null
);

-- RLS
do $$
declare t text;
begin
  foreach t in array array['site_settings','home_content','collections','products','product_collections','instagram_posts'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "leitura publica" on public.%I', t);
    execute format('create policy "leitura publica" on public.%I for select using (true)', t);
    execute format('drop policy if exists "escrita admin" on public.%I', t);
    execute format('create policy "escrita admin" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

alter table public.admins enable row level security;
drop policy if exists "admin ve admins" on public.admins;
create policy "admin ve admins" on public.admins for select using (public.is_admin());

-- Armazenamento de imagens
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media leitura publica" on storage.objects;
create policy "media leitura publica" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media escrita admin" on storage.objects;
create policy "media escrita admin" on storage.objects for all
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());
