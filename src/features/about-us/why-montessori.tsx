"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { whyMontessori } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"

export function WhyMontessori() {
    return (
        <section id="montessori" aria-labelledby="montessori-heading" className="pt-20">

            <AnimateInView yOffset={20} duration={0.9} delay={0.1} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[12px] tracking-[0.22em] uppercase">
                        {whyMontessori.tag}
                    </span>
                </div>
                <h2
                    id="montessori-heading"
                    className="text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.05] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    An Education Built<br />
                    Around the Child.
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={16} duration={0.85} delay={0.12} className="mb-14">
                <p className="text-[1.05rem] leading-[1.85] max-w-2xl mb-12">
                    {whyMontessori.intro}
                </p>

                {/* Stats strip — bordered rows, no card backgrounds */}
                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
                    {whyMontessori.facts.map((fact, i) => (
                        <div
                            key={fact.label}
                            className={[
                                "py-10 pr-6 pl-2 border-b border-border",
                                i % 2 === 0 ? "border-r border-border" : "",
                                i < 2 ? "md:border-b-0" : "",
                                i < 3 ? "md:border-r md:border-border" : "",
                            ].join(" ")}
                        >
                            <span
                                className="block text-[clamp(2.5rem,5vw,3.75rem)] italic leading-none tracking-[-0.03em] text-secondary mb-3"
                                style={headingStyle}
                            >
                                {fact.num}
                            </span>
                            <span className="block text-[10px] tracking-[0.22em] uppercase mb-3 text-foreground/60">
                                {fact.label}
                            </span>
                            <p className="text-[0.875rem] leading-[1.75] text-foreground/60">
                                {fact.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </AnimateInView>

            {/* Principles — numbered rows, same pattern as core values */}
            <AnimateInView yOffset={15} duration={0.8} delay={0.15}>
                <h3 className="text-[11px] tracking-[0.26em] uppercase mb-8 text-foreground/50">
                    Montessori Principles
                </h3>

                <div>
                    {whyMontessori.principles.map((principle, i) => (
                        <div
                            key={principle.title}
                            className="group relative grid grid-cols-[32px_1fr] md:grid-cols-[40px_1fr_auto] items-center gap-x-6 md:gap-x-12 py-8 border-t border-border last:border-b cursor-default overflow-hidden"
                        >
                            <span
                                className="absolute inset-0 bg-secondary/6 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                aria-hidden
                            />

                            <span className="relative font-serif tracking-[0.06em] text-border group-hover:text-secondary transition-colors duration-300 z-10">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="relative z-10 md:contents">
                                <span
                                    className="block font-semibold italic group-hover:tracking-[-0.025em] leading-none transition-all duration-300"
                                    style={{
                                        ...headingStyle,
                                        fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                                    }}
                                >
                                    {principle.title}
                                </span>
                                <span className="block md:hidden leading-relaxed mt-2 text-[0.875rem]">
                                    {principle.desc}
                                </span>
                            </div>

                            <span className="hidden md:block relative max-w-xs text-right leading-relaxed opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-10 text-[0.9rem]">
                                {principle.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </AnimateInView>

        </section>
    )
}