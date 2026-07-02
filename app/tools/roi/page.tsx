import type { Metadata } from "next";
import { altLanguages } from '@/app/lib/i18n'
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card } from "@/app/components/v2/ui";
import RoiTool from "./RoiTool";

export const metadata: Metadata = {
  title: { absolute: "商談化の余地 診断｜Meeton ai ROI診断ツール" },
  description:
    "月間訪問数・CV率・商談化率を入れるだけで、Webサイトに眠る『商談化の余地』を60秒で試算。去る訪問者の獲得余地と、リードの商談化余地を二段で可視化。無料・登録不要。",
  alternates: altLanguages("/tools/roi/", "ja"),
  openGraph: {
    title: "商談化の余地 診断｜Meeton ai ROI診断ツール",
    description: "Webサイトに眠る商談化の余地を60秒で試算。獲得余地＋商談化余地を二段で可視化。無料・登録不要。",
    url: "https://dynameet.ai/tools/roi/",
    type: "website",
  },
};

const FAQ = [
  {
    q: "「商談化の余地」とは何ですか？",
    a: "現状のままでは取りこぼしている、月あたりの商談機会の見込み数です。Meeton ai は二段で余地を生みます。①獲得の余地＝いま黙って去る訪問者を会話で掴んでリード化する分、②商談化の余地＝集めたリードの商談化率を引き上げる分。この合計を試算します。",
  },
  {
    q: "計算の根拠は？",
    a: "入力した月間訪問数・CV率・商談化率に対し、去る訪問者の一部（約1.5%）を会話でリード化し、商談化率を利用企業ベンチ（最大60%。業界平均は約20%）を上限に引き上げた場合を試算します。すべて参考値で、実値は運用により変動します。",
  },
  {
    q: "登録やメールは必要ですか？",
    a: "不要です。登録もメール入力もありません。入力するとブラウザ上でその場で計算・表示され、入力値がサーバーに送信・保存されることはありません。",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: "https://dynameet.ai/tools/roi/",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Meeton ai 商談化の余地 診断",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://dynameet.ai/tools/roi/",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  publisher: { "@id": "https://dynameet.ai/#organization" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 56 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">ROI診断 — 無料・登録不要</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            あなたのサイトの<span style={{ color: "var(--cta)" }}>「商談化の余地」</span>を、60秒で。
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 0" }}>
            月間訪問数・CV率・商談化率を入れるだけ。去る訪問者の獲得余地と、リードの商談化余地を二段で試算します。
          </p>
        </div>
      </Section>

      <Section tone="white">
        <RoiTool />
      </Section>

      {/* How it's calculated — transparency + AEO */}
      <Section tone="surface">
        <SectionHead eyebrow="計算の考え方" title="余地は、入口と出口の二段で生まれる。" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <Card>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>① 獲得の余地</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              いまフォームに辿り着かず黙って去る訪問者の一部（約1.5%）を、AIチャットが会話で掴んでリード化します。
            </p>
          </Card>
          <Card>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>② 商談化の余地</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              集めたリードの商談化率を、利用企業ベンチ（最大60%／業界平均は約20%）を上限に引き上げた場合を試算します。
            </p>
          </Card>
        </div>
        <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 16 }}>
          すべて試算（参考値）です。実際の数値は業種・流入の質・運用により変動します。料金は{" "}
          <Link href="/pricing/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>料金ページ</Link> をご覧ください。
        </p>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="よくある質問" title="ROI診断のFAQ" align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            余地を、実際に動かす。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>30分のデモで、試算を現実の商談化プランに。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="roi-footer" tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
