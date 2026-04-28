import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'testimonials', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') return json!({ error: 'Invalid request body' }, 400)

  const { path, alt, width, height, fileSize, mimeType } = body as Record<string, unknown>

  if (typeof path !== 'string' || !path.startsWith('testimonials/'))
    return json!({ error: 'Invalid storage path' }, 400)
  if (typeof mimeType !== 'string' || !ALLOWED_MIME.has(mimeType))
    return json!({ error: 'Unsupported file type' }, 400)

  const { data: fileList } = await db!.storage.from('media').list(
    path.substring(0, path.lastIndexOf('/')),
    { search: path.substring(path.lastIndexOf('/') + 1) },
  )
  if (!fileList?.length) return json!({ error: 'File not found in storage' }, 400)

  const altText = (typeof alt === 'string' && alt.trim()) ? alt.trim() : 'Testimonial photo'

  const { data: asset, error } = await db!
    .from('media_assets')
    .insert({
      storage_path: path,
      alt: altText,
      mime_type: mimeType,
      file_size: typeof fileSize === 'number' ? fileSize : null,
      width:     typeof width === 'number' ? width : null,
      height:    typeof height === 'number' ? height : null,
      metadata:  {},
    })
    .select('id')
    .single()

  if (error || !asset) return json!({ error: 'Failed to save asset' }, 500)
  return json!({ assetId: asset.id }, 201)
}
