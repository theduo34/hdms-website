'use client'

import { useState, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useNewsData } from './use-news'
import { useIsMobile } from '@/hooks/use-mobile'
import { NewsHeader } from './news-header'
import { NewsFilterBar } from './news-filter-bar'
import { NewsFeatured } from './news-featured'
import { NewsGrid } from './news-grid'
import { NewsInfoSection } from './news-info-section'
import { NewsSheet } from './news-sheet'
import type { Post, PostCategory } from './news'

const VALID_FILTERS = new Set<PostCategory | 'all'>(['all', 'news', 'announcement', 'event', 'press'])

function resolveFilter(raw: string | null): PostCategory | 'all' {
    return VALID_FILTERS.has(raw as PostCategory | 'all') ? (raw as PostCategory | 'all') : 'all'
}

export default function NewsClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const { loading, data } = useNewsData()
    const isMobile = useIsMobile()

    const [activeFilter, setActiveFilter] = useState<PostCategory | 'all'>(
        () => resolveFilter(searchParams.get('filter'))
    )
    const [activePost, setActivePost] = useState<Post | null>(null)

    const handleFilterChange = useCallback((filter: PostCategory | 'all') => {
        setActiveFilter(filter)
        const params = new URLSearchParams()
        if (filter !== 'all') params.set('filter', filter)
        router.push(
            params.size > 0 ? `${pathname}?${params.toString()}` : pathname,
            { scroll: false }
        )
    }, [router, pathname])

    const filtered = !data
        ? []
        : activeFilter === 'all'
            ? data.posts
            : data.posts.filter(p => p.category === activeFilter)

    return (
        <>
            <NewsHeader />

            <NewsFilterBar
                active={activeFilter}
                filters={data?.postFilters ?? []}
                onChange={handleFilterChange}
            />

            <div className="max-w-[var(--max-width,1400px)] mx-auto section-container section-half">
                <NewsFeatured
                    post={data?.featuredPost}
                    isMobile={isMobile}
                    onOpen={setActivePost}
                    loading={loading}
                />
                <NewsGrid
                    posts={filtered}
                    isMobile={isMobile}
                    onOpen={setActivePost}
                    loading={loading}
                />
            </div>

            <NewsInfoSection
                termDates={data?.termDates ?? []}
                announcements={data?.announcements ?? []}
                loading={loading}
            />

            <NewsSheet post={activePost} onClose={() => setActivePost(null)} />
        </>
    )
}
