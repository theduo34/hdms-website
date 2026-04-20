'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Upload, X, Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { PHOTO_CATEGORIES } from './gallery-data'

type CategorySlug = 'events' | 'student-activities' | 'campus' | 'staff' | null

interface QueuedFile {
  id: string
  file: File
  preview: string
  alt: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  progress: number
  error?: string
}

interface UploadPhotosClientProps {
  eventId?: string
  eventTitle?: string
}

// Resize + convert to JPEG using canvas (runs in browser, no server needed)
function compressImage(file: File, maxSide = 2048, quality = 0.85): Promise<{ blob: Blob; width: number; height: number }> {
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

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => { resolve({ width: img.naturalWidth, height: img.naturalHeight }); URL.revokeObjectURL(url) }
    img.onerror = () => { resolve({ width: 0, height: 0 }); URL.revokeObjectURL(url) }
    img.src = url
  })
}

// XHR upload so we get real progress events
function uploadToSignedUrl(signedUrl: string, blob: Blob, mimeType: string, onProgress: (p: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    })
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

export function UploadPhotosClient({ eventId, eventTitle }: UploadPhotosClientProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedSlug, setSelectedSlug] = useState<CategorySlug>(null)
  const [year, setYear] = useState(new Date().getFullYear())
  const [queue, setQueue] = useState<QueuedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const selectedCategory = PHOTO_CATEGORIES.find((c) => c.slug === selectedSlug) ?? PHOTO_CATEGORIES[4]

  const addFiles = useCallback((files: FileList | File[]) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith('image/'))
    const newItems: QueuedFile[] = valid.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      status: 'pending',
      progress: 0,
    }))
    setQueue((q) => [...q, ...newItems])
  }, [])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  function removeFile(id: string) {
    setQueue((q) => {
      const item = q.find((f) => f.id === id)
      if (item) URL.revokeObjectURL(item.preview)
      return q.filter((f) => f.id !== id)
    })
  }

  function updateAlt(id: string, alt: string) {
    setQueue((q) => q.map((f) => (f.id === id ? { ...f, alt } : f)))
  }

  async function uploadAll() {
    const pending = queue.filter((f) => f.status === 'pending')
    if (pending.length === 0) return
    setIsUploading(true)

    const folder = selectedCategory.hasYear
      ? `${selectedCategory.folder}/${year}`
      : selectedCategory.folder

    let successCount = 0

    for (const item of pending) {
      const setProgress = (progress: number) =>
        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, progress } : f)))
      const setError = (error: string) =>
        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, status: 'error', error } : f)))

      try {
        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, status: 'uploading', progress: 5 } : f)))

        // Step 1 — compress/resize in browser
        const isGif = item.file.type === 'image/gif'
        let uploadBlob: Blob
        let width: number
        let height: number
        const mimeType = isGif ? 'image/gif' : 'image/jpeg'

        if (isGif) {
          const dims = await getImageDimensions(item.file)
          uploadBlob = item.file
          width = dims.width
          height = dims.height
        } else {
          const compressed = await compressImage(item.file)
          uploadBlob = compressed.blob
          width = compressed.width
          height = compressed.height
        }

        setProgress(15)

        // Step 2 — get a short-lived signed upload URL from our API (auth checked here)
        const signRes = await fetch('/api/admin/gallery/upload/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            folder,
            filename: item.file.name,
            contentType: mimeType,
            fileSizeMb: uploadBlob.size / 1024 / 1024,
          }),
        })
        if (!signRes.ok) {
          const j = await signRes.json()
          throw new Error(j.error ?? 'Could not get upload URL')
        }
        const { signedUrl, path } = await signRes.json()

        setProgress(20)

        // Step 3 — upload directly to Supabase (bypasses Vercel size limits)
        await uploadToSignedUrl(signedUrl, uploadBlob, mimeType, (p) => {
          setProgress(20 + Math.round(p * 0.7))
        })

        setProgress(90)

        // Step 4 — record the asset + gallery entry in DB
        const recordRes = await fetch('/api/admin/gallery/upload/record', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path,
            alt: item.alt,
            title: item.alt,
            width,
            height,
            fileSize: uploadBlob.size,
            mimeType,
            categorySlug: selectedCategory.slug ?? null,
            categoryDomain: selectedCategory.slug ? 'gallery_photos' : null,
            eventId: eventId ?? null,
          }),
        })
        if (!recordRes.ok) {
          const j = await recordRes.json()
          throw new Error(j.error ?? 'Failed to save photo')
        }

        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, status: 'done', progress: 100 } : f)))
        successCount++
      } catch (err) {
        setError((err as Error).message)
      }
    }

    setIsUploading(false)
    if (successCount > 0) {
      toast.success(`${successCount} photo${successCount !== 1 ? 's' : ''} uploaded!`)
    }
  }

  const pendingCount = queue.filter((f) => f.status === 'pending').length
  const doneCount = queue.filter((f) => f.status === 'done').length
  const errorCount = queue.filter((f) => f.status === 'error').length

  const viewAllHref = eventId ? `/admin/gallery/events/${eventId}` : '/admin/gallery'

  return (
    <div className="space-y-6">
      {eventId && eventTitle && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.03] px-4 py-3">
          <div className="w-1.5 h-5 rounded-full bg-primary flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground">Uploading to event album</p>
            <p className="text-xs text-muted-foreground truncate">{eventTitle}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PHOTO_CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const active = selectedSlug === cat.slug
            return (
              <button
                key={cat.slug ?? 'general'}
                onClick={() => setSelectedSlug(cat.slug as CategorySlug)}
                className={cn(
                  'rounded-xl border p-3 text-left transition-all',
                  active
                    ? 'border-primary bg-primary/8 ring-1 ring-primary/20'
                    : 'border-border bg-card hover:border-primary/30 hover:bg-primary/[0.02]',
                )}
              >
                <Icon className={cn('w-4 h-4 mb-2', active ? 'text-primary' : 'text-muted-foreground')} />
                <p className={cn('text-xs font-semibold', active ? 'text-primary' : 'text-foreground')}>
                  {cat.label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{cat.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {selectedCategory.hasYear && (
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Year</p>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="w-24 h-8 text-sm"
            min={2020}
            max={2035}
          />
        </div>
      )}

      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all',
          isDragging
            ? 'border-secondary bg-secondary/5 scale-[1.01]'
            : 'border-border hover:border-primary/30 hover:bg-primary/[0.02] bg-card',
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        aria-label="Image upload drop zone"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
          <Upload className={cn('w-5 h-5 transition-colors', isDragging ? 'text-secondary' : 'text-primary/40')} />
        </div>
        <p className="text-sm font-medium text-foreground">
          {isDragging ? 'Release to add images' : 'Drop images here or click to browse'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP — up to 30 MB each</p>
      </div>

      {queue.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{queue.length}</span> image{queue.length !== 1 ? 's' : ''}
              {doneCount > 0 && <span className="text-primary ml-1.5">· {doneCount} done</span>}
              {errorCount > 0 && <span className="text-destructive ml-1.5">· {errorCount} failed</span>}
            </p>
            <div className="flex gap-2">
              {doneCount > 0 && (
                <Button variant="outline" size="sm" onClick={() => router.push(viewAllHref)}>
                  {eventId ? 'View Album' : 'View Gallery'}
                </Button>
              )}
              {pendingCount > 0 && (
                <Button size="sm" onClick={uploadAll} disabled={isUploading}>
                  {isUploading
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Uploading…</>
                    : <><Upload className="w-3.5 h-3.5 mr-2" /> Upload {pendingCount}</>}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {queue.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex gap-4 rounded-xl border p-3 transition-colors',
                  item.status === 'done' && 'border-primary/20 bg-primary/[0.02]',
                  item.status === 'error' && 'border-destructive/20 bg-destructive/[0.02]',
                  (item.status === 'pending' || item.status === 'uploading') && 'border-border bg-card',
                )}
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <Image src={item.preview} alt={item.alt} fill className="object-cover" sizes="56px" />
                  {item.status === 'done' && (
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {item.status === 'error' && (
                    <div className="absolute inset-0 bg-destructive/80 flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <Input
                    value={item.alt}
                    onChange={(e) => updateAlt(item.id, e.target.value)}
                    disabled={item.status !== 'pending'}
                    className="h-7 text-xs"
                    placeholder="Describe this image…"
                  />
                  {item.status === 'uploading' && <Progress value={item.progress} className="h-1" />}
                  {item.status === 'done' && (
                    <p className="text-[11px] text-primary">Uploaded successfully</p>
                  )}
                  {item.status === 'error' && (
                    <p className="text-[11px] text-destructive">{item.error}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    {' '}
                    {item.file.type.replace('image/jpeg', 'jpg').replace('image/png', 'png').replace('image/webp', 'webp').replace('image/', '').toUpperCase()}
                  </p>
                </div>

                {item.status === 'pending' && (
                  <button
                    onClick={() => removeFile(item.id)}
                    className="text-muted-foreground/50 hover:text-foreground self-start transition-colors"
                    aria-label="Remove from queue"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
