const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const BUCKET = 'media'

export function getMediaUrl(storagePath: string | null | undefined): string {
  if (!storagePath) return '/images/placeholder.svg'
  if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) return storagePath
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
}

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

export function buildStoragePath(folder: string, year: number, filename: string): string {
  return `${folder}/${year}/${filename}`
}
