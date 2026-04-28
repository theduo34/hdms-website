"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, MessageSquare } from "lucide-react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import type { TestimonialItem } from "@/features/home/cards/parent-voice-card"
import { TestimonialCard } from "@/features/community/testimonial-card"
import { headingStyle } from "@/styles/font"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface PaginatedResponse {
  data: TestimonialItem[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

const PAGE_LIMIT = 9

export function TestimonialsSection() {
  const [items, setItems]             = useState<TestimonialItem[]>([])
  const [total, setTotal]             = useState(0)
  const [page, setPage]               = useState(1)
  const [hasMore, setHasMore]         = useState(false)
  const [loading, setLoading]         = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const load = useCallback(async (p: number, append: boolean) => {
    if (p === 1) setLoading(true)
    else setLoadingMore(true)

    try {
      const res  = await fetch(`/api/testimonials?page=${p}&limit=${PAGE_LIMIT}`)
      const json = await res.json() as PaginatedResponse
      setItems(prev => append ? [...prev, ...(json.data ?? [])] : (json.data ?? []))
      setTotal(json.total ?? 0)
      setPage(p)
      setHasMore(json.hasMore ?? false)
    } catch {
      // silently fail — section stays empty
    } finally {
      if (p === 1) setLoading(false)
      else setLoadingMore(false)
    }
  }, [])

  useEffect(() => { load(1, false) }, [load])

  return (
    <section aria-labelledby="testimonials-heading" className="section-container bg-muted">

      <AnimateInView yOffset={10} duration={0.7}>
        <div className="flex flex-col items-center text-center gap-3 mb-12 md:mb-16">
          <p className="text-secondary text-xs uppercase tracking-[0.2em] font-semibold">
            Parent Voices
          </p>
          <h2
            id="testimonials-heading"
            className="text-primary"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
          >
            What Our Families Say.
          </h2>
        </div>
      </AnimateInView>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-2xl bg-white/8" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-foreground/30">
          <MessageSquare className="w-10 h-10 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No testimonials yet. Check back soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {items.map((item, i) => (
              <TestimonialCard
                key={item.id}
                item={item}
                delay={(i % PAGE_LIMIT) * 0.04}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => load(page + 1, true)}
                disabled={loadingMore}
                className="min-w-44"
              >
                {loadingMore ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…</>
                ) : (
                  `Load more · ${total - items.length} remaining`
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
