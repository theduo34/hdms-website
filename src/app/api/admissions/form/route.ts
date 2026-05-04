import { NextResponse } from 'next/server'

export async function GET() {
    const url = process.env.ADMISSION_FORM_DRIVE_URL
    if (!url) {
        return NextResponse.json({ error: 'Form not available' }, { status: 503 })
    }

    // Convert Google Drive viewer URLs to direct download URLs
    const driveViewMatch = url.match(/\/file\/d\/([^/]+)\//)
    const downloadUrl = driveViewMatch
        ? `https://drive.google.com/uc?export=download&id=${driveViewMatch[1]}`
        : url

    return NextResponse.redirect(downloadUrl)
}
