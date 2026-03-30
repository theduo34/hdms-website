'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'
import {
    ClipboardList, Banknote, MapPin, Images, CalendarDays,
    Newspaper, BookOpen, Info, GraduationCap, School,
} from 'lucide-react'
import { headingStyle } from '@/styles/font'

const EASE = [0.16, 1, 0.3, 1] as const

const ICONS = {
    clipboard:    ClipboardList,
    banknote:     Banknote,
    mappin:       MapPin,
    images:       Images,
    calendardays: CalendarDays,
    newspaper:    Newspaper,
    bookopen:     BookOpen,
    info:         Info,
    graduation:   GraduationCap,
    school:       School,
} as const

type IconName = keyof typeof ICONS

interface PageHeaderProps {
    iconName:     IconName
    label:        string
    headingLine1: string
    headingLine2: string
    watermark:    string
    description?: string
    accentLine?:  boolean
    children?:    ReactNode
}

export function PageHeader({
    iconName,
    label,
    headingLine1,
    headingLine2,
    watermark,
    description,
    accentLine = false,
    children,
}: PageHeaderProps) {
    const Icon = ICONS[iconName]

    return (
        <header className="relative overflow-hidden bg-muted">
            <span
                className="absolute right-0 -bottom-4 font-black italic leading-none text-foreground/[0.04] pointer-events-none select-none whitespace-nowrap"
                style={{ ...headingStyle, fontSize: 'clamp(5rem, 13vw, 10rem)' }}
                aria-hidden
            >
                {watermark}
            </span>

            <div className="px-4 md:px-16 pt-36 pb-8 md:pb-12 relative">
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <Icon className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                        {label}
                    </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        className="font-black leading-[0.93] max-w-170"
                        style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
                        initial={{ y: 90, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: EASE }}
                    >
                        <span className="italic block">{headingLine1}</span>
                        <span className="text-secondary">{headingLine2}</span>
                    </motion.h1>
                </div>

                {description && (
                    <motion.p
                        className="mt-5 text-[0.88rem] font-light leading-[1.85] max-w-130"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
                    >
                        {description}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                    >
                        {children}
                    </motion.div>
                )}
            </div>

            {accentLine && (
                <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-secondary rounded-r-full"
                    initial={{ width: 0 }}
                    animate={{ width: '6rem' }}
                    transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                    aria-hidden
                />
            )}
        </header>
    )
}
