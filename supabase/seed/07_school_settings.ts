// supabase/seed/07_school_settings.ts
// Seeds the school_settings key-value table.
// Values here mirror the .env.local defaults and admissions.ts constants.
// These can be edited from a future admin dashboard without a code deploy.

import type { SupabaseClient } from '@supabase/supabase-js'

export async function seedSchoolSettings(db: SupabaseClient) {
  console.log('  → seeding school_settings...')

  const rows = [
    // ── Contact ───────────────────────────────────────────────────────────
    { key: 'admissions_phone_1',    value: '+233 24 497 4052'         },
    { key: 'admissions_phone_2',    value: '+233 20 123 4567'         },
    { key: 'admissions_email',      value: 'admissions@hdm.edu.gh'    },
    { key: 'whatsapp_number',       value: '233244974052'             },
    // ── Location ──────────────────────────────────────────────────────────
    { key: 'location_lat',          value: '6.094'                    },
    { key: 'location_lng',          value: '-0.259'                   },
    { key: 'location_address',      value: 'Koforidua, Eastern Region, Ghana' },
    // ── Open day ─────────────────────────────────────────────────────────
    { key: 'open_day_date',         value: 'Saturday 15 March 2026'   },
    { key: 'open_day_time',         value: '9:00 AM – 12:00 PM'       },
    { key: 'open_day_location',     value: 'Main Campus'              },
    // ── School identity ───────────────────────────────────────────────────
    { key: 'school_name',           value: "Heaven's Dew Montessori"  },
    { key: 'school_short_name',     value: 'HDM'                      },
    { key: 'school_founded',        value: '2017'                     },
    { key: 'school_motto',          value: 'Faith · Diligence · Excellence' },
    // ── Social / external links ───────────────────────────────────────────
    { key: 'facebook_url',          value: ''                         },
    { key: 'instagram_url',         value: ''                         },
    { key: 'youtube_url',           value: ''                         },
  ]

  const { error } = await db
    .from('school_settings')
    .upsert(rows, { onConflict: 'key' })

  if (error) throw new Error(`school_settings seed failed: ${error.message}`)
  console.log(`     ✓ ${rows.length} settings`)
}
