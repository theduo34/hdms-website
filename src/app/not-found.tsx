"use client"

import { CTAButton } from "@/components/shared/cta-button"
import { AlertTriangle } from "lucide-react"
import { headingStyle } from "@/styles/font"

export default function Error({ reset }: { error: Error; reset: () => void }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

            <span
                className="absolute select-none pointer-events-none font-black italic text-destructive opacity-[0.04]"
                style={{
                    ...headingStyle,
                    fontSize: "clamp(80px, 22vw, 260px)",
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                }}
            >
                ERROR
            </span>

            <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center gap-6 text-center px-10 py-14 rounded-3xl bg-destructive/5 border border-destructive/15">

                <div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive shrink-0"
                    style={{ animation: "float 3s ease-in-out infinite" }}
                >
                    <div style={{ animation: "spin 8s linear infinite" }}>
                        <AlertTriangle size={32} className="text-destructive-foreground" strokeWidth={1.5} />
                    </div>
                </div>

                <span className="text-[10px] font-black tracking-[0.18em] uppercase px-4 py-1.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                    Something went wrong
                </span>

                <h1
                    className="text-5xl md:text-7xl font-black italic uppercase leading-[0.9] text-foreground"
                    style={headingStyle}
                >
                    Our{" "}
                    <span className="text-destructive">bad.</span>
                </h1>

                <div className="w-10 h-0.5 rounded-full bg-destructive/40" />

                <p className="text-foreground/45 text-sm leading-relaxed max-w-xs">
                    An unexpected error occurred. Please try again or head back home.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
                    <button
                        onClick={reset}
                        className="w-full sm:w-auto py-4 px-10 rounded-full bg-destructive text-destructive-foreground font-black text-[11px] tracking-[0.14em] uppercase transition-all ease-in-out duration-300 hover:opacity-85 hover:scale-105"
                    >
                        Try again
                    </button>
                    <CTAButton
                        href="/"
                        className="w-full sm:w-auto py-4 px-10 bg-transparent border-2 border-destructive/30 text-destructive rounded-full font-black text-[11px] tracking-[0.14em] uppercase transition-all ease-in-out duration-300 hover:border-destructive hover:scale-105"
                    >
                        Back to home
                    </CTAButton>
                </div>

            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-10px); }
                }
            `}</style>

        </div>
    )
}