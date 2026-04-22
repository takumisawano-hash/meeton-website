import { NextRequest, NextResponse } from 'next/server'

const SLACK_WEBHOOK_URL = process.env.CAREERS_SLACK_WEBHOOK_URL || ''

type ApplyPayload = {
  position?: string
  positionId?: string
  name?: string
  email?: string
  linkedin?: string
  message?: string
  // Honeypot field — bots fill this, humans leave it empty.
  website?: string
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function POST(req: NextRequest) {
  let body: ApplyPayload
  try {
    body = (await req.json()) as ApplyPayload
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot check
  if (body.website && body.website.trim().length > 0) {
    // Pretend to succeed for bots
    return NextResponse.json({ ok: true })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const position = (body.position || '未指定').trim()
  const positionId = (body.positionId || '').trim()
  const linkedin = (body.linkedin || '').trim()
  const message = (body.message || '').trim()

  if (!name || name.length < 1 || name.length > 200) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 })
  }
  if (!email || !isEmail(email) || email.length > 200) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'message_too_long' }, { status: 400 })
  }

  const blocks: unknown[] = [
    {
      type: 'header',
      text: { type: 'plain_text', text: `📬 採用応募: ${position}`, emoji: true },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*氏名*\n${name}` },
        { type: 'mrkdwn', text: `*メール*\n${email}` },
      ],
    },
  ]
  if (positionId || linkedin) {
    const fields: { type: string; text: string }[] = []
    if (positionId) fields.push({ type: 'mrkdwn', text: `*Position ID*\n${positionId}` })
    if (linkedin) fields.push({ type: 'mrkdwn', text: `*LinkedIn / Portfolio*\n${linkedin}` })
    blocks.push({ type: 'section', fields })
  }
  if (message) {
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*メッセージ*\n\`\`\`${message.slice(0, 3000)}\`\`\`` },
    })
  }
  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `Source: dynameet.ai/careers · ${new Date().toISOString()}`,
      },
    ],
  })

  if (!SLACK_WEBHOOK_URL) {
    console.error('[apply] CAREERS_SLACK_WEBHOOK_URL not configured')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  try {
    const resp = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    })
    if (!resp.ok) {
      const text = await resp.text()
      console.error('[apply] Slack webhook error', resp.status, text)
      return NextResponse.json({ error: 'notify_failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('[apply] Slack request failed', err)
    return NextResponse.json({ error: 'notify_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
