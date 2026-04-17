import { createServiceClient } from '@/lib/supabase/service'
import type { DashboardStats, DashboardActivity } from './dashboard-types'

export async function getDashboardStats(): Promise<DashboardStats> {
  const db = createServiceClient()

  const [photos, news, events, staff, faqs] = await Promise.all([
    db.from('gallery_photos').select('id', { count: 'exact', head: true }),
    db.from('news_posts').select('id', { count: 'exact', head: true }),
    db.from('gallery_events').select('id', { count: 'exact', head: true }),
    db.from('staff_members').select('id', { count: 'exact', head: true }).eq('is_active', true),
    db.from('admissions_faqs').select('id', { count: 'exact', head: true }),
  ])

  return {
    photos: photos.count ?? 0,
    news: news.count ?? 0,
    events: events.count ?? 0,
    staff: staff.count ?? 0,
    faqs: faqs.count ?? 0,
  }
}

export async function getDashboardActivity(): Promise<DashboardActivity> {
  const db = createServiceClient()

  const [recentNews, recentPhotos] = await Promise.all([
    db
      .from('news_posts')
      .select('id, headline, published_at, category, category_label')
      .order('published_at', { ascending: false })
      .limit(5),
    db
      .from('gallery_photos')
      .select('id, created_at, featured, asset:media_assets(id, storage_path, alt, title)')
      .order('created_at', { ascending: false })
      .limit(6),
  ])

  return {
    recentNews: recentNews.data ?? [],
    recentPhotos: (recentPhotos.data ?? []) as unknown as DashboardActivity['recentPhotos'],
  }
}
