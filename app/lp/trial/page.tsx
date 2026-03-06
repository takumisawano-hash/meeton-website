import type { Metadata } from 'next'
import LPTemplate from '../components/LPTemplate'

export const metadata: Metadata = {
  title: '14日間無料トライアル',
  description: 'Meeton aiを14日間無料でお試しください。AI SDRがウェブサイト訪問者を商談に変換します。クレジットカード不要。',
  robots: { index: true, follow: true },
}

export default function TrialLP() {
  return (
    <LPTemplate
      sections={[
        {
          type: 'hero',
          title: 'AI SDRの効果を14日間無料で実感',
          subtitle: 'Meeton aiがウェブサイト訪問者を24時間365日、自動で商談に変換。導入企業の平均商談化率3倍を実現。',
          ctaText: '無料トライアルを始める',
          ctaLink: 'https://app.dynameet.ai/signup?utm_source=lp&utm_medium=trial',
        },
        {
          type: 'problem',
          title: 'こんな課題はありませんか？',
          content: 'ウェブサイトに訪問者は来るのに、商談につながらない。フォームを設置しても離脱される。問い合わせが来ても対応が遅れてホットリードを逃してしまう。',
        },
        {
          type: 'features',
          title: 'Meeton aiが解決します',
          subtitle: '3つの機能で商談創出を自動化',
          items: [
            {
              icon: '💬',
              title: 'AI Chat',
              description: '訪問者の質問に24時間即座に回答。人間のように自然な会話で商談へ誘導します。',
            },
            {
              icon: '🎯',
              title: 'Intent Detection',
              description: '訪問者の行動パターンから購買意欲を自動スコアリング。ホットリードを見逃しません。',
            },
            {
              icon: '📅',
              title: 'Auto Scheduling',
              description: 'カレンダー連携で商談をその場で予約。営業担当者の空き時間に自動でスケジュール。',
            },
          ],
        },
        {
          type: 'solution',
          title: '導入はたった10分',
          content: 'JavaScriptタグを1行追加するだけ。複雑な設定は不要です。14日間の無料トライアル中、すべての機能をお使いいただけます。',
        },
        {
          type: 'cta',
          title: '今すぐ始めましょう',
          subtitle: 'クレジットカード不要。14日間のフル機能トライアル。',
          ctaText: '無料で試す',
          ctaLink: 'https://app.dynameet.ai/signup?utm_source=lp&utm_medium=trial',
        },
      ]}
    />
  )
}
