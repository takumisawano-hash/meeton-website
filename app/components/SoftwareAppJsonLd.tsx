'use client'

type SoftwareAppJsonLdProps = {
  name: string
  description: string
  featureList: string[]
  url: string
}

export default function SoftwareAppJsonLd({ name, description, featureList, url }: SoftwareAppJsonLdProps) {
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
    },
    publisher: {
      '@id': 'https://dynameet.ai/#organization',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '50',
      bestRating: '5',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
