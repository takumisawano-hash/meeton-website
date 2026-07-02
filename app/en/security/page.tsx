import type { Metadata } from 'next'
import SecurityPageClient from '@/app/components/SecurityPageClient'
import { altLanguages, ogLocale, EN_OG_IMAGE } from '@/app/lib/i18n'

// /en/security/ — English twin of /security/. Certification names / IDs and
// registry facts kept verbatim (ISO/IEC 27001 & 27017, ISMS-AC, ISR021);
// surrounding copy translated. Renders through the lang-aware SecurityPageClient.

export const metadata: Metadata = {
  title: 'Our information security measures',
  description:
    'Under third-party certification for ISO/IEC 27001 (information security) and ISO/IEC 27017 (cloud security), DynaMeet enforces information security through both product measures and organizational / human measures.',
  alternates: altLanguages('/security/', 'en'),
  openGraph: {
    images: EN_OG_IMAGE,
    title: 'Our information security measures｜Meeton AI',
    description: 'Under third-party certification for ISO/IEC 27001 & 27017, we enforce information security through both product and organizational / human measures.',
    url: 'https://dynameet.ai/en/security/',
    type: 'website',
    siteName: 'Meeton AI',
    locale: ogLocale('en'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our information security measures｜Meeton AI',
    description: 'Under third-party certification for ISO/IEC 27001 & 27017, we enforce information security through both product and organizational / human measures.',
  },
}

export default function SecurityPageEn() {
  return <SecurityPageClient lang="en" />
}
