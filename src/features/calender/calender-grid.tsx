'use client'

import {useMemo} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {Clock, MapPin} from 'lucide-react'
import {cn} from '@/lib/utils'
import {type CalendarEvent, type EventCategory} from './calender'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// Each cell is a fixed height so every row is uniform regardless of event count
const CELL_H = 'h-[120px] md:h-[136px]'
const EASE = [0.16, 1, 0.3, 1] as const

interface Props {
    currentMonth: Date
    events: CalendarEvent[]
    activeFilter: EventCategory | 'all'
    onEventClick: (event: CalendarEvent) => void
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

function getCategoryFill(cat: EventCategory): string {
    const map: Record<EventCategory, string> = {
        academic: 'bg-primary/20 text-primary hover:bg-primary/30',
        event: 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/65',
        holiday: 'bg-primary/15 text-primary hover:bg-primary/25',
        exam: 'bg-destructive/18 text-destructive hover:bg-destructive/28',
        sports: 'bg-accent/25 text-accent-foreground hover:bg-accent/38',
        cultural: 'bg-secondary/30 text-secondary-foreground hover:bg-secondary/45',
    }
    return map[cat]
}

export function CalenderGrid({currentMonth, events, activeFilter, onEventClick}: Props) {
    const today = new Date()
    const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())

    const {year, month, cells} = useMemo(() => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const firstDayOfWeek = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const cells: (number | null)[] = [
            ...Array<null>(firstDayOfWeek).fill(null),
            ...Array.from({length: daysInMonth}, (_, i) => i + 1),
        ]
        while (cells.length % 7 !== 0) cells.push(null)
        return {year, month, cells}
    }, [currentMonth])

    const filtered = activeFilter === 'all'
        ? events
        : events.filter((e) => e.category === activeFilter)

    return (
        <div className="w-full max-w-(--max-width,1400px) mx-auto px-4 md:px-16 py-8">

            <div className="overflow-x-auto">
                <div className="min-w-175 max-w-240 mx-auto">

                    <div
                        className="grid mb-1"
                        style={{gridTemplateColumns: 'repeat(7, minmax(0, 1fr))'}}
                    >
                        {DAY_NAMES.map((day) => (
                            <div
                                key={day}
                                className="text-center text-[0.6rem] tracking-[0.12em] uppercase font-bold text-muted-foreground py-2"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar cells */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${year}-${month}`}
                            className="grid border-l border-t border-border rounded-b-xl overflow-hidden"
                            style={{gridTemplateColumns: 'repeat(7, minmax(0, 1fr))'}}
                            initial={{opacity: 0, y: 14}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -14}}
                            transition={{duration: 0.35, ease: EASE}}
                        >
                            {cells.map((day, i) => {
                                const dateStr = day ? toDateStr(year, month, day) : ''
                                const dayEvents = day ? getEventsForDate(filtered, dateStr) : []
                                const isToday = dateStr === todayStr
                                const isWeekend = i % 7 === 0 || i % 7 === 6

                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            // Fixed dimensions - this is what makes ALL cells the same size
                                            CELL_H,
                                            'border-r border-b border-border overflow-hidden flex flex-col p-1 md:p-1.5',
                                            !day && 'bg-muted/40',
                                            isWeekend && day && 'bg-muted/15',
                                        )}
                                    >
                                        {day && (
                                            <>
                                                {/* Day number */}
                                                <div className="flex justify-end mb-1 shrink-0">
                                                    <span
                                                        className={cn(
                                                            'w-5 h-5 flex items-center justify-center text-[0.62rem] font-semibold rounded-full leading-none shrink-0',
                                                            isToday
                                                                ? 'bg-secondary text-secondary-foreground font-black'
                                                                : 'text-foreground/60'
                                                        )}
                                                    >
                                                        {day}
                                                    </span>
                                                </div>

                                                {/* Events - equal-height blocks, consistent across all cells */}
                                                <div className="flex flex-col gap-0.5 overflow-hidden flex-1">
                                                    {dayEvents.length === 0 && (
                                                        // Empty placeholder keeps the cell visually consistent
                                                        <div className="flex-1 rounded-sm bg-muted/20" aria-hidden/>
                                                    )}
                                                    {dayEvents.slice(0, 3).map((ev) => (
                                                        <button
                                                            key={ev.id}
                                                            onClick={() => onEventClick(ev)}
                                                            title={ev.title}
                                                            className={cn(
                                                                'w-full text-left rounded-[3px] px-1 py-0.75 flex flex-col transition-colors cursor-pointer border-none font-[inherit]',
                                                                // When only 1 event, let it grow to fill the space
                                                                dayEvents.length === 1 ? 'flex-1' : 'shrink-0',
                                                                getCategoryFill(ev.category)
                                                            )}
                                                        >
                                                            <span
                                                                className="text-[0.5rem] md:text-[0.55rem] font-bold leading-tight truncate block">
                                                                {ev.title}
                                                            </span>
                                                            {(ev.time || ev.isAllDay) && (
                                                                <span
                                                                    className="flex items-center gap-0.5 text-[0.43rem] md:text-[0.46rem] opacity-75 mt-px leading-tight">
                                                                    <Clock className="w-1.75 h-1.75 shrink-0"
                                                                           aria-hidden/>
                                                                    {ev.isAllDay ? 'All day' : ev.time}
                                                                </span>
                                                            )}
                                                            {ev.location && dayEvents.length <= 2 && (
                                                                <span
                                                                    className="hidden md:flex items-center gap-0.5 text-[0.43rem] md:text-[0.45rem] opacity-65 mt-px leading-tight min-w-0">
                                                                    <MapPin className="w-1.75 h-1.75 shrink-0 flex-none"
                                                                            aria-hidden/>
                                                                    <span className="truncate">{ev.location}</span>
                                                                </span>
                                                            )}
                                                        </button>
                                                    ))}
                                                    {dayEvents.length > 3 && (
                                                        <button
                                                            onClick={() => onEventClick(dayEvents[3])}
                                                            className="text-[0.46rem] text-muted-foreground px-1 leading-tight shrink-0 text-left cursor-pointer bg-transparent border-none font-[inherit] hover:text-foreground transition-colors"
                                                        >
                                                            +{dayEvents.length - 3} more
                                                        </button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}
