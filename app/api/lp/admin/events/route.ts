import { NextRequest, NextResponse } from 'next/server'
import { getRecentEvents, getRecentProfiles } from '../../../../../lib/lp/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SECRET = process.env.LP_REPORT_SECRET || ''

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization') || ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : (request.nextUrl.searchParams.get('secret') || '')
  if (!SECRET || provided !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const since = request.nextUrl.searchParams.get('since') || undefined
  const kind = request.nextUrl.searchParams.get('kind') || 'events'
  if (kind === 'profiles') {
    const profiles = await getRecentProfiles(since)
    return NextResponse.json(profiles)
  }
  const events = await getRecentEvents(since)
  return NextResponse.json(events)
}
