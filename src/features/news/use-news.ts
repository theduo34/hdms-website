'use client'

import { useState, useEffect } from 'react'
import {
    featuredPost, posts, postFilters, announcements, termDates,
    type Post, type Announcement, type TermRow, type PostCategory,
} from './news'

export interface NewsData {
    featuredPost: Post
    posts: Post[]
    postFilters: { id: PostCategory | 'all'; label: string; count: number }[]
    announcements: Announcement[]
    termDates: TermRow[]
}

export function useNewsData() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<NewsData | null>(null)

    useEffect(() => {
        // Simulates API fetch — replace with real fetch(api.hdm.edu.gh/news) when ready
        const t = setTimeout(() => {
            setData({ featuredPost, posts, postFilters, announcements, termDates })
            setLoading(false)
        }, 700)
        return () => clearTimeout(t)
    }, [])

    return { loading, data }
}
