import { NextResponse } from 'next/server'

// Replaced by /upload/sign + /upload/record (signed direct-upload flow)
export function POST() {
  return NextResponse.json(
    { error: 'Use /api/admin/gallery/upload/sign and /api/admin/gallery/upload/record' },
    { status: 410 },
  )
}
