'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Images, Video } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { formatDate } from '@/lib/format-date'
import { useGalleryEvent } from '@/hooks/gallery/use-gallery-event'

function AlbumSkeleton() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="h-[55vh] min-h-[400px] bg-muted animate-pulse" />
            <div className="max-w-[var(--max-width,1400px)] mx-auto w-full px-16 max-lg:px-4 py-12">
                <div className="space-y-4 mb-12 max-w-[560px]">
                    <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-5 bg-muted rounded animate-pulse" />
                    <div className="h-5 w-4/5 bg-muted rounded animate-pulse" />
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="break-inside-avoid mb-3 bg-muted animate-pulse"
                            style={{ height: `${200 + (i % 3) * 80}px`, animationDelay: `${i * 60}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function GalleryEventAlbum({ eventId }: { eventId: string }) {
    const { data, loading, notFound } = useGalleryEvent(eventId)

    if (loading) return <AlbumSkeleton />

    if (notFound || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-[0.9rem] text-muted-foreground font-light">Event not found.</p>
                <Link
                    href="/gallery?tab=events"
                    className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-secondary hover:text-secondary/80 transition-colors duration-200"
                >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
                    Back to Events
                </Link>
            </div>
        )
    }

    const { event, photos } = data

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="100vw"
                    className="brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 px-16 max-lg:px-4 pb-12">
                    <Link
                        href="/gallery?tab=events"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[0.62rem] tracking-[0.16em] uppercase font-bold mb-6 transition-colors duration-200"
                    >
                        <ArrowLeft className="w-3 h-3" aria-hidden />
                        All Events
                    </Link>
                    <p className="text-[0.58rem] tracking-[0.24em] uppercase font-bold text-secondary mb-2.5">
                        {formatDate(event.eventDate)}
                    </p>
                    <h1
                        className="font-black text-white leading-[0.93] max-w-[680px]"
                        style={{ ...headingStyle, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                    >
                        {event.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-[var(--max-width,1400px)] mx-auto w-full px-16 max-lg:px-4 py-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-10 border-b border-border mb-10">
                    <div className="flex items-start gap-6 max-w-[560px]">
                        <div className="w-8 h-px bg-secondary/60 shrink-0 mt-[0.6rem]" aria-hidden />
                        <p className="text-[0.9rem] font-light leading-[1.85]">
                            {event.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-8 shrink-0">
                        <div>
                            <span
                                className="block font-black text-foreground tabular-nums leading-none mb-1"
                                style={{ ...headingStyle, fontSize: '2rem' }}
                            >
                                {event.photoCount}
                            </span>
                            <span className="flex items-center gap-1.5 text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                                <Images className="w-3 h-3" aria-hidden />
                                Photos
                            </span>
                        </div>
                        {event.videoCount > 0 && (
                            <div>
                                <span
                                    className="block font-black text-foreground tabular-nums leading-none mb-1"
                                    style={{ ...headingStyle, fontSize: '2rem' }}
                                >
                                    {event.videoCount}
                                </span>
                                <span className="flex items-center gap-1.5 text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                                    <Video className="w-3 h-3" aria-hidden />
                                    Videos
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-8">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Album</span>
                </div>

                {photos.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                        {photos.map((photo, i) => (
                            <div key={photo.id} className="break-inside-avoid mb-3">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading={i < 6 ? 'eager' : 'lazy'}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="py-24 text-center text-muted-foreground text-[0.9rem] font-light">
                        No photos in this album yet.
                    </p>
                )}
            </div>
        </div>
    )
}
