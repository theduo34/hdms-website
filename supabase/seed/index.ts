// supabase/seed/index.ts
//
// Main seed runner for Heaven's Dew Montessori database.
// Uses the Supabase service role key to bypass RLS during seeding.
//
// Usage:
//   bun run db:seed
//
// Requirements:
//   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
//
// The seed is IDEMPOTENT — all inserts use upsert with fixed IDs.
// Running it multiple times will update existing rows, not create duplicates.

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local (Bun does not auto-load .env.local like Next.js does)
config({ path: resolve(process.cwd(), '.env.local') })

import { seedCategories }      from './01_categories'
import { seedMediaAssets }     from './02_media_assets'
import { seedStaff }           from './03_staff'
import { seedGallery }         from './04_gallery'
import { seedNews }            from './05_news'
import { seedCalendar }        from './06_calendar'
import { seedSchoolSettings }  from './07_school_settings'
import { seedAdmissionsFaqs }  from './08_admissions_faqs'

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    console.error('❌  Missing env vars. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
    process.exit(1)
  }

  // Service role client — bypasses RLS, safe to use only in scripts, never in the browser
  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  console.log('\n🌱  Starting HDM database seed...\n')

  try {
    // Order matters: categories and media_assets must exist before gallery rows
    await seedCategories(db)
    await seedMediaAssets(db)
    await seedStaff(db)
    await seedGallery(db)
    await seedNews(db)
    await seedCalendar(db)
    await seedSchoolSettings(db)
    await seedAdmissionsFaqs(db)

    console.log('\n✅  Seed complete.\n')
  } catch (err) {
    console.error('\n❌  Seed failed:', err)
    process.exit(1)
  }
}

main()
