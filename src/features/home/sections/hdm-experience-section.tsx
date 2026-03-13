"use client"

import { useRef, useState } from "react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { motion } from "motion/react"
import { HDMLetters } from "@/components/shared/hdm-letters"
import { CarouselButton } from "@/components/shared/carousel-button"
import { SectionLabel } from "@/components/shared/section-label"
import { experiences } from "@/features/home"
import { HdmExperienceCard } from "@/features/home/cards/hdm-experience-card";
import {headingStyle} from "@/styles/font";

const CARD_WIDTH_MOBILE = 72
const CARD_GAP_MOBILE = 16
const CARD_WIDTH_DESKTOP = 250
const CARD_GAP_DESKTOP = 32

export function HdmExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    const ITEMS = [...experiences, ...experiences, ...experiences]
    const MID_OFFSET = experiences.length

    const [activeIndex, setActiveIndex] = useState(MID_OFFSET)
    const [isAnimating, setIsAnimating] = useState(false)

    const scroll = (dir: "left" | "right") => {
        if (isAnimating) return
        setIsAnimating(true)
        setActiveIndex(prev => dir === "right" ? prev + 1 : prev - 1)
    }

    const handleAnimationComplete = () => {
        setIsAnimating(false)
        if (activeIndex >= experiences.length * 2) {
            setActiveIndex(experiences.length)
        } else if (activeIndex < experiences.length) {
            setActiveIndex(experiences.length * 2 - 1)
        }
    }

    const mobileX = `calc(50vw - ${CARD_WIDTH_MOBILE / 2}vw - ${activeIndex} * (${CARD_WIDTH_MOBILE}vw + ${CARD_GAP_MOBILE}px))`
    const desktopX = `calc(-${activeIndex} * (${CARD_WIDTH_DESKTOP}px + ${CARD_GAP_DESKTOP}px))`

    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            ref={sectionRef}
            className="section relative overflow-hidden bg-background"
        >
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.04]">
                <HDMLetters variant="centered" size="full" filled color="var(--color-primary)" animate={false} />
            </div>

            <AnimateInView yOffset={5} duration={0.8} className="text-center mb-16 relative z-10">
                <SectionLabel label="THE HDMs EXPERIENCE" textColor="var(--color-foreground)" />
            </AnimateInView>

            <div className="section-left relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12">
                <AnimateInView
                    xOffset={-50}
                    yOffset={0}
                    duration={1}
                    className="md:w-80 shrink-0 md:pt-4"
                >
                    <h2
                        className="section-header text-center md:text-start font-black italic uppercase leading-[0.9] text-primary mb-6"
                        style={headingStyle}
                    >
                        <span className={"flex md:hidden flex-col gap-1"}>
                            <span>THE WORLD</span>
                            <span>IS YOURS</span>
                        </span>
                        <span className={"hidden md:block"}> THE<br />WORLD<br />IS YOURS</span>

                    </h2>
                    <p className="text-[15px] leading-relaxed text-foreground/80 max-w-sm mx-auto md:mx-0 font-medium">
                        {`Explore some of the traits that make education and art flow more fluidly at Heaven's Dew Montessori School.`}
                    </p>
                </AnimateInView>

                <div className="flex-1 min-w-0 w-full overflow-hidden">
                    <div className="md:hidden py-4 -mx-4 overflow-hidden">
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: mobileX }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            onAnimationComplete={handleAnimationComplete}
                        >
                            {ITEMS.map((exp, i) => (
                                <HdmExperienceCard
                                    key={`${exp.title}-${i}`}
                                    exp={exp}
                                    index={i}
                                    isInView={true}
                                    isMobile
                                />
                            ))}
                        </motion.div>
                    </div>

                    <AnimateInView xOffset={5} yOffset={0} duration={1} delay={0.2} className="hidden md:block overflow-hidden px-4 py-4 w-full">
                        <motion.div
                            className="flex gap-8"
                            animate={{ x: desktopX }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            onAnimationComplete={handleAnimationComplete}
                        >
                            {ITEMS.map((exp, i) => (
                                <HdmExperienceCard
                                    key={`${exp.title}-${i}`}
                                    exp={exp}
                                    index={i}
                                    isInView={true}
                                    isMobile={false}
                                />
                            ))}
                        </motion.div>
                    </AnimateInView>
                </div>
            </div>

            <AnimateInView yOffset={5} duration={0.9} className="flex justify-center gap-4 mt-8">
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
            </AnimateInView>
        </section>
    )
}
