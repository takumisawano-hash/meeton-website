import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/professional-services/ — English twin of
// /use-cases/professional-services/. Faithful translation; numbers kept exact.

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/professional-services/'

export const metadata: Metadata = {
  title: 'AI SDR for Professional Services — Convert inbound | Meeton ai',
  description:
    'An AI SDR for consulting and professional services. So partners and experts can focus on their core work, the AI handles first response on inbound inquiries and books meetings on their behalf.',
  alternates: altLanguages('/use-cases/professional-services/', 'en'),
  openGraph: {
    title: 'AI SDR for Professional Services — Convert inbound | Meeton ai',
    description: 'Partners focus on their core work (closing). Leave first response to AI — an AI SDR for professional services.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function ProfessionalServicesUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="professional-services"
      industryEn="Professional Services"
      industryJa="プロフェッショナルサービス"
      accentColor="#7c5cfc"
      accentDeep="#5b3fc8"
      accentLight="#f0ecfe"
      accentGlow="rgba(124, 92, 252, 0.22)"
      eyebrow="USE CASE / PRO SERVICES"
      heroTitleLead="Partners focus on core work."
      heroTitleAccent="AI handles first response."
      heroSub="Consulting, legal, accounting, tax, talent, PR — professional services where relationship selling is the essence. With Meeton ai, the AI handles first response on inbound inquiries and hands only promising deals to partners and experts."
      personaStatement="Partners want to focus on closing and advising existing clients. But when they delegate first replies to growing web inquiries to a secretary or junior, they either miss promising deals or get tied up by cold ones. Meeton ai is a mechanism that leaves that judgment and first response to AI."
      painsLead="Inquiries are diverse, so first response and triage take time."
      pains={[
        {
          title: 'Partners\' time is consumed by inbound handling',
          description: 'A partner\'s or expert\'s hourly value is tens of thousands of yen. Yet when their time goes to first-inquiry discovery — "what kind of project," "budget range," "current challenges" — the opportunity cost against their core work (closing, advising existing clients) is too high.',
          metric: '30-60 min',
          metricLabel: 'Traditional first-discovery time',
        },
        {
          title: 'Cold vs. promising deals aren\'t being sorted',
          description: 'Cold inquiries like "just want to consult" or "want to know your pricing" reach the same partner with the same weight as promising deals like "budget of 10 million, want to start within 3 months." Without sorting, first response to promising deals is delayed.',
          metric: '20%',
          metricLabel: 'Typical promising-deal rate',
        },
        {
          title: 'Can\'t balance the quality and volume of relationship selling',
          description: 'Because it depends on a single partner\'s capacity, you can\'t keep up with rising web leads. Add headcount and quality drops; protect quality and you can\'t handle the volume — a dilemma unique to professional services.',
          metric: '1 person-month+',
          metricLabel: 'Payroll burden when adding IS headcount',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI responds in real time in your website chat. It carefully discovers the inquiry\'s background, challenge, budget range, and timeline, and judges deal temperature automatically.',
          industryAngle: 'The AI handles the first response for consulting and licensed-professional inquiries. Cold "just consulting" requests get a materials guide; promising "want to start within 3 months" deals book directly into the partner\'s calendar. It concentrates the partner\'s time only on high-closing-value deals.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'AI replies to inquiry emails. It confirms deal background, budget, and timeline within the email and judges meeting-conversion likelihood.',
          industryAngle: 'The AI also handles first replies to email inquiries arriving via referrals. It naturally discovers — "May I ask a few things before our meeting?" — so by the time the partner enters the meeting, the key points are already organized.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. It automates coordination across multiple partners and multiple client stakeholders.',
          industryAngle: 'It handles cases where the client brings several decision-makers. The partner side also needs to assign managers and associates, and the AI fully automates the scheduling of 4–6 people.',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Based on the visitor\'s industry and challenge theme, it auto-recommends the best track-record materials, whitepapers, and case studies.',
          industryAngle: 'It presents a track-record library by specialty and industry, optimized to the visitor. Clients can discover "is there a case similar to mine?" on their own, improving conversion to a booked meeting.',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'For visitors browsing your track-record and specialty pages, the AI presents the best offer (free consultation, case-study download) matched to their challenge theme, industry, and traffic source. Prospects who never open the chat still convert through on-site ads. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'A leading CRM for consulting and licensed professionals. Centrally manages clients, deals, and touchpoints.',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'Instant info-sharing among partners and managers. Real-time notification of promising deals.',
        },
        {
          slug: 'google-calendar',
          name: 'Google Calendar',
          logo: '/integrations/05_Google_Calendar.png',
          reason: 'Auto-proposes the optimal slot across the calendars of partners, managers, and the client\'s stakeholders.',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'Standard at enterprise consultancies and large professional firms. Unifies internal comms and client meetings.',
        },
      ]}
      faqs={[
        {
          question: 'This is an industry where partners value relationships. Won\'t AI handling first response hurt the customer experience?',
          answer: 'The purpose of leaving first discovery to AI is to let partners focus on "high-value conversations." Meeton Chat confirms deal background with polite language and immediately hands promising deals to a partner. Cold inquiries get materials and a resource guide, maintaining the right distance. In many cases, satisfaction actually rises versus "slow first response" or "a secretary responding mechanically."',
        },
        {
          question: 'How do you sort cold "just want to consult" inquiries from promising deals?',
          answer: 'During the inquiry, Meeton Chat confirms "budget range," "timing," "current challenges," and "decision-maker" through natural conversation and computes a deal score automatically. Only inquiries above the threshold book directly into the partner\'s calendar; the rest go onto a materials and nurture path.',
        },
        {
          question: 'Consulting involves highly confidential discussions. Is security adequate?',
          answer: 'Meeton ai is operated to ISMS / SOC 2-aligned designs and handles confidential information. With configuration, you can build a flow that "skips AI handling for confidential deals and hands directly to a partner." See the security page for details.',
        },
        {
          question: 'In an organization with multiple partners, how is deal assignment handled?',
          answer: 'You can set auto-assignment rules to the best-fit partner based on inquiry content (industry, theme, region). Slack / HubSpot notifications also go directly to the assigned partner. It eliminates the "who will see this?" uncertainty.',
        },
        {
          question: 'Can it handle leads via referrals?',
          answer: 'Meeton Email gives AI replies to inquiry emails and confirms the information needed for meeting conversion within the email. Even for referral leads, by the time the partner enters the meeting, "budget, timeline, stakeholders" are organized.',
        },
        {
          question: 'Can it be used for licensed professions (lawyers, accountants, tax accountants)?',
          answer: 'Yes. It\'s widely used for first response to new inquiries for licensed professionals (retainer contracts, spot consultations, seminar-sourced). It enables instant response to frequent questions like "I\'d like to book a consultation," "what are your fees," "what past cases have you handled," and reliable handoff of promising deals.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('コンサル') || target.includes('consult') || target.includes('士業') || target.includes('professional') || target.includes('プロフェッショナル')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-professional-services"
    />
  )
}
