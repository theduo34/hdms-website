'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Loader2 } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { formatDate } from '@/lib/format-date'
import { type GalleryVideo } from './gallery'

const EASE = [0.16, 1, 0.3, 1] as const

function VideoSkeleton({ i }: { i: number }) {
    return (
        <div className="w-full min-w-0" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="w-full aspect-video bg-muted animate-pulse" />
            <div className="pt-3 space-y-2">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
            </div>
        </div>
    )
}

function VideoItem({
    video,
    index,
    onOpen,
}: {
    video: GalleryVideo
    index: number
    onOpen: (video: GalleryVideo) => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: EASE }}
        >
            <button
                className="group w-full text-left font-[inherit] bg-transparent border-none p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
                onClick={() => onOpen(video)}
                aria-label={`Play: ${video.title}`}
            >
                <div className="relative overflow-hidden aspect-video bg-muted">
                    <Image
                        src={video.thumbnail}
                        alt={video.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 group-hover:scale-110">
                            <Play className="w-5 h-5 text-white ml-0.5" aria-hidden />
                        </div>
                    </div>

                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[0.6rem] font-bold tracking-[0.06em] px-2 py-0.5">
                        {video.duration}
                    </span>
                </div>

                <div className="pt-3">
                    <p
                        className="text-[0.9rem] font-semibold text-foreground leading-tight mb-1 group-hover:text-secondary transition-colors duration-200"
                        style={headingStyle}
                    >
                        {video.title}
                    </p>
                    <p className="text-[0.65rem] font-light text-muted-foreground">{formatDate(video.createdAt)}</p>
                </div>
            </button>
        </motion.div>
    )
}

interface Props {
    videos: GalleryVideo[]
    loading: boolean
    loadingMore: boolean
    hasMore: boolean
    total: number
    onOpen: (video: GalleryVideo) => void
    onLoadMore: () => void
}

export function GalleryVideos({ videos, loading, loadingMore, hasMore, total, onOpen, onLoadMore }: Props) {
    return (
        <div className="w-full">
            {loading ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <VideoSkeleton key={i} i={i} />
                    ))}
                </div>
            ) : videos.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center text-muted-foreground text-[0.9rem] font-light"
                >
                    No videos in this category yet.
                </motion.p>
            ) : (
                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {videos.map((video, i) => (
                            <VideoItem key={video.id} video={video} index={i} onOpen={onOpen} />
                        ))}
                    </div>
                </AnimatePresence>
            )}

            {!loading && videos.length > 0 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground">
                        Showing {videos.length} of {total} videos
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
                                'Load More Videos'
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
