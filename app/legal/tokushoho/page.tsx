import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "DynaMeet株式会社の特定商取引法に基づく表記。販売事業者、所在地、お支払い方法等について記載しています。",
  // TODO(legal): ドラフトの間は noindex。正式文言を入れるコミットで index に戻し、
  // app/sitemap.ts へのエントリも同時に復帰させること。
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/legal/tokushoho/",
    // Slugs differ per locale, so altLanguages() can't be used — hand-written pair.
    languages: {
      ja: "/legal/tokushoho/",
      en: "/en/legal/mail-order-sales/",
      "x-default": "/legal/tokushoho/",
    },
  },
  openGraph: {
    title: "特定商取引法に基づく表記｜Meeton ai",
    description:
      "DynaMeet株式会社の特定商取引法に基づく表記。販売事業者、所在地、お支払い方法等について記載しています。",
    url: "https://dynameet.ai/legal/tokushoho/",
  },
};

// TODO(legal): 全項目の正式な文言は法務確認のうえ差し替えること。
// 現状はスキャフォールドのみで、本番公開前に必ず内容を確定させる。
const ITEMS: { label: string; value: React.ReactNode }[] = [
  {
    label: "販売事業者",
    value: <Todo hint="法人名（例: DynaMeet株式会社）" />,
  },
  {
    label: "所在地",
    value: <Todo hint="登記住所（〒150-0033 東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C を確認のうえ記載）" />,
  },
  {
    label: "運営責任者",
    value: <Todo hint="代表者または業務責任者の氏名" />,
  },
  {
    label: "お問い合わせ",
    value: <Todo hint="メールアドレス（例: info@dynameet.ai）および電話番号の取扱い方針" />,
  },
  {
    label: "販売価格・サービス料金",
    value: <Todo hint="料金プランへの参照、または個別見積の旨" />,
  },
  {
    label: "代金の支払時期・支払方法",
    value: <Todo hint="請求サイクル、支払方法（クレジットカード/銀行振込等）、支払期日" />,
  },
  {
    label: "サービス提供時期",
    value: <Todo hint="契約成立後のアカウント発行タイミング等" />,
  },
  {
    label: "キャンセル・解約",
    value: <Todo hint="解約手続き、最低利用期間、中途解約の扱い" />,
  },
  {
    label: "返金ポリシー",
    value: <Todo hint="返金の可否・条件" />,
  },
  {
    label: "動作環境",
    value: <Todo hint="対応ブラウザ・必要なシステム要件" />,
  },
];

export default function TokushohoPage() {
  return (
    <>
      <Nav langSwitchHref="/en/legal/mail-order-sales/" />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(70px, 12vw, 100px)",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding:
              "clamp(24px, 6vw, 48px) clamp(16px, 4vw, 24px) clamp(50px, 10vw, 80px)",
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="パンくずリスト"
            style={{
              marginBottom: "clamp(20px, 4vw, 32px)",
              fontSize: "clamp(12px, 2vw, 14px)",
              color: "#6e7494",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#6e7494",
                textDecoration: "none",
              }}
            >
              ホーム
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "#0f1128" }}>特定商取引法に基づく表記</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "clamp(32px, 6vw, 48px)" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 36px)",
                fontWeight: 800,
                color: "#0f1128",
                margin: 0,
              }}
            >
              特定商取引法に基づく表記
            </h1>
          </header>

          {/* TODO(legal): 正式文言確定後にこのドラフト注意書きを削除 */}
          <p
            style={{
              background: "#fff7ed",
              border: "1px solid #fdba74",
              borderRadius: 12,
              padding: 16,
              fontSize: 14,
              color: "#9a3412",
              marginBottom: 32,
            }}
          >
            【ドラフト】本ページは雛形です。各項目の内容は確定前のため、公開前に正式な文言へ差し替えてください。
          </p>

          {/* Content */}
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <dl style={{ margin: 0 }}>
              {ITEMS.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(140px, 220px) 1fr",
                    gap: "8px 24px",
                    padding: "16px 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <dt style={{ fontWeight: 700, color: "#0f1128" }}>
                    {item.label}
                  </dt>
                  <dd style={{ margin: 0 }}>{item.value}</dd>
                </div>
              ))}
            </dl>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              制定日：<Todo hint="正式公開日" />
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Todo({ hint }: { hint: string }) {
  return (
    <span style={{ color: "#b45309", fontWeight: 600 }}>
      TODO: {hint}
    </span>
  );
}
