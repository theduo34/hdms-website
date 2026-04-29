import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const schema = z.object({
  name:    z.string().min(1).max(200),
  email:   z.string().email().max(254),
  phone:   z.string().max(30).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!checkRateLimit(`contact:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const body   = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const { name, email, phone, subject, message } = parsed.data

  const contactEmail = process.env.CONTACT_EMAIL
  const apiKey       = process.env.RESEND_API_KEY

  if (!contactEmail || !apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
  }

  const safeSubject = subject.replace(/[\r\n]/g, ' ').slice(0, 150)
  const safeName    = name.replace(/[\r\n]/g, ' ').slice(0, 80)

  const lines = [
    'New Contact Form Submission',
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone ?? 'Not provided'}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
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
      from:     'HDM Website <noreply@hdm.edu.gh>',
      to:       [contactEmail],
      reply_to: email,
      subject:  `Contact Enquiry: ${safeSubject} — ${safeName}`,
      text:     lines.join('\n'),
    }),
  })

  if (!response.ok) {
    console.error('[contact] email send failed', { status: response.status })
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
