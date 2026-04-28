"use client"

import { useState, useEffect } from "react"
import { ParentVoiceCard } from "@/features/home/cards/parent-voice-card"
import type { TestimonialItem } from "@/features/home/cards/parent-voice-card"
import { SectionIntro } from "@/components/shared/section-intro"
import { CTAButton } from "@/components/shared/cta-button"
import { AnimateInView } from "@/components/shared/animate-in-view"

export function ParentVoicesShowcase() {
  const [voices, setVoices] = useState<TestimonialItem[]>([])

  useEffect(() => {
    fetch("/api/testimonials?random=true&limit=3")
      .then(r => r.json())
      .then((json: { data?: TestimonialItem[] }) => setVoices(json.data ?? []))
      .catch(() => {})
  }, [])

  if (voices.length === 0) return null

  return (
    <section aria-labelledby="voices-heading" className="section-container bg-muted">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <SectionIntro
          tag="Parent Voices"
          heading="What Our Families Say."
        />
        <AnimateInView yOffset={10} delay={0.15} duration={0.6}>
          <CTAButton href="/admissions/apply" variant="primary">
            Apply Now
          </CTAButton>
        </AnimateInView>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {voices.map((voice, i) => (
          <ParentVoiceCard key={voice.id} voice={voice} index={i} />
        ))}
      </div>
    </section>
  )
}
