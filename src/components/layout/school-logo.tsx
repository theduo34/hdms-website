import Image from "next/image";
import {headingStyle} from "@/styles/font";

interface SchoolLogoProps {
    size?: "sm" | "md" | "lg";
    showName?: boolean;
    className?: string;
}

const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
};

export function SchoolLogo({ size = "md", showName = false, className = "" }: SchoolLogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Crest */}
            <div className={`relative ${sizeMap[size]} rounded-full overflow-hidden shrink-0`}>
                <Image
                    src="/assets/images/logo/school-crest.png"
                    fill
                    className="object-cover bg-white"
                    priority
                    alt="Heaven's Dew Montessori School Crest"
                />
            </div>

            {showName && (
                <>
                    <div className="w-px border border-secondary rounded-full self-stretch" />

                    <div className="flex flex-col justify-center">
                        <span
                            className="text-[8px] md:text-[9px] font-bold tracking-[0.25em] uppercase text-primary-foreground/50 leading-none mb-1"
                            style={headingStyle}
                        >
                            HDM
                        </span>
                        <span
                            className="text-xs md:text-base font-black uppercase leading-[1.05] tracking-wide text-primary-foreground"
                            style={headingStyle}
                        >
                            Heaven&apos;s Dew
                            <br />
                            Montessori
                        </span>
                        <div className="flex items-center gap-1 mt-1 md:mt-1.5">
                            {["Faith", "Diligence", "Excellence"].map((word, i) => (
                                <span key={word} className="flex items-center gap-1">
                                    <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-secondary">
                                        {word}
                                    </span>
                                    {i < 2 && <span className="text-secondary/80 text-[8px]">•</span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}