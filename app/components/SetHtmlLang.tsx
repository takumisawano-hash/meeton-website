'use client'

import { useEffect } from 'react'

// The root layout hardcodes <html lang="ja"> and Next.js only allows one root
// layout per tree without a route-group split (too invasive for the JA tree).
// This client shim corrects the document language on /en/* — screen readers
// and Google's renderer both pick it up. The proper structural fix (route
// groups with two root layouts) is noted in the i18n docs.
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = lang
    return () => {
      document.documentElement.lang = prev
    }
  }, [lang])
  return null
}
