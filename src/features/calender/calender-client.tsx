'use client'

import { useState, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCalenderData } from './use-calender'
import { CalenderHeader } from './calender-header'
import { CalenderControls } from './calender-controls'
import { CalenderGrid } from './calender-grid'
import { CalenderList } from './calender-list'
import { CalenderEventSheet } from './calender-event-sheet'
import { CalenderTermStrip } from './calender-term-strip'
import { GridSkeleton, ListSkeleton } from './skeleton'
// calendarEvents is static - safe to use for immediate URL-based month init
import { calendarEvents, type EventCategory, type ViewMode } from './calender'

export default function CalenderClient() {
    const { loading, data } = useCalenderData()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // Initialise the month from the URL's ?event= param so the correct month
    // is already visible on first render - no effect needed.
    const [currentMonth, setCurrentMonth] = useState<Date>(() => {
        const now = new Date()
        const eventId = searchParams.get('event')
        if (eventId) {
            const ev = calendarEvents.find((e) => e.id === eventId)
            if (ev) {
                const d = new Date(`${ev.date}T00:00:00`)
                return new Date(d.getFullYear(), d.getMonth(), 1)
            }
        }
        return new Date(now.getFullYear(), now.getMonth(), 1)
    })

    const [viewMode, setViewMode] = useState<ViewMode>('list')

    // activeFilter and selectedEvent are both derived from the URL - shareable and deep-linkable.
    const urlEventId = searchParams.get('event')
    const urlFilter = searchParams.get('filter')
    const activeFilter: EventCategory | 'all' = (urlFilter && urlFilter !== 'all') ? urlFilter as EventCategory : 'all'
    const selectedEvent = data?.events.find((e) => e.id === urlEventId) ?? null

    const handleFilterChange = useCallback((filter: EventCategory | 'all') => {
        const params = new URLSearchParams(searchParams.toString())
        if (filter === 'all') {
            params.delete('filter')
        } else {
            params.set('filter', filter)
        }
        const qs = params.toString()
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    }, [router, pathname, searchParams])

    const handleEventClick = useCallback((id: string, date: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('event', id)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
        const d = new Date(`${date}T00:00:00`)
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1))
    }, [router, pathname, searchParams])

    const handleEventClose = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('event')
        const qs = params.toString()
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    }, [router, pathname, searchParams])

    const handlePrevMonth = useCallback(() => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    }, [])

    const handleNextMonth = useCallback(() => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    }, [])

    return (
        <>
            <CalenderHeader />

            <CalenderControls
                currentMonth={currentMonth}
                viewMode={viewMode}
                activeFilter={activeFilter}
                filters={data?.filters ?? []}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onViewChange={setViewMode}
                onFilterChange={handleFilterChange}
            />

            {loading ? (
                viewMode === 'grid' ? <GridSkeleton /> : <ListSkeleton />
            ) : viewMode === 'grid' ? (
                <CalenderGrid
                    currentMonth={currentMonth}
                    events={data?.events ?? []}
                    activeFilter={activeFilter}
                    onEventClick={(ev) => handleEventClick(ev.id, ev.date)}
                />
            ) : (
                <CalenderList
                    currentMonth={currentMonth}
                    events={data?.events ?? []}
                    terms={data?.terms ?? []}
                    activeFilter={activeFilter}
                    onEventClick={(ev) => handleEventClick(ev.id, ev.date)}
                />
            )}

            <CalenderTermStrip terms={data?.terms ?? []} loading={loading} />

            <CalenderEventSheet
                event={selectedEvent}
                onClose={handleEventClose}
            />
        </>
    )
}
