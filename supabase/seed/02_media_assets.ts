// supabase/seed/02_media_assets.ts
//
// Seeds all media_asset rows.
// storage_path is null for every row — files live on the hard drive and will be
// uploaded to Supabase Storage manually (or via a future admin dashboard).
// Once uploaded, update the storage_path column for that row.
//
// metadata.tags gives a useful label for when you upload so you know which
// file to associate with each row.

import type { SupabaseClient } from '@supabase/supabase-js'
import type { MediaAssetMetadata } from '../../src/lib/supabase/types'
import { ASSET } from './constants'

interface AssetSeed {
  id: string
  storage_path: null
  alt: string
  title: string | null
  width: number | null
  height: number | null
  mime_type: string
  metadata: MediaAssetMetadata
}

// Helper to build a seed row concisely
function asset(
  id: string,
  alt: string,
  title: string | null,
  width: number | null,
  height: number | null,
  metadata: MediaAssetMetadata = {},
): AssetSeed {
  return { id, storage_path: null, alt, title, width, height, mime_type: 'image/jpeg', metadata }
}

export async function seedMediaAssets(db: SupabaseClient) {
  console.log('  → seeding media_assets...')

  const rows: AssetSeed[] = [
    // ── Gallery photos ────────────────────────────────────────────────────
    asset(ASSET.P01, 'Speech and Prize Giving Day 2025',         'Speech & Prize Giving Day 2025',    1200, 800,  { event_name: 'Speech & Prize Giving Day 2025', year: 2025, tags: ['events', 'speech-day', '2025'] }),
    asset(ASSET.P02, 'Prize winner receiving award at HDM',      'The Best Student Award',            800,  1200, { event_name: 'Speech & Prize Giving Day 2025', year: 2025, tags: ['events', 'speech-day', '2025'] }),
    asset(ASSET.P03, 'Career Day 2025 at HDM',                   'Career Day – Dream It. Build It.',  1000, 750,  { event_name: 'Career Day 2025', year: 2025, tags: ['events', 'career-day', '2025'] }),
    asset(ASSET.P04, 'Students with professionals at Career Day','Students Meet the Professionals',   900,  900,  { event_name: 'Career Day 2025', year: 2025, tags: ['events', 'career-day', '2025'] }),
    asset(ASSET.P05, 'Christmas Carols Service 2025',            'Christmas Carols Service 2025',     1200, 800,  { event_name: 'Christmas Carols Service 2025', year: 2025, tags: ['events', 'carols', '2025'] }),
    asset(ASSET.P06, 'Young students singing at Christmas',      'Little Angels First Carols',        720,  1280, { event_name: 'Christmas Carols Service 2025', year: 2025, tags: ['events', 'carols', '2025'] }),
    asset(ASSET.P07, 'Students in hands-on Montessori activity', 'Hands-On Learning in Action',       1000, 750,  { year: 2025, tags: ['student-activities', 'montessori', 'classroom'] }),
    asset(ASSET.P08, 'Child focused on Montessori materials',    'The Power of Focus',                700,  1050, { year: 2025, tags: ['student-activities', 'montessori', 'classroom'] }),
    asset(ASSET.P09, 'Year 6 group lesson with teacher',         'Guided Discovery – Year 6',         1200, 675,  { year: 2025, tags: ['student-activities', 'year-6', 'classroom'] }),
    asset(ASSET.P10, 'Student reading independently',            'Independent Reading Hour',          800,  1067, { year: 2025, tags: ['student-activities', 'reading'] }),
    asset(ASSET.P11, 'Inter-House Sports Day 2025',              'Inter-House Sports Day 2025',       1200, 800,  { event_name: 'Inter-House Sports Day 2025', year: 2025, tags: ['student-activities', 'sports-day', '2025'] }),
    asset(ASSET.P12, 'Athlete racing at HDM Sports Day',         'Green House Takes the Lead',        700,  1050, { event_name: 'Inter-House Sports Day 2025', year: 2025, tags: ['student-activities', 'sports-day', '2025'] }),
    asset(ASSET.P13, 'Relay race at HDM Sports Competition',     'The Relay',                         1200, 675,  { event_name: 'Inter-House Sports Day 2025', year: 2025, tags: ['student-activities', 'relay', '2025'] }),
    asset(ASSET.P14, "Heaven's Dew Montessori school building",  'Our School – Main Campus',          1200, 800,  { location: 'Main Campus, Koforidua', tags: ['campus', 'building'] }),
    asset(ASSET.P15, 'School entrance and gardens',              'Welcome to HDM',                    900,  1125, { location: 'School Entrance', tags: ['campus', 'entrance'] }),
    asset(ASSET.P16, 'Families touring campus at Open Day',      'January Open Day 2025',             1200, 800,  { event_name: 'Open Day January 2025', year: 2025, tags: ['campus', 'open-day', '2025'] }),
    asset(ASSET.P17, 'Families exploring classrooms on Open Day','Open Day – Family Tours',           900,  900,  { event_name: 'Open Day January 2025', year: 2025, tags: ['campus', 'open-day', '2025'] }),
    asset(ASSET.P18, 'HDM teaching staff at a professional day', 'Our Teaching Team',                 1200, 800,  { year: 2026, tags: ['staff', 'professional-development'] }),
    asset(ASSET.P19, 'Teachers collaborating at HDM workshop',   'Professional Development Day',      1000, 750,  { year: 2026, tags: ['staff', 'professional-development'] }),
    asset(ASSET.P20, 'Montessori prepared classroom environment','The Prepared Environment',          900,  900,  { year: 2026, tags: ['school-life', 'classroom', 'environment'] }),

    // ── Video thumbnails ──────────────────────────────────────────────────
    asset(ASSET.V01, 'Speech Day highlights reel thumbnail',     null, 1200, 675, { year: 2025, tags: ['video', 'speech-day'] }),
    asset(ASSET.V02, 'Christmas Carols performance thumbnail',   null, 1200, 675, { year: 2025, tags: ['video', 'carols'] }),
    asset(ASSET.V03, 'Sports Day highlights video thumbnail',    null, 1200, 675, { year: 2025, tags: ['video', 'sports-day'] }),
    asset(ASSET.V04, 'Morning assembly at HDM thumbnail',        null, 1200, 675, { year: 2025, tags: ['video', 'assembly'] }),
    asset(ASSET.V05, 'Career Day video recap thumbnail',         null, 1200, 675, { year: 2025, tags: ['video', 'career-day'] }),
    asset(ASSET.V06, 'Open Day tour video thumbnail',            null, 1200, 675, { year: 2025, tags: ['video', 'open-day'] }),
    asset(ASSET.V07, 'Classroom learning video thumbnail',       null, 1200, 675, { year: 2025, tags: ['video', 'classroom'] }),
    asset(ASSET.V08, 'HDM year in review video thumbnail',       null, 1200, 675, { year: 2025, tags: ['video', 'year-review'] }),

    // ── Staff headshots ───────────────────────────────────────────────────
    // storage_path convention: staff/{name-slug}.jpg
    asset(ASSET.STAFF_CHARLOTTE, 'Mrs. Charlotte Owusu – Principal',           null, 400, 400, { tags: ['staff', 'leadership'] }),
    asset(ASSET.STAFF_FELIX,     'Dr. Felix Owusu – Director',                 null, 400, 400, { tags: ['staff', 'leadership'] }),
    asset(ASSET.STAFF_DAVID,     'Mr. David Owusu – Management Member',        null, 400, 400, { tags: ['staff', 'management'] }),
    asset(ASSET.STAFF_HENRY,     'Mr. Henry Obodai Ayeh – Primary & JHS Head', null, 400, 400, { tags: ['staff', 'teaching'] }),
    asset(ASSET.STAFF_FAUSTINA,  'Ms. Faustina O. Newman Tamatey – Preschool Head', null, 400, 400, { tags: ['staff', 'teaching'] }),
    asset(ASSET.STAFF_JENNIFER,  'Ms. Jennifer Oforiwaa Quartey – Admin Secretary', null, 400, 400, { tags: ['staff', 'admin'] }),

    // ── News cover images ─────────────────────────────────────────────────
    // storage_path convention: news/{year}/{slug}.jpg
    asset(ASSET.NEWS_FEATURED,  'Speech and Prize Giving Day 2025 – featured news cover',  null, 1200, 675, { year: 2025, tags: ['news', 'speech-day'] }),
    asset(ASSET.NEWS_ROBOTICS,  'HDM Robotics Team at STEM Championship',                  null, 1200, 675, { year: 2025, tags: ['news', 'robotics', 'stem'] }),
    asset(ASSET.NEWS_CAREERDAY, 'Career Day 2025 – news cover',                            null, 1200, 675, { year: 2025, tags: ['news', 'career-day'] }),
    asset(ASSET.NEWS_PRESS1,    'Ghana Education Service Report – news cover',             null, 1200, 675, { year: 2025, tags: ['news', 'press'] }),
    asset(ASSET.NEWS_OPENDAY,   'January Open Day 2025 – news cover',                      null, 1200, 675, { year: 2025, tags: ['news', 'open-day'] }),
    asset(ASSET.NEWS_CAROLS,    'Christmas Carols Service 2025 – news cover',              null, 1200, 675, { year: 2025, tags: ['news', 'carols'] }),
    asset(ASSET.NEWS_PRESS2,    'Koforidua FM Spotlight – news cover',                     null, 1200, 675, { year: 2025, tags: ['news', 'press', 'radio'] }),
    asset(ASSET.NEWS_ANNOUNCE1, 'Term 1 2026 Begins – announcement cover',                 null, 1200, 675, { year: 2026, tags: ['news', 'announcement'] }),
    asset(ASSET.NEWS_EXAMS,     'End-of-Term Examinations – news cover',                   null, 1200, 675, { year: 2025, tags: ['news', 'exams'] }),
    asset(ASSET.NEWS_SPORTSDAY, 'Inter-House Sports Competition 2025 – news cover',        null, 1200, 675, { year: 2025, tags: ['news', 'sports-day'] }),
  ]

  const { error } = await db
    .from('media_assets')
    .upsert(rows, { onConflict: 'id' })

  if (error) throw new Error(`media_assets seed failed: ${error.message}`)
  console.log(`     ✓ ${rows.length} media assets`)
}
