"use client"

import { motion } from 'motion/react'
import { headingStyle } from '@/styles/font'

const EASE = [0.16, 1, 0.3, 1] as const

interface CampusHeroProps {
  line1: string
  line2: string
  watermark: string
  description: string
  section?: string
}

export function CampusHero({ line1, line2, watermark, description, section = 'Campus Life' }: CampusHeroProps) {
  return (
    <section className="relative min-h-screen bg-primary flex flex-col justify-end px-4 md:px-16 pb-24 pt-36 overflow-hidden">
      {/* Giant background watermark */}
      <span
        className="absolute -right-6 bottom-0 font-black italic leading-none text-primary-foreground/[0.04] pointer-events-none select-none"
        style={{ ...headingStyle, fontSize: 'clamp(9rem, 26vw, 22rem)' }}
        aria-hidden
      >
        {watermark}
      </span>

      {/* Animated decorative line */}
      <motion.div
        className="w-16 h-px bg-secondary mb-7"
        initial={{ scaleX: 0, originX: '0%' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {/* Label */}
      <motion.p
        className="text-[0.62rem] tracking-[0.38em] font-bold uppercase text-secondary mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        {section} · Heaven&apos;s Dew Montessori
      </motion.p>

      {/* Heading with clip reveal */}
      <div className="overflow-hidden mb-8">
        <motion.h1
          style={{ ...headingStyle, fontSize: 'clamp(3rem, 7.5vw, 7rem)' }}
          className="font-black leading-[0.9] text-primary-foreground"
          initial={{ y: 130, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
        >
          <em className="italic block">{line1}</em>
          <span className="text-secondary not-italic">{line2}</span>
        </motion.h1>
      </div>

      {/* Description */}
      <motion.p
        className="text-primary-foreground/50 text-[0.88rem] leading-[1.95] max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
      >
        {description}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        aria-hidden
      >
        <span className="text-[0.5rem] tracking-[0.35em] uppercase text-primary-foreground/20">Scroll</span>
        <motion.div
          className="w-px h-10 bg-secondary/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
