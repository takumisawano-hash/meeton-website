import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import type { Metadata } from "next";
import Link from "next/link";
import { altLanguages } from "@/app/lib/i18n";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "DynaMeet株式会社の特定商取引法に基づく表記。販売事業者、所在地、お支払い方法等について記載しています。",
  alternates: altLanguages("/legal/tokushoho/", "ja"),
  openGraph: {
    title: "特定商取引法に基づく表記｜Meeton ai",
    description:
      "DynaMeet株式会社の特定商取引法に基づく表記。販売事業者、所在地、お支払い方法等について記載しています。",
    url: "https://dynameet.ai/legal/tokushoho/",
  },
};

const ITEMS: { label: string; value: React.ReactNode }[] = [
  {
    label: "販売事業者",
    value: "DynaMeet株式会社",
  },
  {
    label: "所在地",
    value: "〒150-0033 東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C",
  },
  {
    label: "運営責任者",
    value: "取締役 Ray Ayan",
  },
  {
    label: "お問い合わせ",
    value:
      "info@dynameet.ai（お問い合わせフォームからも承ります）。電話番号は、ご請求があった場合に遅滞なく開示いたします。",
  },
  {
    label: "販売価格・サービス料金",
    value: (
      <>
        料金プランは
        <a href="/pricing/" style={{ color: "#12a37d" }}>
          料金ページ
        </a>
        をご参照ください。個別の要件に応じたお見積りも承ります。
      </>
    ),
  },
  {
    label: "代金の支払時期・支払方法",
    value:
      "セルフサーブプランは、Stripe を通じたクレジットカード決済により、契約開始日を基準に毎月自動的に課金されます。エンタープライズ契約は、請求書発行後30日以内の銀行振込によるお支払いとなります。",
  },
  {
    label: "サービス提供時期",
    value:
      "無料トライアルは、お申込みから1営業日以内にご利用いただけます。有料プランは、Stripe でのお支払い手続き完了後、直ちにご利用いただけます。エンタープライズ契約は、契約締結時にご案内する日程で提供を開始します。",
  },
  {
    label: "キャンセル・解約",
    value:
      "月額プランは、いつでも解約手続きが可能です。解約は次回請求サイクルの開始時点で有効となり、日割りでの返金は行いません。エンタープライズ契約の解約条件は、個別の契約書の定めによります。",
  },
  {
    label: "返金ポリシー",
    value:
      "既に経過した請求期間分の返金は、原則として行っておりません。無料トライアル期間中は、いつでも料金の発生なくキャンセルいただけます。",
  },
  {
    label: "動作環境",
    value:
      "最新版の Google Chrome、Safari、Firefox、Microsoft Edge での動作を確認しています。JavaScript を有効にしてご利用ください。",
  },
];

export default function TokushohoPage() {
  return (
    <>
      <Nav />
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
              制定日：2026年7月2日
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
