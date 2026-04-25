import Link from 'next/link'
import { CalendarDays, BellRing, ArrowRight } from 'lucide-react'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'
import type { Announcement, TermRow } from './news'

interface Props {
    termDates: TermRow[]
    announcements: Announcement[]
    loading: boolean
}

export function NewsInfoSection({ termDates, announcements, loading }: Props) {
    if (loading) {
        return (
            <section className="w-full py-24 px-16 max-lg:px-8 bg-muted">
                <div className="max-w-[var(--max-width,1400px)] mx-auto grid grid-cols-2 max-lg:grid-cols-1 gap-6">
                    {[0, 1].map((i) => (
                        <div key={i} className="bg-card rounded-2xl p-10 border space-y-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <div key={j} className="h-10 bg-muted rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="w-full section-half px-16 max-lg:px-4 bg-muted" aria-label="School calendar and announcements">
            <div className="max-w-[var(--max-width,1400px)] mx-auto">

                <AnimateInView yOffset={20} duration={0.7} className="mb-10">
                    <div className="section-tag">
                        <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                        <span className="text-[10px] tracking-[0.3em] font-bold uppercase">School Life</span>
                    </div>
                    <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-foreground" style={headingStyle}>
                        Academic Year <strong className="font-semibold italic">2025 / 2026</strong>
                    </h2>
                </AnimateInView>

                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">

                    {/* Term dates */}
                    <AnimateInView yOffset={30} duration={0.8} delay={0.05}>
                        <div className="bg-card rounded-2xl border border-border p-10 max-md:p-8 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <CalendarDays className="w-4.5 h-4.5 text-secondary" aria-hidden />
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-muted-foreground">Academic Calendar</p>
                                    <h3 className="text-[1.15rem] font-semibold text-foreground leading-tight" style={headingStyle}>Term Dates</h3>
                                </div>
                            </div>
                            <p className="text-[0.82rem] font-light leading-[1.6] mb-7">
                                Public holidays within term time are observed as school holidays.
                            </p>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        {['Term', 'Start', 'End', 'Duration'].map((h) => (
                                            <th key={h} className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-muted-foreground px-3 py-2.5 text-left border-b border-border">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {termDates.map((row) => (
                                        <tr key={row.name} className={row.isCurrent ? 'bg-secondary/8' : 'hover:bg-muted/60 transition-colors'}>
                                            <td className={`px-3 py-3 text-[0.84rem] border-b border-border/60 [tr:last-child_&]:border-b-0 ${row.isCurrent ? 'font-semibold' : 'font-light'}`}>
                                                {row.name}
                                                {row.isCurrent && (
                                                    <span className="inline-block text-[0.55rem] font-bold tracking-[0.14em] uppercase bg-secondary text-secondary-foreground px-2 py-[0.18rem] ml-2 align-middle rounded-sm">
                                                        Now
                                                    </span>
                                                )}
                                            </td>
                                            {row.isBreak ? (
                                                <td colSpan={2} className="px-3 py-3 text-[0.78rem] font-light italic text-muted-foreground border-b border-border/60 [tr:last-child_&]:border-b-0">
                                                    {row.end}
                                                </td>
                                            ) : (
                                                <>
                                                    <td className="px-3 py-3 text-[0.84rem] font-light text-foreground/65 border-b border-border/60 [tr:last-child_&]:border-b-0">{row.start}</td>
                                                    <td className="px-3 py-3 text-[0.84rem] font-light text-foreground/65 border-b border-border/60 [tr:last-child_&]:border-b-0">{row.end}</td>
                                                </>
                                            )}
                                            <td className="px-3 py-3 text-[0.84rem] font-light text-foreground/65 border-b border-border/60 [tr:last-child_&]:border-b-0">{row.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AnimateInView>

                    {/* Announcements */}
                    <AnimateInView yOffset={30} duration={0.8} delay={0.12}>
                        <div className="bg-card rounded-2xl border border-border p-10 max-md:p-8 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <BellRing className="w-4.5 h-4.5 text-accent" aria-hidden />
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-muted-foreground">Notices</p>
                                    <h3 className="text-[1.15rem] font-semibold text-foreground leading-tight" style={headingStyle}>
                                        Latest <em className="text-secondary">Announcements</em>
                                    </h3>
                                </div>
                            </div>
                            <p className="text-[0.82rem] font-light leading-[1.6] mb-7">
                                Important notices for all current HDM families.
                            </p>

                            {announcements.length === 0 ? (
                                <p className="text-sm text-muted-foreground font-light">No announcements at this time.</p>
                            ) : (
                                <div className="flex flex-col divide-y divide-border flex-1">
                                    {announcements.map((a) => (
                                        <Link
                                            key={a.id}
                                            href={`/news-&-announcements/${a.slug}`}
                                            className="py-4 first:pt-0 last:pb-0 flex flex-col gap-1.5 group/ann hover:bg-muted/50 rounded-xl px-3 -mx-3 transition-colors duration-200"
                                        >
                                            <span className="text-[0.9rem] font-semibold text-foreground leading-[1.3] group-hover/ann:text-primary transition-colors" style={headingStyle}>
                                                {a.headline}
                                            </span>
                                            {a.excerpt && (
                                                <p className="text-xs font-light leading-[1.65] text-foreground/70 line-clamp-2">{a.excerpt}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-0.5">
                                                <span className="text-[0.62rem] tracking-[0.1em] text-muted-foreground">{a.date}</span>
                                                <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover/ann:text-primary transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <Link
                                href="/news-&-announcements?filter=announcement"
                                className="mt-6 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-foreground/50 hover:text-foreground transition-colors self-start"
                            >
                                View all announcements
                            </Link>
                        </div>
                    </AnimateInView>
                </div>
            </div>
        </section>
    )
}
