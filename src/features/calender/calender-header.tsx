'use client'

import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import {getAcademicYear} from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const

export function CalenderHeader() {
     const { label, endYear } = getAcademicYear()

    return (
        <header className="relative overflow-hidden bg-muted page-header">
            <span
                className="absolute -right-8 -bottom-4 font-black leading-none text-foreground/2.5 pointer-events-none select-none"
                style={{ ...headingStyle, fontSize: 'clamp(8rem, 20vw, 18rem)' }}
                aria-hidden
            >
                {endYear}
            </span>

            <motion.div
                className="section-tag"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
            >
                <CalendarDays className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                    {label}
                </span>
            </motion.div>

            <div className="mt-4 overflow-hidden">
                <motion.h1
                    className="font-black leading-[0.93] max-w-180 text-foreground"
                    style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                >
                    <span className="italic block">School</span>
                    <span className="text-secondary" style={headingStyle}>Calendar.</span>
                </motion.h1>
            </div>

            <motion.p
                className="mt-4 text-[0.95rem] max-w-125 leading-[1.8]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            >
                Stay on top of term dates, school events, examinations, and holidays
                across the full academic year.
            </motion.p>

            <motion.div
                className="absolute bottom-0 left-0 h-0.75 bg-secondary rounded-r-full"
                initial={{ width: 0 }}
                animate={{ width: '6rem' }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                aria-hidden
            />
        </header>
    )
}
