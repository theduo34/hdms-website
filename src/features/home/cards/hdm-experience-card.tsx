import { ExperienceInterface } from "@/features/home"
import { headingStyle } from "@/styles/font"
import { Landmark, Users, Home, GraduationCap, Palette, Star, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const BG_CYCLE = ["primary", "secondary"] as const;
const ICON_CYCLE = [Landmark, Users, Home, GraduationCap, Palette, Star];

export function HdmExperienceCard({ exp, index, isInView, isMobile }: {
    exp: ExperienceInterface;
    index: number;
    isInView: boolean;
    isMobile: boolean;
}) {
    const bg = BG_CYCLE[index % BG_CYCLE.length];
    const textColor = bg === "primary" ? "var(--color-secondary)" : "var(--color-primary)";
    const bgColor   = bg === "primary" ? "var(--color-primary)"   : "var(--color-secondary)";
    const IconComponent = ICON_CYCLE[index % ICON_CYCLE.length];

    const href = exp.href;
    const titleLines = exp.title.split(" ");

    return (
        <motion.a
            href={href}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: (index % 6) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105 ${isMobile ? "w-[72vw] h-90" : "w-62.5 h-82"}`}
            style={{ background: bgColor }}
        >
            {/* Title + icon row */}
            <div className="flex flex-row w-full items-start justify-between p-4 z-10 relative">
                <h3
                    className="flex-wrap text-2xl font-black italic uppercase leading-[0.9]"
                    style={{ color: textColor, ...headingStyle }}
                >
                    {titleLines.map((line, j) => (
                        <span key={j} className="block">{line}</span>
                    ))}
                </h3>
                <div
                    className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
                    style={{ borderColor: textColor, color: textColor }}
                >
                    <IconComponent className="w-4 h-4" />
                </div>
            </div>

            {/* Bottom image */}
            <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? "h-[52%]" : "h-[40%]"}`}>
                <Image
                    src={exp.imageUrl}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 72vw, 250px"
                    loading="lazy"
                    className="object-cover"
                />
                <div
                    className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
                    style={{ background: `linear-gradient(to bottom, ${bgColor}, transparent)` }}
                />
            </div>

            {/* Desktop: vertical EXPLORE indicator (hover-reveal) */}
            <div className="absolute left-4 bottom-4 z-10 hidden md:flex flex-col items-center gap-2">
                <div
                    className="w-px h-4 group-hover:h-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ background: textColor }}
                />
                <span
                    className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ writingMode: "vertical-rl", color: textColor }}
                >
                    EXPLORE
                </span>
            </div>

            {/* Mobile: always-visible bottom action bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex md:hidden items-center justify-between px-4 py-3"
                 style={{ background: `linear-gradient(to top, ${bgColor}ee, ${bgColor}88, transparent)` }}>
                <span
                    className="text-[9px] font-bold uppercase tracking-[0.35em]"
                    style={{ color: textColor }}
                >
                    Explore
                </span>
                <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
                    style={{ color: textColor, borderColor: textColor }}
                >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                </div>
            </div>

            {/* Hover tint — subtle on mobile, hover-only on desktop */}
            <div className="absolute inset-0 bg-black/25 opacity-15 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
    );
}
