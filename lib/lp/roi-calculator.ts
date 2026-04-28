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
    hoursSavedPerSdrPerMonth: number
  }
  basis: {
    engageableRate: number
    leadCvrPct: number
    meetingCvrPct: number
    boost: number
    standardSdrHoursPerMonth: number
    sdrHoursSavedPct: number
    sourceLabel: string
  }
}

const ENGAGEABLE_RATE = 0.767
const REAL_LEAD_CVR = 0.27
const REAL_MEETING_CVR = 32.1
const BOOST = 1.18
const SDR_TIME_REDUCTION = 0.55
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
  const hoursSavedPerSdr = Math.round(STANDARD_SDR_HOURS * SDR_TIME_REDUCTION)
  return {
    monthlyVisits: visits,
    monthlyEngageable: engageable,
    trafficSource: opts.traffic.source,
    confidence: opts.traffic.confidence,
    trancoRank: opts.traffic.details?.rank,
    expected: {
      meetingsPerMonth: meetings,
      autoFollowedLeadsPerMonth: autoFollowed,
      hoursSavedPerSdrPerMonth: hoursSavedPerSdr,
    },
    basis: {
      engageableRate: ENGAGEABLE_RATE,
      leadCvrPct: REAL_LEAD_CVR,
      meetingCvrPct: REAL_MEETING_CVR,
      boost: BOOST,
      standardSdrHoursPerMonth: STANDARD_SDR_HOURS,
      sdrHoursSavedPct: SDR_TIME_REDUCTION,
      sourceLabel: SOURCE_LABEL,
    },
  }
}
