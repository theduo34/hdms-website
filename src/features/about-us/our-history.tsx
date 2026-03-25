"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { history } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"

export function OurHistory() {
    return (
        <section id="history" aria-labelledby="history-heading" className="pt-20">

            <AnimateInView yOffset={20} duration={0.9} delay={0.1} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[12px] tracking-[0.22em] uppercase">
                        {history.tag}
                    </span>
                </div>
                <h2
                    id="history-heading"
                    className="text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.05] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    A Journey of<br />
                    Growth &amp; Purpose.
                </h2>
            </AnimateInView>

            <div className="relative">
                <span
                    className="absolute top-0 bottom-0 w-px bg-border hidden md:block"
                    style={{ left: "6.5rem" }}
                    aria-hidden
                />

                {history.timeline.map((item, i) => (
                    <AnimateInView
                        key={item.year}
                        yOffset={18}
                        duration={0.75}
                        delay={i * 0.04}
                    >
                        <div className="relative grid grid-cols-[4.5rem_1fr] md:grid-cols-[6.5rem_1fr] items-start gap-x-6 md:gap-x-0 py-10 border-b border-border last:border-b-0 group">

                            {/* Year */}
                            <div className="flex justify-end pt-1 pr-4 md:pr-0">
                                <span
                                    className="text-[1rem] md:text-[1.2rem] font-bold italic leading-none tracking-[-0.02em] transition-colors duration-300"
                                    style={{
                                        ...headingStyle,
                                        color: "color-mix(in oklch, var(--secondary) 55%, transparent)",
                                    }}
                                >
                                    {item.year}
                                </span>
                            </div>

                            <span
                                className="hidden md:block absolute w-2 h-2 rounded-full bg-border group-hover:bg-secondary transition-colors duration-300 z-10"
                                style={{
                                    left: "calc(6.5rem - 4px)",
                                    top: "2.75rem",
                                }}
                                aria-hidden
                            />

                            <div className="md:pl-10">
                                <h3
                                    className="text-[1.05rem] md:text-[1.2rem] font-semibold italic leading-tight mb-2 group-hover:text-primary transition-colors duration-300"
                                    style={headingStyle}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-[0.925rem] leading-[1.8] text-foreground/65">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </AnimateInView>
                ))}
            </div>

        </section>
    )
}