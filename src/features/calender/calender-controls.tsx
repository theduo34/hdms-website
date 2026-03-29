'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, LayoutList, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EventCategory, CalendarFilter, ViewMode } from './calender'

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]

interface Props {
    currentMonth: Date
    viewMode: ViewMode
    activeFilter: EventCategory | 'all'
    filters: CalendarFilter[]
    onPrevMonth: () => void
    onNextMonth: () => void
    onViewChange: (mode: ViewMode) => void
    onFilterChange: (filter: EventCategory | 'all') => void
}

export function CalenderControls({
    currentMonth,
    viewMode,
    activeFilter,
    filters,
    onPrevMonth,
    onNextMonth,
    onViewChange,
    onFilterChange,
}: Props) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const [stuck, setStuck] = useState(false)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return
        const observer = new IntersectionObserver(
            ([entry]) => setStuck(!entry.isIntersecting),
            { threshold: 1, rootMargin: '-64px 0px 0px 0px' }
        )
        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <div ref={sentinelRef} className="h-px" aria-hidden />

            <div
                className={cn(
                    'sticky top-(--nav-height,0.01rem) z-30 transition-all duration-300',
                    stuck
                        ? 'bg-primary shadow-md border-b border-primary/20'
                        : 'bg-background border-b border-border'
                )}
            >
                {/* Top row: month navigation + view toggle */}
                <div
                    className={cn(
                        'max-w-(--max-width,1400px) mx-auto px-4 md:px-16 flex items-center justify-between gap-4 transition-all duration-300',
                        stuck ? 'py-2.5' : 'py-4'
                    )}
                >
                    {/* Month navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onPrevMonth}
                            aria-label="Previous month"
                            className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent font-[inherit]',
                                stuck
                                    ? 'text-primary-foreground/80 hover:bg-primary-foreground/10'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="min-w-40 text-center">
                            <span
                                className={cn(
                                    'font-bold text-sm md:text-base tracking-wide transition-colors',
                                    stuck ? 'text-primary-foreground' : 'text-foreground'
                                )}
                            >
                                {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </span>
                        </div>

                        <button
                            onClick={onNextMonth}
                            aria-label="Next month"
                            className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none bg-transparent font-[inherit]',
                                stuck
                                    ? 'text-primary-foreground/80 hover:bg-primary-foreground/10'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* View toggle */}
                    <div
                        className={cn(
                            'flex items-center rounded-full p-0.5 gap-0.5',
                            stuck ? 'bg-primary-foreground/10' : 'bg-muted'
                        )}
                    >
                        {(['list', 'grid'] as ViewMode[]).map((mode) => {
                            const isActive = viewMode === mode
                            return (
                                <button
                                    key={mode}
                                    onClick={() => onViewChange(mode)}
                                    aria-label={`Switch to ${mode} view`}
                                    aria-pressed={isActive}
                                    className={cn(
                                        'relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.62rem] tracking-widest uppercase font-semibold transition-colors cursor-pointer border-none bg-transparent font-[inherit]',
                                        isActive
                                            ? stuck
                                                ? 'bg-secondary text-secondary-foreground'
                                                : 'bg-primary text-primary-foreground'
                                            : stuck
                                                ? 'text-primary-foreground/60 hover:text-primary-foreground/90'
                                                : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="view-toggle-pill"
                                            className={cn(
                                                'absolute inset-0 rounded-full',
                                                stuck ? 'bg-secondary' : 'bg-primary'
                                            )}
                                            style={{ zIndex: -1 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                        />
                                    )}
                                    {mode === 'list'
                                        ? <LayoutList className="w-3 h-3 shrink-0" aria-hidden />
                                        : <Grid3x3 className="w-3 h-3 shrink-0" aria-hidden />
                                    }
                                    <span className="hidden sm:block capitalize">{mode}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Filter bar */}
                <div className="max-w-(--max-width,1400px) mx-auto px-4 md:px-16 pb-2.5">
                    <div className="flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => onFilterChange(f.id)}
                                className="relative shrink-0 flex items-center px-3.5 py-1.5 text-[0.6rem] tracking-[0.14em] uppercase font-semibold rounded-full cursor-pointer font-[inherit] bg-transparent border-none whitespace-nowrap"
                            >
                                {activeFilter === f.id && (
                                    <motion.span
                                        layoutId="calendar-filter-pill"
                                        className={cn(
                                            'absolute inset-0 rounded-full',
                                            stuck ? 'bg-secondary' : 'bg-primary'
                                        )}
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span
                                    className={cn(
                                        'relative z-10 transition-colors duration-150',
                                        activeFilter === f.id
                                            ? 'text-primary-foreground'
                                            : stuck
                                                ? 'text-primary-foreground/60 hover:text-primary-foreground/90'
                                                : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {f.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
