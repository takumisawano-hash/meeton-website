import type { TrafficEstimate } from './traffic-estimate'

export type RoiCalc = {
  monthlyVisits: number
  monthlyEngageable: number
  trafficSource: TrafficEstimate['source']
  confidence: TrafficEstimate['confidence']
  trancoRank?: number
  expected: {
    meetingsPerMonth: number
    autoFollowedLeadsPerMonth: number
    hoursSavedPerMonth: number
    hoursSavedAsHeadcount: number
  }
  basis: {
    engageableRate: number
    leadCvrPct: number
    meetingCvrPct: number
    boost: number
    hoursPerMeeting: number
    hoursPerFollowup: number
    standardSdrHoursPerMonth: number
    sourceLabel: string
  }
}

const ENGAGEABLE_RATE = 0.767
const REAL_LEAD_CVR = 0.27
const REAL_MEETING_CVR = 32.1
const BOOST = 1.18
const HOURS_PER_MEETING = 3
const HOURS_PER_FOLLOWUP = 1
const STANDARD_SDR_HOURS = 160
const SOURCE_LABEL = 'Meeton ai 導入企業4社の有能訪問者ベース実績(過去30日) + AI Landing Page × AI Email 上乗せ約18%'

export function calculateRoi(opts: {
  traffic: TrafficEstimate
  industry?: string
  employees?: string
}): RoiCalc {
  const visits = opts.traffic.monthlyVisits
  const engageable = Math.round(visits * ENGAGEABLE_RATE)
  const leads = Math.round((engageable * REAL_LEAD_CVR) / 100 * BOOST)
  const meetings = Math.round((leads * REAL_MEETING_CVR) / 100 * BOOST)
  const autoFollowed = Math.max(0, leads - meetings)
  const hoursSaved = meetings * HOURS_PER_MEETING + autoFollowed * HOURS_PER_FOLLOWUP
  const headcount = Math.round((hoursSaved / STANDARD_SDR_HOURS) * 10) / 10
  return {
    monthlyVisits: visits,
    monthlyEngageable: engageable,
    trafficSource: opts.traffic.source,
    confidence: opts.traffic.confidence,
    trancoRank: opts.traffic.details?.rank,
    expected: {
      meetingsPerMonth: meetings,
      autoFollowedLeadsPerMonth: autoFollowed,
      hoursSavedPerMonth: hoursSaved,
      hoursSavedAsHeadcount: headcount,
    },
    basis: {
      engageableRate: ENGAGEABLE_RATE,
      leadCvrPct: REAL_LEAD_CVR,
      meetingCvrPct: REAL_MEETING_CVR,
      boost: BOOST,
      hoursPerMeeting: HOURS_PER_MEETING,
      hoursPerFollowup: HOURS_PER_FOLLOWUP,
      standardSdrHoursPerMonth: STANDARD_SDR_HOURS,
      sourceLabel: SOURCE_LABEL,
    },
  }
}
