import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/education/ — English twin of /use-cases/education/. Faithful
// translation of the JA industry LP; numbers kept exact. Renders through the
// shared (lang-aware) UseCasePageClient with lang="en".

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/education/'

export const metadata: Metadata = {
  title: 'AI SDR for Education & Training — Turn resource downloads into meetings | Meeton ai',
  description:
    'An AI SDR for corporate training, e-learning, and school businesses. Meeton ai responds in 5 seconds to leads sales can\'t chase after a download, and automates long-cycle nurture through to booked meetings — built for fiscal-year budget evaluations.',
  alternates: altLanguages('/use-cases/education/', 'en'),
  openGraph: {
    title: 'AI SDR for Education & Training — Turn resource downloads into meetings | Meeton ai',
    description: 'An AI SDR automates lead-to-meeting conversion for corporate training, e-learning, and school businesses. Built for post-download follow-up and long, budget-cycle evaluations.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function EducationUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="education"
      industryEn="Education & Training"
      industryJa="教育・研修"
      accentColor="#9333ea"
      accentDeep="#7e22ce"
      accentLight="#f5ecfd"
      accentGlow="rgba(147, 51, 234, 0.22)"
      eyebrow="USE CASE / EDUCATION"
      heroTitleLead="An AI SDR that books education & training leads,"
      heroTitleAccent="even across fiscal years."
      heroSub="Corporate training, e-learning, and school businesses. Downloads pile up but sales can't chase them all, the HR evaluator and the trainees are different people, and fiscal-year budgets stretch evaluations out. Meeton ai responds in 5 seconds and keeps leads warm all the way to a booked meeting at decision time."
      personaStatement="A training purchase rides the fiscal-year budget cycle. From the moment an HR manager downloads a brochure, it takes months of next-period budgeting and internal approval before an order. Having sales chase that whole stretch by hand isn't realistic. Throughout that period, Meeton ai keeps surfacing information matched to their interests and assembles the meeting when decision time comes."
      painsLead="Downloads keep piling up, but they vanish without ever becoming meetings."
      pains={[
        {
          title: 'Sales can\'t keep up with post-download leads',
          description: 'Curriculum and pricing downloads generate leads in volume, yet first contact slips past sales and inside-sales capacity. HR managers do their research between tasks and on nights and weekends — by the next business day\'s phone call, they\'re already deep into comparing vendors.',
          metric: 'Nights & weekends',
          metricLabel: 'When HR research concentrates',
        },
        {
          title: 'The evaluator (HR) and the trainees (the field) are different people',
          description: 'HR and L&D download the materials, field employees take the training, and department heads or executives approve the budget. Even for the same "training," each role needs different information. One brochure and one phone call can\'t carry every stakeholder to consensus.',
          metric: '3 layers',
          metricLabel: 'HR, the field, and approvers',
        },
        {
          title: 'Fiscal-year budget cycles stretch evaluations out',
          description: 'Training budgets are set once per fiscal year, so deals constantly stall at "no budget this period — we\'ll revisit next year." You need nurture that holds interest until budgeting season months or a year away, and manual follow-up inevitably lets leads slip through.',
          metric: 'Once a year',
          metricLabel: 'Training-budget planning cycle',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI converses in real time with leads who visit your site. Carrying the context of their downloads and video views, it answers deep product questions concretely.',
          industryAngle: '"What\'s in the curriculum?" "How is pricing structured?" "Do you run it online?" "Can we use subsidies?" — it answers HR evaluators\' questions instantly, grounded only in your official information. Evaluators who would have left after a download get onto the booking path on the spot.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'For inquiry emails, the AI replies in place of inside sales and books the meeting. Connected to Slack and HubSpot notifications.',
          industryAngle: 'For the emails that follow a download — "we\'d like a quote," "we need materials for internal approval," "can we discuss dates" — the AI replies instantly even after hours. Nothing slips through even in the fiscal year-end and new-period inquiry rush.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. The meeting is confirmed the moment the buyer picks an open slot.',
          industryAngle: 'For meetings where HR, field managers, and approvers all attend, it proposes the optimal slot automatically from everyone\'s calendars. The AI also handles scheduling for info sessions and demo lessons, eliminating the back-and-forth that cools leads down.',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Based on a visitor\'s industry, role, and browsing history, it personalizes the best materials, case studies, and videos. It keeps returning leads warm.',
          industryAngle: 'Through an evaluation that spans fiscal years, it presents the one piece to read now, matched to the HR manager\'s topic of interest (tiered training / DX training / subsidies). Even when they return during next period\'s budgeting season, the AI remembers the context.',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'The AI presents the best offer matched to the training theme being browsed (new-hire training / management training / e-learning) and the traffic source. HR managers who never open the chat still convert into leads through on-site ads. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'The leading CRM/MA for training and education businesses. Auto-syncs download leads\' activity history and deals to Contacts / Deals, so evaluations that span fiscal years never get lost.',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'Instant Slack notifications for meeting bookings and hot leads. Even a small sales team never falls behind on first response to promising leads.',
        },
        {
          slug: 'zoom',
          name: 'Zoom',
          logo: '/integrations/07_Zoom.png',
          reason: 'The de facto tool for online training and info sessions. The moment the AI books, it issues a Zoom link and sends invites to all participants.',
        },
        {
          slug: 'google-calendar',
          name: 'Google Calendar',
          logo: '/integrations/05_Google_Calendar.png',
          reason: 'Proposes the optimal slot across sales, instructor, and HR calendars automatically. Even complex scheduling for info sessions and demo lessons is automated.',
        },
      ]}
      faqs={[
        {
          question: 'Does it work on leads that vanish after a download because sales can\'t chase them?',
          answer: 'Yes. From the moment of a download or site visit, the AI responds in 5 seconds and covers leads 24/7/365, regardless of sales capacity. At EdulinX, a leading corporate-training provider, the meeting-conversion rate for leads that come through Meeton ai exceeds 60%. The design carries leads that used to stop at a download all the way to a booked meeting.',
        },
        {
          question: 'The evaluator is HR while the trainees are field employees. Can it handle stakeholders in different roles?',
          answer: 'It can. Meeton Chat naturally confirms a visitor\'s role (HR, the field, leadership) in conversation and presents information suited to each. Meeton Library tailors materials by role and topic of interest, and Meeton Calendar automates scheduling for meetings where HR, field managers, and approvers all attend.',
        },
        {
          question: 'Can it keep leads warm even through long, fiscal-year budget-cycle evaluations?',
          answer: 'Yes. Meeton Library continuously learns a visitor\'s browsing history and topics of interest, and on a return visit presents the materials best suited to that moment. Even deals that stalled at "no budget this period" are picked up with full context by the AI when the lead returns during next period\'s budgeting season, so it\'s an especially strong fit for evaluations that span fiscal years.',
        },
        {
          question: 'Can it answer questions about subsidies (such as government training subsidies)?',
          answer: 'Meeton Chat uses your official information (subsidy guidance pages, FAQs, price lists, curriculum materials) as training data and answers with grounding. When it can\'t answer, it decides to say "I\'ll check with our team" and switches immediately to a booking path. It never fabricates inaccurate answers about subsidy programs.',
        },
        {
          question: 'Can e-learning and school businesses use it too?',
          answer: 'Yes. Beyond corporate training, it handles brochure requests and info-session bookings for e-learning and school businesses. It installs with one JS tag in about 5 minutes, requires no scenario design, and answers prospective students\' frequent questions — pricing, curriculum, course dates — 24/7/365.',
        },
        {
          question: 'Can I keep my existing CRM (HubSpot / Salesforce) and Zoom?',
          answer: 'No replacement needed. Meeton ai natively integrates with HubSpot, Salesforce, Slack, Zoom, and Google Calendar, so lead info, deals, and notifications flow automatically into your existing tools. The moment a meeting is booked, issuing the Zoom link and inviting participants completes automatically.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('研修') || target.includes('教育') || target.includes('人材') || (cs.tags || []).some((t) => t.toLowerCase().includes('研修'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-education"
    />
  )
}
