import { NextResponse } from 'next/server'

export async function GET() {
    const url = process.env.ADMISSION_FORM_DRIVE_URL
    if (!url) {
        return NextResponse.json({ error: 'Form not available' }, { status: 503 })
    }

    try {
        const upstream = await fetch(url, { next: { revalidate: 3600 } })
        if (!upstream.ok) throw new Error(`Upstream ${upstream.status}`)

        const buffer = await upstream.arrayBuffer()

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="hdm-admission-forms.pdf"',
                'Cache-Control': 'public, max-age=3600',
            },
        })
    } catch (err) {
        console.error('Form download error:', err)
        return NextResponse.json({ error: 'Could not retrieve form' }, { status: 502 })
    }
}
