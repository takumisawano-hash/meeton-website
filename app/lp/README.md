# Landing Pages (LP)

キャンペーン・機能別のランディングページを管理するディレクトリ。

## 構造

```
app/lp/
├── README.md (this file)
├── [slug]/
│   └── page.tsx    ← 各LPのページ
└── components/
    └── LPTemplate.tsx  ← 共通LPテンプレート
```

## URL構造
- `/lp/trial/` - トライアル訴求LP
- `/lp/intent/` - Intent機能紹介LP
- `/lp/webinar-2026-03/` - ウェビナー告知LP

## LP作成フロー

1. **企画:** たくみさん or Meetonがコンセプト決定
2. **構成:** ヒーローセクション、課題提起、解決策、CTA
3. **デザイン:** Design Agentが画像生成
4. **実装:** このディレクトリに新規ページ追加
5. **デプロイ:** Vercelに自動デプロイ
6. **計測:** GA4でコンバージョン計測

## テンプレート使用法

```tsx
import LPTemplate from '../components/LPTemplate'

export default function TrialLP() {
  return (
    <LPTemplate
      title="14日間無料トライアル"
      subtitle="AI SDRの効果を実感してください"
      ctaText="今すぐ始める"
      ctaLink="https://app.dynameet.ai/signup"
    />
  )
}
```

## デザインガイドライン
- CTA: `#12a37d` グリーン
- アクセント: `#7c5cfc` パープル
- フォント: Plus Jakarta Sans, Noto Sans JP
- 背景: 白ベース、グラデーション控えめ
