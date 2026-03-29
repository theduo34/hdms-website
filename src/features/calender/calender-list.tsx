'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Clock, MapPin, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCategoryStyle, type CalendarEvent, type EventCategory, type AcademicTerm } from './calender'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { CalenderSidebar } from './calender-sidebar'

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const EASE = [0.16, 1, 0.3, 1] as const
const PAGE_SIZE = 4

interface Props {
    currentMonth: Date
    events: CalendarEvent[]
    terms: AcademicTerm[]
    activeFilter: EventCategory | 'all'
    onEventClick: (event: CalendarEvent) => void
}

interface DayGroup {
    dateStr: string
    date: Date
    events: CalendarEvent[]
}

function groupByDate(events: CalendarEvent[], year: number, month: number): DayGroup[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const groups: DayGroup[] = []

    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
        const dayEvents = events.filter((ev) => {
            if (!ev.endDate) return ev.date === dateStr
            return dateStr >= ev.date && dateStr <= ev.endDate
        })
        if (dayEvents.length > 0) {
            groups.push({ dateStr, date: new Date(`${dateStr}T00:00:00`), events: dayEvents })
        }
    }
    return groups
}

export function CalenderList({ currentMonth, events, terms, activeFilter, onEventClick }: Props) {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const pageKey = `${year}-${month}-${activeFilter}`
    const [pagination, setPagination] = useState<{ key: string; count: number }>({
        key: pageKey,
        count: PAGE_SIZE,
    })
    const visibleCount = pagination.key === pageKey ? pagination.count : PAGE_SIZE

    const filtered = activeFilter === 'all'
        ? events
        : events.filter((e) => e.category === activeFilter)

    const groups = useMemo(
        () => groupByDate(filtered, year, month),
        [filtered, year, month]
    )

    // Reset pagination whenever the month/filter changes
    const visibleGroups = useMemo(() => groups.slice(0, visibleCount), [groups, visibleCount])

    const hasMore = visibleCount < groups.length

    const handleLoadMore = useCallback(() => {
        setPagination((prev) => ({ key: prev.key, count: prev.count + PAGE_SIZE }))
    }, [])

    if (groups.length === 0) {
        return (
            <div className="max-w-(--max-width,1400px) mx-auto px-4 md:px-16 py-20 text-center">
                <p className="text-muted-foreground text-sm">
                    No events scheduled for {MONTH_NAMES[month]} {year}.
                </p>
            </div>
        )
    }

    return (
        <div className="w-full mx-auto px-4 md:px-16 py-8">
            <div className="flex gap-8 xl:gap-12 items-start">

                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${year}-${month}-${activeFilter}`}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="flex flex-col divide-y divide-border"
                        >
                            {visibleGroups.map(({ dateStr, date, events: dayEvents }, groupIdx) => (
                                <AnimateInView
                                    key={dateStr}
                                    delay={groupIdx * 0.04}
                                    yOffset={16}
                                    once
                                    className="grid grid-cols-[72px_1fr] md:grid-cols-[96px_1fr] gap-4 md:gap-8 py-7"
                                >
                                    {/* Date column */}
                                    <div className="flex flex-col items-center pt-1 shrink-0">
                                        <span className="text-[0.57rem] tracking-[0.18em] uppercase font-bold text-muted-foreground">
                                            {DAY_NAMES[date.getDay()].slice(0, 3)}
                                        </span>
                                        <span
                                            className="text-5xl font-black leading-none text-primary mt-0.5"
                                            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                                        >
                                            {date.getDate()}
                                        </span>
                                        <span className="text-[0.57rem] tracking-[0.12em] uppercase font-medium text-muted-foreground mt-0.5">
                                            {MONTH_NAMES[date.getMonth()].slice(0, 3)}
                                        </span>
                                    </div>

                                    {/* Events column */}
                                    <div className="flex flex-col gap-3">
                                        {dayEvents.map((ev) => {
                                            const style = getCategoryStyle(ev.category)
                                            return (
                                                <button
                                                    key={ev.id}
                                                    onClick={() => onEventClick(ev)}
                                                    className="group text-left w-full flex flex-col gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/25 hover:shadow-sm transition-all duration-200 cursor-pointer font-[inherit]"
                                                >
                                                    {/* Category badge */}
                                                    <span
                                                        className={cn(
                                                            'inline-flex items-center gap-1.5 text-[0.56rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full w-fit',
                                                            style.badge
                                                        )}
                                                    >
                                                        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', style.dot)} aria-hidden />
                                                        {ev.categoryLabel}
                                                    </span>

                                                    {/* Title */}
                                                    <h3 className="font-bold text-[0.9rem] md:text-[0.95rem] text-foreground group-hover:text-primary transition-colors duration-150 leading-snug">
                                                        {ev.title}
                                                    </h3>

                                                    {/* Time + Location */}
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                        {(ev.time || ev.isAllDay) && (
                                                            <span className="flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                                                                <Clock className="w-3 h-3 shrink-0" aria-hidden />
                                                                {ev.isAllDay
                                                                    ? 'All Day'
                                                                    : `${ev.time}${ev.endTime ? ` – ${ev.endTime}` : ''}`
                                                                }
                                                            </span>
                                                        )}
                                                        {ev.location && (
                                                            <span className="flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                                                                <MapPin className="w-3 h-3 shrink-0" aria-hidden />
                                                                {ev.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </AnimateInView>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Load More */}
                    {hasMore && (
                        <div className="pt-4 pb-2 flex flex-col items-center gap-2">
                            <button
                                onClick={handleLoadMore}
                                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer font-[inherit] text-[0.72rem] font-semibold text-muted-foreground hover:text-foreground"
                            >
                                <span>
                                    Show more{' '}
                                    <span className="text-primary font-bold">
                                        ({groups.length - visibleCount} remaining)
                                    </span>
                                </span>
                                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-150" aria-hidden />
                            </button>
                            <span className="text-[0.58rem] text-muted-foreground/60 tabular-nums">
                                Showing {visibleGroups.length} of {groups.length} days
                            </span>
                        </div>
                    )}
                </div>

                {/*  Right: Month Pulse sidebar (desktop only)*/}
                <div className="hidden lg:block w-75 xl:w-md shrink-0 sticky top-[calc(var(--nav-height,64px)+80px)]">
                    <CalenderSidebar
                        currentMonth={currentMonth}
                        events={events}
                        terms={terms}
                    />
                </div>

            </div>
        </div>
    )
}
