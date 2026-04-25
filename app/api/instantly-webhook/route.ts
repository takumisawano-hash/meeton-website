import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Bridges Instantly outbound webhooks → HubSpot Contact timeline.
// Instantly's native HubSpot integration only pushes leads INTO Instantly; it
// does not log email activity back to HubSpot. This handler resolves the
// recipient email to a HubSpot Contact and creates an Email/Note engagement
// for each Instantly event.

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN || ''
const WEBHOOK_SECRET = process.env.INSTANTLY_WEBHOOK_SECRET || ''
const HUBSPOT_BASE = 'https://api.hubapi.com'

type Json = Record<string, unknown>

async function hsFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${HUBSPOT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
}

async function findContactByEmail(email: string): Promise<string | null> {
  if (!email) return null
  const resp = await hsFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email'],
      limit: 1,
    }),
  })
  if (!resp.ok) return null
  const data = (await resp.json()) as { results?: Array<{ id: string }> }
  return data.results?.[0]?.id ?? null
}

async function createEmailEngagement(
  contactId: string,
  direction: 'EMAIL' | 'INCOMING_EMAIL',
  subject: string,
  bodyHtml: string,
  bodyText: string,
  status: 'SENT' | 'BOUNCED' | 'FAILED' | undefined,
  timestampMs: string,
  fromEmail: string,
  toEmail: string,
  instantlyEventId: string,
): Promise<string | null> {
  const properties: Json = {
    hs_timestamp: timestampMs,
    hs_email_direction: direction,
    hs_email_subject: subject || '(no subject)',
    hs_email_html: bodyHtml || bodyText || '',
    hs_email_text: bodyText || '',
  }
  if (status && direction === 'EMAIL') properties.hs_email_status = status

  const headers: Json = {}
  if (fromEmail) headers.from = { email: fromEmail }
  if (toEmail) headers.to = [{ email: toEmail }]
  if (Object.keys(headers).length) properties.hs_email_headers = JSON.stringify(headers)
  if (instantlyEventId) {
    // stash event id in a stable, searchable spot for dedup-by-search if needed later
    properties.hs_email_text = `${properties.hs_email_text || ''}\n\n[instantly_event_id: ${instantlyEventId}]`
  }

  const resp = await hsFetch('/crm/v3/objects/emails', {
    method: 'POST',
    body: JSON.stringify({
      properties,
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 198 }],
        },
      ],
    }),
  })
  if (!resp.ok) {
    console.error('[instantly-webhook] hubspot email create failed', resp.status, await resp.text())
    return null
  }
  const data = (await resp.json()) as { id?: string }
  return data.id ?? null
}

async function addNote(contactId: string, body: string): Promise<boolean> {
  const resp = await hsFetch('/crm/v3/objects/notes', {
    method: 'POST',
    body: JSON.stringify({
      properties: { hs_note_body: body, hs_timestamp: String(Date.now()) },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        },
      ],
    }),
  })
  return resp.ok
}

function tsIsoToMs(iso: string): string {
  if (!iso) return String(Date.now())
  const t = Date.parse(iso)
  return isNaN(t) ? String(Date.now()) : String(t)
}

export async function POST(req: NextRequest) {
  if (WEBHOOK_SECRET) {
    const provided =
      req.headers.get('x-secret') || req.nextUrl.searchParams.get('secret') || ''
    if (provided !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  let payload: Json
  try {
    payload = (await req.json()) as Json
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const eventType = String(payload.event_type || '').trim()
  const leadEmail = String(payload.lead_email || '').trim().toLowerCase()
  if (!eventType || !leadEmail) {
    return NextResponse.json({ status: 'skip', reason: 'missing event_type or lead_email' })
  }

  const contactId = await findContactByEmail(leadEmail)
  if (!contactId) {
    return NextResponse.json({
      status: 'skip',
      reason: 'contact not in hubspot',
      email: leadEmail,
    })
  }

  const subject = String(payload.email_subject || payload.reply_subject || '').trim()
  const bodyHtml = String(payload.email_html || payload.reply_html || '')
  const bodyText = String(
    payload.email_text || payload.reply_text || payload.reply_text_snippet || '',
  )
  const fromEmail = String(payload.email_account || '').trim()
  const tsMs = tsIsoToMs(String(payload.timestamp || ''))
  const eventId = String(payload.email_id || payload.timestamp || '')

  let hubspotObjectId: string | null = null

  switch (eventType) {
    case 'email_sent':
      hubspotObjectId = await createEmailEngagement(
        contactId, 'EMAIL', subject, bodyHtml, bodyText, 'SENT',
        tsMs, fromEmail, leadEmail, eventId,
      )
      break
    case 'reply_received':
      hubspotObjectId = await createEmailEngagement(
        contactId, 'INCOMING_EMAIL', subject, bodyHtml, bodyText, undefined,
        tsMs, leadEmail, fromEmail, eventId,
      )
      break
    case 'auto_reply_received':
      await addNote(
        contactId,
        `🤖 Auto-reply received\nSubject: ${subject}\n${bodyText.slice(0, 500)}`,
      )
      break
    case 'email_opened':
      await addNote(
        contactId,
        `📧 Email opened (${payload.timestamp || ''})\nSubject: ${subject}`,
      )
      break
    case 'email_link_clicked': {
      const url = String(payload.link_url || payload.url || '(unknown)')
      await addNote(contactId, `🖱️ Link clicked: ${url}\nSubject: ${subject}`)
      break
    }
    case 'email_bounced':
      await addNote(contactId, `❌ Email bounced\nSubject: ${subject}`)
      break
    case 'lead_unsubscribed':
      await addNote(contactId, `🚫 Lead unsubscribed\nSubject: ${subject}`)
      break
    case 'campaign_completed':
      await addNote(contactId, `🏁 Campaign sequence completed for ${leadEmail}`)
      break
    default:
      await addNote(
        contactId,
        `ℹ️ Instantly event: ${eventType}\n${bodyText.slice(0, 300)}`,
      )
  }

  return NextResponse.json({
    status: 'ok',
    event_type: eventType,
    contact_id: contactId,
    hubspot_object_id: hubspotObjectId,
  })
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    description:
      'Instantly outbound webhook → HubSpot Contact timeline bridge. POST events here.',
  })
}
