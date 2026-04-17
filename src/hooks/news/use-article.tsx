'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getMediaUrl } from '@/lib/media'
import { allPosts, type Post, type PostCategory } from '@/features/news/news'
import { getDepartmentLabel } from '@/features/admin/news/news-data'

export function useArticle(slug: string) {
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            const db = createClient()
            const { data, error } = await db
                .from('news_posts')
                .select('id, slug, category, category_label, headline, excerpt, author, author_tag, featured, published_at, content, cover:media_assets(storage_path, alt)')
                .eq('slug', slug)
                .single()

            if (!cancelled) {
                if (!error && data) {
                    const row = data as unknown as {
                        id: string; slug: string; category: string; category_label: string
                        headline: string; excerpt: string; author: string; author_tag: string
                        featured: boolean; published_at: string
                        content: Array<{ type: 'paragraph' | 'pullquote'; text: string }>
                        cover: { storage_path: string | null; alt: string } | { storage_path: string | null; alt: string }[] | null
                    }
                    const cover = Array.isArray(row.cover) ? row.cover[0] : row.cover

                    setPost({
                        id:            row.id,
                        slug:          row.slug,
                        category:      row.category as PostCategory,
                        categoryLabel: row.category_label,
                        date:          new Date(row.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                        image:         getMediaUrl(cover?.storage_path ?? null),
                        imageAlt:      cover?.alt ?? row.headline,
                        headline:      row.headline,
                        excerpt:       row.excerpt ?? '',
                        author:        row.author,
                        author_tag:    row.author_tag ?? 'ict-directorate',
                        content:       row.content ?? [],
                    })
                } else {
                    // Fall back to static posts
                    setPost(allPosts.find((p) => p.slug === slug) ?? null)
                }
                setLoading(false)
            }
        }

        load()
        return () => { cancelled = true }
    }, [slug])

    return { loading, post }
}
