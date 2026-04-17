// supabase/seed/06_calendar.ts
// Seeds academic_terms and calendar_events from the calender.ts feature file.

import type { SupabaseClient } from '@supabase/supabase-js'
import { academicTerms, calendarEvents } from '../../src/features/calender/calender'

export async function seedCalendar(db: SupabaseClient) {
  console.log('  → seeding academic_terms...')

  const termRows = academicTerms.map(t => ({
    id:         t.id,
    name:       t.name,
    start_date: t.startDate,
    end_date:   t.endDate,
    is_current: t.isCurrent,
    is_break:   t.isBreak,
  }))

  const { error: termErr } = await db
    .from('academic_terms')
    .upsert(termRows, { onConflict: 'id' })
  if (termErr) throw new Error(`academic_terms seed failed: ${termErr.message}`)
  console.log(`     ✓ ${termRows.length} academic terms`)

  // ── Calendar events ──────────────────────────────────────────────────────────
  console.log('  → seeding calendar_events...')

  const eventRows = calendarEvents.map(e => ({
    id:             e.id,
    title:          e.title,
    date:           e.date,
    end_date:       e.endDate ?? null,
    time:           e.time ?? null,
    end_time:       e.endTime ?? null,
    location:       e.location ?? null,
    category:       e.category,
    category_label: e.categoryLabel,
    description:    e.description ?? null,
    is_all_day:     e.isAllDay,
    is_highlight:   e.isHighlight ?? false,
  }))

  const { error: evErr } = await db
    .from('calendar_events')
    .upsert(eventRows, { onConflict: 'id' })
  if (evErr) throw new Error(`calendar_events seed failed: ${evErr.message}`)
  console.log(`     ✓ ${eventRows.length} calendar events`)
}
