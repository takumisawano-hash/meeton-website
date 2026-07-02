import type { Metadata } from 'next'
import Home from '../components/v2/Home'
import { getAllCaseStudies } from '../lib/case-studies'
import { FEATURED_CASES, localizeFeaturedCase } from '../lib/featured-cases'
import { altLanguages, ogLocale, EN_OG_IMAGE } from '../lib/i18n'

export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: 'Meeton ai｜The AI SDR Platform that turns your Website into meetings',
  },
  description:
    'Meeton ai is an AI SDR Platform deployed on your website. It captures pre-inquiry prospects (Chat & Ads), nurtures them with content (Library), converts them into meetings (Calendar), and wins back lost leads (Email). Capture → Nurture → Convert → Win back — four stages that turn every moment into a meeting.',
  alternates: altLanguages('/', 'en'),
  openGraph: {
    images: EN_OG_IMAGE,
    title: 'Meeton ai｜The AI SDR Platform that turns your Website into meetings',
    description:
      'Visitors leave, and leads never become meetings. Turn a Website that "waits" into an AI sales channel that generates meetings. An AI SDR that autonomously handles all four stages: capture → nurture → convert → win back.',
    url: 'https://dynameet.ai/en/',
    type: 'website',
    locale: ogLocale('en'),
  },
}

// English FAQPage schema — AEO target queries for /en. Self-contained answers
// so ChatGPT/Perplexity/AI Overviews can extract as citations.
const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/en/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI SDR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI SDR (AI Sales Development Representative) is a system in which AI autonomously handles the initial contact, discovery, content recommendation, meeting booking, and follow-up that human SDRs used to do. Meeton ai is an AI SDR Platform deployed on your website. It handles four jobs — conversation, content recommendation, booking, and follow-up — turning every moment from pre-inquiry to win-back into a meeting.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do the four stages of Meeton ai do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton ai consists of four stages. (1) Capture (Meeton Chat captures visitors in conversation, and Meeton Ads catches the rest with AI-optimized on-site ads). (2) Nurture (Meeton Library nurtures consideration with AI-explained content to create meeting-ready leads). (3) Convert (Meeton Calendar carries leads all the way to a booked meeting the moment intent peaks). (4) Win back (Meeton Email follows up 1:1 on leads who did not book, triggered by behavioral signals, and brings them back to a meeting).',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does the pre-contact stage matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'B2B buyers are said to complete about 70% of the purchase process on their own before ever contacting sales (Gartner/6sense). Most companies simply "wait" during that window and lose opportunities to slow first response, weak follow-up, and missing context. Meeton ai acts from this pre-contact stage, lifting conversion through Speed (first response), Persistence (follow-up), and Context.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is it priced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'From ¥120,000/month. Three plans: the Lead Generation plan (from ¥120,000) for capture & nurture, the Meeting Generation plan that adds conversion, and the All-in-One plan that covers follow-up end to end. The top two plans are quote-based. Pricing varies by monthly traffic and features, and Japan qualified-invoice billing is supported.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can it integrate with my existing CRM and MA tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It natively integrates with HubSpot and Salesforce, automatically logging conversation history and bookings. It also supports calendar integration with Google Calendar, Outlook, and Zoom, notifications to Slack, Microsoft Teams, and Google Chat, and connections to other tools via Webhook.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of companies is it for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It primarily targets Japanese B2B companies in SaaS, IT, manufacturing, professional services, and fintech. It is especially effective for CMOs, CROs, and inside sales / SDR leaders who want to improve marketing-sourced meeting conversion (Speed to Lead). You can first confirm how it works on your own site in a 30-minute demo.',
      },
    },
  ],
}

// English SoftwareApplication schema — Meeton ai platform (for /en).
const homepageProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://dynameet.ai/#product',
  name: 'Meeton ai',
  alternateName: ['Meeton AI', 'ミートンai'],
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI SDR / Sales Automation Software',
  operatingSystem: 'Web',
  description:
    'AI SDR Platform for Japanese B2B companies. Deployed on your website, it autonomously runs four stages: capture (Chat & Ads) → nurture (Library) → convert (Calendar) → win back (Email). From ¥120,000/mo, with three plans: Lead Acquisition / Meeting Acquisition / All-in-One.',
  brand: { '@type': 'Brand', name: 'Meeton ai' },
  publisher: { '@id': 'https://dynameet.ai/#organization' },
  url: 'https://dynameet.ai/en/',
  image: 'https://dynameet.ai/logo-dark.svg',
  offers: {
    '@type': 'Offer',
    price: '120000',
    priceCurrency: 'JPY',
    description: 'From ¥120,000/mo. Three plans: Lead Generation / Meeting Generation / All-in-One. Varies by scale and features.',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'CRM integration', value: 'Native HubSpot & Salesforce integration' },
    { '@type': 'PropertyValue', name: 'Setup', value: 'No-code (snippet / upload / OAuth)' },
    { '@type': 'PropertyValue', name: 'Modules', value: 'Meeton Calendar / Chat / Library / Email' },
  ],
}

export default async function Page() {
  let featured: Array<{
    slug: string
    name: string
    industry?: string
    quote?: string
    heroMetric?: string
    heroMetricLabel?: string
    heroImage?: string | null
    companyLogo?: string | null
  }> = []
  try {
    const cases = await getAllCaseStudies()
    // Notion case data is Japanese — apply the EN overlay (translated
    // name/quote/metric labels per slug) so no JA leaks onto the EN homepage.
    featured = cases.slice(0, 4).map((c) => localizeFeaturedCase({
      slug: c.slug,
      name: c.company,
      industry: c.industry,
      quote: c.quote || c.description,
      heroMetric: c.heroMetric,
      heroMetricLabel: c.heroMetricLabel,
      heroImage: c.heroImage,
      companyLogo: c.companyLogo,
    }))
  } catch {
    featured = []
  }
  if (featured.length === 0) featured = FEATURED_CASES.map(localizeFeaturedCase)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageProductSchema) }} />
      <Home caseStudies={featured} lang="en" />
    </>
  )
}
