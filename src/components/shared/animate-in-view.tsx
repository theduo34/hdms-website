"use client"

import { motion, HTMLMotionProps } from "motion/react"
import { ReactNode } from "react"

export interface AnimateInViewProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
    yOffset?: number;
    xOffset?: number;
    className?: string;
    once?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const

export function AnimateInView({
    children,
    delay = 0,
    duration = 0.8,
    yOffset = 40,
    xOffset = 0,
    className = "",
    once = false,
    ...props
}: AnimateInViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once, margin: "-10% 0px -10% 0px" }} // Triggers slightly before 100% visible
            transition={{ duration, delay, ease: EASE }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
