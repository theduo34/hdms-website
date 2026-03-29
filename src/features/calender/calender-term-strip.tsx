'use client'

import {cn, getAcademicYear} from '@/lib/utils'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'
import type { AcademicTerm } from './calender'

const MONTH_NAMES_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatShort(dateStr: string): string {
    const d = new Date(`${dateStr}T00:00:00`)
    return `${d.getDate()} ${MONTH_NAMES_SHORT[d.getMonth()]}`
}

interface Props {
    terms: AcademicTerm[]
    loading?: boolean
}

export function CalenderTermStrip({ terms, loading }: Props) {
    const { label } = getAcademicYear()

    if (loading) {
        return (
            <section className="bg-secondary">
                <div className="max-w-(--max-width,1400px) mx-auto section-container">
                    <div className="h-4 w-48 bg-secondary-foreground/10 rounded mb-8 animate-pulse" />
                    <div className="h-10 w-64 bg-secondary-foreground/10 rounded mb-8 animate-pulse" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-24 bg-secondary-foreground/10 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-secondary" aria-labelledby="term-dates-heading">
            <div className="max-w-(--max-width,1400px) mx-auto section-container">
                <AnimateInView yOffset={24} once>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary-foreground/60">
                            {label}
                        </span>
                    </div>

                    <h2
                        id="term-dates-heading"
                        className="font-black leading-[0.93] mb-10 text-secondary-foreground"
                        style={{ ...headingStyle, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
                    >
                        <span className="italic">Term</span>{' '}
                        <span className="text-primary" style={headingStyle}>Dates.</span>
                    </h2>
                </AnimateInView>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {terms.map((term, i) => (
                        <AnimateInView key={term.id} delay={i * 0.07} yOffset={20} once>
                            <div
                                className={cn(
                                    'rounded-xl p-5 flex flex-col gap-2 h-full',
                                    term.isCurrent
                                        // Current term: dark navy card to contrast the yellow bg
                                        ? 'bg-primary text-primary-foreground ring-2 ring-primary/40 shadow-lg'
                                        : term.isBreak
                                            // Break: subtle transparent card
                                            ? 'bg-secondary-foreground/6 border border-secondary-foreground/15 text-secondary-foreground/60'
                                            // Regular term: slightly more opaque
                                            : 'bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground'
                                )}
                            >
                                {term.isCurrent && (
                                    <span className="text-[0.5rem] font-black tracking-[0.22em] uppercase text-secondary">
                                        Current
                                    </span>
                                )}

                                <h3
                                    className="font-black text-[0.95rem] leading-tight"
                                    style={headingStyle}
                                >
                                    {term.name}
                                </h3>

                                <div className="flex flex-col gap-1 mt-1">
                                    {term.isBreak ? (
                                        <>
                                            <span className="text-[0.6rem] font-medium opacity-60 uppercase tracking-wide">Period</span>
                                            <span className="text-[0.72rem] font-bold">
                                                {formatShort(term.startDate)} – {formatShort(term.endDate)}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <span className="text-[0.6rem] font-medium opacity-60 uppercase tracking-wide block">Starts</span>
                                                <span className="text-[0.72rem] font-bold">{formatShort(term.startDate)}</span>
                                            </div>
                                            <div>
                                                <span className="text-[0.6rem] font-medium opacity-60 uppercase tracking-wide block">Ends</span>
                                                <span className="text-[0.72rem] font-bold">{formatShort(term.endDate)}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </AnimateInView>
                    ))}
                </div>
            </div>
        </section>
    )
}
