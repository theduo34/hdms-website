"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { houses } from "@/features/about-us/about"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { headingStyle } from "@/styles/font"

export function HouseSystem() {
    const [active, setActive] = useState(0)
    const house = houses[active]

    return (
        <section id="houses" aria-labelledby="houses-heading" className="section-half">

            {/* Label + Heading */}
            <AnimateInView yOffset={10} duration={0.8} delay={0.05} className="mb-12">
                <SectionLabel
                    label="HOUSE SYSTEM"
                    textColor="var(--color-foreground)"
                    lineColor="var(--color-secondary)"
                    className="items-start mb-8"
                />
                <h2
                    id="houses-heading"
                    className="text-[clamp(2.5rem,6vw,4.75rem)] font-black italic leading-[0.95] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    Four Houses.{' '}
                    <span
                        className="transition-colors duration-500"
                        style={{ color: house.bgColor }}
                    >
                        One Family.
                    </span>
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={16} duration={0.85} delay={0.15}>

                {/* House selector — mini cards styled like experience cards */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
                    role="tablist"
                    aria-label="School houses"
                >
                    {houses.map((h, i) => (
                        <motion.button
                            key={h.id}
                            role="tab"
                            aria-selected={active === i}
                            aria-controls={`house-panel-${h.id}`}
                            onClick={() => setActive(i)}
                            whileHover={{ scale: active !== i ? 1.03 : 1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="relative text-left rounded-2xl p-5 transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
                            style={{
                                backgroundColor: active === i ? h.bgColor : 'var(--color-muted)',
                                opacity: active !== i ? 0.65 : 1,
                            }}
                        >
                            <span
                                className="block text-3xl mb-4 leading-none"
                                role="img"
                                aria-label={`${h.name} spirit`}
                            >
                                {h.spirit}
                            </span>
                            <span
                                className="block text-[0.6rem] tracking-[0.22em] uppercase mb-1 font-medium"
                                style={{ color: active === i ? 'rgba(255,255,255,0.6)' : 'var(--color-muted-foreground)' }}
                            >
                                {h.label}
                            </span>
                            <span
                                className="block text-[0.9rem] font-bold"
                                style={{ color: active === i ? 'white' : 'var(--color-foreground)' }}
                            >
                                {h.name}
                            </span>

                            {/* Active indicator */}
                            {active === i && (
                                <motion.span
                                    layoutId="houseActiveBar"
                                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                                    aria-hidden
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* House content panel */}
                <div
                    id={`house-panel-${house.id}`}
                    role="tabpanel"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={house.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="relative rounded-2xl overflow-hidden px-8 md:px-12 py-12"
                            style={{ backgroundColor: house.bgColor }}
                        >
                            {/* Giant background spirit emoji */}
                            <div
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-[9rem] md:text-[12rem] leading-none opacity-[0.12] select-none pointer-events-none"
                                aria-hidden
                            >
                                {house.spirit}
                            </div>

                            {/* Top accent */}
                            <span
                                className="block w-10 h-[3px] rounded-full mb-8 opacity-60"
                                style={{ backgroundColor: 'white' }}
                                aria-hidden
                            />

                            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_160px] gap-8 md:gap-16 items-start">
                                {/* Main content */}
                                <div>
                                    <h3
                                        className="font-black italic leading-[1.0] text-white mb-4 tracking-[-0.025em]"
                                        style={{ ...headingStyle, fontSize: 'clamp(2.5rem,7vw,5.5rem)' }}
                                    >
                                        {house.name}
                                    </h3>
                                    <p className="text-[0.62rem] tracking-[0.28em] uppercase mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                        {house.values}
                                    </p>
                                    <p className="text-[1rem] leading-[1.85] max-w-xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
                                        {house.desc}
                                    </p>
                                </div>

                                {/* Core value aside */}
                                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:pt-2">
                                    <span
                                        className="text-5xl md:text-6xl leading-none select-none"
                                        role="img"
                                        aria-label={`${house.name} symbol`}
                                    >
                                        {house.emoji}
                                    </span>
                                    <div className="flex flex-col md:items-end gap-1">
                                        <span className="text-[0.6rem] tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                            Core Value
                                        </span>
                                        <span
                                            className="font-black italic text-white"
                                            style={{ ...headingStyle, fontSize: '1.4rem' }}
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