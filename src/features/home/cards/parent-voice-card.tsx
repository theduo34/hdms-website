"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { headingStyle } from "@/styles/font"
import { getMediaUrl } from "@/lib/media"

export interface TestimonialItem {
  id: string
  parent_name: string
  child_year: string
  quote: string
  asset: { id: string; storage_path: string | null; alt: string } | null
}

export function ParentVoiceCard({ voice, index }: { voice: TestimonialItem; index: number }) {
  const [firstName, ...rest] = voice.parent_name.toUpperCase().split(" ")
  const lastName = rest.join(" ")
  const imageUrl = voice.asset ? getMediaUrl(voice.asset.storage_path) : "/images/placeholder.svg"

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className={`group relative rounded-2xl overflow-hidden bg-primary-foreground md:rotate-0 ${index % 2 === 0 ? "rotate-3" : "-rotate-3"}`}
      style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
    >
      {/* Yellow hover flash */}
      <div className="absolute inset-0 z-10 bg-secondary opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

      {/* Name + role at top */}
      <div className="relative z-20 px-5 pt-5 pb-3">
        <h3
          className="text-xl font-black uppercase leading-[0.9] text-primary"
          style={headingStyle}
        >
          <span className="block">{firstName}</span>
          {lastName && <span className="block">{lastName}</span>}
        </h3>
        <p className="text-xs text-foreground/40 mt-1.5">
          Parent{voice.child_year ? ` · ${voice.child_year}` : ''}
        </p>
        <p className="text-[0.7rem] italic text-foreground/50 mt-2 leading-snug line-clamp-2">
          &ldquo;{voice.quote}&rdquo;
        </p>
      </div>

      {/* Photo fills bottom */}
      <div className="relative h-62 md:h-54 w-full">
        <Image
          src={imageUrl}
          alt={voice.parent_name}
          fill
          sizes="(max-width: 768px) 80vw, 220px"
          className="object-cover object-top"
          unoptimized
        />
      </div>
    </motion.article>
  )
}
