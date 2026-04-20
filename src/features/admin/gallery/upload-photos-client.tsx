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
import { signAndUpload } from './upload-helpers'

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
      try {
        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, status: 'uploading', progress: 5 } : f)))

        await signAndUpload({
          file: item.file,
          folder,
          alt: item.alt,
          title: item.alt,
          categorySlug: selectedCategory.slug ?? null,
          categoryDomain: selectedCategory.slug ? 'gallery_photos' : null,
          eventId: eventId ?? null,
          onProgress: (p) => setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, progress: p } : f))),
        })

        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, status: 'done', progress: 100 } : f)))
        successCount++
      } catch (err) {
        setQueue((q) => q.map((f) => (f.id === item.id ? { ...f, status: 'error', error: (err as Error).message } : f)))
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
