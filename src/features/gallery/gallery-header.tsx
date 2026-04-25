'use client'

import { motion } from 'motion/react'
import { Images } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { cn } from '@/lib/utils'
import { type MainCategory } from './gallery'
import { type GalleryCounts } from './gallery-api'

const EASE = [0.16, 1, 0.3, 1] as const

const TAB_DEFS: { id: MainCategory; label: string }[] = [
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'events', label: 'Events' },
]

interface Props {
    activeMain: MainCategory
    onMainChange: (id: MainCategory) => void
    counts: GalleryCounts
}

export function GalleryHeader({ activeMain, onMainChange, counts }: Props) {
    return (
        <header className="relative overflow-hidden bg-muted">
            <span
                className="absolute right-0 -bottom-4 font-black italic leading-none text-foreground/4 pointer-events-none select-none whitespace-nowrap"
                style={{ ...headingStyle, fontSize: 'clamp(5rem, 13vw, 10rem)' }}
                aria-hidden
            >
                Gallery
            </span>

            <div className="px-16 max-lg:px-4 pt-36 pb-6 relative">
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <Images className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                        School Life in Pictures
                    </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        className="font-black leading-[0.93] max-w-170 text-foreground"
                        style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
                        initial={{ y: 90, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: EASE }}
                    >
                        <span className="italic block">Our</span>
                        <span className="text-secondary" style={headingStyle}>Gallery.</span>
                    </motion.h1>
                </div>

                <motion.div
                    className="mt-5 flex items-start gap-6 max-w-125"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
                >
                    <p className="text-[0.88rem] font-light leading-[1.85]">
                        A window into everyday life at Heaven&apos;s Dew Montessori: classrooms,
                        celebrations, campus moments, and the faces of our thriving community.
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="px-16 max-lg:px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
                <div className="flex items-end gap-0 border-b border-border overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TAB_DEFS.map((tab) => {
                        const isActive = activeMain === tab.id
                        const count = counts[tab.id]
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onMainChange(tab.id)}
                                className={cn(
                                    'relative shrink-0 flex items-center gap-2 px-7 py-4 font-[inherit] bg-transparent border-none cursor-pointer transition-colors duration-200',
                                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="gallery-main-tab"
                                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-secondary rounded-t-full"
                                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                    />
                                )}
                                <span
                                    className={cn(
                                        'text-[0.75rem] font-bold tracking-[0.12em] uppercase relative z-10',
                                        isActive ? 'text-foreground' : ''
                                    )}
                                >
                                    {tab.label}
                                </span>
                                <span
                                    className={cn(
                                        'relative z-10 text-[0.6rem] tabular-nums font-medium',
                                        isActive ? 'text-secondary font-bold' : 'text-muted-foreground/55'
                                    )}
                                >
                                    {count}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </motion.div>
        </header>
    )
}
