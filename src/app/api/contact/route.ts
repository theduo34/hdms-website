import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { name, email, phone, subject, message } = data

    const contactEmail = process.env.CONTACT_EMAIL
    const apiKey = process.env.RESEND_API_KEY

    if (!contactEmail || !apiKey) {
        return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const body = [
        `New Contact Form Submission`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
    ].join('\n')

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'HDM Website <noreply@hdm.edu.gh>',
            to: [contactEmail],
            reply_to: email,
            subject: `Contact Enquiry: ${subject} — ${name}`,
            text: body,
        }),
    })

    if (!response.ok) {
        console.error('Resend error:', await response.text())
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
