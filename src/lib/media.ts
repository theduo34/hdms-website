// src/lib/media.ts
//
// Central URL resolver for all media assets.
//
// Rule: never store full URLs in the database — only storage_path.
// This function is the single place that constructs a usable URL.
//
// Resolution order:
//   1. Supabase Storage path (storage_path column)  → full CDN URL
//   2. null / empty                                  → placeholder
//
// Works in both Server and Client Components (no Supabase client import needed
// — Supabase public storage URLs follow a predictable pattern).

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const BUCKET = 'media'

/**
 * Resolves a storage_path from media_assets into a publicly accessible URL.
 *
 * @example
 * getMediaUrl('gallery/events/2025/speech-day.jpg')
 * // → "https://xxx.supabase.co/storage/v1/object/public/media/gallery/events/2025/speech-day.jpg"
 *
 * getMediaUrl(null)
 * // → "/images/placeholder.jpg"
 */
export function getMediaUrl(storagePath: string | null | undefined): string {
  if (!storagePath) return '/images/placeholder.svg'
  // storagePath must be a relative path inside the bucket (e.g. "gallery/events/2025/photo.jpg")
  // Never store the full Supabase URL — this function builds it.
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
}

/**
 * Builds a Supabase Image Transformation URL.
 * Use this when you want Supabase to resize/optimise on delivery.
 *
 * Requires "Image Transformations" to be enabled on your Supabase project.
 *
 * @example
 * getTransformedMediaUrl('staff/charlotte-owusu.jpg', { width: 400, quality: 85 })
 */
export function getTransformedMediaUrl(
  storagePath: string | null | undefined,
  options: { width?: number; height?: number; quality?: number; resize?: 'cover' | 'contain' | 'fill' },
): string {
  if (!storagePath) return '/images/placeholder.svg'

  const params = new URLSearchParams()
  if (options.width)   params.set('width',   String(options.width))
  if (options.height)  params.set('height',  String(options.height))
  if (options.quality) params.set('quality', String(options.quality))
  if (options.resize)  params.set('resize',  options.resize)

  return `${SUPABASE_URL}/storage/v1/render/image/public/${BUCKET}/${storagePath}?${params}`
}

/**
 * Returns the storage path for a given domain and filename.
 * Use this when constructing paths before upload.
 *
 * @example
 * buildStoragePath('gallery/events', 2025, 'speech-day-001.jpg')
 * // → "gallery/events/2025/speech-day-001.jpg"
 */
export function buildStoragePath(folder: string, year: number, filename: string): string {
  return `${folder}/${year}/${filename}`
}
