import {
    type GalleryItem,
    type GalleryPhoto,
    type GalleryVideo,
    type GalleryEvent,
    type MainCategory,
    type SubCategory,
} from './gallery'

export interface GalleryPageResult {
    items: GalleryItem[]
    total: number
    hasMore: boolean
}

export interface EventAlbumResult {
    event: GalleryEvent
    photos: GalleryPhoto[]
    total: number
    hasMore: boolean
}

export interface GalleryCounts {
    photos: number
    videos: number
    events: number
}

export async function fetchGalleryPage(
    main: MainCategory,
    sub: SubCategory,
    page: number,
): Promise<GalleryPageResult> {
    const params = new URLSearchParams({ main, sub, page: String(page) })
    const res = await fetch(`/api/gallery?${params}`)
    if (!res.ok) throw new Error(`Gallery fetch failed: ${res.status}`)
    return res.json()
}

export async function fetchGalleryCounts(): Promise<GalleryCounts> {
    const res = await fetch('/api/gallery/counts')
    if (!res.ok) return { photos: 0, videos: 0, events: 0 }
    return res.json()
}

export async function fetchEventAlbum(
    eventId: string,
    page = 1,
    limit = 10,
): Promise<EventAlbumResult | null> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    const res = await fetch(`/api/gallery/events/${eventId}?${params}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Event album fetch failed: ${res.status}`)
    return res.json()
}

export function searchGallery(items: GalleryItem[], query: string): GalleryItem[] {
    const q = query.toLowerCase()
    return items.filter(item => {
        if (item.type === 'photos') return `${item.title} ${item.alt}`.toLowerCase().includes(q)
        if (item.type === 'videos') return `${item.title} ${item.alt}`.toLowerCase().includes(q)
        if (item.type === 'events') return `${item.title} ${item.description}`.toLowerCase().includes(q)
        return false
    })
}
