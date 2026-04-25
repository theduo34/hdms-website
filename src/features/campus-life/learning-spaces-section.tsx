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

export function LearningSpacesSection({ items }: { items: FacilityItem[] }) {
    const featured = items[0]
    const rest = items.slice(1)

    return (
        <section id="learning" aria-labelledby="learning-heading" className="section-container bg-white">
            <SectionIntro
                tag="Learning Environments"
                heading="Spaces Built for Discovery."
            />

            <div className="mt-12 space-y-3">
                {featured && (
                    <AnimateInView yOffset={20} duration={0.7}>
                        <article
                            className="group relative w-full overflow-hidden rounded-2xl"
                            style={{ height: "55vh", minHeight: "320px" }}
                        >
                            <Image
                                src={featured.image}
                                alt={featured.alt ?? featured.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="100vw"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                            <div className="absolute top-8 left-8">
                                <span
                                    className="font-black italic text-primary-foreground/20 leading-none select-none"
                                    style={{ ...headingStyle, fontSize: "clamp(4rem, 10vw, 8rem)" }}
                                    aria-hidden
                                >
                                    01
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3
                                    className="font-bold text-2xl text-primary-foreground mb-2"
                                    style={headingStyle}
                                >
                                    {featured.name}
                                </h3>
                                <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-lg md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                                    {featured.description}
                                </p>
                            </div>
                        </article>
                    </AnimateInView>
                )}

                {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
                        {rest.map((space, i) => (
                            <AnimateInView key={space.id ?? i} yOffset={16} delay={i * 0.1} duration={0.7}>
                                <article className="group relative h-72 w-full overflow-hidden rounded-2xl">
                                    <Image
                                        src={space.image}
                                        alt={space.alt ?? space.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <span
                                            className="font-black italic text-primary-foreground/20 leading-none select-none"
                                            style={{ ...headingStyle, fontSize: "3rem" }}
                                            aria-hidden
                                        >
                                            {String(i + 2).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="font-bold text-lg text-primary-foreground mb-1">{space.name}</h3>
                                        <p className="text-primary-foreground/80 text-xs leading-relaxed md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                                            {space.description}
                                        </p>
                                    </div>
                                </article>
                            </AnimateInView>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
