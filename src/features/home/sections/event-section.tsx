"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { CarouselButton } from "@/components/shared/carousel-button"
import { CTAButton } from "@/components/shared/cta-button"
import { headingStyle } from "@/styles/font"
import { HDMLetters } from "@/components/shared/hdm-letters"
import { useIsMobile } from "@/hooks/use-mobile"
import { Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { getCategoryStyle, type CalendarEvent, type EventCategory } from "@/features/calender/calender"
import { cn } from "@/lib/utils"

export const CARD_W = 280
const CARD_G = 16
const EASE = [0.16, 1, 0.3, 1] as const

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function EventsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    const [events, setEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {
        const db = createClient()
        const todayStr = new Date().toISOString().slice(0, 10)
        db.from('calendar_events')
            .select('id, title, date, time, end_time, location, category, category_label, is_all_day, is_highlight')
            .gte('date', todayStr)
            .order('date', { ascending: true })
            .limit(20)
            .then(({ data }) => {
                if (!data) return
                const upcoming = data as {
                    id: string; title: string; date: string
                    time: string | null; end_time: string | null
                    location: string | null; category: string
                    category_label: string; is_all_day: boolean; is_highlight: boolean
                }[]
                // Highlights first, then fill with any upcoming events
                const highlights = upcoming.filter(e => e.is_highlight)
                const rest       = upcoming.filter(e => !e.is_highlight)
                setEvents(
                    [...highlights, ...rest].slice(0, 6).map(row => ({
                        id:            row.id,
                        title:         row.title,
                        date:          row.date,
                        time:          row.time      ?? undefined,
                        endTime:       row.end_time  ?? undefined,
                        location:      row.location  ?? undefined,
                        category:      row.category  as EventCategory,
                        categoryLabel: row.category_label,
                        isAllDay:      row.is_all_day,
                        isHighlight:   row.is_highlight ?? undefined,
                    }))
                )
            })
    }, [])

    const [idx, setIdx] = useState(0)
    const [busy, setBusy] = useState(false)

    const scroll = (dir: "left" | "right") => {
        if (busy) return
        setBusy(true)
        setIdx(prev =>
            dir === "right"
                ? (prev + 1) % events.length
                : (prev - 1 + events.length) % events.length
        )
    }

    const onDone = () => setBusy(false)

    const x = isMobile
        ? `calc(50% - ${CARD_W / 2}px - ${idx} * (${CARD_W}px + ${CARD_G}px))`
        : `calc(-${idx} * (${CARD_W}px + ${CARD_G}px))`

    return (
        <div
            ref={sectionRef}
            id="events"
            aria-labelledby="events-heading"
            className="section bg-background relative overflow-hidden"
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.04]">
                <HDMLetters
                    variant="centered"
                    size="full"
                    filled
                    color="var(--color-primary)"
                    animate={false}
                />
            </div>

            <AnimateInView yOffset={5} duration={0.6} className="flex justify-center mb-12">
                <SectionLabel label="UPCOMING EVENTS" textColor="var(--color-foreground)" />
            </AnimateInView>

            <div className="section-left flex flex-col md:flex-row items-center justify-center md:justify-center gap-12 md:gap-16">

                <div className="w-full items-center justify-center md:w-72 shrink-0 flex flex-col gap-6">
                    <h2
                        id="events-heading"
                        className="section-header text-center md:text-start font-black italic uppercase leading-[0.9] text-primary"
                        style={headingStyle}
                    >
                        <span className="block md:hidden">SEE WHAT GOES ON</span>
                        <span className="hidden md:block">SEE WHAT<br />GOES ON</span>
                    </h2>

                    <p className="mx text-center md:text-start text-sm leading-relaxed text-foreground/60 max-w-xs">
                        Stay up to date and make sure you never miss out on exciting events and performances.
                    </p>

                    <CTAButton
                        href="/calender"
                        className="hidden md:flex items-center justify-center w-fit py-6 bg-transparent border text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        View Full Calendar
                    </CTAButton>
                </div>

                <AnimateInView
                    xOffset={5}
                    yOffset={0}
                    duration={0.75}
                    delay={0.1}
                    className="flex-1 min-w-0"
                >
                    <div
                        className="overflow-visible md:overflow-hidden"
                        style={{
                            maskImage: "linear-gradient(to right, transparent 0%, black 48px, black 100%)",
                            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 48px, black 100%)",
                        }}
                    >
                        <motion.div
                            className="flex"
                            style={{ gap: `${CARD_G}px` }}
                            animate={{ x }}
                            transition={{ duration: 0.55, ease: EASE }}
                            onAnimationComplete={onDone}
                        >
                            {events.map((event) => {
                                const d = new Date(`${event.date}T00:00:00`)
                                const style = getCategoryStyle(event.category)
                                return (
                                    <article
                                        key={event.id}
                                        className="shrink-0 flex flex-col border gap-4 rounded-2xl bg-background"
                                        style={{ width: `${CARD_W}px`, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
                                    >
                                        {/* Date + title header */}
                                        <div className="flex items-center justify-start gap-2">
                                            <div className="flex flex-col items-center justify-center shrink-0 w-14 h-14 rounded-tl-2xl rounded-br-2xl bg-secondary text-secondary-foreground">
                                                <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
                                                    {MONTH_SHORT[d.getMonth()]}
                                                </span>
                                                <span className="text-2xl font-black leading-none mt-0.5">
                                                    {d.getDate()}
                                                </span>
                                            </div>
                                            <h3
                                                className="text-sm flex flex-wrap font-bold leading-snug text-foreground"
                                                style={headingStyle}
                                            >
                                                {event.title}
                                            </h3>
                                        </div>

                                        {/* Body */}
                                        <div className="px-4 pb-4 flex flex-col gap-3 min-w-0">
                                            {/* Category badge */}
                                            <span className={cn(
                                                'inline-flex items-center gap-1.5 text-[0.56rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full w-fit',
                                                style.badge
                                            )}>
                                                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', style.dot)} aria-hidden />
                                                {event.categoryLabel}
                                            </span>

                                            <div className="flex flex-col gap-1">
                                                {(event.time || event.isAllDay) && (
                                                    <div className="flex items-center gap-1.5 text-[11px] text-foreground/50">
                                                        <Clock className="w-3 h-3 shrink-0" aria-hidden />
                                                        <span>{event.isAllDay ? 'All Day' : `${event.time}${event.endTime ? ` – ${event.endTime}` : ''}`}</span>
                                                    </div>
                                                )}
                                                {event.location && (
                                                    <div className="flex items-center gap-1.5 text-[11px] text-foreground/50">
                                                        <MapPin className="w-3 h-3 shrink-0" aria-hidden />
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Read More → opens the calendar event sheet */}
                                            <Link
                                                href={`/calender?event=${event.id}`}
                                                className="self-start text-xs font-bold uppercase tracking-widest text-primary underline underline-offset-4 hover:opacity-60 transition-opacity duration-200"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </article>
                                )
                            })}
                        </motion.div>
                    </div>
                </AnimateInView>
            </div>

            <div className="flex justify-center gap-4 mt-12">
                <CarouselButton
                    onClick={() => scroll("left")}
                    disabled={false}
                    label="Previous"
                    className="bg-primary text-primary-foreground"
                >
                    &lt;
                </CarouselButton>

                <CarouselButton
                    onClick={() => scroll("right")}
                    disabled={false}
                    label="Next"
                    className="bg-primary text-primary-foreground"
                >
                    &gt;
                </CarouselButton>
            </div>
        </div>
    )
}
