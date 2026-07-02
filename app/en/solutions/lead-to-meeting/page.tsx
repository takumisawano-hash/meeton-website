import type { Metadata } from 'next'
import SolutionLpTemplate, { type SolutionLpConfig } from '@/app/solutions/SolutionLpTemplate'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

/**
 * /en/solutions/lead-to-meeting/ — English twin of /solutions/lead-to-meeting/.
 * Faithful translation of the JA paid-traffic LP; numbers/case metrics kept
 * exact. Renders through the shared SolutionLpTemplate with lang="en".
 */

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/solutions/lead-to-meeting/'

export const metadata: Metadata = {
  title: 'Leads are up. But meetings are not. AI SDR Meeton ai',
  description:
    'Are the leads you gathered from ads, SEO, and webinars just piling up in your CRM? Meeton ai puts an AI SDR to work at the moment of inquiry, download, or revisit — handling conversation, content recommendation, scheduling, and follow-up to advance leads to meetings.',
  alternates: altLanguages('/solutions/lead-to-meeting/', 'en'),
  openGraph: {
    title: 'Leads are up. But meetings are not.',
    description:
      '5-second first response + 1:1 context-aware follow-up + automatic meeting booking. AI SDR Meeton ai improves your lead-to-meeting yield.',
    url: PAGE_URL,
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const config: SolutionLpConfig = {
  slug: 'lead-to-meeting',
  eyebrow: 'For companies where leads are up but meetings are not',
  heroH1: [
    'Leads are up.',
    'But meetings are not.',
  ],
  heroSub:
    'Meeton ai puts an AI SDR to work at the moment of inquiry, download, or revisit — handling conversation, content recommendation, scheduling, and follow-up to advance leads to meetings.',
  heroProof: [
    { value: '5', unit: 'sec', label: 'First response when a lead appears' },
    { value: '24', unit: '/7', label: 'AI in operation' },
    { value: '3', unit: 'modules', label: 'Chat / Calendar / Email' },
  ],
  painsHeading: 'Three structures that keep leads from becoming meetings',
  proofHeading: 'Meeting-creation results with Meeton ai',
  primaryCtaLabel: 'Get the lead meeting-conversion checklist',
  pains: [
    {
      title: 'Follow-up after an inquiry cannot keep up',
      body: 'When it takes time from form submission to sales\'s first contact, the lead cools off in the meantime and flows to a competitor.',
      signal: 'The slower the first response after an inquiry, the more easily a lead\'s interest drops',
    },
    {
      title: 'Poor MQL → SQL yield',
      body: 'MQLs pile up from downloads and inquiries, but inside-sales capacity and qualification criteria cannot keep up, so they are not converted to SQLs.',
      signal: 'Even as MQLs accumulate, only a portion tend to get converted to SQLs',
    },
    {
      title: 'Nurturing has become "just send"',
      body: 'Unopened step emails simply flow through the MA, with no individual approach tailored to the lead\'s behavioral context.',
      signal: 'With blast emails alone, conversion tailored to each consideration context is hard',
    },
  ],
  solutions: [
    {
      badge: 'AI chat',
      title: 'Meeton Chat',
      body: 'An AI SDR converses in real time at the moment of form submission, thank-you page, or site revisit. It answers deep questions that carry over download context and past history, and completes a booking while interest is high.',
      href: '/en/chat/',
    },
    {
      badge: 'AI meeting booking',
      title: 'Meeton Calendar',
      body: 'The moment a lead converts, the AI assigns a rep and offers a booking while interest is high. It triggers from anywhere — form submission, thank-you page, or email.',
      href: '/en/calendar/',
    },
    {
      badge: 'AI follow-up',
      title: 'Meeton Email',
      body: 'For leads who did not book immediately, the AI helps automate context-aware 1:1 follow-up. Rather than MA template blasts, it dynamically decides content, timing, and tone based on the lead\'s behavioral signals.',
      href: '/en/email/',
    },
    {
      badge: 'AI ads',
      title: 'Meeton Ads',
      body: 'For visitors who never open the chat, the AI presents the best offer as an on-site ad — matched to page, traffic source, and industry. Prospects who never reach a conversation still convert with the right offer. The AI drafts the ad copy, and only approved ones go live.',
      href: '/en/ads/',
    },
  ],
  cases: [
    {
      slug: 'biztex-chat-leads-10x',
      company: 'BizteX',
      metric: '20+ / month',
      metricLabel: 'Chat-sourced leads (from 1–2 / month)',
    },
    {
      slug: 'edulinx-ai-chat-40-percent',
      company: 'EdulinX',
      metric: '60%+',
      metricLabel: 'Meeting-conversion rate via Meeton ai',
    },
    {
      slug: 'univis-multi-service-3month-2deals',
      company: 'Univis',
      metric: '2 in 3 months',
      metricLabel: 'Wins + more proposals after rollout',
    },
  ],
  steps: [
    {
      title: 'Detect the moment a lead converts',
      body: 'Form submission / download / thank-you page view / site revisit — the AI instantly detects every conversion trigger.',
    },
    {
      title: 'Respond in real time',
      body: 'Meeton Chat starts the conversation instantly (a 1:1 AI reply for email inflow). It does not depend on a rep\'s availability.',
    },
    {
      title: 'Book a meeting or follow up, by interest',
      body: 'If interest is high, Meeton Calendar completes a booking. If it is still early, it switches to 1:1 follow-up with Meeton Email.',
    },
    {
      title: 'Sync automatically to your CRM',
      body: 'Conversation, inflow path, interest category, and conversion outcome are written back to HubSpot / Salesforce per contact. Attribution is not lost.',
    },
  ],
  faqs: [
    {
      question: 'What is the relationship with my existing MA (HubSpot / Marketo / Pardot)?',
      answer:
        'There is no need to replace it. Meeton ai handles the "last one mile of conversion" after the MA / CRM hands off. It is designed to layer on top of your existing stack. HubSpot / Salesforce are natively integrated.',
    },
    {
      question: 'How soon can I see improvement in meeting-conversion rate?',
      answer:
        'It depends on industry and operational design, but there are cases achieving a 60%+ meeting-conversion rate via AI chat (EdulinX). Real-time first response plus context-aware conversation is the main driver. From right after rollout you can review logs of conversations, content recommendations, and bookings, and at many companies initial signals appear within 1–2 weeks.',
    },
    {
      question: 'Do I need scenario design or to build out FAQs?',
      answer:
        'Complex scenario design is unnecessary. Meeton Chat is generative-AI based; it uses your official information (site, materials, FAQs, past inquiries) as training data and responds in context even to undefined questions. When the AI cannot answer, it automatically switches to connecting to a rep or recommending related materials.',
    },
    {
      question: 'Will fast response to inquiries alone produce results?',
      answer:
        'Real-time first response is one of the most important factors, but not the only one. Meeton ai judges interest level within the conversation, advances discovery, and selects a booking, follow-up, or content recommendation at the right moment. It is designed not for "fast response" but to "turn into a meeting."',
    },
    {
      question: 'Is there value in adopting it even with a small number of leads?',
      answer:
        'Even with hundreds of leads a month, whether you can capture the first response instantly directly affects conversion, so the deciding axis is "tolerance for missed leads" rather than scale. Even at 10 leads a month, if one is a multi-million-yen B2B deal, automating the first response is worthwhile.',
    },
    {
      question: 'What about security?',
      answer:
        'We have obtained ISMS (ISO/IEC 27001 & 27017) certification. Customer data is stored with AES-256, and internal access follows least privilege. HubSpot / Salesforce integration requests only official OAuth scopes. We can also handle security checklists, NDAs, and access-permission management individually. See our information security policy for details.',
    },
  ],
  finalCta: {
    heading: 'Want to check in 10 minutes whether you are converting leads to meetings?',
    sub: 'Following a self-assessment sheet (PDF, A4, 3 pages), inspect your post-inquiry flow, nurture design, and meeting-conversion rate. Depending on the result, we can dig further into where the AI SDR fits during a 30-minute consult.',
  },
  accent: '#3b6ff5',
  utmCampaignBase: '2026q2_lead_to_meeting',
  pageUrl: PAGE_URL,
}

export default function LeadToMeetingPageEn() {
  return <SolutionLpTemplate config={config} lang="en" />
}
