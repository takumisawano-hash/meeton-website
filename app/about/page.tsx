import type { Metadata } from 'next'
import AboutContent, { ABOUT_STR } from '@/app/components/v2/AboutContent'

// /about/ — v2 re-skin (navy frame / white canvas / green accent).
// Pre-booking trust checkpoint: mission in v2 vocabulary, founders,
// and the registry facts (会社概要) kept verbatim.

const s = ABOUT_STR.ja

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: s.metaTitle,
    description: s.metaDescription,
    url: 'https://dynameet.ai/about/',
  },
}

export default function AboutPage() {
  return <AboutContent lang="ja" />
}
