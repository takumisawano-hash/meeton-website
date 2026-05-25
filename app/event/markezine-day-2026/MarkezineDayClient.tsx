"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Footer from "@/app/components/Footer";
const HubSpotMeetingModal = dynamic(() => import("@/app/components/HubSpotMeetingModal"), { ssr: false });

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
  --pink:#d03ea1;--blue:#3b6ff5;--blue-light:#eaf0fe;--cyan:#0891b2;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Hiragino Sans','Yu Gothic',var(--font-noto),'Noto Sans JP',sans-serif;font-size:17px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

/* HERO */
.event-hero{padding:96px 24px 72px;background:linear-gradient(180deg,#f7f8ff 0%,#fff 100%);position:relative;overflow:hidden}
.event-hero::before{content:"";position:absolute;top:-120px;right:-120px;width:440px;height:440px;background:radial-gradient(circle,rgba(124,92,252,.12) 0%,transparent 70%);pointer-events:none}
.event-hero-inner{max-width:980px;margin:0 auto;text-align:center;position:relative;z-index:1}
.event-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;background:var(--accent-light);color:var(--accent);border-radius:100px;font-size:12px;font-weight:700;margin-bottom:28px;letter-spacing:.08em}
.event-eyebrow svg{flex-shrink:0}
.event-h1{font-size:48px;font-weight:800;color:var(--heading);line-height:1.28;margin-bottom:24px;letter-spacing:-.015em;max-width:840px;margin-left:auto;margin-right:auto}
.event-h1 strong{color:var(--accent)}
.event-sub{font-size:17px;color:var(--sub);line-height:1.85;max-width:680px;margin:0 auto 40px}
.event-meta{display:inline-flex;gap:24px;font-size:13px;color:var(--sub);align-items:center;flex-wrap:wrap;justify-content:center;padding-top:32px;border-top:1px solid var(--border);margin-top:8px}
.event-meta-item{display:flex;align-items:center;gap:8px}
.event-meta-item strong{color:var(--heading);font-weight:700}
.event-meta-divider{width:1px;height:14px;background:var(--border)}

/* EVENT BANNER — 澤野登壇の証拠 + Tier 2 思い出し補助 */
.event-banner-wrap{max-width:760px;margin:0 auto 32px;border-radius:18px;overflow:hidden;border:1px solid var(--border);box-shadow:0 16px 40px -20px rgba(15,17,40,.18);background:#fff}
.event-banner-img{display:block;width:100%;height:auto;object-fit:cover}

/* NO RECORDING CALLOUT — hero 直下、最重要文脈 */
.no-recording-callout{display:flex;gap:16px;align-items:flex-start;max-width:680px;margin:0 auto 32px;padding:20px 24px;background:#fff7e6;border:1.5px solid #f5d486;border-radius:14px;text-align:left;font-size:14px;line-height:1.75;color:#5b4419}
.no-recording-callout strong{color:#7a5a14;display:block;margin-bottom:4px;font-size:15px;font-weight:800}
.no-recording-icon{flex-shrink:0;width:38px;height:38px;border-radius:50%;background:#f5d486;color:#7a5a14;display:flex;align-items:center;justify-content:center}

/* HERO CTA — スライドDLのみ、診断 CTA はここに出さない */
.event-hero-cta{display:flex;justify-content:center;margin:0 auto 40px}

/* CTA buttons (shared) */
.btn{padding:14px 24px;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;line-height:1}
.btn-primary{background:var(--cta);color:#fff}
.btn-primary:hover{background:var(--cta-hover);transform:translateY(-1px);box-shadow:0 8px 20px var(--cta-glow)}
.btn-outline{background:transparent;color:var(--cta);border:1.5px solid var(--cta)}
.btn-outline:hover{background:var(--cta-light)}
.btn-arrow{font-size:18px;line-height:1}

/* SLIDES (anchor target) */
.slides-section{padding:80px 24px;background:#fff}
.slides-inner{max-width:880px;margin:0 auto}
.slides-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.slides-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:36px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
.slides-card{display:flex;gap:24px;align-items:center;padding:32px 32px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;border-radius:18px;flex-wrap:wrap}
.slides-card-icon{width:64px;height:64px;border-radius:14px;background:rgba(18,163,125,.18);color:#0fc19a;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.slides-card-body{flex:1;min-width:200px}
.slides-card-h{font-size:18px;font-weight:800;color:#fff;line-height:1.45;margin-bottom:6px;letter-spacing:-.005em}
.slides-card-desc{font-size:13px;color:#c8cedf;line-height:1.7}

/* PART LABEL — shared eyebrow for each major part */
.part-label{display:inline-block;font-size:11px;font-weight:800;color:var(--accent);letter-spacing:.16em;margin-bottom:14px}
.part-label.center{display:block;text-align:center}
.part-label.white{color:#a78bfa}

/* PART 01 — PROBLEM intro */
.part-section{padding:88px 24px;background:#fff;text-align:center}
.part-inner{max-width:760px;margin:0 auto}
.part-title{font-size:36px;font-weight:800;color:var(--heading);line-height:1.35;margin-bottom:20px;letter-spacing:-.012em}
.part-lead{font-size:16px;color:var(--sub);line-height:1.95}
.part-lead strong{color:var(--heading);font-weight:800}

/* WALLS — 3 構造的な壁 */
.walls-section{padding:88px 24px;background:var(--surface)}
.walls-inner{max-width:1180px;margin:0 auto}
.walls-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:14px;letter-spacing:-.01em}
.walls-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;line-height:1.85}
.walls-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
@media (max-width:1024px){.walls-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}}
.wall-card{padding:32px 26px;background:#fff;border:1px solid var(--border);border-radius:18px;display:flex;flex-direction:column;gap:10px;transition:all .25s}
.wall-card:hover{transform:translateY(-3px);box-shadow:0 18px 40px -18px rgba(0,0,0,.12);border-color:var(--border2)}
.wall-num{font-size:14px;font-weight:900;color:var(--accent);letter-spacing:.08em}
.wall-eyebrow{font-size:11px;color:var(--sub);font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.wall-h{font-size:22px;font-weight:800;color:var(--heading);line-height:1.4;letter-spacing:-.005em;margin-bottom:8px}
.wall-stat{display:flex;align-items:baseline;gap:12px;margin:8px 0;flex-wrap:wrap}
.wall-stat-num{font-size:38px;font-weight:900;color:var(--heading);letter-spacing:-.02em;line-height:1}
.wall-stat-num.green{color:var(--cta)}
.wall-stat-num.red{color:#e0475b}
.wall-stat-num.blue{color:var(--blue)}
.wall-stat-arrow{font-size:18px;color:var(--sub);font-weight:700}
.wall-p{font-size:14px;color:var(--text);line-height:1.85;flex:1}
.wall-p strong{color:var(--heading);font-weight:800}
.wall-source{font-size:11px;color:var(--sub);font-weight:600;letter-spacing:.04em;padding-top:14px;border-top:1px solid var(--border);margin-top:8px}

/* GAP — 既存ツールの空白 */
.gap-section{padding:88px 24px;background:#fff}
.gap-inner{max-width:1180px;margin:0 auto;text-align:center}
.gap-title{font-size:30px;font-weight:800;color:var(--heading);margin-bottom:40px;letter-spacing:-.01em}
.gap-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;text-align:left;margin-bottom:36px}
@media (max-width:1024px){.gap-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.gap-grid{grid-template-columns:1fr;max-width:420px;margin-left:auto;margin-right:auto}}
.gap-card{padding:24px 22px;background:var(--surface);border:1px solid var(--border);border-radius:14px;display:flex;flex-direction:column;gap:8px}
.gap-h{font-size:18px;font-weight:800;color:var(--heading);letter-spacing:-.005em}
.gap-tools{font-size:11px;color:var(--sub);font-weight:700;letter-spacing:.04em}
.gap-strength{font-size:13px;color:var(--text);font-weight:700;line-height:1.7;padding-top:10px;border-top:1px solid var(--border);margin-top:4px}
.gap-limit{font-size:13px;color:#e0475b;font-weight:700;line-height:1.7}
.gap-conclusion{font-size:17px;color:var(--heading);line-height:1.85;font-weight:600;max-width:680px;margin:0 auto}
.gap-conclusion strong{color:var(--accent);font-weight:800}

/* AI SDR (PART 02) — dark theme accent */
.ai-sdr-section{padding:96px 24px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;text-align:center;position:relative;overflow:hidden}
.ai-sdr-section::before{content:'';position:absolute;top:-160px;right:-160px;width:520px;height:520px;background:radial-gradient(circle,rgba(124,92,252,.20) 0%,transparent 70%);pointer-events:none}
.ai-sdr-inner{max-width:1080px;margin:0 auto;position:relative;z-index:1}
.ai-sdr-title{font-size:36px;font-weight:800;color:#fff;line-height:1.3;margin-bottom:18px;letter-spacing:-.01em}
.ai-sdr-lead{font-size:17px;color:#d4d8ea;line-height:1.9;max-width:760px;margin:0 auto 48px}
.ai-sdr-lead strong{color:#fff;font-weight:800}
.ai-sdr-pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:880px;margin:0 auto 36px}
@media (max-width:880px){.ai-sdr-pillars{grid-template-columns:repeat(2,1fr);max-width:520px}}
.ai-sdr-pillar{padding:28px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;backdrop-filter:blur(12px)}
.ai-sdr-pillar-num{font-size:36px;font-weight:900;line-height:1;letter-spacing:-.02em;background:linear-gradient(135deg,#7c5cfc,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
.ai-sdr-pillar-label{font-size:13px;color:#c8cedf;font-weight:700;letter-spacing:.03em;line-height:1.55}
.ai-sdr-note{font-size:13px;color:#a4a9c4;font-style:italic;max-width:680px;margin:0 auto;line-height:1.7}

/* KPI + 落とし穴 */
.kpi-section{padding:88px 24px;background:var(--surface)}
.kpi-inner{max-width:1080px;margin:0 auto;text-align:center}
.kpi-title{font-size:30px;font-weight:800;color:var(--heading);margin-bottom:40px;letter-spacing:-.01em}
.kpi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;text-align:left;max-width:920px;margin:0 auto}
@media (max-width:880px){.kpi-grid{grid-template-columns:1fr;max-width:520px}}
.kpi-card{padding:32px 28px;background:#fff;border:1px solid var(--border);border-radius:16px}
.kpi-h{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:18px;letter-spacing:-.005em}
.kpi-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px}
.kpi-list li{font-size:14px;color:var(--text);font-weight:700;line-height:1.65;padding-left:22px;position:relative}
.kpi-list li::before{content:'✓';position:absolute;left:0;top:0;color:var(--cta);font-weight:900}
.kpi-note{display:block;font-size:12px;color:var(--sub);font-weight:500;margin-top:4px;line-height:1.6}

/* FUTURE — PART 04 */
.future-section{padding:96px 24px;background:linear-gradient(180deg,#1a1d3a 0%,#0f1128 100%);color:#fff;position:relative;overflow:hidden}
.future-section::before{content:'';position:absolute;bottom:-180px;left:-160px;width:520px;height:520px;background:radial-gradient(circle,rgba(18,163,125,.18) 0%,transparent 70%);pointer-events:none}
.future-inner{max-width:1080px;margin:0 auto;position:relative;z-index:1}
.future-title{font-size:32px;font-weight:800;color:#fff;text-align:center;line-height:1.35;margin-bottom:14px;letter-spacing:-.01em}
.future-lead{font-size:15px;color:#c8cedf;text-align:center;line-height:1.85;margin-bottom:48px;max-width:680px;margin-left:auto;margin-right:auto}
.future-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:920px;margin:0 auto 48px}
@media (max-width:880px){.future-grid{grid-template-columns:1fr;max-width:520px}}
.future-card{padding:32px 28px;border-radius:18px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}
.future-card.ai{border-color:rgba(124,92,252,.32);background:rgba(124,92,252,.06)}
.future-card.human{border-color:rgba(18,163,125,.32);background:rgba(18,163,125,.06)}
.future-card-label{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:18px}
.future-card.ai .future-card-label{color:#a78bfa}
.future-card.human .future-card-label{color:#0fc19a}
.future-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px}
.future-list li{font-size:14px;color:#e2e6f3;font-weight:600;line-height:1.7;padding-left:20px;position:relative}
.future-list li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:6px;border-radius:50%}
.future-card.ai .future-list li::before{background:#a78bfa}
.future-card.human .future-list li::before{background:#0fc19a}

/* MARKETER SHIFT */
.marketer-shift{display:grid;grid-template-columns:1fr auto 1fr;gap:18px;align-items:stretch;max-width:920px;margin:0 auto 32px}
@media (max-width:880px){.marketer-shift{grid-template-columns:1fr}}
.marketer-shift-before,.marketer-shift-after{padding:24px 22px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}
.marketer-shift-after{background:rgba(124,92,252,.10);border-color:rgba(124,92,252,.32)}
.marketer-shift-label{font-size:11px;font-weight:800;letter-spacing:.16em;color:#a4a9c4;margin-bottom:10px}
.marketer-shift-after .marketer-shift-label{color:#a78bfa}
.marketer-shift-body{font-size:14px;color:#e2e6f3;line-height:1.75}
.marketer-shift-body strong{display:block;color:#fff;font-weight:800;font-size:16px;margin-bottom:6px}
.marketer-shift-arrow{display:flex;align-items:center;justify-content:center;color:#a4a9c4;font-size:24px;font-weight:700}
@media (max-width:880px){.marketer-shift-arrow{transform:rotate(90deg);padding:8px 0}}
.marketer-conclusion{text-align:center;font-size:16px;color:#e2e6f3;line-height:1.9;max-width:680px;margin:0 auto;font-weight:600}
.marketer-conclusion strong{color:#0fc19a;font-weight:800}

/* FEATURE axis tag */
.feature-axis-tag{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.08em;padding:3px 10px;background:var(--feat-bg);color:var(--feat-color);border-radius:100px;width:fit-content;margin-bottom:-2px}

/* RECAP (Session 3 points) */
.recap-section{padding:88px 24px;background:var(--surface)}
.recap-inner{max-width:1080px;margin:0 auto}
.recap-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.recap-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.recap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media (max-width:880px){.recap-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}}
.recap-card{padding:32px 28px;background:#fff;border-radius:16px;border:1px solid var(--border);transition:all .25s}
.recap-card:hover{transform:translateY(-2px);box-shadow:0 12px 32px -16px rgba(0,0,0,.12);border-color:var(--border2)}
.recap-num{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:var(--accent);color:#fff;font-weight:900;font-size:16px;margin-bottom:18px}
.recap-h{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:12px;line-height:1.45;letter-spacing:-.005em}
.recap-p{font-size:14px;color:var(--sub);line-height:1.8}

/* FEATURES (4 products) */
.features-section{padding:88px 24px;background:#fff}
.features-inner{max-width:1180px;margin:0 auto}
.features-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.features-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.features-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
@media (max-width:1100px){.features-grid{grid-template-columns:repeat(2,1fr);gap:18px;max-width:720px;margin-left:auto;margin-right:auto}}
@media (max-width:600px){.features-grid{grid-template-columns:1fr;max-width:420px}}
.feature-card{padding:30px 24px;background:#fff;border:1px solid var(--border);border-radius:16px;position:relative;overflow:hidden;transition:all .3s;display:flex;flex-direction:column;gap:14px}
.feature-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--feat-color);opacity:0;transition:opacity .25s}
.feature-card:hover{transform:translateY(-4px);border-color:transparent;box-shadow:0 18px 40px -16px rgba(0,0,0,.12)}
.feature-card:hover::before{opacity:1}
.feature-icon{width:48px;height:48px;border-radius:12px;background:var(--feat-bg);color:var(--feat-color);display:flex;align-items:center;justify-content:center}
.feature-product-name{font-size:11px;color:var(--feat-color);font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:-6px}
.feature-name{font-size:17px;font-weight:800;color:var(--heading);line-height:1.4;letter-spacing:-.005em}
.feature-sub{font-size:13px;color:var(--sub);line-height:1.7;flex:1}
.feature-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;padding-top:14px;border-top:1px solid var(--border)}
.feature-list li{font-size:12px;color:var(--text);font-weight:600;display:flex;align-items:flex-start;gap:8px;line-height:1.5}
.feature-list li svg{flex-shrink:0;margin-top:2px;color:var(--feat-color)}

/* CASES */
.cases-section{padding:88px 24px;background:var(--surface)}
.cases-inner{max-width:1180px;margin:0 auto}
.cases-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.cases-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.cases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
@media (max-width:1024px){.cases-grid{grid-template-columns:repeat(2,1fr);max-width:720px;margin-left:auto;margin-right:auto}}
@media (max-width:680px){.cases-grid{grid-template-columns:1fr;max-width:420px}}
.case-card{background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:all .25s}
.case-card:hover{transform:translateY(-3px);box-shadow:0 18px 40px -16px rgba(18,163,125,.18);border-color:var(--cta)}
.case-img-wrap{position:relative;width:100%;aspect-ratio:16/10;background:linear-gradient(135deg,#eef1fb,#e3e8f5);overflow:hidden}
.case-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.case-body{padding:24px 22px;display:flex;flex-direction:column;gap:10px;flex:1}
.case-industry{font-size:11px;color:var(--accent);font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.case-name{font-size:18px;font-weight:800;color:var(--heading);line-height:1.4;letter-spacing:-.005em}
.case-metric-row{display:flex;align-items:baseline;gap:10px;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin:4px 0}
.case-metric{font-size:36px;font-weight:900;color:var(--cta);line-height:1;letter-spacing:-.02em}
.case-metric-label{font-size:12px;color:var(--sub);font-weight:600;line-height:1.4}
.case-quote{font-size:13px;color:var(--text);line-height:1.75;flex:1}
.case-quote-person{font-size:11px;color:var(--sub);font-weight:600;margin-top:6px}
.case-link{font-size:13px;color:var(--cta);font-weight:700;display:inline-flex;align-items:center;gap:6px;margin-top:8px}

/* CLOSING CTA */
.cta-section{padding:96px 24px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;text-align:center;position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;top:-200px;right:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(124,92,252,.18) 0%,transparent 70%);pointer-events:none}
.cta-section::after{content:'';position:absolute;bottom:-200px;left:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(18,163,125,.12) 0%,transparent 70%);pointer-events:none}
.cta-inner{max-width:760px;margin:0 auto;position:relative;z-index:1}
.cta-h{font-size:36px;font-weight:800;line-height:1.4;margin-bottom:18px;letter-spacing:-.01em}
.cta-p{font-size:16px;color:#c8cedf;margin-bottom:36px;line-height:1.8}
.cta-buttons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.cta-buttons .btn{padding:16px 30px;font-size:16px}
.cta-buttons .btn-outline{color:#fff;border-color:rgba(255,255,255,.4)}
.cta-buttons .btn-outline:hover{background:rgba(255,255,255,.08);border-color:#fff}

@media (max-width:880px){
  .event-h1{font-size:34px;line-height:1.3}
  .event-sub{font-size:16px}
  .slides-title,.part-title,.walls-title,.gap-title,.ai-sdr-title,.features-title,.cases-title,.kpi-title,.future-title{font-size:24px}
  .cta-h{font-size:28px}
  .event-meta{gap:14px;font-size:12px}
  .event-meta-divider{display:none}
  .no-recording-callout{font-size:13px;padding:16px 18px}
  .slides-card{padding:24px 20px;gap:16px}
}
@media (max-width:560px){
  .event-hero{padding:72px 20px 56px}
  .event-h1{font-size:28px}
  .wall-card{padding:26px 22px}
  .feature-card{padding:26px 22px}
}
`;

/* ── SVG Icons ── */
const IconSparkle = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

const IconChat = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconCalendar = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconMail = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconLibrary = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const IconCheck = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const FEATURES = [
  {
    key: "calendar",
    productName: "Meeton Calendar",
    axis: "スピード",
    name: "即時商談化",
    sub: "コンバート瞬間に商談予約。初動スピードの壁を解く。",
    bullets: ["フォーム送信直後の即時提示", "サンクスページ埋め込み", "営業日程の自動最適化"],
    color: "#0891b2",
    bg: "rgba(8,145,178,.10)",
    icon: <IconCalendar />,
  },
  {
    key: "email",
    productName: "Meeton Email",
    axis: "粘り強さ",
    name: "粘り強いフォロー",
    sub: "1:1 自律フォローで諦めず追跡。CRM に眠るリードまで再活性化。",
    bullets: ["1:1 動的シーケンス", "返信内容に応じた分岐", "商談化までナーチャリング"],
    color: "#7c5cfc",
    bg: "rgba(124,92,252,.10)",
    icon: <IconMail />,
  },
  {
    key: "live",
    productName: "Meeton Live",
    axis: "文脈",
    name: "再訪時の即時応答",
    sub: "再訪リードに過去全文脈を引き継いで即対応。文脈の壁を解く。",
    bullets: ["訪問者を即時識別", "過去会話の継続対応", "ラストワンマイル対話"],
    color: "#12a37d",
    bg: "rgba(18,163,125,.10)",
    icon: <IconChat />,
  },
  {
    key: "library",
    productName: "Meeton Library",
    axis: "文脈",
    name: "資料で育成",
    sub: "相手の関心に合う資料を AI が自動提案・解説。閲覧から商談に引き上げる。",
    bullets: ["文脈に応じた資料提案", "AI による解説対応", "Calendar への自動引継ぎ"],
    color: "#d03ea1",
    bg: "rgba(208,62,161,.10)",
    icon: <IconLibrary />,
  },
];

export default function MarkezineDayClient({ cases }: Props) {
  const [meetingOpen, setMeetingOpen] = useState(false);

  const openConsultation = () => setMeetingOpen(true);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Minimal LP header — logo only, no navigation (focus on CTA) */}
      <header
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #eef0f7",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Link href="/" aria-label="Meeton ai homepage">
          <Image
            src="/logo-dark.svg"
            alt="DynaMeet"
            width={120}
            height={26}
            style={{ height: 26, width: "auto" }}
            priority
          />
        </Link>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#6e7494",
            letterSpacing: "0.06em",
          }}
        >
          MarkeZine Day 2026 登壇内容まとめ
        </div>
      </header>

      {/* Hero */}
      <section className="event-hero">
        <div className="event-hero-inner">
          <div className="event-eyebrow">
            <IconSparkle />
            <span>MarkeZine Day 2026 登壇内容まとめ</span>
          </div>
          <h1 className="event-h1">
            <strong>AI SDR</strong> が変える<br />
            BtoB 営業の新常識
          </h1>
          <p className="event-sub">
            MarkeZine Day 2026 Online 登壇内容まとめ ─ 商談獲得を自動化する実践アプローチ
          </p>

          <div className="event-banner-wrap">
            <Image
              src="/event/markezine-day-2026/event-banner.webp"
              alt="MarkeZine Day 2026 Online｜AI SDR が変える BtoB 営業の新常識 — DynaMeet 澤野登壇 告知画像"
              width={1950}
              height={989}
              priority
              sizes="(max-width: 880px) 100vw, 760px"
              className="event-banner-img"
            />
          </div>

          <div className="no-recording-callout">
            <div className="no-recording-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <strong>本セッションは録画共有がない形式です。</strong>
              当日お話しした要点と登壇スライド、自社サイトで確認すべき商談化ロスのポイントをこちらにまとめました。
            </div>
          </div>

          <div className="event-hero-cta">
            <a className="btn btn-primary" href="#slides">
              登壇スライドをダウンロード <IconArrowRight />
            </a>
          </div>

          <div className="event-meta">
            <div className="event-meta-item">
              <span>登壇</span>
              <strong>澤野 拓実</strong>
            </div>
            <div className="event-meta-divider" />
            <div className="event-meta-item">
              <span>提供</span>
              <strong>DynaMeet 株式会社</strong>
            </div>
            <div className="event-meta-divider" />
            <div className="event-meta-item">
              <span>セッション</span>
              <strong>2026/05/21</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Slides DL section (anchor target) */}
      <section className="slides-section" id="slides">
        <div className="slides-inner">
          <h2 className="slides-title">登壇スライド</h2>
          <p className="slides-subtitle">
            当日お話しした内容のスライドを PDF でご覧いただけます。
          </p>
          <div className="slides-card">
            <div className="slides-card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="slides-card-body">
              <h3 className="slides-card-h">AI SDR が変える BtoB 営業の新常識</h3>
              <p className="slides-card-desc">
                MarkeZine Day 2026 Online｜DynaMeet 澤野登壇スライド (PDF)
              </p>
            </div>
            <a className="btn btn-primary" href="/downloads/markezine-day-2026-slides.pdf" target="_blank" rel="noopener">
              スライドをダウンロード <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* PART 01 — 課題提起 */}
      <section className="part-section part-problem">
        <div className="part-inner">
          <div className="part-label">PART 01 / THE PROBLEM</div>
          <h2 className="part-title">リードはあるのに、商談にならない</h2>
          <p className="part-lead">
            MA でリードは集まる。CRM にも溜まる。<br />
            でも、その大半は商談にならずに消えていく。<br />
            <strong>この原因は BtoB 営業に潜む構造的な課題です。</strong>
          </p>
        </div>
      </section>

      {/* PART 01 — 3 つの壁 */}
      <section className="walls-section">
        <div className="walls-inner">
          <div className="part-label center">PART 01 / 3 STRUCTURAL CHALLENGES</div>
          <h2 className="walls-title">商談化を阻む 3 つの構造的な壁</h2>
          <p className="walls-subtitle">
            どれも、人間 SDR には構造的に解けない課題。<br />
            マーケと営業の境界線で起きている現実。
          </p>
          <div className="walls-grid">
            <div className="wall-card">
              <div className="wall-num">01</div>
              <div className="wall-eyebrow">Speed</div>
              <h3 className="wall-h">初動スピード</h3>
              <div className="wall-stat"><span className="wall-stat-num">42h</span><span className="wall-stat-arrow">→</span><span className="wall-stat-num green">5m</span></div>
              <p className="wall-p">
                BtoB 営業の平均レスポンス時間。<br />
                <strong>5 分以内 vs 30 分後でコンタクト率 100 倍。</strong>
              </p>
              <div className="wall-source">HBR 2011 / MIT 2007</div>
            </div>
            <div className="wall-card">
              <div className="wall-num">02</div>
              <div className="wall-eyebrow">Persistence</div>
              <h3 className="wall-h">フォローの粘り強さ</h3>
              <div className="wall-stat"><span className="wall-stat-num">80%</span><span className="wall-stat-arrow">vs</span><span className="wall-stat-num red">44%</span></div>
              <p className="wall-p">
                の商談は 5 回以上のフォロー後に成約。<br />
                <strong>しかし営業の 44% が 1 回で諦める。</strong>
              </p>
              <div className="wall-source">RAIN Group 2024 / InsideSales</div>
            </div>
            <div className="wall-card">
              <div className="wall-num">03</div>
              <div className="wall-eyebrow">Context</div>
              <h3 className="wall-h">再訪時の文脈</h3>
              <div className="wall-stat"><span className="wall-stat-num">70%</span><span className="wall-stat-arrow">+</span><span className="wall-stat-num blue">81%</span></div>
              <p className="wall-p">
                の購買プロセスを買い手は営業接触前に独力で進める。<br />
                <strong>81% は接触前に第一候補ベンダーを決定済み。</strong>
              </p>
              <div className="wall-source">Gartner / 6sense</div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 01 — 既存ツールの空白 */}
      <section className="gap-section">
        <div className="gap-inner">
          <div className="part-label center">PART 01 / THE GAP</div>
          <h2 className="gap-title">既存ツールでは、この 3 つの壁は埋まらない</h2>
          <div className="gap-grid">
            <div className="gap-card">
              <h3 className="gap-h">MA</h3>
              <div className="gap-tools">Marketo / HubSpot / Pardot</div>
              <p className="gap-strength">リスト戦・一斉配信</p>
              <p className="gap-limit">→ 個別リードの瞬間に動けない</p>
            </div>
            <div className="gap-card">
              <h3 className="gap-h">SFA</h3>
              <div className="gap-tools">Salesforce / kintone</div>
              <p className="gap-strength">活動の記録ツール</p>
              <p className="gap-limit">→ 対応するのは結局人間</p>
            </div>
            <div className="gap-card">
              <h3 className="gap-h">Chatbot</h3>
              <div className="gap-tools">Drift / Intercom / Karakuri</div>
              <p className="gap-strength">全訪問者対象の対話</p>
              <p className="gap-limit">→ 商談化に最適化されていない</p>
            </div>
            <div className="gap-card">
              <h3 className="gap-h">人間 SDR</h3>
              <div className="gap-tools">採用・育成・配置</div>
              <p className="gap-strength">個別判断と対応</p>
              <p className="gap-limit">→ 24h 稼働 & 全リード対応は不可能</p>
            </div>
          </div>
          <p className="gap-conclusion">
            これは、マーケでも営業でもない ─ <strong>組織構造の空白</strong>。<br />
            <strong>AI だけが、ここを埋められる。</strong>
          </p>
        </div>
      </section>

      {/* PART 02 — AI SDR 定義 */}
      <section className="ai-sdr-section">
        <div className="ai-sdr-inner">
          <div className="part-label center white">PART 02 / WHAT IS AI SDR</div>
          <h2 className="ai-sdr-title">AI SDR とは何か</h2>
          <p className="ai-sdr-lead">
            SDR の仕事を AI エージェントが代替するアプローチ。<br />
            <strong>スピード・粘り強さ・文脈 の 3 軸すべてを、AI が自律的に実行する。</strong>
          </p>
          <div className="ai-sdr-pillars">
            <div className="ai-sdr-pillar"><div className="ai-sdr-pillar-num">24h</div><div className="ai-sdr-pillar-label">24 時間 365 日 稼働</div></div>
            <div className="ai-sdr-pillar"><div className="ai-sdr-pillar-num">AI</div><div className="ai-sdr-pillar-label">自律的に判断・行動</div></div>
            <div className="ai-sdr-pillar"><div className="ai-sdr-pillar-num">1:1</div><div className="ai-sdr-pillar-label">全リードへの個別対応</div></div>
            <div className="ai-sdr-pillar"><div className="ai-sdr-pillar-num">✓</div><div className="ai-sdr-pillar-label">商談予約まで完結</div></div>
          </div>
          <p className="ai-sdr-note">
            ※ AI SDR ≠ チャットボット / MA メール / SFA ─ これらの間にあった「空白」を埋める新カテゴリ
          </p>
        </div>
      </section>

      {/* PART 03 — Meeton ai 4 モジュール */}
      <section className="features-section">
        <div className="features-inner">
          <div className="part-label center">PART 03 / MEETON AI</div>
          <h2 className="features-title">スピード・粘り強さ・文脈を解く 4 つの AI モジュール</h2>
          <p className="features-subtitle">
            ウェブサイトでコンバートしたリードを、商談に変える。<br />
            集客領域は既存ツールに任せ、Meeton ai は「ラストワンマイル」を解きます。
          </p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div
                key={f.key}
                className="feature-card"
                style={{ ["--feat-color" as string]: f.color, ["--feat-bg" as string]: f.bg } as React.CSSProperties}
              >
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-axis-tag">3 軸：{f.axis}</div>
                <div className="feature-product-name">{f.productName}</div>
                <h3 className="feature-name">{f.name}</h3>
                <p className="feature-sub">{f.sub}</p>
                <ul className="feature-list">
                  {f.bullets.map((b) => (
                    <li key={b}>
                      <IconCheck />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      {cases.length > 0 && (
        <section className="cases-section">
          <div className="cases-inner">
            <div className="part-label center">PART 03 / CASE STUDIES</div>
            <h2 className="cases-title">登壇で紹介した事例</h2>
            <p className="cases-subtitle">
              EdulinX 様で商談化率 60%+ (業界平均 20% / 同社全体 23% の約 3 倍)。<br />
              Univis Group 様で 3 ヶ月 2 件受注 + 商談数約 2 倍。
            </p>
            <div className="cases-grid">
              {cases.map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}/`} className="case-card">
                  <div className="case-img-wrap">
                    {c.heroImage ? (
                      <img src={c.heroImage} alt={c.name} loading="lazy" />
                    ) : null}
                  </div>
                  <div className="case-body">
                    <div className="case-industry">{c.industry}</div>
                    <div className="case-name">{c.name}</div>
                    {c.heroMetric && (
                      <div className="case-metric-row">
                        <div className="case-metric">{c.heroMetric}</div>
                        <div className="case-metric-label">{c.heroMetricLabel}</div>
                      </div>
                    )}
                    {c.quote && (
                      <p className="case-quote">
                        「{c.quote}」
                        {c.quotePerson && (
                          <span className="case-quote-person"><br />— {c.quotePerson}</span>
                        )}
                      </p>
                    )}
                    <span className="case-link">
                      事例の詳細を読む <IconArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PART 03 — KPI + 落とし穴 */}
      <section className="kpi-section">
        <div className="kpi-inner">
          <div className="part-label center">PART 03 / IMPLEMENTATION</div>
          <h2 className="kpi-title">成果指標と導入時の押さえどころ</h2>
          <div className="kpi-grid">
            <div className="kpi-card">
              <h3 className="kpi-h">計測すべき 5 つの KPI</h3>
              <ul className="kpi-list">
                <li>リードへの対応速度 (5 分以内)</li>
                <li>リードからの商談化率</li>
                <li>インサイドセールス業務の削減工数</li>
                <li>有効商談への転換率</li>
                <li>商談獲得コスト</li>
              </ul>
            </div>
            <div className="kpi-card">
              <h3 className="kpi-h">導入時の落とし穴</h3>
              <ul className="kpi-list">
                <li>ウェブサイトへのある程度の集客が前提<br /><span className="kpi-note">ウェブサイトへの集客を増やすツールではない</span></li>
                <li>マーケ・営業チームの連携設計が要<br /><span className="kpi-note">リード受け取りフローを最初に決める</span></li>
                <li>KPI を最初に決める<br /><span className="kpi-note">計測しないと改善が進まない</span></li>
                <li>商談数を増やすことがゴール<br /><span className="kpi-note">新規リードを増やすことがゴールではない</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PART 04 — AI 時代の役割分担 */}
      <section className="future-section">
        <div className="future-inner">
          <div className="part-label center white">PART 04 / THE FUTURE</div>
          <h2 className="future-title">AI 時代の営業組織と、マーケターの新しい役割</h2>
          <p className="future-lead">
            人と AI を対立させるのではなく、役割分担で組織全体の成果を最大化する。
          </p>
          <div className="future-grid">
            <div className="future-card ai">
              <div className="future-card-label">AI が担う領域</div>
              <ul className="future-list">
                <li>リードへの即時レスポンス</li>
                <li>1:1 パーソナライズドフォロー</li>
                <li>再訪リードへの文脈持った対応</li>
                <li>商談予約までのコンバージョン</li>
                <li>データ集約と次のアクション提案</li>
              </ul>
            </div>
            <div className="future-card human">
              <div className="future-card-label">人間が集中する領域</div>
              <ul className="future-list">
                <li>商談実施・クロージング</li>
                <li>顧客との長期関係構築</li>
                <li>戦略提案・コンサルティング</li>
                <li>AI が出すデータの解釈と判断</li>
                <li>営業組織と AI の設計・改善</li>
              </ul>
            </div>
          </div>
          <div className="marketer-shift">
            <div className="marketer-shift-before">
              <div className="marketer-shift-label">BEFORE</div>
              <div className="marketer-shift-body"><strong>リードを集める</strong><br />MA、広告、コンテンツの最適化</div>
            </div>
            <div className="marketer-shift-arrow">→</div>
            <div className="marketer-shift-after">
              <div className="marketer-shift-label">AFTER</div>
              <div className="marketer-shift-body"><strong>リードが商談化される全工程を設計する</strong><br />営業との連携、AI を含むテクノロジースタックの設計、ファネル全体の KPI 設計</div>
            </div>
          </div>
          <p className="marketer-conclusion">
            AI SDR を含むテクノロジースタックの「<strong>設計者</strong>」になる。<br />
            それが、AI 時代のマーケターの新しい競争優位の源泉です。
          </p>
        </div>
      </section>

      {/* Closing CTA — 30 分 AI SDR 活用診断 */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-h">貴社で AI SDR を活用できる余地を、30 分で診断します。</h2>
          <p className="cta-p">
            貴社のウェブサイト・リード対応フロー・CRM 運用をもとに、AI SDR で改善できる領域を 30 分で整理します。
            導入前提ではなく、まずは商談化プロセスの改善余地を確認する場としてご利用ください。
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={openConsultation}>
              30 分 AI SDR 活用診断を予約する <IconArrowRight />
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
    </div>
  );
}
