import { NextRequest, NextResponse } from 'next/server'
import { buildUnifiedProfile } from '../../../../lib/lp/profile'
import { generateLp } from '../../../../lib/lp/generator'
import { saveProfile } from '../../../../lib/lp/storage'
import type { IdentifyRequest, UnifiedProfile } from '../../../../lib/lp/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as
      | { profile: UnifiedProfile }
      | (Partial<IdentifyRequest> & { useExistingProfile?: false })
    let profile: UnifiedProfile
    if ('profile' in body && body.profile) {
      profile = body.profile
    } else {
      const req = body as Partial<IdentifyRequest>
      if (!req.companyUrl || !req.pagePath) {
        return NextResponse.json({ error: 'companyUrl and pagePath required when profile not given' }, { status: 400 })
      }
      profile = await buildUnifiedProfile({
        companyUrl: req.companyUrl.trim(),
        companyName: req.companyName?.trim(),
        email: req.email,
        hubspotutk: req.hubspotutk,
        visitorId: req.visitorId,
        pagePath: req.pagePath,
        referrer: req.referrer,
        utm: req.utm,
        gclid: req.gclid,
        yclid: req.yclid,
        msclkid: req.msclkid,
        gaClientId: req.gaClientId,
        docodoco: req.docodoco,
        pageHistory: req.pageHistory,
        userMonthlyVisits: req.userMonthlyVisits,
        userMonthlyLeads: req.userMonthlyLeads,
        userSdrCount: req.userSdrCount,
      })
    }
    const lp = await generateLp(profile)
    saveProfile(profile.visitorId, profile, lp).catch(() => {})
    return NextResponse.json({ profile, lp })
  } catch (e) {
    return NextResponse.json({ error: 'generate failed', message: (e as Error).message }, { status: 500 })
  }
}
