import type { TrafficEstimate } from './traffic-estimate'

export type RoiCalc = {
  monthlyVisits: number
  monthlyEngageable: number
  trafficSource: TrafficEstimate['source']
  confidence: TrafficEstimate['confidence']
  trancoRank?: number
  expected: {
    leadsPerMonth: number
    meetingsPerMonth: number
    sdrHoursSavedPerMonth: number
  }
  basis: {
    engageableRate: number
    leadCvrPct: number
    meetingCvrPct: number
    boost: number
    sdrHeadcount: number
    sdrHoursSavedPct: number
    sourceLabel: string
  }
}

const ENGAGEABLE_RATE = 0.767
const REAL_LEAD_CVR = 0.27
const REAL_MEETING_CVR = 32.1
const BOOST = 1.18
const SDR_TIME_REDUCTION = 0.55
const SOURCE_LABEL = 'Meeton ai 導入企業4社の有能訪問者ベース実績(過去30日) + AI Landing Page × AI Email 上乗せ約18%'

const EMPLOYEE_TO_SDR: Record<string, number> = {
  '1-9': 1,
  '10-29': 1,
  '30-49': 2,
  '50-99': 3,
  '100-299': 5,
  '300-499': 8,
  '500-999': 12,
  '1000-2999': 18,
  '3000+': 30,
}

export function calculateRoi(opts: {
  traffic: TrafficEstimate
  industry?: string
  employees?: string
}): RoiCalc {
  const visits = opts.traffic.monthlyVisits
  const engageable = Math.round(visits * ENGAGEABLE_RATE)
  const sdrHc = EMPLOYEE_TO_SDR[opts.employees || ''] ?? 3
  const leads = Math.round((engageable * REAL_LEAD_CVR) / 100 * BOOST)
  const meetings = Math.round((leads * REAL_MEETING_CVR) / 100 * BOOST)
  const sdrHoursSaved = Math.round(160 * sdrHc * SDR_TIME_REDUCTION)
  return {
    monthlyVisits: visits,
    monthlyEngageable: engageable,
    trafficSource: opts.traffic.source,
    confidence: opts.traffic.confidence,
    trancoRank: opts.traffic.details?.rank,
    expected: {
      leadsPerMonth: leads,
      meetingsPerMonth: meetings,
      sdrHoursSavedPerMonth: sdrHoursSaved,
    },
    basis: {
      engageableRate: ENGAGEABLE_RATE,
      leadCvrPct: REAL_LEAD_CVR,
      meetingCvrPct: REAL_MEETING_CVR,
      boost: BOOST,
      sdrHeadcount: sdrHc,
      sdrHoursSavedPct: SDR_TIME_REDUCTION,
      sourceLabel: SOURCE_LABEL,
    },
  }
}
