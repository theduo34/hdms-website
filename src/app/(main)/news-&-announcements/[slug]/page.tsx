import { NewsDetailPage } from "@/components/pages/news/news-detail-page";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getMediaUrl } from "@/lib/media";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const db = await createClient()
  const { data } = await db
    .from('news_posts')
    .select('headline, excerpt, cover:media_assets!cover_asset_id(storage_path)')
    .eq('slug', slug)
    .single() as unknown as {
      data: { headline: string; excerpt: string; cover: { storage_path: string | null } | null } | null
    }

  const image = data?.cover?.storage_path ? getMediaUrl(data.cover.storage_path) : undefined

  return {
    title: data?.headline ?? "News Article",
    description: data?.excerpt ?? "Read the latest news from Heaven's Dew Montessori.",
    openGraph: {
      title: data?.headline,
      description: data?.excerpt,
      images: image ? [{ url: image }] : [],
    },
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <NewsDetailPage article={slug} />
}
