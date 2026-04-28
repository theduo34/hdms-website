-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Parent Testimonials
-- Migration: 009_parent_testimonials.sql
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists parent_testimonials (
  id           uuid        primary key default gen_random_uuid(),
  parent_name  text        not null,
  child_year   text        not null default '',
  quote        text        not null,
  asset_id     uuid        references media_assets(id) on delete set null,
  is_active    boolean     not null default true,
  sort_order   int         not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists parent_testimonials_active_sort_idx
  on parent_testimonials(sort_order) where is_active = true;

create trigger parent_testimonials_updated_at
  before update on parent_testimonials
  for each row execute function set_updated_at();

-- ─── RLS ─────────────────────────────────────────────────────────────────────
alter table parent_testimonials enable row level security;

-- Public: only active testimonials are readable
create policy "parent_testimonials_public_read"
  on parent_testimonials for select
  using (is_active = true);

-- Service role bypasses RLS for admin writes

-- ─── SEED ────────────────────────────────────────────────────────────────────
-- Migrates the 5 hardcoded entries from src/features/home/index.ts.
-- storage_path is set to the Unsplash placeholder URL — getMediaUrl() in
-- src/lib/media.ts passes https:// paths straight through, so these render
-- correctly until the school replaces them with real uploaded photos.

insert into media_assets (id, storage_path, alt, mime_type, metadata)
values
  ('00000000-0000-0000-0a01-000000000001',
   'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85',
   'Abena Mensah', 'image/jpeg', '{}'),
  ('00000000-0000-0000-0a01-000000000002',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85',
   'Kwame Asante', 'image/jpeg', '{}'),
  ('00000000-0000-0000-0a01-000000000003',
   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85',
   'Efua Owusu', 'image/jpeg', '{}'),
  ('00000000-0000-0000-0a01-000000000004',
   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85',
   'Kofi Boateng', 'image/jpeg', '{}'),
  ('00000000-0000-0000-0a01-000000000005',
   'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=85',
   'Akosua Tekyi', 'image/jpeg', '{}')
on conflict (id) do nothing;

insert into parent_testimonials (id, parent_name, child_year, quote, asset_id, sort_order)
values
  ('a0000000-0000-0000-0000-000000000001',
   'Abena Mensah', 'Year 3',
   'HDM gave our daughter a love of learning we never thought possible at this age.',
   '00000000-0000-0000-0a01-000000000001', 0),

  ('a0000000-0000-0000-0000-000000000002',
   'Kwame Asante', 'Year 5',
   'The confidence my son has gained here is something no other school could have given him.',
   '00000000-0000-0000-0a01-000000000002', 1),

  ('a0000000-0000-0000-0000-000000000003',
   'Efua Owusu', 'Little Angels',
   'From the very first visit, we knew this was where our child belonged.',
   '00000000-0000-0000-0a01-000000000003', 2),

  ('a0000000-0000-0000-0000-000000000004',
   'Kofi Boateng', 'Year 1 & Year 4',
   'Both our children have flourished here. HDM feels like a second home.',
   '00000000-0000-0000-0a01-000000000004', 3),

  ('a0000000-0000-0000-0000-000000000005',
   'Akosua Tekyi', 'Year 6',
   'Watching her grow into such a curious, kind, and driven young person — that''s HDM.',
   '00000000-0000-0000-0a01-000000000005', 4)
on conflict (id) do nothing;
