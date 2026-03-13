"use client"

import { useState } from "react"
import { navItems } from "./nav-data"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"

export function DesktopMenu() {
  const [active, setActive] = useState<typeof navItems[0] | null>(null)

  return (
    <div
      className="hidden md:flex flex-row gap-8 h-screen px-20 pt-40 max-w-3xl items-start justify-start text-primary/70"
      onMouseLeave={() => setActive(null)}
    >

      <div className="flex flex-row gap-8 items-start">

        <div className="flex flex-col gap-8">
          {navItems.map((item) => (
            item.children?.length ? (
              <div
                key={item.title}
                onMouseEnter={() => setActive(item)}
                className="text-2xl uppercase font-bold cursor-pointer hover:opacity-70"
              >
                {item.title}
              </div>
            ) : (
              <Link
                key={item.title}
                href={item.href as string}
                onMouseEnter={() => setActive(null)}
                className="text-2xl uppercase font-bold hover:opacity-70 "
              >
                {item.title}
              </Link>
            )
          ))}
        </div>

        <div className="relative w-px self-stretch overflow-hidden bg-transparent">
          <AnimatePresence>
            {active && (
              <motion.div
                key="separator"
                className="absolute inset-0 bg-primary/70 origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              />
            )}
          </AnimatePresence>
        </div>

      </div>

      <div className="flex flex-col gap-4 items-start self-start">
        {navItems.map((item) =>
          item.children?.map((child) => (
            <Link
              key={`${item.title}-${child.title}`}
              href={child.href}
              className={`text-xl hover:underline transition-opacity duration-200 ${
                active === item ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              {child.title}
            </Link>
          ))
        )}
      </div>

    </div>
  )
}