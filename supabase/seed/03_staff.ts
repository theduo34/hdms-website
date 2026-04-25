// supabase/seed/03_staff.ts
// Seeds staff_members from the about.ts feature data.

import type { SupabaseClient } from '@supabase/supabase-js'
import { STAFF, ASSET } from './constants'

export async function seedStaff(db: SupabaseClient) {
  console.log('  → seeding staff_members...')

  const rows = [
    {
      id:         STAFF.CHARLOTTE,
      name:       'Mrs. Charlotte Owusu',
      role:       'Principal',
      department: 'Leadership',
      initials:   'CO',
      bio:        "Mrs. Owusu leads Heaven's Dew Montessori with a deep commitment to child-centred education and community. Her vision and warmth define the spirit of the school.",
      asset_id:   ASSET.STAFF_CHARLOTTE,
      sort_order: 1,
      is_active:  true,
    },
    {
      id:         STAFF.FELIX,
      name:       'Dr. Felix Owusu',
      role:       'Director',
      department: 'Leadership',
      initials:   'FO',
      bio:        "Dr. Owusu MD, MSc brings academic rigour and strategic vision to HDM. He oversees the school's long-term development and ensures the highest standards of educational excellence.",
      asset_id:   ASSET.STAFF_FELIX,
      sort_order: 2,
      is_active:  true,
    },
    {
      id:         STAFF.DAVID,
      name:       'Mr. David Owusu',
      role:       'Management Member',
      department: 'Management',
      initials:   'DO',
      bio:        'Mr. David Owusu supports the operational and strategic management of the school, working closely with the principal and director to ensure smooth day-to-day running.',
      asset_id:   ASSET.STAFF_DAVID,
      sort_order: 3,
      is_active:  true,
    },
    {
      id:         STAFF.HENRY,
      name:       'Mr. Henry Obodai Ayeh',
      role:       'Primary & JHS Department Head',
      department: 'Primary & JHS',
      initials:   'HA',
      bio:        'Mr. Ayeh leads our Primary and JHS department with rigour and care, ensuring academic standards are upheld and every student is supported to reach their potential.',
      asset_id:   ASSET.STAFF_HENRY,
      sort_order: 4,
      is_active:  true,
    },
    {
      id:         STAFF.FAUSTINA,
      name:       'Ms. Faustina O. Newman Tamatey',
      role:       'Preschool Department Head',
      department: 'Preschool',
      initials:   'FT',
      bio:        'Ms. Tamatey oversees our Preschool programme, creating a nurturing and stimulating environment for our youngest learners from Little Angels through to Nursery 2.',
      asset_id:   ASSET.STAFF_FAUSTINA,
      sort_order: 5,
      is_active:  true,
    },
    {
      id:         STAFF.JENNIFER,
      name:       'Ms. Jennifer Oforiwaa Quartey',
      role:       'Administrative Secretary',
      department: 'Administration',
      initials:   'JQ',
      bio:        'Ms. Quartey is the organisational backbone of the HDM office - the first point of contact for families and the person who keeps everything running seamlessly behind the scenes.',
      asset_id:   ASSET.STAFF_JENNIFER,
      sort_order: 6,
      is_active:  true,
    },
  ]

  const { error } = await db
    .from('staff_members')
    .upsert(rows, { onConflict: 'id' })

  if (error) throw new Error(`staff_members seed failed: ${error.message}`)
  console.log(`     ✓ ${rows.length} staff members`)
}
