'use client'

import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { headingStyle } from '@/styles/font'
import { getCategoryStyle, type CalendarEvent } from './calender'
import {Button} from "@/components/ui/button";

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(dateStr: string): string {
    const d = new Date(`${dateStr}T00:00:00`)
    return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

interface Props {
    event: CalendarEvent | null
    onClose: () => void
}

export function CalenderEventSheet({ event, onClose }: Props) {
    return (
        <Sheet open={!!event} onOpenChange={(open) => { if (!open) onClose() }}>
            <SheetContent
                side="bottom"
                className="max-h-[78vh] rounded-t-2xl px-0 pb-0 gap-0 bg-card border-0 shadow-2xl"
                showCloseButton={false}
            >
                {event && (() => {
                    const style = getCategoryStyle(event.category)
                    return (
                        <div className="flex flex-col h-full overflow-hidden">
                            {/* Drag handle */}
                            <div className="flex justify-center pt-4 pb-2 shrink-0">
                                <div className="w-10 h-1 bg-border rounded-full" aria-hidden />
                            </div>

                            <div className="overflow-y-auto flex-1 px-6 pb-8">
                                <span
                                    className={cn(
                                        'inline-flex items-center gap-1.5 text-[0.56rem] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4',
                                        style.badge
                                    )}
                                >
                                    <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', style.dot)} aria-hidden />
                                    {event.categoryLabel}
                                </span>

                                {/* Title */}
                                <h2
                                    className="text-foreground font-black leading-tight mb-5"
                                    style={{ ...headingStyle, fontSize: 'clamp(1.4rem, 5vw, 2rem)' }}
                                >
                                    {event.title}
                                </h2>

                                {/* Meta details */}
                                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-border">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <CalendarDays className="w-4 h-4 shrink-0 text-secondary" aria-hidden />
                                        <span>
                                            {formatDate(event.date)}
                                            {event.endDate && event.endDate !== event.date
                                                ? ` - ${formatDate(event.endDate)}`
                                                : ''
                                            }
                                        </span>
                                    </div>

                                    {(event.time || event.isAllDay) && (
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4 shrink-0 text-secondary" aria-hidden />
                                            <span>
                                                {event.isAllDay
                                                    ? 'All Day'
                                                    : `${event.time}${event.endTime ? ` – ${event.endTime}` : ''}`
                                                }
                                            </span>
                                        </div>
                                    )}

                                    {event.location && (
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 shrink-0 text-secondary" aria-hidden />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                {event.description && (
                                    <p className="text-[0.88rem] leading-[1.85] text-foreground/80">
                                        {event.description}
                                    </p>
                                )}

                                <Button
                                    onClick={onClose}
                                    size={"lg"}
                                    className="mt-8 w-full "
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )
                })()}
            </SheetContent>
        </Sheet>
    )
}
