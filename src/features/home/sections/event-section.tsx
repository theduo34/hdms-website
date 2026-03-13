"use client"

import { motion } from "motion/react"
import { useRef, useState } from "react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { CarouselButton } from "@/components/shared/carousel-button"
import { CTAButton } from "@/components/shared/cta-button"
import { headingStyle } from "@/styles/font"
import { HDMLetters } from "@/components/shared/hdm-letters";
import { events } from "@/features/home";
import { EventCard } from "@/features/home/cards/event-card";
import { useIsMobile } from "@/hooks/use-mobile"

export const CARD_W = 280
const CARD_G = 16
const EASE = [0.16, 1, 0.3, 1] as const

export function EventsSection() {

    const sectionRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    const [idx, setIdx] = useState(0)
    const [busy, setBusy] = useState(false)

    const scroll = (dir: "left" | "right") => {
        if (busy) return
        setBusy(true)

        setIdx(prev =>
            dir === "right"
                ? (prev + 1) % events.length
                : (prev - 1 + events.length) % events.length
        )
    }

    const onDone = () => {
        setBusy(false)
    }

    const x = isMobile
        ? `calc(50% - ${CARD_W / 2}px - ${idx} * (${CARD_W}px + ${CARD_G}px))`
        : `calc(-${idx} * (${CARD_W}px + ${CARD_G}px))`

    return (
        <div
            ref={sectionRef}
            id="events"
            aria-labelledby="events-heading"
            className="section bg-background relative overflow-hidden"
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.04]">
                <HDMLetters
                    variant="centered"
                    size="full"
                    filled
                    color="var(--color-primary)"
                    animate={false}
                />
            </div>

            <AnimateInView yOffset={5} duration={0.6} className="flex justify-center mb-12">
                <SectionLabel label="UPCOMING EVENTS" textColor="var(--color-foreground)" />
            </AnimateInView>

            <div className="section-left flex flex-col md:flex-row items-center justify-center md:justify-center gap-12 md:gap-16">

                <div className="w-full items-center justify-center md:w-72 shrink-0 flex flex-col gap-6">
                    <h2
                        id="events-heading"
                        className="section-header text-center md:text-start font-black italic uppercase leading-[0.9] text-primary"
                        style={headingStyle}
                    >
                        <span className="block md:hidden">
                            SEE WHAT GOES ON
                        </span>
                        <span className="hidden md:block">
                            SEE WHAT<br />GOES ON
                        </span>
                    </h2>

                    <p className="mx text-center md:text-start text-sm leading-relaxed text-foreground/60 max-w-xs">
                        Stay up to date and make sure you never miss out on exciting events and performances.
                    </p>

                    <CTAButton
                        href="/events"
                        className="hidden md:flex items-center justify-center w-fit py-6 bg-transparent border text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        View Full Calendar
                    </CTAButton>
                </div>

                <AnimateInView
                    xOffset={5}
                    yOffset={0}
                    duration={0.75}
                    delay={0.1}
                    className="flex-1 min-w-0"
                >

                    <div
                        className="overflow-visible md:overflow-hidden"
                        style={{
                            maskImage: "linear-gradient(to right, transparent 0%, black 48px, black 100%)",
                            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 48px, black 100%)",
                        }}
                    >

                        <motion.div
                            className="flex"
                            style={{ gap: `${CARD_G}px` }}
                            animate={{ x }}
                            transition={{ duration: 0.55, ease: EASE }}
                            onAnimationComplete={onDone}
                        >

                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}

                        </motion.div>

                    </div>

                </AnimateInView>
            </div>

            <div className="flex justify-center gap-4 mt-12">
                <CarouselButton
                    onClick={() => scroll("left")}
                    disabled={false}
                    label="Previous"
                    className="bg-primary text-primary-foreground"
                >
                    &lt;
                </CarouselButton>

                <CarouselButton
                    onClick={() => scroll("right")}
                    disabled={false}
                    label="Next"
                    className="bg-primary text-primary-foreground"
                >
                    &gt;
                </CarouselButton>
            </div>

        </div>
    )
}