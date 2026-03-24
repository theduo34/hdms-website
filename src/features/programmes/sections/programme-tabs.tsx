"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { programmes } from "@/features/programmes"
import { ProgrammeDetailSection } from "./programme-detail-section"
import { ProgrammeStatsBar } from "./programme-stats-bar"
import { ProgrammeCurriculumSection } from "./programme-curriculum-section"
import { ProgrammeClassesSection } from "./programme-classes-section"
import { ProgrammeClubsSection } from "./programme-clubs-section"
import { ProgrammeCtaSection } from "./programme-cta-section"

export function ProgrammeTabs() {
  const [activeTab, setActiveTab] = useState(0)
  const current = programmes[activeTab]

  return (
    <>
      {/* Tab Bar */}
      <nav className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-1">
            {programmes.map((prog, i) => (
              <button
                key={prog.id}
                onClick={() => setActiveTab(i)}
                className={`
                  relative whitespace-nowrap px-4 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors
                  ${
                    i === activeTab
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {prog.tabLabel}
                {i === activeTab && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--hdm-yellow)" }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProgrammeDetailSection programme={current} />
          <ProgrammeStatsBar stats={current.stats} />
          <ProgrammeCurriculumSection curriculum={current.curriculum} />
          <ProgrammeClassesSection classes={current.classes} />
          {current.id === "after-school" && <ProgrammeClubsSection />}
          <ProgrammeCtaSection programme={current} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
