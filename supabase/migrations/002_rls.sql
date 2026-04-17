-- ════════════════════════════════════════════════════════════════════════════
-- Heaven's Dew Montessori — Row Level Security
-- Migration: 002_rls.sql
-- Run AFTER 001_schema.sql
-- ════════════════════════════════════════════════════════════════════════════

-- Enable RLS on every table.
alter table media_assets         enable row level security;
alter table media_categories     enable row level security;
alter table gallery_photos       enable row level security;
alter table gallery_videos       enable row level security;
alter table gallery_events       enable row level security;
alter table gallery_event_photos enable row level security;
alter table news_posts           enable row level security;
alter table announcements        enable row level security;
alter table academic_terms       enable row level security;
alter table calendar_events      enable row level security;
alter table staff_members        enable row level security;
alter table admissions_faqs      enable row level security;
alter table school_settings      enable row level security;

-- ─── PUBLIC READ ─────────────────────────────────────────────────────────────
-- The school website is fully public — all content is publicly readable.

create policy "public_read" on media_assets         for select using (true);
create policy "public_read" on media_categories     for select using (true);
create policy "public_read" on gallery_photos       for select using (true);
create policy "public_read" on gallery_videos       for select using (true);
create policy "public_read" on gallery_events       for select using (true);
create policy "public_read" on gallery_event_photos for select using (true);
create policy "public_read" on news_posts           for select using (true);
create policy "public_read" on announcements        for select using (true);
create policy "public_read" on academic_terms       for select using (true);
create policy "public_read" on calendar_events      for select using (true);
create policy "public_read" on staff_members        for select using (true);
create policy "public_read" on admissions_faqs      for select using (true);
create policy "public_read" on school_settings      for select using (true);

-- ─── AUTHENTICATED WRITE ─────────────────────────────────────────────────────
-- Only authenticated users (school admins) can create, update, or delete rows.
-- The anon key used on the public site only allows reads.

create policy "auth_write" on media_assets         for all using (auth.role() = 'authenticated');
create policy "auth_write" on media_categories     for all using (auth.role() = 'authenticated');
create policy "auth_write" on gallery_photos       for all using (auth.role() = 'authenticated');
create policy "auth_write" on gallery_videos       for all using (auth.role() = 'authenticated');
create policy "auth_write" on gallery_events       for all using (auth.role() = 'authenticated');
create policy "auth_write" on gallery_event_photos for all using (auth.role() = 'authenticated');
create policy "auth_write" on news_posts           for all using (auth.role() = 'authenticated');
create policy "auth_write" on announcements        for all using (auth.role() = 'authenticated');
create policy "auth_write" on academic_terms       for all using (auth.role() = 'authenticated');
create policy "auth_write" on calendar_events      for all using (auth.role() = 'authenticated');
create policy "auth_write" on staff_members        for all using (auth.role() = 'authenticated');
create policy "auth_write" on admissions_faqs      for all using (auth.role() = 'authenticated');
create policy "auth_write" on school_settings      for all using (auth.role() = 'authenticated');
