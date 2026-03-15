"use client"

import { Mail, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { headingStyle } from "@/styles/font"
import { HDMLetters } from "@/components/shared/hdm-letters"
import { AnimateInView } from "@/components/shared/animate-in-view"

const cards = [
    {
        title: "APPLY FOR\nADMISSION",
        description: "Begin your child's journey with us. Submit an application and take the first step toward a world-class Montessori education.",
        cta: "APPLY NOW",
        href: "/admissions/apply",
        icon: GraduationCap,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
        bg: "var(--color-primary)",
        text: "var(--color-secondary)",
        descColor: "var(--color-primary-foreground)",
    },
    {
        title: "SEND US AN\nENQUIRY",
        description: "Have questions about our programmes, fees, or school life? Reach out and our admissions team will get back to you.",
        cta: "EMAIL US",
        href: "/contact",
        icon: Mail,
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
        bg: "var(--color-secondary)",
        text: "var(--color-primary)",
        descColor: "var(--color-secondary-foreground)",
    },
]

export function NextStepSection() {
    return (
        <div
            id="next-step"
            aria-labelledby="next-step-heading"
            className="bg-background relative overflow-hidden"
        >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 pointer-events-none opacity-[0.04] overflow-hidden">
                <HDMLetters
                    variant="centered"
                    size="2xl"
                    filled={false}
                    strokeColor="var(--color-primary)"
                    animate={false}
                />
            </div>

            <AnimateInView
                yOffset={5}
                duration={0.6}
                className="text-center mb-12 relative z-10"
            >
                <h2
                    id="next-step-heading"
                    className="section-header font-black italic uppercase leading-[0.9] text-primary"
                    style={headingStyle}
                >
                    TAKE THE NEXT STEP
                </h2>
            </AnimateInView>

            {/* Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {cards.map((card, i) => {
                    const Icon = card.icon
                    return (
                        <AnimateInView
                            key={card.href}
                            yOffset={5}
                            duration={0.75}
                            delay={i * 0.15}
                            className="group relative rounded-3xl overflow-hidden min-h-80 flex flex-col justify-between p-8 cursor-pointer hover:scale-[1.03] hover:-translate-y-1.5 transition-transform duration-300"
                            style={{
                                background: card.bg,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                            }}
                        >
                            {/* Title + icon */}
                            <div className="flex items-start justify-between gap-4">
                                <h3
                                    className="text-3xl font-black uppercase leading-[0.9]"
                                    style={{ color: card.text, fontFamily: "'Georgia', serif" }}
                                >
                                    {card.title.split("\n").map((line, j) => (
                                        <span key={j} className="block">{line}</span>
                                    ))}
                                </h3>
                                <div
                                    className="w-11 h-11 rounded-full border-2 flex items-center justify-center shrink-0 mt-1"
                                    style={{ borderColor: card.text, color: card.text }}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>

                            <p
                                className="text-sm leading-relaxed max-w-[55%] relative z-10"
                                style={{ color: card.descColor, opacity: 0.8 }}
                            >
                                {card.description}
                            </p>

                            <Link
                                href={card.href}
                                suppressHydrationWarning
                                className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] relative z-10
                                           opacity-100 md:opacity-30 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                                           transition-all duration-300 ease-out hover:opacity-70"
                                style={{ color: card.text }}
                            >
                                {card.cta}
                                <span className="block w-10 h-px" style={{ background: card.text }} />
                            </Link>

                            {/* Background image */}
                            <div className="absolute bottom-0 right-0 w-[48%] h-[70%]">
                                <Image
                                    src={card.image}
                                    alt={card.title.replace("\n", " ")}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover object-top"
                                    loading="lazy"
                                    unoptimized
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(to right, ${card.bg} 0%, transparent 60%)`,
                                    }}
                                />
                            </div>

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />
                        </AnimateInView>
                    )
                })}
            </div>
        </div>
    )
}