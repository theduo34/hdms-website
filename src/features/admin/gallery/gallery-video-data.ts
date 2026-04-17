import { CalendarDays, Music, Building2 } from 'lucide-react'
import type { ComponentType } from 'react'

export interface VideoCategory {
  slug: string
  label: string
  icon: ComponentType<{ className?: string }>
  // Folder path inside the `media` storage bucket
  folder: string
  // Whether the path includes a year segment: videos/events/2025/
  hasYear: boolean
  description: string
}

// Mirrors the storage bucket structure under media/videos/
// and the sub-filter slugs on the public gallery Videos tab
export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    slug: 'events',
    label: 'Events',
    icon: CalendarDays,
    folder: 'videos/events',
    hasYear: true,
    description: 'School events and ceremonies',
  },
  {
    slug: 'culture',
    label: 'Culture',
    icon: Music,
    folder: 'videos/culture',
    hasYear: true,
    description: 'Cultural programs and performances',
  },
  {
    slug: 'tour',
    label: 'Tour',
    icon: Building2,
    folder: 'videos/tour',
    hasYear: false,
    description: 'Campus tour and classroom walkthroughs',
  },
]

// Convert any YouTube or Vimeo watch URL to its embed equivalent.
// Embed URLs are what gets stored in gallery_videos.video_url.
export function toEmbedUrl(raw: string): string {
  const trimmed = raw.trim()

  // youtube.com/watch?v=ID or youtube.com/shorts/ID
  const ytWatch = trimmed.match(/youtube\.com\/(?:watch\?v=|shorts\/)([A-Za-z0-9_-]{11})/)
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`

  // youtu.be/ID
  const ytShort = trimmed.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`

  // vimeo.com/ID
  const vimeo = trimmed.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  // Already an embed URL or unknown — return as-is
  return trimmed
}
