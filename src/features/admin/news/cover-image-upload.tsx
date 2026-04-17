'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ImageIcon, Upload, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getMediaUrl } from '@/lib/media'

interface CoverImageUploadProps {
  value: string | null        // current cover_asset_id
  previewUrl?: string | null  // existing cover storage_path for preview
  onChange: (assetId: string | null) => void
  onPreviewChange: (url: string | null) => void
}

export function CoverImageUpload({ value, previewUrl, onChange, onPreviewChange }: CoverImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('alt', file.name.replace(/\.[^.]+$/, ''))

    try {
      const res = await fetch('/api/admin/news/cover', { method: 'POST', body: form })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error ?? 'Upload failed')
        return
      }
      onChange(json.id)
      onPreviewChange(json.storage_path)
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleClear() {
    onChange(null)
    onPreviewChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const preview = previewUrl ? getMediaUrl(previewUrl) : null

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium leading-none">Cover Image</p>

      {preview ? (
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-muted ring-1 ring-border">
          <Image src={preview} alt="Cover preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition"
            aria-label="Remove cover image"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      ) : (
        <div
          className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/30 bg-muted/30 hover:bg-muted/50 transition-colors aspect-[21/9] cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Click to upload</span> or drag and drop
              </p>
              <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP — max 10 MB</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />
        </div>
      )}
    </div>
  )
}
