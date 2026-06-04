import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon, Check, MAXW } from "@/app/components/v2/ui";
import { PRODUCTS, PRODUCT_ORDER } from "@/app/lib/product-lp-data";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos from "@/app/components/v2/IntegrationLogos";
import FounderNote from "@/app/components/v2/FounderNote";
import StageFlow from "@/app/components/v2/StageFlow";
import CaseCardGrid, { type CaseCardData } from "@/app/components/v2/CaseCardGrid";

type CaseCard = CaseCardData;

const PILLARS = [
  { k: "Speed", t: "初動", d: "リードが動いた瞬間に動く。待たせない。", icon: "spark" },
  { k: "Persistence", t: "粘り", d: "一度で諦めず、シグナルを見て追い続ける。", icon: "spark" },
  { k: "Context", t: "文脈", d: "過去の閲覧・会話・行動を引き継いで対話する。", icon: "spark" },
];

export default function Home({ caseStudies = [] }: { caseStudies?: CaseCard[] }) {
  return (
    <>
      <a href="#main" className="v2-skip">本文へスキップ</a>
      <Nav />
      <main id="main">

      {/* 1. Hero (navy) */}
      <Section tone="navy" py={0} style={{ paddingTop: 128, paddingBottom: 40 }}>
        <div style={{ maxWidth: 880 }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--cta)" }}>
            訪問者は去り、リードは商談にならない。
          </p>
          <h1
            style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(34px, 6vw, 60px)",
              lineHeight: 1.16,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--on-navy)",
              margin: "16px 0 0",
            }}
          >
            「待つ」Webサイトから、<br />
            <span style={{ color: "var(--cta)" }}>商談を生み出す</span>AI営業チャネルへ。
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "22px 0 30px", maxWidth: 720 }}>
            Meeton ai は、Webサイトに配属する AI SDR。問い合わせ前の潜在層に会話で踏み込み、
            資料提案・予約・追客まで自律でこなして、あらゆる瞬間を商談に変えます。
          </p>
          <CTAButtons source="home-hero" tone="onNavy" size="lg" />
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20, fontSize: 13, color: "var(--on-navy-sub)" }}>
            <span>✓ 30分のデモで自社への効き方を確認</span>
            <span>✓ Google / Microsoft ワンクリック</span>
            <span>✓ ノーコード設置</span>
          </div>
        </div>
      </Section>

      {/* 2. Proof bar (navy, continuous with hero) */}
      <Section tone="navy" py={0} style={{ paddingTop: 8, paddingBottom: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            borderTop: "1px solid var(--on-navy-border)",
            paddingTop: 32,
          }}
        >
          {[
            { m: "60%+", l: "即予約フロー経由の商談化率" },
            { m: "20x", l: "チャット経由の商談機会（導入前比）" },
            { m: "約2倍", l: "提案・資料提示の件数" },
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 40, fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{s.m}</div>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 2.5 Customer logo wall — social proof near first view */}
      <LogoWall tone="white" />

      {/* 3. Why — two-stage problem truth (acquisition gap + conversion gap) */}
      <Section tone="white">
        <SectionHead
          eyebrow="なぜ商談機会を逃すのか"
          title="機会は、入口でも出口でも漏れている。"
          lede="B2Bの買い手は購買プロセスの約70%を、営業に接触する前に独力で進めます（Gartner/6sense）。多くの企業はその間ずっと「待っている」だけ——獲得の前で大半が去り、獲得した後も大半が商談にならない。"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              tag: "入口 — 獲得の穴",
              stat: "99%",
              t: "訪問者の大半は、リードにすらならず去る。",
              d: "フォームに辿り着くのは1%未満。残りは匿名のまま、何も残さず黙って離脱していく。",
            },
            {
              tag: "出口 — 商談化の穴",
              stat: "—",
              t: "集めたリードも、商談にならない。",
              d: "初動の遅さ・追客の粘りのなさ・文脈の欠如で、せっかく獲得したリードが冷えていく。",
            },
          ].map((p) => (
            <Card key={p.tag} style={{ padding: 28 }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", color: "var(--cta-ink)", marginBottom: 14 }}>
                {p.tag}
              </div>
              {p.stat !== "—" && (
                <div style={{ fontFamily: "var(--fd)", fontSize: 52, fontWeight: 800, color: "var(--heading)", lineHeight: 1, marginBottom: 12 }}>
                  {p.stat}
                </div>
              )}
              <h3 style={{ fontSize: 19, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{p.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{p.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. The 3 stages (deck p7) — 掴む → 商談化 → 追客 */}
      <Section tone="surface" id="stages">
        <SectionHead
          eyebrow="AI SDR の3つの仕事"
          title="掴んで育て、商談化し、逃さず追う。"
          lede="潜在層を掴み育ててリードにし（Live・Library）、温度が高まれば商談化し（Calendar）、逃したリードは諦めず追客する（Email）。"
        />
        <StageFlow />
        <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 18, textAlign: "center" }}>
          1つの仕事から無料で始め、つなぐほど一気通貫の AI SDR に。{" "}
          <Link href="/pricing/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>料金を見る</Link>
        </p>
      </Section>

      {/* 6. How — AI SDR answer (navy) */}
      <Section tone="navy">
        <SectionHead
          eyebrow="どう解くか"
          title={<span style={{ color: "var(--on-navy)" }}>WebサイトにAI SDRを配属する。</span>}
          lede={<span style={{ color: "var(--on-navy-sub)" }}>待つのをやめ、あらゆる瞬間で自動で動かす。鍵は3つ。</span>}
          tone="dark"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {PILLARS.map((p) => (
            <div key={p.k} style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", letterSpacing: ".08em" }}>{p.k}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--on-navy)", margin: "8px 0 8px" }}>{p.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--on-navy-sub)", margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </Section>


      {/* 7. Cases */}
      {caseStudies.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow="導入事例" title="成果が、データで出ている。" align="center" />
          <CaseCardGrid cases={caseStudies} />
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/cases/" className="v2-link" style={{ fontSize: 15, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
              すべての事例を見る →
            </Link>
          </div>
        </Section>
      )}

      {/* 8. Soft router — 2×2 grid (even boxes) */}
      <Section tone="surface" py={64}>
        <SectionHead eyebrow="どの仕事から始める？" title="迷ったら、いちばん効く一手から。" align="center" />
        <div className="v2-router-grid">
          {[
            { slug: "chat", q: "訪問者を会話で掴んでリードにしたい" },
            { slug: "library", q: "送った資料の反応を可視化したい" },
            { slug: "calendar", q: "問い合わせの取りこぼしを止めたい" },
            { slug: "email", q: "既存リードを追客で再商談化したい" },
          ].map((r) => (
            <Link key={r.slug} href={`/${r.slug}/`} style={{ textDecoration: "none" }}>
              <Card className="v2-card-link" style={{ display: "flex", gap: 12, alignItems: "center", height: "100%" }}>
                <span style={{ color: "var(--cta)", flexShrink: 0 }}>
                  <ProductIcon kind={PRODUCTS[r.slug as keyof typeof PRODUCTS].icon} size={22} />
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--heading)" }}>{r.q}</span>
              </Card>
            </Link>
          ))}
        </div>
        <style>{`
          .v2-router-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:760px;margin:0 auto}
          @media(max-width:560px){.v2-router-grid{grid-template-columns:1fr}}
        `}</style>
      </Section>

      {/* 8.5 Founder note — who builds this */}
      <Section tone="white" py={56}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FounderNote />
        </div>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="navyDeep" py={76}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.4vw,42px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            待つWebサイトを、卒業する。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>
            30分のデモで、自社サイトにAI SDRを配属する具体策が見えます。
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source="home-footer" tone="onNavy" size="lg" align="center" />
          </div>
        </div>
      </Section>
      </main>

      <Footer />
    </>
  );
}
