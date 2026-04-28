"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { ParentVoiceCard } from "@/features/home/cards/parent-voice-card"
import { CTAButton } from "@/components/shared/cta-button"
import { headingStyle } from "@/styles/font"
import { getMediaUrl } from "@/lib/media"
import type { TestimonialItem } from "@/features/home/cards/parent-voice-card"

function SectionText({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`flex flex-col gap-6 ${mobile ? "items-center text-center" : ""}`}>
      <SectionLabel label="OUR FAMILIES" />
      <h2
        className="section-header text-center flex flex-col gap-1 mt-6"
        style={headingStyle}
      >
        <span>VOICES OF</span>
        <span>HDM PARENTS</span>
      </h2>
      <p className="text-primary-foreground/60 text-sm max-w-sm">
        Every family that chooses Heaven&apos;s Dew Montessori brings a unique story.
        Here are a few of the voices that make our community extraordinary.
      </p>
    </div>
  )
}

export function ParentVoicesSection() {
  const [voices, setVoices] = useState<TestimonialItem[]>([])

  useEffect(() => {
    fetch("/api/testimonials?random=true&limit=5")
      .then(r => r.json())
      .then((json: { data?: TestimonialItem[] }) => setVoices(json.data ?? []))
      .catch(() => {})
  }, [])

  const col1 = voices.filter((_, i) => i % 2 === 0)
  const col2 = voices.filter((_, i) => i % 2 !== 0)

  return (
    <section id="parent-voices" className="section relative bg-primary overflow-hidden">

      {/* Desktop layout */}
      <div className="hidden md:flex items-start gap-8 section-left">
        <div className="flex flex-col gap-4 w-52 shrink-0">
          {col1.map((voice, i) => (
            <ParentVoiceCard key={voice.id} voice={voice} index={i} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-52 shrink-0 mt-20">
          {col2.map((voice, i) => (
            <ParentVoiceCard key={voice.id} voice={voice} index={i + 1} />
          ))}
        </div>

        <AnimateInView
          xOffset={5}
          yOffset={0}
          duration={0.8}
          className="sticky top-32 self-start pl-10 flex flex-col gap-6"
        >
          <SectionText />
          <CTAButton href="/community/parents" className="w-full py-6 mt-8">
            Meet Our Community
          </CTAButton>
        </AnimateInView>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-12">
        <AnimateInView yOffset={5} duration={0.6}>
          <SectionText mobile />
        </AnimateInView>

        <div className="flex flex-col px-4">
          {voices.map((voice, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className={`w-[75%] ${isEven ? "mr-auto" : "ml-auto"} ${i !== 0 ? "-mt-4" : ""}`}
              >
                <ParentVoiceCard voice={voice} index={i} />
              </motion.div>
            )
          })}
        </div>

        <div className="flex mx-auto md:hidden">
          <CTAButton href="/community/parents" className="w-fit py-6">
            Meet Our Community
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
