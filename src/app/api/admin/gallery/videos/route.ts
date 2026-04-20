import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { getMediaUrl } from '@/lib/media'

const ALLOWED_VIDEO = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
const ALLOWED_IMAGE = ['image/jpeg', 'image/png', 'image/webp']
const MAX_VIDEO_MB = 50
const MAX_THUMB_MB = 10

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'create')
  if (err) return err

  const formData = await req.formData()
  const videoFile = formData.get('video_file') as File | null
  const rawVideoUrl = (formData.get('video_url') as string | null)?.trim() ?? null
  const title = (formData.get('title') as string | null)?.trim()
  const alt = (formData.get('alt') as string | null)?.trim() ?? title ?? 'Gallery video'
  const duration = (formData.get('duration') as string | null)?.trim() ?? null
  const categorySlug = formData.get('category_slug') as string | null
  const yearStr = formData.get('year') as string | null
  const thumbnail = formData.get('thumbnail') as File | null

  if (!title) return json!({ error: 'title is required' }, 400)
  if (!videoFile && !rawVideoUrl) return json!({ error: 'Provide either a video file or a video URL' }, 400)

  let categoryId: string | null = null
  if (categorySlug) {
    const { data: cat } = await db!
      .from('media_categories')
      .select('id')
      .eq('slug', categorySlug)
      .eq('domain', 'gallery_videos')
      .single()
    categoryId = cat?.id ?? null
  }

  const baseFolder = categorySlug ? `videos/${categorySlug}` : 'videos/uploads'
  const uploadFolder = yearStr && categorySlug !== 'tour' ? `${baseFolder}/${yearStr}` : baseFolder

  let resolvedVideoUrl: string = rawVideoUrl ?? ''

  if (videoFile && videoFile.size > 0) {
    if (!ALLOWED_VIDEO.includes(videoFile.type)) {
      return json!({ error: `Unsupported video type: ${videoFile.type}` }, 400)
    }
    if (videoFile.size > MAX_VIDEO_MB * 1024 * 1024) {
      return json!({ error: `Video too large. Maximum ${MAX_VIDEO_MB} MB.` }, 400)
    }

    const safeName = videoFile.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-')
    const timestamp = Date.now()
    const storagePath = `${uploadFolder}/${timestamp}-${safeName}`

    const arrayBuffer = await videoFile.arrayBuffer()
    const { error: uploadError } = await db!.storage
      .from('media')
      .upload(storagePath, arrayBuffer, { contentType: videoFile.type, upsert: false })

    if (uploadError) {
      return json!({ error: `Video upload failed: ${uploadError.message}` }, 500)
    }

    resolvedVideoUrl = getMediaUrl(storagePath)
  }

  if (!resolvedVideoUrl) return json!({ error: 'No video source resolved' }, 400)

  let thumbnailAssetId: string | null = null

  if (thumbnail && thumbnail.size > 0) {
    if (!ALLOWED_IMAGE.includes(thumbnail.type)) {
      return json!({ error: `Unsupported thumbnail type: ${thumbnail.type}` }, 400)
    }
    if (thumbnail.size > MAX_THUMB_MB * 1024 * 1024) {
      return json!({ error: `Thumbnail too large. Maximum ${MAX_THUMB_MB} MB.` }, 400)
    }

    const safeName = thumbnail.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-')
    const timestamp = Date.now()
    const storagePath = `${uploadFolder}/thumb-${timestamp}-${safeName}`

    const arrayBuffer = await thumbnail.arrayBuffer()
    const { error: uploadError } = await db!.storage
      .from('media')
      .upload(storagePath, arrayBuffer, { contentType: thumbnail.type, upsert: false })

    if (uploadError) {
      return json!({ error: `Thumbnail upload failed: ${uploadError.message}` }, 500)
    }

    const { data: asset, error: assetError } = await db!
      .from('media_assets')
      .insert({
        storage_path: storagePath,
        alt: `Thumbnail for ${title}`,
        title: `${title} thumbnail`,
        mime_type: thumbnail.type,
        file_size: thumbnail.size,
      })
      .select()
      .single()

    if (assetError || !asset) {
      await db!.storage.from('media').remove([storagePath])
      return json!({ error: `Failed to save thumbnail: ${assetError?.message}` }, 500)
    }

    thumbnailAssetId = asset.id
  }

  const { data: video, error: videoError } = await db!
    .from('gallery_videos')
    .insert({
      title,
      alt,
      video_url: resolvedVideoUrl,
      duration: duration ?? null,
      thumbnail_asset_id: thumbnailAssetId,
      category_id: categoryId,
      width: 1920,
      height: 1080,
    })
    .select()
    .single()

  if (videoError || !video) {
    return json!({ error: `Failed to save video: ${videoError?.message}` }, 500)
  }

  return json!({ video }, 201)
}

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'read')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = 24
  const offset = (page - 1) * limit

  const { data, error, count } = await db!
    .from('gallery_videos')
    .select(
      `id, title, alt, video_url, duration, created_at,
       category:media_categories(id, slug, label),
       thumbnail:media_assets!thumbnail_asset_id(id, storage_path, alt)`,
      { count: 'exact' },
    )
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return json!({ error: error.message }, 500)

  return json!({ data, total: count ?? 0, page, limit })
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'delete')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return json!({ error: 'id is required' }, 400)

  const { data: video } = await db!
    .from('gallery_videos')
    .select('id, thumbnail_asset_id, thumbnail:media_assets!thumbnail_asset_id(storage_path)')
    .eq('id', id)
    .single()

  if (!video) return json!({ error: 'Video not found' }, 404)

  const { error: deleteError } = await db!
    .from('gallery_videos')
    .delete()
    .eq('id', id)

  if (deleteError) return json!({ error: deleteError.message }, 500)

  if (video.thumbnail_asset_id) {
    const thumb = video.thumbnail as unknown as { storage_path: string } | null
    if (thumb?.storage_path) {
      await db!.storage.from('media').remove([thumb.storage_path])
    }
    await db!.from('media_assets').delete().eq('id', video.thumbnail_asset_id)
  }

  return json!({ success: true })
}
