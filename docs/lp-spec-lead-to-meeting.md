# LP Spec — /solutions/lead-to-meeting/

**Status**: draft (2026-05-23, awaiting takumi sign-off)
**Owner**: takumi
**Implementation gate**: `docs/measurement-spec.md` §8 must pass before ads turn on
**Companion LP**: `/solutions/crm-to-meeting/` (sister spec)

---

## 1. One-line purpose

「リードは集めているのに商談につながらない」 — 広告 / SEO / ウェビナー /
資料 DL で MA / CRM にリードは積み上がるが、肝心の **商談化率が伸びない**
B2B 企業の共通課題を AI SDR で解く形を見せる。

CRM-to-Meeting が「過去資産の再活性化」に張るのに対し、Lead-to-Meeting
は **新規リードの商談転換** に張る。市場全体が抱える広い悩みに合わせる
ので、Meeton ai の差別化は弱いが、検索ボリュームは大きい。市場検証用の
広 net LP。

---

## 2. Target visitor

| 軸 | 詳細 |
|----|------|
| 職種 | マーケマネージャー / Inside Sales 責任者 / 営業企画 / 事業部長 / CMO |
| 業種 | SaaS、IT サービス、製造業、専門サービス (B2B 全般) |
| 規模 | 100–2000 名 (mid-market) |
| 心理 | 「リード数は増えたが商談化率がボトルネック」「MQL→SQL の歩留まりが悪い」 |
| 流入 | Google Search (顕在 KW) / リターゲ |

CRM-to-Meeting と比べて、**CRM ツール特定の前提を持たない** 広い層。

---

## 3. URL / Routing

- Path: `/solutions/lead-to-meeting/`
- Canonical: `https://dynameet.ai/solutions/lead-to-meeting/`
- `<body data-lp-slug="lead-to-meeting">` (GA4 dimension 連携)
- Indexable: **yes**
- Sitemap: include

---

## 4. Hero

### Eyebrow

```
リードは増えたが、商談は増えていない企業へ
```

### H1

```
リードは増えた。
でも、商談が増えていない。
```

(2 行目を gradient 強調 — 否定文だが、マーケ担当への寄り添い文脈で
"問題提起 → 解決提示" の流れを作る。「リードを増やす段階は終わり」
のような外部GPT提案は、マーケ施策を否定された印象になりやすいため
不採用。)

### Sub-headline

```
Meeton ai は、問い合わせ・資料 DL・再訪問のタイミングで AI SDR が
会話・資料提案・日程調整・追客を行い、リードを商談へ進めます。
```

### Hero proof row (3 stat)

| value | unit | label |
|-------|------|-------|
| 5 | 秒 | リード発生時の初動 |
| 24 | /7 | AI 稼働 |
| 4 | モジュール | Live / Email / Calendar / Library |

(CRM-to-Meeting と同じ proof set。 Meeton ai 全体の事実なのでどちらの
LP でも誠実に使える)

### Hero CTA

**Primary**:
```
リード商談化チェックリストを受け取る
```
→ Meeton Library popup (`openMeetonDownloadCenter`)

**Secondary**:
```
30 分で相談する
```
→ DemoBookingButton

CRM-to-Meeting と同じ 2 段 CTA 構造。診断シートの中身は別 (本 LP は
「リード商談化チェックリスト」、CRM-to-Meeting は「CRM 商談化チェック
リスト」) で内容差別化する。

---

## 5. Pain section — 3 cards

| # | Title | Body | Signal (directional) |
|---|-------|------|----------------------|
| 01 | 問い合わせ後のフォローが追いつかない | フォーム送信されてから営業の最初の連絡まで平均 42 時間。その間にリードの温度が冷め、競合に流れていきます。 | B2B 一般データで、初動 5 分以内 vs 30 分後のコンタクト率は大差が出ます。 |
| 02 | MQL → SQL の歩留まりが悪い | 資料 DL や問い合わせで MQL は積み上がるのに、Inside Sales のキャパや判定基準が追いつかず SQL に変換されない。 | 多くの企業で MQL→SQL 転換率は 10〜20%、それ以下に停滞しがちです。 |
| 03 | ナーチャリングが「とにかく送る」になっている | MA で開封されないステップメールが流れているだけで、リードの行動文脈に合わせた個別アプローチができない。 | 業界平均で MA メール開封率は 20〜30%、しかも開封者でも商談化率は小さいまま。 |

---

## 6. Solution section — 3 modules

| # | Module | Body |
|---|--------|------|
| 01 | **Meeton Live** (AI チャット) | フォーム送信・サンクスページ・サイト再訪の瞬間に AI SDR がリアルタイムで会話。資料 DL 文脈や過去履歴を引き継いだ深い質問にも即応し、温度が高いうちに商談予約まで完結します。 → `/features/ai-chat/` |
| 02 | **Meeton Calendar** (AI 商談予約) | リードがコンバートした瞬間に AI が担当者を割り振り、5 秒以内に商談予約を提示。フォーム送信・サンクスページ・メール経由のどこからでも発動します。 → `/features/meetings/` |
| 03 | **Meeton Email** (AI フォロー) | 即時予約しなかったリードに対し、AI が 1:1 で文脈に沿った追客を支援 / 自動化。MA テンプレ配信ではなく、リードの行動シグナルに合わせて内容・タイミング・トーンを動的に判断します。 → `/features/ai-email/` |

(Library は補助機能扱い、本ページの主要 3 から外す)

---

## 7. Proof section — 関連する成果事例

CRM-to-Meeting と同じく、直接 lead-to-meeting 専用の case study ではない。
ただし「リード → 商談」の文脈は本 LP の核心と一致するため、より自然に
proof として並べられる。

```
これまでに Meeton ai が生み出した、商談創出の事例
```

| Co | Metric | Label | Frame |
|----|--------|-------|-------|
| BizteX | 月 20 件+ | チャット経由リード (月 1〜2 件 → ) | Web 経由のリード商談化 |
| EdulinX | 商談化率 60%+ | Meeton ai 経由商談化率 | AI SDR による商談転換 |
| Univis | 3 ヶ月で 2 件受注 | 導入後の創出 | 提案件数も増加 |

各カード末尾に `/case-studies/<slug>/` リンク。

---

## 8. How it works — 4 steps

| # | Title | Body |
|---|-------|------|
| 01 | リードコンバートの瞬間を検知 | フォーム送信 / 資料 DL / サンクスページ表示 / サイト再訪 — すべての conversion トリガーを AI が即時検知。 |
| 02 | 5 秒以内に初動応答 | Meeton Live がリアルタイム会話を開始 (resp. Email の場合は 1:1 AI 返信)。担当者の都合に依存しません。 |
| 03 | 温度に合わせて商談予約 or 追客 | 関心が高ければ Meeton Calendar で商談予約まで完結。まだ早い場合は Meeton Email で 1:1 追客に切り替え。 |
| 04 | CRM へ自動同期 | 会話・流入経路・興味カテゴリ・商談化結果が、コンタクト単位で HubSpot / Salesforce に自動書き戻し。アトリビューションが消えません。 |

---

## 9. FAQ — 6 items

1. **既存の MA (HubSpot / Marketo / Pardot) との関係は？**
   置き換える必要はありません。Meeton ai は MA / CRM が引き渡した先の
   「商談化のラストワンマイル」を担います。既存スタックの上に被せて
   使う設計です。HubSpot / Salesforce はネイティブ連携済み。

2. **どのくらいで商談化率の改善が見えますか？**
   業種・運用設計によりますが、AI チャット経由で商談化率 60%+ を実現
   している事例があります (EdulinX)。初動 5 秒対応 + 文脈に沿った会話が
   主因。多くの導入企業で初週から商談創出が始まっています。

3. **シナリオ設計や FAQ 作り込みは必要ですか？**
   不要です。Meeton Live は生成 AI ベースで、貴社の公式情報 (サイト・
   資料・FAQ・過去問い合わせ) を学習データとし、未定義の質問にも文脈で
   応答します。「ご質問にお答えできません」での脱落がありません。

4. **問い合わせ後のスピード対応 だけで成果が出るのですか？**
   初動 5 秒は最重要因子の 1 つですが、それだけではありません。Meeton ai
   は会話の中で温度感を判定し、ヒアリングを進め、適切なタイミングで
   商談予約 or 追客 or 資料提案を選択します。「対応が早い」ではなく
   「商談に変える」までを設計しています。

5. **小規模なリード数でも導入する意味はありますか？**
   月数百件のリードでも、初動 5 秒で取れるかどうかは商談化率に直結する
   ので、規模より「取りこぼし許容度」が判断軸です。月 10 件でも 1 件が
   数百万円の B2B 案件なら、初動の自動化は価値があります。

6. **セキュリティはどうなっていますか？**
   ISMS 認証は審査合格済み・認証発行待ちの段階です。顧客データは
   AES-256 で保管、社内アクセスは最小権限。HubSpot / Salesforce との
   連携も official OAuth scope のみ。セキュリティチェックシート対応、
   NDA 締結、アクセス権限管理にも個別対応可能。詳細は情報セキュリティ
   ポリシー (`/security-policy/`) を参照。

---

## 10. Final CTA section

### Heading

```
リードを商談化できているか、10 分で点検しませんか？
```

### Sub

```
自己診断シート (PDF, A4 3 ページ) に沿って、自社の問い合わせ後フロー /
ナーチャー設計 / 商談化率を点検できます。結果次第で、AI SDR がどこに
差し込めるかを 30 分の相談でさらに具体的に詰めることもできます。
```

### CTA layout

**Primary**:
```
リード商談化チェックリストを受け取る
```

**Secondary**:
```
30 分で相談する
```

ウェビナーは下部の補助動線として残せる (CRM-to-Meeting より相性は
良い)。

---

## 11. Visual identity

CRM-to-Meeting と同じ basic palette:

- **Primary CTA**: `#04cb78` (DynaMeet green) — 固定。
- **Accent (sub)**: `#3b6ff5` (blue) — 「リード商談化」 = マーケ系の
  連想で blue。CRM-to-Meeting の cyan と差別化。
- **Background**: `#fafaf7` / `#fff`
- **Border**: `#e4eaef`

SolutionLpTemplate の `accent` prop = `#3b6ff5`、 `primaryCtaColor` で
green を上書き。

---

## 12. Ad groups → LP message match

| Ad group | 主 KW | 広告 H1 | LP 内 pin section |
|----------|-------|---------|-------------------|
| lead_to_meeting_general | リード 商談化 / BtoB リード 商談化 | 「リードを商談に変える AI SDR」 | Pain 全部 + Solution 全部 |
| mql_to_sql | MQL SQL 転換 / MQL 商談化 / mql to sql | 「MQL から商談を生む AI SDR」 | Pain 02 + Solution 01/02 |
| form_to_meeting | 問い合わせ 商談化 / フォーム後 フォロー / サンクスページ 日程調整 | 「問い合わせ直後に商談予約を完結」 | Pain 01 + Solution 02 (Calendar) |
| content_followup | 資料ダウンロード 商談化 / ホワイトペーパー フォロー | 「資料 DL 後を商談に変える AI フォロー」 | Pain 02 + Solution 03 (Email) |
| nurturing | リードナーチャリング 商談化 / 開封されない MA | 「形骸化したナーチャを AI で再生」 | Pain 03 + Solution 03 (Email) |

`utm_campaign` = `2026q2_lead_to_meeting`、`utm_content` = ad group slug。

---

## 13. 否定キーワード

CRM-to-Meeting と共通の seed list に加えて、Lead-to-Meeting 固有の
ノイズ除外:

```
(共通)
個人 / 個人向け
求人 / 採用 / 転職
リスト販売 / 名簿販売 / 名簿
テレアポ代行 / 代行業 / アウトソース
無料 (基本除外、ad group「無料診断」は別管理)
意味 / とは
例文 / テンプレート / サンプル
やり方 / 方法 / 手順
就活 / 就職 / 学生 / 新卒
キャリア

(Lead-to-Meeting 固有)
営業職 (転職向け検索が混ざる)
研修 / セミナー (講座系のノイズ)
資料 ダウンロード (これ自体は商品買いに行く検索ではない)
無料 ホワイトペーパー (情報収集層)
書籍 / 本 / おすすめ
```

---

## 14. 計測イベント

CRM-to-Meeting と同じ event taxonomy、`lp_slug=lead-to-meeting` 値の
違いだけ。`docs/measurement-spec.md` §3 と整合。

| Event | Trigger | Required params |
|-------|---------|-----------------|
| `page_view` | LP 着地 | utm_*, gclid, lp_slug=lead-to-meeting |
| `primary_cta_click` | チェックリスト DL クリック | cta_location, lp_slug |
| `secondary_cta_click` | 30 分相談クリック | cta_location, lp_slug |
| `chat_open` | チャット launcher | lp_slug |
| `download_center_open` | popup 表示 | lp_slug, source=primary_cta |
| `download_form_submit` | DL フォーム送信 | lp_slug, lead_email, all utm, gclid |
| `calendar_view` | カレンダー表示 | lp_slug, source=secondary_cta |
| `calendar_book` | 予約完了 | lp_slug, meeting_type=30min, all utm, gclid, value=50000, currency=JPY |
| `generate_lead` / `conversion` | form / book と同タイミング | 同上 |

HubSpot 側で `meeton_landing_path=/solutions/lead-to-meeting/` で
contact がこの LP 経由か判別。

---

## 15. 自己診断シートの中身 — リード商談化チェックリスト

CRM-to-Meeting と異なる視点で構成。初版 3-5 ページ。

**ページ 1: 問い合わせ後フローの点検**
- フォーム送信後、最初の連絡までの平均時間 ___ 時間
- 営業時間外問い合わせの対応率 ___ %
- フォーム送信後 24 時間以内に商談予約まで進む比率 ___ %

**ページ 2: ナーチャリングの実態**
- MA で送っているメールの開封率 ___ %
- ナーチャ経由から商談に進む比率 ___ %
- ナーチャ stop / opt-out の運用 (定期見直しありなし) ___

**ページ 3: 商談化率の現状把握**
- MQL → SQL 変換率 ___ %
- SQL → 商談 → 受注の各段階の歩留まり ___ / ___ / ___
- AI SDR を差し込むと改善が期待できる転換ポイント (チェック)

**ページ 4-5 (拡張)**: 改善優先順位の整理。Meeton ai の 3 モジュール
(Live / Calendar / Email) が、上記どの転換ポイントを解くかの mapping。

---

## 16. 制作タスク (Phase 0 中)

- [ ] `app/solutions/lead-to-meeting/page.tsx` を作成、本 spec の
      `SolutionLpConfig` を渡す
- [ ] チェックリスト PDF を `public/downloads/lead-shokai-checklist.pdf`
      として配置 (初版 3-5 ページ、CRM 用と内容差別化)
- [ ] HubSpot Form: "リード商談化チェックリスト DL" を作成、内部
      form ID を spec に追記
- [ ] sitemap.ts に `/solutions/lead-to-meeting/` 追加
- [ ] §8 verification を CRM-to-Meeting と同一手順で実行

---

## 17. Open questions

なし。CRM-to-Meeting spec で確認済の Open questions が本 LP にも
適用される (Email reactivation 実装済 / HubSpot SF 連携済 / ISMS 審査
合格済 / PDF launch 同時)。

実装着手可能。
