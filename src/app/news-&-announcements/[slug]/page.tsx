import { NewsDetailPage } from "@/components/pages/news/news-detail-page";
import type { Metadata } from "next";
import { featuredPost, posts } from "@/features/news/news";

const allPosts = [featuredPost, ...posts]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  return {
    title: post?.headline ?? "News Article",
    description: post?.excerpt ?? "Read the latest news from Heaven's Dew Montessori.",
    openGraph: {
      title: post?.headline,
      description: post?.excerpt,
      images: post?.image ? [{ url: post.image }] : [],
    },
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <NewsDetailPage article={slug} />
}
