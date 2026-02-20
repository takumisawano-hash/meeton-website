import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '採用情報｜DynaMeet K.K.',
  description: 'DynaMeet K.K.の採用情報です。カスタマーサクセス、営業、エンジニア、デザイナーなど各ポジションの募集要項をご確認ください。',
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
