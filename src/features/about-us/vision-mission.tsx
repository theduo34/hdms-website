"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { visionMission } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"
import { cn } from "@/lib/utils"

export function VisionMission() {
    return (
        <section
            id="vision"
            aria-labelledby="vision-heading"
            className="relative pt-16"
        >

            <AnimateInView xOffset={-24} yOffset={0} duration={1} delay={0.1} className="mb-16">
                <h2
                    id="vision-heading"
                    className="text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.05] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    Guided by<br />
                    <span>Purpose</span>
                    {" "}& Principle.
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={20} duration={0.9} delay={0.15} className="grid grid-cols-1 md:grid-cols-2 border-t border-border mb-16">
                {visionMission.cards.map((item, i) => (
                    <div
                        key={item.title}
                        className={cn(
                            "group relative py-12 transition-all duration-300",
                            i === 0
                                ? "md:pr-10 md:border-r border-border border-b md:border-b-0"
                                : "md:pl-10"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <span className="block w-4 h-px bg-secondary shrink-0" />
                            <h2 className="text-[12px] tracking-[0.22em] uppercase">
                                {item.title}
                            </h2>
                        </div>

                        <p
                            className="font-serif text-[1.875rem] font-normal italic leading-[1.1] tracking-[-0.01em] text-foreground mb-5"
                            style={headingStyle}
                        >
                            {i === 0
                                ? <>Leading Montessori<br />excellence in Ghana.</>
                                : <>Every child seen,<br />valued, empowered.</>}
                        </p>

                        <p className="leading-[1.85]">
                            {item.body}
                        </p>

                        <span
                            className="absolute bottom-0 left-0 h-0.5 bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            aria-hidden
                        />
                    </div>
                ))}
            </AnimateInView>

            <AnimateInView yOffset={15} duration={0.8} delay={0.2}>
                <h2 className="text-[12px] tracking-[0.22em] uppercase mb-10">
                    {visionMission.valuesLabel}
                </h2>

                <div>
                    {visionMission.values.map((value, i) => (
                        <div
                            key={value.title}
                            className="group relative grid grid-cols-[32px_1fr] md:grid-cols-[40px_1fr_auto] items-center gap-x-6 md:gap-x-12 py-8 border-t border-border last:border-b cursor-default overflow-hidden"
                        >
                            <span
                                className="hidden md:block absolute inset-0 bg-secondary/6 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                aria-hidden
                            />

                            <span className="relative font-serif tracking-[0.06em] text-border group-hover:text-secondary transition-colors duration-300 z-10">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="relative z-10 md:contents">
                                <span
                                    className="block font-semibold italic group-hover:text-foreground group-hover:tracking-[-0.025em] leading-none transition-all duration-300"
                                    style={{ ...headingStyle, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
                                >
                                    {value.title}
                                </span>

                                <span className="block md:hidden leading-relaxed mt-2">
                                    {value.desc}
                                </span>
                            </div>

                            <span className="hidden md:block relative max-w-xs text-right leading-relaxed opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-10">
                                {value.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </AnimateInView>
        </section>
    )
}