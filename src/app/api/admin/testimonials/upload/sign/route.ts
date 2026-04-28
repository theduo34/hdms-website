import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_MB = 30

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'testimonials', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') return json!({ error: 'Invalid request body' }, 400)

  const { filename, contentType, fileSizeMb } = body as Record<string, unknown>

  if (typeof filename !== 'string' || filename.length === 0 || filename.length > 255)
    return json!({ error: 'Invalid filename' }, 400)
  if (typeof contentType !== 'string' || !ALLOWED_MIME.has(contentType))
    return json!({ error: 'Unsupported file type' }, 400)
  if (typeof fileSizeMb === 'number' && fileSizeMb > MAX_MB)
    return json!({ error: `File exceeds ${MAX_MB} MB limit` }, 400)

  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
  const ext         = contentType === 'image/gif' ? '.gif' : '.jpg'
  const storagePath = `testimonials/${Date.now()}-${safeName.replace(/\.[^.]+$/, '')}${ext}`

  const { data, error } = await db!.storage
    .from('media')
    .createSignedUploadUrl(storagePath, { upsert: false })

  if (error || !data) return json!({ error: 'Could not generate upload URL' }, 500)
  return json!({ signedUrl: data.signedUrl, path: storagePath }, 200)
}
