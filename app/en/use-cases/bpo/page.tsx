import type { Metadata } from 'next'
import UseCasePageClient from '@/app/use-cases/UseCasePageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

// /en/use-cases/bpo/ — English twin of /use-cases/bpo/. Faithful translation
// of the JA industry LP; numbers kept exact. Renders through the shared
// (lang-aware) UseCasePageClient with lang="en".

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/use-cases/bpo/'

export const metadata: Metadata = {
  title: 'AI SDR for BPO & Contact Centers — Turn inquiries into meetings | Meeton ai',
  description:
    'An AI SDR for BPO and contact-center providers. It automates first response and complex requirements hearings on your own sales site, turning inquiries into booked meetings 24/7 with a 5-second first response.',
  alternates: altLanguages('/use-cases/bpo/', 'en'),
  openGraph: {
    title: 'AI SDR for BPO & Contact Centers — Turn inquiries into meetings | Meeton ai',
    description: 'An AI SDR strengthens the sales site of response-quality professionals. Automates complex requirements hearings and first response, and turns inquiries into meetings.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
}

export default function BpoUseCasePageEn() {
  return (
    <UseCasePageClient
      lang="en"
      industrySlug="bpo"
      industryEn="BPO & Contact Centers"
      industryJa="BPO・コールセンター"
      accentColor="#0f766e"
      accentDeep="#115e59"
      accentLight="#e0f2f0"
      accentGlow="rgba(15, 118, 110, 0.22)"
      eyebrow="USE CASE / BPO"
      heroTitleLead="You sell response quality."
      heroTitleAccent="Your own site should prove it."
      heroSub="A sales site for BPO and contact-center providers. Complex RFPs and requirements, an industry custom of unpublished pricing. Meeton ai responds to inquiries in 5 seconds and automatically drives everything from the requirements hearing to a booked meeting."
      personaStatement="Companies searching for an outsourcing partner look at how your own site responds first. Submitting a form and hearing back the next business day feeds one doubt — “can we trust this company with our front line?” Meeton ai turns that first impression into a 5-second-first-response conversation."
      painsLead="You're the pros at handling inquiries — except on your own website."
      pains={[
        {
          title: 'Judged on response quality, yet slow on first response',
          description: 'Companies evaluating a BPO partner read the speed and care of your website\'s responses as a preview of post-contract quality. A form reply that arrives the next business day undercuts your credibility as response professionals.',
          metric: '5 sec',
          metricLabel: 'Speed-to-Lead benchmark',
        },
        {
          title: 'Complex RFPs make the initial hearing heavy',
          description: 'Seats, operating hours, channels (phone / email / chat), volume seasonality, security requirements, launch timing — a BPO quote needs a long list of inputs. When sales gathers them one call at a time, the first proposal slips and competitors get there first.',
          metric: 'Dozens',
          metricLabel: 'Requirement items per quote',
        },
        {
          title: 'Unpublished pricing drives prospects away',
          description: 'Because bespoke, per-engagement quotes are the industry norm, pricing pages tend to end at "contact us." Prospects who can\'t get even a ballpark quietly drop out early in their comparison — and no one is there to answer during the nights and weekends when evaluation moves forward.',
          metric: 'Nights & weekends',
          metricLabel: 'When evaluation moves, with no one on duty',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/en/chat/',
          description: 'The AI converses in real time with leads who visit your site. Carrying the context of their downloads and video views, it answers deep product questions concretely.',
          industryAngle: 'It answers outsourcing evaluators\' questions — "scope of work you can take on," "security posture," "time to launch" — instantly, grounded in your official information. It also gathers requirements like seats, channels, and timing naturally through the conversation, automating the information collection that precedes a first proposal.',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/en/email/',
          description: 'For inquiry emails, the AI replies in place of inside sales and books the meeting. Connected to Slack and HubSpot notifications.',
          industryAngle: 'For RFP and quote-request emails, the AI sends the first reply even after hours. It politely confirms missing requirements (work volume, operating hours, start date), so your sales team enters proposal work with requirements already organized.',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/en/calendar/',
          description: 'Automatic scheduling integrated with Google Calendar / MS Teams / Zoom. The meeting is confirmed the moment the buyer picks an open slot.',
          industryAngle: 'Prospects who finish the requirements hearing go straight onto your sales team\'s calendar. Even multi-attendee meetings with the client\'s IT and procurement in the room are assembled automatically by the AI from everyone\'s open slots.',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/en/library/',
          description: 'Based on a visitor\'s industry, role, and browsing history, it personalizes the best materials, case studies, and videos. It keeps returning leads warm.',
          industryAngle: 'It automatically presents contact-center launch stories, industry-specific BPO track records, and security materials matched to each visitor\'s industry and interest. Where you can\'t answer on price instantly, it delivers ahead of time the evidence that says "this company can be trusted with our operations."',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/en/ads/',
          description: 'On-site ads where the AI tailors the best offer to each visitor by page, traffic source, and industry. It keeps learning from clicks and captured leads.',
          industryAngle: 'For evaluating visitors reading your service and track-record pages, the AI presents offers matched to their browsing context (case-study downloads / free consultation). Visitors who never reach the form still convert into leads through on-site ads. The AI drafts the ad copy, and only approved ones go live.',
        },
      ]}
      integrations={[
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'A widely used CRM across the contact-center industry. Syncs inquiries, engagements, and meetings via native integration.',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'The CRM/MA for BPO sales teams. Auto-syncs the requirements collected in the hearing to HubSpot Contacts / Deals.',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: 'The standard communications platform at major BPO and contact-center operators. Sales meetings run right in Teams.',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: 'Instant notifications to sales and operations. Grasp requirements-complete, high-potential leads in real time.',
        },
      ]}
      faqs={[
        {
          question: 'BPO and contact-center quotes are bespoke per engagement. Can we use Meeton ai without publishing pricing?',
          answer: 'Yes. You can run it with pricing unpublished. Meeton Chat explains that the estimate depends on seats, operating hours, and channels — and that you will quote after learning the requirements — while gathering those quote requirements through the conversation. Prospects avoid the "I inquired and learned nothing" experience, and you receive only leads with requirements already collected.',
        },
        {
          question: 'Our RFPs and requirement definitions are complex. Can an AI really run the hearing?',
          answer: 'For the first-pass hearing, yes. Routine confirmation items — scope of work, expected volume, operating hours, channels, target start date — are collected by Meeton Chat and Meeton Email through conversation and email, then recorded in structured form in your CRM. Complex requirement alignment stays with your sales team in the meeting, starting from organized information.',
        },
        {
          question: 'We operate contact centers ourselves. Isn\'t deploying an AI chat a contradiction?',
          answer: 'The opposite. Companies evaluating outsourcing judge your post-contract service quality by the speed and quality of responses on your own site. Practicing 24/7, 5-second-first-response service on your own site is the most convincing demonstration a company selling response quality can make. And "AI handles the first touch, people finish the job" matches the operating model you propose to your own clients.',
        },
        {
          question: 'Can it handle inquiries at night and on weekends?',
          answer: 'Yes. Meeton ai runs 24/7. Outsourcing research often happens outside the buyer\'s working hours; it responds in 5 seconds to night and weekend inquiries too, and completes booking a meeting for the following week. Your sales team starts the next business day with requirements and a meeting already in place.',
        },
        {
          question: 'We handle strict security requirements in client work. Is it safe to put an AI chat on our own site?',
          answer: 'Meeton Chat grounds its answers only in the official information you train it on (service materials, FAQs, track-record pages), and switches to a human handoff for questions it can\'t answer. Captured lead data flows into your existing CRM such as Salesforce or HubSpot, under your control. See our security page for details.',
        },
        {
          question: 'Does deployment require a dedicated engineer or replacing existing systems?',
          answer: 'No. Install one JS tag on your site and go live in as little as 5 minutes. It natively integrates with Salesforce, HubSpot, Slack, and Microsoft Teams, so you keep your existing sales stack as is. It won\'t interfere with the systems you provide to clients either.',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('bpo') || target.includes('コールセンター') || target.includes('コンタクトセンター') || (cs.tags || []).some((t) => t.toLowerCase().includes('bpo'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-bpo"
    />
  )
}
