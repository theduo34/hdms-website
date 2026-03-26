'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { PostCategory } from './news'

interface Props {
    active: PostCategory | 'all'
    filters: { id: PostCategory | 'all'; label: string; count: number }[]
    onChange: (id: PostCategory | 'all') => void
}

export function NewsFilterBar({ active, filters, onChange }: Props) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const [stuck, setStuck] = useState(false)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return
        const observer = new IntersectionObserver(
            ([entry]) => setStuck(!entry.isIntersecting),
            { threshold: 1, rootMargin: '-64px 0px 0px 0px' }
        )
        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <div ref={sentinelRef} className="h-px" aria-hidden />
            <div
                className={cn(
                    'sticky top-[var(--nav-height,0.01rem)] z-[40] transition-all duration-300',
                    stuck
                        ? 'bg-primary backdrop-blur-md border-b border-border shadow-sm py-3'
                        : 'bg-background border-b border-transparent py-5'
                )}
            >
                <div className="max-w-[var(--max-width,1400px)] mx-auto px-16 max-lg:px-8">
                    <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => onChange(f.id)}
                                className="relative shrink-0 flex items-center gap-1.5 px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase font-medium rounded-full cursor-pointer font-[inherit] bg-transparent border-none whitespace-nowrap"
                            >
                                {active === f.id && (
                                    <motion.span
                                        layoutId="filter-pill"
                                        className={`absolute inset-0 border-none rounded-full ${stuck ? "bg-secondary" : "bg-primary"}`}
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className={cn(
                                    'relative z-10 transition-colors duration-150',
                                    active === f.id ? `${stuck ? "text-primary-foreground" : "text-primary-foreground"}` : `${stuck ? "text-secondary/90" : "text-muted-foreground hover:text-foreground"}`
                                )}>
                                    {f.label}
                                </span>
                                <span className={cn(
                                    'relative z-10 text-[0.6rem] transition-colors duration-150',
                                    active === f.id ? `${stuck ? "text-primary-foreground" : "text-primary-foreground"}` : `${stuck ? "text-secondary/90" : "text-muted-foreground hover:text-foreground"}`
                                )}>
                                    {f.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
