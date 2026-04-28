import { NextRequest, NextResponse } from 'next/server'
import { suggestHoujin } from '../../../../lib/lp/houjin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || ''
  if (q.length < 2) return NextResponse.json({ items: [] })
  const items = await suggestHoujin(q, 6)
  return NextResponse.json({ items })
}
