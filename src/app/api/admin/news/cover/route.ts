// POST /api/admin/news/cover — upload a cover image for a news post
// Returns { asset_id, storage_path } on success

import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'news', 'create')
  if (err) return err

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const alt = (formData.get('alt') as string) ?? 'News cover image'

  if (!file) return json!({ error: 'No file provided' }, 400)
  if (!ALLOWED.includes(file.type)) return json!({ error: `Unsupported file type: ${file.type}` }, 400)
  if (file.size > 10 * 1024 * 1024) return json!({ error: 'File too large. Maximum 10 MB.' }, 400)

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-')
  const storagePath = `news/covers/${Date.now()}-${safeName}`

  const { error: uploadError } = await db!.storage
    .from('media')
    .upload(storagePath, await file.arrayBuffer(), { contentType: file.type, upsert: false })

  if (uploadError) return json!({ error: `Upload failed: ${uploadError.message}` }, 500)

  const { data: asset, error: assetError } = await db!
    .from('media_assets')
    .insert({ storage_path: storagePath, alt, mime_type: file.type, file_size: file.size })
    .select('id, storage_path')
    .single()

  if (assetError || !asset) {
    await db!.storage.from('media').remove([storagePath])
    return json!({ error: `Failed to save asset: ${assetError?.message}` }, 500)
  }

  return json!(asset, 201)
}
