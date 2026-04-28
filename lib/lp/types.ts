export type FunnelStage = 'lead' | 'mql' | 'sql' | 'opportunity' | 'customer' | 'lost' | 'unknown'

export type ScoreTier = 'low' | 'mid' | 'high' | 'super-high'

export type IdentifyRequest = {
  companyName: string
  companyUrl?: string
  email?: string
  hubspotutk?: string
  visitorId?: string
  pagePath: string
  referrer?: string
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    content?: string
    term?: string
  }
  gclid?: string
  yclid?: string
  msclkid?: string
  gaClientId?: string
  docodoco?: {
    company_name?: string
    domain?: string
    employees?: string
    industry?: string
    org_url?: string
  }
  pageHistory?: string[]
}

export type CompanyProfile = {
  name: string
  domain?: string
  industry?: string
  employees?: string
  prefecture?: string
  corporateNumber?: string
  source: 'houjin' | 'docodoco' | 'user-input' | 'hubspot' | 'unknown'
  confidence: 'high' | 'medium' | 'low'
}

export type HubspotProfile = {
  contactId?: string
  firstName?: string
  lastName?: string
  email?: string
  jobTitle?: string
  companyName?: string
  lifecyclestage?: string
  hsLeadStatus?: string
  recentConversionEvent?: string
  numFormSubmissions?: number
  lastModified?: string
}

export type McpProfile = {
  contactId?: string
  visitorId?: string
  intentScore?: number
  engagementLevel?: string
  hasMeeting?: boolean
  conversionSource?: string
  recentSessions?: Array<{
    startedAt?: string
    pageCount?: number
    duration?: number
    pages?: string[]
    chatExchanges?: number
  }>
  pagesViewed?: Record<string, number>
  topInterest?: string
}

export type TrafficContext = {
  channel: 'paid_search' | 'paid_social' | 'organic' | 'direct' | 'referral' | 'email' | 'sns' | 'comparison_site' | 'unknown'
  source?: string
  medium?: string
  campaign?: string
  searchKeyword?: string
  referrerHost?: string
  isAdClick: boolean
  adNetwork?: 'google' | 'yahoo' | 'meta' | 'linkedin' | 'microsoft'
}

export type UnifiedProfile = {
  visitorId: string
  company: CompanyProfile
  hubspot?: HubspotProfile
  mcp?: McpProfile
  traffic: TrafficContext
  pageContext: {
    landingPath: string
    currentPath: string
    pagesViewed: string[]
    isPricingViewed: boolean
    isCaseStudyViewed: boolean
    isFeaturePageViewed: boolean
  }
  scoreTier: ScoreTier
  funnelStage: FunnelStage
  intentSignals: string[]
  generatedAt: string
}

export type LpComponentKey =
  | 'hero'
  | 'social_proof'
  | 'case_study'
  | 'roi'
  | 'use_cases'
  | 'comparison'
  | 'pricing'
  | 'cta'
  | 'urgency'
  | 'team'

export type LpComponent = {
  key: LpComponentKey
  variant: string
  copy: Record<string, string | string[]>
}

export type LpDocument = {
  visitorId: string
  generatedAt: string
  components: LpComponent[]
  primaryCta: 'demo' | 'document' | 'chat'
  themeAccent?: string
  rationale?: string
}
