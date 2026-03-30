'use client'

import { useState, useEffect } from 'react'
import {
    calendarEvents,
    calendarFilters,
    academicTerms,
    type CalendarEvent,
    type CalendarFilter,
    type AcademicTerm,
} from './calender'

export interface CalendarData {
    events: CalendarEvent[]
    filters: CalendarFilter[]
    terms: AcademicTerm[]
}

export function useCalenderData() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<CalendarData | null>(null)

    useEffect(() => {
        // Simulates API fetch - replace with real fetch(api.hdm.edu.gh/calendar) when ready
        const t = setTimeout(() => {
            setData({ events: calendarEvents, filters: calendarFilters, terms: academicTerms })
            setLoading(false)
        }, 600)
        return () => clearTimeout(t)
    }, [])

    return { loading, data }
}
