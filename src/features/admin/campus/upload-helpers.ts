'use client'

import { compressImage, getImageDimensions, uploadToSignedUrl } from '@/features/admin/gallery/upload-helpers'

interface CampusUploadOptions {
    file: File
    folder: string
    alt: string
    recordEndpoint: string
    recordPayload: Record<string, unknown>
    onProgress?: (p: number) => void
}

export async function signAndUploadCampus({
    file,
    folder,
    alt,
    recordEndpoint,
    recordPayload,
    onProgress,
}: CampusUploadOptions): Promise<void> {
    const isGif = file.type === 'image/gif'
    const mimeType = isGif ? 'image/gif' : 'image/jpeg'

    let uploadBlob: Blob
    let width: number
    let height: number

    if (isGif) {
        const dims = await getImageDimensions(file)
        uploadBlob = file
        width = dims.width
        height = dims.height
    } else {
        const { blob, width: w, height: h } = await compressImage(file)
        uploadBlob = blob
        width = w
        height = h
    }

    onProgress?.(15)

    const signRes = await fetch('/api/admin/campus/upload/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            folder,
            filename: file.name,
            contentType: mimeType,
            fileSizeMb: uploadBlob.size / 1024 / 1024,
        }),
    })
    if (!signRes.ok) throw new Error(((await signRes.json()) as { error?: string }).error ?? 'Could not get upload URL')

    const { signedUrl, path } = (await signRes.json()) as { signedUrl: string; path: string }

    onProgress?.(20)

    await uploadToSignedUrl(signedUrl, uploadBlob, mimeType, (p) => onProgress?.(20 + Math.round(p * 0.7)))

    onProgress?.(90)

    const recordRes = await fetch(recordEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, alt, width, height, fileSize: uploadBlob.size, mimeType, ...recordPayload }),
    })
    if (!recordRes.ok) throw new Error(((await recordRes.json()) as { error?: string }).error ?? 'Failed to save record')

    onProgress?.(100)
}
