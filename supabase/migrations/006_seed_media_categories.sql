
-- 1. Drop the global unique constraint on slug
ALTER TABLE media_categories
  DROP CONSTRAINT IF EXISTS media_categories_slug_key;

-- 2. Add a per-domain unique so (slug, domain) pairs are unique
ALTER TABLE media_categories
  ADD CONSTRAINT media_categories_slug_domain_key UNIQUE (slug, domain);

-- 3. Seed all standard sub-categories
--    ON CONFLICT does nothing so this is safe to re-run.
INSERT INTO media_categories (slug, label, domain, sort_order) VALUES
  -- Photos
  ('events',             'Events',             'gallery_photos', 1),
  ('student-activities', 'Student Activities', 'gallery_photos', 2),
  ('campus',             'Campus',             'gallery_photos', 3),
  ('staff',              'Staff',              'gallery_photos', 4),
  -- Videos
  ('events',             'Events',             'gallery_videos', 1),
  ('culture',            'Culture',            'gallery_videos', 2),
  ('tour',               'Tour',               'gallery_videos', 3),
  -- Event albums
  ('term-1',  'Term 1',  'gallery_events', 1),
  ('term-2',  'Term 2',  'gallery_events', 2),
  ('term-3',  'Term 3',  'gallery_events', 3),
  ('special', 'Special', 'gallery_events', 4)
ON CONFLICT (slug, domain) DO NOTHING;


UPDATE gallery_photos gp
SET    category_id = mc.id
FROM   media_assets     ma
JOIN   media_categories mc
       ON  mc.domain        = 'gallery_photos'
       AND ma.storage_path  LIKE 'gallery/' || mc.slug || '/%'
WHERE  gp.asset_id     = ma.id
  AND  gp.category_id  IS NULL;


UPDATE gallery_videos gv
SET    category_id = mc.id
FROM   media_assets     ma
JOIN   media_categories mc
       ON  mc.domain        = 'gallery_videos'
       AND ma.storage_path  LIKE 'videos/' || mc.slug || '/%'
WHERE  gv.thumbnail_asset_id = ma.id
  AND  gv.category_id        IS NULL;

