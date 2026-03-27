'use client'

import { useState } from 'react'
import { useNewsData } from './use-news'
import { useIsMobile } from '@/hooks/use-mobile'
import { NewsHeader } from './news-header'
import { NewsFilterBar } from './news-filter-bar'
import { NewsFeatured } from './news-featured'
import { NewsGrid } from './news-grid'
import { NewsInfoSection } from './news-info-section'
import { NewsSheet } from './news-sheet'
import type { Post, PostCategory } from './news'

export default function NewsClient() {
    const { loading, data } = useNewsData()
    const isMobile = useIsMobile()
    const [activeFilter, setActiveFilter] = useState<PostCategory | 'all'>('all')
    const [activePost, setActivePost] = useState<Post | null>(null)

    const filtered = !data
        ? []
        : activeFilter === 'all'
            ? data.posts
            : data.posts.filter((p) => p.category === activeFilter)

    return (
        <>
            <NewsHeader />

            <NewsFilterBar
                active={activeFilter}
                filters={data?.postFilters ?? []}
                onChange={setActiveFilter}
            />

            {/* News content */}
            <div className="max-w-[var(--max-width,1400px)] mx-auto px-16 max-lg:px-8 section-half">
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

            {/* School info: calendar + announcements */}
            <NewsInfoSection
                termDates={data?.termDates ?? []}
                announcements={data?.announcements ?? []}
                loading={loading}
            />

            <NewsSheet post={activePost} onClose={() => setActivePost(null)} />
        </>
    )
}
