export interface DashboardStats {
  photos: number
  news: number
  events: number
  staff: number
  faqs: number
}

export interface RecentPost {
  id: string
  headline: string
  published_at: string
  category: string
  category_label: string
}

export interface RecentPhoto {
  id: string
  created_at: string
  featured: boolean
  asset: {
    id: string
    storage_path: string | null
    alt: string
    title: string | null
  } | null
}

export interface DashboardActivity {
  recentNews: RecentPost[]
  recentPhotos: RecentPhoto[]
}
