import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/it/ — English twin of /use-cases/it/. Faithful translation
// of the JA industry LP; numbers kept exact. Renders through the shared
// (lang-aware) UseCasePageClient with lang="en".

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/it/'

export const metadata: Metadata = {
  title: 'AI SDR for IT Services & SIers — Turn technical inquiries into meetings | Meeton ai',
  description:
    'An AI SDR for system integrators, contract development, and IT-services companies. Meeton ai answers deep technical questions about environments, scope, and estimate assumptions in 5 seconds, and automates everything from requirements discovery to booking meetings with an engineer in the room.',
  alternates: altLanguages('/use-cases/it/', 'en'),
  openGraph: {
    title: 'AI SDR for IT Services & SIers — Turn technical inquiries into meetings | Meeton ai',
    description: 'An AI SDR automates lead-to-meeting conversion for SIers and IT-services companies. Built for deep technical questions and requirements discovery.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function ITUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="it"
      industryEn="IT Services"
      industryJa="IT・SIer"
      accentColor="#4f46e5"
      accentDeep="#3730a3"
      accentLight="#eceafd"
      accentGlow="rgba(79, 70, 229, 0.22)"
      eyebrow="USE CASE / IT SERVICES"
      heroTitleLead="An AI SDR that qualifies IT-services leads"
      heroTitleAccent="from requirements discovery to a booked meeting."
      heroSub="Supported environments, scope, estimate assumptions — inquiries to IT-services companies are technical from the very first question. Meeton ai responds in 5 seconds, hears out requirements, current environment, and timeline, and automatically drives promising deals to a meeting with an engineer in the room."
      personaStatement="IT-services leads span a huge temperature range — from 'still at the concept stage' consultations to 'RFP imminent' concrete deals. Meeton ai gauges the evaluation stage through conversation, nurtures early-stage leads, and books concrete deals directly onto sales' and engineers' calendars."
      painsLead="Inquiries are technically deep, yet the first response stalls between sales and SEs."
      pains={[
        {
          title: 'First response to deep, estimate-ready technical questions',
          description: '"Which environments do you support?" "Can you integrate with our core systems?" "What are the assumptions behind a ballpark estimate?" — inquiries to IT-services firms are technical from the first question. Scenario-based chatbots can\'t answer, and while sales checks with an SE, the first response slips and interest cools.',
          metric: '30-60 min',
          metricLabel: 'Matching & discovery time per inquiry',
        },
        {
          title: 'Leads with vague requirements left unattended',
          description: '"Still at the concept stage" or "pre-requirements" inquiries get deprioritized and sit without follow-up. By the time requirements firm up and an RFP goes out, the competitor who stayed in touch through the evaluation gets named — and you don\'t even make the bidding shortlist.',
          metric: '3-9 months',
          metricLabel: 'Evaluation period from concept to RFP',
        },
        {
          title: 'Direct leads buried under partner-channel deals',
          description: 'When partner-channel deals from cloud vendors and manufacturers dominate revenue, the response setup for direct leads from your own site comes last. Night and weekend inquiries wait until the next business day, and leads mid-comparison flow to faster-responding competitors.',
          metric: 'Nights & weekends',
          metricLabel: 'When responses slip to the next business day',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI converses in real time with leads who visit your site. Carrying the context of their downloads and video views, it answers deep product questions concretely.',
          industryAngle: '"Supported environments, integration track record, estimate assumptions" — it answers the deep technical questions unique to IT services, grounded only in your official information (service materials, case studies, FAQs). Along the way it hears out current environment, requirements, and timeline, identifying in-market buyers early.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'For inquiry emails, the AI replies in place of inside sales and books the meeting. Connected to Slack and HubSpot notifications.',
          industryAngle: '"Could you detail the environment?" "Can we confirm the estimate assumptions?" — the AI replies instantly, even after hours, to the follow-up emails that arrive after an inquiry. It keeps deals warm that used to cool while waiting on an SE\'s confirmation.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. The meeting is confirmed the moment the buyer picks an open slot.',
          industryAngle: 'It eliminates the "first sales, then again with an engineer" double take. From the first meeting, the AI proposes the optimal slot across both sales\' and engineers\' calendars and automatically assembles a meeting with the engineer in the room.',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Based on a visitor\'s industry, role, and browsing history, it personalizes the best materials, case studies, and videos. It keeps returning leads warm.',
          industryAngle: 'For pre-requirements, information-gathering leads, it serves case studies, service materials, and technical resources by challenge theme. Across the long evaluation from concept to RFP, it keeps nurturing with context on every return visit.',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'Matched to the service page being viewed (cloud migration / contract development / managed services) and the traffic source, the AI presents the best offer (case-study download / free consultation). Visitors who never open the chat still convert into leads through on-site ads. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'The internal comms standard at IT-services companies. Notifies sales and SE channels of meeting bookings and hot leads in real time.',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'The leading CRM/MA for IT-services companies building up inbound. Auto-syncs each lead\'s requirements and evaluation stage to Contacts / Deals.',
        },
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'The standard CRM at major SIers. Manages partner-channel and direct leads and deals in a single pipeline.',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'The standard communication platform at enterprise SIers. Unifies internal comms and sales meetings.',
        },
      ]}
      faqs={[
        {
          question: 'Can the AI answer technical questions like "supported environments" or "integration with other systems"?',
          answer: 'Yes. Meeton Chat uses your service materials, case studies, FAQs, and technical documentation as training data, and answers grounded only in your official information. For questions it can\'t answer, it decides to say "I\'ll check with our team" and guides straight to a meeting booking — keeping the risk of incorrect technical answers low.',
        },
        {
          question: 'Is it effective for "information-gathering" inquiries where requirements aren\'t set yet?',
          answer: 'Yes. Meeton Chat gauges the evaluation stage through conversation, and for concept-stage leads, Meeton Library serves the right case studies and service materials for ongoing nurture. The moment requirements firm up, it switches to booking a meeting — so you stay in touch before the RFP ever goes out.',
        },
        {
          question: 'Can it automatically coordinate meetings with an engineer (SE) in the room?',
          answer: 'Yes. Meeton Calendar proposes the optimal slot across both sales\' and engineers\' calendars, so you can assemble a meeting with the engineer present from the very first session. It removes the "sales discovery first, then again with an engineer" double take and shortens the lead time to a qualified meeting.',
        },
        {
          question: 'Most of our deals come through partners — is there value in deploying it on our direct-sales site?',
          answer: 'Yes. Direct leads from your own site carry higher margins than partner-channel deals and let you build a direct relationship with the customer. Meeton ai responds within 5 seconds, 24/7/365 — including nights and weekends — so even a small direct-sales team has a catch-all that never drops a lead.',
        },
        {
          question: 'How does it handle inquiries asking for a ballpark estimate?',
          answer: 'Meeton Chat hears out the assumptions an estimate needs (current environment, scale, scope, timeline) through conversation, and shares your pricing structure and similar case studies within the bounds of your official information. Deals that need an individual estimate get booked directly onto sales\' calendars with the discovery notes already organized.',
        },
        {
          question: 'Do you have a track record in the IT & cloud industry?',
          answer: 'Yes. At G-gen Co., Ltd., a Google Cloud / Google Workspace specialist, deploying Meeton ai doubled monthly SQLs from about 20 to 41-48, with an 80% meeting-conversion rate. It successfully replaced the 30-60 minutes per inquiry previously spent on matching, discovery, and scheduling.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('it') || target.includes('クラウド') || target.includes('cloud') || target.includes('sier')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-it"
    />
  )
}
