import type { TrafficEstimate } from './traffic-estimate'

export type RoiCalc = {
  monthlyVisits: number
  trafficSource: TrafficEstimate['source']
  confidence: TrafficEstimate['confidence']
  baseline: {
    leadsPerMonth: number
    leadCvrPct: number
    meetingsPerMonth: number
    meetingCvrPct: number
    sdrHoursPerMonth: number
  }
  withMeetonAi: {
    leadsPerMonth: number
    leadCvrPct: number
    meetingsPerMonth: number
    meetingCvrPct: number
    sdrHoursPerMonth: number
  }
  uplift: {
    addLeadsPerMonth: number
    addMeetingsPerMonth: number
    sdrHoursSaved: number
    leadCvrLiftPct: number
    meetingCvrLiftPct: number
  }
  assumptions: {
    industry?: string
    employees?: string
    sdrHeadcount: number
  }
}

const INDUSTRY_BASE_LEAD_CVR: Record<string, number> = {
  '金融': 0.6,
  '物流': 0.9,
  '製造': 1.0,
  'IT': 1.4,
  '商社': 0.8,
  '小売': 1.1,
  '建設': 0.7,
  '医療': 0.8,
  '不動産': 1.5,
  '教育': 1.2,
  'コンサル': 1.3,
  '広告マーケ': 1.6,
  'エネルギー': 0.7,
  '食品': 0.9,
  default: 1.0,
}

const INDUSTRY_BASE_MEETING_CVR: Record<string, number> = {
  '金融': 6,
  '物流': 9,
  '製造': 10,
  'IT': 12,
  '商社': 8,
  '小売': 7,
  '建設': 9,
  '医療': 7,
  '不動産': 11,
  '教育': 8,
  'コンサル': 14,
  '広告マーケ': 13,
  'エネルギー': 8,
  '食品': 8,
  default: 9,
}

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

const MEETON_AI_LEAD_LIFT = 1.85
const MEETON_AI_MEETING_LIFT = 1.45
const MEETON_AI_SDR_TIME_REDUCTION = 0.55

function pct(x: number): number {
  return Math.round(x * 10) / 10
}

export function calculateRoi(opts: {
  traffic: TrafficEstimate
  industry?: string
  employees?: string
}): RoiCalc {
  const { traffic, industry, employees } = opts
  const visits = traffic.monthlyVisits
  const leadCvr = INDUSTRY_BASE_LEAD_CVR[industry || 'default'] ?? INDUSTRY_BASE_LEAD_CVR.default
  const meetingCvr = INDUSTRY_BASE_MEETING_CVR[industry || 'default'] ?? INDUSTRY_BASE_MEETING_CVR.default
  const sdrHc = EMPLOYEE_TO_SDR[employees || ''] ?? 3

  const leads = Math.round((visits * leadCvr) / 100)
  const meetings = Math.round((leads * meetingCvr) / 100)
  const sdrBaseHours = Math.round(160 * sdrHc)

  const upliftedLeadCvr = pct(leadCvr * MEETON_AI_LEAD_LIFT)
  const upliftedMeetingCvr = pct(meetingCvr * MEETON_AI_MEETING_LIFT)
  const upliftedLeads = Math.round((visits * upliftedLeadCvr) / 100)
  const upliftedMeetings = Math.round((upliftedLeads * upliftedMeetingCvr) / 100)
  const upliftedSdrHours = Math.round(sdrBaseHours * (1 - MEETON_AI_SDR_TIME_REDUCTION))

  return {
    monthlyVisits: visits,
    trafficSource: traffic.source,
    confidence: traffic.confidence,
    baseline: {
      leadsPerMonth: leads,
      leadCvrPct: pct(leadCvr),
      meetingsPerMonth: meetings,
      meetingCvrPct: pct(meetingCvr),
      sdrHoursPerMonth: sdrBaseHours,
    },
    withMeetonAi: {
      leadsPerMonth: upliftedLeads,
      leadCvrPct: upliftedLeadCvr,
      meetingsPerMonth: upliftedMeetings,
      meetingCvrPct: upliftedMeetingCvr,
      sdrHoursPerMonth: upliftedSdrHours,
    },
    uplift: {
      addLeadsPerMonth: upliftedLeads - leads,
      addMeetingsPerMonth: upliftedMeetings - meetings,
      sdrHoursSaved: sdrBaseHours - upliftedSdrHours,
      leadCvrLiftPct: pct(upliftedLeadCvr - leadCvr),
      meetingCvrLiftPct: pct(upliftedMeetingCvr - meetingCvr),
    },
    assumptions: {
      industry,
      employees,
      sdrHeadcount: sdrHc,
    },
  }
}
