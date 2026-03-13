import { EventsInterface } from "@/features/home";
import { CARD_W } from "@/features/home/sections/event-section";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { headingStyle } from "@/styles/font";
import {getEventDateParts} from "@/lib/utils";


export function EventCard({ event }: { event: EventsInterface }) {
    const { month, day } = getEventDateParts(event.eventDate);

    return (
        <article
            className="shrink-0 flex flex-col border gap-4 rounded-2xl bg-background"
            style={{
                width: `${CARD_W}px`,
                boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
            }}>
            <div className={"flex items-center justify-start gap-2"}>
                <div className="flex flex-col items-center justify-center shrink-0 w-14 h-14 rounded-tl-2xl rounded-br-2xl bg-secondary text-secondary-foreground">
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
                        {month}
                    </span>
                    <span className="text-2xl font-black leading-none mt-0.5">
                        {day}
                    </span>
                </div>

                <h3 className="text-sm flex flex-wrap font-bold leading-snug text-foreground"
                    style={headingStyle}
                >
                    {event.title}
                </h3>
            </div>

            <div className="p-4 flex flex-col gap-3 min-w-0">
                <div className="flex flex-col gap-1">
                    {event.time && (
                        <div className="flex items-center gap-1.5 text-[11px] text-foreground/50">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{event.time}</span>
                        </div>
                    )}
                    {event.location && (
                        <div className="flex items-center gap-1.5 text-[11px] text-foreground/50">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    )}
                </div>

                <Link
                    href={`/events/${event.id}`}
                    className="self-start text-xs font-bold uppercase tracking-widest text-primary underline underline-offset-4 hover:opacity-60 transition-opacity duration-200"
                >
                    Read More
                </Link>
            </div>
        </article>
    )
}
