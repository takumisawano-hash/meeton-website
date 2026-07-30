# Meeton Website

Meeton AI / Meeton Talent / Careersの3ページで構成されるNext.js 14プロジェクトです。

## ページ構成

| URL | ページ | 説明 |
|-----|--------|------|
| `/` | Meeton AI | BtoB企業向けAI SDRプラットフォームのLP |
| `/talent/` | Meeton Talent | 採用サイト特化AIリクルーターのLP |
| `/careers/` | 採用情報 | DynaMeetの採用職種一覧 |

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- React 18
- Google Fonts (Plus Jakarta Sans, Noto Sans JP, JetBrains Mono)

## ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 計測（Mixpanel ファネル連結）

マーケサイトとアプリ（app.dynameet.ai）の signup ファネルを1本につなぐ実装。
ローカルでの検証手順は **[docs/mixpanel-funnel-testing.md](docs/mixpanel-funnel-testing.md)** を参照。

```bash
# ローカル検証（アプリを :3005 で起動しておく）
echo 'NEXT_PUBLIC_APP_ORIGIN=http://localhost:3005' >> .env.local
npm run dev            # マーケサイト :3000 → ブラウザは 127.0.0.1:3000 で開く
```

- `NEXT_PUBLIC_MIXPANEL_TOKEN` はアプリ本番と**同一プロジェクト**のトークン。別プロジェクトのトークンは無言で失敗する。
- `NEXT_PUBLIC_APP_ORIGIN` は**ローカル検証専用**。Vercel には絶対に設定しない（本番の signup が飛ぶ）。
- 設計の経緯は `docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md`。

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# Vercel CLIをインストール（未インストールの場合）
npm i -g vercel

# デプロイ
vercel
```

### 方法2: GitHubリポジトリ連携

1. このプロジェクトをGitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)にログイン
3. 「New Project」→ GitHubリポジトリを選択
4. 「Deploy」をクリック

設定は`vercel.json`で定義済みのため、追加設定は不要です。

## プロジェクト構造

```
meeton-website/
├── app/
│   ├── layout.tsx          # 共通レイアウト・フォント設定
│   ├── page.tsx            # Meeton AI (/)
│   ├── talent/
│   │   └── page.tsx        # Meeton Talent (/talent/)
│   ├── careers/
│   │   └── page.tsx        # 採用情報 (/careers/)
│   └── components/
│       ├── Nav.tsx         # 共通ナビゲーション
│       └── Footer.tsx      # 共通フッター
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
└── README.md
```

## 共通ナビゲーション

全ページで共通のヘッダーナビゲーションを使用：
- ロゴ「Meeton AI」→ `/`へリンク
- ナビリンク：Meeton AI, Meeton Talent, 採用情報
- 現在のページはアクティブ表示（色が変わる）
- CTAボタン：資料請求、デモを予約

## 今後の拡張予定

- [ ] ブログページ（/blog/）- Notion API連携
