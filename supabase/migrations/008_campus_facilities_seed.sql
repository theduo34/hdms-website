-- ════════════════════════════════════════════════════════════════════════════
-- Seed: Campus Facilities (initial data matching campus-life.ts static content)
-- Safe to re-run — only inserts if campus_facilities is empty
-- ════════════════════════════════════════════════════════════════════════════

do $$
declare
  a1 uuid; a2 uuid; a3 uuid; a4 uuid; a5 uuid; a6 uuid; a7 uuid;
begin
  if exists (select 1 from campus_facilities limit 1) then
    return;
  end if;

  a1 := gen_random_uuid(); a2 := gen_random_uuid(); a3 := gen_random_uuid();
  a4 := gen_random_uuid(); a5 := gen_random_uuid();
  a6 := gen_random_uuid(); a7 := gen_random_uuid();

  insert into media_assets (id, storage_path, alt, title, mime_type, metadata) values
    (a1, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80',  'Montessori Classrooms',   'Montessori Classrooms',   'image/jpeg', '{}'),
    (a2, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=700&q=80',  'Library & Reading Corner','Library & Reading Corner', 'image/jpeg', '{}'),
    (a3, 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=80',  'ICT Laboratory',          'ICT Laboratory',           'image/jpeg', '{}'),
    (a4, 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80',     'Playground',              'Playground',               'image/jpeg', '{}'),
    (a5, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&q=80',     'Sports Field',            'Sports Field',             'image/jpeg', '{}'),
    (a6, 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=700&q=80',  'Dining Hall',             'Dining Hall',              'image/jpeg', '{}'),
    (a7, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80',  'Medical Room',            'Medical Room',             'image/jpeg', '{}');

  insert into campus_facilities (asset_id, section, name, description, sort_order) values
    (a1, 'learning', 'Montessori Classrooms',
      'Prepared environments filled with authentic Montessori materials, designed to invite independent exploration and deep concentration.', 0),
    (a2, 'learning', 'Library & Reading Corner',
      'A calm, well-stocked reading space with over 1,000 curated titles — from picture books for Little Angels to chapter books for Year 6.', 1),
    (a3, 'learning', 'ICT Laboratory',
      'A modern computer lab providing digital literacy, coding basics, and educational technology from Reception through Year 6.', 2),
    (a4, 'outdoor',  'Playground',
      'Spacious outdoor play areas with climbing structures, a sand pit, and shaded zones — designed for active, imaginative play.', 0),
    (a5, 'outdoor',  'Sports Field',
      'A full-size grass pitch used for football, athletics, and whole-school sports events. Home of our inter-school competitions.', 1),
    (a6, 'support',  'Dining Hall',
      'A bright, welcoming dining space where children enjoy freshly prepared meals together — building community and good habits around the table.', 0),
    (a7, 'support',  'Medical Room',
      'A dedicated health room staffed by a qualified nurse during school hours, ensuring every child''s wellbeing is always attended to.', 1);
end $$;
