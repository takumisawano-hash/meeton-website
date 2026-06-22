import type { Metadata } from 'next'
import AboutContent, { ABOUT_STR } from '@/app/components/v2/AboutContent'
import { altLanguages, ogLocale } from '@/app/lib/i18n'

const s = ABOUT_STR.en

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: altLanguages('/about/', 'en'),
  openGraph: {
    title: s.metaTitle,
    description: s.metaDescription,
    url: 'https://dynameet.ai/en/about/',
    type: 'website',
    locale: ogLocale('en'),
  },
}

export default function AboutPageEn() {
  return <AboutContent lang="en" />
}
