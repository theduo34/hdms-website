"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { Megaphone, Pause, Play } from "lucide-react"
import {news, NewsInterface} from "@/features/home"
import Link from "next/link"
import { CarouselButton } from "@/components/shared/carousel-button"
import { SectionLabel } from "@/components/shared/section-label"
import {formatNewsDate} from "@/lib/utils";

const ITEMS = [...news, ...news, ...news]
const MID = news.length
const MOB_W = 82
const MOB_G = 12
const DESK_W = 62
const DESK_G = 16
const EASE = [0.16, 1, 0.3, 1] as const
const CARD_BG = "oklch(from var(--primary) calc(l - 0.05) c h / 0.5)"

function NewsCard({ item }: { item: NewsInterface }) {
  const formattedDate = formatNewsDate(item.createdAt);

  return (
      <article className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h3
              className="text-base font-bold leading-snug text-primary-foreground flex-1"
              style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
          >
            {item.title}
          </h3>
          <time
              dateTime={item.createdAt}
              className="text-[10px] uppercase tracking-wider font-semibold text-primary-foreground/50 shrink-0 pt-0.5"
          >
            {formattedDate}
          </time>
        </div>
        <p className="text-sm leading-relaxed text-primary-foreground/65 font-light">
          {item.excerpt}
        </p>
        <Link
            href={`/news-&-announcements/${item.id}`}
            aria-label={`Read more about ${item.title}`}
            className="self-start text-xs font-bold uppercase tracking-widest text-primary-foreground underline underline-offset-4 hover:opacity-60 transition-opacity duration-200"
        >
          Read More
        </Link>
      </article>
  )
}

export function NewsSection({ onToggleStrip, stripPaused }: {
  onToggleStrip: () => void
  stripPaused: boolean
}) {
  const [idx, setIdx] = useState(MID)
  const [busy, setBusy] = useState(false)

  const scroll = (dir: "left" | "right") => {
    if (busy) return
    setBusy(true)
    setIdx(prev => dir === "right" ? prev + 1 : prev - 1)
  }

  const onDone = () => {
    setBusy(false)
    if (idx >= news.length * 2) setIdx(news.length)
    else if (idx < news.length) setIdx(news.length * 2 - 1)
  }

  const mobileX  = `calc(16px - ${idx} * (${MOB_W}vw + ${MOB_G}px))`
  const desktopX = `calc(-${idx} * (${DESK_W}% + ${DESK_G}px))`

  return (
      <div
          aria-labelledby="news-heading"
          className="relative bg-primary -mt-64 md:-mt-40"
          style={{ borderRadius: "0 0 50% 50% / 0 0 5rem 5rem", overflow: "hidden" }}
      >
        <div aria-hidden="true" className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
          <Megaphone className="text-primary-foreground rotate-330" style={{ width: "18rem", height: "18rem", strokeWidth: 1 }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-16 pt-64 md:pt-40 pb-16 mt-4">

          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="w-full flex justify-start">
              <button
                  onClick={onToggleStrip}
                  aria-label={stripPaused ? "Resume news ticker" : "Pause news ticker"}
                  className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
              >
                {stripPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
            </div>
            <SectionLabel label="NEWS & ANNOUNCEMENTS" />
          </div>

          <div className="ms-0 md:ms-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-start">

            <div className="flex items-center justify-center">
              <h2
                  id="news-heading"
                  className="flex flex-row md:flex-col gap-2 text-3xl md:text-5xl font-bold italic uppercase leading-[0.88] text-primary-foreground"
                  style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
              >
                <span>Latest</span>
                <span>News</span>
              </h2>
            </div>

            {/* Mobile */}
            <div className="lg:hidden -mx-4 py-2 overflow-hidden">
              <motion.div
                  className="flex"
                  style={{ gap: `${MOB_G}px` }}
                  animate={{ x: mobileX }}
                  transition={{ duration: 0.55, ease: EASE }}
                  onAnimationComplete={onDone}
              >
                {ITEMS.map((item, i) => (
                    <div
                        key={`${item.id}-${i}`}
                        className="shrink-0 p-6 rounded-2xl"
                        style={{ width: `${MOB_W}vw`, background: CARD_BG }}
                    >
                      <NewsCard item={item} />
                    </div>
                ))}
              </motion.div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block py-2 overflow-hidden">
              <motion.div
                  className="flex"
                  style={{ gap: `${DESK_G}px` }}
                  animate={{ x: desktopX }}
                  transition={{ duration: 0.55, ease: EASE }}
                  onAnimationComplete={onDone}
              >
                {ITEMS.map((item, i) => (
                    <div
                        key={`${item.id}-${i}`}
                        className="shrink-0 p-8 rounded-2xl"
                        style={{ width: `${DESK_W}%`, background: CARD_BG }}
                    >
                      <NewsCard item={item} />
                    </div>
                ))}
              </motion.div>
            </div>

          </div>

          <div className="flex justify-center gap-4 mt-16">
            <CarouselButton onClick={() => scroll("left")} disabled={false} label="Previous">&lt;</CarouselButton>
            <CarouselButton onClick={() => scroll("right")} disabled={false} label="Next">&gt;</CarouselButton>
          </div>

        </div>
      </div>
  )
}