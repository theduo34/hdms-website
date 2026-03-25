"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { philosophy } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"

export function OurPhilosophy() {
    return (
        <section id="philosophy" aria-labelledby="philosophy-heading" className="pt-20">

            <AnimateInView yOffset={20} duration={0.9} delay={0.1} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[12px] tracking-[0.22em] uppercase">
                        {philosophy.tag}
                    </span>
                </div>
                <h2
                    id="philosophy-heading"
                    className="text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.05] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    {philosophy.headline}
                </h2>
            </AnimateInView>

            <AnimateInView xOffset={-20} yOffset={0} duration={0.95} delay={0.12} className="mb-14">
                <blockquote className="border-l-2 border-secondary pl-8 md:pl-12 py-2 my-8">
                    <p
                        className="text-[clamp(1.5rem,3.5vw,2.5rem)] italic leading-tight tracking-[-0.01em]"
                        style={headingStyle}
                    >
                        &ldquo;{philosophy.pullQuote}&rdquo;
                    </p>
                    <footer className="mt-5 text-[10px] tracking-[0.25em] uppercase text-foreground/50">
                        {philosophy.pullAuthor}
                    </footer>
                </blockquote>
            </AnimateInView>

            <AnimateInView yOffset={16} duration={0.85} delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8 border-t border-border pt-10">
                    {philosophy.paragraphs.map((para, i) => (
                        <p key={i} className="text-[1.05rem] leading-[1.85]">
                            {para}
                        </p>
                    ))}
                </div>
            </AnimateInView>

        </section>
    )
}