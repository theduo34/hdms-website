"use client"

import { motion, AnimatePresence } from "motion/react"
import { DesktopMenu } from "./desktop-menu"
import { MobileMenu } from "./mobile-menu"
import { useIsMobile } from "@/hooks/use-mobile"

type Props = {
  open: boolean
  onClose: () => void
}

export function NavOverlay({ open, onClose }: Props) {
  const isMobile = useIsMobile()

  const desktopVariants = {
    initial: { clipPath: "circle(0% at 95% 0%)" },
    animate: { clipPath: "circle(100% at 95% 0%)" },
    exit:    { clipPath: "circle(0% at 95% 0%)" },
  }

  const mobileVariants = {
    initial: { clipPath: "circle(0% at 95% 0%)" },
    animate: { clipPath: "circle(150% at 95% 0%)" },
    exit:    { clipPath: "circle(0% at 95% 0%)" },
  }

  const variants = isMobile ? mobileVariants : desktopVariants

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed z-50 overflow-hidden bg-secondary flex items-center md:justify-end ${
            !isMobile ? "top-0 right-0 bottom-0 md:w-[65%]" : "inset-0 w-full justify-center"
          }`}
        >
          <DesktopMenu onClose={onClose} />
          <MobileMenu onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
