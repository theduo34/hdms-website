"use client"

import Image from "next/image"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

interface FacilityItem {
    id?: string
    name: string
    description: string
    image: string
    alt?: string
}

export function SupportSection({ items }: { items: FacilityItem[] }) {
    return (
        <section id="support" aria-labelledby="support-heading" className="bg-white px-4 md:px-16 py-12">
            <div>
                <SectionIntro
                    tag="Support Facilities"
                    heading="Where Every Need is Met."
                />
            </div>

            <div className="space-y-0">
                {items.map((space, i) => (
                    <AnimateInView key={space.id ?? i} yOffset={16} delay={i * 0.1} duration={0.7}>
                        <article className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 !== 0 ? "md:[&>*:first-child]:order-last" : ""}`}>
                            <div className="relative h-80 w-full overflow-hidden">
                                <Image
                                    src={space.image}
                                    alt={space.alt ?? space.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                            </div>
                            <div className="relative bg-white px-8 md:px-16 py-12 flex flex-col justify-center overflow-hidden">
                                <span
                                    className="absolute right-4 bottom-2 font-black italic leading-none select-none pointer-events-none text-primary/[0.04]"
                                    style={{ ...headingStyle, fontSize: "clamp(5rem, 12vw, 10rem)" }}
                                    aria-hidden
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="section-label relative z-10">Support Space</span>
                                <h3
                                    className="font-black italic text-primary leading-[0.95] tracking-[-0.02em] mb-4 relative z-10"
                                    style={{ ...headingStyle, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                                >
                                    {space.name}
                                </h3>
                                <p className="text-sm leading-relaxed max-w-sm relative z-10">
                                    {space.description}
                                </p>
                            </div>
                        </article>
                    </AnimateInView>
                ))}
            </div>
        </section>
    )
}
