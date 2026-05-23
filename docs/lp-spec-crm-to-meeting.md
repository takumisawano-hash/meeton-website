# LP Spec — /solutions/crm-to-meeting/

**Status**: draft (2026-05-23, awaiting takumi sign-off)
**Owner**: takumi
**Implementation gate**: `docs/measurement-spec.md` §8 must pass before ads turn on
**Companion LP**: `/solutions/lead-to-meeting/` (separate spec)

---

## 1. One-line purpose

CRM (HubSpot / Salesforce / Marketo) にすでにリードが蓄積されている
B2B 企業に対し、**過去 MQL・失注・休眠 contact から再商談化** できる
形を作る AI SDR Platform = Meeton ai であることを、課題語で検索した
visitor に対して 30 秒以内に納得させる。

直接事例がまだないため、Proof は「関連する Meeton ai の商談創出事例」
として誠実に並べ、CRM-to-Meeting 専用実績は **絶対に捏造しない**。

---

## 2. Target visitor

| 軸 | 詳細 |
|----|------|
| 職種 | マーケマネージャー / Inside Sales 責任者 / RevOps / CRM 管理者 / CMO |
| 業種 | SaaS、IT、専門サービス、製造業の B2B |
| 規模 | 100–2000 名 (mid-market) |
| 心理 | 「CRM にリードはたくさんあるが活かしきれていない」 自覚あり |
| 流入 | Google Search (顕在 KW) / リターゲ / outbound メール経由 |

---

## 3. URL / Routing

- Path: `/solutions/crm-to-meeting/`
- Canonical: `https://dynameet.ai/solutions/crm-to-meeting/`
- `<body data-lp-slug="crm-to-meeting">` (GA4 dimension 連携)
- Indexable: **yes** (paid 流入後、SEO でも拾う前提)
- Sitemap: include

---

## 4. Hero

### Eyebrow

```
CRM・MA にリードが蓄積されている企業へ
```

英語の "For HubSpot / Salesforce / Marketo ユーザー" 表現は外資感が
強いので回避。

### H1

```
CRM に眠る商談機会を、
AI SDR がもう一度動かす。
```

(2 行目を gradient 強調)

### Sub-headline (1-2 文)

```
資料 DL 後に放置された MQL、過去の失注 contact、再訪している休眠リード。
Meeton ai は CRM データと Web 行動を AI SDR が読み、文脈に沿った再
アプローチで商談機会を生み出します。
```

### Hero proof row (3 stat)

| value | unit | label |
|-------|------|-------|
| 5 | 秒 | リード再検知時の初動 |
| 24 | /7 | AI 稼働 |
| 4 | モジュール | Live / Email / Calendar / Library |

(数字を盛らない。これは Meeton ai 全体の事実、CRM-to-Meeting 専用
事例ではない)

### Hero CTA

**Primary**:
```
CRM 商談化チェックリストを受け取る
```
→ Meeton Library popup (`window.Meeton.openDownloadCenter()`) を起動。

**Secondary**:
```
30 分で相談する
```
→ DemoBookingButton (`/?calendarId=takumi-sawano&showChat=true`)

軽 CV (チェックリスト DL) と 重 CV (30 分相談) を分けて計測する
ので、CTA は 2 段にする。

---

## 5. Pain section — 3 cards

| # | Title | Body | Signal (directional, no fabricated stat) |
|---|-------|------|-------------------------------------------|
| 01 | 資料 DL 後に温度が冷めた MQL | 資料を DL したリードに対しナーチャー配信で「とにかく送る」を続け、検討タイミングを逃して結局商談に進まない。 | 多くの企業で、MQL の検討再開シグナルは可視化されていません。 |
| 02 | 「失注 = 永久に動かないリスト」化 | 一度失注した contact は手動でフォローし直されることが少なく、CRM の山に埋もれていきます。 | 失注後 6〜18 ヶ月で再検討する企業は一定割合存在しますが、検知できないと商談に戻りません。 |
| 03 | 休眠リードに最適な再接触ができない | 「いつ・誰に・どんな内容で再接触するか」を考えるリソースがなく、結果として CRM 上で contact 数だけが増え続ける。 | Inside Sales のキャパは決裁者・新規 MQL に振られるため、休眠側まで手が回りません。 |

---

## 6. Solution section — 3 modules

各 module は Meeton ai 既存ページへリンク。

| # | Module | Body |
|---|--------|------|
| 01 | **Meeton Email** (AI フォロー) | CRM 内の過去 MQL・失注 contact の検討再開シグナル (Web 再訪、料金ページ閲覧、メール開封) を検知し、AI が 1:1 で文脈に沿った再アプローチ。MA 一斉送信ではなく動的に内容・タイミング・トーンを判断。 → `/features/ai-email/` |
| 02 | **Meeton Live** (AI チャット) | 再訪した識別済みリードに、過去の閲覧・DL・メール反応を引き継いだ AI SDR が即時対応。「以前ご検討されていた件、進捗はいかがですか」のような自然な再開を会話で実現。 → `/features/ai-chat/` |
| 03 | **Meeton Calendar** (AI 商談予約) | 温度が高まった瞬間に AI が商談予約まで完結。CRM の owner / 業種 / 規模に応じて担当者を自動アサインし、Salesforce / HubSpot へ自動同期。 → `/features/meetings/` |

(Library は補助機能扱い、本ページの主要 3 から外す。HomePage 整理と整合)

---

## 7. Proof section — 関連する成果事例

CRM 休眠リード再商談化の **直接事例はまだない**。Section heading で
「関連する成果事例」と明示し、誤認を避ける。

```
これまでに Meeton ai が生み出した、関連する商談創出の事例
```

| Co | Metric | Label | Frame |
|----|--------|-------|-------|
| BizteX | 月 20 件+ | チャット経由リード (月 1〜2 件 → ) | Web 経由のリード活性化 |
| EdulinX | 商談化率 60%+ | Meeton ai 経由商談化率 | AI SDR による初動改善 |
| Univis | 3 ヶ月で 2 件受注 | 導入後の創出 | 提案件数も増加 |

(BizteX / EdulinX / Univis は本物の数字。CRM 文脈で誤認させる
ような書き方はしない。)

各カード末尾に「関連事例として参考にする」ニュアンスで `/case-studies/<slug>/`
へリンク。

---

## 8. How it works — 4 steps

| # | Title | Body |
|---|-------|------|
| 01 | CRM / MA を接続 | HubSpot / Salesforce / Marketo のネイティブ連携でリード・会話履歴・商談履歴を取り込み。 |
| 02 | 検討再開シグナルを検知 | サイト再訪、料金ページ閲覧、メール開封・クリック、資料 DL を AI が常時監視。 |
| 03 | 文脈に沿った再アプローチ | Meeton Email が 1:1 で再アプローチ、Meeton Live が再訪時に対話。「いつ・誰に・何を」を AI が判断。 |
| 04 | 商談予約で完結 | 温度が高い瞬間に Meeton Calendar が予約を提示し、担当者は商談に集中。 |

---

## 9. FAQ — 6 items

1. **CRM 連携の工数はどのくらいですか？**
   HubSpot / Salesforce はネイティブ連携、OAuth ベースで 30 分〜数時間で
   接続できます。Marketo / Pardot は API 連携で数日。技術専任エンジニア
   は不要、設定ガイドに沿って進められる形です。

2. **既存の MA (HubSpot / Marketo / Pardot) を置き換える必要は？**
   いいえ。Meeton ai は MA を置き換えるツールではなく、MA / CRM が
   引き渡した先の「ラストワンマイル」を担います。既存スタックの上に
   被せて使う設計です。

3. **どんなデータがあれば成果が出ますか？**
   最低限、過去 MQL の Web 行動ログ (サイト訪問履歴) と email
   インタラクション (開封・クリック) があれば動作します。CRM contact
   数 1,000 件以上を持つ企業で特に効果が出やすい設計です。

4. **休眠リード再商談化の成果はどのくらい？**
   現時点では「CRM-to-Meeting 直接事例」としてご紹介できる数字はまだ
   ありません。本ページは Meeton ai のラストワンマイル AI SDR としての
   関連成果 (BizteX チャットリード 20 倍、EdulinX 商談化率 60%+、Univis
   3 ヶ月で 2 件受注) を踏まえてご紹介しています。CRM 文脈での具体の
   試算は 30 分の相談でお伝えします。

5. **既存 contact に勝手にメールが送られて炎上しませんか？**
   いいえ。Meeton Email は事前定義された配信ポリシー (停止条件・送信
   頻度・配信時間帯) に従い、過去 12 ヶ月以内に opt-out 履歴がある
   contact は除外。送信前に必ず人間のレビュー段階を入れる運用も選べます。

6. **セキュリティはどうなっていますか？**
   ISMS 取得を準備中、顧客データは AES-256 で保管、社内アクセスは最
   小権限。HubSpot / Salesforce との連携も official OAuth scope のみを
   要求し、データ書き戻し範囲は管理画面で個別 ON/OFF できます。詳細は
   情報セキュリティポリシー (`/security-policy/`) を参照。

---

## 10. Final CTA section

### Heading

```
CRM に眠る商談機会、いくつ動かせるか診断しませんか？
```

### Sub

```
自己診断シート (PDF, A4 3 ページ) に沿って、自社の CRM 状態を 10 分
で点検できます。チェックの結果、再商談化余地が見えた場合は 30 分の
相談でさらに具体的に詰めることもできます。
```

### CTA layout

**Primary**:
```
CRM 商談化チェックリストを受け取る
```
→ `openMeetonDownloadCenter`

**Secondary**:
```
30 分で相談する
```
→ DemoBookingButton, utmCampaign `crm-to-meeting__final_demo`

ウェビナーは下部 FAQ section の補助リンクとして残す程度。CRM-to-
Meeting は顕在課題 LP なので、ウェビナー誘導の優先度は低い。

---

## 11. Visual identity

- **Brand primary CTA color**: `#04cb78` (DynaMeet green) — 固定。
  LP ごとに CTA 色を変えず、ブランド一貫性を保つ。
- **Accent (sub)**: `#0891b2` (cyan) — CRM = 業務系の連想で、 hero
  eyebrow / pain numbers / step badges に使う。
- **Background**: `#fafaf7` (off-white) / `#fff` (card)
- **Border**: `#e4eaef`
- **Pain dot / metric color**: cyan accent

SolutionLpTemplate の `accent` prop = `#0891b2` を渡し、
**ただし `sl-btn-primary` の background は green `#04cb78` で
オーバーライドする** (template に variant prop を追加する必要あり)。

---

## 12. Ad groups → LP message match

Google Search 配信時、ad group ごとに広告文と LP 表示メッセージを
合わせる。LP 上では `?ad_group=...` を URL に含めて、JS で対応する
section を pin する想定 (Phase 2 で実装、Phase 1 は同一 LP で OK)。

| Ad group | 主 KW | 広告 H1 | LP 内 pin section |
|----------|-------|---------|-------------------|
| crm_dormant_revival | 休眠リード 掘り起こし / 休眠顧客 BtoB / CRM 休眠 contact | 「CRM に眠る商談機会を再活性化」 | Pain 01 + Solution 01 (Email) |
| crm_lost_deal | 失注リード 再アプローチ / 失注 顧客 再活用 / lost deal reactivation | 「失注リードから商談を再生」 | Pain 02 + Solution 01 (Email) |
| crm_mql_reactivation | MQL 再活性化 / MQL 商談化 / mql to sql | 「MQL を商談へ進める AI SDR」 | Pain 03 + Solution 02 (Live) |
| crm_tool_hubspot | HubSpot リード 活用 / hubspot 商談化 | 「HubSpot に眠るリードを商談化」 | Solution 全部 + How it works |
| crm_tool_salesforce | Salesforce リード 活用 / salesforce 失注 | 「Salesforce 過去リードを再商談化」 | Solution 全部 + How it works |

各 ad group の `utm_campaign` = `2026q2_crm_to_meeting`、
`utm_content` = ad group slug (`crm_dormant_revival` 等)、
`utm_term` = 実検索語句 (auto から自動付与)。

---

## 13. 否定キーワード (起動前に Google Ads に登録)

CRM-to-Meeting の検索は B2C や営業代行系のノイズが混ざりやすい。
初期から除外。

```
個人 / 個人向け
求人 / 採用 / 転職
リスト販売 / 名簿販売 / 名簿
テレアポ代行 / 代行業 / アウトソース
無料 (※ ただし「無料診断」「無料相談」は許可で個別管理)
意味 / とは
例文 / テンプレート / サンプル
やり方 / 方法 / 手順 (← 情報収集層多すぎ)
就活 / 就職
学生 / 新卒
キャリア
```

「無料」は曖昧。基本除外、ただし `無料 診断` `無料 相談` は別 ad group
で完全一致だけ拾う。

---

## 14. 計測イベント (LP 単位の event taxonomy)

`docs/measurement-spec.md` §3 と整合。LP 固有で取りたい event:

| Event | Trigger | Required params |
|-------|---------|-----------------|
| `page_view` | LP 着地時 | utm_*, gclid, lp_slug=crm-to-meeting |
| `primary_cta_click` | 「チェックリストを受け取る」クリック | cta_location (hero/final), lp_slug |
| `secondary_cta_click` | 「30 分で相談する」クリック | cta_location, lp_slug |
| `chat_open` | 右下チャット launcher クリック | lp_slug |
| `download_center_open` | Meeton Library popup 表示 | lp_slug, source=primary_cta |
| `download_form_submit` | チェックリスト DL フォーム送信 | lp_slug, lead_email, all utm, gclid |
| `calendar_view` | カレンダー widget 表示 | lp_slug, source=secondary_cta |
| `calendar_book` | 予約完了 | lp_slug, meeting_type=30min, all utm, gclid, value=50000, currency=JPY |
| `generate_lead` | form_submit / calendar_book と同タイミングで Google Ads CV mirror | 同上 |
| `conversion` | 同上、send_to=AW-18060590496/... | 同上 |

HubSpot 側は `meeton_landing_path=/solutions/crm-to-meeting/` で
contact がこの LP 経由かどうか判別可能になる。

---

## 15. 自己診断シートの中身 (チェックリスト PDF, A4 3 ページ)

LP 制作とは別タスクだが、Primary CTA で配るシートの構成案:

**ページ 1: 自社 CRM の現状把握**
- contact 総数 (おおよそ) ___
- うち過去 6 ヶ月以上反応がない休眠 contact ___
- うち過去 1 年以内に失注した contact ___
- うち資料 DL 後にナーチャーが止まっている MQL ___

**ページ 2: 再商談化余地の見立て**
- 休眠 contact のうち、サイト再訪が直近 3 ヶ月で発生した割合 ___%
- 失注 contact のうち、リブランド・組織変更があった可能性 ___件
- MQL のうち、料金ページ・事例ページを再閲覧した割合 ___%

**ページ 3: Meeton ai の差し込みポイント**
- Meeton Email でカバーできる範囲 (チェック)
- Meeton Live でカバーできる範囲 (チェック)
- Meeton Calendar が必要なポイント (チェック)
- → 30 分相談で具体的な再商談化シナリオを設計

PDF 制作 = Canva / Figma / その他で別工程 (Phase 0 中に並行)。
PDF 完成までは「準備中」表記で受付フォームだけ立てる、で進めても可。

---

## 16. 制作タスク (Phase 0 中)

LP 実装に必要な手順:

- [ ] `app/solutions/SolutionLpTemplate.tsx` に `primaryCtaColor` prop を追加
      (デフォルト accent、本 LP は green `#04cb78` でオーバーライド)
- [ ] `app/solutions/crm-to-meeting/page.tsx` を作成、本 spec の
      `SolutionLpConfig` を渡す
- [ ] チェックリスト PDF を `public/downloads/crm-shokai-checklist.pdf`
      として配置 (準備中なら受付フォームのみ)
- [ ] HubSpot Form: "CRM 商談化チェックリスト DL" を作成、内部 form
      ID を spec に追記
- [ ] `meeton_landing_path` 値が `/solutions/crm-to-meeting/` で
      HubSpot Contact に書き戻されることを §8 verification で確認
- [ ] sitemap.ts に `/solutions/crm-to-meeting/` を追加

---

## 17. Open questions (実装前に確定したい)

1. **チェックリスト PDF の制作期日**: LP launch と同時 or PDF は遅らせる?
   → Phase 0 中に並行できる体制?

2. **Meeton Email の自動 reactivation 機能、現状の利用可能性**:
   spec ページ上は「動的な再アプローチ」と書いているが、実プロダクトで
   現時点でどこまで動く? デモで見せられる UI / フローはあるか?

3. **OAuth 連携の実装状況**: HubSpot / Salesforce ネイティブ連携、
   「30 分〜数時間」と書いてあるが、現プロダクトでの実態は?

4. **6 番目 FAQ (セキュリティ)**: ISMS は現状取得済み? 準備中?
   表現を実態に合わせる必要あり。

これら確定後に LP 実装着手。
