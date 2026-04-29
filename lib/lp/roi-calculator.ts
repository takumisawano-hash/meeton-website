import type { TrafficEstimate } from './traffic-estimate'

export type RoiCalc = {
  monthlyVisits: number
  monthlyEngageable: number
  trafficSource: TrafficEstimate['source']
  confidence: TrafficEstimate['confidence']
  trancoRank?: number
  category?: string
  jpShareRatio?: number
  topKeywords?: Array<{ name: string; volume?: number }>
  expected: {
    meetingsPerMonth: number
    autoFollowedLeadsPerMonth: number
    hoursSavedPerMonth: number
    hoursSavedAsHeadcount: number
  }
  uplift?: {
    addLeadsPerMonth: number
    currentLeadsPerMonth: number
    expectedLeadsPerMonth: number
  }
  basis: {
    engageableRate: number
    leadCvrPct: number
    meetingCvrPct: number
    boost: number
    hoursPerMeeting: number
    hoursPerFollowup: number
    standardSdrHoursPerMonth: number
    sdrHeadcount?: number
    sdrHeadcountSource: 'user-input' | 'unknown'
    capApplied: boolean
  }
}

const DEFAULT_ENGAGEABLE_RATE = 0.767
const REAL_LEAD_CVR = 0.27
const REAL_MEETING_CVR = 32.1
const BOOST = 1.18
const HOURS_PER_MEETING = 3
const HOURS_PER_FOLLOWUP = 1
const STANDARD_SDR_HOURS = 160
const MEETINGS_PER_SDR_PER_MONTH_CAP = 12

function deriveEngageableRate(traffic: TrafficEstimate): number {
  const sources = traffic.details?.trafficSources
  const jp = traffic.details?.jpShareRatio
  let rate = DEFAULT_ENGAGEABLE_RATE

  if (sources) {
    const direct = sources.direct ?? 0
    const search = sources.search ?? 0
    if (direct >= 0.5) rate = 0.25
    else if (direct >= 0.4) rate = 0.4
    else if (direct >= 0.3) rate = 0.6
    else if (search >= 0.5) rate = 0.85
  }
  if (typeof jp === 'number' && jp < 0.5) {
    rate *= jp
  }
  if (traffic.monthlyVisits > 5_000_000) rate = Math.min(rate, 0.15)
  else if (traffic.monthlyVisits > 1_000_000) rate = Math.min(rate, 0.3)
  return Math.max(0.05, Math.min(0.9, rate))
}

export function calculateRoi(opts: {
  traffic: TrafficEstimate
  industry?: string
  employees?: string
  userMonthlyLeads?: number
  userSdrCount?: number
}): RoiCalc {
  const visits = opts.traffic.monthlyVisits
  const engageableRate = deriveEngageableRate(opts.traffic)
  const engageable = Math.round(visits * engageableRate)
  let leads = Math.round((engageable * REAL_LEAD_CVR) / 100 * BOOST)
  let meetings = Math.round((leads * REAL_MEETING_CVR) / 100 * BOOST)
  let capApplied = false
  if (opts.userSdrCount && opts.userSdrCount > 0) {
    const meetingCap = opts.userSdrCount * MEETINGS_PER_SDR_PER_MONTH_CAP
    if (meetings > meetingCap) {
      meetings = meetingCap
      capApplied = true
    }
    const leadFloor = Math.max(meetings, Math.round(meetings / (REAL_MEETING_CVR / 100 * BOOST)))
    if (leads > leadFloor * 4) {
      leads = leadFloor * 4
      capApplied = true
    }
  }
  const autoFollowed = Math.max(0, leads - meetings)
  let hoursSaved = meetings * HOURS_PER_MEETING + autoFollowed * HOURS_PER_FOLLOWUP
  if (opts.userSdrCount && opts.userSdrCount > 0) {
    const hourCap = opts.userSdrCount * STANDARD_SDR_HOURS
    if (hoursSaved > hourCap) {
      hoursSaved = hourCap
      capApplied = true
    }
  }
  const hoursAsHeadcount = Math.round((hoursSaved / STANDARD_SDR_HOURS) * 10) / 10

  let uplift: RoiCalc['uplift']
  if (typeof opts.userMonthlyLeads === 'number' && opts.userMonthlyLeads >= 0) {
    const currentLeads = opts.userMonthlyLeads
    const targetLeads = Math.max(currentLeads, leads)
    uplift = {
      currentLeadsPerMonth: currentLeads,
      expectedLeadsPerMonth: targetLeads,
      addLeadsPerMonth: Math.max(0, targetLeads - currentLeads),
    }
  }

  const details = opts.traffic.details
  return {
    monthlyVisits: visits,
    monthlyEngageable: engageable,
    trafficSource: opts.traffic.source,
    confidence: opts.traffic.confidence,
    trancoRank: details?.rank,
    category: details?.category,
    jpShareRatio: details?.jpShareRatio,
    topKeywords: details?.topKeywords,
    expected: {
      meetingsPerMonth: meetings,
      autoFollowedLeadsPerMonth: autoFollowed,
      hoursSavedPerMonth: hoursSaved,
      hoursSavedAsHeadcount: hoursAsHeadcount,
    },
    uplift,
    basis: {
      engageableRate,
      leadCvrPct: REAL_LEAD_CVR,
      meetingCvrPct: REAL_MEETING_CVR,
      boost: BOOST,
      hoursPerMeeting: HOURS_PER_MEETING,
      hoursPerFollowup: HOURS_PER_FOLLOWUP,
      standardSdrHoursPerMonth: STANDARD_SDR_HOURS,
      sdrHeadcount: opts.userSdrCount,
      sdrHeadcountSource: opts.userSdrCount ? 'user-input' : 'unknown',
      capApplied,
    },
  }
}
