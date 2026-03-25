"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { HDMLetters } from "@/components/shared/hdm-letters"
import { whyMontessori } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"
import { cn } from "@/lib/utils"

export function WhyMontessori() {
    return (
        <section id="montessori" aria-labelledby="montessori-heading" className="section-half">

            {/* Label + Heading */}
            <AnimateInView yOffset={10} duration={0.8} delay={0.05} className="mb-12">
                <SectionLabel
                    label="WHY MONTESSORI"
                    textColor="var(--color-foreground)"
                    lineColor="var(--color-secondary)"
                    className="items-start mb-8"
                />
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
                    <h2
                        id="montessori-heading"
                        className="text-[clamp(2.5rem,6vw,4.75rem)] font-black italic leading-[0.95] tracking-[-0.02em]"
                        style={headingStyle}
                    >
                        An Education<br />Built Around{' '}
                        <span className="text-secondary">the Child.</span>
                    </h2>
                    <p className="text-[0.95rem] leading-[1.85] text-foreground/70 max-w-xs pb-1 hidden md:block">
                        {whyMontessori.intro}
                    </p>
                </div>
                <p className="text-[0.95rem] leading-[1.85] text-foreground/70 mt-6 md:hidden">
                    {whyMontessori.intro}
                </p>
            </AnimateInView>

            {/* Stats — dark primary card with big yellow numbers */}
            <AnimateInView yOffset={20} duration={0.9} delay={0.12} className="mb-14">
                <div className="relative rounded-2xl bg-primary overflow-hidden">
                    {/* HDM watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.04]">
                        <HDMLetters variant="centered" size="full" filled color="var(--color-primary-foreground)" animate={false} />
                    </div>

                    <div className="relative grid grid-cols-2 md:grid-cols-4">
                        {whyMontessori.facts.map((fact, i) => (
                            <div
                                key={fact.label}
                                className={cn(
                                    "group px-6 py-10 transition-colors duration-300 hover:bg-white/5",
                                    i % 2 === 0 && i < 3 && "border-r border-white/10",
                                    i < 2 && "border-b border-white/10 md:border-b-0",
                                    i < 3 && "md:border-r md:border-white/10",
                                )}
                            >
                                <span
                                    className="block font-black italic leading-none tracking-[-0.03em] text-secondary mb-2"
                                    style={{ ...headingStyle, fontSize: 'clamp(2.0rem,5vw,3rem)' }}
                                >
                                    {fact.num}
                                </span>
                                <span className="block text-[0.62rem] tracking-[0.22em] uppercase text-primary-foreground/45 mb-3">
                                    {fact.label}
                                </span>
                                <p className="text-[0.82rem] leading-[1.7] text-primary-foreground/50 group-hover:text-primary-foreground/70 transition-colors duration-300">
                                    {fact.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimateInView>

            {/* Principles */}
            <AnimateInView yOffset={15} duration={0.8} delay={0.15}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-foreground">
                        Montessori Principles
                    </h3>
                </div>

                <div>
                    {whyMontessori.principles.map((principle, i) => (
                        <div
                            key={principle.title}
                            className="group relative grid grid-cols-[32px_1fr] md:grid-cols-[40px_1fr_auto] items-center gap-x-6 md:gap-x-12 py-7 border-t border-border last:border-b cursor-default overflow-hidden"
                        >
                            <span
                                className="hidden md:block absolute inset-0 bg-secondary/6 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                aria-hidden
                            />
                            <span className="relative font-serif tracking-[0.06em] text-border group-hover:text-secondary transition-colors duration-300 z-10">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <div className="relative z-10 md:contents">
                                <span
                                    className="block font-black italic leading-none group-hover:text-primary group-hover:tracking-[-0.025em] transition-all duration-300"
                                    style={{ ...headingStyle, fontSize: 'clamp(1.5rem,3.5vw,2.75rem)' }}
                                >
                                    {principle.title}
                                </span>
                                <span className="block md:hidden leading-relaxed mt-1.5 text-[0.875rem] text-foreground/65">
                                    {principle.desc}
                                </span>
                            </div>

                            <span className="hidden md:block relative max-w-xs text-right leading-relaxed opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 z-10 text-[0.875rem] text-foreground/65">
                                {principle.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </AnimateInView>

        </section>
    )
}