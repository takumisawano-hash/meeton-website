# CRM 商談化チェックリスト (v1 simplified, 3 pages)

PDF target file: `public/downloads/crm-shokai-checklist.pdf`
Delivered via: `/solutions/crm-to-meeting/` Primary CTA → Meeton
Library popup → form submit → email DL link (or instant DL).
Spec parent: `docs/lp-spec-crm-to-meeting.md` §15.

Design owner: takumi (Canva / Figma で実装)
Markdown skeleton owner: this file
Launch requirement: LP 公開時に DL 可能であること。

Brand:
- Cover accent: cyan `#0891b2`
- CTA accent: green `#04cb78` (DynaMeet brand)
- Font: Hiragino Kaku Gothic ProN (PDF fallback OK)
- A4 portrait, 3 pages

---

## Cover (page 1, top half)

**Title (大)**
```
CRM 商談化チェックリスト
```

**Subtitle**
```
CRM に眠った商談機会を、10 分で点検する。
```

**One-liner intro**
```
HubSpot / Salesforce / Marketo に積み上がった過去 MQL・失注 contact・
休眠リード。「動いていないのは知っているが、何件・どこから・どう
動かせるか」が見えない状態を、10 分で見える化するためのワーク
シートです。
```

**Visual placeholder**: CRM contact のスタック → そこから複数の矢印が
「再商談化シグナル」として再起動する図 (Canva で線画で OK)。

**Footer (cover)**
```
Meeton ai — Web と CRM に眠る商談機会を、AI SDR が商談へ変える Platform
https://dynameet.ai
```

---

## Page 1 (continued, bottom half) — 自社 CRM の現状把握

> **使い方**: 各項目に直感で書き込んでください。正確な数字ではなく、
> ざっくりした感覚で OK です。書き終えたら次のページに進みます。

### ブロック 1 — contact 規模

```
□ 自社 CRM の contact 総数 (おおよそ)     [        件]
□ うち過去 6 ヶ月以上反応がない contact   [        件 / 割合 ___%]
□ うち過去 1 年以内に「失注」マークされた  [        件]
□ うち資料 DL 後にナーチャーが止まっている [        件]
```

### ブロック 2 — 直感チェック (1〜5 で評価)

```
□ 休眠 contact のうち、サイト再訪を検知できている        [ 1 2 3 4 5 ]
□ 失注 contact の「再検討入り」を検知できている          [ 1 2 3 4 5 ]
□ 過去 MQL の「料金ページ再閲覧」を担当者に通知できる    [ 1 2 3 4 5 ]
□ Inside Sales が休眠側にも手を動かせる余力がある        [ 1 2 3 4 5 ]
```

1〜2 が多い ⇒ 再商談化余地が大きく、Meeton ai のラストワンマイル
AI SDR が直接効くゾーン。

---

## Page 2 — 再商談化余地の見立て

> 1 で書いた数字を基に、年間でどれくらい眠っているリードが「実は
> 動かせる可能性がある」を試算します。

### Step A — 検討再開シグナル発生数

```
休眠 contact 総数 × 直近 3 ヶ月のサイト再訪率
[    件] × [    %] = [    件] /  3 ヶ月
                                    ↓
                              年間換算 [    件]
```

(目安: B2B SaaS で休眠 contact のうち 5〜15% が四半期内に
サイト再訪するというのが業界感覚値です。)

### Step B — 再商談化期待値

```
年間再訪 contact 数 × 自社の通常商談化率
[    件] × [    %] = [    件 / 年]
```

これが「いま CRM の中で動かせるはずなのに動いていない商談機会」の
規模感です。

### Step C — 商談単価で売上換算

```
[    件] × [    円 / 商談単価] = [    円 / 年]
```

---

## Page 3 — Meeton ai の差し込みポイント

> どこに AI SDR を差し込むと、Step A〜C の数字が動くかをチェック
> してください。複数チェック可。

### Meeton Email (AI フォロー)

```
□ 過去 MQL の検討再開シグナルを検知 → 1:1 で再アプローチ
□ 失注 contact のリブランド / 組織変更を検知 → 再開招待
□ 配信前の承認フロー設計 (送信前レビュー)
```

### Meeton Live (AI チャット)

```
□ 再訪した休眠 contact に過去の文脈を引き継ぎ即時対話
□ 「以前ご検討されていた件、進捗いかがですか」を AI が自然に切り出す
□ 料金ページに戻ってきた contact に AI SDR が即応答
```

### Meeton Calendar (AI 商談予約)

```
□ 温度が高まった瞬間に商談予約まで会話内で完結
□ CRM owner / 業種 / 規模に応じて担当者を自動アサイン
□ Salesforce / HubSpot へ自動同期、attribution 維持
```

### 結果まとめ

チェックが 3 つ以上入ったブロックがある場合、そこから AI SDR の
差し込みを設計すると最大効果が出やすいです。

---

## CTA (page 3 footer)

```
このチェックの結果を、自社 CRM データを見ながら 30 分で具体的に
詰めたい方は ──
→ 30 分の相談を予約する
   https://dynameet.ai/?calendarId=takumi-sawano&showChat=true
```

QR コードを併設 (Canva で生成、calendar URL を埋め込み)。

---

## Footer (全ページ)

```
© DynaMeet, Inc.  |  Meeton ai  |  https://dynameet.ai
```

ISMS 認証は審査合格済・認証発行待ち / セキュリティチェックシート対応可
の小さい行を入れる。

---

## v2 拡張プラン (LP launch 後)

- ページ 4-5 追加: 業界別 (SaaS / 製造業 / プロフェッショナル
  サービス / フィンテック) の再商談化パターン
- 業界別の "成功シナリオ 1 ケース" を 1 ページずつ
- HubSpot / Salesforce 別の連携設計図
- ROI 試算枠 (商談単価 × 再商談化数 × 受注率) の電卓
