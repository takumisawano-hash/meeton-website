# 導入事例：Notion DB スキーマ仕様

既存のブログ用 Notion DB と同じ構造にして、fetch 側のコードを使い回しやすくする。

## DB 名
**Case Studies**

## プロパティ

| プロパティ名 | タイプ | 必須 | 用途 |
|---|---|---|---|
| `Title` | Title | ✅ | 記事タイトル（会社名入りで OK） |
| `Slug` | Rich Text | ✅ | URL slug（英語、例: `g-gen-ai-sdr-40-percent`） |
| `Company` | Rich Text | ✅ | 会社名（例: G-gen） |
| `CompanyNote` | Rich Text | | 会社の一言説明（例: Google Cloud Premier Partner） |
| `Industry` | Select | ✅ | SaaS / IT / 製造 / 金融 / 医療 / 小売 / 人材 / その他 |
| `EmployeeSize` | Select | | ~50 / 51-200 / 201-1000 / 1001+ |
| `UsedProducts` | Multi-select | ✅ | AI Chat / AI Email / AI Calendar / AI Offer |
| `Integrations` | Multi-select | | Salesforce / HubSpot / Slack / Teams / Google Calendar / Zoom 等 |
| `Description` | Rich Text | ✅ | メタディスクリプション（80-120字） |
| `HeroMetric` | Rich Text | ✅ | Hero の大数字（例: `40%+`） |
| `HeroMetricLabel` | Rich Text | ✅ | Hero 大数字のラベル（例: `商談化率`） |
| `StatsJson` | Rich Text | | Hero の 3 数字 JSON（例: `[{"label":"商談化率","value":"40%+","context":"2倍"}]`） |
| `Quote` | Rich Text | | 代表的な一言引用 |
| `QuotePerson` | Rich Text | | 引用者の氏名・役職 |
| `QuoteAvatar` | Files & media | | 引用者の顔写真 |
| `CompanyLogo` | Files & media | ✅ | 会社ロゴ（SVG or 透過 PNG） |
| `HeroImage` | Files & media | | Hero に使う画像（オフィスやプロダクト使用風景） |
| `PublishedDate` | Date | ✅ | 公開日 |
| `ModifiedDate` | Date | | 更新日（SEO 用） |
| `FocusKeyword` | Rich Text | | SEO 用フォーカス KW（例: `AI SDR 導入事例`） |
| `Tags` | Multi-select | | タグ（業界・課題・機能） |
| `Published` | Checkbox | ✅ | 公開フラグ |
| `NoIndex` | Checkbox | | 検索除外フラグ |
| `Order` | Number | | 一覧での表示順（低い数字ほど上） |
| `Views` | Number | | 閲覧数（注目記事の選定用） |

## 記事本文の構造（Notion ページ本体）

Notion ページの本文は、以下の H2 セクション構造を推奨。Next.js 側で H2 を検知してナビゲーションを生成する。

```
## 会社について
短い紹介文（100-150 字）

## 導入前の課題
Before の状況、何が問題だったか

## Meeton ai を選んだ理由
選定理由と決め手

## 導入プロセス
キックオフから稼働まで

## 導入後の成果
After の数字と変化

## 印象的なエピソード
具体的な商談ストーリー

## 今後の展望
拡張計画、同じ課題を持つ会社へのメッセージ
```

## 記事ページの URL
`https://dynameet.ai/case-studies/{slug}/`

## 一覧ページ
`https://dynameet.ai/case-studies/`

## Notion DB 作成手順
1. 既存の Blog Posts DB を複製して "Case Studies" にリネーム（プロパティ構造が近いので）
2. 上記プロパティ表に合わせて追加・削除
3. 「DynaMeet Blog」インテグレーションを Case Studies DB にも接続（Share → Connect to）
4. DB ID を取得し `.env.local` に `NOTION_CASE_STUDIES_DATABASE_ID` として追加
5. 同じ値を Vercel の Production/Preview/Development env に追加

## 環境変数
```
NOTION_CASE_STUDIES_DATABASE_ID=（作成後のデータベース ID）
```

既存の `NOTION_TOKEN` は共用で OK。
