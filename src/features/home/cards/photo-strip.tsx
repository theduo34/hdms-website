'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { headingStyle } from '@/styles/font'

interface StripPhoto {
    id: string
    src: string
    alt: string
    caption: string
    width: number
    height: number
}

function StripSkeleton() {
    return (
        <div className="z-30 relative">
            <div className="flex gap-4 items-center overflow-x-hidden py-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={`shrink-0 w-77.5 h-77.5 rounded-lg bg-muted animate-pulse border-6 border-secondary/30 ${i % 2 === 0 ? '-translate-y-7' : 'translate-y-7'}`}
                        style={{ animationDelay: `${i * 80}ms` }}
                    />
                ))}
            </div>
        </div>
    )
}

export function PhotoStrip({ externalPaused }: { externalPaused: boolean }) {
    const [photos, setPhotos] = useState<StripPhoto[]>([])
    const [ready, setReady] = useState(false)

    useEffect(() => {
        fetch('/api/campus/photo-strip')
            .then(r => r.json())
            .then((data: StripPhoto[]) => {
                setPhotos(Array.isArray(data) && data.length > 0 ? data : [])
                setReady(true)
            })
            .catch(() => setReady(true))
    }, [])

    if (!ready) return <StripSkeleton />
    if (photos.length === 0) return null

    const loopedPhotos = [...photos, ...photos]

    return <StripInner photos={loopedPhotos} externalPaused={externalPaused} />
}

function StripInner({ photos, externalPaused }: { photos: StripPhoto[]; externalPaused: boolean }) {
    const stripRef = useRef<HTMLDivElement>(null)
    const posRef = useRef(0)
    const hoverPausedRef = useRef(false)
    const rafRef = useRef<number>(0)
    const SPEED = 0.48

    useEffect(() => {
        const strip = stripRef.current
        if (!strip) return
        const tick = () => {
            if (!hoverPausedRef.current && !externalPaused && strip) {
                posRef.current += SPEED
                const half = strip.scrollWidth / 2
                if (posRef.current >= half) posRef.current = 0
                strip.scrollLeft = posRef.current
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [externalPaused])

    const touchStartX = useRef(0)
    const touchScrollLeft = useRef(0)

    return (
        <div className="z-30 relative">
            <div
                ref={stripRef}
                className="flex gap-4 items-center overflow-x-hidden py-8"
                style={{ scrollbarWidth: 'none', userSelect: 'none' }}
                onMouseEnter={() => { hoverPausedRef.current = true }}
                onMouseLeave={() => { hoverPausedRef.current = false }}
                onTouchStart={e => {
                    hoverPausedRef.current = true
                    touchStartX.current = e.touches[0].clientX
                    touchScrollLeft.current = posRef.current
                }}
                onTouchMove={e => {
                    if (!stripRef.current) return
                    const dx = touchStartX.current - e.touches[0].clientX
                    posRef.current = touchScrollLeft.current + dx
                    stripRef.current.scrollLeft = posRef.current
                }}
                onTouchEnd={() => { hoverPausedRef.current = false }}
            >
                {photos.map((photo, i) => {
                    const isEven = i % 2 === 0
                    const [title, location] = photo.caption.split('·').map(s => s.trim())
                    return (
                        <div
                            key={`${photo.id}-${i}`}
                            className={`group relative shrink-0 w-77.5 h-77.5 border-6 rounded-lg border-secondary overflow-hidden transition-transform duration-500 ${isEven ? '-translate-y-7' : 'translate-y-7'}`}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="310px"
                                loading="lazy"
                                draggable={false}
                                className="object-cover"
                                unoptimized
                            />

                            {/* Desktop: hover-reveal overlay */}
                            <div
                                className="absolute inset-3 rounded-md hidden md:flex flex-col items-center justify-center gap-5 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{ background: 'var(--color-secondary)' }}
                            >
                                <p className="text-xl font-bold text-center uppercase tracking-[0.15em] text-white" style={headingStyle}>
                                    {title}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/60">
                                    {location}
                                </p>
                                <Link
                                    href="/campus-life/facilities"
                                    className="flex items-center justify-center px-6 h-10 rounded-full border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors duration-200"
                                >
                                    Learn More
                                </Link>
                            </div>

                            {/* Mobile: always-visible bottom bar */}
                            <div
                                className="absolute bottom-0 left-0 right-0 md:hidden flex items-center justify-between px-3 py-2.5 z-10"
                                style={{ background: 'var(--color-secondary)' }}
                            >
                                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary truncate flex-1 mr-2">
                                    {location}
                                </p>
                                <Link
                                    href="/campus-life/facilities"
                                    aria-label={`Learn more about ${title}`}
                                    className="text-[9px] font-bold uppercase tracking-wider text-primary border border-primary rounded-full px-2.5 py-1 shrink-0 whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
