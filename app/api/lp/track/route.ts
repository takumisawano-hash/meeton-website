import { NextRequest, NextResponse } from 'next/server'
import { appendEvent, type LpEvent } from '../../../../lib/lp/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ALLOWED_TYPES: LpEvent['type'][] = [
  'popup_view',
  'popup_dismiss',
  'company_submit',
  'lp_view',
  'lp_section_view',
  'cta_click',
  'demo_book_success',
  'doc_request_success',
  'chat_open',
  'docodoco_corrected',
]

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      visitorId?: string
      type?: LpEvent['type']
      context?: Record<string, unknown>
    }
    if (!body.visitorId || !body.type || !ALLOWED_TYPES.includes(body.type)) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }
    await appendEvent({
      ts: new Date().toISOString(),
      visitorId: body.visitorId,
      type: body.type,
      context: body.context,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
