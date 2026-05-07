"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import HubSpotMeetingModal from "@/app/components/HubSpotMeetingModal";
import HubSpotModal from "@/app/components/HubSpotModal";

type CaseCard = {
  slug: string;
  name: string;
  industry: string;
  quote?: string | null;
  quotePerson?: string | null;
  heroMetric?: string | null;
  heroMetricLabel?: string | null;
  heroImage?: string | null;
  stats: Array<{ value?: string; label?: string }>;
};

type Props = {
  cases: CaseCard[];
};

const css = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;
  --pink:#d03ea1;--blue:#3b6ff5;--blue-light:#eaf0fe;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Noto Sans JP',sans-serif;font-size:17px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

.event-hero{padding:80px 24px 60px;background:linear-gradient(180deg,#f7f8ff 0%,#fff 100%);position:relative;overflow:hidden}
.event-hero::before{content:"";position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(124,92,252,.15) 0%,transparent 70%);pointer-events:none}
.event-hero-inner{max-width:980px;margin:0 auto;text-align:center;position:relative;z-index:1}
.event-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:var(--accent-light);color:var(--accent);border-radius:100px;font-size:13px;font-weight:700;margin-bottom:24px;letter-spacing:.04em}
.event-h1{font-size:42px;font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:20px;letter-spacing:-.01em}
.event-h1 strong{color:var(--accent)}
.event-sub{font-size:18px;color:var(--sub);line-height:1.7;max-width:720px;margin:0 auto 32px}
.event-meta{display:inline-flex;gap:20px;font-size:14px;color:var(--sub);align-items:center;flex-wrap:wrap;justify-content:center}
.event-meta-item{display:flex;align-items:center;gap:6px}
.event-meta-item strong{color:var(--heading)}

.offers-section{padding:60px 24px;background:#fff}
.offers-inner{max-width:1080px;margin:0 auto}
.offers-title{text-align:center;font-size:28px;font-weight:800;color:var(--heading);margin-bottom:8px}
.offers-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px}
.offers-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:24px;max-width:860px;margin:0 auto}
@media (max-width:880px){.offers-grid{grid-template-columns:1fr;max-width:100%}.event-h1{font-size:30px}}
.offer-card{padding:32px 28px;background:#fff;border:1.5px solid var(--border);border-radius:16px;display:flex;flex-direction:column;gap:16px;transition:all .25s;position:relative;overflow:hidden}
.offer-card:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 20px 40px -12px rgba(124,92,252,.15)}
.offer-card.primary{background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;border-color:#0f1128}
.offer-card.primary .offer-h{color:#fff}
.offer-card.primary .offer-desc{color:#c8cedf}
.offer-icon{width:48px;height:48px;border-radius:12px;background:var(--cta-light);display:flex;align-items:center;justify-content:center;font-size:24px}
.offer-card.primary .offer-icon{background:rgba(18,163,125,.2);color:var(--cta-hover)}
.offer-tag{display:inline-block;padding:4px 10px;background:var(--cta);color:#fff;border-radius:6px;font-size:11px;font-weight:700;letter-spacing:.05em;width:fit-content}
.offer-h{font-size:20px;font-weight:800;color:var(--heading);line-height:1.4}
.offer-desc{font-size:14px;color:var(--sub);line-height:1.7;flex:1}
.offer-cta{padding:14px 22px;background:var(--cta);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:inherit}
.offer-cta:hover{background:var(--cta-hover);transform:translateY(-1px);box-shadow:0 8px 20px var(--cta-glow)}
.offer-cta.outline{background:transparent;color:var(--cta);border:1.5px solid var(--cta)}
.offer-cta.outline:hover{background:var(--cta-light)}

.recap-section{padding:80px 24px;background:var(--surface)}
.recap-inner{max-width:980px;margin:0 auto}
.recap-title{text-align:center;font-size:28px;font-weight:800;color:var(--heading);margin-bottom:48px}
.recap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
@media (max-width:880px){.recap-grid{grid-template-columns:1fr}}
.recap-card{padding:28px;background:#fff;border-radius:14px;border:1px solid var(--border)}
.recap-num{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;margin-bottom:14px}
.recap-h{font-size:17px;font-weight:800;color:var(--heading);margin-bottom:10px;line-height:1.4}
.recap-p{font-size:14px;color:var(--sub);line-height:1.7}

.cases-section{padding:80px 24px;background:#fff}
.cases-inner{max-width:1080px;margin:0 auto}
.cases-title{text-align:center;font-size:28px;font-weight:800;color:var(--heading);margin-bottom:8px}
.cases-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px}
.cases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media (max-width:880px){.cases-grid{grid-template-columns:1fr}}
.case-card{padding:24px;background:var(--surface);border-radius:14px;text-decoration:none;color:inherit;transition:all .2s;display:flex;flex-direction:column;gap:12px}
.case-card:hover{transform:translateY(-2px);box-shadow:0 16px 32px -12px rgba(0,0,0,.1)}
.case-industry{font-size:11px;color:var(--accent);font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.case-name{font-size:18px;font-weight:800;color:var(--heading)}
.case-metric{font-size:32px;font-weight:800;color:var(--cta);line-height:1.1}
.case-metric-label{font-size:12px;color:var(--sub);font-weight:600}
.case-quote{font-size:13px;color:var(--text);line-height:1.6;border-top:1px solid var(--border);padding-top:12px;margin-top:auto}

.cta-section{padding:80px 24px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;text-align:center}
.cta-inner{max-width:760px;margin:0 auto}
.cta-h{font-size:32px;font-weight:800;line-height:1.4;margin-bottom:16px}
.cta-p{font-size:16px;color:#c8cedf;margin-bottom:32px;line-height:1.7}
.cta-buttons{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.cta-buttons .offer-cta{padding:16px 32px;font-size:16px}
.cta-buttons .offer-cta.outline{color:#fff;border-color:rgba(255,255,255,.4)}
.cta-buttons .offer-cta.outline:hover{background:rgba(255,255,255,.08)}
`;

const utm = (content: string) =>
  `?utm_source=markezine&utm_medium=event&utm_campaign=markezine_day_2026&utm_content=${content}`;

export default function MarkezineDayClient({ cases }: Props) {
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formCampaign, setFormCampaign] = useState("markezine_day_2026");

  const openConsultation = () => setMeetingOpen(true);
  const openTrial = () => {
    setFormCampaign("markezine_day_2026_trial");
    setFormOpen(true);
  };

  return (
    <div style={{ background: "#fafaf7", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Nav variant="light" />

      {/* Hero */}
      <section className="event-hero">
        <div className="event-hero-inner">
          <div className="event-badge">
            <span>★</span> MarkeZine Day 2026 視聴者限定特典
          </div>
          <h1 className="event-h1">
            ご視聴ありがとうございました
            <br />
            <strong>視聴者限定で、まず試せる環境</strong>をご用意しました
          </h1>
          <p className="event-sub">
            「AI SDR が変える BtoB 営業の新常識 ─ 商談獲得を自動化する実践アプローチ」
            を最後までご視聴いただき、誠にありがとうございました。
            セッションでお話しした AI SDR を、視聴者限定の環境で
            実際に試していただけます。
          </p>
          <div className="event-meta">
            <div className="event-meta-item">
              <span>登壇者:</span>
              <strong>澤野拓実</strong>
            </div>
            <div className="event-meta-item">
              <span>提供:</span>
              <strong>DynaMeet 株式会社</strong>
            </div>
            <div className="event-meta-item">
              <span>セッション:</span>
              <strong>2026/05/21</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="offers-section">
        <div className="offers-inner">
          <h2 className="offers-title">視聴者限定オファー</h2>
          <p className="offers-subtitle">「まず実運用で試す」が最短ルート。判断に迷う場合は個別相談もご用意しています</p>
          <div className="offers-grid">
            {/* Primary: 30日トライアル */}
            <div className="offer-card primary">
              <div className="offer-icon">🚀</div>
              <span className="offer-tag" style={{ background: "var(--cta)" }}>
                通常14日 → 30日
              </span>
              <h3 className="offer-h">30日間 無料トライアル</h3>
              <p className="offer-desc">
                通常 14 日間の無料トライアルを 30 日間に延長。
                カード情報不要、全機能利用可能、初期設定の
                無料サポート付。実運用で AI SDR の効果を体感してください。
              </p>
              <button className="offer-cta" onClick={openTrial}>
                無料で始める →
              </button>
            </div>

            {/* Secondary: 30分相談 */}
            <div className="offer-card">
              <div className="offer-icon">💬</div>
              <h3 className="offer-h">まずは相談したい方へ</h3>
              <p className="offer-desc">
                30分 AI SDR 戦略相談（無料）。
                澤野が直接、貴社の営業課題に合わせた
                導入ステップをご提案します。質問だけでも歓迎です。
              </p>
              <button className="offer-cta outline" onClick={openConsultation}>
                相談を予約する →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Session Recap */}
      <section className="recap-section">
        <div className="recap-inner">
          <h2 className="recap-title">セッションでお伝えした3つのポイント</h2>
          <div className="recap-grid">
            <div className="recap-card">
              <div className="recap-num">1</div>
              <h3 className="recap-h">AI SDR とは何か</h3>
              <p className="recap-p">
                従来の SDR 業務（リード対応・初期接触・商談設定）を AI エージェントが
                24時間365日、5 秒以内のスピードで処理する仕組み。
              </p>
            </div>
            <div className="recap-card">
              <div className="recap-num">2</div>
              <h3 className="recap-h">AI SDR 導入の実践知見</h3>
              <p className="recap-p">
                EdulinX 様で商談化率 60% を達成。設計のコツは
                「AI に任せる範囲」と「人が介在する場面」の境界線設計。
              </p>
            </div>
            <div className="recap-card">
              <div className="recap-num">3</div>
              <h3 className="recap-h">AI 時代の営業組織</h3>
              <p className="recap-p">
                人間 SDR を AI に置き換える話ではなく、
                人がより高付加価値な仕事に集中できる構造への移行。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      {cases.length > 0 && (
        <section className="cases-section">
          <div className="cases-inner">
            <h2 className="cases-title">主な導入事例</h2>
            <p className="cases-subtitle">
              セッション内で紹介した事例を含む、Meeton ai の導入企業様の成果
            </p>
            <div className="cases-grid">
              {cases.map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}/`} className="case-card">
                  <div className="case-industry">{c.industry}</div>
                  <div className="case-name">{c.name}</div>
                  {c.heroMetric && (
                    <>
                      <div className="case-metric">{c.heroMetric}</div>
                      <div className="case-metric-label">{c.heroMetricLabel}</div>
                    </>
                  )}
                  {c.quote && (
                    <p className="case-quote">
                      「{c.quote}」
                      {c.quotePerson && (
                        <>
                          <br />
                          <span style={{ color: "var(--sub)", fontSize: 11 }}>— {c.quotePerson}</span>
                        </>
                      )}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-h">AI SDR の導入を、最短最速で。</h2>
          <p className="cta-p">
            ご視聴後の次の一歩として、ぜひ視聴者特典をご活用ください。
            ご質問・ご相談は澤野が直接対応いたします。
          </p>
          <div className="cta-buttons">
            <button className="offer-cta" onClick={openTrial}>
              30日間 無料トライアル →
            </button>
            <button className="offer-cta outline" onClick={openConsultation}>
              30分 相談を予約する →
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <HubSpotMeetingModal
        isOpen={meetingOpen}
        onClose={() => setMeetingOpen(false)}
        utmCampaign="markezine_day_2026"
      />
      <HubSpotModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        utmCampaign={formCampaign}
      />
    </div>
  );
}
