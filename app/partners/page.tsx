import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import PartnersFormEmbed from "./PartnersFormEmbed";

// ── /partners/ — パートナー募集（2026-07-17 第1段階）─────────────────
// 顧客向けのデモ導線とは別の第2オーディエンス（パートナー候補）の入口。
// 報酬は概要のみ公開（存在・継続報酬・個別案内）。詳細な料率表は
// フォーム送信後の資料・面談でのみ提示する — 本文に数字を書かないこと。

export const metadata: Metadata = {
  title: { absolute: "Meeton ai パートナープログラム｜紹介・販売・協業パートナー募集" },
  description:
    "Meeton ai（AI SDR Platform）のパートナー募集。ご紹介のみの連携から、共同提案・販売・導入支援まで、貴社の体制に合わせて参加できます。継続報酬あり、商談・提案は Meeton ai が支援。Web制作・CRM導入・営業支援・BPO 各社の新しい収益源に。",
  alternates: { canonical: "/partners/" },
  openGraph: {
    title: "Meeton ai パートナープログラム",
    description:
      "紹介・販売・協業パートナー募集。顧客のWebサイトを、新しい営業チャネルに。",
    url: "https://dynameet.ai/partners/",
    type: "website",
  },
};

// 相談CTA — 顧客デモと同じ Meeton Calendar を使う（それ自体が製品デモになる）。
// utm_campaign=partner で商談予約と区別して計測する。
const CONSULT_URL =
  "https://dynameet.ai/?calendarId=takumi-sawano&showChat=true&utm_source=website&utm_medium=partners&utm_campaign=partner";

const FIT_COMPANIES = [
  { t: "Web制作・デジタルマーケ支援", d: "制作・運用の先にある「商談成果」まで提案範囲を広げられます。" },
  { t: "CRM・MA導入支援 / SIer", d: "HubSpot・Salesforce ネイティブ連携。導入プロジェクトの追加商材に。" },
  { t: "営業コンサル・営業代行", d: "顧客のインバウンド商談化を仕組みで底上げ。提案の再現性が上がります。" },
  { t: "BPO・コールセンター事業者", d: "有人対応の前段を AI SDR が受け持ち、サービスの提供範囲を拡張。" },
  { t: "広告代理店", d: "獲得したトラフィックを商談まで運び、広告の費用対効果を証明できます。" },
  { t: "SaaS販売会社・IT商社", d: "既存の販売網に載せやすい、月額型・継続報酬型の取扱商材です。" },
  { t: "経営・専門コンサルタント", d: "顧問先への紹介のみで参加可能。販売工数はかかりません。" },
];

const PARTNER_TYPES = [
  {
    name: "紹介パートナー",
    lead: "顧客をご紹介いただくだけ。その後の商談・提案・契約・導入は Meeton ai が担当します。",
    fit: "コンサルタント、制作会社、士業など、顧客との関係性はあるが販売工数をかけたくない会社",
  },
  {
    name: "販売パートナー",
    lead: "貴社が顧客への提案・商談を担当。Meeton ai がデモ・技術説明・導入を支援します。",
    fit: "営業支援会社、代理店、IT商社、SIer、CRM導入会社",
  },
  {
    name: "ソリューションパートナー",
    lead: "Meeton ai を自社サービスと組み合わせて提案。Web制作・CRM導入・広告運用・営業BPOなどとセットで販売します。",
    fit: "単品紹介ではなく、自社サービスの単価や継続率を上げたい会社",
  },
];

const STEPS = [
  { n: "1", t: "資料を受け取る", d: "フォーム送信後、パートナー制度資料（報酬体系・支援内容）をお送りします。" },
  { n: "2", t: "パートナー担当と面談", d: "貴社の事業・顧客基盤に合う形態と、詳細な料率をご案内します。" },
  { n: "3", t: "契約・キックオフ", d: "パートナー契約の締結後、営業資料・デモ環境をご提供します。" },
  { n: "4", t: "協業開始", d: "案件のご紹介・共同提案からスタート。商談・提案は Meeton ai が伴走します。" },
];

const heroAssurances = ["紹介のみでも参加可能", "継続報酬あり", "商談・提案を Meeton ai が支援"];

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">

      {/* 1. FV（navy）— 資料請求／相談の2段階CTA。「応募する」は置かない。 */}
      <Section tone="navy" py={0} style={{ paddingTop: 128, paddingBottom: 72 }}>
        <div style={{ maxWidth: 780 }}>
          <Eyebrow tone="dark">パートナー募集</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(32px, 4.8vw, 48px)",
              lineHeight: 1.22,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--on-navy)",
              margin: "20px 0 0",
              textWrap: "balance",
              wordBreak: "auto-phrase",
            }}
          >
            Meeton aiと、顧客の営業成果を変える。
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.9, color: "var(--on-navy-sub)", margin: "20px 0 30px" }}>
            紹介、共同提案、販売、導入支援。
            <br />
            貴社の強みと顧客基盤に合った形で、AI SDR市場を一緒に開拓しませんか。
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#partner-form"
              className="v2-cta-primary"
              style={{ background: "var(--cta)", color: "var(--on-cta)", fontSize: 15, fontWeight: 800, padding: "13px 26px", borderRadius: 10, textDecoration: "none" }}
            >
              パートナー制度資料を受け取る
            </a>
            <a
              href={CONSULT_URL}
              className="v2-cta-ghost"
              style={{ background: "transparent", color: "#fff", fontSize: 15, fontWeight: 700, padding: "13px 24px", borderRadius: 10, textDecoration: "none", border: "1.5px solid var(--on-navy-border)" }}
            >
              パートナー担当者と相談する
            </a>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 22, fontSize: 13, color: "var(--on-navy-sub)" }}>
            {heroAssurances.map((a) => (
              <span key={a}>✓ {a}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* 2. こんな会社に向いている */}
      <Section tone="white">
        <SectionHead
          eyebrow="対象となる企業"
          title="顧客の営業・マーケ成果を上げる、追加商材として。"
          lede="Meeton ai は Chat・Ads・Library・Calendar・Email の5プロダクトで、リード獲得から育成・商談化・追客までをカバーする AI SDR Platform。貴社の既存サービスの価値を広げる商材として提案できます。"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {FIT_COMPANIES.map((c) => (
            <Card key={c.t}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ marginTop: 3 }}><Check /></span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{c.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{c.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. パートナー形態 — 3種のみ（OEM/再販は当面出さない） */}
      <Section tone="surface">
        <SectionHead
          eyebrow="パートナー形態"
          title="関わり方は、3つから選べる。"
          lede="ご紹介のみの連携から、販売・導入支援まで。どの形態でも、途中で切り替え・併用が可能です。"
          align="center"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {PARTNER_TYPES.map((p, i) => (
            <Card key={p.name} style={{ display: "flex", flexDirection: "column", gap: 12, padding: 28 }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta-ink)", letterSpacing: ".06em" }}>
                TYPE {i + 1}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: "var(--heading)", margin: 0 }}>{p.name}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--text)", margin: 0, flexGrow: 1 }}>{p.lead}</p>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "var(--sub)", marginBottom: 6 }}>向いている会社</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--sub)", margin: 0 }}>{p.fit}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. 報酬 — 概要のみ。料率・条件の詳細は資料/面談で（Webに数字を書かない） */}
      <Section tone="white">
        <SectionHead
          eyebrow="パートナー報酬"
          title="紹介のみでも、報酬の対象です。"
          align="center"
        />
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 16, lineHeight: 2, color: "var(--text)", margin: "0 0 28px", textAlign: "center" }}>
            初年度契約金額に応じたパートナー報酬をご用意しています。
            契約更新時も継続報酬の対象となるプログラムがあります。
            詳細な料率は、パートナー形態とご担当範囲に応じて個別にご案内します。
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              "紹介のみでも報酬対象 — 商談・提案・導入は Meeton ai が担当",
              "継続報酬制度あり — 契約更新時も対象となるプログラム",
              "販売への関与に応じて報酬が増える設計",
              "営業資料・デモ環境・技術説明は Meeton ai が提供",
            ].map((line) => (
              <div key={line} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px" }}>
                <span style={{ marginTop: 2 }}><Check /></span>
                <span style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text)" }}>{line}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--sub)", margin: "18px 0 0", textAlign: "center" }}>
            報酬体系の詳細は、下記フォームからお受け取りいただけるパートナー制度資料でご確認ください。
          </p>
        </div>
      </Section>

      {/* 5. 参加までの流れ */}
      <Section tone="surface" py={72}>
        <SectionHead eyebrow="参加までの流れ" title="資料請求から、最短1週間で協業開始。" align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, maxWidth: 1000, margin: "0 auto" }}>
          {STEPS.map((s) => (
            <Card key={s.n} style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 999, background: "var(--cta-light)", color: "var(--cta-ink)", fontWeight: 800, fontSize: 15, marginBottom: 12 }}>
                {s.n}
              </div>
              <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{s.t}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--sub)", margin: 0 }}>{s.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. 資料請求フォーム（HubSpot embed） */}
      <Section tone="white" id="partner-form" py={80}>
        <SectionHead
          eyebrow="資料請求"
          title="パートナー制度資料を受け取る"
          lede="送信後、報酬体系・支援内容をまとめたパートナー制度資料をお送りします。あわせてパートナー担当からご連絡する場合があります。"
          align="center"
        />
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Card style={{ padding: "32px 28px" }}>
            <PartnersFormEmbed />
          </Card>
          <p style={{ fontSize: 12.5, color: "var(--sub)", margin: "14px 0 0", textAlign: "center" }}>
            ご入力いただいた情報は、
            <a href="/privacy-policy/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>プライバシーポリシー</a>
            に基づき取り扱います。
          </p>
        </div>
      </Section>

      {/* 7. 最終CTA — 相談（Meeton Calendar での予約体験がそのまま製品デモになる） */}
      <Section tone="navyDeep" py={76}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            まずは、話を聞いてみる。
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>
            30分のオンライン面談で、貴社に合うパートナー形態と報酬の詳細をご案内します。
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={CONSULT_URL}
              className="v2-cta-primary"
              style={{ background: "var(--cta)", color: "var(--on-cta)", fontSize: 15, fontWeight: 800, padding: "13px 26px", borderRadius: 10, textDecoration: "none" }}
            >
              パートナー担当者と相談する
            </a>
            <a
              href="#partner-form"
              className="v2-cta-ghost"
              style={{ background: "transparent", color: "#fff", fontSize: 15, fontWeight: 700, padding: "13px 24px", borderRadius: 10, textDecoration: "none", border: "1.5px solid var(--on-navy-border)" }}
            >
              資料を受け取る
            </a>
          </div>
        </div>
      </Section>
      </main>

      <Footer />
    </>
  );
}
