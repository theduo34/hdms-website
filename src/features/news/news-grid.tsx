'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Bell, FileText, Mic } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { headingStyle } from '@/styles/font'
import { categoryBadgeClass, type Post, type PostCategory } from './news'

const EASE = [0.16, 1, 0.3, 1] as const

function CategoryIcon({ cat }: { cat: PostCategory }) {
    const props = { className: 'w-3 h-3 shrink-0', 'aria-hidden': true as const }
    if (cat === 'event') return <CalendarDays {...props} />
    if (cat === 'announcement') return <Bell {...props} />
    if (cat === 'press') return <Mic {...props} />
    return <FileText {...props} />
}

function CardSkeleton() {
    return (
        <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <div className="aspect-[16/10] bg-muted animate-pulse" />
            <div className="p-6 space-y-3">
                <div className="h-3 w-20 bg-muted rounded-full animate-pulse" />
                <div className="h-5 bg-muted rounded animate-pulse" />
                <div className="h-5 w-4/5 bg-muted rounded animate-pulse" />
                <div className="space-y-1.5 pt-1">
                    <div className="h-3 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-4/5 bg-muted rounded animate-pulse" />
                </div>
            </div>
        </div>
    )
}

function PostCard({
    post,
    index,
    isMobile,
    onOpen,
}: {
    post: Post
    index: number
    isMobile: boolean
    onOpen: (post: Post) => void
}) {
    const inner = (
        <>
            <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className={`absolute bottom-3 left-3 flex items-center gap-1.5 text-[0.58rem] font-bold tracking-[0.18em] uppercase px-3 py-1 ${categoryBadgeClass(post.category)}`}>
                    <CategoryIcon cat={post.category} />
                    {post.categoryLabel}
                </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <span className="text-[0.68rem] font-light text-muted-foreground mb-3 block">{post.date}</span>
                <h3
                    className="text-[1.1rem] font-semibold text-foreground leading-[1.3] mb-3 flex-1"
                    style={headingStyle}
                >
                    {post.headline}
                </h3>
                <p className="text-[0.8rem] font-light leading-[1.7] text-foreground/55 line-clamp-3 mb-5">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                        Read More
                    </span>
                    <ArrowRight
                        className="w-3.5 h-3.5 text-secondary opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                        aria-hidden
                    />
                </div>
            </div>
        </>
    )

    const cls = "flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden cursor-pointer font-[inherit] text-left p-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
        >
            {isMobile ? (
                <button onClick={() => onOpen(post)} className={cls} aria-label={`Read: ${post.headline}`}>
                    {inner}
                </button>
            ) : (
                <Link href={`/news-&-announcements/${post.slug}`} className={cls} aria-label={`Read: ${post.headline}`}>
                    {inner}
                </Link>
            )}
        </motion.div>
    )
}

interface Props {
    posts: Post[]
    isMobile: boolean
    onOpen: (post: Post) => void
    loading: boolean
}

export function NewsGrid({ posts, isMobile, onOpen, loading }: Props) {
    return (
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5 mt-10">
            {loading
                ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
                : (
                    <AnimatePresence mode="popLayout">
                        {posts.map((post, i) => (
                            <PostCard key={post.id} post={post} index={i} isMobile={isMobile} onOpen={onOpen} />
                        ))}
                    </AnimatePresence>
                )
            }
        </div>
    )
}
