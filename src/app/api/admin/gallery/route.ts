// GET  /api/admin/gallery  — list photos + events
// DELETE /api/admin/gallery?id=<photo_id>&type=photo|event — delete

import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'read')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') ?? 'photos' // photos | events | videos
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = 20
  const offset = (page - 1) * limit

  if (type === 'events') {
    const { data, error, count } = await db!
      .from('gallery_events')
      .select('*, cover:media_assets!cover_asset_id(id, storage_path, alt)', { count: 'exact' })
      .order('event_date', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) return json!({ error: error.message }, 500)
    return json!({ data, count, page, limit })
  }

  if (type === 'videos') {
    const { data, error, count } = await db!
      .from('gallery_videos')
      .select('*, thumbnail:media_assets!thumbnail_asset_id(id, storage_path, alt)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) return json!({ error: error.message }, 500)
    return json!({ data, count, page, limit })
  }

  // Photos filtered by event_id
  const eventId = searchParams.get('event_id')

  if (eventId) {
    const { data, error, count } = await db!
      .from('gallery_event_photos')
      .select(
        'sort_order, photo:gallery_photos!photo_id(id, created_at, featured, asset:media_assets!asset_id(id, storage_path, alt, title))',
        { count: 'exact' },
      )
      .eq('event_id', eventId)
      .order('sort_order', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) return json!({ error: error.message }, 500)
    // Unwrap the nested photo object for a consistent shape
    const photos = (data ?? []).map((r) => r.photo).filter(Boolean)
    return json!({ data: photos, count, page, limit })
  }

  // Default: all photos
  const { data, error, count } = await db!
    .from('gallery_photos')
    .select('*, asset:media_assets!asset_id(id, storage_path, alt, title, width, height, metadata)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return json!({ error: error.message }, 500)
  return json!({ data, count, page, limit })
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'delete')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const type = searchParams.get('type') ?? 'photo'

  if (!id) return json!({ error: 'Missing id' }, 400)

  if (type === 'event') {
    const { error } = await db!.from('gallery_events').delete().eq('id', id)
    if (error) return json!({ error: error.message }, 500)
  } else if (type === 'video') {
    const { error } = await db!.from('gallery_videos').delete().eq('id', id)
    if (error) return json!({ error: error.message }, 500)
  } else {
    // Delete gallery_photo row — cascade removes gallery_event_photos
    const { data: photo } = await db!
      .from('gallery_photos')
      .select('asset_id')
      .eq('id', id)
      .single()

    const { error } = await db!.from('gallery_photos').delete().eq('id', id)
    if (error) return json!({ error: error.message }, 500)

    // Also delete the underlying media_asset and file
    if (photo?.asset_id) {
      const { data: asset } = await db!
        .from('media_assets')
        .select('storage_path')
        .eq('id', photo.asset_id)
        .single()

      if (asset?.storage_path) {
        await db!.storage.from('media').remove([asset.storage_path])
      }

      await db!.from('media_assets').delete().eq('id', photo.asset_id)
    }
  }

  return json!({ success: true })
}
