"use client"

import { motion } from "motion/react"
import { headingStyle } from "@/styles/font"

const EASE = [0.16, 1, 0.3, 1] as const

export function AboutHero() {
    return (
        <section
            className="relative w-full bg-hdm-navy-dark overflow-hidden pt-32 md:pt-44 pb-28 md:pb-36"
            aria-label="About Heaven's Dew Montessori"
        >
            {/* Diagonal grid texture */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, var(--hdm-white) 0, var(--hdm-white) 1px, transparent 0, transparent 50%)",
                    backgroundSize: "28px 28px",
                }}
                aria-hidden
            />

            {/* Right-side gradient glow */}
            <div
                className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 80% at 100% 40%, color-mix(in oklch, var(--hdm-blue) 20%, transparent), transparent)",
                }}
                aria-hidden
            />

            {/* Vertical accent line */}
            <span
                className="absolute top-0 bottom-0 w-px pointer-events-none hidden md:block"
                style={{
                    left: "calc((100% - min(81.25rem, 100%)) / 2 + 3rem)",
                    background:
                        "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--hdm-yellow) 18%, transparent) 30%, color-mix(in oklch, var(--hdm-yellow) 18%, transparent) 70%, transparent)",
                }}
                aria-hidden
            />

            <div className="relative max-w-325 mx-auto px-4 md:px-12">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex items-center gap-3 mb-10"
                >
                    <span className="block w-8 h-px bg-hdm-yellow" aria-hidden />
                    <span className="text-[0.65rem] tracking-[0.35em] uppercase text-hdm-yellow font-medium">
                        About Us
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
                    className="text-[clamp(3.25rem,8.5vw,7rem)] italic leading-[1.0] tracking-[-0.025em] text-white mb-8"
                    style={headingStyle}
                >
                    The Story<br />
                    Behind{" "}
                    <span className="text-hdm-yellow">Heaven&apos;s Dew.</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
                    className="text-[1.05rem] leading-[1.85] max-w-lg"
                    style={{ color: "color-mix(in oklch, var(--hdm-white) 60%, transparent)" }}
                >
                    Faith, Diligence, and Excellence — three pillars that have shaped
                    every child who has walked through our doors since 2017.
                </motion.p>
            </div>

            {/* Bottom fade to page background */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, var(--background), transparent)",
                }}
                aria-hidden
            />
        </section>
    )
}
