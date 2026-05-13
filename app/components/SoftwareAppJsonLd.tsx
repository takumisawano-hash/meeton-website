'use client'

type SoftwareAppJsonLdProps = {
  name: string
  description: string
  featureList: string[]
  url: string
}

export default function SoftwareAppJsonLd({ name, description, featureList, url }: SoftwareAppJsonLdProps) {
  // 2026-05-13: aggregateRating 削除。ratingValue 4.8 / count 50 は
  // 実在しないレビューだった (サイト上に該当 Review 要素なし)。
  // Google policy: AggregateRating must be backed by visible reviews
  // on the same page. Fake ratings → manual action penalty risk.
  //
  // offers.price='0' は 14日間無料トライアルの正当な表現として保持。
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
    featureList,
    url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
      description: '14日間無料トライアル',
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@id': 'https://dynameet.ai/#organization',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
