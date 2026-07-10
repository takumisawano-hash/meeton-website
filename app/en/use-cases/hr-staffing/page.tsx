import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/hr-staffing/ — English twin of /use-cases/hr-staffing/.
// Faithful translation of the JA industry LP; numbers kept exact. Renders
// through the shared (lang-aware) UseCasePageClient with lang="en".

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/hr-staffing/'

export const metadata: Metadata = {
  title: 'AI SDR for HR & Staffing — Convert nights-and-weekends inquiries | Meeton ai',
  description:
    'An AI SDR for recruiting, staffing, hiring support, and training firms. Meeton ai responds in 5 seconds, 24/7, to both the client and candidate funnels and automates everything from after-hours inquiries to booked interviews and meetings.',
  alternates: altLanguages('/use-cases/hr-staffing/', 'en'),
  openGraph: {
    title: 'AI SDR for HR & Staffing — Convert nights-and-weekends inquiries | Meeton ai',
    description: 'Responds to nights-and-weekends inquiries in 5 seconds. An AI SDR automates meeting conversion across both the client and candidate funnels.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function HRStaffingUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="hr-staffing"
      industryEn="HR & Staffing"
      industryJa="人材"
      accentColor="#d97706"
      accentDeep="#b45309"
      accentLight="#fbf0dc"
      accentGlow="rgba(217, 119, 6, 0.22)"
      eyebrow="USE CASE / HR & STAFFING"
      heroTitleLead="An AI SDR that converts HR & staffing leads —"
      heroTitleAccent="nights and weekends included."
      heroSub="Recruiting, staffing, hiring support, corporate training — an HR business runs a two-sided funnel of client companies and candidates. Inquiries peak at night and on weekends, and prospects compare multiple agencies at once. Meeton ai responds in 5 seconds and automatically drives all the way to a booked interview or sales meeting."
      personaStatement="Candidates are still employed — they can only move at night and on weekends. Corporate HR is buried in interviews and daily work during business hours. If you call back the next business day, both the deal and the candidate flow to the agency that replied first. Meeton ai is the system that takes over that first response with AI, 24/7."
      painsLead="Registrations and job orders are up, but they're not turning into interviews or meetings."
      pains={[
        {
          title: 'Inquiries peak outside business hours',
          description: 'Candidates job-hunt at night and on weekends while still employed. Client-side inquiries also tend to arrive after hiring meetings, in the late afternoon or later. By the time you call back the next business day, a competing agency has already made contact.',
          metric: 'Nights & weekends',
          metricLabel: 'Inquiry peak hours',
        },
        {
          title: 'Simultaneous comparison against other agencies',
          description: 'Candidates register with multiple recruiting agencies at once, and companies compare several firms in parallel as a matter of course. The first company to send a meaningful reply wins the interview or the job order. A few hours of first-response delay becomes lost opportunity, one to one.',
          metric: '5 sec',
          metricLabel: 'Speed-to-Lead benchmark',
        },
        {
          title: 'Triaging the two-sided client × candidate funnel',
          description: 'A company that wants to hire and a candidate who wants to change jobs need completely different questions and next actions. Yet inquiries land in the same inbox, and triage plus first response depend on manual work by sales reps and career advisors.',
          metric: 'Two-sided',
          metricLabel: 'Client × candidate funnels',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI converses in real time with leads who visit your site. Carrying the context of their downloads and video views, it answers deep product questions concretely.',
          industryAngle: 'HR managers ask about "fee structure, success fees, covered roles"; candidates ask about "job details and how interviews work" — the AI answers both sides instantly. It detects from conversational context whether it\'s a company or a candidate and routes each to the right booking path. It never stops at night or on weekends.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'For inquiry emails, the AI replies in place of inside sales and books the meeting. Connected to Slack and HubSpot notifications.',
          industryAngle: 'The AI replies instantly, even after hours, to job-order requests and post-registration questions. Exchanges like "please send the job requirements" or "I\'d like to confirm conditions before the interview" are handled by the AI, keeping leads warm before sales reps and career advisors step in.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. The meeting is confirmed the moment the buyer picks an open slot.',
          industryAngle: 'It automates scheduling for career interviews and client hearings. It presents open slots including the nights and weekends when candidates can actually move, and the booking is confirmed the moment they pick one. It structurally eliminates "losing to another agency during scheduling back-and-forth."',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Based on a visitor\'s industry, role, and browsing history, it personalizes the best materials, case studies, and videos. It keeps returning leads warm.',
          industryAngle: 'It serves candidates career-change stories and know-how by role and industry, and serves companies materials on hiring methods and fee structures. For each side of the two-sided funnel, the AI presents the one piece to read now and keeps returning leads warm.',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'It reads a visitor\'s position from the pages they browse (job listings / career know-how / services for employers) and tailors the offer — a free career consultation for candidates, a hiring consultation for companies. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'The CRM/MA spreading fast among HR and hiring-support firms. Auto-syncs client-lead and candidate activity history to Contacts / Deals.',
        },
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'The standard CRM at major staffing companies. Syncs job orders, client companies, and candidate info via native integration.',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'Grasp hot leads that arrive at night or on weekends instantly via Slack notifications, and act on them first thing next morning.',
        },
        {
          slug: 'zoom',
          name: 'Zoom',
          logo: '/integrations/07_Zoom.png',
          reason: 'The standard for online career interviews and client hearings. The moment the AI books, it issues a Zoom link and sends the invite.',
        },
      ]}
      faqs={[
        {
          question: 'Can it handle the inquiries that concentrate at night and on weekends?',
          answer: 'Yes. Meeton ai runs 24/7 and makes the first response to an inquiry in 5 seconds. Even on weekday nights and weekends when candidate registrations peak, the AI completes everything from qualification to interview booking, so you secure the touchpoint without waiting for a next-business-day callback.',
        },
        {
          question: 'Can it triage both job orders from companies and candidate registrations through one entry point?',
          answer: 'Yes. Meeton Chat detects from conversational context whether it\'s "a company considering hiring" or "a candidate considering a job change," and automatically switches to the qualification flow and booking path suited to each. Handoffs can also be split — client leads to sales, candidates to a career advisor\'s interview slots.',
        },
        {
          question: 'Can it give us a speed edge when prospects compare multiple agencies at once?',
          answer: 'In the HR industry, registering with several agencies and comparing firms in parallel is the norm, and the first company to make a meaningful touchpoint tends to get chosen. Meeton ai responds with a 5-second first move and automatically completes the interview or meeting booking, letting you outpace competitors who respond "the next business day."',
        },
        {
          question: 'Will AI-driven responses hurt the candidate experience?',
          answer: 'Meeton Chat is generative-AI based and responds in natural dialogue grounded in your official information (service details, how interviews work, covered roles, and so on). Unlike a scenario bot\'s mechanical branching, it understands the context of a question, and rather than forcing an answer it can\'t give, it switches to a handoff to your team.',
        },
        {
          question: 'Can I keep my existing CRM/SFA (HubSpot / Salesforce)?',
          answer: 'No replacement needed. Meeton ai natively integrates with HubSpot, Salesforce, and Slack, so client-lead and candidate info, interview bookings, and notifications flow automatically into your existing tools.',
        },
        {
          question: 'Do you have a track record in the HR industry?',
          answer: 'Yes. At EdulinX, which runs HR and corporate-training businesses, the meeting-conversion rate for leads that come through Meeton ai exceeds 60%. The ability to hand early-stage visitors to sales already nurtured by the AI is especially valued in the HR and training space.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('人材') || target.includes('研修') || target.includes('hr') || (cs.tags || []).some((t) => t.toLowerCase().includes('人材'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-hr-staffing"
    />
  )
}
