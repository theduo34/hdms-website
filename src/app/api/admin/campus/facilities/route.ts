import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'

export const dynamic = 'force-dynamic'

const VALID_SECTIONS = new Set(['learning', 'outdoor', 'support'])
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

function pickFirst<T>(v: T | T[] | null | undefined): T | undefined {
    if (!v) return undefined
    return Array.isArray(v) ? v[0] : v
}

export async function GET(req: NextRequest) {
    const { db, err, json } = await apiGuard(req, 'campus', 'read')
    if (err) return err

    const { data, error } = await db!
        .from('campus_facilities')
        .select('id, section, name, description, sort_order, is_active, created_at, asset:media_assets(id, storage_path, alt)')
        .order('section', { ascending: true })
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

    const { path, alt, section, name, description, width, height, fileSize, mimeType } = body as Record<string, unknown>

    if (typeof path !== 'string' || !path.startsWith('campus/facilities/'))
        return json!({ error: 'Invalid storage path' }, 400)
    if (typeof section !== 'string' || !VALID_SECTIONS.has(section))
        return json!({ error: 'Invalid section' }, 400)
    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100)
        return json!({ error: 'name must be 1–100 characters' }, 400)
    if (description !== undefined && (typeof description !== 'string' || description.length > 1000))
        return json!({ error: 'description must be at most 1000 characters' }, 400)
    if (typeof mimeType !== 'string' || !ALLOWED_MIME.has(mimeType))
        return json!({ error: 'Unsupported file type' }, 400)

    const { data: fileList } = await db!.storage.from('media').list(
        path.substring(0, path.lastIndexOf('/')),
        { search: path.substring(path.lastIndexOf('/') + 1) },
    )
    if (!fileList?.length) return json!({ error: 'File not found in storage' }, 400)

    const altText = (typeof alt === 'string' && alt.trim()) ? alt.trim() : name.trim()

    const { data: asset, error: assetErr } = await db!
        .from('media_assets')
        .insert({
            storage_path: path,
            alt: altText,
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
        .from('campus_facilities')
        .select('*', { count: 'exact', head: true })
        .eq('section', section)

    const { data: facility, error: facErr } = await db!
        .from('campus_facilities')
        .insert({
            asset_id: asset.id,
            section,
            name: name.trim(),
            description: typeof description === 'string' ? description.trim() : '',
            sort_order: count ?? 0,
        })
        .select()
        .single()

    if (facErr || !facility) return json!({ error: 'Failed to create facility' }, 500)

    return json!({ asset, facility }, 201)
}
