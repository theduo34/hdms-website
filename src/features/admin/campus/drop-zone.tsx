'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface DropZoneProps {
    preview: string | null
    onFile: (file: File) => void
    onClear: () => void
    disabled?: boolean
    height?: number
}

export function DropZone({ preview, onFile, onClear, disabled, height = 160 }: DropZoneProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        if (disabled) return
        const file = e.dataTransfer.files[0]
        if (file?.type.startsWith('image/')) onFile(file)
    }

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label="Upload image"
            className="relative border-2 border-dashed border-border rounded-lg overflow-hidden transition-colors hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            style={{ minHeight: height, cursor: disabled ? 'default' : 'pointer' }}
            onClick={() => !preview && !disabled && inputRef.current?.click()}
            onKeyDown={e => e.key === 'Enter' && !preview && !disabled && inputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
        >
            {preview ? (
                <div className="relative w-full" style={{ height }}>
                    <Image src={preview} alt="Selected image preview" fill className="object-contain" unoptimized />
                    {!disabled && (
                        <button
                            type="button"
                            onClick={e => { e.stopPropagation(); onClear() }}
                            className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white hover:bg-black/80 transition-colors"
                            aria-label="Remove selected image"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
                    <Upload className="w-7 h-7" aria-hidden />
                    <p className="text-sm font-medium">Click or drag image here</p>
                    <p className="text-xs">JPEG, PNG, WebP — max 30 MB</p>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f) }}
                tabIndex={-1}
                aria-hidden
            />
        </div>
    )
}
