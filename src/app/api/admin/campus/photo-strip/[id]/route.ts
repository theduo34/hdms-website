import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { db, err, json } = await apiGuard(req, 'campus', 'update')
    if (err) return err

    const { id } = await params
    if (!UUID_RE.test(id)) return json!({ error: 'Invalid id' }, 400)

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') return json!({ error: 'Invalid request body' }, 400)

    const update: Record<string, string | number | boolean> = {}

    if ('caption' in body) {
        if (typeof body.caption !== 'string' || body.caption.trim().length === 0 || body.caption.length > 200)
            return json!({ error: 'caption must be 1–200 characters' }, 400)
        update.caption = body.caption.trim()
    }
    if ('sort_order' in body) {
        if (typeof body.sort_order !== 'number' || !Number.isInteger(body.sort_order) || body.sort_order < 0)
            return json!({ error: 'sort_order must be a non-negative integer' }, 400)
        update.sort_order = body.sort_order
    }
    if ('is_active' in body) {
        if (typeof body.is_active !== 'boolean') return json!({ error: 'is_active must be a boolean' }, 400)
        update.is_active = body.is_active
    }

    if (Object.keys(update).length === 0) return json!({ error: 'No valid fields to update' }, 400)

    const { error } = await db!.from('campus_photo_strip').update(update).eq('id', id)
    if (error) return json!({ error: error.message }, 500)
    return json!({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { db, err, json } = await apiGuard(req, 'campus', 'delete')
    if (err) return err

    const { id } = await params
    if (!UUID_RE.test(id)) return json!({ error: 'Invalid id' }, 400)

    const { data: row } = await db!
        .from('campus_photo_strip')
        .select('asset_id, asset:media_assets(storage_path)')
        .eq('id', id)
        .single()

    const { error } = await db!.from('campus_photo_strip').delete().eq('id', id)
    if (error) return json!({ error: error.message }, 500)

    if (row?.asset_id) {
        const asset = (Array.isArray(row.asset) ? row.asset[0] : row.asset) as { storage_path?: string } | null
        if (asset?.storage_path && !asset.storage_path.startsWith('http')) {
            await db!.storage.from('media').remove([asset.storage_path])
        }
        await db!.from('media_assets').delete().eq('id', row.asset_id)
    }

    return json!({ ok: true })
}
