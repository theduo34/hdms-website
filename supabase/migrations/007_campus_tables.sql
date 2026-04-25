-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Campus Content Tables
-- Migration: 007_campus_tables.sql
-- ════════════════════════════════════════════════════════════════════════════

-- ─── CAMPUS PHOTO STRIP ──────────────────────────────────────────────────────
-- Powers the scrolling photo strip on the home page landing section.
-- caption format: "Title · Location" (split on · in the frontend)
create table if not exists campus_photo_strip (
  id          uuid        primary key default gen_random_uuid(),
  asset_id    uuid        not null references media_assets(id) on delete cascade,
  caption     text        not null default '',
  sort_order  int         not null default 0,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists campus_photo_strip_sort_idx on campus_photo_strip(sort_order);

-- ─── CAMPUS FACILITIES ───────────────────────────────────────────────────────
-- Powers the three facility sections on /campus-life/facilities:
--   section = 'learning' | 'outdoor' | 'support'
create table if not exists campus_facilities (
  id          uuid        primary key default gen_random_uuid(),
  section     text        not null check (section in ('learning', 'outdoor', 'support')),
  name        text        not null,
  description text        not null default '',
  asset_id    uuid        not null references media_assets(id) on delete cascade,
  sort_order  int         not null default 0,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists campus_facilities_section_idx on campus_facilities(section, sort_order);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
alter table campus_photo_strip enable row level security;
alter table campus_facilities   enable row level security;

-- Public read (same pattern as gallery tables)
create policy "campus_photo_strip_public_read"
  on campus_photo_strip for select
  using (is_active = true);

create policy "campus_facilities_public_read"
  on campus_facilities for select
  using (is_active = true);

-- Service role bypasses RLS — admin routes use the service client
