"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { houses } from "@/features/about-us/about"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function HouseSystem() {
    const [active, setActive] = useState(0)
    const house = houses[active]

    return (
        <section id="houses" aria-labelledby="houses-heading" className="pt-20 pb-10">

            <AnimateInView yOffset={20} duration={0.9} delay={0.1} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[12px] tracking-[0.22em] uppercase">House System</span>
                </div>
                <h2
                    id="houses-heading"
                    className="text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.05] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    Four Houses.<br />
                    One Family.
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={16} duration={0.85} delay={0.15}>

                {/* Selector row */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border"
                    role="tablist"
                    aria-label="School houses"
                >
                    {houses.map((h, i) => (
                        <button
                            key={h.id}
                            role="tab"
                            aria-selected={active === i}
                            aria-controls={`house-panel-${h.id}`}
                            onClick={() => setActive(i)}
                            className={[
                                "relative text-left px-5 py-6 border-r border-b border-border",
                                "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                active === i ? "opacity-100" : "opacity-40 hover:opacity-70",
                            ].join(" ")}
                        >
                            {/* Active bottom bar */}
                            <span
                                className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                                style={{
                                    backgroundColor: h.bgColor,
                                    opacity: active === i ? 1 : 0,
                                }}
                                aria-hidden
                            />

                            <span
                                className="block w-3 h-3 rounded-full mb-4 transition-transform duration-300"
                                style={{
                                    backgroundColor: h.bgColor,
                                    transform: active === i ? "scale(1.2)" : "scale(1)",
                                }}
                                aria-hidden
                            />
                            <span className="block text-[10px] tracking-[0.2em] uppercase mb-1 text-foreground/50">
                                {h.label}
                            </span>
                            <span className="block text-[0.875rem] font-semibold">{h.name}</span>
                        </button>
                    ))}
                </div>

                {/* Content panel */}
                <div
                    id={`house-panel-${house.id}`}
                    role="tabpanel"
                    className="border-l border-r border-b border-border overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={house.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="px-6 md:px-12 py-12"
                        >
                            {/* Top accent line in house colour */}
                            <span
                                className="block w-10 h-0.5 mb-10"
                                style={{ backgroundColor: house.bgColor }}
                                aria-hidden
                            />

                            <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-10 md:gap-16 items-start">

                                {/* Main content */}
                                <div>
                                    <h3
                                        className="text-[clamp(2.5rem,6vw,5rem)] italic leading-[1.0] tracking-[-0.025em] mb-4"
                                        style={{ ...headingStyle, color: house.bgColor }}
                                    >
                                        {house.name}
                                    </h3>
                                    <p className="text-[0.68rem] tracking-[0.28em] uppercase mb-8 text-foreground/50">
                                        {house.values}
                                    </p>
                                    <p className="text-[1.05rem] leading-[1.85] max-w-2xl">
                                        {house.desc}
                                    </p>
                                </div>

                                {/* Core value aside */}
                                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3">
                                    <span
                                        className="text-6xl md:text-7xl leading-none select-none"
                                        role="img"
                                        aria-label={`${house.name} symbol`}
                                    >
                                        {house.spirit}
                                    </span>
                                    <div className="flex flex-col md:items-end gap-1">
                                        <span className="text-[10px] tracking-[0.22em] uppercase text-foreground/40">
                                            Core Value
                                        </span>
                                        <span
                                            className="text-[1.2rem] font-semibold italic"
                                            style={{ ...headingStyle, color: house.bgColor }}
                                        >
                                            {house.coreValue}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </AnimateInView>

        </section>
    )
}