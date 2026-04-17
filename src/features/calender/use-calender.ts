'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { CalendarEventRow, AcademicTermRow } from '@/lib/supabase/types'
import {
    calendarFilters,
    getCategoryStyle,
    type CalendarEvent,
    type CalendarFilter,
    type AcademicTerm,
    type EventCategory,
} from './calender'

export interface CalendarData {
    events: CalendarEvent[]
    filters: CalendarFilter[]
    terms: AcademicTerm[]
}

async function fetchCalendarData(): Promise<CalendarData> {
    const db = createClient()

    // ── Calendar events ────────────────────────────────────────────────────
    const { data: evRows, error: evErr } = await db
        .from('calendar_events')
        .select('id, title, date, end_date, time, end_time, location, category, category_label, description, is_all_day, is_highlight')
        .order('date', { ascending: true })

    if (evErr) throw evErr

    const events: CalendarEvent[] = ((evRows ?? []) as unknown as CalendarEventRow[]).map(row => ({
        id:            row.id,
        title:         row.title,
        date:          row.date,
        endDate:       row.end_date  ?? undefined,
        time:          row.time      ?? undefined,
        endTime:       row.end_time  ?? undefined,
        location:      row.location  ?? undefined,
        category:      row.category  as EventCategory,
        categoryLabel: row.category_label,
        description:   row.description ?? undefined,
        isAllDay:      row.is_all_day,
        isHighlight:   row.is_highlight ?? undefined,
    }))

    // ── Academic terms ─────────────────────────────────────────────────────
    const { data: termRows, error: termErr } = await db
        .from('academic_terms')
        .select('id, name, start_date, end_date, is_current, is_break')
        .order('start_date', { ascending: true })

    if (termErr) throw termErr

    const terms: AcademicTerm[] = ((termRows ?? []) as unknown as AcademicTermRow[]).map(row => ({
        id:        row.id,
        name:      row.name,
        startDate: row.start_date,
        endDate:   row.end_date,
        isCurrent: row.is_current,
        isBreak:   row.is_break,
    }))

    // calendarFilters is static UI config — no DB round-trip needed
    return { events, filters: calendarFilters, terms }
}

export function useCalenderData() {
    const [loading, setLoading] = useState(true)
    const [data, setData]       = useState<CalendarData | null>(null)

    useEffect(() => {
        let cancelled = false
        fetchCalendarData()
            .then(result => { if (!cancelled) { setData(result); setLoading(false) } })
            .catch(err   => { console.error('useCalenderData:', err); if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [])

    return { loading, data }
}

// Re-export so consumers don't need a separate import from calender.ts
export { getCategoryStyle }
