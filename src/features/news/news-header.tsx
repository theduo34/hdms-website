'use client'

import { motion } from 'motion/react'
import { Newspaper } from 'lucide-react'
import { headingStyle } from '@/styles/font'

const EASE = [0.16, 1, 0.3, 1] as const

export function NewsHeader() {
    return (
        <header className="relative overflow-hidden bg-muted page-header">
            {/* Background watermark */}
            <span
                className="absolute -right-8 -bottom-6 text-[20rem] font-black leading-none text-foreground/[0.025] pointer-events-none select-none"
                style={headingStyle}
                aria-hidden
            >
                HDMs
            </span>

            {/* Label - slides in from left */}
            <motion.div
                className="section-tag"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
            >
                <Newspaper className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                    Stay Informed
                </span>
            </motion.div>

            <div className="mt-4 overflow-hidden">
                <motion.h1
                    className="font-black leading-[0.93] max-w-[720px] text-foreground"
                    style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                >
                    <span className="italic block">News &amp;</span>
                    <span className="text-secondary" style={headingStyle}>Announcements.</span>
                </motion.h1>
            </div>

            {/* Subtitle - fades up */}
            <motion.p
                className="mt-4 text-[0.95rem] max-w-[500px] leading-[1.8]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            >
                The latest from Heaven&apos;s Dew Montessori - school news, event updates,
                important notices, and everything in between.
            </motion.p>

            {/* Accent line draws from left */}
            <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-secondary rounded-r-full"
                initial={{ width: 0 }}
                animate={{ width: '6rem' }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                aria-hidden
            />
        </header>
    )
}
