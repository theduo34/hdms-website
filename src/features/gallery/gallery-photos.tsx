'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ZoomIn, Loader2 } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { formatDate } from '@/lib/format-date'
import { type GalleryPhoto } from './gallery'

const EASE = [0.16, 1, 0.3, 1] as const

function PhotoSkeleton({ i }: { i: number }) {
    const heights = ['h-56', 'h-72', 'h-48', 'h-64', 'h-80', 'h-52']
    return (
        <div
            className={`w-full break-inside-avoid mb-3 bg-muted animate-pulse ${heights[i % heights.length]}`}
            style={{ animationDelay: `${i * 60}ms` }}
        />
    )
}

function PhotoItem({
    photo,
    index,
    onOpen,
}: {
    photo: GalleryPhoto
    index: number
    onOpen: (photo: GalleryPhoto) => void
}) {
    return (
        <motion.div
            className="w-full break-inside-avoid mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, delay: (index % 12) * 0.035, ease: EASE }}
        >
            <button
                className="group relative w-full overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 block max-h-[460px]"
                onClick={() => onOpen(photo)}
                aria-label={`View: ${photo.title}`}
            >
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75">
                    <p
                        className="text-[0.85rem] font-semibold text-primary-foreground leading-tight"
                        style={headingStyle}
                    >
                        {photo.title}
                    </p>
                    <p className="text-[0.62rem] text-primary-foreground/50 mt-0.5 font-light">
                        {formatDate(photo.createdAt)}
                    </p>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-100">
                    <ZoomIn className="w-3.5 h-3.5 text-white" aria-hidden />
                </div>
            </button>
        </motion.div>
    )
}

interface Props {
    photos: GalleryPhoto[]
    loading: boolean
    loadingMore: boolean
    hasMore: boolean
    total: number
    onOpen: (photo: GalleryPhoto) => void
    onLoadMore: () => void
}

export function GalleryPhotos({ photos, loading, loadingMore, hasMore, total, onOpen, onLoadMore }: Props) {
    return (
        <div>
            {loading ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <PhotoSkeleton key={i} i={i} />
                    ))}
                </div>
            ) : photos.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center text-muted-foreground text-[0.9rem] font-light"
                >
                    No photos in this category yet.
                </motion.p>
            ) : (
                <AnimatePresence mode="popLayout">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                        {photos.map((photo, i) => (
                            <PhotoItem key={photo.id} photo={photo} index={i} onOpen={onOpen} />
                        ))}
                    </div>
                </AnimatePresence>
            )}

            {!loading && photos.length > 0 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground">
                        Showing {photos.length} of {total} photos
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
                                'Load More Photos'
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
