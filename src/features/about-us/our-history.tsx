"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { history } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"

export function OurHistory() {
    return (
        <section id="history" aria-labelledby="history-heading" className="section-half">

            {/* Label + Heading */}
            <AnimateInView yOffset={10} duration={0.8} delay={0.05} className="mb-14">
                <SectionLabel
                    label="OUR HISTORY"
                    textColor="var(--color-foreground)"
                    lineColor="var(--color-secondary)"
                    className="items-start mb-8"
                />
                <h2
                    id="history-heading"
                    className="text-[clamp(2.5rem,6vw,4.75rem)] font-black italic leading-[0.95] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    A Journey of Growth{' '}
                    <br />
                    <span className="text-secondary">&amp; Purpose.</span>
                </h2>
            </AnimateInView>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical guide line — desktop */}
                <span
                    className="absolute top-0 bottom-0 w-px bg-border hidden md:block"
                    style={{ left: '5.5rem' }}
                    aria-hidden
                />

                {history.timeline.map((item, i) => (
                    <AnimateInView
                        key={item.year}
                        yOffset={18}
                        duration={0.75}
                        delay={i * 0.04}
                    >
                        <div className="group relative grid grid-cols-[4rem_1fr] md:grid-cols-[5.5rem_1fr] items-start gap-x-0 py-9 border-b border-border last:border-b-0">

                            {/* Year column */}
                            <div className="flex flex-col items-end pr-5 pt-0.5">
                                <span
                                    className="block font-black italic leading-none tracking-[-0.02em] group-hover:text-secondary transition-colors duration-300"
                                    style={{
                                        ...headingStyle,
                                        fontSize: 'clamp(1.1rem,2.5vw,1.5rem)',
                                        color: 'color-mix(in oklch, var(--color-secondary) 50%, transparent)',
                                    }}
                                >
                                    {item.year}
                                </span>
                            </div>

                            {/* Timeline dot — sits on the vertical line */}
                            <span
                                className="hidden md:block absolute w-2.5 h-2.5 rounded-full bg-border group-hover:bg-secondary group-hover:scale-125 transition-all duration-300 z-10"
                                style={{ left: 'calc(5.5rem - 5px)', top: '2.5rem' }}
                                aria-hidden
                            />

                            {/* Content */}
                            <div className="pl-8 md:pl-10">
                                {/* Year badge on mobile */}
                                <div className="md:hidden inline-flex items-center gap-2 mb-2">
                                    <span className="block w-3 h-px bg-secondary" aria-hidden />
                                </div>

                                <h3
                                    className="font-black italic leading-tight mb-2 group-hover:text-primary transition-colors duration-300"
                                    style={{ ...headingStyle, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)' }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-[0.9rem] leading-[1.8] text-foreground/60">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Hover reveal: secondary bar on left */}
                            <span
                                className="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top"
                                aria-hidden
                            />
                        </div>
                    </AnimateInView>
                ))}
            </div>

        </section>
    )
}