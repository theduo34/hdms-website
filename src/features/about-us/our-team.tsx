'use client'

import { useState } from 'react'
import Image from 'next/image'
import { team } from '@/features/about-us/about'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'
import { cn } from '@/lib/utils'
import {CarouselButton} from "@/components/shared/carousel-button";

const VISIBLE = 3

export function OurTeam() {
    const [index, setIndex] = useState(0)
    const maxIndex = team.members.length - VISIBLE

    const prev = () => setIndex((i) => Math.max(i - 1, 0))
    const next = () => setIndex((i) => Math.min(i + 1, maxIndex))
    const goTo = (i: number) => setIndex(i)

    const offset = index * (100 / VISIBLE)

    return (
        <section id="team" className="py-16">

            <AnimateInView yOffset={10} duration={0.7}>
                <div className="flex items-center gap-2 mb-5">
                    <span className="block w-4 h-px bg-secondary shrink-0" />
                    <span className="tracking-[0.2em] uppercase text-primary font-medium">
                        {team.tag}
                    </span>
                </div>

                <h2
                    className="italic leading-[1.05] tracking-[-0.02em] mb-6"
                    style={headingStyle}
                >
                    {team.headline}
                </h2>

                <p className="leading-[1.85] max-w-xl mb-10">
                    {team.intro}
                </p>
            </AnimateInView>

            <AnimateInView yOffset={16} duration={0.8} delay={0.1}>
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${offset}%)` }}
                    >
                        {team.members.map((member) => (
                            <div
                                key={member.name}
                                className="flex flex-col shrink-0 w-1/3 border-r border-border last:border-r-0"
                            >
                                <div className="relative aspect-3/4 overflow-hidden">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 1000px) 80vw, 30vw"
                                        />
                                    ) : (
                                        <span className="absolute inset-0 flex items-center justify-center text-5xl">
                                            {member.initials}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 px-6 py-7 border-t-2 border-border">
                                    <span
                                        className="leading-tight mb-1"
                                        style={headingStyle}
                                    >
                                        {member.name}
                                    </span>
                                    <span className="tracking-[0.15em] uppercase mb-4">
                                        {member.role}
                                    </span>
                                    <p className="font-light leading-[1.75]">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <CarouselButton
                        onClick={prev}
                        disabled={index === 0}
                        label="Previous"
                        className="bg-primary text-primary-foreground"
                    >
                        &lt;
                    </CarouselButton>
                    <CarouselButton
                        onClick={next}
                        disabled={index >= maxIndex}
                        label="Next"
                        className="bg-primary text-primary-foreground"
                    >
                        &gt;
                    </CarouselButton>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                                    i === index
                                        ? "bg-secondary scale-125"
                                        : "bg-border"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </AnimateInView>

        </section>
    )
}