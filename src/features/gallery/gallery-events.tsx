'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Images, Video, ArrowRight, Loader2 } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { formatDate } from '@/lib/format-date'
import { type GalleryEvent } from './gallery'

const EASE = [0.16, 1, 0.3, 1] as const

function EventSkeleton({ i }: { i: number }) {
    return (
        <div className="w-full min-w-0" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-full aspect-[3/2] bg-muted animate-pulse" />
            <div className="pt-4 space-y-2.5">
                <div className="h-3 w-24 bg-muted animate-pulse rounded-full" />
                <div className="h-5 w-full bg-muted animate-pulse rounded" />
                <div className="h-3.5 w-4/5 bg-muted animate-pulse rounded" />
                <div className="h-3.5 w-full bg-muted animate-pulse rounded" />
            </div>
        </div>
    )
}

function EventCard({
    event,
    index,
}: {
    event: GalleryEvent
    index: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: EASE }}
        >
            <Link
                href={`/gallery/events/${event.id}`}
                className="group block focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            >
                <div className="relative overflow-hidden aspect-[3/2]">
                    <Image
                        src={event.coverImage}
                        alt={event.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        unoptimized
                        className="transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[0.58rem] font-bold tracking-[0.1em] px-2.5 py-1">
                            <Images className="w-3 h-3" aria-hidden />
                            {event.photoCount} photos
                        </span>
                        {event.videoCount > 0 && (
                            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[0.58rem] font-bold tracking-[0.1em] px-2.5 py-1">
                                <Video className="w-3 h-3" aria-hidden />
                                {event.videoCount} {event.videoCount === 1 ? 'video' : 'videos'}
                            </span>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="flex items-center gap-2 bg-secondary text-secondary-foreground text-[0.65rem] font-bold tracking-[0.14em] uppercase px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            View Album
                            <ArrowRight className="w-3 h-3" aria-hidden />
                        </span>
                    </div>
                </div>

                <div className="pt-4">
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase font-bold text-secondary mb-1.5">
                        {formatDate(event.eventDate)}
                    </p>
                    <h3
                        className="text-[1.05rem] font-semibold leading-tight mb-2 group-hover:tracking-[-0.01em] transition-all duration-300"
                        style={headingStyle}
                    >
                        {event.title}
                    </h3>
                    <p className="text-[0.78rem] font-light leading-[1.7] line-clamp-2">
                        {event.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    )
}

interface Props {
    events: GalleryEvent[]
    loading: boolean
    loadingMore: boolean
    hasMore: boolean
    total: number
    onLoadMore: () => void
}

export function GalleryEvents({ events, loading, loadingMore, hasMore, total, onLoadMore }: Props) {
    return (
        <div className="w-full">
            {loading ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <EventSkeleton key={i} i={i} />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center text-muted-foreground text-[0.9rem] font-light"
                >
                    No events in this category yet.
                </motion.p>
            ) : (
                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                        {events.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                </AnimatePresence>
            )}

            {!loading && events.length > 0 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground">
                        Showing {events.length} of {total} events
                    </p>
                    {hasMore && (
                        <button
                            onClick={onLoadMore}
                            disabled={loadingMore}
                            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground text-[0.68rem] font-bold tracking-[0.14em] uppercase px-8 py-3.5 hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loadingMore ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden />
                                    Loading…
                                </>
                            ) : (
                                'Load More Events'
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
