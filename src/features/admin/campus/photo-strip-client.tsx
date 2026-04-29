'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { getMediaUrl } from '@/lib/media'
import { can } from '@/lib/admin/permissions'
import type { AdminRole } from '@/lib/admin/types'
import { useAdminBase } from '@/hooks/use-admin-base'
import { DropZone } from './drop-zone'
import { signAndUploadCampus } from './upload-helpers'
import { AdminHeader } from '@/components/admin/admin-header'

interface StripItem {
    id: string
    caption: string
    sort_order: number
    is_active: boolean
    asset: { id: string; storage_path: string; alt: string; width: number; height: number } | null
}

function StripCard({ item, canDelete, onDelete }: {
    item: StripItem
    canDelete: boolean
    onDelete: (id: string) => void
}) {
    const [deleting, setDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm(`Remove this photo from the strip?`)) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/admin/campus/photo-strip/${item.id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? 'Delete failed')
            onDelete(item.id)
            toast.success('Photo removed')
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Delete failed')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="group relative rounded-xl overflow-hidden border border-border bg-muted">
            <div className="relative aspect-square w-full">
                <Image
                    src={getMediaUrl(item.asset?.storage_path)}
                    alt={item.asset?.alt ?? item.caption}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="280px"
                />
            </div>
            <div className="p-3">
                <p className="text-xs font-medium truncate">{item.caption}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">#{item.sort_order + 1}</p>
            </div>
            {canDelete && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        size="icon"
                        variant="destructive"
                        className="h-7 w-7"
                        onClick={handleDelete}
                        disabled={deleting}
                        aria-label="Delete photo"
                    >
                        {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </Button>
                </div>
            )}
        </div>
    )
}

function UploadForm({ onSuccess }: { onSuccess: () => void }) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)

    function handleFile(f: File) {
        if (preview) URL.revokeObjectURL(preview)
        setFile(f)
        setPreview(URL.createObjectURL(f))
        if (!caption) setCaption(f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
    }

    function clearFile() {
        if (preview) URL.revokeObjectURL(preview)
        setFile(null)
        setPreview(null)
    }

    async function handleUpload() {
        if (!file || !caption.trim()) { toast.error('Select an image and enter a caption'); return }
        setUploading(true)
        setProgress(0)
        try {
            await signAndUploadCampus({
                file,
                folder: 'campus/photo-strip',
                alt: caption,
                recordEndpoint: '/api/admin/campus/photo-strip',
                recordPayload: { caption: caption.trim() },
                onProgress: setProgress,
            })
            toast.success('Photo added to strip')
            clearFile()
            setCaption('')
            onSuccess()
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Upload failed')
        } finally {
            setUploading(false)
            setProgress(0)
        }
    }

    return (
        <div className="rounded-xl border border-border p-6 space-y-5 bg-muted/30">
            <h3 className="font-semibold text-sm">Add New Photo</h3>
            <DropZone preview={preview} onFile={handleFile} onClear={clearFile} disabled={uploading} height={200} />
            <div className="space-y-1.5">
                <Label htmlFor="strip-caption">Caption</Label>
                <Input
                    id="strip-caption"
                    placeholder="e.g. Early Learners · Discovery Room"
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    maxLength={200}
                />
                <p className="text-[11px] text-muted-foreground">Use · to separate title from location</p>
            </div>
            {uploading && <Progress value={progress} className="h-1.5" />}
            <Button onClick={handleUpload} disabled={uploading || !file}>
                {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Uploading…</> : 'Add to Strip'}
            </Button>
        </div>
    )
}

export function PhotoStripClient({ role }: { role: AdminRole }) {
    const base = useAdminBase()
    const canCreate = can(role, 'campus', 'create')
    const canDelete = can(role, 'campus', 'delete')

    const [items, setItems] = useState<StripItem[]>([])
    const [loading, setLoading] = useState(true)

    const fetchItems = useCallback(async () => {
        const res = await fetch('/api/admin/campus/photo-strip')
        if (res.ok) setItems(await res.json())
        setLoading(false)
    }, [])

    useEffect(() => { fetchItems() }, [fetchItems])

    return (
        <>
            <AdminHeader title="Photo Strip" backHref={`${base}/campus`} />
            <main className="admin-page space-y-8">
                <div>
                    <h2 className="text-xl font-bold">Home Page Photo Strip</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Scrolling photo strip on the landing page. Caption format:{' '}
                        <code className="bg-muted px-1 rounded text-xs">Title · Location</code>
                    </p>
                </div>

                {canCreate && <UploadForm onSuccess={fetchItems} />}

                <div>
                    <h3 className="font-semibold text-sm mb-4">
                        Current Photos
                        <span className="ml-2 font-normal text-muted-foreground">({items.length})</span>
                    </h3>
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
                            ))}
                        </div>
                    ) : items.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-8 text-center">No photos yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {items.map(item => (
                                <StripCard
                                    key={item.id}
                                    item={item}
                                    canDelete={canDelete}
                                    onDelete={id => setItems(prev => prev.filter(i => i.id !== id))}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
