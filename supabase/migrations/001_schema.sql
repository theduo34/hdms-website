-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Database Schema
-- Migration: 001_schema.sql
-- Apply via: Supabase Dashboard > SQL Editor, or supabase db push
-- ════════════════════════════════════════════════════════════════════════════

-- ─── EXTENSIONS ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── HELPERS ─────────────────────────────────────────────────────────────────
-- Automatically keeps updated_at in sync on every UPDATE.
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ════════════════════════════════════════════════════════════════════════════
-- MEDIA
-- ════════════════════════════════════════════════════════════════════════════

-- Central registry for every image and video file.
-- storage_path is the Supabase Storage path (e.g. "gallery/events/2025/img.jpg").
-- It is null until the file is physically uploaded to storage.
-- URL construction is handled by src/lib/media.ts — never store full URLs here.
--
-- metadata shape (jsonb):
--   { photographer?: string, location?: string, caption?: string,
--     tags?: string[], event_name?: string, year?: number }
create table if not exists media_assets (
  id           uuid        primary key default gen_random_uuid(),
  storage_path text,
  alt          text        not null,
  title        text,
  width        int,
  height       int,
  mime_type    text        not null default 'image/jpeg',
  file_size    bigint,
  metadata     jsonb       not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger media_assets_updated_at
  before update on media_assets
  for each row execute function set_updated_at();

-- Hierarchical category tree (self-referential).
-- domain: 'gallery_photos' | 'gallery_videos' | 'gallery_events'
-- Top-level rows have parent_id = null.
-- Example tree:
--   Photos (domain=gallery_photos)
--   └─ School Life  (slug=school-life)
--   └─ Events       (slug=events)
--   Videos (domain=gallery_videos)
--   └─ Highlights   (slug=highlights)
create table if not exists media_categories (
  id         uuid     primary key default gen_random_uuid(),
  slug       text     unique not null,
  label      text     not null,
  parent_id  uuid     references media_categories(id) on delete set null,
  domain     text     not null,
  sort_order smallint not null default 0
);

-- A gallery photo — links a media_asset to a sub-category.
create table if not exists gallery_photos (
  id          uuid        primary key default gen_random_uuid(),
  asset_id    uuid        not null references media_assets(id) on delete cascade,
  category_id uuid        references media_categories(id) on delete set null,
  featured    boolean     not null default false,
  sort_order  smallint    not null default 0,
  created_at  timestamptz not null default now()
);

-- A gallery video (YouTube embed or future self-hosted upload).
create table if not exists gallery_videos (
  id                 uuid        primary key default gen_random_uuid(),
  thumbnail_asset_id uuid        references media_assets(id) on delete set null,
  category_id        uuid        references media_categories(id) on delete set null,
  title              text        not null,
  alt                text        not null default '',
  video_url          text        not null,
  duration           text,
  width              int,
  height             int,
  created_at         timestamptz not null default now()
);

-- An event album — a named collection of photos.
create table if not exists gallery_events (
  id             uuid        primary key default gen_random_uuid(),
  title          text        not null,
  description    text,
  event_date     date        not null,
  category_id    uuid        references media_categories(id) on delete set null,
  cover_asset_id uuid        references media_assets(id) on delete set null,
  photo_count    int         not null default 0,
  video_count    int         not null default 0,
  created_at     timestamptz not null default now()
);

-- Join table: which photos belong to which event album.
create table if not exists gallery_event_photos (
  event_id   uuid     not null references gallery_events(id) on delete cascade,
  photo_id   uuid     not null references gallery_photos(id) on delete cascade,
  sort_order smallint not null default 0,
  primary key (event_id, photo_id)
);

-- ════════════════════════════════════════════════════════════════════════════
-- CONTENT
-- ════════════════════════════════════════════════════════════════════════════

-- News posts and articles.
-- content is an array of ArticleContent: { type: 'paragraph'|'pullquote', text: string }
create table if not exists news_posts (
  id             uuid        primary key default gen_random_uuid(),
  slug           text        unique not null,
  category       text        not null, -- 'news' | 'announcement' | 'event' | 'press'
  category_label text        not null default '',
  headline       text        not null,
  excerpt        text        not null default '',
  author         text        not null default '',
  cover_asset_id uuid        references media_assets(id) on delete set null,
  content        jsonb       not null default '[]',
  featured       boolean     not null default false,
  published_at   timestamptz not null default now()
);

-- Sidebar announcements (separate from news posts).
create table if not exists announcements (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  description   text        not null default '',
  urgency       text        not null, -- 'new' | 'urgent' | 'info' | 'reminder'
  urgency_label text        not null default '',
  posted_at     timestamptz not null default now(),
  expires_at    timestamptz            -- null = never expires
);

-- ════════════════════════════════════════════════════════════════════════════
-- CALENDAR
-- ════════════════════════════════════════════════════════════════════════════

-- Academic terms and breaks for the school year.
create table if not exists academic_terms (
  id         text    primary key, -- e.g. "term-1-2026"
  name       text    not null,
  start_date date    not null,
  end_date   date    not null,
  is_current boolean not null default false,
  is_break   boolean not null default false
);

-- School calendar events.
-- category: 'academic' | 'event' | 'holiday' | 'exam' | 'sports' | 'cultural'
create table if not exists calendar_events (
  id             text    primary key, -- e.g. "ev-001"
  title          text    not null,
  date           date    not null,
  end_date       date,
  time           text,
  end_time       text,
  location       text,
  category       text    not null,
  category_label text    not null,
  description    text,
  is_all_day     boolean not null default false,
  is_highlight   boolean not null default false
);

-- ════════════════════════════════════════════════════════════════════════════
-- SCHOOL DATA
-- ════════════════════════════════════════════════════════════════════════════

-- Staff and leadership team members.
create table if not exists staff_members (
  id         uuid     primary key default gen_random_uuid(),
  name       text     not null,
  role       text     not null,
  department text,
  bio        text,
  initials   text,
  asset_id   uuid     references media_assets(id) on delete set null,
  sort_order smallint not null default 0,
  is_active  boolean  not null default true
);

-- Admissions frequently asked questions.
create table if not exists admissions_faqs (
  id         uuid     primary key default gen_random_uuid(),
  question   text     not null,
  answer     text     not null,
  sort_order smallint not null default 0
);

-- Dynamic school configuration (contact info, open day, etc.).
-- Accessed as: select value from school_settings where key = 'admissions_phone_1'
create table if not exists school_settings (
  key        text        primary key,
  value      text        not null,
  updated_at timestamptz not null default now()
);
create trigger school_settings_updated_at
  before update on school_settings
  for each row execute function set_updated_at();
