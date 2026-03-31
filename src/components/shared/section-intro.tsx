"use client"

import { ReactNode } from "react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

interface SectionIntroProps {
  tag: string
  heading: ReactNode
  body?: string
  center?: boolean
  light?: boolean
}

export function SectionIntro({ tag, heading, body, center = false, light = false }: SectionIntroProps) {
  return (
    <AnimateInView yOffset={20} duration={0.7} className={center ? "text-center" : ""}>
      <span className="section-label">{tag}</span>
      <h2
        className={`font-black italic leading-[1.0] tracking-[-0.02em] mb-4 ${light ? "text-primary-foreground" : "text-primary"}`}
        style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {heading}
      </h2>
      {body && (
        <p className="max-w-2xl leading-relaxed text-base mt-3">
          {body}
        </p>
      )}
    </AnimateInView>
  )
}
