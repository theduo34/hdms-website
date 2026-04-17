'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getMediaUrl } from '@/lib/media'
import type { AcademicTermRow } from '@/lib/supabase/types'
import {
    categoryBadgeClass,
    type Post, type Announcement, type TermRow, type PostCategory,
} from './news'

export interface NewsData {
    featuredPost: Post
    posts: Post[]
    postFilters: { id: PostCategory | 'all'; label: string; count: number }[]
    announcements: Announcement[]
    termDates: TermRow[]
}

function fmtLong(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function fmtShort(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function computeWeeks(start: string, end: string): string {
    const diff = new Date(end).getTime() - new Date(start).getTime()
    const weeks = Math.round(diff / (7 * 24 * 60 * 60 * 1000))
    return `${weeks} week${weeks !== 1 ? 's' : ''}`
}

type RawPost = {
    id: string
    slug: string
    category: PostCategory
    category_label: string
    headline: string
    excerpt: string
    author: string
    author_tag: string
    featured: boolean
    published_at: string
    content: Array<{ type: 'paragraph' | 'pullquote'; text: string }>
    cover: { storage_path: string | null; alt: string } | { storage_path: string | null; alt: string }[] | null
}

function mapPost(row: RawPost): Post {
    const cover = Array.isArray(row.cover) ? row.cover[0] : row.cover
    return {
        id:            row.id,
        slug:          row.slug,
        category:      row.category,
        categoryLabel: row.category_label,
        date:          fmtLong(row.published_at),
        image:         getMediaUrl(cover?.storage_path),
        imageAlt:      cover?.alt ?? row.headline,
        headline:      row.headline,
        excerpt:       row.excerpt,
        author:        row.author,
        author_tag:    row.author_tag ?? 'ict-directorate',
        content:       row.content,
    }
}

async function fetchNewsData(): Promise<NewsData> {
    const db = createClient()

    const { data: postRows, error: postErr } = await db
        .from('news_posts')
        .select('id, slug, category, category_label, headline, excerpt, author, author_tag, featured, published_at, content, cover:media_assets(storage_path, alt)')
        .order('published_at', { ascending: false })

    if (postErr) throw postErr

    const allPosts = (postRows ?? []) as unknown as RawPost[]

    const featuredRow = allPosts.find(p => p.featured)
    const gridRows    = allPosts.filter(p => !p.featured)

    const featuredPost = mapPost(featuredRow ?? allPosts[0])
    const posts        = gridRows.map(mapPost)

    const postFilters: NewsData['postFilters'] = [
        { id: 'all',          label: 'All',           count: posts.length },
        { id: 'news',         label: 'News',          count: posts.filter(p => p.category === 'news').length },
        { id: 'announcement', label: 'Announcements', count: posts.filter(p => p.category === 'announcement').length },
        { id: 'event',        label: 'Events',        count: posts.filter(p => p.category === 'event').length },
        { id: 'press',        label: 'Press',         count: posts.filter(p => p.category === 'press').length },
    ]

    // Announcements = news_posts with category 'announcement', latest 5
    const announcementRows = allPosts
        .filter(p => p.category === 'announcement')
        .slice(0, 5)

    const announcements: Announcement[] = announcementRows.map(row => ({
        id:       row.id,
        slug:     row.slug,
        headline: row.headline,
        excerpt:  row.excerpt ?? '',
        date:     fmtLong(row.published_at),
    }))

    // Academic terms
    const { data: termRows, error: termErr } = await db
        .from('academic_terms')
        .select('id, name, start_date, end_date, is_current, is_break')
        .order('start_date', { ascending: true })

    if (termErr) throw termErr

    const termDates: TermRow[] = ((termRows ?? []) as unknown as AcademicTermRow[]).map(row => ({
        name:      row.name,
        start:     row.is_break ? '' : fmtShort(row.start_date),
        end:       row.is_break
            ? `${fmtShort(row.start_date)} – ${fmtShort(row.end_date)}`
            : fmtShort(row.end_date),
        duration:  computeWeeks(row.start_date, row.end_date),
        isCurrent: row.is_current,
        isBreak:   row.is_break,
    }))

    return { featuredPost, posts, postFilters, announcements, termDates }
}

export function useNewsData() {
    const [loading, setLoading] = useState(true)
    const [data, setData]       = useState<NewsData | null>(null)

    useEffect(() => {
        let cancelled = false
        fetchNewsData()
            .then(result => { if (!cancelled) { setData(result); setLoading(false) } })
            .catch(err   => { console.error('useNewsData:', err); if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [])

    return { loading, data }
}

export { categoryBadgeClass }
