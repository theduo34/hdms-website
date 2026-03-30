import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const { childFirstName, childLastName, dob, programme, parentName, phone, email, notes } = data

    const admissionsEmail = process.env.ADMISSIONS_EMAIL
    const apiKey = process.env.RESEND_API_KEY

    if (!admissionsEmail || !apiKey) {
        return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const body = [
        `New Admissions Application`,
        ``,
        `Child's Name: ${childFirstName} ${childLastName}`,
        `Date of Birth: ${dob}`,
        `Programme: ${programme}`,
        ``,
        `Parent / Guardian: ${parentName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        ``,
        `Notes: ${notes || 'None'}`,
    ].join('\n')

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: "HDM Admissions <noreply@hdm.edu.gh>",
            to: [admissionsEmail],
            reply_to: email,
            subject: `New Admission Application — ${childFirstName} ${childLastName}`,
            text: body,
        }),
    })

    if (!response.ok) {
        console.error('Resend error:', await response.text())
        return NextResponse.json({ error: 'Failed to send application' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
