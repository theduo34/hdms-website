'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Video, Link2, Upload, X, Loader2, Check, Play, Clock } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { VIDEO_CATEGORIES, toEmbedUrl } from './gallery-video-data'

type InputMode = 'url' | 'file'
type SubmitStatus = 'idle' | 'submitting' | 'done' | 'error'

export function UploadVideoClient() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbInputRef = useRef<HTMLInputElement>(null)

  const [mode, setMode] = useState<InputMode>('url')

  // URL mode
  const [rawUrl, setRawUrl] = useState('')

  // File mode
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Common fields
  const [title, setTitle] = useState('')
  const [alt, setAlt] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [year, setYear] = useState(new Date().getFullYear())

  // Thumbnail
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbPreview, setThumbPreview] = useState<string | null>(null)

  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const embedUrl = rawUrl.trim() ? toEmbedUrl(rawUrl.trim()) : null
  const isConverted = embedUrl && embedUrl !== rawUrl.trim()
  const selectedCategory = VIDEO_CATEGORIES.find((c) => c.slug === selectedSlug) ?? null

  const handleVideoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('video/')) setVideoFile(file)
  }, [])

  function handleVideoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setVideoFile(file)
  }

  function handleThumbChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (thumbPreview) URL.revokeObjectURL(thumbPreview)
    setThumbnail(file)
    setThumbPreview(URL.createObjectURL(file))
  }

  function removeThumbnail() {
    if (thumbPreview) URL.revokeObjectURL(thumbPreview)
    setThumbnail(null)
    setThumbPreview(null)
    if (thumbInputRef.current) thumbInputRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (mode === 'url' && !embedUrl) {
      setErrorMsg('Enter a valid YouTube or Vimeo URL')
      return
    }
    if (mode === 'file' && !videoFile) {
      setErrorMsg('Select a video file to upload')
      return
    }
    if (!title.trim()) {
      setErrorMsg('Title is required')
      return
    }

    setStatus('submitting')
    setErrorMsg('')
    setUploadProgress(0)

    const formData = new FormData()
    if (mode === 'url') {
      formData.append('video_url', embedUrl!)
    } else {
      formData.append('video_file', videoFile!)
      setUploadProgress(20)
    }

    formData.append('title', title.trim())
    formData.append('alt', alt.trim() || title.trim())
    if (duration.trim()) formData.append('duration', duration.trim())
    if (selectedSlug) {
      formData.append('category_slug', selectedSlug)
      formData.append('year', String(year))
    }
    if (thumbnail) formData.append('thumbnail', thumbnail)

    try {
      const res = await fetch('/api/admin/gallery/videos', { method: 'POST', body: formData })
      const resJson = await res.json()
      if (res.ok) {
        setStatus('done')
        toast.success('Video added to gallery!')
      } else {
        setStatus('error')
        setErrorMsg(resJson.error ?? 'Failed to save video')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error, please try again')
    }
  }

  function reset() {
    setRawUrl('')
    setVideoFile(null)
    setUploadProgress(0)
    setTitle('')
    setAlt('')
    setDuration('')
    setSelectedSlug(null)
    removeThumbnail()
    setStatus('idle')
    setErrorMsg('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Video added successfully</p>
          <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('/admin/gallery')}>
            View Gallery
          </Button>
          <Button size="sm" onClick={reset}>
            Add Another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mode toggle */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Video Source</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setMode('url'); setVideoFile(null) }}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
              mode === 'url'
                ? 'border-primary bg-primary/8 text-primary ring-1 ring-primary/20'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30',
            )}
          >
            <Link2 className="w-4 h-4" />
            YouTube / Vimeo URL
          </button>
          <button
            type="button"
            onClick={() => { setMode('file'); setRawUrl('') }}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
              mode === 'file'
                ? 'border-primary bg-primary/8 text-primary ring-1 ring-primary/20'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30',
            )}
          >
            <Upload className="w-4 h-4" />
            Upload from Device
          </button>
        </div>
      </div>

      {/* URL input */}
      {mode === 'url' && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Video URL *
          </Label>
          <Input
            type="url"
            value={rawUrl}
            onChange={(e) => setRawUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... or Vimeo URL"
            className="text-sm"
          />
          {rawUrl.trim() && (
            <p className={cn('text-[11px]', isConverted ? 'text-primary' : 'text-muted-foreground')}>
              {isConverted
                ? <>Embed URL: <code className="bg-muted px-1 rounded">{embedUrl}</code></>
                : 'Paste a YouTube or Vimeo watch URL to auto-convert'}
            </p>
          )}
          {embedUrl && isConverted && (
            <div className="rounded-xl overflow-hidden border aspect-video bg-muted relative">
              <iframe
                src={embedUrl}
                title="Video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}
        </div>
      )}

      {/* File drop zone */}
      {mode === 'file' && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Video File *
          </Label>
          {videoFile ? (
            <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/[0.02] p-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{videoFile.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              {status === 'submitting' && uploadProgress > 0 && (
                <Progress value={uploadProgress} className="w-24 h-1.5" />
              )}
              {status !== 'submitting' && (
                <button
                  type="button"
                  onClick={() => { setVideoFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  className="text-muted-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Remove video"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all border-border hover:border-primary/30 hover:bg-primary/[0.02] bg-card"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleVideoDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              aria-label="Video upload drop zone"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
                <Video className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-sm font-medium text-foreground">Drop video here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">MP4, WebM, MOV up to 200 MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoFile}
          />
        </div>
      )}

      {/* Title + Alt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Title *
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Founders Day Celebration 2025"
            className="text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Description
          </Label>
          <Input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Defaults to title if left blank"
            className="text-sm"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-1.5 max-w-[180px]">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Duration
        </Label>
        <div className="relative">
          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="4:32"
            className="text-sm pl-7"
          />
        </div>
        <p className="text-[10px] text-muted-foreground">Optional, shown as a badge on the video card</p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {VIDEO_CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const active = selectedSlug === cat.slug
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedSlug(active ? null : cat.slug)}
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

      {/* Year picker */}
      {selectedCategory?.hasYear && (
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

      {/* Thumbnail */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Thumbnail <span className="font-normal normal-case text-muted-foreground">(optional)</span>
        </p>
        {thumbPreview ? (
          <div className="relative w-40 aspect-video rounded-xl overflow-hidden border bg-muted group">
            <Image src={thumbPreview} alt="Thumbnail preview" fill className="object-cover" sizes="160px" />
            <button
              type="button"
              onClick={removeThumbnail}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove thumbnail"
            >
              <X className="w-3.5 h-3.5 text-foreground" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => thumbInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload thumbnail image
          </button>
        )}
        <input
          ref={thumbInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbChange}
        />
        <p className="text-[10px] text-muted-foreground">
          If not provided, the video player default preview will be used.
        </p>
      </div>

      {/* Error */}
      {errorMsg && <p className="text-sm text-destructive">{errorMsg}</p>}

      {/* Submit */}
      <div className="flex gap-2">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting'
            ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving...</>
            : <><Video className="w-3.5 h-3.5 mr-2" /> Add Video</>}
        </Button>
        {(rawUrl || videoFile || title) && status !== 'submitting' && (
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            Clear
          </Button>
        )}
      </div>
    </form>
  )
}
