import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/saas/ — English twin of /use-cases/saas/. Faithful translation
// of the JA industry LP; numbers kept exact. Renders through the shared
// (lang-aware) UseCasePageClient with lang="en".

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/saas/'

export const metadata: Metadata = {
  title: 'AI SDR for SaaS — Automate lead-to-meeting conversion | Meeton ai',
  description:
    'An AI SDR for SaaS companies. For SaaS buyers with long evaluation cycles and multiple stakeholders, Meeton ai automates everything from ongoing nurture to booking meetings with the full buying committee.',
  alternates: altLanguages('/use-cases/saas/', 'en'),
  openGraph: {
    title: 'AI SDR for SaaS — Automate lead-to-meeting conversion | Meeton ai',
    description: 'An AI SDR automates lead-to-meeting conversion for SaaS companies. Built for long evaluation cycles and multiple stakeholders.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function SaaSUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="saas"
      industryEn="SaaS"
      industryJa="SaaS"
      accentColor="#0891b2"
      accentDeep="#0e7490"
      accentLight="#e0f4f9"
      accentGlow="rgba(8, 145, 178, 0.22)"
      eyebrow="USE CASE / SAAS"
      heroTitleLead="An AI SDR that books"
      heroTitleAccent="SaaS leads with every stakeholder."
      heroSub="Long evaluation cycles, multiple stakeholders, deep-research buyers. For SaaS buying behavior, Meeton ai responds in 5 seconds and automatically drives all the way to a meeting booked with the full buying committee."
      personaStatement="A SaaS evaluation runs 3–9 months. From the moment one lead downloads a resource to the final decision, you need to stay in touch with the entire evaluation group. Throughout that time, Meeton ai keeps surfacing the right information for each stakeholder and assembles a meeting with everyone involved."
      painsLead="Downloads are up, but they're not turning into demo bookings."
      pains={[
        {
          title: 'Handling deep-research buyers',
          description: 'SaaS buyers spend dozens of hours researching across comparison sites, reviews, and vendor materials. Even in chat, the first questions are deep — "feature comparison," "security," "pricing rationale." Scenario-based chatbots drop off instantly.',
          metric: '3-9 months',
          metricLabel: 'Average evaluation period',
        },
        {
          title: 'The difficulty of converting multiple stakeholders',
          description: 'A deployment decision involves three layers — practitioners, IT, and leadership. Even if you can talk to one lead, the deal won\'t advance unless you assemble a meeting with everyone. Many deals vanish when nurture breaks off after the inquiry.',
          metric: '5-9 people',
          metricLabel: 'Average buying-committee size',
        },
        {
          title: 'Balancing instant response with technical depth',
          description: '"What\'s the price?" "How do you differ from others?" "What\'s your track record?" — SaaS sales must answer these three in 5 seconds. Meanwhile, shallow answers to technical questions cool interest instantly. You need a system that can do both.',
          metric: '5 sec',
          metricLabel: 'Speed-to-Lead benchmark',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI converses in real time with leads who visit your site. Carrying the context of their downloads and video views, it answers deep product questions concretely.',
          industryAngle: 'It answers SaaS buyers\' "feature / pricing / security" questions accurately, grounded only in your official information. Buyers who would have dropped off a scenario-based chatbot get onto the booking path within the first 30 seconds.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'For inquiry emails, the AI replies in place of inside sales and books the meeting. Connected to Slack and HubSpot notifications.',
          industryAngle: 'During the evaluation, the AI replies instantly even after hours to the email questions stakeholders send individually (invoice formats, contract clauses, technical specs). It keeps the entire buying committee warm.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. The meeting is confirmed the moment the buyer picks an open slot.',
          industryAngle: 'For meetings with multiple stakeholders, it proposes the optimal slot automatically from everyone\'s calendars. Beyond 1:1, the AI handles complex coordination like "three-company, five-stakeholder" sessions.',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Based on a visitor\'s industry, role, and browsing history, it personalizes the best materials, case studies, and videos. It keeps returning leads warm.',
          industryAngle: 'Through SaaS\'s long evaluation cycle, even as a lead\'s topic of interest shifts (security / pricing / case studies), the AI presents the one piece to read now. It remembers the context even on a return visit three months later.',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'For SaaS buyers still evaluating, the AI presents the best offer based on the page they\'re viewing (features / pricing / security) and their traffic source. Visitors who never open the chat still convert into leads through on-site ads. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'The de facto internal comms tool at SaaS companies. Grasp meeting bookings and hot leads in real time via Slack notifications.',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'The leading CRM/MA for SaaS. Auto-syncs the full buying committee\'s activity history to HubSpot Contacts / Deals.',
        },
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'The standard CRM for enterprise SaaS. Syncs leads, deals, and stakeholders via native integration.',
        },
        {
          slug: 'zoom',
          name: 'Zoom',
          logo: '/integrations/07_Zoom.png',
          reason: 'The de facto tool for SaaS demos. The moment the AI books, it issues a Zoom link and sends invites to all participants.',
        },
      ]}
      faqs={[
        {
          question: 'Is Meeton ai effective even with SaaS\'s long evaluation cycle (3–9 months)?',
          answer: 'Yes. Meeton Library continuously learns a visitor\'s browsing history and topics of interest, and on a return visit presents the materials best suited to that moment. Over the months from inquiry to win, the AI keeps nurturing without letting interest cool, so it\'s an especially strong fit for long cycles.',
        },
        {
          question: 'Can it assemble a meeting with the whole buying committee (multiple stakeholders)?',
          answer: 'Meeton Calendar handles not just 1:1 but multi-party coordination for groups of 3–5. Further, Meeton Chat naturally picks up "Is there anyone else joining the evaluation?" and can automate confirming everyone\'s intent to attend.',
        },
        {
          question: 'Can it answer the deep questions SaaS buyers throw — "feature comparison," "security," "pricing rationale"?',
          answer: 'Meeton Chat uses your product docs, FAQs, security whitepapers, and pricing pages as training data and answers with grounding. When it can\'t answer, it decides to say "I\'ll check with our team" and switches immediately to a booking path. It won\'t drop off with a scenario-bot\'s "I can\'t answer that."',
        },
        {
          question: 'Can I keep my existing sales stack (HubSpot / Salesforce / Slack)?',
          answer: 'No replacement needed. Meeton ai natively integrates with HubSpot, Salesforce, and Slack, so lead info, deals, and notifications flow automatically into your existing tools. Many SaaS companies run it in this configuration.',
        },
        {
          question: 'How is it different from other chatbots (Drift / Intercom / ChatPlus)?',
          answer: 'Scenario-based chatbots can only answer fixed branches and drop off instantly on deep questions. Meeton Chat is generative-AI based, so it can respond with context even to undefined questions. The biggest difference from pure chat tools is that it completes "conversation → booking → CRM sync → Slack notification" in one product.',
        },
        {
          question: 'Can a SaaS startup adopt it?',
          answer: 'Yes. Initial setup takes as little as 5 minutes with no dedicated engineer. Increasingly, seed-to-Series-B SaaS startups adopt it as automation before hiring human SDRs.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('saas') || target.includes('sass') || (cs.tags || []).some((t) => t.toLowerCase().includes('saas'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-saas"
    />
  )
}
