# Meeton Website (dynameet.ai)

Next.js 16 App Router / inline-style CSS / navy=frame・white=canvas・green #07CB79=唯一のアクセント。
JA がルート、EN は `/en/*` サブパス。デプロイ: `git push origin main`（本番git統合）+ `npx vercel deploy --prod --yes`（mirror）。build OOM 時 `NODE_OPTIONS="--max-old-space-size=8192"`。

## 製品構成: 5プロダクト × 4ステージ（stages.ts が正典）

| Stage | Product | URL |
|---|---|---|
| ① 掴む | Meeton Chat | /chat/ |
| ① 掴む | Meeton Ads（サイト内広告） | /ads/ |
| ② 育てる | Meeton Library | /library/ |
| ③ 商談化 | Meeton Calendar | /calendar/ |
| ④ 追客 | Meeton Email | /email/ |

ステージ①ランディング=/capture/。**旧称禁止**: AI Chat/AI Email/AI Calendar/AI Offer、Meeton Live、旧 `/features/*` URL（全部 /chat/ 等へ308済み）。

## 料金 v3（2026-07-02 deck p20）
基本プラン「リード獲得」¥15万〜（Chat+Ads+Library）+ 商談化アドオン(Calendar +5万) + 追客アドオン(Email +5万)。人気=基本+商談化 ¥20万〜(おすすめ)、フル ¥25万〜。EN: From ¥150,000/200,000/250,000 + 1ヶ月無料トライアル（/en/trial/、カード不要）。

## 承認済みファクト（これ以外の数値を創作しない）
商談化率60%+=EdulinX / チャットリード20倍=BizteX / 月間SQL2倍(20→41-48件)=G-gen / 受注2件=Univis / 初動5秒 / JSタグ1行・5分 / 24時間365日。

## i18n の要点
- 共有コンポーネントは `lang?: Lang = "ja"` prop。JA出力を変えない形でEN分岐。
- hreflang/canonical は `altLanguages()`（app/lib/i18n.ts）。**EN blog は slug+`-en` なので altLanguages 不可** → 手書き alternates（app/en/blog/[slug]）。
- EN-only ページ（/en/trial/、/en/legal/terms-self-serve|dpa|sub-processors）は `EN_ONLY_PREFIXES`（i18n.ts + middleware.ts）に登録必須。新 /en ページは next.config.js の `/en/:slug` negative-lookahead allowlist にも追加（`legal/` は登録済み）。
- middleware の EN_TWIN_PREFIXES に `terms` を**戻さない** — /en/terms/（スタブ）→ JA 正文 /terms/ へのリンクがブーメラン302になる（意図的除外）。
- geo は middleware.ts（bot非リダイレクト・pref_lang cookie優先・302）。
- 言語スイッチャーは `<a>`（Link だと prefetch が cookie 無しで 302 を掴んで壊れる）。

## 法務ページの掟（self-serve legal set — 経緯は PR #11）
- **二本立て**: /terms/=マネージド契約（JA が正文・第9条の2〜9-9 が JP レールの委託条項）/ /en/legal/terms-self-serve/=セルフサーブ契約（EN が正文）。/en/terms/ は**ルーティング用スタブ** — 全訳を復活させない（法的効力ゼロ、JA 改定のたびドリフトする）。
- DPA・サブプロセッサー一覧は意図的に **EN-only**（JP 顧客は DPA に署名しない）。一覧ページは DPA §5.2 の30日前変更通知メカニズム — ベンダー変更時はページ更新＋管理者メールがセット。
- **commitment-lean**: 国別 annex／「APP/PDPA に準拠」系の表現／具体日数の約束を追加しない。具体日数は DPA のみ、breach 通知 72h は **target であって SLA ではない**（binding は "without undue delay"）。ToS §17.1/§17.2 は ACL s64A(2)・NZ CGA s43(2) の法文トレース — 条文照合なしに文言を変えない。
- **policies = product commitments**: 実装済みの挙動しか書かない。marketing consent field は assistive（送信ゲートなし — 「同意なしをブロック」と書かない）、support access はオプトアウトが現状（"only with your permission"/"off by default" と書かない）。
- trust ページは**存在しない**（/security/ の「Data residency & documents」節に統合済み。再作成しない）。単一ソース: 所在地・全処理国内の事実=security ページ／コミット数値=DPA／ベンダー一覧=sub-processors ページ。

## その他の罠
- Next16 `revalidateTag(tag, 'max')` 第2引数必須。blog更新は `&tag=notion` 付き revalidate。
- 事例詳細リンクは `/cases/<slug>/`（`/case-studies/` は hub へ308され詳細に届かない）。
- 事例データは Notion=JA。EN面は `FEATURED_CASE_EN`（app/lib/featured-cases.ts）overlay 経由で表示。
- HubSpot フォームは captcha 有効で Submission API 不可 → embed + DOMラベル書換え（TrialPageClient/ContactPageClient）。
- public/llms.txt は AEO の正典 — 製品/料金変更時に必ず更新。
