import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_MB = 30

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  if (!body) return json!({ error: 'Invalid request body' }, 400)

  const { folder, filename, contentType } = body as {
    folder: string
    filename: string
    contentType: string
  }

  if (!folder || !filename || !contentType) {
    return json!({ error: 'folder, filename, and contentType are required' }, 400)
  }

  if (!ALLOWED_TYPES.includes(contentType)) {
    return json!({ error: `Unsupported file type: ${contentType}` }, 400)
  }

  const fileSizeMb = Number(body.fileSizeMb ?? 0)
  if (fileSizeMb > MAX_MB) {
    return json!({ error: `File too large. Maximum is ${MAX_MB} MB.` }, 400)
  }

  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
  const ext = contentType === 'image/gif' ? '.gif' : '.jpg'
  const uniqueName = `${Date.now()}-${safeName.replace(/\.[^.]+$/, '')}${ext}`
  const storagePath = `${folder}/${uniqueName}`

  const { data, error } = await db!.storage
    .from('media')
    .createSignedUploadUrl(storagePath, { upsert: false })

  if (error || !data) {
    return json!({ error: `Could not create signed URL: ${error?.message}` }, 500)
  }

  return json!({ signedUrl: data.signedUrl, path: storagePath }, 200)
}
