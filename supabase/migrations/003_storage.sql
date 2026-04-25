-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Storage Bucket
-- Migration: 003_storage.sql
-- Run AFTER 001_schema.sql
--
-- STORAGE PATH CONVENTION
-- ───────────────────────
-- All school media lives in one public bucket: "media"
-- Paths follow the pattern: {domain}/{sub-category}/{year}/{filename}
--
-- gallery/
--   events/     2025/  speech-day-001.jpg
--   school-life/2025/  montessori-activity.jpg
--   sports/     2025/  inter-house-sports.jpg
--   staff/      2025/  professional-day.jpg
--   campus/     2025/  school-building.jpg
-- staff/
--   charlotte-owusu.jpg
--   felix-owusu.jpg
-- news/
--   2025/  featured-speech-day.jpg
--   2026/  term-1-begins.jpg
-- programmes/
--   preschool.jpg
--   lower-primary.jpg
--
-- File naming convention:
--   kebab-case, descriptive, no spaces, no special chars except hyphens.
--   e.g. "speech-and-prize-giving-day-001.jpg"
-- ════════════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  52428800,  -- 50 MB per file limit
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm'
  ]
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ─── STORAGE POLICIES ────────────────────────────────────────────────────────

-- Anyone can view files (public school website).
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Only authenticated admins can upload new files.
create policy "media_auth_upload"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- Only authenticated admins can replace/rename files.
create policy "media_auth_update"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');

-- Only authenticated admins can delete files.
create policy "media_auth_delete"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
