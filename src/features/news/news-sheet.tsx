'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { categoryBadgeClass, type Post, type PostCategory } from './news'
import { CalendarDays, Bell, FileText, Mic } from 'lucide-react'

function CategoryIcon({ cat }: { cat: PostCategory }) {
    const props = { className: 'w-3 h-3 shrink-0', 'aria-hidden': true as const }
    if (cat === 'event') return <CalendarDays {...props} />
    if (cat === 'announcement') return <Bell {...props} />
    if (cat === 'press') return <Mic {...props} />
    return <FileText {...props} />
}

interface Props {
    post: Post | null
    onClose: () => void
}

export function NewsSheet({ post, onClose }: Props) {
    return (
        <Sheet open={!!post} onOpenChange={(open) => { if (!open) onClose() }}>
            <SheetContent
                side="bottom"
                className="max-h-[78vh] rounded-t-2xl px-0 pb-0 gap-0 bg-card border-0 shadow-2xl"
                showCloseButton={false}
            >
                {post && (
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Handle + close */}
                        <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
                            <div className="w-10 h-1 bg-border rounded-full mx-auto" />
                        </div>

                        <div className="overflow-y-auto flex-1 px-6 pb-8">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-5">
                                <Image
                                    src={post.image}
                                    alt={post.imageAlt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw"
                                />
                                <span className={`absolute bottom-3 left-3 flex items-center gap-1.5 text-[0.58rem] font-bold tracking-[0.18em] uppercase px-3 py-1 ${categoryBadgeClass(post.category)}`}>
                                    <CategoryIcon cat={post.category} />
                                    {post.categoryLabel}
                                </span>
                                <button
                                    onClick={onClose}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-sm"
                                    aria-label="Close"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[0.65rem] tracking-[0.15em] uppercase text-secondary font-bold">{post.categoryLabel}</span>
                                <span className="w-[2px] h-[2px] rounded-full bg-border" aria-hidden />
                                <span className="text-[0.7rem] font-light text-muted-foreground">{post.date}</span>
                            </div>

                            <h2 className="text-[1.3rem] font-semibold text-foreground leading-[1.2] mb-3" style={headingStyle}>
                                {post.headline}
                            </h2>

                            <p className="text-[0.85rem] font-light leading-[1.75] text-foreground/65 mb-7">
                                {post.excerpt}
                            </p>

                            <Link
                                href={`/news-&-announcements/${post.slug}`}
                                onClick={onClose}
                                className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.12em] uppercase text-primary-foreground bg-primary px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Read Full Story
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                            </Link>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
