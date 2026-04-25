"use client"

import { useState } from "react"
import { navItems, topNavItems } from "./nav-data"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"

type Props = { onClose: () => void }

export function DesktopMenu({ onClose }: Props) {
    const [active, setActive] = useState<typeof navItems[0] | null>(null)

    return (
        <div
            className="hidden max-w-5xl md:flex p-8 h-full flex-col items-center justify-center gap-8 text-primary/70"
            onMouseLeave={() => setActive(null)}
        >

            <nav className="flex gap-10">
                {topNavItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href!}
                        onClick={onClose}
                        className="text-sm uppercase font-semibold tracking-widest hover:opacity-60 transition-opacity"
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>

            <div className="flex flex-row items-start gap-4">

                <div className="flex flex-col gap-8">
                    {navItems.map((item) =>
                        item.children?.length ? (
                            <div
                                key={item.title}
                                onMouseEnter={() => setActive(item)}
                                className="text-lg uppercase font-bold cursor-pointer hover:opacity-60 transition-opacity"
                            >
                                {item.title}
                            </div>
                        ) : (
                            <Link
                                key={item.title}
                                href={item.href!}
                                onMouseEnter={() => setActive(null)}
                                onClick={onClose}
                                className="text-lg uppercase font-bold hover:opacity-60 transition-opacity"
                            >
                                {item.title}
                            </Link>
                        )
                    )}
                </div>

                <div className="relative w-px self-stretch bg-transparent overflow-hidden">
                    <AnimatePresence>
                        {active && (
                            <motion.div
                                key="separator"
                                className="absolute inset-0 bg-primary/50 origin-top"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                exit={{ scaleY: 0 }}
                                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="min-w-52  flex flex-col justify-start">
                    <AnimatePresence mode="wait">
                        {active?.children && (
                            <motion.div
                                key={active.title}
                                className="flex flex-col gap-4"
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                {active.children.map((child) => (
                                    <Link
                                        key={child.title}
                                        href={child.href}
                                        onClick={onClose}
                                        className="text-lg hover:underline hover:opacity-80 transition-opacity"
                                    >
                                        {child.title}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}