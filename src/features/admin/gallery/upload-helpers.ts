'use client'

// Resize + convert to JPEG using canvas (runs entirely in the browser)
export function compressImage(
  file: File,
  maxSide = 2048,
  quality = 0.85,
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      let w = img.naturalWidth
      let h = img.naturalHeight
      if (w > maxSide || h > maxSide) {
        if (w >= h) { h = Math.round((h * maxSide) / w); w = maxSide }
        else { w = Math.round((w * maxSide) / h); h = maxSide }
      }
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas unavailable')); return }
      ctx.drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          if (!blob) { reject(new Error('Compression failed')); return }
          resolve({ blob, width: w, height: h })
        },
        'image/jpeg',
        quality,
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')) }
    img.src = url
  })
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => { resolve({ width: img.naturalWidth, height: img.naturalHeight }); URL.revokeObjectURL(url) }
    img.onerror = () => { resolve({ width: 0, height: 0 }); URL.revokeObjectURL(url) }
    img.src = url
  })
}

// XHR upload to a signed URL so we get real progress events
export function uploadToSignedUrl(
  signedUrl: string,
  blob: Blob,
  mimeType: string,
  onProgress?: (p: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
      })
    }
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve()
      else reject(new Error(`Storage upload failed (${xhr.status})`))
    })
    xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
    xhr.open('PUT', signedUrl)
    xhr.setRequestHeader('Content-Type', mimeType)
    xhr.send(blob)
  })
}

interface SignAndUploadOptions {
  file: File
  folder: string
  alt: string
  title?: string
  categorySlug?: string | null
  categoryDomain?: string | null
  eventId?: string | null
  skipGalleryEntry?: boolean
  onProgress?: (p: number) => void
}

// Full 3-step flow: compress → sign → upload to storage → record in DB
// Returns the asset ID on success, throws on failure
export async function signAndUpload({
  file,
  folder,
  alt,
  title,
  categorySlug,
  categoryDomain,
  eventId,
  skipGalleryEntry = false,
  onProgress,
}: SignAndUploadOptions): Promise<{ assetId: string; path: string }> {
  // Step 1 — compress in browser
  const isGif = file.type === 'image/gif'
  let uploadBlob: Blob
  let width: number
  let height: number
  const mimeType = isGif ? 'image/gif' : 'image/jpeg'

  if (isGif) {
    const dims = await getImageDimensions(file)
    uploadBlob = file
    width = dims.width
    height = dims.height
  } else {
    const compressed = await compressImage(file)
    uploadBlob = compressed.blob
    width = compressed.width
    height = compressed.height
  }

  onProgress?.(15)

  // Step 2 — get signed upload URL (auth checked server-side)
  const signRes = await fetch('/api/admin/gallery/upload/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      folder,
      filename: file.name,
      contentType: mimeType,
      fileSizeMb: uploadBlob.size / 1024 / 1024,
    }),
  })
  if (!signRes.ok) {
    const j = await signRes.json()
    throw new Error(j.error ?? 'Could not get upload URL')
  }
  const { signedUrl, path } = await signRes.json()

  onProgress?.(20)

  // Step 3 — upload directly to Supabase (bypasses Vercel size limits)
  await uploadToSignedUrl(signedUrl, uploadBlob, mimeType, (p) => {
    onProgress?.(20 + Math.round(p * 0.7))
  })

  onProgress?.(90)

  // Step 4 — record asset + optional gallery entry in DB
  const recordRes = await fetch('/api/admin/gallery/upload/record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      alt,
      title: title ?? alt,
      width,
      height,
      fileSize: uploadBlob.size,
      mimeType,
      categorySlug: categorySlug ?? null,
      categoryDomain: categoryDomain ?? null,
      eventId: eventId ?? null,
      skipGalleryEntry,
    }),
  })
  if (!recordRes.ok) {
    const j = await recordRes.json()
    throw new Error(j.error ?? 'Failed to save photo')
  }

  const { asset } = await recordRes.json()
  onProgress?.(100)
  return { assetId: asset.id, path }
}
