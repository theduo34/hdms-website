'use client'

import Link from 'next/link'
import { headingStyle } from '@/styles/font'
import {useArticle} from "@/hooks/news/use-article";
import {DetailSkeleton} from "@/features/news/details-skeleton";
import {ArticleDetail} from "@/features/news/article-details";
import {ArrowBigLeft} from "lucide-react";


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
                    <span><ArrowBigLeft size={10}/></span> Back to News
                </Link>
            </main>
        )
    }

    return <ArticleDetail post={post} />
}
