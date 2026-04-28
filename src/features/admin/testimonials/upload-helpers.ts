'use client'

import {
  compressImage,
  getImageDimensions,
  uploadToSignedUrl,
} from '@/features/admin/gallery/upload-helpers'

export async function signAndUploadTestimonial(
  file: File,
  onProgress?: (p: number) => void,
): Promise<{ path: string; assetId: string; width: number; height: number; mimeType: string; fileSize: number }> {
  const isGif    = file.type === 'image/gif'
  const mimeType = isGif ? 'image/gif' : 'image/jpeg'

  let uploadBlob: Blob
  let width: number
  let height: number

  if (isGif) {
    const dims = await getImageDimensions(file)
    uploadBlob = file
    width  = dims.width
    height = dims.height
  } else {
    const compressed = await compressImage(file)
    uploadBlob = compressed.blob
    width  = compressed.width
    height = compressed.height
  }

  onProgress?.(15)

  const signRes = await fetch('/api/admin/testimonials/upload/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename:    file.name,
      contentType: mimeType,
      fileSizeMb:  uploadBlob.size / 1024 / 1024,
    }),
  })
  if (!signRes.ok) {
    const { error } = await signRes.json() as { error?: string }
    throw new Error(error ?? 'Could not get upload URL')
  }
  const { signedUrl, path } = await signRes.json() as { signedUrl: string; path: string }

  onProgress?.(20)
  await uploadToSignedUrl(signedUrl, uploadBlob, mimeType, (p) => onProgress?.(20 + Math.round(p * 0.65)))
  onProgress?.(85)

  const recordRes = await fetch('/api/admin/testimonials/upload/record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, alt: '', width, height, fileSize: uploadBlob.size, mimeType }),
  })
  if (!recordRes.ok) {
    const { error } = await recordRes.json() as { error?: string }
    throw new Error(error ?? 'Failed to save asset')
  }
  const { assetId } = await recordRes.json() as { assetId: string }

  onProgress?.(100)
  return { path, assetId, width, height, mimeType, fileSize: uploadBlob.size }
}
