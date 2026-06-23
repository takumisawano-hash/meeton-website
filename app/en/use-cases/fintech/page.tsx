import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/fintech/ — English twin of /use-cases/fintech/. Faithful
// translation of the JA industry LP; numbers kept exact.

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/fintech/'

export const metadata: Metadata = {
  title: 'AI SDR for FinTech — Compliance-aware meeting conversion | Meeton ai',
  description:
    'An AI SDR for FinTech and financial B2B. It converts technical buyers\' leads into meetings while keeping a compliance-aware tone, and even checks regulatory eligibility before the meeting.',
  alternates: altLanguages('/use-cases/fintech/', 'en'),
  openGraph: {
    title: 'AI SDR for FinTech — Compliance-aware meeting conversion | Meeton ai',
    description: 'A FinTech-specialized AI SDR that converts technical buyers\' leads into meetings while maintaining a compliance-aware tone.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function FintechUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="fintech"
      industryEn="FinTech"
      industryJa="フィンテック"
      accentColor="#10b981"
      accentDeep="#065f46"
      accentLight="#e0f6ec"
      accentGlow="rgba(6, 95, 70, 0.22)"
      eyebrow="USE CASE / FINTECH"
      heroTitleLead="An AI SDR that stays compliant"
      heroTitleAccent="and grows only your meetings."
      heroSub="Lead handling in FinTech and financial B2B must satisfy three things at once: compliance, eligibility checks, and technical depth. Meeton ai maintains a compliant tone and, before the meeting, has the AI confirm everything including regulatory eligibility."
      personaStatement="FinTech inquiries mix regulatory and technical questions — business systems, payment infrastructure, data integration. To convert a lead, you must avoid careless wording while earning trust with technical depth. Meeton ai maintains that tone by design."
      painsLead="It's hard to tell information-gatherers from serious evaluators."
      pains={[
        {
          title: 'Maintaining a compliance-aware tone',
          description: 'With expressions like "the best," "absolute," and "guaranteed" being off-limits under the Financial Instruments and Exchange Act and the Act against Unjustifiable Premiums, ensuring expression compliance in web inquiry handling is not easy. Mistakes happen with scenario bots and human operators alike.',
          metric: '15+',
          metricLabel: 'Categories of expressions requiring caution',
        },
        {
          title: 'Pre-checking regulatory eligibility',
          description: 'For products aimed at financial institutions, whether you can offer depends on the customer\'s regulatory status (institution type, license, regional requirements). You need to screen in advance to avoid the inefficiency of discovering "we can\'t serve you" only on the sales floor.',
          metric: '30%+',
          metricLabel: 'Share of deals found ineligible in advance',
        },
        {
          title: 'Responsiveness with deep answers to technical buyers',
          description: 'FinTech B2B buyers are tech leads, PdMs, and direct reports to CTOs. The depth of technical questions — API specs, auth flows, SLAs, redundancy, encryption methods — is high, and shallow answers get you cut from evaluation instantly.',
          metric: '8-15 min',
          metricLabel: 'Buyer\'s average technical-evaluation time',
        },
      ]}
      modules={[
        {
          badge: 'AI Chat',
          name: 'Meeton Live',
          href: '/features/ai-chat/',
          description: 'The AI converses in real time. Train it on compliance-audited expression prompts and your regulation-related FAQs to keep the tone consistent.',
          industryAngle: 'It builds an NG-expression list based on the Financial Instruments and Exchange Act and the Premiums Act into the AI\'s system prompt to prevent inappropriate wording. It also answers financial-institution technical questions (API, SLA, encryption) in depth, grounded in your technical specifications.',
        },
        {
          badge: 'AI Email',
          name: 'Meeton Email',
          href: '/features/ai-email/',
          description: 'AI replies to inquiry emails. Based on compliance-audited templates, it confirms technical specs and regulatory eligibility.',
          industryAngle: 'The AI confirms the customer\'s business status (bank, securities, insurance, FinTech, operating company) and runs eligibility screening as a first pass. It prevents wasting sales time on ineligible deals before the meeting.',
        },
        {
          badge: 'AI Calendar',
          name: 'Meeton Calendar',
          href: '/features/meetings/',
          description: 'Integrated with Google Calendar / MS Teams / Zoom. It automates even three-way coordination among technical IS, compliance, and the customer\'s engineer.',
          industryAngle: 'FinTech B2B meetings standardly involve a three-way setup of "sales + technical + compliance." Meeton Calendar coordinates multiple internal stakeholders plus the customer end to end.',
        },
        {
          badge: 'AI Offer',
          name: 'Meeton Library',
          href: '/features/ai-library/',
          description: 'Auto-recommends case studies, whitepapers, and regulation-compliance documents matched to the visitor\'s sector (bank, securities, insurance).',
          industryAngle: 'It serves bank case studies, insurance use cases, and regulatory-compliance whitepapers selectively by the visitor\'s sector. It creates a path for technical buyers to find deep information themselves during the evaluation.',
        },
      ]}
      integrations={[
        {
          slug: 'salesforce',
          name: 'Salesforce Financial Services Cloud',
          logo: '/integrations/01_Salesforce.png',
          reason: 'The standard CRM for the financial industry. Centrally manages leads, deals, and compliance history.',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'The most widespread IT platform at banks and large insurers. Unifies internal collaboration and meetings.',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'The internal comms standard at FinTech startups. Real-time notification of promising leads.',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'Adoption is advancing as the marketing-automation platform for FinTech companies. Ideal for long-term nurture.',
        },
      ]}
      faqs={[
        {
          question: 'I worry the AI might use expressions that violate the Financial Instruments and Exchange Act or the Premiums Act.',
          answer: 'Meeton Live embeds a "prohibited-expression list" in the system prompt and runs a compliance check before output. Further, you can configure it to use only expression templates approved by your compliance team. At onboarding we interview your compliance requirements and co-design the initial prompts.',
        },
        {
          question: 'Can the AI determine offer eligibility based on the customer\'s regulatory status (bank, securities, insurance, etc.)?',
          answer: 'During the inquiry, Meeton Live confirms "sector, license category, region" and matches it against your serviceable-segment matrix. Ineligible segments receive only a polite guide, and only eligible leads proceed to meeting conversion. It eliminates the waste of discovering ineligibility for the first time on the sales floor.',
        },
        {
          question: 'Can the AI handle deep questions from technical leads — API specs, SLA, redundancy, encryption methods?',
          answer: 'Yes. Meeton Live can include your technical documents (API reference, security whitepaper, SOC 2 / ISMS report summaries) in its training data. It can answer in depth, grounded in your official information, the API-spec, SLA, redundancy, and encryption-algorithm questions technical leads throw.',
        },
        {
          question: 'What about financial institutions\' security requirements (on-prem, closed networks, no data export)?',
          answer: 'Meeton ai is operated to ISMS / SOC 2-aligned designs. It can be designed for data-export restrictions, encrypted communication, and log-audit requirements. For on-prem configurations placing the AI inference infrastructure inside a closed network, please consult us separately.',
        },
        {
          question: 'Financial-institution meetings become a three-way "sales + technical + compliance" setup. How is scheduling handled?',
          answer: 'Meeton Calendar coordinates multiple internal stakeholders (sales, technical IS, compliance) and multiple customer stakeholders together. The AI can fully automate complex 4–6-person scheduling.',
        },
        {
          question: 'What is your status on financial-industry-specific regulations like PCI DSS / FISC?',
          answer: 'Support for individual regulatory requirements (PCI DSS, FISC, PIA, etc.) is configured according to your operational design. For details, see the security page, and we\'ll answer after an interview with our technical staff during the demo.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('fintech') || target.includes('フィンテック') || target.includes('金融') || target.includes('finance') || target.includes('銀行')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-fintech"
    />
  )
}
