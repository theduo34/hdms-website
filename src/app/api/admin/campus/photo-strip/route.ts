import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

function pickFirst<T>(v: T | T[] | null | undefined): T | undefined {
    if (!v) return undefined
    return Array.isArray(v) ? v[0] : v
}

export async function GET(req: NextRequest) {
    const { db, err, json } = await apiGuard(req, 'campus', 'read')
    if (err) return err

    const { data, error } = await db!
        .from('campus_photo_strip')
        .select('id, caption, sort_order, is_active, created_at, asset:media_assets(id, storage_path, alt, width, height)')
        .order('sort_order', { ascending: true })

    if (error) return json!({ error: error.message }, 500)

    const rows = (data ?? []).map((row) => ({
        ...row,
        asset: pickFirst(row.asset as Parameters<typeof pickFirst>[0]),
    }))

    return json!(rows)
}

export async function POST(req: NextRequest) {
    const { db, err, json } = await apiGuard(req, 'campus', 'create')
    if (err) return err

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') return json!({ error: 'Invalid request body' }, 400)

    const { path, alt, caption, width, height, fileSize, mimeType } = body as Record<string, unknown>

    if (typeof path !== 'string' || !path.startsWith('campus/photo-strip/'))
        return json!({ error: 'Invalid storage path' }, 400)
    if (typeof caption !== 'string' || caption.trim().length === 0 || caption.length > 200)
        return json!({ error: 'caption must be 1–200 characters' }, 400)
    if (typeof alt !== 'string' || alt.length > 200)
        return json!({ error: 'Invalid alt text' }, 400)
    if (typeof mimeType !== 'string' || !ALLOWED_MIME.has(mimeType))
        return json!({ error: 'Unsupported file type' }, 400)

    const { data: fileList } = await db!.storage.from('media').list(
        path.substring(0, path.lastIndexOf('/')),
        { search: path.substring(path.lastIndexOf('/') + 1) },
    )
    if (!fileList?.length) return json!({ error: 'File not found in storage' }, 400)

    const { data: asset, error: assetErr } = await db!
        .from('media_assets')
        .insert({
            storage_path: path,
            alt: (typeof alt === 'string' && alt.trim()) ? alt.trim() : caption.trim(),
            mime_type: mimeType,
            file_size: typeof fileSize === 'number' ? fileSize : null,
            width: typeof width === 'number' ? width : null,
            height: typeof height === 'number' ? height : null,
            metadata: {},
        })
        .select('id')
        .single()

    if (assetErr || !asset) {
        await db!.storage.from('media').remove([path])
        return json!({ error: 'Failed to save asset' }, 500)
    }

    const { count } = await db!
        .from('campus_photo_strip')
        .select('*', { count: 'exact', head: true })

    const { data: strip, error: stripErr } = await db!
        .from('campus_photo_strip')
        .insert({ asset_id: asset.id, caption: caption.trim(), sort_order: count ?? 0 })
        .select()
        .single()

    if (stripErr || !strip) return json!({ error: 'Failed to create strip entry' }, 500)

    return json!({ asset, strip }, 201)
}
