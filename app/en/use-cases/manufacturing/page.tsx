import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/manufacturing/ — English twin of /use-cases/manufacturing/.
// Faithful translation of the JA industry LP; numbers kept exact.

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/manufacturing/'

export const metadata: Metadata = {
  title: 'AI SDR for Manufacturing — Convert technical inquiries | Meeton ai',
  description:
    'An AI SDR for manufacturing. For specialized B2B inquiries — technical specs, quote requests, sample consultations — the AI handles first response and hands only promising leads to your technical IS / sales.',
  alternates: altLanguages('/use-cases/manufacturing/', 'en'),
  openGraph: {
    title: 'AI SDR for Manufacturing — Convert technical inquiries | Meeton ai',
    description: 'Bring an AI SDR to manufacturing\'s long, high-value sales. Automate from first response on technical inquiries to booking the meeting.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function ManufacturingUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="manufacturing"
      industryEn="Manufacturing"
      industryJa="製造業"
      accentColor="#3b6ff5"
      accentDeep="#1e3a8a"
      accentLight="#e8efff"
      accentGlow="rgba(59, 111, 245, 0.22)"
      eyebrow="USE CASE / MANUFACTURING"
      heroTitleLead="An AI SDR that turns"
      heroTitleAccent="technical inquiries into meetings."
      heroSub="Manufacturing B2B inquiries are highly specialized — technical specs, quotes, sample requests — and take time to handle. With Meeton ai, the AI organizes requirements on first response and hands only promising leads to your technical IS and sales."
      personaStatement="A manufacturer's web inquiries may be only 10 a month, yet one can become a deal worth tens of millions of yen. That's exactly why you can't afford to miss one. But staffing first response to technical questions around the clock isn't realistic. Meeton ai fills that gap."
      painsLead="You can't gauge the temperature of technical inquiries and catalog requests, so sales falls behind."
      pains={[
        {
          title: 'The first-response load of technical-spec inquiries',
          description: 'Material, tolerance, supported sizes, temperature range, applicable standards… Manufacturing inquiries are full of questions only an engineer can answer, so they stall at the sales desk. They squeeze technical-IS capacity and delay first response to promising leads.',
          metric: '24-72 hours',
          metricLabel: 'Traditional first-reply lead time',
        },
        {
          title: 'Lead loss from long cycles × low-frequency touchpoints',
          description: 'Manufacturing purchase cycles run six months to two years. In the gap between inquiry and serious discussion, nurture breaks off and the contact forgets your rep — a frequent occurrence. "One-off touchpoints" of sending a spec sheet or catalog don\'t lead to wins.',
          metric: '6-24 months',
          metricLabel: 'Purchase-consideration cycle',
        },
        {
          title: 'Missing time-zone inquiries from overseas and the regions',
          description: 'Manufacturing leads also come from overseas and regional customers. If an inquiry arrives after hours or on a holiday and you reply Monday morning, it has already flowed to a competitor. Speed to Lead determines the win probability.',
          metric: '+21%',
          metricLabel: 'Lift in meeting conversion with response within 5 min',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI converses in real time in your website chat. It learns product specs, catalog information, and standard specifications, and handles the first triage of technical inquiries.',
          industryAngle: 'Using product catalogs, technical datasheets, and standards-compliance tables as training data, the AI instantly answers basic technical questions like "Can this material handle it?" or "What\'s the temperature range?" It hands only requirement-defined leads to technical IS, cutting their workload by 30%.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'The AI replies to inquiry emails (quote requests, sample requests, technical questions). It judges meeting-conversion likelihood and alerts only on promising deals.',
          industryAngle: 'It gives a 24/7 first answer even to overseas / regional time-zone inquiries and late-night sample requests. The AI asks within the email "when, what quantity, for what use," assembles the requirements needed for a quote, and hands off to sales.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. It automates even three-way coordination among technical IS, sales, and the customer.',
          industryAngle: 'Technical consultations often require three-way meetings of "sales + technical IS + the customer\'s engineer." Meeton Calendar proposes the optimal slot across multiple calendars and can even manage factory-visit and sample-shipment schedules at the customer.',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Personalized delivery of technical materials, case studies, and catalogs matched to the visitor\'s interest segment (industry, application, material).',
          industryAngle: 'Through the long six-month-to-two-year cycle, the AI continuously presents case studies and technical materials matched to the customer\'s industry and application. As "a mechanism that won\'t be forgotten," it keeps delivering the one piece a returning lead should read now.',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'For visitors browsing technical materials and catalogs, the AI presents the best offer (sample request, technical consult, quote) matched to their application, industry, and traffic source. Even leads who never open the chat convert through on-site ads. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'Large manufacturers run Salesforce-based SFA. Auto-syncs leads, deals, and stakeholders.',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'The most widespread internal comms platform in manufacturing. Sends lead notifications and technical-consult assignments to Teams.',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'Adoption is growing as the CRM/MA for mid-size manufacturers. Ideal for tracking long-term nurture.',
        },
        {
          slug: 'google-calendar',
          name: 'Google Calendar',
          logo: '/integrations/05_Google_Calendar.png',
          reason: 'Auto-proposes the optimal meeting slot across the calendars of technical IS, sales, and the customer.',
        },
      ]}
      faqs={[
        {
          question: 'Can AI really handle manufacturing\'s specialized technical questions?',
          answer: 'The AI uses your product catalogs, technical datasheets, and standards-compliance tables as training data and can answer basic spec questions (material, tolerance, temperature range, supported sizes, etc.) accurately. For detailed specs requiring judgment or custom projects, the AI decides automatically and switches to handing off to technical IS. The design principle is to clearly separate "what AI should answer" from "what people should answer."',
        },
        {
          question: 'Is there a nurture effect even over manufacturing\'s long cycle (6–24 months)?',
          answer: 'Meeton Library remembers a visitor\'s past browsing history and interest segment and presents materials matched to that context even on a return visit six months or a year later. As "inside sales that won\'t be forgotten," it\'s designed so long cycles are exactly where the effect shows most.',
        },
        {
          question: 'Can it handle English inquiries from overseas?',
          answer: 'Meeton Chat / Meeton Email are multilingual, and the AI automatically detects the language and replies to inquiries in English, Chinese, and more. It solves the problem of missing time-zone inquiries from overseas and the regions.',
        },
        {
          question: 'How does form integration work for quote and sample requests?',
          answer: 'Meeton ai works in parallel with your existing website forms, and at the chat stage before form submission the AI asks "what quantity, use, and lead time." By the time the form is submitted, requirements arrive organized for sales, shortening the time to a quote.',
        },
        {
          question: 'Is there value in adopting it even with a small technical-IS team?',
          answer: 'It actually works best for small technical-IS teams. By having the AI organize requirements on first response, technical IS can focus only on "the advanced questions worth answering." Some adopters have achieved workload savings equivalent to one technical-IS headcount.',
        },
        {
          question: 'Can I keep my existing SFA / CRM (e.g., Salesforce)?',
          answer: 'It natively integrates with Salesforce / HubSpot, auto-syncing leads, deal information, and inquiry history. There\'s no need to replace your existing SFA.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('製造') || target.includes('manufactur') || target.includes('工業')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-manufacturing"
    />
  )
}
