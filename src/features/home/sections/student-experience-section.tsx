"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { SectionLabel } from "@/components/shared/section-label"
import { headingStyle } from "@/styles/font"
import { EventsSection } from "@/features/home/sections/event-section";
import { NextStepSection } from "@/features/home/sections/next-steps-section";

export function StudentExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

    return (
        <section
            ref={sectionRef}
            id="student-experience"
            aria-labelledby="student-experience-heading"
            className="section bg-background"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
            >
                <SectionLabel label="LIFE ON & OFF CAMPUS" textColor="var(--color-foreground)" />
                <h2
                    id="student-experience-heading"
                    className="my-8 section-header uppercase text-primary leading-[0.9]"
                    style={headingStyle}
                >
                    THE STUDENT EXPERIENCE
                </h2>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto w-full md:w-[60%] rounded-2xl overflow-hidden bg-accent"
                style={{ aspectRatio: "16/9" }}
            >
                <iframe
                    src="https://www.youtube.com/embed/r97tWyMyJDk"
                    title="The Student Experience at Heaven's Dew Montessori"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                />
            </motion.div>
            <EventsSection />
            <NextStepSection />
        </section>
    )
}