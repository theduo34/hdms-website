"use client"

import { AlertTriangle } from "lucide-react"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";

type Props = {
    reset: () => void
}

export default function Error({ reset }: Props) {
    const router = useRouter();

    return (
        <div
            className="relative h-screen flex items-center justify-center px-4 overflow-hidden mt-20"
        >
            <span
                className="absolute select-none pointer-events-none font-black italic text-destructive"
                style={{
                    fontFamily: "'Georgia','Times New Roman',serif",
                    fontSize: "clamp(80px, 22vw, 260px)",
                    opacity: 0.06,
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                }}
            >
                ERROR
            </span>

            <div
                className="absolute w-125 h-125 rounded-full bg-destructive opacity-10 blur-[120px] pointer-events-none"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />

            <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6 text-center p-8 rounded-3xl bg-primary/80 border border-destructive/20 backdrop-blur-sm">

                <div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/15 border border-destructive/30 shrink-0"
                    style={{ animation: "float 3s ease-in-out infinite" }}
                >
                    <div style={{ animation: "spin 8s linear infinite" }}>
                        <AlertTriangle size={32} className="text-destructive" strokeWidth={1.5} />
                    </div>
                </div>

                <span className="bg-destructive/15 text-destructive text-[10px] font-black tracking-[0.18em] uppercase px-4 py-1.5 rounded-full border border-destructive/25">
                    Something went wrong
                </span>

                <h1
                    className="text-5xl md:text-7xl font-black italic uppercase leading-[0.9] text-primary-foreground"
                    style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
                >
                    Our{" "}
                    <span className="text-destructive">bad.</span>
                </h1>

                <div className="w-10 h-0.5 rounded-full bg-destructive/40" />

                <p className="text-hdm-white/45 text-sm leading-relaxed max-w-xs">
                    An unexpected error occurred. Please try again or head back home.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                    <Button
                        onClick={reset}
                        variant={"destructive"}
                        className="w-full sm:w-auto font-black text-[11px] tracking-[0.14em] uppercase px-10 py-4 rounded-full transition-all ease-in-out duration-300 hover:opacity-85 hover:scale-105"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => router.push("/")}
                        variant={"outline"}
                        className="w-full sm:w-auto font-black text-[11px] tracking-[0.14em] uppercase px-10 py-4 rounded-full transition-all ease-in-out duration-300 hover:opacity-85 hover:scale-105"
                    >
                        Back to home
                    </Button>
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