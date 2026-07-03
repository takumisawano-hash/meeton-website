# リード商談化チェックリスト (v1 simplified, 3 pages)

PDF target file: `public/downloads/lead-shokai-checklist.pdf`
Delivered via: `/solutions/lead-to-meeting/` Primary CTA → Meeton
Library popup → form submit → email DL link (or instant DL).
Spec parent: `docs/lp-spec-lead-to-meeting.md` §15.

Design owner: takumi (Canva / Figma で実装)
Markdown skeleton owner: this file
Launch requirement: LP 公開時に DL 可能であること。

Brand:
- Cover accent: blue `#3b6ff5`
- CTA accent: green `#04cb78` (DynaMeet brand)
- Font: Hiragino Kaku Gothic ProN (PDF fallback OK)
- A4 portrait, 3 pages

---

## Cover (page 1, top half)

**Title (大)**
```
リード商談化チェックリスト
```

**Subtitle**
```
集めたリードが、商談につながっているか。10 分で点検する。
```

**One-liner intro**
```
広告・SEO・ウェビナー・資料 DL で集めたリードが、CRM の山に積み
上がるだけになっていませんか？問い合わせ後フロー / ナーチャ設計 /
MQL→SQL 転換率を 10 分で見える化し、AI SDR を差し込むと何が動く
かを判断するためのワークシートです。
```

**Visual placeholder**: ファネル図 (リード → MQL → SQL → 商談) で、
MQL → SQL 段でリードが詰まっている図。Canva で簡易作図 OK。

**Footer (cover)**
```
Meeton ai — Web と CRM に眠る商談機会を、AI SDR が商談へ変える Platform
https://dynameet.ai
```

---

## Page 1 (continued, bottom half) — 問い合わせ後フローの点検

> **使い方**: 各項目に直感で書き込んでください。正確な数字ではなく、
> ざっくりした感覚で OK です。書き終えたら次のページに進みます。

### ブロック 1 — 初動対応の実態

```
□ フォーム送信後、最初の連絡までの平均時間            [    時間]
□ 営業時間外問い合わせの当日対応率                    [    %]
□ フォーム送信後 24 時間以内に商談予約まで進む比率    [    %]
□ サンクスページから直接商談予約 (Calendar) を出せる  [ Yes / No ]
```

### ブロック 2 — 直感チェック (1〜5 で評価)

```
□ 「もう少し早く対応していれば取れた」感覚がある        [ 1 2 3 4 5 ]
□ 営業時間外問い合わせを取りこぼしている自覚がある      [ 1 2 3 4 5 ]
□ 初回返信のテンプレ化で、リードの温度を下げている      [ 1 2 3 4 5 ]
□ 担当者の手動アサインで遅延が発生している              [ 1 2 3 4 5 ]
```

1〜2 が多い ⇒ Meeton Live + Meeton Calendar による初動 5 秒対応で
大きな改善余地。

---

## Page 2 — ナーチャリング / MQL→SQL 転換の実態

### ブロック 3 — MA / ナーチャリングの数字

```
□ MA で送っているステップメールの開封率              [    %]
□ ナーチャ経由から商談に進む比率                     [    %]
□ MQL → SQL 変換率                                  [    %]
□ MQL のうちフォロー漏れになっている割合 (感覚)      [    %]
```

### ブロック 4 — 直感チェック (1〜5 で評価)

```
□ ナーチャの内容がリードの行動文脈に合っていない        [ 1 2 3 4 5 ]
□ Inside Sales のキャパが MQL 数に追いついていない      [ 1 2 3 4 5 ]
□ ステップメールは「とにかく送る」で改善できていない    [ 1 2 3 4 5 ]
□ Web 行動 (再訪 / 料金ページ) をフォローに活かせない   [ 1 2 3 4 5 ]
```

1〜2 が多い ⇒ Meeton Email による 1:1 行動シグナル追客で改善余地大。

---

## Page 3 — 商談化率の現状把握と差し込みポイント

### Step A — ファネル各段歩留まり

```
   リード総数         [    件 / 月]
        ↓ [    %]
   MQL              [    件 / 月]
        ↓ [    %]
   SQL              [    件 / 月]
        ↓ [    %]
   商談化            [    件 / 月]
        ↓ [    %]
   受注              [    件 / 月]
```

ボトルネックになっている段 (転換率が最も低い段) に○。

### Step B — Meeton ai の差し込みポイント

> どこに AI SDR を差し込むと、Step A の歩留まりが改善するかを
> チェックしてください。

**Meeton Live (AI チャット)** — リード → MQL 段

```
□ サイト訪問者と即時会話、温度を逃さず MQL 化
□ サンクスページ / 価格ページに戻ってきた瞬間に対応
□ シナリオ不要、生成 AI で文脈応答
```

**Meeton Calendar (AI 商談予約)** — MQL → SQL → 商談 段

```
□ コンバート直後 5 秒で商談予約を提示
□ 担当者の手動アサインを撤廃 (CRM owner / 業種 / 規模で自動)
□ フォーム / サンクスページ / メールどこからでも発動
```

**Meeton Email (AI フォロー)** — MQL → SQL 段、ナーチャ改善

```
□ 行動シグナルに合わせて 1:1 で個別追客 (テンプレ配信ではない)
□ 配信前承認フロー (送信前レビュー) も選べる
□ MA + Meeton Email の併用で「とにかく送る」を脱却
```

### Step C — 試算

```
現状商談化率 × 改善幅 × リード数 = 月商談増加見込み
[    %]     × [    %]   × [    件] = [    件 / 月]
```

(改善幅の目安: 初動 5 秒で +30〜50%, 1:1 追客で +20〜40% — 業種
依存で振れ幅大、相談時に貴社環境で詰めます。)

---

## CTA (page 3 footer)

```
このチェックの結果を、自社のリードデータを見ながら 30 分で具体的に
詰めたい方は ──
→ 30 分の相談を予約する
   https://dynameet.ai/?calendarId=takumi-sawano&showChat=true
```

QR コード併設 (Canva で生成)。

---

## Footer (全ページ)

```
© DynaMeet株式会社  |  Meeton ai  |  https://dynameet.ai
```

ISMS 認証は審査合格済・認証発行待ち / セキュリティチェックシート対応可
の小さい行を入れる。

---

## v2 拡張プラン (LP launch 後)

- ページ 4-5 追加: 業種別 (SaaS / 製造 / 専門サービス / フィンテック)
  のリード商談化パターン
- 業種別の "AI SDR を差し込んだあとの数字" 1 ケース
- MA ツール別 (HubSpot / Marketo / Pardot) の連携設計図
- 商談単価 × 受注率の試算電卓
