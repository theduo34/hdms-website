'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { headingStyle } from '@/styles/font'
import { categoryBadgeClass, type Post } from './news'

const EASE = [0.16, 1, 0.3, 1] as const

function Skeleton() {
    return (
        <motion.div
            className="rounded-2xl overflow-hidden bg-card border border-border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
        >
            <div className="grid grid-cols-2 max-lg:grid-cols-1">
                <div className="min-h-[460px] max-lg:min-h-[240px] bg-muted animate-pulse" />
                <div className="p-12 max-md:p-8 flex flex-col justify-center gap-5">
                    <div className="h-3 w-28 bg-muted rounded-full animate-pulse" />
                    <div className="space-y-3">
                        <div className="h-8 bg-muted rounded animate-pulse" />
                        <div className="h-8 w-4/5 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3.5 bg-muted rounded animate-pulse" />
                        <div className="h-3.5 bg-muted rounded animate-pulse" />
                        <div className="h-3.5 w-2/3 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-32 bg-muted rounded-full animate-pulse mt-2" />
                </div>
            </div>
        </motion.div>
    )
}

function FeaturedInner({ post }: { post: Post }) {
    return (
        <div className="grid grid-cols-2 max-lg:grid-cols-1">
            <div className="relative overflow-hidden min-h-[460px] max-lg:min-h-[240px]">
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 bg-secondary text-secondary-foreground text-[0.6rem] font-bold tracking-[0.2em] uppercase px-2 py-1.5">
                    Featured
                </span>
                <span className={`absolute bottom-5 left-5 text-[0.58rem] font-bold tracking-[0.18em] uppercase px-3 py-1 ${categoryBadgeClass(post.category)}`}>
                    {post.categoryLabel}
                </span>
            </div>
            <div className="p-8 max-md:p-4 flex flex-col justify-center bg-card">
                <span className="text-[0.65rem] font-light text-muted-foreground mb-6 block">
                    {post.date}
                </span>
                <h2
                    className="text-[clamp(1.5rem,2.4vw,2.4rem)] font-semibold text-foreground leading-[1.15] mb-4"
                    style={headingStyle}
                >
                    {post.headline}
                </h2>
                <p className="text-[0.88rem] font-light leading-[1.8] mb-10">
                    {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary transition-all duration-300 group-hover:gap-3">
                    Read Full Story
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
            </div>
        </div>
    )
}

interface Props {
    post: Post | undefined
    isMobile: boolean
    onOpen: (post: Post) => void
    loading: boolean
}

export function NewsFeatured({ post, isMobile, onOpen, loading }: Props) {
    if (loading || !post) return <Skeleton />

    const cls = "block w-full text-left font-[inherit] rounded-2xl overflow-hidden cursor-pointer group transition-shadow duration-300 hover:shadow-lg"

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
        >
            {isMobile ? (
                <button className={cls} onClick={() => onOpen(post)} aria-label={`Read: ${post.headline}`}>
                    <FeaturedInner post={post} />
                </button>
            ) : (
                <Link href={`/news-&-announcements/${post.slug}`} className={cls} aria-label={`Read: ${post.headline}`}>
                    <FeaturedInner post={post} />
                </Link>
            )}
        </motion.div>
    )
}
