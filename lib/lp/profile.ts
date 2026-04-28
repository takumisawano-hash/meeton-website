import type {
  IdentifyRequest,
  UnifiedProfile,
  ScoreTier,
  FunnelStage,
  CompanyProfile,
} from './types'
import { fetchHubspotProfile } from './hubspot'
import { fetchMcpProfile } from './mcp'
import { lookupHoujin } from './houjin'
import { deriveTraffic, inferSearchIntent } from './traffic'

function deriveFunnelStage(lifecyclestage?: string, hsLeadStatus?: string): FunnelStage {
  const ls = (lifecyclestage || '').toLowerCase()
  if (ls.includes('customer')) return 'customer'
  if (ls.includes('opportunity') || ls.includes('sql')) return 'sql'
  if (ls.includes('mql') || ls.includes('marketingqualifiedlead')) return 'mql'
  if (ls.includes('lead') || ls.includes('subscriber')) return 'lead'
  const status = (hsLeadStatus || '').toLowerCase()
  if (status.includes('lost') || status.includes('disqualified')) return 'lost'
  return 'unknown'
}

function deriveScoreTier(opts: {
  intentScore?: number
  engagementLevel?: string
  funnelStage: FunnelStage
  pageContext: { isPricingViewed: boolean; isCaseStudyViewed: boolean; isFeaturePageViewed: boolean }
  hubspotHasMeeting?: boolean
  numFormSubmissions?: number
}): ScoreTier {
  const { intentScore, engagementLevel, funnelStage, pageContext, numFormSubmissions } = opts
  if (funnelStage === 'sql' || funnelStage === 'opportunity' || funnelStage === 'customer') return 'super-high'
  if (typeof intentScore === 'number') {
    if (intentScore >= 80) return 'super-high'
    if (intentScore >= 60) return 'high'
    if (intentScore >= 35) return 'mid'
  }
  const eng = (engagementLevel || '').toLowerCase()
  if (eng === 'high' || eng === 'engaged-high') return 'high'
  if (eng === 'medium' || eng === 'engaged-mid') return 'mid'

  if (pageContext.isPricingViewed && pageContext.isCaseStudyViewed) return 'high'
  if (pageContext.isPricingViewed || pageContext.isCaseStudyViewed) return 'mid'
  if ((numFormSubmissions || 0) >= 1) return 'mid'
  if (pageContext.isFeaturePageViewed) return 'mid'
  return 'low'
}

function pickCompany(input: IdentifyRequest, houjin: CompanyProfile | null): CompanyProfile {
  const docodoco = input.docodoco
  if (houjin && houjin.confidence === 'high') {
    return {
      ...houjin,
      employees: docodoco?.employees || houjin.employees,
      domain: docodoco?.domain || houjin.domain,
      industry: houjin.industry || docodoco?.industry,
    }
  }
  if (docodoco?.company_name && (!input.companyName || input.companyName === docodoco.company_name)) {
    return {
      name: docodoco.company_name,
      domain: docodoco.domain,
      industry: docodoco.industry,
      employees: docodoco.employees,
      source: 'docodoco',
      confidence: 'medium',
    }
  }
  return houjin || {
    name: input.companyName,
    source: 'user-input',
    confidence: input.companyUrl || input.email ? 'medium' : 'low',
  }
}

function deriveIntentSignals(profile: Partial<UnifiedProfile>): string[] {
  const sigs: string[] = []
  if (profile.pageContext?.isPricingViewed) sigs.push('pricing-page-viewed')
  if (profile.pageContext?.isCaseStudyViewed) sigs.push('case-study-viewed')
  if (profile.mcp?.hasMeeting) sigs.push('past-meeting-booked')
  if (profile.mcp?.recentSessions && profile.mcp.recentSessions.length >= 3) sigs.push('multi-session-visitor')
  if (profile.mcp?.topInterest) sigs.push(`interest:${profile.mcp.topInterest}`)
  if (profile.hubspot?.lifecyclestage) sigs.push(`stage:${profile.hubspot.lifecyclestage}`)
  if (profile.traffic?.channel === 'comparison_site') sigs.push('from-comparison-site')
  if (profile.traffic?.channel === 'paid_search') sigs.push('from-paid-search')
  if (profile.hubspot && (profile.hubspot.numFormSubmissions || 0) >= 1) sigs.push('past-form-submission')
  return sigs
}

function buildPageContext(req: IdentifyRequest, mcpPages?: string[]) {
  const pages = new Set<string>([req.pagePath, ...(req.pageHistory || []), ...(mcpPages || [])])
  const list = Array.from(pages).filter(Boolean)
  return {
    landingPath: req.pageHistory?.[0] || req.pagePath,
    currentPath: req.pagePath,
    pagesViewed: list,
    isPricingViewed: list.some(p => p.includes('/pricing') || p.includes('/plans')),
    isCaseStudyViewed: list.some(p => p.includes('/case-studies')),
    isFeaturePageViewed: list.some(p => p.includes('/features/')),
  }
}

export async function buildUnifiedProfile(req: IdentifyRequest): Promise<UnifiedProfile> {
  const [hubspot, mcp, houjin] = await Promise.all([
    fetchHubspotProfile({
      email: req.email,
      hubspotutk: req.hubspotutk,
      companyName: req.companyName,
    }),
    fetchMcpProfile({
      email: req.email,
      companyName: req.companyName,
      visitorId: req.visitorId,
    }),
    lookupHoujin(req.companyName),
  ])

  const company = pickCompany(req, houjin)
  const traffic = deriveTraffic(req)
  if (traffic.searchKeyword || req.utm?.term) {
    traffic.searchKeyword = traffic.searchKeyword || req.utm?.term
  }
  const searchIntent = inferSearchIntent(traffic.searchKeyword)

  const pageContext = buildPageContext(
    req,
    mcp?.recentSessions?.flatMap(s => s.pages || [])
  )

  const funnelStage = deriveFunnelStage(hubspot?.lifecyclestage, hubspot?.hsLeadStatus)
  const scoreTier = deriveScoreTier({
    intentScore: mcp?.intentScore,
    engagementLevel: mcp?.engagementLevel,
    funnelStage,
    pageContext,
    hubspotHasMeeting: mcp?.hasMeeting,
    numFormSubmissions: hubspot?.numFormSubmissions,
  })

  const partial: Partial<UnifiedProfile> = {
    company,
    hubspot: hubspot || undefined,
    mcp: mcp || undefined,
    traffic,
    pageContext,
    scoreTier,
    funnelStage,
  }
  const intentSignals = deriveIntentSignals(partial)
  if (searchIntent) intentSignals.push(`search-intent:${searchIntent}`)

  return {
    visitorId: req.visitorId || `vid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    company,
    hubspot: hubspot || undefined,
    mcp: mcp || undefined,
    traffic,
    pageContext,
    scoreTier,
    funnelStage,
    intentSignals,
    generatedAt: new Date().toISOString(),
  }
}
