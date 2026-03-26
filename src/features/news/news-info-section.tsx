import { CalendarDays, BellRing } from 'lucide-react'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'
import type { Announcement, TermRow } from './news'

function UrgencyBadge({ urgency, label }: { urgency: string; label: string }) {
    const cls: Record<string, string> = {
        new:      'bg-accent/15 text-accent-foreground border border-accent/30',
        urgent:   'bg-destructive/90 text-destructive-foreground',
        info:     'bg-secondary/20 text-secondary-foreground border border-secondary/30',
        reminder: 'bg-muted text-muted-foreground border border-border',
    }
    return (
        <span className={`text-[0.55rem] font-bold tracking-[0.16em] uppercase px-2.5 py-1 shrink-0 rounded-md ${cls[urgency] ?? ''}`}>
            {label}
        </span>
    )
}

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
                        <div key={i} className="bg-card rounded-2xl p-10 border border-border space-y-4">
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
        <section className="w-full py-24 px-16 max-lg:px-8 bg-muted" aria-label="School calendar and announcements">
            <div className="max-w-[var(--max-width,1400px)] mx-auto">

                <AnimateInView yOffset={20} duration={0.7} className="mb-12">
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
                            <p className="text-[0.82rem] font-light text-muted-foreground leading-[1.6] mb-7">
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
                                            <td className={`px-3 py-3 text-[0.84rem] border-b border-border/60 [tr:last-child_&]:border-b-0 ${row.isCurrent ? 'font-semibold text-foreground' : 'font-light text-foreground/75'}`}>
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
                        <div className="bg-card rounded-2xl border border-border p-10 max-md:p-8 h-full">
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
                            <p className="text-[0.82rem] font-light text-muted-foreground leading-[1.6] mb-7">
                                Important notices for all current HDM families.
                            </p>
                            <div className="flex flex-col divide-y divide-border">
                                {announcements.map((a) => (
                                    <div key={a.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2 group/ann hover:bg-muted/50 rounded-xl px-3 -mx-3 transition-colors duration-200">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="text-[0.9rem] font-semibold text-foreground leading-[1.3] flex-1" style={headingStyle}>
                                                {a.title}
                                            </span>
                                            <UrgencyBadge urgency={a.urgency} label={a.urgencyLabel} />
                                        </div>
                                        <p className="text-[0.78rem] font-light leading-[1.65] text-foreground/55">{a.desc}</p>
                                        <span className="text-[0.62rem] tracking-[0.1em] text-muted-foreground/60">{a.posted}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateInView>

                </div>
            </div>
        </section>
    )
}
