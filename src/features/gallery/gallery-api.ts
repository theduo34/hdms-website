/**
 * Gallery API — thin client that calls server-side API routes.
 *
 * All data fetching runs server-side via /api/gallery/* which uses the
 * service-role Supabase client (bypasses RLS). This avoids anon-role
 * permission issues with media_categories in production.
 */

import {
    type GalleryItem,
    type GalleryPhoto,
    type GalleryVideo,
    type GalleryEvent,
    type MainCategory,
    type SubCategory,
} from './gallery'

// ---------- public result types ----------

export interface GalleryPageResult {
    items: GalleryItem[]
    total: number
    hasMore: boolean
}

export interface EventAlbumResult {
    event: GalleryEvent
    photos: GalleryPhoto[]
    total: number
}

export interface GalleryCounts {
    photos: number
    videos: number
    events: number
}

// ---------- public functions ----------

/**
 * Fetch a single page of gallery items.
 * Calls /api/gallery which resolves category slugs server-side.
 */
export async function fetchGalleryPage(
    main: MainCategory,
    sub: SubCategory,
    page: number,
): Promise<GalleryPageResult> {
    const params = new URLSearchParams({
        main,
        sub,
        page: String(page),
    })
    const res = await fetch(`/api/gallery?${params}`)
    if (!res.ok) throw new Error(`Gallery fetch failed: ${res.status}`)
    return res.json()
}

/**
 * Fetch total row counts for all three gallery categories.
 */
export async function fetchGalleryCounts(): Promise<GalleryCounts> {
    const res = await fetch('/api/gallery/counts')
    if (!res.ok) return { photos: 0, videos: 0, events: 0 }
    return res.json()
}

/**
 * Fetch a single event album and its linked photos.
 */
export async function fetchEventAlbum(eventId: string): Promise<EventAlbumResult | null> {
    const res = await fetch(`/api/gallery/events/${eventId}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Event album fetch failed: ${res.status}`)
    return res.json()
}

/**
 * Filter already-loaded gallery items by a search query.
 */
export function searchGallery(items: GalleryItem[], query: string): GalleryItem[] {
    const q = query.toLowerCase()
    return items.filter(item => {
        if (item.type === 'photos') return `${item.title} ${item.alt}`.toLowerCase().includes(q)
        if (item.type === 'videos') return `${item.title} ${item.alt}`.toLowerCase().includes(q)
        if (item.type === 'events') return `${item.title} ${item.description}`.toLowerCase().includes(q)
        return false
    })
}
