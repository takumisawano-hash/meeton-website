import type { Metadata } from 'next'
import ContactPageClient from '@/app/components/ContactPageClient'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Meeton ai. For product questions, demo requests, or rollout consultations, feel free to reach out.',
  alternates: altLanguages('/contact/', 'en'),
  openGraph: {
    title: 'Contact',
    description: 'For product questions, demo requests, or rollout consultations, feel free to reach out.',
    url: 'https://dynameet.ai/en/contact/',
    type: 'website',
    siteName: 'Meeton ai',
    locale: ogLocale('en'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'For product questions, demo requests, or rollout consultations, feel free to reach out.',
  },
}

export default function ContactPageEn() {
  return <ContactPageClient lang="en" />
}
