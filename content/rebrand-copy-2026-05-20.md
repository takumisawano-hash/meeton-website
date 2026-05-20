# Meeton ai リブランディング Copy Spec (2026-05-20)

## 戦略
- **旧:** Web サイトのリードを、5秒で商談に変える
- **新:** 問い合わせを待つ Web サイトから、商談を生み出す AI 営業チャネルへ

「リード獲得ツール」→「AI SDR Platform」へ category pivot。Qualified モデル踏襲、日本市場向けに具体性増。

## デザイン方針
- bg: `#000` / `#0a0a0a` (Vercel style)
- Font: Inter + Geist Sans (display)
- Section 区切り: `border-t border-white/8` or 微シェード差。Gradient 禁止
- Cards: `bg-white/[0.03] border border-white/10 rounded-xl` — **no left color bar**
- Accent 色 1つだけ (CTA のみ)、現状 `--cta: #12a37d` をダーク背景に再調整
- AI 風禁止: glow border / mesh gradient / 回転ワード / 過剰アニメ
- モバイル: hamburger + 縦積み + sticky bottom CTA bar

---

# トップページ 9 section

## 1. Hero

### Tagline (H1)
**問い合わせを待つ Web サイトから、商談を生み出す AI 営業チャネルへ。**

### Sub-copy
Meeton ai は、Web サイトに AI SDR を配属し、訪問・問い合わせ・資料 DL・再訪問の瞬間に、会話・ヒアリング・資料提案・日程調整・追客までを自動化します。

### Mini How It Works (Hero 内 element)
訪問検知 → AI 会話 → ヒアリング → 資料提案 → 日程調整 → 追客 → CRM 連携

### CTA
- Primary: **デモを予約** (主)
- Secondary: **仕組みを見る** (→ #how-it-works anchor)
- Text link: **自社サイトの商談化余地を診断する**

### Visual
- 中央配置、bg `#000`、product screenshot or 静的 UI mock 下に配置 (回転 word / gradient 禁止)

---

## 2. Category / Vision

### Heading
**Meeton ai は、Web サイトに配属する AI SDR です。**

### Body
チャットボットでも、単なる日程調整ツールでもありません。Meeton ai は、Web サイトに来た見込み客に対して、営業担当の初動対応を自動で行う AI SDR です。会話、ヒアリング、資料提案、商談予約、追客まで、商談機会を生み出すために必要なアクションを実行します。

### Visual
- 静止画 or 短い文字組み (1 column 中央)

---

## 3. Problem + KPI Shift

### Heading
**リードは増えた。でも、商談は増えていない。**

### Body
広告、SEO、ウェビナー、ホワイトペーパーでリードは集まる。それでも多くの見込み客は、初動対応の遅れ、フォロー不足、再訪問の見逃しによって、商談にならないまま離脱していきます。

問題は、リード獲得ではなく、**リードから商談への変換率**です。

### Funnel 図
```
流入 → CV → 初動対応 → ヒアリング → 日程調整 → 商談
              ↑
        ここが抜け落ちている
```

### KPI Shift Table
**Web サイトの KPI を、CV 数から商談数へ。**

| 従来の見方 | Meeton ai で見るべき見方 |
|---|---|
| 問い合わせ数 | Web 経由商談数 |
| フォーム CVR | リード to 商談化率 |
| 資料 DL 数 | 資料 DL 後の商談化率 |
| チャット数 | 有効会話からの商談化率 |
| PV 数 | 高意向訪問者の商談化数 |

### 補助 CTA (Problem 直後)
> 「リードは来ているのに、商談にならない」を 30分で分解する無料ウェビナーを開催中。

CTA: **ウェビナーを見る** (small, ghost style)

---

## 4. New Funnel

### Heading
**フォーム送信を待つだけの Web サイトから、AI SDR が働く Web サイトへ。**

### Body
従来の Web サイトは、訪問者がフォームを送るまで何も起きません。Meeton ai は、訪問者の興味や行動に合わせて会話を開始し、疑問に答え、必要な資料を提案し、温度感が高まったタイミングで商談予約へつなげます。

### Visual
2 列対比図:
- **左 (Before):** フォーム送信 → カレンダー → 予約 (静的)
- **右 (After):** 訪問 → 会話 → ヒアリング → 資料提案 → 不安解消 → カレンダー → 予約 → 追客 (動的)

---

## 5. Use Cases (4分類)

### Heading
**Meeton ai が商談化する 4 つの瞬間**

### 4 cards (grid 2x2 → mobile 1col)

#### Card 1: 問い合わせ前の訪問者
- **見出し:** 問い合わせ前の訪問者
- **課題:** フォーム送信せず離脱する
- **Meeton ai の動き:** AI が会話して疑問解消、商談化まで導く

#### Card 2: 資料 DL 直後のリード
- **見出し:** 資料 DL 直後のリード
- **課題:** 温度が高いのに放置される
- **Meeton ai の動き:** 即時に日程調整を提示、その場で予約まで

#### Card 3: 予約しなかったリード
- **見出し:** 予約しなかったリード
- **課題:** その場で決めきれない
- **Meeton ai の動き:** AI メールで 1:1 追客、文脈を引き継いで再接客

#### Card 4: 再訪問した既存リード
- **見出し:** 再訪問した既存リード
- **課題:** 検討再開を見逃す
- **Meeton ai の動き:** 過去文脈を持って再接客、温度感に応じて商談化

---

## 6. How Meeton Works

### Heading
**Meeton が商談をつくる流れ**

### 7 step (1人の見込み客の旅)

1. **訪問者がサイトに来る** — 閲覧ページ、流入元、企業情報、過去行動を検知
2. **Meeton が話しかける** — ページ内容に合わせて自然に会話開始
3. **課題をヒアリングする** — 予算、課題、導入時期、利用目的を確認
4. **最適な資料を提案する** — 事例、料金表、比較表、稟議資料を出す
5. **温度感が高ければ日程調整へ** — 担当者のカレンダーを出してその場で予約
6. **予約しなかったら追客する** — メールや再訪問時に文脈を引き継いでフォロー
7. **営業へ通知・CRM 登録** — 会話ログ、興味、課題、スコアを共有

### Visual
- 縦軸 1 列 narrative + 各 step にスクリーンショット (チャット UI / カレンダー / メール / Slack 通知)
- Or 横スライド (mobile: 縦積み)

---

## 7. Capabilities (AI SDR の仕事 → 機能)

### Heading
**AI SDR の仕事を、機能で支える**

### Table (Qualified Piper 風)

| AI SDR の仕事 | 機能 | 説明 |
|---|---|---|
| **会話する** | Meeton Live | Web サイト訪問者と自然な対話で課題ヒアリング |
| **商談予約する** | Meeton Calendar | 温度の高い瞬間に即時カレンダー提示 |
| **資料を提案する** | Meeton Library | 会話文脈から最適な資料を自動選定 |
| **追客する** | Meeton Email | 予約しなかったリードに AI が 1:1 メール継続 |
| **判断する** | Meeton Intent | 訪問企業 ID + 行動シグナルから次のアクションを決定 |

### CTA
それぞれ「詳しく見る →」リンクで `/features/*/`

---

## 8. Proof

### Heading
**商談数・商談化率で見る Meeton ai の成果**

### Metric Strip (3 col 横並び、no card)

- **2.4 倍** Web 経由商談数 (導入企業平均)
- **40%+** AI 会話からの商談化率
- **5 秒** 初動対応時間 (※ tagline ではなく内側 metric として使用)

### Case Cards (3つ)
既存 case-studies から抜粋:
- **BizteX** — 月間 X 件商談自動創出
- **EdulinX** — 商談化率 X%
- **Univis** — 提案件数 X 倍

各 card: 企業 logo + 1 sentence quote + 3 数値 + 「導入事例を見る →」

---

## 9. CTA + FAQ

### Final CTA
**自社サイトで、どれだけ商談化できるか診断しませんか？**

サブコピー: 30 分のデモで、自社サイトの商談化余地を可視化します。

CTA buttons:
- Primary: **デモを予約**
- Secondary: **自社サイトの商談化余地を診断**
- Tertiary text: **無料ウェビナーを見る**

### FAQ (5 問)

**Q1. AI チャットボットとは何が違いますか？**
A. チャットボットは FAQ 応答が中心です。Meeton ai は AI SDR として、訪問者と会話し、課題を整理し、資料を提案し、商談予約や追客まで実行します。

**Q2. 日程調整ツールとは何が違いますか？**
A. 日程調整ツールは、予約の導線を最適化するものです。Meeton ai はその前段で、訪問者と会話し、課題を整理し、必要な情報を届けたうえで、商談予約や追客まで行う AI SDR です。

**Q3. 既存の MA / CRM と併用できますか？**
A. はい。HubSpot・Salesforce にネイティブ連携、リード情報・会話ログ・スコアを自動同期します。

**Q4. どれくらいで導入できますか？**
A. JavaScript タグを 1行設置するだけで稼働します。設定は通常 1営業日以内に完了します。

**Q5. トライアル期間中は何を評価すべきですか？**
A. 「リード数」ではなく「商談数 / 商談化率」を評価してください。Meeton ai は CV 数を増やすツールではなく、リードを商談に変えるツールです。

---

# 新規ページ

## /ai-sdr/ — 「AI SDR とは」

### Hero
**Web サイトに、AI SDR を配属する時代へ。**

### 構成
1. AI SDR とは何か (定義)
2. なぜ今 AI SDR か (Speed to Lead + コスト)
3. AI SDR vs 人間 SDR vs チャットボット (表)
4. AI SDR が解決する 4 つの課題 (Use Cases 流用)
5. Meeton ai の AI SDR としての特徴
6. CTA: デモ予約

### 狙う KW
- AI SDR (178 imp 2 CV winner)
- AI 営業 支援 (3,600/mo)
- 営業 AI / AI 営業 (1,600/mo)

---

## /compare/scheduling-vs-ai-sdr/ — 「日程調整 vs AI SDR」

### Hero
**日程調整リンクを出すだけでは、商談は増えない。**

### 構成
1. Problem: フォーム後だけの最適化では取りこぼす
2. 比較表 (日程調整ツール vs AI SDR の能力差)
3. 商談機会が生まれる前段プロセス (会話/ヒアリング/資料/不安解消)
4. ケース: 日程調整ツール → AI SDR 切替で X% 改善
5. CTA: デモ予約

### 注意
- Immedio 名指し avoid (景表法・比較広告規制)
- 「日程調整ツール一般」として抽象化

---

## /pricing/ — 料金プラン

### 4 プラン

| プラン | 対象 | 月額 | 位置づけ |
|---|---|---|---|
| **Calendar** | フォーム後の即時予約を始めたい企業 | ¥要問合 | Immedio 対抗・入口商品 |
| **Live** | Web 訪問者との会話を始めたい企業 | ¥要問合 | AI チャット・Web 接客 |
| **AI SDR Platform** | 商談創出を本格化したい企業 | ¥要問合 | Live + Calendar + Email + Library |
| **Enterprise** | 複数サイト・CRM 連携・高度設定 | カスタム | 大企業向け |

### 注意
**価格未確定** → "要問合せ" 表示 + デモ予約 CTA で誘導
sawano 価格確定次第更新

### 比較表
各プランの含まれる機能を ✓ / − で表示

### CTA
プラン別に「相談する」「デモを予約」

---

# Navigation 更新

### Desktop
- **AI SDR とは** → `/ai-sdr/`
- **プロダクト ▼** (dropdown)
  - Meeton Live
  - Meeton Calendar
  - Meeton Email
  - Meeton Library
  - Meeton Intent
- **活用シーン** → `/use-cases/` (将来作る、当面 home の Use Cases に anchor)
- **導入事例** → `/case-studies/`
- **料金** → `/pricing/`
- **比較** → `/compare/scheduling-vs-ai-sdr/`
- **資料** → モーダル
- **ブログ** → `/blog/`
- 右端 CTA: **デモを予約** (primary button)

### Mobile
- Hamburger
- 全項目縦積み
- Sticky bottom CTA bar: 「デモを予約」

---

# 削除する copy

「5秒で商談化」全 4箇所 (line 1211, 1501, 1503, 1913) → 削除
- ただし Proof の metric として「5 秒 初動対応時間」は保持

# 301 Redirects

```
/features/chatbot/ → /features/ai-chat/  (既存)
/features/detect/ → /features/ai-chat/  (既存)
... (既存 redirect 保持)
```

新規追加なし (URL 構造変えない、トップ + sub-page 追加のみ)。

---

# 実装順 (TaskList)

1. Copy doc 作成 (this file)
2. Section component 作成 (sections/Hero, Vision, Problem, NewFunnel, UseCases, HowItWorks, Capabilities, Proof, FinalCta)
3. HomePageClient.tsx 解体 → 新 section 構成で再構築
4. Nav.tsx 更新 (新 nav 構造)
5. /ai-sdr/ ページ作成
6. /compare/scheduling-vs-ai-sdr/ ページ作成
7. /pricing/ ページ作成
8. page.tsx metadata + JSON-LD 更新
9. tailwind / globals.css に Inter font + dark token 追加
10. Mobile sticky CTA bar
11. typecheck + build
12. Commit + push
