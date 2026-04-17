// supabase/seed/04_gallery.ts
// Seeds gallery_photos, gallery_videos, gallery_events, and gallery_event_photos.
// Depends on: 01_categories, 02_media_assets.

import type { SupabaseClient } from '@supabase/supabase-js'
import { CAT, ASSET, PHOTO, ALBUM, VIDEO } from './constants'

// Map from the feature-file subCategory string to a category UUID
const photoSubToCatId: Record<string, string> = {
  'events':             CAT.PHOTO_EVENTS,
  'student-activities': CAT.PHOTO_STUDENT_ACTIVITIES,
  'campus':             CAT.PHOTO_CAMPUS,
  'staff':              CAT.PHOTO_STAFF,
}

const videoSubToCatId: Record<string, string> = {
  events:  CAT.VIDEO_EVENTS,
  culture: CAT.VIDEO_CULTURE,
  tour:    CAT.VIDEO_TOUR,
}

const eventSubToCatId: Record<string, string> = {
  'term-1':  CAT.EVENT_TERM1,
  'term-2':  CAT.EVENT_TERM2,
  'term-3':  CAT.EVENT_TERM3,
  special:   CAT.EVENT_SPECIAL,
}

export async function seedGallery(db: SupabaseClient) {
  console.log('  → seeding gallery_photos...')

  // ── Photos ──────────────────────────────────────────────────────────────────

  const photoRows = [
    // events
    { id: PHOTO.P01, asset_id: ASSET.P01, category_id: photoSubToCatId['events'],             featured: true,  sort_order: 1  },
    { id: PHOTO.P02, asset_id: ASSET.P02, category_id: photoSubToCatId['events'],             featured: false, sort_order: 2  },
    { id: PHOTO.P03, asset_id: ASSET.P03, category_id: photoSubToCatId['events'],             featured: true,  sort_order: 3  },
    { id: PHOTO.P04, asset_id: ASSET.P04, category_id: photoSubToCatId['events'],             featured: false, sort_order: 4  },
    { id: PHOTO.P05, asset_id: ASSET.P05, category_id: photoSubToCatId['events'],             featured: true,  sort_order: 5  },
    { id: PHOTO.P06, asset_id: ASSET.P06, category_id: photoSubToCatId['events'],             featured: false, sort_order: 6  },
    // student-activities
    { id: PHOTO.P07, asset_id: ASSET.P07, category_id: photoSubToCatId['student-activities'], featured: true,  sort_order: 7  },
    { id: PHOTO.P08, asset_id: ASSET.P08, category_id: photoSubToCatId['student-activities'], featured: false, sort_order: 8  },
    { id: PHOTO.P09, asset_id: ASSET.P09, category_id: photoSubToCatId['student-activities'], featured: false, sort_order: 9  },
    { id: PHOTO.P10, asset_id: ASSET.P10, category_id: photoSubToCatId['student-activities'], featured: false, sort_order: 10 },
    { id: PHOTO.P11, asset_id: ASSET.P11, category_id: photoSubToCatId['student-activities'], featured: true,  sort_order: 11 },
    { id: PHOTO.P12, asset_id: ASSET.P12, category_id: photoSubToCatId['student-activities'], featured: false, sort_order: 12 },
    { id: PHOTO.P13, asset_id: ASSET.P13, category_id: photoSubToCatId['student-activities'], featured: false, sort_order: 13 },
    // campus
    { id: PHOTO.P14, asset_id: ASSET.P14, category_id: photoSubToCatId['campus'],             featured: true,  sort_order: 14 },
    { id: PHOTO.P15, asset_id: ASSET.P15, category_id: photoSubToCatId['campus'],             featured: false, sort_order: 15 },
    { id: PHOTO.P16, asset_id: ASSET.P16, category_id: photoSubToCatId['campus'],             featured: false, sort_order: 16 },
    { id: PHOTO.P17, asset_id: ASSET.P17, category_id: photoSubToCatId['campus'],             featured: false, sort_order: 17 },
    // staff
    { id: PHOTO.P18, asset_id: ASSET.P18, category_id: photoSubToCatId['staff'],              featured: true,  sort_order: 18 },
    { id: PHOTO.P19, asset_id: ASSET.P19, category_id: photoSubToCatId['staff'],              featured: false, sort_order: 19 },
    { id: PHOTO.P20, asset_id: ASSET.P20, category_id: photoSubToCatId['student-activities'], featured: false, sort_order: 20 },
  ]

  const { error: photoErr } = await db
    .from('gallery_photos')
    .upsert(photoRows, { onConflict: 'id' })
  if (photoErr) throw new Error(`gallery_photos seed failed: ${photoErr.message}`)
  console.log(`     ✓ ${photoRows.length} photos`)

  // ── Videos ──────────────────────────────────────────────────────────────────
  console.log('  → seeding gallery_videos...')

  const videoRows = [
    // events — videos/events/{year}/
    { id: VIDEO.V01, thumbnail_asset_id: ASSET.V01, category_id: videoSubToCatId['events'],  title: 'Speech & Prize Giving Day – Full Highlights',       alt: 'Speech Day highlights reel',    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '4:32',  width: 1200, height: 675, created_at: '2025-11-28T00:00:00Z' },
    { id: VIDEO.V02, thumbnail_asset_id: ASSET.V02, category_id: videoSubToCatId['events'],  title: 'Career Day 2025 – Student Reactions',               alt: 'Career Day video recap',        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '2:55',  width: 1200, height: 675, created_at: '2025-10-14T00:00:00Z' },
    { id: VIDEO.V03, thumbnail_asset_id: ASSET.V03, category_id: videoSubToCatId['events'],  title: 'Inter-House Sports Day 2025 – Highlights',          alt: 'Sports Day highlights video',   video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '3:18',  width: 1200, height: 675, created_at: '2025-02-22T00:00:00Z' },
    { id: VIDEO.V04, thumbnail_asset_id: ASSET.V04, category_id: videoSubToCatId['events'],  title: 'HDM Open Day – Campus Virtual Tour',                alt: 'Open Day tour video',           video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '8:20',  width: 1200, height: 675, created_at: '2025-01-11T00:00:00Z' },
    // culture — videos/culture/{year}/
    { id: VIDEO.V05, thumbnail_asset_id: ASSET.V05, category_id: videoSubToCatId['culture'], title: 'Christmas Carols Service 2025 – Full Recording',    alt: 'Christmas Carols performance',  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '22:10', width: 1200, height: 675, created_at: '2025-12-19T00:00:00Z' },
    { id: VIDEO.V06, thumbnail_asset_id: ASSET.V06, category_id: videoSubToCatId['culture'], title: "A Morning at Heaven's Dew – Assembly Walk-through", alt: 'Morning assembly at HDM',       video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '6:45',  width: 1200, height: 675, created_at: '2025-01-06T00:00:00Z' },
    // tour — videos/tour/ (timeless — no year subfolder)
    { id: VIDEO.V07, thumbnail_asset_id: ASSET.V07, category_id: videoSubToCatId['tour'],    title: 'Inside the Montessori Classroom – Year 4',          alt: 'Classroom learning video',      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '5:00',  width: 1200, height: 675, created_at: '2025-04-22T00:00:00Z' },
    { id: VIDEO.V08, thumbnail_asset_id: ASSET.V08, category_id: videoSubToCatId['tour'],    title: 'HDM Year in Review – 2025',                         alt: 'HDM year in review video',      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:05', width: 1200, height: 675, created_at: '2025-12-31T00:00:00Z' },
  ]

  const { error: videoErr } = await db
    .from('gallery_videos')
    .upsert(videoRows, { onConflict: 'id' })
  if (videoErr) throw new Error(`gallery_videos seed failed: ${videoErr.message}`)
  console.log(`     ✓ ${videoRows.length} videos`)

  // ── Event Albums ─────────────────────────────────────────────────────────────
  console.log('  → seeding gallery_events...')

  const eventRows = [
    { id: ALBUM.EV1, title: 'Speech & Prize Giving Day 2025',    description: 'Our most celebrated annual event – over 60 awards presented across academic, sporting, and character categories.',             event_date: '2025-11-28', category_id: eventSubToCatId['special'],  cover_asset_id: ASSET.P01, photo_count: 84,  video_count: 2 },
    { id: ALBUM.EV2, title: 'Career Day 2025',                    description: 'Students explored careers with doctors, engineers, lawyers, and creative professionals from across Ghana.',                      event_date: '2025-10-14', category_id: eventSubToCatId['term-1'],   cover_asset_id: ASSET.P03, photo_count: 47,  video_count: 1 },
    { id: ALBUM.EV3, title: 'Christmas Carols Service 2025',      description: 'A joyful close to the year – every year group performed, from our youngest Little Angels to the Year 7 choir.',                event_date: '2025-12-19', category_id: eventSubToCatId['term-2'],   cover_asset_id: ASSET.P05, photo_count: 63,  video_count: 3 },
    { id: ALBUM.EV4, title: 'Inter-House Sports Day 2025',        description: 'Green House crowned champions in one of the most competitive sporting days in recent HDM history.',                             event_date: '2025-02-22', category_id: eventSubToCatId['term-3'],   cover_asset_id: ASSET.P11, photo_count: 112, video_count: 1 },
    { id: ALBUM.EV5, title: 'Open Day – January 2025',            description: 'Over 40 prospective families toured our campus, observed live lessons, and met our teaching team.',                             event_date: '2025-01-11', category_id: eventSubToCatId['special'],  cover_asset_id: ASSET.P16, photo_count: 38,  video_count: 1 },
    { id: ALBUM.EV6, title: 'Welcome Back – Term 1, 2026',        description: 'New faces, returning families, and the familiar excitement of day one in the 2025/2026 academic year.',                         event_date: '2026-01-06', category_id: eventSubToCatId['term-1'],   cover_asset_id: ASSET.P09, photo_count: 29,  video_count: 0 },
    { id: ALBUM.EV7, title: 'Eastern Region STEM Championship',   description: 'Our robotics team earned second place and maximum marks in the innovation category at the regional STEM championship.',         event_date: '2025-10-01', category_id: eventSubToCatId['term-2'],   cover_asset_id: ASSET.P07, photo_count: 55,  video_count: 2 },
    { id: ALBUM.EV8, title: 'New Computer Laboratory Opens',      description: '30 new workstations, fully equipped – our upgraded Computer Lab is now open for all year groups.',                             event_date: '2026-01-08', category_id: eventSubToCatId['special'],  cover_asset_id: ASSET.P14, photo_count: 22,  video_count: 1 },
  ]

  const { error: eventErr } = await db
    .from('gallery_events')
    .upsert(eventRows, { onConflict: 'id' })
  if (eventErr) throw new Error(`gallery_events seed failed: ${eventErr.message}`)
  console.log(`     ✓ ${eventRows.length} event albums`)

  // ── Event album → photo links ────────────────────────────────────────────────
  console.log('  → seeding gallery_event_photos...')

  const eventPhotoRows = [
    // Speech day (ev1) gets the 2 speech-day event photos
    { event_id: ALBUM.EV1, photo_id: PHOTO.P01, sort_order: 1 },
    { event_id: ALBUM.EV1, photo_id: PHOTO.P02, sort_order: 2 },
    // Career day (ev2)
    { event_id: ALBUM.EV2, photo_id: PHOTO.P03, sort_order: 1 },
    { event_id: ALBUM.EV2, photo_id: PHOTO.P04, sort_order: 2 },
    // Carols (ev3)
    { event_id: ALBUM.EV3, photo_id: PHOTO.P05, sort_order: 1 },
    { event_id: ALBUM.EV3, photo_id: PHOTO.P06, sort_order: 2 },
    // Sports day (ev4)
    { event_id: ALBUM.EV4, photo_id: PHOTO.P11, sort_order: 1 },
    { event_id: ALBUM.EV4, photo_id: PHOTO.P12, sort_order: 2 },
    { event_id: ALBUM.EV4, photo_id: PHOTO.P13, sort_order: 3 },
    // Open day (ev5)
    { event_id: ALBUM.EV5, photo_id: PHOTO.P16, sort_order: 1 },
    { event_id: ALBUM.EV5, photo_id: PHOTO.P17, sort_order: 2 },
    // Term 1 welcome (ev6)
    { event_id: ALBUM.EV6, photo_id: PHOTO.P09, sort_order: 1 },
    { event_id: ALBUM.EV6, photo_id: PHOTO.P10, sort_order: 2 },
    // STEM championship (ev7)
    { event_id: ALBUM.EV7, photo_id: PHOTO.P07, sort_order: 1 },
    { event_id: ALBUM.EV7, photo_id: PHOTO.P08, sort_order: 2 },
    // New computer lab (ev8)
    { event_id: ALBUM.EV8, photo_id: PHOTO.P14, sort_order: 1 },
    { event_id: ALBUM.EV8, photo_id: PHOTO.P15, sort_order: 2 },
  ]

  const { error: epErr } = await db
    .from('gallery_event_photos')
    .upsert(eventPhotoRows, { onConflict: 'event_id, photo_id' })
  if (epErr) throw new Error(`gallery_event_photos seed failed: ${epErr.message}`)
  console.log(`     ✓ ${eventPhotoRows.length} event–photo links`)
}
