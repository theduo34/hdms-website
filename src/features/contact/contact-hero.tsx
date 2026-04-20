'use client'

import { motion } from 'motion/react'
import { Mail } from 'lucide-react'
import { headingStyle } from '@/styles/font'

const EASE = [0.16, 1, 0.3, 1] as const

export function ContactHero() {
    return (
        <header className="relative overflow-hidden bg-muted">
            <span
                className="absolute right-0 -bottom-4 font-black italic leading-none text-foreground/[0.04] pointer-events-none select-none whitespace-nowrap"
                style={{ ...headingStyle, fontSize: 'clamp(5rem, 13vw, 10rem)' }}
                aria-hidden
            >
                Contact
            </span>

            <div className="px-4 md:px-16 pt-36 pb-10 md:pb-14 relative">
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <Mail className="w-3.5 h-3.5 text-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                        Get In Touch
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
                        <span className="italic block">We&apos;d love to</span>
                        <span className="text-secondary">hear from you.</span>
                    </motion.h1>
                </div>

                <motion.p
                    className="mt-5 text-[0.88rem] font-light leading-[1.85] max-w-130"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
                >
                    Whether it&apos;s a question about admissions, a campus visit, or just a conversation — our team is here to help. Every message is read and responded to personally.
                </motion.p>
            </div>

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
