'use client';

import { useEffect, useState } from "react";
import {headingStyle} from "@/styles/font";
import Link from "next/link";
import { categoryBadgeClass, type Post } from "@/features/news/news";
import { createClient } from "@/lib/supabase/client";
import { getMediaUrl } from "@/lib/media";
import { motion } from "motion/react";
import Image from "next/image";
import { AnimateInView } from "@/components/shared/animate-in-view";
import {RelatedCard} from "@/features/news/related-article";
import {ArrowLeft} from "lucide-react";
import { getDepartmentLabel } from "@/features/admin/news/news-data";

const EASE = [0.16, 1, 0.3, 1] as const

export function ArticleDetail({ post }: { post: Post }) {
    const [related, setRelated] = useState<Post[]>([])

    useEffect(() => {
        const db = createClient()
        // Try same category first, fall back to any posts
        db.from('news_posts')
            .select('id, slug, category, category_label, headline, excerpt, author, author_tag, published_at, cover:media_assets(storage_path, alt)')
            .neq('id', post.id)
            .eq('category', post.category)
            .order('published_at', { ascending: false })
            .limit(3)
            .then(async ({ data: sameCat }) => {
                const rows = sameCat ?? []
                if (rows.length >= 2) return rows
                const { data: anyPosts } = await db
                    .from('news_posts')
                    .select('id, slug, category, category_label, headline, excerpt, author, author_tag, published_at, cover:media_assets(storage_path, alt)')
                    .neq('id', post.id)
                    .order('published_at', { ascending: false })
                    .limit(3)
                return anyPosts ?? []
            })
            .then(rows => {
                setRelated(
                    rows.map((row: Record<string, unknown>) => {
                        const cover = Array.isArray(row.cover) ? (row.cover as Record<string, unknown>[])[0] : row.cover as Record<string, unknown> | null
                        return {
                            id:            row.id as string,
                            slug:          row.slug as string,
                            category:      row.category as Post['category'],
                            categoryLabel: row.category_label as string,
                            date:          new Date(row.published_at as string).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                            image:         getMediaUrl(cover?.storage_path as string | null),
                            imageAlt:      cover?.alt as string ?? row.headline as string,
                            headline:      row.headline as string,
                            excerpt:       row.excerpt as string,
                            author:        row.author as string,
                            author_tag:    (row.author_tag as string) ?? 'ict-directorate',
                            content:       row.content as Post['content'] ?? [],
                        }
                    })
                )
            })
    }, [post.id, post.category])

    return (
        <main className="flex flex-col w-full min-h-screen bg-background">

            <motion.div
                className="relative w-full aspect-[21/9] max-h-[560px] overflow-hidden"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
            >
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            <div className="max-w-[760px] mx-auto w-full px-4 section-half">

                <AnimateInView yOffset={12} duration={0.6}>
                    <nav className="flex items-center gap-2 mb-10 text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground" aria-label="Breadcrumb">
                        <Link href="/news-&-announcements" className="hover:text-foreground transition-colors duration-150 flex items-center gap-1">
                            <span><ArrowLeft size={14}/></span> News
                        </Link>
                        <span aria-hidden>/</span>
                        <span className="text-accent truncate max-w-[220px]">{post.categoryLabel}</span>
                    </nav>
                </AnimateInView>

                <AnimateInView yOffset={16} duration={0.7} delay={0.05}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`text-[0.58rem] font-bold tracking-[0.18em] uppercase px-3 py-1 ${categoryBadgeClass(post.category)}`}>
                            {post.categoryLabel}
                        </span>
                        <span className="text-[0.75rem] font-light text-muted-foreground">{post.date}</span>
                        <span className="w-[3px] h-[3px] rounded-full bg-border" aria-hidden />
                        <span className="text-[0.75rem] font-light text-muted-foreground">
                            {getDepartmentLabel(post.author_tag)}
                        </span>
                    </div>
                </AnimateInView>

                <AnimateInView yOffset={20} duration={0.8} delay={0.1}>
                    <h1
                        className="text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.1] mb-10"
                        style={headingStyle}
                    >
                        {post.headline}
                    </h1>
                </AnimateInView>

                <AnimateInView yOffset={0} duration={0.6} delay={0.15}>
                    <div className="w-16 h-0.5 bg-secondary mb-8" />
                </AnimateInView>

                <AnimateInView yOffset={16} duration={0.8} delay={0.2}>
                    <div className="space-y-6">
                        {post.content.map((block, i) =>
                            block.type === 'pullquote' ? (
                                <blockquote
                                    key={i}
                                    className="border-l-[3px] border-secondary pl-7 my-10 text-[1.2rem] italic text-foreground font-normal leading-[1.55]"
                                    style={headingStyle}
                                >
                                    {block.text}
                                </blockquote>
                            ) : (
                                <p key={i} className="text-[0.95rem] font-light leading-[1.9]">
                                    {block.text}
                                </p>
                            )
                        )}
                    </div>
                </AnimateInView>

                <AnimateInView yOffset={12} duration={0.6} delay={0.1}>
                    <div className="mt-10 pt-10 border-t border-border">
                        <Link
                            href="/news-&-announcements"
                            className="inline-flex items-center gap-1 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground hover:gap-4 transition-all duration-200"
                        >
                            <span><ArrowLeft size={14}/></span> Back to all news
                        </Link>
                    </div>
                </AnimateInView>
            </div>

            {related.length > 0 && (
                <section className="bg-muted section-half section-container" aria-labelledby="related-heading">
                    <div className="max-w-[var(--max-width,1400px)] mx-auto">
                        <AnimateInView yOffset={16}>
                            <div className="section-tag">
                                <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                                <span className="text-[10px] tracking-[0.3em] font-bold uppercase">More from HDM</span>
                            </div>
                            <h2 id="related-heading" className="text-[1.6rem] font-light text-foreground mb-10" style={headingStyle}>
                                You might also like
                            </h2>
                        </AnimateInView>
                        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
                            {related.map((p, i) => (
                                <AnimateInView key={p.id} yOffset={16} delay={i * 0.06}>
                                    <RelatedCard post={p} />
                                </AnimateInView>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
