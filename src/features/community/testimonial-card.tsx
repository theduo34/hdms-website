"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { headingStyle } from "@/styles/font"
import { getMediaUrl } from "@/lib/media"
import type { TestimonialItem } from "@/features/home/cards/parent-voice-card"

interface TestimonialCardProps {
  item: TestimonialItem
  delay?: number
}

export function TestimonialCard({ item, delay = 0 }: TestimonialCardProps) {
  const imageUrl = item.asset ? getMediaUrl(item.asset.storage_path) : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className="flex flex-col bg-white rounded-2xl p-6 md:p-7 border border-border/40 hover:border-secondary/50 hover:shadow-md transition-all duration-300"
    >
      <span
        className="text-5xl font-black text-secondary leading-none select-none mb-2"
        aria-hidden
        style={headingStyle}
      >
        &ldquo;
      </span>

      <p className="text-foreground/70 text-sm leading-relaxed flex-1">{item.quote}</p>

      <div className="w-10 h-px bg-secondary/50 my-5" aria-hidden />

      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-border bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.parent_name}
              fill
              sizes="44px"
              className="object-cover object-top"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-bold">
              {item.parent_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-primary font-semibold text-sm leading-tight truncate">
            {item.parent_name}
          </p>
          {item.child_year && (
            <p className="text-foreground/40 text-xs mt-0.5">Parent · {item.child_year}</p>
          )}
        </div>
      </div>
    </motion.article>
  )
}
