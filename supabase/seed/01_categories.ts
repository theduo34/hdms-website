// supabase/seed/01_categories.ts
// Seeds all media_categories rows.
// Must run before any gallery seed scripts.

import type { SupabaseClient } from '@supabase/supabase-js'
import { CAT } from './constants'

export async function seedCategories(db: SupabaseClient) {
  console.log('  → seeding media_categories...')

  // Slugs mirror the storage path segments exactly:
  //   gallery_photos slug → media/gallery/{slug}/
  //   gallery_videos slug → media/videos/{slug}/
  const rows = [
    // ── Photo sub-categories ──────────────────────────────────────────────
    { id: CAT.PHOTO_EVENTS,             slug: 'events',             label: 'Events',             parent_id: null, domain: 'gallery_photos', sort_order: 1 },
    { id: CAT.PHOTO_STUDENT_ACTIVITIES, slug: 'student-activities', label: 'Student Activities', parent_id: null, domain: 'gallery_photos', sort_order: 2 },
    { id: CAT.PHOTO_CAMPUS,             slug: 'campus',             label: 'Campus',             parent_id: null, domain: 'gallery_photos', sort_order: 3 },
    { id: CAT.PHOTO_STAFF,              slug: 'staff',              label: 'Staff',              parent_id: null, domain: 'gallery_photos', sort_order: 4 },
    // ── Video sub-categories ──────────────────────────────────────────────
    { id: CAT.VIDEO_EVENTS,             slug: 'vid-events',         label: 'Events',             parent_id: null, domain: 'gallery_videos', sort_order: 1 },
    { id: CAT.VIDEO_CULTURE,            slug: 'culture',            label: 'Culture',            parent_id: null, domain: 'gallery_videos', sort_order: 2 },
    { id: CAT.VIDEO_TOUR,               slug: 'tour',               label: 'Tour',               parent_id: null, domain: 'gallery_videos', sort_order: 3 },
    // ── Event album sub-categories ────────────────────────────────────────
    { id: CAT.EVENT_TERM1,              slug: 'term-1',             label: 'Term 1',             parent_id: null, domain: 'gallery_events', sort_order: 1 },
    { id: CAT.EVENT_TERM2,              slug: 'term-2',             label: 'Term 2',             parent_id: null, domain: 'gallery_events', sort_order: 2 },
    { id: CAT.EVENT_TERM3,              slug: 'term-3',             label: 'Term 3',             parent_id: null, domain: 'gallery_events', sort_order: 3 },
    { id: CAT.EVENT_SPECIAL,            slug: 'special',            label: 'Special',            parent_id: null, domain: 'gallery_events', sort_order: 4 },
  ] as const

  const { error } = await db
    .from('media_categories')
    .upsert(rows, { onConflict: 'id' })

  if (error) throw new Error(`media_categories seed failed: ${error.message}`)
  console.log(`     ✓ ${rows.length} categories`)
}
