"use client"

import { motion, AnimatePresence } from "motion/react"
import { DesktopMenu } from "./desktop-menu"
import { MobileMenu } from "./mobile-menu"
import { useIsMobile } from "@/hooks/use-mobile"

type Props = {
  open: boolean
}

export function NavOverlay({ open }: Props) {
  const isMobile = useIsMobile()

  const desktopVariants = {
    initial: { clipPath: "circle(0% at 95% 5%)" },
    animate: { clipPath: "circle(100% at 95% 5%)" },
    exit:    { clipPath: "circle(0% at 95% 5%)" },
  }

  const mobileVariants = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit:    { y: "100%" },
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
          className={`fixed z-40 overflow-hidden bg-secondary flex-none md:flex items-center justify-center w-full ${
            !isMobile ? "top-0 right-0 bottom-0 left-[20%]" : "inset-0"
          }`}
        >
          {!isMobile && (
            <div
              className="absolute top-0 bottom-0 -left-20 w-1 bg-secondary"
              style={{ clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)" }}
            />
          )}
          <DesktopMenu />
          <MobileMenu />
        </motion.div>
      )}
    </AnimatePresence>
  )
}