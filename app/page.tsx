import type { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'

export const metadata: Metadata = {
  // Uses the default title from layout.tsx
}

export default function Page() {
  return <HomePageClient />
}
