"use client";

import {Button} from "@/components/ui/button";
import {AlignJustifyIcon, X} from "lucide-react"
import {useState} from "react";
import {NavOverlay} from "@/features/navbar/nav-overlay";
import {SchoolLogo} from "@/components/layout/school-logo";
import {CTAButton} from "@/components/shared/cta-button";
import {usePathname} from "next/navigation";
import {useIsMobile} from "@/hooks/use-mobile";

export function NavBar() {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile();
    const pathname = usePathname()
    const isHome = pathname === "/"

    return (
        <>
            <header className={`${isHome ? "" : "bg-primary"} absolute top-0 left-0 right-0 z-50 px-4 md:px-16 py-4`}>
                <nav className="flex items-center justify-between">
                    <SchoolLogo showName size={isMobile ? "md": "lg"}/>

                    <div className="flex flex-row items-center gap-8">
                        <CTAButton
                            href="https://portal.hdm.edu.gh"
                            external
                            className={"hidden mb:block border-3 h-11 md:h-13 bg-transparent rounded-full px-6 md:px-8 border-primary-foreground hover:bg-primary-foreground hover:text-primary uppercase font-bold"}>
                            VISIT PORTAL
                        </CTAButton>

                        <div className="w-10 md:w-16"/>
                    </div>
                </nav>
            </header>

            <div className="fixed top-4 right-4 md:right-16 z-[51]">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="nav-overlay"
                    className={`w-14 h-14 md:w-16 md:h-16 hover:w-20 hover:h-20 md:hover:w-22 md:hover:h-22 rounded-full transition-all duration-300 group relative overflow-hidden ${open ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"}`}
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <>
                            <X
                                size={30}
                                strokeWidth={2}
                                className="absolute transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:scale-75"
                            />
                            <div
                                className="absolute flex flex-col items-center justify-center leading-none opacity-0 text-primary-foreground scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                <span
                                    className="text-[9px] group-hover:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300">Close</span>
                                <span
                                    className="text-[9px] group-hover:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300">Menu</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <AlignJustifyIcon
                                size={30}
                                strokeWidth={2}
                                className="absolute transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:scale-75"
                            />
                            <div
                                className="absolute flex flex-col items-center justify-center leading-none opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                <span
                                    className="text-[9px] group-hover:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300">Open</span>
                                <span
                                    className="text-[9px] group-hover:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300">Menu</span>
                            </div>
                        </>
                    )}
                </Button>
            </div>

            <NavOverlay open={open} onClose={() => setOpen(false)} />

            {open && (
                <div
                    aria-hidden
                    className="fixed inset-0 z-[49]"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
