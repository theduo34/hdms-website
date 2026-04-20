// POST /api/admin/gallery/upload — upload image to Supabase Storage
// Body: FormData with: file, folder, category_id, alt, title, metadata (JSON string)

import { NextRequest } from 'next/server'
import sharp from 'sharp'
import { apiGuard } from '@/lib/admin/api-guard'

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'create')
  if (err) return err

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) ?? 'gallery/uploads'
  const alt = (formData.get('alt') as string) ?? 'Gallery image'
  const title = formData.get('title') as string | null
  const categorySlug = formData.get('category_slug') as string | null
  const categoryDomain = formData.get('category_domain') as string | null
  const metadataStr = formData.get('metadata') as string | null
  const eventId = formData.get('event_id') as string | null

  // Resolve category_id — upsert so the row always exists even if migration hasn't run
  let categoryId: string | null = null
  if (categorySlug && categoryDomain) {
    await db!
      .from('media_categories')
      .upsert({ slug: categorySlug, domain: categoryDomain, label: categorySlug }, {
        onConflict: 'slug,domain',
        ignoreDuplicates: true,
      })
    const { data: cat } = await db!
      .from('media_categories')
      .select('id')
      .eq('slug', categorySlug)
      .eq('domain', categoryDomain)
      .single()
    categoryId = cat?.id ?? null
  }

  if (!file) return json!({ error: 'No file provided' }, 400)

  // Validate file type
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(file.type)) {
    return json!({ error: `Unsupported file type: ${file.type}` }, 400)
  }

  // Validate file size (max 30 MB via API route — storage bucket enforces 50 MB)
  if (file.size > 30 * 1024 * 1024) {
    return json!({ error: 'File too large. Maximum size is 30 MB.' }, 400)
  }

  // The `folder` param already includes the year when relevant (client builds it).
  // Do not call buildStoragePath here — it would add the year a second time.
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
  const timestamp = Date.now()
  const storagePath = `${folder}/${timestamp}-${safeName}`

  const inputBuffer = Buffer.from(await file.arrayBuffer())

  // Compress and resize all non-GIF images before upload.
  // Camera JPEGs can be 20MB+; this keeps them web-friendly without losing quality.
  let uploadBuffer: Buffer = inputBuffer
  let uploadMime = file.type
  let uploadPath = storagePath
  let imageWidth = 0
  let imageHeight = 0

  if (file.type !== 'image/gif') {
    const MAX_SIDE = 2048
    const image = sharp(inputBuffer)
    const meta = await image.metadata()
    const needsResize = (meta.width ?? 0) > MAX_SIDE || (meta.height ?? 0) > MAX_SIDE

    const pipeline = needsResize
      ? image.resize(MAX_SIDE, MAX_SIDE, { fit: 'inside', withoutEnlargement: true })
      : image

    const { data, info } = await pipeline
      .jpeg({ quality: 85, progressive: true })
      .toBuffer({ resolveWithObject: true })

    uploadBuffer = data
    uploadMime = 'image/jpeg'
    imageWidth = info.width
    imageHeight = info.height
    // Normalise file extension to .jpg after converting PNG/WebP → JPEG
    uploadPath = storagePath.replace(/\.[^.]+$/, '.jpg')
  } else {
    const meta = await sharp(inputBuffer, { animated: false }).metadata()
    imageWidth = meta.width ?? 800
    imageHeight = meta.height ?? 600
  }

  // Upload to Supabase Storage using service role
  const { error: uploadError } = await db!.storage
    .from('media')
    .upload(uploadPath, uploadBuffer, {
      contentType: uploadMime,
      upsert: false,
    })

  if (uploadError) {
    return json!({ error: `Upload failed: ${uploadError.message}` }, 500)
  }

  let metadata = {}
  try {
    if (metadataStr) metadata = JSON.parse(metadataStr)
  } catch {
    // ignore bad JSON
  }

  // Create media_asset record
  const { data: asset, error: assetError } = await db!
    .from('media_assets')
    .insert({
      storage_path: uploadPath,
      alt,
      title: title ?? null,
      mime_type: uploadMime,
      file_size: uploadBuffer.length,
      width: imageWidth || null,
      height: imageHeight || null,
      metadata,
    })
    .select()
    .single()

  if (assetError || !asset) {
    // Clean up uploaded file
    await db!.storage.from('media').remove([uploadPath])
    return json!({ error: `Failed to save asset: ${assetError?.message}` }, 500)
  }

  // Create gallery_photo record
  const { data: photo, error: photoError } = await db!
    .from('gallery_photos')
    .insert({
      asset_id: asset.id,
      category_id: categoryId,
      featured: false,
      sort_order: 0,
    })
    .select()
    .single()

  if (photoError || !photo) {
    return json!({ error: `Failed to create gallery entry: ${photoError?.message}` }, 500)
  }

  // If uploading to an event, link it
  if (eventId) {
    await db!.from('gallery_event_photos').insert({
      event_id: eventId,
      photo_id: photo.id,
      sort_order: 0,
    })

    // Update event photo_count
    const { count } = await db!
      .from('gallery_event_photos')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)

    await db!.from('gallery_events').update({ photo_count: count ?? 0 }).eq('id', eventId)
  }

  return json!({ asset, photo }, 201)
}
