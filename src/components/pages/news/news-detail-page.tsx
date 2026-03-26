'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { featuredPost, posts, categoryBadgeClass, type Post } from '@/features/news/news'

const EASE = [0.16, 1, 0.3, 1] as const
const allPosts = [featuredPost, ...posts]

function DetailSkeleton() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-background">
            <div className="w-full aspect-[21/9] max-h-[560px] bg-muted animate-pulse" />
            <div className="max-w-[760px] mx-auto w-full px-6 py-16">
                <div className="h-4 w-32 bg-muted rounded-full animate-pulse mb-10" />
                <div className="space-y-3 mb-10">
                    <div className="h-10 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-5/6 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-3/5 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-16 h-0.5 bg-muted animate-pulse mb-10" />
                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={`h-4 bg-muted rounded animate-pulse ${i % 4 === 3 ? 'w-3/4' : 'w-full'}`} />
                    ))}
                </div>
            </div>
        </main>
    )
}

function useArticle(slug: string) {
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        // Replace with fetch(api.hdm.edu.gh/news/${slug}) when API is ready
        const t = setTimeout(() => {
            setPost(allPosts.find((p) => p.slug === slug) ?? null)
            setLoading(false)
        }, 600)
        return () => clearTimeout(t)
    }, [slug])

    return { loading, post }
}

function RelatedCard({ post }: { post: Post }) {
    return (
        <Link
            href={`/news-&-announcements/${post.slug}`}
            className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, 33vw"
                    loading="lazy"
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span className={`absolute bottom-3 left-3 text-[0.58rem] font-bold tracking-[0.18em] uppercase px-3 py-1 ${categoryBadgeClass(post.category)}`}>
                    {post.categoryLabel}
                </span>
            </div>
            <div className="p-5">
                <span className="text-[0.65rem] font-light text-muted-foreground mb-2 block">{post.date}</span>
                <h3 className="text-[1rem] font-semibold text-foreground leading-[1.3]" style={headingStyle}>
                    {post.headline}
                </h3>
            </div>
        </Link>
    )
}

function ArticleDetail({ post }: { post: Post }) {
    const sameCat = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
    const related = sameCat.length >= 2 ? sameCat : allPosts.filter((p) => p.id !== post.id).slice(0, 3)

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

            <div className="max-w-[760px] mx-auto w-full px-6 py-16">

                <AnimateInView yOffset={12} duration={0.6}>
                    <nav className="flex items-center gap-2 mb-10 text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground" aria-label="Breadcrumb">
                        <Link href="/news-&-announcements" className="hover:text-foreground transition-colors duration-150 flex items-center gap-1.5">
                            <span aria-hidden>←</span> News
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
                        <span className="text-[0.75rem] font-light text-muted-foreground">{post.author}</span>
                    </div>
                </AnimateInView>

                <AnimateInView yOffset={20} duration={0.8} delay={0.1}>
                    <h1
                        className="text-[clamp(2rem,5vw,3.2rem)] font-semibold text-foreground leading-[1.1] mb-10"
                        style={headingStyle}
                    >
                        {post.headline}
                    </h1>
                </AnimateInView>

                <AnimateInView yOffset={0} duration={0.6} delay={0.15}>
                    <div className="w-16 h-0.5 bg-secondary mb-10" />
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
                                <p key={i} className="text-[0.95rem] font-light leading-[1.9] text-foreground/75">
                                    {block.text}
                                </p>
                            )
                        )}
                    </div>
                </AnimateInView>

                <AnimateInView yOffset={12} duration={0.6} delay={0.1}>
                    <div className="mt-16 pt-10 border-t border-border">
                        <Link
                            href="/news-&-announcements"
                            className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground hover:gap-4 transition-all duration-200"
                        >
                            <span>←</span> Back to all news
                        </Link>
                    </div>
                </AnimateInView>
            </div>

            {related.length > 0 && (
                <section className="bg-muted py-16 px-16 max-lg:px-8" aria-labelledby="related-heading">
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

export function NewsDetailPage({ article }: { article: string }) {
    const { loading, post } = useArticle(article)

    if (loading) return <DetailSkeleton />

    if (!post) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-background px-6 text-center">
                <span className="text-[0.68rem] tracking-[0.25em] uppercase text-secondary mb-4">404</span>
                <h1 className="text-[2rem] font-semibold text-foreground mb-6" style={headingStyle}>
                    Article not found
                </h1>
                <Link href="/news-&-announcements" className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors">
                    ← Back to News
                </Link>
            </main>
        )
    }

    return <ArticleDetail post={post} />
}
