import type { Metadata } from 'next'
import SolutionLpTemplate, { type SolutionLpConfig } from '@/app/solutions/SolutionLpTemplate'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

/**
 * /en/solutions/crm-to-meeting/ — English twin of /solutions/crm-to-meeting/.
 * Faithful translation of the JA paid-traffic LP; numbers/case metrics kept
 * exact. Renders through the shared SolutionLpTemplate with lang="en".
 */

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/en/solutions/crm-to-meeting/'

export const metadata: Metadata = {
  title: 'Reactivate the meetings buried in your CRM with an AI SDR｜Meeton ai',
  description:
    'MQLs left untouched after a download, past lost deals, dormant leads that return. Meeton ai reads your CRM data and web behavior with an AI SDR and creates meeting opportunities through context-aware re-engagement. Native HubSpot / Salesforce integration.',
  alternates: altLanguages('/solutions/crm-to-meeting/', 'en'),
  openGraph: {
    title: 'Reactivate the meetings buried in your CRM with an AI SDR',
    description:
      'From past MQLs, lost-deal contacts, and dormant leads piling up in HubSpot / Salesforce / Marketo, an AI SDR helps turn them back into meetings.',
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
  slug: 'crm-to-meeting',
  eyebrow: 'For companies with leads accumulating in their CRM / MA',
  heroH1: [
    'The meetings buried in your CRM,',
    'set in motion again by an AI SDR.',
  ],
  heroSub:
    'MQLs left untouched after a download, past lost-deal contacts, dormant leads that return. Meeton ai reads your CRM data and web behavior with an AI SDR and creates meeting opportunities through context-aware re-engagement.',
  heroProof: [
    { value: 'HubSpot', label: 'Native Salesforce integration in place' },
    { value: '24', unit: '/7', label: 'Detects renewed-interest signals' },
    { value: 'Pre-send', unit: 'approval OK', label: 'Optional approval flow for AI sends' },
  ],
  painsHeading: 'Three reasons CRM leads never come back to meetings',
  proofHeading: 'Related results with Meeton ai',
  primaryCtaLabel: 'Get the CRM meeting-conversion checklist',
  pains: [
    {
      title: 'MQLs that cooled off after a download',
      body: 'You keep "just sending" nurture emails to leads who downloaded a resource, miss their consideration window, and they never advance to a meeting.',
      signal: 'At many companies, the renewed-interest signals of MQLs are never made visible',
    },
    {
      title: '"Lost = a list that never moves again"',
      body: 'Once a contact is marked lost, it is rarely followed up manually and gets buried in the CRM pile.',
      signal: 'Reconsideration after a loss is not uncommon, but without detection those leads never return to a meeting',
    },
    {
      title: 'No optimal re-touch for dormant leads',
      body: 'There are no resources to decide "when, to whom, and with what message" to re-engage, so the contact count in the CRM only keeps growing.',
      signal: 'Inside sales capacity goes to decision-makers and new MQLs, so the dormant side is left unattended',
    },
  ],
  solutions: [
    {
      badge: 'AI follow-up',
      title: 'Meeton Email',
      body: 'Detects renewed-interest signals (web revisits, pricing-page views, email opens) from past MQLs and lost-deal contacts in your CRM, and helps automate context-aware 1:1 re-engagement. You can also run a pre-send approval flow.',
      href: '/features/ai-email/',
    },
    {
      badge: 'AI chat',
      title: 'Meeton Live',
      body: 'When an identified lead returns, an AI SDR that carries over their past views, downloads, and email responses replies instantly. It enables a natural restart in conversation, like "How is the project you were considering earlier progressing?"',
      href: '/features/ai-chat/',
    },
    {
      badge: 'AI meeting booking',
      title: 'Meeton Calendar',
      body: 'The moment interest peaks, the AI completes the meeting booking. It auto-assigns reps based on CRM owner / industry / company size and syncs automatically to Salesforce / HubSpot.',
      href: '/features/meetings/',
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
      title: 'Connect your CRM / MA',
      body: 'Import leads, conversation history, and deal history via native HubSpot / Salesforce / Marketo integration. From about 30 minutes; initial setup is supported by a DynaMeet rep. Time required varies by your environment.',
    },
    {
      title: 'Detect renewed-interest signals',
      body: 'The AI continuously monitors site revisits, pricing-page views, email opens / clicks, and downloads.',
    },
    {
      title: 'Re-engage in context',
      body: 'Meeton Email re-engages 1:1, and Meeton Live converses on revisit. The AI decides the "when, to whom, and what."',
    },
    {
      title: 'Close with a booked meeting',
      body: 'When interest is high, Meeton Calendar offers a booking so your reps can focus on the meeting.',
    },
  ],
  faqs: [
    {
      question: 'How much effort does CRM integration take?',
      answer:
        'HubSpot / Salesforce are natively integrated and connect via OAuth in as little as 30 minutes to a few hours. There is variance by your environment (number of custom fields / permission setup), but a DynaMeet rep accompanies the initial setup, so no dedicated engineer is required. Marketo / Pardot connect via API in a few days as a guide.',
    },
    {
      question: 'Do I need to replace my existing MA (HubSpot / Marketo / Pardot)?',
      answer:
        'No. Meeton ai is not a tool that replaces your MA; it handles the "last one mile" after the MA / CRM hands off. It is designed to layer on top of your existing stack.',
    },
    {
      question: 'What kind of data do I need to see results?',
      answer:
        'Having web behavior logs of past MQLs (site visit history) and email interactions (opens / clicks) makes it easier to find reactivation targets. As a guide, companies with 1,000+ CRM contacts tend to get better accuracy in target selection and impact measurement.',
    },
    {
      question: 'How big are the results from reactivating dormant leads?',
      answer:
        'At this point we cannot yet share figures as a direct "CRM-to-Meeting" case. This page is presented based on Meeton ai\'s related results as a last-one-mile AI SDR (BizteX 20x chat leads, EdulinX 60%+ meeting-conversion rate, Univis 2 wins in 3 months). We will share a concrete estimate in the CRM context during a 30-minute consult.',
    },
    {
      question: "Won't emails get sent to existing contacts on their own and cause backlash?",
      answer:
        'No. Meeton Email operates according to predefined sending policies (stop conditions, send frequency, time windows), and contacts with opt-out history can be managed as excluded. You can also run an approval flow that always includes a human review step before sending. Specific exclusion rules (periods / conditions) are customized at setup to fit your compliance policy.',
    },
    {
      question: 'What about security?',
      answer:
        'We have obtained ISMS (ISO/IEC 27001 & 27017) certification. Customer data is stored with AES-256, and internal access follows least privilege. HubSpot / Salesforce integration requests only official OAuth scopes, and the data write-back range can be toggled ON/OFF individually in the admin. We can also handle security checklists, NDAs, and access-permission management individually. See our information security policy for details.',
    },
  ],
  finalCta: {
    heading: 'Want to diagnose how many buried CRM meetings you can move?',
    sub: 'Inspect your CRM state in 10 minutes following a self-assessment sheet (PDF, A4, 3 pages). If the check reveals reactivation potential, we can dig in further during a 30-minute consult.',
  },
  accent: '#0891b2',
  utmCampaignBase: '2026q2_crm_to_meeting',
  pageUrl: PAGE_URL,
}

export default function CrmToMeetingPageEn() {
  return <SolutionLpTemplate config={config} lang="en" />
}
