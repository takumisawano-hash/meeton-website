# Landing Pages (LP)

キャンペーン・機能別のランディングページを管理するディレクトリ。

## 構造

```
app/lp/
├── README.md (this file)
├── layout.tsx      ← noindex + LinkedIn Insight Tag
└── [slug]/
    └── page.tsx    ← 各LP (HomePageClient mode="lp" のラッパー)
```

## URL構造
- `/lp/lead-gen/` - リード獲得訴求LP
- `/lp/web-chat/` - Webチャット訴求LP
- `/lp/meeting/` - 商談化訴求LP
- `/lp/inside-sales/` - インサイドセールス訴求LP

※ `/lp/trial/` は 2026-08-05 廃止（JA トライアル提供終了、`/` へ 308）。
JA サイトではトライアル訴求を書かないこと。

## LP作成フロー

1. **企画:** たくみさん or Meetonがコンセプト決定
2. **構成:** ヒーローセクション、課題提起、解決策、CTA
3. **デザイン:** Design Agentが画像生成
4. **実装:** このディレクトリに新規ページ追加
5. **デプロイ:** Vercelに自動デプロイ
6. **計測:** GA4でコンバージョン計測

## 実装パターン

```tsx
import HomePageClient from '@/app/components/HomePageClient'

export default async function LeadGenLP() {
  return (
    <HomePageClient
      mode="lp"
      lpVariant="lead-gen"
      lpHeadline="..."
      lpSubheadline="..."
    />
  )
}
```

新しい variant は `app/components/HomePageClient.tsx` の `LPVariant` union に追加する
（GA4 の `lp_variant` イベントパラメータに使われる）。

## デザインガイドライン
- CTA: `#12a37d` グリーン
- アクセント: `#7c5cfc` パープル
- フォント: Plus Jakarta Sans, Noto Sans JP
- 背景: 白ベース、グラデーション控えめ
