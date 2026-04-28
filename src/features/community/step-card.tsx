"use client"

import { headingStyle } from "@/styles/font"

interface StepCardProps {
  step: {
    number: string
    title: string
    description: string
  }
}

export function StepCard({ step }: StepCardProps) {
  return (
    <article className="group relative h-full flex flex-col bg-primary rounded-2xl p-7 overflow-hidden">
      <span
        className="absolute -bottom-4 -right-2 text-[7rem] font-black text-white/[0.04] leading-none select-none pointer-events-none"
        aria-hidden
        style={headingStyle}
      >
        {step.number}
      </span>

      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-primary text-xs font-black shrink-0">
          {step.number}
        </span>
      </div>

      <h3
        className="text-primary-foreground font-bold text-lg mb-3 leading-snug"
        style={headingStyle}
      >
        {step.title}
      </h3>
      <p className="text-primary-foreground/55 text-sm leading-relaxed flex-1">
        {step.description}
      </p>

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden
      />
    </article>
  )
}
