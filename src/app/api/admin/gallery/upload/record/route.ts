import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  if (!body) return json!({ error: 'Invalid request body' }, 400)

  const {
    path,
    alt,
    title,
    width,
    height,
    fileSize,
    mimeType,
    categorySlug,
    categoryDomain,
    eventId,
  } = body as {
    path: string
    alt: string
    title?: string
    width: number
    height: number
    fileSize: number
    mimeType: string
    categorySlug?: string | null
    categoryDomain?: string | null
    eventId?: string | null
  }

  if (!path) return json!({ error: 'path is required' }, 400)

  // Verify the file actually exists in storage before recording it
  const { data: fileList } = await db!.storage.from('media').list(
    path.substring(0, path.lastIndexOf('/')),
    { search: path.substring(path.lastIndexOf('/') + 1) },
  )
  if (!fileList?.length) {
    return json!({ error: 'File not found in storage — upload may have failed' }, 400)
  }

  let categoryId: string | null = null
  if (categorySlug && categoryDomain) {
    await db!.from('media_categories').upsert(
      { slug: categorySlug, domain: categoryDomain, label: categorySlug },
      { onConflict: 'slug,domain', ignoreDuplicates: true },
    )
    const { data: cat } = await db!
      .from('media_categories')
      .select('id')
      .eq('slug', categorySlug)
      .eq('domain', categoryDomain)
      .single()
    categoryId = cat?.id ?? null
  }

  const { data: asset, error: assetError } = await db!
    .from('media_assets')
    .insert({
      storage_path: path,
      alt: alt || 'Gallery image',
      title: title ?? null,
      mime_type: mimeType,
      file_size: fileSize,
      width: width || null,
      height: height || null,
      metadata: {},
    })
    .select()
    .single()

  if (assetError || !asset) {
    await db!.storage.from('media').remove([path])
    return json!({ error: `Failed to save asset: ${assetError?.message}` }, 500)
  }

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

  if (eventId) {
    await db!.from('gallery_event_photos').insert({
      event_id: eventId,
      photo_id: photo.id,
      sort_order: 0,
    })

    const { count } = await db!
      .from('gallery_event_photos')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)

    await db!.from('gallery_events').update({ photo_count: count ?? 0 }).eq('id', eventId)
  }

  return json!({ asset, photo }, 201)
}
