'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { headingStyle } from '@/styles/font'
import { type GalleryPhoto, type GalleryVideo } from './gallery'
import { formatDate } from '@/lib/format-date'

const EASE = [0.16, 1, 0.3, 1] as const

export type LightboxItem = GalleryPhoto | GalleryVideo

interface Props {
    item: LightboxItem | null
    items: LightboxItem[]
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

export function GalleryLightbox({ item, items, onClose, onPrev, onNext }: Props) {
    const currentIndex = item ? items.findIndex(p => p.id === item.id) : -1
    const hasPrev = currentIndex > 0
    const hasNext = currentIndex < items.length - 1

    const handleKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft' && hasPrev) onPrev()
        if (e.key === 'ArrowRight' && hasNext) onNext()
    }, [onClose, onPrev, onNext, hasPrev, hasNext])

    useEffect(() => {
        if (!item) return
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [item, handleKey])

    const isVideo = item?.type === 'videos'

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${isVideo ? 'Video' : 'Photo'}: ${item.title}`}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
                        aria-label="Close"
                    >
                        <X className="w-4.5 h-4.5" />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-6 left-6 z-10">
                        <span className="text-[0.58rem] tracking-[0.22em] uppercase text-white/35 font-bold">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Prev */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev() }}
                        disabled={!hasPrev}
                        className="absolute left-4 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext() }}
                        disabled={!hasNext}
                        className="absolute right-4 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <motion.div
                        key={item.id}
                        className="flex flex-col items-center max-w-[90vw]"
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isVideo ? (
                            // Video embed
                            <div className="w-[min(90vw,960px)] aspect-video bg-black">
                                <iframe
                                    src={(item as GalleryVideo).videoUrl + '?autoplay=1&rel=0'}
                                    title={item.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            // Photo
                            <Image
                                src={(item as GalleryPhoto).src}
                                alt={item.alt}
                                width={(item as GalleryPhoto).width}
                                height={(item as GalleryPhoto).height}
                                style={{
                                    maxHeight: 'calc(82vh - 72px)',
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '90vw',
                                    display: 'block',
                                }}
                                priority
                                unoptimized
                                sizes="90vw"
                            />
                        )}

                        {/* Caption */}
                        <div className="w-full flex items-center justify-between gap-4 pt-4 px-1">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[0.55rem] tracking-[0.22em] uppercase font-bold text-white/35">
                                        {item.type === 'videos' ? 'Video' : 'Photo'}
                                    </span>
                                    <span className="text-white/20 text-[0.6rem]">·</span>
                                    <span className="text-[0.58rem] text-white/30 font-light">
                                        {formatDate(item.createdAt)}
                                    </span>
                                    {isVideo && (
                                        <>
                                            <span className="text-white/20 text-[0.6rem]">·</span>
                                            <span className="text-[0.58rem] text-secondary/70 font-bold">
                                                {(item as GalleryVideo).duration}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p
                                    className="text-[0.9rem] font-semibold text-white/80 leading-tight"
                                    style={headingStyle}
                                >
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dot strip */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] max-w-[50vw] px-2">
                        {items.map((p, i) => (
                            <span
                                key={p.id}
                                className={`shrink-0 rounded-full transition-all duration-200 ${
                                    i === currentIndex
                                        ? 'w-4 h-1.5 bg-secondary'
                                        : 'w-1.5 h-1.5 bg-white/25'
                                }`}
                                aria-hidden
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
