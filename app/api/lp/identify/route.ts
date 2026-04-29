import { NextRequest, NextResponse } from 'next/server'
import { buildUnifiedProfile } from '../../../../lib/lp/profile'
import type { IdentifyRequest } from '../../../../lib/lp/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<IdentifyRequest>
    if (!body.companyName || !body.pagePath) {
      return NextResponse.json({ error: 'companyName and pagePath are required' }, { status: 400 })
    }
    const req: IdentifyRequest = {
      companyName: body.companyName.trim(),
      companyUrl: body.companyUrl,
      email: body.email,
      hubspotutk: body.hubspotutk,
      visitorId: body.visitorId,
      pagePath: body.pagePath,
      referrer: body.referrer,
      utm: body.utm,
      gclid: body.gclid,
      yclid: body.yclid,
      msclkid: body.msclkid,
      gaClientId: body.gaClientId,
      docodoco: body.docodoco,
      pageHistory: body.pageHistory,
      userMonthlyVisits: body.userMonthlyVisits,
      userMonthlyLeads: body.userMonthlyLeads,
      userSdrCount: body.userSdrCount,
    }
    const profile = await buildUnifiedProfile(req)
    return NextResponse.json({ profile })
  } catch (e) {
    return NextResponse.json({ error: 'identify failed', message: (e as Error).message }, { status: 500 })
  }
}
