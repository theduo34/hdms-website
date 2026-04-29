'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Trash2, Loader2, Pencil, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getMediaUrl } from '@/lib/media'
import { can } from '@/lib/admin/permissions'
import type { AdminRole } from '@/lib/admin/types'
import { useAdminBase } from '@/hooks/use-admin-base'
import { DropZone } from './drop-zone'
import { signAndUploadCampus } from './upload-helpers'
import { AdminHeader } from '@/components/admin/admin-header'

type Section = 'learning' | 'outdoor' | 'support'

interface FacilityItem {
    id: string
    section: Section
    name: string
    description: string
    sort_order: number
    is_active: boolean
    asset: { id: string; storage_path: string; alt: string } | null
}

const SECTIONS: { id: Section; label: string }[] = [
    { id: 'learning', label: 'Learning Spaces' },
    { id: 'outdoor',  label: 'Outdoor & Sports' },
    { id: 'support',  label: 'Support Facilities' },
]

function FacilityCard({ item, canEdit, canDelete, onDelete, onUpdate }: {
    item: FacilityItem
    canEdit: boolean
    canDelete: boolean
    onDelete: (id: string) => void
    onUpdate: (id: string, name: string, description: string) => void
}) {
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(item.name)
    const [desc, setDesc] = useState(item.description)
    const [saving, setSaving] = useState(false)

    async function handleDelete() {
        if (!confirm(`Remove "${item.name}"?`)) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/admin/campus/facilities/${item.id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? 'Delete failed')
            onDelete(item.id)
            toast.success('Facility removed')
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Delete failed')
        } finally {
            setDeleting(false)
        }
    }

    async function handleSave() {
        setSaving(true)
        try {
            const res = await fetch(`/api/admin/campus/facilities/${item.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), description: desc.trim() }),
            })
            if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? 'Update failed')
            onUpdate(item.id, name.trim(), desc.trim())
            setEditing(false)
            toast.success('Updated')
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Update failed')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <div className="relative h-44 w-full">
                <Image
                    src={getMediaUrl(item.asset?.storage_path)}
                    alt={item.asset?.alt ?? item.name}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="400px"
                />
            </div>
            <div className="p-4 space-y-3">
                {editing ? (
                    <>
                        <Input value={name} onChange={e => setName(e.target.value)} maxLength={100} />
                        <Textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="resize-none" maxLength={1000} />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleSave} disabled={saving}>
                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                Save
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setName(item.name); setDesc(item.description) }}>
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                        <div className="flex gap-2 pt-1">
                            {canEdit && (
                                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setEditing(true)}>
                                    <Pencil className="w-3 h-3" /> Edit
                                </Button>
                            )}
                            {canDelete && (
                                <Button size="sm" variant="destructive" className="gap-1.5" onClick={handleDelete} disabled={deleting}>
                                    {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                    Remove
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function SectionUploadForm({ section, canCreate, onSuccess }: {
    section: Section
    canCreate: boolean
    onSuccess: () => void
}) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)

    if (!canCreate) return null

    function handleFile(f: File) {
        if (preview) URL.revokeObjectURL(preview)
        setFile(f)
        setPreview(URL.createObjectURL(f))
    }

    function clearFile() {
        if (preview) URL.revokeObjectURL(preview)
        setFile(null)
        setPreview(null)
    }

    async function handleUpload() {
        if (!file || !name.trim()) { toast.error('Select an image and enter a name'); return }
        setUploading(true)
        setProgress(0)
        try {
            await signAndUploadCampus({
                file,
                folder: `campus/facilities/${section}`,
                alt: name,
                recordEndpoint: '/api/admin/campus/facilities',
                recordPayload: { section, name: name.trim(), description: desc.trim() },
                onProgress: setProgress,
            })
            toast.success('Facility added')
            clearFile()
            setName('')
            setDesc('')
            onSuccess()
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Upload failed')
        } finally {
            setUploading(false)
            setProgress(0)
        }
    }

    return (
        <div className="rounded-xl border border-border p-5 space-y-4 bg-muted/30">
            <h4 className="font-semibold text-sm">Add Facility</h4>
            <DropZone preview={preview} onFile={handleFile} onClear={clearFile} disabled={uploading} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label>Name</Label>
                    <Input placeholder="e.g. Montessori Classrooms" value={name} onChange={e => setName(e.target.value)} maxLength={100} />
                </div>
                <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea placeholder="Brief description…" value={desc} onChange={e => setDesc(e.target.value)} rows={2} className="resize-none" maxLength={1000} />
                </div>
            </div>
            {uploading && <Progress value={progress} className="h-1.5" />}
            <Button onClick={handleUpload} disabled={uploading || !file} size="sm">
                {uploading ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Uploading…</> : 'Add Facility'}
            </Button>
        </div>
    )
}

export function FacilitiesClient({ role }: { role: AdminRole }) {
    const base = useAdminBase()
    const canCreate = can(role, 'campus', 'create')
    const canEdit   = can(role, 'campus', 'update')
    const canDelete = can(role, 'campus', 'delete')

    const [items, setItems] = useState<FacilityItem[]>([])
    const [loading, setLoading] = useState(true)

    const fetchItems = useCallback(async () => {
        const res = await fetch('/api/admin/campus/facilities')
        if (res.ok) setItems(await res.json())
        setLoading(false)
    }, [])

    useEffect(() => { fetchItems() }, [fetchItems])

    const forSection = (s: Section) => items.filter(i => i.section === s)

    return (
        <>
            <AdminHeader title="Campus Facilities" backHref={`${base}/campus`} />
            <main className="admin-page space-y-8">
                <div>
                    <h2 className="text-xl font-bold">Campus Facilities</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Manage learning spaces, outdoor areas, and support facilities.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="rounded-xl bg-muted animate-pulse h-64" />
                        ))}
                    </div>
                ) : (
                    <Tabs defaultValue="learning">
                        <TabsList>
                            {SECTIONS.map(({ id, label }) => (
                                <TabsTrigger key={id} value={id}>
                                    {label}
                                    <span className="ml-1.5 text-[10px] text-muted-foreground">({forSection(id).length})</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {SECTIONS.map(({ id }) => (
                            <TabsContent key={id} value={id} className="space-y-6 pt-4">
                                <SectionUploadForm section={id} canCreate={canCreate} onSuccess={fetchItems} />
                                {forSection(id).length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-6">No items yet.</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {forSection(id).map(item => (
                                            <FacilityCard
                                                key={item.id}
                                                item={item}
                                                canEdit={canEdit}
                                                canDelete={canDelete}
                                                onDelete={id2 => setItems(prev => prev.filter(i => i.id !== id2))}
                                                onUpdate={(id2, name, description) =>
                                                    setItems(prev => prev.map(i => i.id === id2 ? { ...i, name, description } : i))
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </main>
        </>
    )
}
