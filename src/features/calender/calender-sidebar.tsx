'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { headingStyle } from '@/styles/font'
import { getCategoryStyle, calendarFilters, type CalendarEvent, type AcademicTerm, type EventCategory } from './calender'

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const EASE = [0.16, 1, 0.3, 1] as const

interface Props {
    currentMonth: Date
    events: CalendarEvent[]
    terms: AcademicTerm[]
}

function toDateStr(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function getEventsForDate(events: CalendarEvent[], dateStr: string): CalendarEvent[] {
    return events.filter((ev) => {
        if (!ev.endDate) return ev.date === dateStr
        return dateStr >= ev.date && dateStr <= ev.endDate
    })
}

/** Hex-ish CSS class for the heatmap dot — uses inline style to get actual color */
function getDotColor(cat: EventCategory): string {
    const map: Record<EventCategory, string> = {
        academic: 'var(--color-primary)',
        event:    'var(--color-secondary)',
        holiday:  'var(--color-hdm-green)',
        exam:     'var(--color-destructive)',
        sports:   'var(--color-hdm-cyan)',
        cultural: 'var(--color-hdm-yellow)',
    }
    return map[cat]
}

function getTermForMonth(terms: AcademicTerm[], year: number, month: number): AcademicTerm | null {
    const firstDay = toDateStr(year, month, 1)
    const lastDay = toDateStr(year, month, new Date(year, month + 1, 0).getDate())
    return terms.find((t) => t.startDate <= lastDay && t.endDate >= firstDay) ?? null
}

function getNextUpcoming(events: CalendarEvent[]): CalendarEvent | null {
    const todayStr = toDateStr(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    return events
        .filter((ev) => ev.date >= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
}

export function CalenderSidebar({ currentMonth, events, terms }: Props) {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const today = new Date()
    const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())

    const heatmapCells = useMemo(() => {
        const firstDayOfWeek = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const cells: { day: number | null; dateStr: string; events: CalendarEvent[] }[] = [
            ...Array<null>(firstDayOfWeek).fill(null).map(() => ({ day: null, dateStr: '', events: [] })),
            ...Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const dateStr = toDateStr(year, month, day)
                return { day, dateStr, events: getEventsForDate(events, dateStr) }
            }),
        ]
        while (cells.length % 7 !== 0) cells.push({ day: null, dateStr: '', events: [] })
        return cells
    }, [year, month, events])

    const categoryBreakdown = useMemo(() => {
        const counts: Partial<Record<EventCategory, number>> = {}
        events.forEach((ev) => {
            const inMonth = ev.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)
            if (inMonth) counts[ev.category] = (counts[ev.category] ?? 0) + 1
        })
        const total = Object.values(counts).reduce((s, n) => s + n, 0)
        return calendarFilters
            .filter((f) => f.id !== 'all' && (counts[f.id as EventCategory] ?? 0) > 0)
            .map((f) => ({
                id: f.id as EventCategory,
                label: f.label,
                count: counts[f.id as EventCategory] ?? 0,
                pct: total > 0 ? ((counts[f.id as EventCategory] ?? 0) / total) * 100 : 0,
            }))
            .sort((a, b) => b.count - a.count)
    }, [events, year, month])

    const currentTerm = useMemo(() => getTermForMonth(terms, year, month), [terms, year, month])

    const nextEvent = useMemo(() => getNextUpcoming(events), [events])

    const monthEventCount = events.filter((ev) =>
        ev.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)
    ).length

    return (
        <aside className="flex flex-col gap-5">
            {/* Month Heatmap */}
            <motion.div
                className="rounded-2xl border border-border bg-card p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <span
                        className="text-[0.7rem] font-black tracking-tight text-foreground"
                        style={headingStyle}
                    >
                        {MONTH_NAMES[month].slice(0, 3)} {year}
                    </span>
                    <span className="text-[0.58rem] font-semibold text-muted-foreground">
                        {monthEventCount} event{monthEventCount !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Day initials */}
                <div className="grid grid-cols-7 mb-1">
                    {DAY_INITIALS.map((d, i) => (
                        <div key={i} className="text-center text-[0.5rem] font-bold text-muted-foreground/60">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Day squares */}
                <div className="grid grid-cols-7 gap-0.75">
                    {heatmapCells.map((cell, i) => {
                        const isToday = cell.dateStr === todayStr
                        const hasEvents = cell.events.length > 0
                        const primaryCat = cell.events[0]?.category
                        const multiEvent = cell.events.length > 1

                        return (
                            <div
                                key={i}
                                className={cn(
                                    'aspect-square rounded-[3px] flex items-center justify-center relative',
                                    !cell.day && 'opacity-0 pointer-events-none',
                                    isToday && 'ring-[1.5px] ring-secondary ring-offset-1 ring-offset-card',
                                )}
                                style={
                                    hasEvents && primaryCat
                                        ? { backgroundColor: `color-mix(in oklch, ${getDotColor(primaryCat)} 30%, transparent)` }
                                        : undefined
                                }
                                title={cell.events.map((e) => e.title).join(', ') || undefined}
                            >
                                <span
                                    className={cn(
                                        'text-[0.45rem] font-semibold leading-none',
                                        hasEvents ? 'text-foreground' : 'text-muted-foreground/50',
                                        isToday && 'font-black text-foreground'
                                    )}
                                >
                                    {cell.day}
                                </span>
                                {/* Multi-event indicator dot */}
                                {multiEvent && (
                                    <span
                                        className="absolute bottom-px right-px w-1 h-1 rounded-full bg-secondary"
                                        aria-hidden
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Color legend */}
                {categoryBreakdown.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-x-3 gap-y-1.5">
                        {categoryBreakdown.map(({ id, label }) => (
                            <span key={id} className="flex items-center gap-1 text-[0.5rem] text-muted-foreground">
                                <span
                                    className="w-2 h-2 rounded-[2px] shrink-0"
                                    style={{ backgroundColor: `color-mix(in oklch, ${getDotColor(id)} 60%, transparent)` }}
                                    aria-hidden
                                />
                                {label}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Category Breakdown */}
            {categoryBreakdown.length > 0 && (
                <motion.div
                    className="rounded-2xl border border-border bg-card p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                        <span className="text-[0.6rem] tracking-[0.18em] uppercase font-bold text-muted-foreground">
                            Event Breakdown
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {categoryBreakdown.map(({ id, label, count, pct }, i) => (
                                <div key={id} className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold text-foreground/80">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ backgroundColor: getDotColor(id) }}
                                                aria-hidden
                                            />
                                            {label}
                                        </span>
                                        <span className="text-[0.6rem] font-bold text-muted-foreground tabular-nums">
                                            {count}
                                        </span>
                                    </div>
                                    {/* Animated fill bar */}
                                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: getDotColor(id) }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE }}
                                        />
                                    </div>
                                </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Term Context */}
            {currentTerm && (
                <motion.div
                    className="rounded-2xl bg-primary p-4 flex flex-col gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
                >
                    {currentTerm.isCurrent && (
                        <span className="text-[0.5rem] font-black tracking-[0.22em] uppercase text-secondary">
                            In Progress
                        </span>
                    )}
                    <div className="flex items-start gap-2">
                        <CalendarDays className="w-3.5 h-3.5 text-secondary shrink-0 mt-[1px]" aria-hidden />
                        <h3
                            className="font-black text-primary-foreground leading-tight text-[0.8rem]"
                            style={headingStyle}
                        >
                            {currentTerm.name}
                        </h3>
                    </div>
                    {!currentTerm.isBreak && (() => {
                        const start = new Date(`${currentTerm.startDate}T00:00:00`)
                        const end = new Date(`${currentTerm.endDate}T00:00:00`)
                        const now = new Date()
                        const totalMs = end.getTime() - start.getTime()
                        const elapsedMs = Math.min(Math.max(now.getTime() - start.getTime(), 0), totalMs)
                        const pct = Math.round((elapsedMs / totalMs) * 100)

                        return (
                            <>
                                <div className="h-1 bg-primary-foreground/15 rounded-full overflow-hidden mt-1">
                                    <motion.div
                                        className="h-full bg-secondary rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                                    />
                                </div>
                                <span className="text-[0.55rem] text-primary-foreground/50 tabular-nums">
                                    {pct}% complete
                                </span>
                            </>
                        )
                    })()}
                </motion.div>
            )}

            {/* Next Upcoming Event */}
            {nextEvent && (
                <motion.div
                    className="rounded-2xl border border-border bg-card p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
                >
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase font-bold text-muted-foreground block mb-3">
                        Next Up
                    </span>

                    {(() => {
                        const style = getCategoryStyle(nextEvent.category)
                        const d = new Date(`${nextEvent.date}T00:00:00`)
                        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                        return (
                            <div className="flex gap-3 items-start">
                                {/* Date block */}
                                <div
                                    className="rounded-xl flex flex-col items-center justify-center w-11 h-11 shrink-0"
                                    style={{ backgroundColor: `color-mix(in oklch, ${getDotColor(nextEvent.category)} 18%, transparent)` }}
                                >
                                    <span
                                        className="text-[1rem] font-black leading-none"
                                        style={{ color: getDotColor(nextEvent.category) }}
                                    >
                                        {d.getDate()}
                                    </span>
                                    <span
                                        className="text-[0.45rem] font-bold uppercase tracking-wider leading-tight"
                                        style={{ color: getDotColor(nextEvent.category) }}
                                    >
                                        {months[d.getMonth()]}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className={cn(
                                        'inline-flex items-center gap-1 text-[0.5rem] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full w-fit',
                                        style.badge
                                    )}>
                                        <span className={cn('w-1 h-1 rounded-full shrink-0', style.dot)} aria-hidden />
                                        {nextEvent.categoryLabel}
                                    </span>
                                    <p className="text-[0.72rem] font-bold text-foreground leading-snug line-clamp-2">
                                        {nextEvent.title}
                                    </p>
                                    {nextEvent.time && (
                                        <span className="text-[0.58rem] text-muted-foreground">
                                            {nextEvent.time}{nextEvent.endTime ? ` – ${nextEvent.endTime}` : ''}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })()}
                </motion.div>
            )}
        </aside>
    )
}
