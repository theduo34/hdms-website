import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const schema = z.object({
  childFirstName: z.string().min(1).max(100),
  childLastName:  z.string().min(1).max(100),
  dob:            z.string().min(1).max(20),
  programme:      z.string().min(1).max(80),
  parentName:     z.string().min(1).max(200),
  phone:          z.string().max(30).optional(),
  email:          z.string().email().max(254),
  notes:          z.string().max(2000).optional(),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!checkRateLimit(`admissions:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const body   = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const { childFirstName, childLastName, dob, programme, parentName, phone, email, notes } = parsed.data

  const admissionsEmail = process.env.ADMISSIONS_EMAIL
  const apiKey          = process.env.RESEND_API_KEY

  if (!admissionsEmail || !apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
  }

  const lines = [
    'New Admissions Application',
    '',
    `Child\'s Name:      ${childFirstName} ${childLastName}`,
    `Date of Birth:     ${dob}`,
    `Programme:         ${programme}`,
    '',
    `Parent / Guardian: ${parentName}`,
    `Phone:             ${phone ?? 'Not provided'}`,
    `Email:             ${email}`,
    '',
    `Notes: ${notes ?? 'None'}`,
    '',
    'Reply directly to the sender\'s email above.',
  ]

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:     'HDM Admissions <noreply@hdm.edu.gh>',
      to:       [admissionsEmail],
      reply_to: email,
      subject:  `New Admission Application — ${childFirstName} ${childLastName}`,
      text:     lines.join('\n'),
    }),
  })

  if (!response.ok) {
    console.error('[admissions/apply] email send failed', { status: response.status })
    return NextResponse.json({ error: 'Failed to send application.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
