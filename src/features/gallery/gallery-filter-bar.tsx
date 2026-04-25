'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SubCategory } from './gallery'

interface FilterOption {
    id: SubCategory
    label: string
    count?: number
}

interface Props {
    active: SubCategory
    filters: FilterOption[]
    onChange: (id: SubCategory) => void
    isSearchMode: boolean
    onSearchToggle: () => void
    searchTerm: string
    onSearch: (term: string) => void
}

export function GalleryFilterBar({
    active, filters, onChange,
    isSearchMode, onSearchToggle, searchTerm, onSearch,
}: Props) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
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

    useEffect(() => {
        if (isSearchMode) inputRef.current?.focus()
    }, [isSearchMode])

    return (
        <>
            <div ref={sentinelRef} className="h-px" aria-hidden />
            <div
                className={cn(
                    'sticky top-[var(--nav-height,0.01rem)] z-[30] transition-all duration-300',
                    stuck
                        ? 'bg-primary backdrop-blur-md border-b border-border shadow-sm py-3'
                        : 'bg-background border-b border-border/50 py-4'
                )}
            >
                <div className="max-w-[var(--max-width,1400px)] mx-auto px-16 max-lg:px-4">
                    {isSearchMode ? (
                        <div
                            className={cn(
                                'flex items-center gap-3 border rounded-full px-4 py-2 transition-colors duration-200',
                                stuck
                                    ? 'border-secondary/30 bg-white/5'
                                    : 'border-border bg-muted/60'
                            )}
                        >
                            <Search
                                className={cn(
                                    'w-3.5 h-3.5 shrink-0',
                                    stuck ? 'text-secondary/70' : 'text-muted-foreground'
                                )}
                                aria-hidden
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchTerm}
                                onChange={e => onSearch(e.target.value)}
                                placeholder="Search photos, videos, events…"
                                className={cn(
                                    'flex-1 bg-transparent border-none outline-none text-[0.8rem] min-w-0',
                                    'placeholder:text-muted-foreground/50',
                                    stuck ? 'text-primary-foreground' : 'text-foreground'
                                )}
                                aria-label="Search gallery"
                            />
                            <button
                                onClick={() => { onSearch(''); onSearchToggle() }}
                                className={cn(
                                    'shrink-0 rounded-full p-0.5 transition-colors duration-150',
                                    stuck
                                        ? 'text-secondary/70 hover:text-secondary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                                aria-label="Exit search"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-w-0">
                                {filters.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => onChange(f.id)}
                                        className="relative shrink-0 flex items-center gap-1.5 px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase font-medium rounded-full cursor-pointer font-[inherit] bg-transparent border-none whitespace-nowrap"
                                    >
                                        {active === f.id && (
                                            <motion.span
                                                layoutId="gallery-sub-pill"
                                                className={cn(
                                                    'absolute inset-0 rounded-full',
                                                    stuck ? 'bg-secondary' : 'bg-primary'
                                                )}
                                                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                            />
                                        )}
                                        <span
                                            className={cn(
                                                'relative z-10 transition-colors duration-150',
                                                active === f.id
                                                    ? 'text-primary-foreground'
                                                    : stuck
                                                        ? 'text-secondary/80 hover:text-secondary'
                                                        : 'text-muted-foreground hover:text-foreground'
                                            )}
                                        >
                                            {f.label}
                                        </span>
                                        {f.count !== undefined && (
                                            <span
                                                className={cn(
                                                    'relative z-10 text-[0.6rem] transition-colors duration-150',
                                                    active === f.id
                                                        ? 'text-primary-foreground/70'
                                                        : stuck
                                                            ? 'text-secondary/50'
                                                            : 'text-muted-foreground/60'
                                                )}
                                            >
                                                {f.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={onSearchToggle}
                                className={cn(
                                    'shrink-0 ml-2 p-2 rounded-full transition-colors duration-150',
                                    stuck
                                        ? 'text-secondary/70 hover:text-secondary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                                aria-label="Search gallery"
                            >
                                <Search className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
