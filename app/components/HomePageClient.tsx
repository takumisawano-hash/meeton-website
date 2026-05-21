"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import MidPageCta from "./MidPageCta";
import Nav from "./Nav";
import { openMeetonCalendar, openMeetonDownloadCenter } from "@/app/lib/meeton-cta";

// Modals only render after a user click, so there's no reason to ship
// their JS in the initial homepage bundle. Dynamic-import shaves
// ~30-50KB minified off the critical path which directly hits LCP/FCP
// on mobile 4G simulations. ssr:false because the modals never paint
// during SSR anyway.
const HubSpotMeetingModal = dynamic(() => import("./HubSpotMeetingModal"), { ssr: false });
const HubSpotModal = dynamic(() => import("./HubSpotModal"), { ssr: false });

// Lazy: heavy presentational components used only in home mode
const ComparisonTable = dynamic(() => import("./ComparisonTable"), {
  ssr: true,
  loading: () => null,
});
const MeetingFlowDiagram = dynamic(() => import("./MeetingFlowDiagram"), {
  ssr: true,
  loading: () => null,
});

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    lintrk?: (action: string, data: { conversion_id: number }) => void;
  }
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const css = `
:root {
  /* 2026-05-20 design refresh: tighter neutral palette + Inter primary
     display font (Linear / Stripe class). Light bg slightly cooler for
     better contrast against dark sections. */
  --bg:#ffffff;--surface:#F7FAF8;--surface2:#EFF4F1;
  --border:#E5EEE8;--border2:#D8E4DD;
  --text:#4B5A52;--heading:#0B1712;--sub:#6C7B73;
  --cta:#04cb78;--cta-hover:#0fc19a;--cta-glow:rgba(4,203,120,.22);--cta-light:#E8FBF1;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.18);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--pink:#d03ea1;--red:#e0475b;
  /* Display: Inter (Latin) → Noto system stack (JP). */
  --fd:'Inter',var(--font-inter),'Plus Jakarta Sans',var(--font-jakarta),var(--font-noto),sans-serif;
  --fb:'Inter',var(--font-inter),var(--font-noto),'Plus Jakarta Sans',sans-serif;
  --fm:'JetBrains Mono',var(--font-mono),monospace;
  /* 8px grid spacing scale */
  --sp-1:4px;--sp-2:8px;--sp-3:12px;--sp-4:16px;--sp-5:24px;--sp-6:32px;--sp-7:48px;--sp-8:64px;--sp-9:96px;
}
*{margin:0;padding:0;box-sizing:border-box}
html{font-feature-settings:'cv02','cv03','cv04','cv11','calt';font-variant-ligatures:contextual}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:17px;line-height:1.65;overflow-x:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUpOnly{from{transform:translateY(24px)}to{transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes flowRight{0%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes emailPulse{0%,100%{box-shadow:0 0 0 0 rgba(18,163,125,.3)}50%{box-shadow:0 0 0 10px rgba(18,163,125,0)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes barGrow{0%{width:0}30%{width:99%}80%{width:99%}100%{width:0}}
@keyframes barCv{0%,40%{width:0}50%{width:1%}80%{width:1%}100%{width:0}}
@keyframes dashFlow{0%{stroke-dashoffset:12}100%{stroke-dashoffset:0}}
@keyframes hubStep1{0%,5%{opacity:0}10%{opacity:1}28%{opacity:1}33%{opacity:0}34%,100%{opacity:0}}
@keyframes hubStep2{0%,33%{opacity:0}38%{opacity:1}61%{opacity:1}66%{opacity:0}67%,100%{opacity:0}}
@keyframes hubStep3{0%,66%{opacity:0}71%{opacity:1}95%{opacity:1}100%{opacity:0}}
/* .anim: legacy fadeUp (opacity 0→1) — opacity:0 hides the LCP element
   from Lighthouse's paint detection until the animation runs, costing
   ~1s on every above-the-fold "anim" element. Keep below-the-fold uses
   but DO NOT use it on hero h1/badge/sub. */
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
/* .anim-y: same vertical slide-in feel but never sets opacity:0 — safe
   for LCP-critical elements. */
.anim-y{animation:slideUpOnly .6s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.52s}.d5{animation-delay:.68s}

/* AI-template cliché classes (.dot-grid, .glow) removed in commit 86a831a. */

/* Buttons — 8px grid padding, cubic-bezier(.16,1,.3,1) easing for premium feel.
   Solid CTA color (no gradient) since gradient buttons read AI-cliché. */
.btn{border:none;cursor:pointer;font-family:var(--fb);transition:transform .18s cubic-bezier(.16,1,.3,1),box-shadow .22s cubic-bezier(.16,1,.3,1),background .18s;font-weight:700;border-radius:10px;min-height:44px;-webkit-tap-highlight-color:transparent;letter-spacing:-.005em}
.btn:focus-visible{outline:2px solid var(--cta);outline-offset:3px}
.btn-cta{display:inline-flex;align-items:center;justify-content:center;text-align:center;background:var(--cta);color:#fff;padding:14px 28px;font-size:15px;box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 4px 14px var(--cta-glow);letter-spacing:-.005em;text-decoration:none}
.btn-cta:hover{background:var(--cta-hover);transform:translateY(-1px);box-shadow:0 1px 0 rgba(255,255,255,.22) inset,0 8px 22px var(--cta-glow)}
.btn-cta:active{transform:translateY(0);box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 2px 8px var(--cta-glow)}
.btn-cta-lg{padding:16px 32px;font-size:16px;box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 6px 22px var(--cta-glow)}
.btn-ghost{display:inline-flex;align-items:center;justify-content:center;text-align:center;background:transparent;color:var(--heading);border:1px solid var(--border2);padding:15px 30px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:border-color .18s,color .18s,background .18s,transform .18s cubic-bezier(.16,1,.3,1);min-height:44px;-webkit-tap-highlight-color:transparent;text-decoration:none}
.btn-ghost:hover{border-color:var(--heading);color:var(--heading);background:var(--surface);transform:translateY(-1px)}
.btn-ghost:focus-visible{outline:2px solid var(--cta);outline-offset:3px}
.btn-ghost:active{transform:translateY(0)}

.slabel{font-family:var(--fm);font-size:11px;font-weight:700;color:var(--cta);letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px}
/* 8px grid: section padding = 96px desktop / 64px mobile, both multiples of 8 */
.section{padding:clamp(64px,9vw,96px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,4.6vw,44px);font-weight:800;color:var(--heading);line-height:1.25;letter-spacing:-.025em;margin-bottom:16px;text-wrap:balance}
.ssub{font-size:clamp(15px,2.2vw,17px);line-height:1.8;color:var(--sub);max-width:640px;text-wrap:pretty}

/* HERO — clean, no gradient/glow/dot-grid (AI-template cliché removed) */
.hero{min-height:88vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:120px 24px 88px;background:#fff;border-bottom:1px solid var(--border)}
.hero-content{max-width:860px;text-align:center;position:relative;z-index:2}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--cta-light);border:1px solid rgba(4,203,120,.18);padding:7px 16px;border-radius:999px;margin-bottom:28px;font-size:13px;font-weight:700;color:var(--cta);letter-spacing:.04em;font-family:var(--fm)}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(30px,6vw,60px);font-weight:900;color:var(--heading);line-height:1.22;letter-spacing:-.025em;margin-bottom:28px;text-wrap:balance;max-width:18ch;margin-left:auto;margin-right:auto}
.hero h1 em{font-style:normal;display:inline;color:var(--cta)}
@media (min-width:780px){.hero-h1{max-width:24ch}}
.hero-sub{font-size:clamp(16px,3vw,22px);line-height:1.8;color:var(--sub);max-width:640px;margin:0 auto 48px}
.hero-webinar-band{display:inline-flex;align-items:center;gap:16px;margin-top:22px;padding:12px 18px;background:rgba(18,163,125,.06);border:1px solid rgba(18,163,125,.22);border-radius:14px;text-decoration:none;color:inherit;max-width:640px;transition:background .2s,border-color .2s,transform .2s;flex-wrap:wrap;justify-content:flex-start}
.hero-webinar-band:hover{background:rgba(18,163,125,.10);border-color:rgba(18,163,125,.4);transform:translateY(-1px)}
.hero-webinar-tag{display:inline-flex;align-items:center;padding:4px 10px;font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:0.08em;background:var(--cta);color:#fff;border-radius:999px;flex-shrink:0}
.hero-webinar-body{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0;text-align:left}
.hero-webinar-body strong{font-size:14px;font-weight:800;color:var(--heading);line-height:1.4}
.hero-webinar-meta{font-size:12px;color:var(--sub);font-weight:600}
.hero-webinar-arrow{color:var(--cta);font-weight:800;font-size:18px;line-height:1;flex-shrink:0}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.hero-mini-flow{display:inline-flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 auto 36px;padding:14px 22px;background:rgba(18,163,125,.05);border:1px solid rgba(18,163,125,.18);border-radius:12px;max-width:900px;justify-content:center}
.hero-mini-step{font-size:13px;font-weight:700;color:var(--heading);font-family:var(--fb);white-space:nowrap}
.hero-mini-arrow{font-size:12px;color:var(--cta);font-weight:700}
@media (max-width:680px){.hero-mini-flow{padding:12px 14px}.hero-mini-step{font-size:12px}.hero-mini-arrow{font-size:10px}}
.hero-tertiary{margin-top:22px;text-align:center}
.hero-tertiary-link{color:var(--sub);font-size:14px;font-weight:600;text-decoration:none;border-bottom:1px solid var(--border2);padding-bottom:2px;transition:color .2s,border-color .2s}
.hero-tertiary-link:hover{color:var(--cta);border-color:var(--cta)}

/* VISION SECTION — dark, AI SDR カテゴリ確立 */
.vision-section{background:#050807;color:#fff;padding:clamp(72px,9vw,108px) clamp(16px,5vw,48px);border-top:1px solid #0d1411;border-bottom:1px solid #0d1411}
.vision-heading{font-size:clamp(26px,4.2vw,40px);font-weight:900;letter-spacing:-.02em;line-height:1.35;color:#fff;text-align:center;max-width:780px;margin:0 auto 18px;font-family:var(--fb);text-wrap:balance}
.vision-accent{color:#04cb78}
.vision-sub{font-size:clamp(15px,2vw,17px);line-height:1.85;color:rgba(255,255,255,.7);max-width:680px;margin:0 auto 56px;text-align:center}
.vision-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:980px;margin:0 auto}
@media (max-width:780px){.vision-grid{grid-template-columns:1fr;gap:16px;max-width:520px}}
.vision-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:28px 24px;transition:background .25s,border-color .25s}
.vision-card:hover{background:rgba(255,255,255,.05);border-color:rgba(4,203,120,.35)}
.vision-card-label{font-family:var(--fm);font-size:12px;font-weight:700;color:#04cb78;letter-spacing:.2em;margin-bottom:14px}
.vision-card-title{font-size:20px;font-weight:800;color:#fff;margin-bottom:10px;letter-spacing:-.01em}
.vision-card-desc{font-size:14px;line-height:1.75;color:rgba(255,255,255,.65)}
.hero-stats{display:flex;justify-content:center;gap:clamp(32px,8vw,72px);margin-top:clamp(40px,8vw,72px);padding-top:clamp(32px,6vw,48px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(36px,6vw,52px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--accent));letter-spacing:-1px}
.stat-l{font-size:clamp(13px,2vw,15px);color:var(--sub);margin-top:8px;font-weight:600}

/* CATEGORY CARDS - 3 categories */
.cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
.phase-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:56px;max-width:1080px;margin-left:auto;margin-right:auto}
@media (max-width:1100px){.phase-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:760px}}
.problem-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:32px}
@media (max-width:1100px){.problem-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.problem-grid{grid-template-columns:1fr}}
.buyer-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:20px}
@media (max-width:1100px){.buyer-grid{grid-template-columns:repeat(2,1fr)!important}}
@media (max-width:600px){.buyer-grid{grid-template-columns:1fr!important}}
.philosophy-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:20px}
@media (max-width:880px){.philosophy-grid{grid-template-columns:1fr!important;max-width:520px;margin-left:auto;margin-right:auto}}
.cat-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:28px 26px;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.cat-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 24px 56px -20px rgba(15,17,40,.18)}
.cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--cat-color, #12a37d);opacity:.9;transition:opacity .25s, height .25s}
.cat-card:hover::before{opacity:1;height:4px}
.cat-label{font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:100px;width:fit-content}
.cat-title{font-size:clamp(20px,3vw,24px);font-weight:800;color:var(--heading);letter-spacing:-.015em;margin-bottom:10px;line-height:1.3}
.cat-desc{font-size:14px;line-height:1.8;color:var(--sub);margin-bottom:20px}
.cat-features{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;flex:1;padding-top:16px;border-top:1px solid var(--border)}
.cat-feat{display:flex;align-items:flex-start;gap:10px;font-size:13px;font-weight:600;color:var(--text);line-height:1.5}
.cat-feat-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.cat-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:800;color:var(--cta);text-decoration:none;transition:gap .2s,color .2s;margin-top:auto;padding-top:18px;border-top:1px solid var(--border)}
.cat-link:hover{gap:10px;color:var(--cta-hover)}

/* QUALITY FLOW DIAGRAM — horizontal */
.qflow-hz{display:flex;align-items:stretch;gap:0;max-width:1100px;margin:0 auto;width:100%}
.qflow-hz-step{flex:1;min-width:0;display:flex;flex-direction:column}
.qflow-hz-arrow{display:flex;align-items:center;justify-content:center;width:48px;flex-shrink:0;color:#c8cedf;font-size:22px;font-weight:300}
.qflow-hz-gate{display:flex;align-items:center;justify-content:center;width:auto;flex-shrink:0;padding:0 6px}

/* QUALITY SECTION */
.qual-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px}
.qual-desc{font-size:15px;line-height:1.75;color:var(--sub)}

/* FLOW DIAGRAM */
.flow-wrap{margin-top:56px;position:relative;padding:40px 0}
.flow-row{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:nowrap;overflow-x:auto;padding:8px 0}
.flow-node{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:120px;flex-shrink:0}
.flow-node-box{width:100px;height:100px;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:2px solid;transition:all .3s;font-size:28px;position:relative}
.flow-node-box:hover{transform:scale(1.08)}
.flow-node-label{font-size:12px;font-weight:800;color:var(--heading);text-align:center;line-height:1.3}
.flow-node-sub{font-size:10px;color:var(--sub);font-weight:600;text-align:center}
.flow-arrow{font-family:var(--fm);font-size:20px;color:var(--border2);flex-shrink:0;display:flex;align-items:center}

/* STEPS */
.steps-row{display:flex;gap:18px;align-items:stretch}
.step-card{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(15,17,40,.03);transition:transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s, border-color .25s;position:relative;overflow:hidden}
.step-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px -16px rgba(15,17,40,.12);border-color:var(--border2)}
.step-num{font-family:var(--fm);font-size:38px;font-weight:800;margin-bottom:14px;background:linear-gradient(135deg,var(--cta),var(--accent));letter-spacing:-.02em;line-height:1}
.step-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.005em;line-height:1.4}
.step-desc{font-size:14px;line-height:1.8;color:var(--sub)}
.step-arrow{display:flex;align-items:center;font-family:var(--fm);font-size:20px;color:var(--border2);padding:0 4px;font-weight:300}

/* CASES */
.case-carousel{position:relative;overflow:hidden;width:100%}
.case-track{display:flex;gap:0;transition:transform .5s cubic-bezier(.16,1,.3,1);padding:4px 0}
.case-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px;transition:transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);min-width:100%;max-width:100%;width:100%;flex-shrink:0;box-sizing:border-box;word-break:break-word;overflow:hidden;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:32px;align-items:center}
.case-card:hover{box-shadow:0 24px 56px -20px rgba(18,163,125,.2);border-color:var(--cta);transform:translateY(-3px)}
.case-card-link{cursor:pointer}
.case-img{position:relative;width:100%;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#eef1fb,#e3e8f5)}
.case-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.case-card:hover .case-img img{transform:scale(1.04)}
.case-content{display:flex;flex-direction:column;min-width:0}
.case-arrows{display:flex;justify-content:center;gap:14px;margin-top:32px}
.case-arrow{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--border2);background:var(--bg);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--heading);transition:all .25s;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.case-arrow:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light);box-shadow:0 6px 20px var(--cta-glow);transform:translateY(-1px)}
.case-arrow:disabled{opacity:.3;cursor:default;pointer-events:none}
.case-dots{display:flex;justify-content:center;gap:8px;margin-top:16px}
.case-dot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all .25s;cursor:pointer}
.case-dot.active{background:var(--cta);width:28px;border-radius:4px;box-shadow:0 0 8px var(--cta-glow)}
.case-logo{font-family:var(--fb);font-size:22px;font-weight:900;color:var(--heading);margin-bottom:4px;letter-spacing:-.015em}
.case-industry{font-size:12px;color:var(--accent);margin-bottom:18px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-family:var(--fm)}
.case-quote{font-size:15.5px;line-height:1.9;color:var(--text);margin-bottom:24px;padding:20px 24px;background:linear-gradient(135deg,var(--surface),var(--surface2));border-radius:12px;border-left:3px solid var(--cta);width:100%;box-sizing:border-box;overflow-wrap:break-word;font-weight:500}
.case-stats{display:flex;gap:40px;flex-wrap:wrap;padding-top:18px;border-top:1px solid var(--border)}
.case-stat-v{font-family:var(--fm);font-size:26px;font-weight:800;letter-spacing:-.015em;line-height:1}
.case-stat-l{font-size:12px;color:var(--sub);margin-top:4px;font-weight:600}

/* INTEGRATIONS */
.int-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;max-width:920px;margin:0 auto}
.int-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:22px 16px;text-align:center;transition:transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s, border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03)}
.int-card:hover{border-color:transparent;transform:translateY(-3px);box-shadow:0 12px 32px -12px rgba(15,17,40,.12)}
.int-icon{width:44px;height:44px;margin:0 auto 12px;object-fit:contain}
.int-name{font-size:13.5px;font-weight:800;color:var(--heading);letter-spacing:-.005em}
.int-desc{font-size:11px;color:var(--sub);margin-top:4px;font-weight:500}

/* FAQ */
.faq-list{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:border-color .25s, box-shadow .25s, transform .2s}
.faq-item:hover{border-color:var(--border2);box-shadow:0 6px 20px -10px rgba(15,17,40,.12)}
.faq-item.open{border-color:var(--cta);box-shadow:0 10px 32px -16px var(--cta-glow)}
.faq-q{padding:22px 26px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:17px;font-weight:700;color:var(--heading);transition:color .2s;gap:16px;line-height:1.5;letter-spacing:-.005em;min-height:64px;-webkit-tap-highlight-color:transparent}
.faq-q:hover{color:var(--cta)}
.faq-toggle{width:32px;height:32px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:300;color:var(--sub);transition:transform .3s cubic-bezier(.16,1,.3,1), background .25s, color .2s;flex-shrink:0}
.faq-item.open .faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.faq-a{padding:0 26px 22px;font-size:15px;line-height:1.85;color:var(--sub)}

/* CLIENTS */
.client-logos{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;align-items:center}
.client-logo{padding:20px 32px;background:var(--bg);border:1px solid var(--border);border-radius:14px;transition:transform .25s, box-shadow .25s, border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.03);display:flex;align-items:center;justify-content:center;min-width:160px;height:80px}
.client-logo:hover{border-color:transparent;box-shadow:0 10px 28px rgba(15,17,40,.08);transform:translateY(-2px)}
.client-logo img{height:40px;width:auto;max-width:140px;object-fit:contain}

/* CTA */
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* DIAGRAM VISUALS inside feat-card-vis */
.diagram{width:100%;height:100%;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:20px}

/* RESPONSIVE */
/* HERO DEMO */
.demo-wrap{max-width:720px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 12px 48px rgba(18,163,125,.12),0 2px 8px rgba(0,0,0,.04);background:var(--bg)}
.demo-steps-bar{display:flex;align-items:center;gap:0;padding:12px 20px;background:var(--surface);border-bottom:1px solid var(--border);position:relative;overflow:hidden}
.demo-step-dot{display:flex;align-items:center;gap:6px;flex:1;font-size:12px;font-weight:700;color:var(--sub);transition:all .4s;z-index:1;justify-content:center}
.demo-step-dot.active{color:var(--cta)}
.demo-step-dot.done{color:var(--cta);opacity:.5}
.demo-step-icon{font-size:16px}
.demo-step-label{display:inline}
.demo-progress{position:absolute;left:0;top:0;height:100%;background:linear-gradient(90deg,var(--cta-light),rgba(18,163,125,.08));transition:width .6s cubic-bezier(.16,1,.3,1);z-index:0}
.demo-screen{min-height:340px;padding:24px;position:relative;display:flex;align-items:flex-start;gap:16px}
.demo-avatar{flex-shrink:0}
.demo-avatar-inner{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--cta),#0fc19a);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:18px;font-family:var(--fd);box-shadow:0 4px 12px var(--cta-glow)}
.demo-avatar-status{width:10px;height:10px;border-radius:50%;background:#22c55e;border:2px solid var(--bg);position:relative;top:-12px;left:32px;animation:pulse 2s infinite}
.demo-scene{flex:1;min-width:0}
.demo-scene-title{font-size:13px;font-weight:800;color:var(--heading);margin-bottom:16px;font-family:var(--fm);letter-spacing:1px;text-transform:uppercase}

/* Demo chat */
.demo-chat{display:flex;flex-direction:column;gap:10px}
.demo-msg{display:flex;align-items:flex-start;gap:8px}
.demo-msg-user{flex-direction:row-reverse}
.demo-msg-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--cta),#0fc19a);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:11px;flex-shrink:0}
.demo-msg-bubble{padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.6;max-width:320px;font-weight:500}
.demo-msg-bot .demo-msg-bubble{background:var(--surface);color:var(--text);border-bottom-left-radius:4px}
.demo-msg-user .demo-msg-bubble{background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;border-bottom-right-radius:4px}
.demo-msg-appear{animation:chatPop .4s cubic-bezier(.16,1,.3,1) forwards}

/* Demo email */
.demo-email{background:var(--surface);border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.demo-email-header{padding:14px 16px;border-bottom:1px solid var(--border)}
.demo-email-from{font-size:13px;font-weight:700;color:var(--heading);display:flex;align-items:center;gap:8px;margin-bottom:6px}
.demo-email-subject{font-size:12px;color:var(--sub);font-weight:600}
.demo-email-body{padding:16px}
.demo-email-body p{font-size:13px;line-height:1.7;color:var(--text);margin-bottom:8px}
.demo-email-cta{display:inline-block;padding:10px 20px;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;border-radius:8px;font-size:13px;font-weight:700;margin-top:8px;box-shadow:0 4px 12px var(--cta-glow)}

/* Demo docs */
.demo-docs{display:flex;flex-direction:column;gap:10px}
.demo-doc-card{display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;transition:all .3s}
.demo-doc-card:hover{border-color:var(--cta);box-shadow:0 4px 16px var(--cta-glow)}
.demo-doc-icon{font-size:24px}
.demo-doc-info{flex:1}
.demo-doc-name{font-size:13px;font-weight:700;color:var(--heading)}
.demo-doc-match{font-size:11px;color:var(--sub);margin-top:2px}

/* Demo calendar */
.demo-cal{background:var(--surface);border-radius:12px;padding:16px;border:1px solid var(--border)}
.demo-cal-header{font-size:14px;font-weight:800;color:var(--heading);text-align:center;margin-bottom:12px}
.demo-cal-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:12px}
.demo-cal-day-label{font-size:11px;font-weight:700;color:var(--sub);text-align:center;padding:4px}
.demo-cal-day{font-size:12px;text-align:center;padding:8px 4px;border-radius:8px;color:var(--sub);background:var(--bg);border:1px solid var(--border);font-weight:600;transition:all .3s}
.demo-cal-day.available{color:var(--cta);border-color:var(--cta);background:var(--cta-light);font-weight:700}
.demo-cal-day.selected{background:var(--cta);color:#fff;border-color:var(--cta);transform:scale(1.1);box-shadow:0 4px 12px var(--cta-glow)}
.demo-cal-confirmed{display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--cta-light);border-radius:8px;font-size:13px;font-weight:700;color:var(--cta)}

/* Demo CRM */
.demo-crm{display:flex;flex-direction:column;gap:12px}
.demo-crm-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.demo-crm-label{padding:10px 16px;background:linear-gradient(135deg,#1a73e8,#4285f4);color:#fff;font-size:12px;font-weight:800;letter-spacing:1px}
.demo-crm-fields{padding:12px 16px}
.demo-crm-field{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px}
.demo-crm-field:last-child{border-bottom:none}
.demo-crm-field span{color:var(--sub)}
.demo-crm-field strong{color:var(--heading)}
.demo-slack-notif{display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;border-left:4px solid #e01e5a}
.demo-slack-icon{font-size:20px}

/* PROOF STATS */
.proof-stat-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px 24px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.04);transition:all .3s}
.proof-stat-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(18,163,125,.1);border-color:transparent}

/* LOGO CAROUSEL */
.logo-carousel{overflow:hidden;position:relative;width:100%;mask-image:linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)}
.logo-track{display:flex;gap:32px;animation:logoScroll 25s linear infinite;width:max-content}
.logo-track:hover{animation-play-state:paused}
@keyframes logoScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.logo-item{padding:16px 28px;background:var(--bg);border:1px solid var(--border);border-radius:12px;display:flex;align-items:center;justify-content:center;min-width:150px;height:72px;flex-shrink:0;transition:transform .25s, box-shadow .25s, border-color .25s;box-shadow:0 1px 2px rgba(15,17,40,.02)}
.logo-item:hover{border-color:var(--border2);box-shadow:0 6px 18px rgba(15,17,40,.07);transform:translateY(-2px)}
.logo-item img{width:120px;height:36px;object-fit:contain;filter:grayscale(.2);transition:filter .25s}
.logo-item:hover img{filter:grayscale(0)}

/* WHY AI SDR */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px;transition:all .35s;position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-size:28px}
.why-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px}
.why-desc{font-size:15px;line-height:1.75;color:var(--sub)}

@media(max-width:1024px){
  .cat-grid{grid-template-columns:1fr;max-width:560px;margin-left:auto;margin-right:auto}
  .phase-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto;gap:18px}
  .qflow-hz{flex-direction:column;gap:0}
  .qflow-hz-arrow{width:auto;height:36px;transform:rotate(90deg)}
  .qflow-hz-gate{padding:8px 0}
  .qflow-hz-gate>div{writing-mode:horizontal-tb!important;flex-direction:row!important;padding:10px 20px!important}
  .why-grid{grid-template-columns:1fr}
  .proof-stats-grid{grid-template-columns:repeat(2,1fr)!important}
  .hero-stats-grid{grid-template-columns:repeat(3,1fr)!important;gap:8px!important}
  .int-grid{grid-template-columns:repeat(3,1fr)}
  .steps-row{flex-direction:column}
  .step-arrow{display:none}
  .flow-row{justify-content:flex-start}
}
@media(max-width:768px){
  .section{padding:56px 20px}
  .hero{padding:90px 20px 56px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:24px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:320px;margin:0 auto}
  .hero-ctas .btn-cta-lg,.hero-ctas .btn-ghost{width:100%}
  .hero-stats{flex-direction:column;gap:20px;align-items:center}
  .stitle{font-size:clamp(24px,7vw,32px);letter-spacing:-.015em}
  .ssub{font-size:15px;line-height:1.8}
  .cat-card{padding:24px 20px;border-radius:16px}
  .cat-title{font-size:19px}
  .cat-desc{font-size:13.5px;line-height:1.75}
  .slabel{font-size:11px;letter-spacing:2.5px;margin-bottom:12px}
  .int-grid{grid-template-columns:repeat(3,1fr);gap:10px}
  .int-card{padding:14px 10px}
  .int-icon{width:36px;height:36px;margin-bottom:8px}
  .int-name{font-size:12px}
  .int-desc{font-size:10px;margin-top:2px}
  .demo-screen{min-height:280px;padding:16px;gap:10px}
  .demo-avatar-inner{width:32px;height:32px;font-size:14px}
  .demo-avatar-status{top:-10px;left:22px}
  .demo-step-label{display:none}
  .demo-steps-bar{padding:10px 12px}
  .demo-msg-bubble{max-width:220px;font-size:12px;padding:8px 12px}
  .demo-email-body{padding:12px}
  .demo-cal-grid{gap:4px}
  .demo-cal-day{padding:6px 2px;font-size:11px}
  .final-cta{padding:60px 20px 80px}
  .case-carousel{overflow:hidden;width:100%}
  .case-track{gap:0}
  .case-stats{gap:12px;flex-direction:column;align-items:center;width:100%}
  .case-stats>div{text-align:center;width:100%}
  .case-quote{padding:14px 16px;font-size:13px;line-height:1.7;box-sizing:border-box}
  .case-card{padding:20px 16px;min-width:100%;max-width:100%;width:100%;box-sizing:border-box;overflow:hidden;grid-template-columns:1fr;gap:16px;align-items:stretch}
  .case-img{aspect-ratio:16/9}
  .case-logo{font-size:16px}
  .case-industry{font-size:11px;margin-bottom:14px}
  .case-stat-v{font-size:20px}
  .case-stat-l{font-size:10px}
  .btn-cta-lg{padding:14px 24px;font-size:16px;width:100%}
  .btn-ghost{padding:14px 24px;font-size:16px;width:100%}
  .feat-card-body{padding:24px 20px 20px}
  .feat-card-vis{min-height:180px}
  .step-card{padding:24px}
  .faq-q{padding:16px 20px;font-size:16px}
  .faq-a{padding:0 20px 16px;font-size:14px}
  .client-logos{gap:12px}
  .client-logo{padding:14px 20px;min-width:140px;height:64px}
  .client-logo img{height:32px;max-width:110px}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .int-grid{grid-template-columns:repeat(3,1fr);gap:8px}
  .int-card{padding:12px 8px}
  .int-icon{width:32px;height:32px;margin-bottom:6px}
  .int-name{font-size:11px}
  .int-desc{font-size:9px}
  .feat-card-vis{min-height:160px}
  .case-card{padding:16px 14px}
  .case-quote{font-size:12px;padding:12px 14px}
  .case-stat-v{font-size:18px}
  .case-stat-l{font-size:9px}
}
`;

const features = [
  {
    num: "01",
    color: "#0891b2",
    bg: "#0891b210",
    gradient: "linear-gradient(135deg,#0891b2,#06b6d4)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u30c1\u30e3\u30c3\u30c8\u30dc\u30c3\u30c8",
    desc: "\u8a2a\u554f\u8005\u3092\u5f85\u305f\u306a\u3044\u3002AI\u304c\u5148\u306b\u58f0\u3092\u304b\u3051\u3001\u30cb\u30fc\u30ba\u3092\u5f15\u304d\u51fa\u3057\u3001\u8cc7\u6599\u3092\u5c4a\u3051\u3001\u305d\u306e\u307e\u307e\u5546\u8ac7\u4e88\u7d04\u307e\u3067\u5b8c\u7d50\u3002\u901a\u5e38\u306e\u30a6\u30a7\u30d6\u30b5\u30a4\u30c8\u306f\u3082\u3061\u308d\u3093\u3001Google\u5e83\u544a\u30fbLinkedIn\u5e83\u544a\u7d4c\u7531\u306eLP\u306b\u3082\u8a2d\u7f6e\u3067\u304d\u308b\u306e\u3067\u3001\u5e83\u544a\u8cbb\u3092\u304b\u3051\u305f\u6d41\u5165\u3092\u53d6\u308a\u3053\u307c\u3055\u305a\u5546\u8ac7\u3078\u7e4b\u3052\u307e\u3059\u3002",
  },
  {
    num: "02",
    color: "#12a37d",
    bg: "#12a37d10",
    gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u30e1\u30fc\u30eb",
    desc: "\u30a4\u30f3\u30d0\u30a6\u30f3\u30c9\u30ea\u30fc\u30c9\u306b\u5bfe\u3057\u3066AI\u304c\u81ea\u52d5\u3067\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0\u30fb\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7\u3057\u3001\u5546\u8ac7\u78ba\u5b9a\u307e\u3067\u8a98\u5c0e\u3002\u30a6\u30a7\u30d3\u30ca\u30fc\u30fb\u30bb\u30df\u30ca\u30fc\u306e\u53c2\u52a0\u8005\u30ea\u30b9\u30c8\u3082CRM\u9023\u643a\u3084Webhook\u7d4c\u7531\u3067\u81ea\u52d5\u53d6\u308a\u8fbc\u307f\u3001\u30a4\u30d9\u30f3\u30c8\u76f4\u5f8c\u306e\u71b1\u91cf\u304c\u9ad8\u3044\u30bf\u30a4\u30df\u30f3\u30b0\u3092\u9003\u3057\u307e\u305b\u3093\u3002",
  },
  {
    num: "03",
    color: "#3b6ff5",
    bg: "#3b6ff510",
    gradient: "linear-gradient(135deg,#3b6ff5,#6690fa)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u8cc7\u6599\u30da\u30fc\u30b8",
    desc: "AI\u30b3\u30f3\u30b7\u30a7\u30eb\u30b8\u30e5\u4ed8\u304d\u306e\u8cc7\u6599\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30da\u30fc\u30b8\u3092\u30b5\u30a4\u30c8\u306b\u7c21\u5358\u8ffd\u52a0\u3002AI\u304c\u300c\u3069\u306e\u8cc7\u6599\u304c\u5408\u3046\u304b\u300d\u3092\u63d0\u6848\u3057\u306a\u304c\u3089\u3001\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u304b\u3089\u5546\u8ac7\u4e88\u7d04\u307e\u3067\u4e00\u6c17\u306b\u8a98\u5c0e\u3057\u307e\u3059\u3002",
  },
  {
    num: "04",
    color: "#7c5cfc",
    bg: "#7c5cfc10",
    gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",
    desc: "\u554f\u3044\u5408\u308f\u305b\u3084\u8cc7\u6599\u8acb\u6c42\u306e\u76f4\u5f8c\u2014\u2014\u6700\u3082\u71b1\u91cf\u304c\u9ad8\u3044\u77ac\u9593\u306b\u3001\u30ab\u30ec\u30f3\u30c0\u30fc\u3092\u63d0\u793a\u3002AI\u30c1\u30e3\u30c3\u30c8\u304c\u6a2a\u3067\u7591\u554f\u306b\u7b54\u3048\u308b\u306e\u3067\u3001\u300c\u3061\u3087\u3063\u3068\u8074\u304d\u305f\u3044\u3053\u3068\u304c\u3042\u308b\u3051\u3069\u2026\u300d\u3067\u96e2\u8131\u3055\u305b\u307e\u305b\u3093\u3002",
  },
  {
    num: "05",
    color: "#d03ea1",
    bg: "#d03ea110",
    gradient: "linear-gradient(135deg,#d03ea1,#e879b9)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u8cc7\u6599\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",
    desc: "\u300c\u4eca\u898b\u3066\u3044\u308b\u30da\u30fc\u30b8\u300d\u306b\u5408\u3063\u305f\u8cc7\u6599\u3092\u3001AI\u304c\u81ea\u52d5\u3067\u9078\u3073\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u63d0\u6848\u3002\u8cc7\u6599DL\u3092\u5165\u308a\u53e3\u306b\u3001\u81ea\u7136\u306a\u6d41\u308c\u3067\u5546\u8ac7\u7372\u5f97\u3078\u7e4b\u3052\u307e\u3059\u3002",
  },
  {
    num: "06",
    color: "#e0475b",
    bg: "#e0475b10",
    gradient: "linear-gradient(135deg,#e0475b,#f87171)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af",
    desc: "\u30a2\u30dd\u96fb\u5f8c\u306e\u8cc7\u6599\u9001\u4ed8\u3084\u65e5\u7a0b\u8abf\u6574\u30e1\u30fc\u30eb\u306b\u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af\u3092\u633f\u5165\u3002\u300c\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u306f\uff1f\u300d\u306e\u3084\u308a\u3068\u308a\u304c\u6d88\u3048\u3001\u30ef\u30f3\u30af\u30ea\u30c3\u30af\u3067\u5546\u8ac7\u78ba\u5b9a\u3002AI\u30c1\u30e3\u30c3\u30c8\u304c\u4e88\u7d04\u524d\u306e\u4e0d\u5b89\u3082\u89e3\u6d88\u3057\u307e\u3059\u3002",
  },
  {
    num: "07",
    color: "#c026d3",
    bg: "#c026d310",
    gradient: "linear-gradient(135deg,#c026d3,#d946ef)",
    title: "\u30df\u30fc\u30c8\u30f3\u306e\u30ab\u30ec\u30f3\u30c0\u30fcQR",
    desc: "\u8cc7\u6599\u3092\u8aad\u3093\u3067\u3044\u308b\u4eba\u306f\u3001\u6700\u3082\u71b1\u91cf\u304c\u9ad8\u3044\u898b\u8fbc\u5ba2\u3002PDF\u5185\u306eURL\u3084QR\u30b3\u30fc\u30c9\u304b\u3089\u3001\u8aad\u3093\u3067\u3044\u308b\u305d\u306e\u77ac\u9593\u306b\u5546\u8ac7\u4e88\u7d04\u3078\u8a98\u5c0e\u3057\u307e\u3059\u3002",
  },
];

const qualityIcons = {
  filter: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        opacity=".15"
        fill="currentColor"
        stroke="none"
      />
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  hearing: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        opacity=".15"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M12 18.5a6.5 6.5 0 0 0 6.5-6.5V8a6.5 6.5 0 0 0-13 0v4a6.5 6.5 0 0 0 6.5 6.5Z"
        fill="none"
      />
      <path d="M12 18.5V22M8 22h8" />
    </svg>
  ),
  sync: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        opacity=".15"
        fill="currentColor"
        stroke="none"
      />
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
};

const qualityData = [
  {
    iconKey: "filter" as const,
    color: "#12a37d",
    bg: "linear-gradient(135deg,#e5f8f2,#eaf0fe)",
    border: "#b8e6d8",
    title: "\u30df\u30fc\u30c8\u30f3\u304c\u4e8b\u524d\u306b\u898b\u6975\u3081\u308b",
    desc: "\u30c1\u30e3\u30c3\u30c8\u306e\u56de\u7b54\u3084\u30d5\u30a9\u30fc\u30e0\u5165\u529b\u3092\u3082\u3068\u306b\u3001\u30df\u30fc\u30c8\u30f3\u304c\u30ab\u30ec\u30f3\u30c0\u30fc\u306e\u8868\u793a/\u975e\u8868\u793a\u30fb\u62c5\u5f53\u8005\u632f\u308a\u5206\u3051\u3092\u81ea\u52d5\u5206\u5c90\u3002\u300c\u4f1a\u3046\u4fa1\u5024\u306e\u3042\u308b\u5546\u8ac7\u300d\u3060\u3051\u304c\u5c4a\u304d\u307e\u3059\u3002",
  },
  {
    iconKey: "hearing" as const,
    color: "#7c5cfc",
    bg: "linear-gradient(135deg,#f0ecfe,#eaf0fe)",
    border: "#c9bef5",
    title: "\u30df\u30fc\u30c8\u30f3\u304c\u6df1\u6398\u308a\u30d2\u30a2\u30ea\u30f3\u30b0",
    desc: "\u4e88\u7d04\u6e08\u307f\u306e\u9867\u5ba2\u306b\u30df\u30fc\u30c8\u30f3\u304c\u8ffd\u52a0\u30d2\u30a2\u30ea\u30f3\u30b0\u3002\u55b6\u696d\u306f\u300c\u4f55\u306b\u56f0\u3063\u3066\u3044\u308b\u304b\u300d\u3092\u628a\u63e1\u3057\u305f\u72b6\u614b\u3067\u5546\u8ac7\u306b\u81e8\u3081\u308b\u306e\u3067\u3001\u521d\u56de\u304b\u3089\u63d0\u6848\u306e\u7cbe\u5ea6\u304c\u9055\u3044\u307e\u3059\u3002",
  },
  {
    iconKey: "sync" as const,
    color: "#3b6ff5",
    bg: "linear-gradient(135deg,#eaf0fe,#e5f8f2)",
    border: "#bcc8f5",
    title: "CRM\u81ea\u52d5\u767b\u9332 + \u5373\u65e5\u901a\u77e5",
    desc: "\u30ea\u30fc\u30c9\u60c5\u5831\u30fb\u5546\u8ac7\u60c5\u5831\u306fCRM\u3078\u81ea\u52d5\u767b\u9332\u3002AI\u304c\u30d2\u30a2\u30ea\u30f3\u30b0\u3057\u305f\u5185\u5bb9\u306f\u305d\u306e\u307e\u307e\u55b6\u696d\u30c1\u30fc\u30e0\u306b\u5373\u65e5\u5171\u6709\u3002\u624b\u5165\u529b\u30bc\u30ed\u3067\u60c5\u5831\u304c\u5c4a\u304d\u307e\u3059\u3002",
  },
];

const stepsData = [
  {
    num: "01",
    title: "\u30bf\u30b0\u3092\u8a2d\u7f6e",
    desc: "Web\u30b5\u30a4\u30c8\u306bJavaScript\u30bf\u30b0\u3092\u6570\u884c\u8ffd\u52a0\u3059\u308b\u3060\u3051\u3002WordPress\u30d7\u30e9\u30b0\u30a4\u30f3\u3082\u7528\u610f\u3002\u6240\u8981\u6642\u9593: \u7d045\u5206\u3002",
  },
  {
    num: "02",
    title: "\u30df\u30fc\u30c8\u30f3\u3092\u8a2d\u5b9a",
    desc: "\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u304b\u3089\u30df\u30fc\u30c8\u30f3\u306e\u58f0\u304b\u3051\u5185\u5bb9\u3001\u5546\u8ac7\u4e88\u7d04\u306e\u30eb\u30fc\u30eb\u3001\u63d0\u6848\u306b\u4f7f\u3046\u8cc7\u6599\u7b49\u3092\u8a2d\u5b9a\u3002",
  },
  {
    num: "03",
    title: "\u30df\u30fc\u30c8\u30f3\u304c\u50cd\u304d\u59cb\u3081\u308b",
    desc: "\u8a2d\u5b9a\u5b8c\u4e86\u3057\u305f\u77ac\u9593\u304b\u3089\u30df\u30fc\u30c8\u30f3\u304c\u7a3c\u50cd\u3002\u5546\u8ac7\u7372\u5f97\u304c\u81ea\u52d5\u3067\u56de\u308a\u59cb\u3081\u307e\u3059\u3002",
  },
];

const integrations = [
  {
    logo: "/integrations/01_Salesforce.png",
    name: "Salesforce",
    desc: "CRM\u9023\u643a",
  },
  {
    logo: "/integrations/02_HubSpot.png",
    name: "HubSpot",
    desc: "CRM\u9023\u643a",
  },
  {
    logo: "/integrations/03_Slack.png",
    name: "Slack",
    desc: "\u901a\u77e5\u30fb\u30a2\u30e9\u30fc\u30c8",
  },
  {
    logo: "/integrations/04_Microsoft_Teams.png",
    name: "Microsoft Teams",
    desc: "\u901a\u77e5\u30fb\u30a2\u30e9\u30fc\u30c8",
  },
  {
    logo: "/integrations/05_Google_Calendar.png",
    name: "Google Calendar",
    desc: "\u5546\u8ac7\u4e88\u7d04",
  },
  {
    logo: "/integrations/06_Google_Chat.png",
    name: "Google Chat",
    desc: "\u901a\u77e5\u30fb\u30a2\u30e9\u30fc\u30c8",
  },
  {
    logo: "/integrations/07_Zoom.png",
    name: "Zoom",
    desc: "Web\u4f1a\u8b70\u9023\u643a",
  },
  {
    logo: "/integrations/TimeRex.jpeg",
    name: "TimeRex",
    desc: "\u65e5\u7a0b\u8abf\u6574",
  },
  {
    logo: "/integrations/08_Marketo.png",
    name: "Marketo",
    desc: "MA\u9023\u643a",
  },
  {
    logo: "/integrations/10_Oracle_Eloqua.png",
    name: "Oracle Eloqua",
    desc: "MA\u9023\u643a",
  },
];

const faqData = [
  {
    q: "日程調整ツールとは何が違いますか？",
    a: "日程調整ツールは、予約の導線を最適化するものです。Meeton ai はその前段で、訪問者と会話し、課題を整理し、必要な資料を届けたうえで、商談予約や追客まで行う AI SDR です。CV 後だけでなく、CV 前から商談機会を創出する点が大きな違いです。詳細は『日程調整ツール vs AI SDR』比較ページで解説しています。",
  },
  {
    q: "AI チャットボットとは何が違いますか？",
    a: "チャットボットは FAQ 応答が中心です。Meeton ai は AI SDR として、訪問者と会話し、課題を整理し、資料を提案し、商談予約や追客まで実行します。匿名訪問者全員に話しかけるのではなく、識別済みリードを商談に押し上げることに特化しています。",
  },
  {
    q: "マーケティング部門でも使えますか？",
    a: "Meeton ai は営業組織向けのツールです。マーケ部門が集めたリードの商談化に使うのが用途で、マーケキャンペーン管理や新規リード獲得が主目的の場合は適していません。マーケ向けの機能をお探しなら、Marketo / HubSpot 等の MA ツールをご検討ください。",
  },
  {
    q: "Marketo / HubSpot Workflows との違いは？",
    a: "MA メールは「リストへの一斉配信」「事前定義したシナリオ」が基本です。Meeton Email は「個別リードのリアルタイム行動シグナルに対する 1:1 の動的フォロー」で、AI が文面・タイミング・トーンを都度判断します。MA を置き換えるのではなく、その上で動く補完プロダクトです。",
  },
  {
    q: "Drift / Intercom などのチャットボットとの違いは？",
    a: "Meeton ai はチャットボット製品ではなく AI SDR プラットフォームです。匿名訪問者全員に話しかけるのではなく、識別済みリードを商談に押し上げることに特化しています。Meeton Live は再訪した識別済みリードのみに起動し、過去の全文脈を引き継いで対話を開始します。",
  },
  {
    q: "Meeton aiの導入にどのくらい時間がかかりますか？",
    a: "JavaScriptタグの設置は5分です。Meeton aiの設定を含めても、最短で当日中に稼働開始できます。",
  },
  {
    q: "既存のCRM（Salesforce / HubSpot）と連携できますか？",
    a: "はい。Salesforce、HubSpotとのネイティブ連携に対応しています。Meeton aiが獲得した商談情報は自動でCRMに登録されます。Webhook経由で他のCRMにも接続可能です。",
  },
  {
    q: "Meeton aiは何語に対応していますか？",
    a: "日本語・英語・中国語・韓国語をはじめ、主要言語に対応しています。リードの言語を自動検知し、適切な言語で会話します。",
  },
  {
    q: "無料トライアルはありますか？",
    a: "14日間の無料トライアルをご用意しています。クレジットカード不要で、Meeton aiの全機能をお試しいただけます。",
  },
];

const clients = [
  { name: "G-gen", logo: "/clients/ggen.png" },
  { name: "EdulinX", logo: "/clients/edulinx.png" },
  { name: "Univis", logo: "/clients/univis.png" },
  { name: "\u9280\u5ea7\u685c\u5c4b", logo: "/clients/ginza-sakuraya.png" },
  { name: "BizteX", logo: "/clients/biztex.png" },
  { name: "Domo", logo: "/clients/domo.svg" },
  {
    name: "\u30a4\u30f3\u30d7\u30ec\u30c3\u30af\u30b9\u30a2\u30f3\u30c9\u30ab\u30f3\u30d1\u30cb\u30fc",
    logo: "/clients/imprexc.png",
  },
];



type CaseCarouselItem = {
  slug: string;
  name: string;
  industry: string;
  quote: string;
  quotePerson?: string | null;
  heroMetric?: string;
  heroMetricLabel?: string;
  heroImage?: string | null;
  stats: { value: string; label: string; context?: string }[];
};

const STAT_COLORS = ["var(--cta)", "var(--blue)", "var(--accent)"];

function CaseCarousel({ items }: { items: CaseCarouselItem[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  // Bumped on every manual interaction to restart the auto-rotate timer
  const [touch, setTouch] = useState(0);
  const len = items.length;
  // Wrap-around so auto-rotate can loop indefinitely
  const goto = (i: number) => {
    setTouch((t) => t + 1);
    setIdx(((i % len) + len) % len);
  };
  const prev = () => goto(idx - 1);
  const next = () => goto(idx + 1);

  useEffect(() => {
    if (paused || len <= 1) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % len);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, touch, len]);

  if (len === 0) return null;
  return (
    <div
      className="case-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="case-track"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {items.map((c, i) => (
          <a
            key={i}
            href={`/case-studies/${c.slug}/`}
            className="case-card case-card-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {c.heroImage ? (
              <div className="case-img">
                <img src={c.heroImage} alt={c.name} loading="lazy" />
              </div>
            ) : (
              <div className="case-img" style={{ background: "linear-gradient(135deg, #f4f6fb, #eaedfa)" }} />
            )}
            <div className="case-content">
            <div className="case-logo">{c.name}</div>
            <div className="case-industry">{c.industry}</div>
            <div className="case-quote">{c.quote}</div>
            {c.quotePerson && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--sub)",
                  marginTop: -8,
                  marginBottom: 12,
                }}
              >
                — {c.quotePerson}
              </div>
            )}
            <div className="case-stats">
              {c.stats.slice(0, 3).map((s, j) => (
                <div key={j}>
                  <div
                    className="case-stat-v"
                    style={{ color: STAT_COLORS[j % STAT_COLORS.length] }}
                  >
                    {s.value}
                  </div>
                  <div className="case-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--cta)",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              事例の詳細を読む <span>→</span>
            </div>
            </div>
          </a>
        ))}
      </div>
      <div className="case-arrows">
        <button className="case-arrow" onClick={prev}>
          ←
        </button>
        <span
          style={{
            fontFamily: "var(--fm)",
            fontSize: 12,
            color: "var(--sub)",
            alignSelf: "center",
            fontWeight: 600,
          }}
        >
          {idx + 1} / {items.length}
        </span>
        <button className="case-arrow" onClick={next}>
          →
        </button>
      </div>
      <div className="case-dots">
        {items.map((_, i) => (
          <div
            key={i}
            className={"case-dot" + (i === idx ? " active" : "")}
            onClick={() => goto(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Inline SVG Icons ── */
const Icon = ({ d, size = 16, color = "currentColor" }: { d: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const ICONS = {
  search: "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z M16.65 16.65L21 21",
  target: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  calendar: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  check: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8",
  brain: "M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z M9 22h6",
  robot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2z M9 12h.01 M15 12h.01 M10 16h4",
  info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 16v-4 M12 8h.01",
};
type IconKey = keyof typeof ICONS;
const Ico = ({ name, size = 16, color = "currentColor" }: { name: IconKey; size?: number; color?: string }) => <Icon d={ICONS[name]} size={size} color={color} />;

/* ── Hero Stats — Impact numbers ── */
// 2026-05-19: 外部レビュー Phase 2 指摘で「コスト削減」訴求を外し
// 「商談創出」実績ベースに統一。導入事例 3 社 (BizteX / EdulinX /
// Univis) と FV を直結させ、機能説明より先に「本物の成果が出ている」
// 信頼資産で押す。
const HERO_STATS = [
  { num: "20", suffix: "倍+", label: "チャット経由リード", desc: "BizteX: 月1〜2件 → 月20件以上", icon: "target" as IconKey, gradient: "linear-gradient(135deg, #12a37d, #34d399)", glow: "rgba(18,163,125,.25)" },
  { num: "60", suffix: "%+", label: "AI 経由商談化率", desc: "EdulinX: Meeton ai 経由の実績", icon: "bolt" as IconKey, gradient: "linear-gradient(135deg, #3b6ff5, #60a5fa)", glow: "rgba(59,111,245,.25)" },
  { num: "2", suffix: "件 受注", label: "導入3 ヶ月の創出", desc: "Univis: 提案件数も増加", icon: "calendar" as IconKey, gradient: "linear-gradient(135deg, #7c5cfc, #a78bfa)", glow: "rgba(124,92,252,.25)" },
];

// 2026-05-19: SSR + 初期paint で `val = 0` を返していたため、Google/AI
// 検索や no-JS 環境で「0倍以上」「0%削減」「0h+」と読まれていた (外部
// 監査指摘)。target を初期値にし、IntersectionObserver が start=true に
// したタイミングで一度 0 にリセット → ease-out で target まで count up。
// Lighthouse / no-JS / 検索 bot は最終値を見る、アニメ恩恵は実ユーザー。
function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!start) return;
    setVal(0);
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * ease));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function HeroDemoAnimation() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 2026-05-19 fix: 旧 HERO_STATS の値 (2 / 66 / 20) のまま固定されており、
  // 新データ (20 / 60 / 2) と乖離して「20倍+ が 2倍 になる」「2件 が
  // 20件 になる」を起こしていた。HERO_STATS から自動的に取るよう変更
  // し、今後 stats を差し替えても drift しない。
  const v0 = useCountUp(parseInt(HERO_STATS[0].num, 10) || 0, 1200, visible);
  const v1 = useCountUp(parseInt(HERO_STATS[1].num, 10) || 0, 1800, visible);
  const v2 = useCountUp(parseInt(HERO_STATS[2].num, 10) || 0, 1600, visible);
  const vals = [v0, v1, v2];

  return (
    <div ref={ref} style={{
      display:"grid",
      gridTemplateColumns:"repeat(3, 1fr)",
      gap:"clamp(12px,2vw,24px)",
      width:"100%",
      maxWidth:800,
      margin:"0 auto",
    }} className="hero-stats-grid">
      {HERO_STATS.map((s, i) => (
        <div key={i} className="hero-stat-card" style={{
          background:"rgba(255,255,255,.9)",
          backdropFilter:"blur(16px)",
          borderRadius:16,
          padding:"clamp(14px,3vw,36px) clamp(10px,2.5vw,28px)",
          textAlign:"center",
          border:"1px solid rgba(0,0,0,.05)",
          boxShadow:`0 8px 32px rgba(0,0,0,.06), 0 1px 0 rgba(255,255,255,.8) inset`,
          transition:"transform .3s, box-shadow .3s",
        }}>
          <div className="hero-stat-num" style={{
            fontFamily:"var(--fm)",
            fontSize:"clamp(28px,7vw,72px)",
            fontWeight:800,
            background:s.gradient,
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            letterSpacing:-1,
            lineHeight:1,
          }}>
            {vals[i]}<span className="hero-stat-suffix" style={{fontSize:"clamp(11px,2.5vw,28px)",fontWeight:700,letterSpacing:0}}>{s.suffix}</span>
          </div>
          <div className="hero-stat-label" style={{
            fontSize:"clamp(11px,1.5vw,16px)",
            fontWeight:800,
            color:"var(--heading)",
            marginTop:6,
            lineHeight:1.3,
          }}>{s.label}</div>
          <div className="hero-stat-desc" style={{
            fontSize:"clamp(9px,1.2vw,13px)",
            color:"var(--sub)",
            marginTop:3,
            fontWeight:500,
            lineHeight:1.35,
          }}>{s.desc}</div>
        </div>
      ))}
      <style jsx>{`
        :global(.hero-stat-card){cursor:default}
        :global(.hero-stat-card:hover){transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.08), 0 1px 0 rgba(255,255,255,.9) inset !important}
        @media (max-width: 640px) {
          :global(.hero-stat-desc) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export type HomeCaseStudy = {
  slug: string;
  name: string;
  industry: string;
  quote: string;
  quotePerson: string | null;
  heroMetric: string;
  heroMetricLabel: string;
  heroImage: string | null;
  stats: { value: string; label: string; context?: string }[];
};

export type LPVariant =
  | "inside-sales"
  | "lead-gen"
  | "linkedin"
  | "meeting"
  | "trial"
  | "web-chat"
  | "google";

type HomePageClientProps = {
  caseStudies?: HomeCaseStudy[];
  mode?: "home" | "lp";
  lpVariant?: LPVariant;
  lpHeadline?: string;
  lpSubheadline?: string;
};

/* ──────────────────────────────────────────────────────────────────
 * Mobile sticky CTA bar — fixed at bottom on phones only, single
 * primary "デモを予約" action.
 * ────────────────────────────────────────────────────────────────── */
function MobileStickyCta({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div className="m-sticky-cta">
        <button onClick={onClick} className="m-sticky-cta-btn">
          デモを予約 →
        </button>
      </div>
      <style jsx>{`
        .m-sticky-cta {
          display: none;
        }
        @media (max-width: 768px) {
          .m-sticky-cta {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 14px calc(10px + env(safe-area-inset-bottom, 0px));
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-top: 1px solid var(--border);
            z-index: 90;
            box-shadow: 0 -4px 18px rgba(15, 17, 40, 0.08);
          }
          .m-sticky-cta-btn {
            width: 100%;
            padding: 14px 22px;
            background: linear-gradient(135deg, var(--cta), #0fc19a);
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
            font-family: var(--fb);
            box-shadow: 0 4px 16px var(--cta-glow);
          }
        }
      `}</style>
    </>
  );
}

export default function HomePageClient({
  caseStudies = [],
  mode = "home",
  lpVariant,
  lpHeadline,
  lpSubheadline,
}: HomePageClientProps) {
  const pathname = usePathname();
  const isJa = pathname.startsWith("/ja");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [scrolledLp, setScrolledLp] = useState(false);
  const isMobile = useIsMobile(768);
  const isLp = mode === "lp";
  const utmCampaign = isLp ? `lp_${lpVariant ?? "google"}` : "meeton-ai";

  // LP-mode: capture UTM, scroll milestone tracking, sticky CTA visibility
  useEffect(() => {
    if (!isLp) return;
    if (typeof window === "undefined") return;

    // UTM capture
    const params = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ]) {
      const val = params.get(key);
      if (val) utmData[key] = val;
    }
    if (Object.keys(utmData).length > 0) {
      try {
        sessionStorage.setItem("utm_data", JSON.stringify(utmData));
      } catch {
        /* ignore */
      }
    }

    const fired = {
      scroll25: false,
      scroll50: false,
      scroll75: false,
    };

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const y = window.scrollY;
      const totalScrollable = Math.max(docH - winH, 1);
      const pctTop = (y / totalScrollable) * 100;
      // sticky CTA after ~30% page-view scroll
      setScrolledLp(pctTop > 30 || y > 600);

      const scrollPct = ((y + winH) / docH) * 100;
      if (!fired.scroll25 && scrollPct >= 25) {
        fired.scroll25 = true;
        window.gtag?.("event", "lp_scroll_25", { lp_variant: lpVariant });
      }
      if (!fired.scroll50 && scrollPct >= 50) {
        fired.scroll50 = true;
        window.gtag?.("event", "lp_scroll_50", { lp_variant: lpVariant });
      }
      if (!fired.scroll75 && scrollPct >= 75) {
        fired.scroll75 = true;
        window.gtag?.("event", "lp_scroll_75", { lp_variant: lpVariant });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLp, lpVariant]);

  // 2026-05-14: 「資料請求」「デモを予約」を HubSpot iframe modal から
  // Meeton widget に切替。tracking event は維持。
  const openMeetingModal = (location: string) => {
    if (isLp && typeof window !== "undefined") {
      window.gtag?.("event", "lp_cta_demo_click", {
        lp_variant: lpVariant,
        location,
      });
      window.gtag?.("event", "conversion", {
        send_to: "AW-18060590496/5EyJCIqrspUcEKD7-qND",
      });
      window.gtag?.("event", "generate_lead", {
        lp_variant: lpVariant,
        cta_location: location,
        value: 0,
        currency: "JPY",
      });
      window.lintrk?.("track", { conversion_id: 25161212 });
    }
    openMeetonCalendar();
  };

  const openDocModal = (location: string) => {
    if (isLp && typeof window !== "undefined") {
      window.gtag?.("event", "lp_cta_doc_click", {
        lp_variant: lpVariant,
        location,
      });
    }
    openMeetonDownloadCenter();
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {isLp && <style dangerouslySetInnerHTML={{ __html: lpCss }} />}

      {isLp ? (
        <LpNav onCtaClick={() => openMeetingModal("nav")} isMobile={isMobile} />
      ) : (
        <Nav variant="light" />
      )}

      {/* HERO */}
      <section className="hero">


        <div className="hero-content">
          {/* Hero elements use anim-y (transform-only) instead of anim
              (opacity 0→1). Initial opacity:0 was preventing Lighthouse
              from registering the H1 as painted until ~1s after CSS load,
              which alone added ~1s to LCP. Visual slide-in is preserved. */}
          <div className="anim-y d1 hero-badge">
            <div className="hero-badge-dot" />
            {isLp && lpVariant === "trial"
              ? "14日間無料トライアル"
              : "AI SDR Platform"}
          </div>
          <h1 className="anim-y d2 hero-h1">
            {lpHeadline ?? (
              <>
                問い合わせを待つ Web サイトから、
                <em>商談を生み出す AI 営業チャネルへ。</em>
              </>
            )}
          </h1>
          <p className="anim-y d3 hero-sub">
            {lpSubheadline ??
              "マーケ・IS が獲得したリードを、AI SDR が初動対応から商談予約・追客までつなぎます。訪問・問い合わせ・資料 DL・再訪問の瞬間に、会話・ヒアリング・資料提案・日程調整までを自動化。"}
          </p>

          {/* Mini How It Works — Hero 内 element、横並び 7 step
              （モバイルでは縦積み） */}
          {!isLp && (
            <div className="anim-y d3 hero-mini-flow" aria-label="Meeton ai の流れ">
              <span className="hero-mini-step">訪問検知</span>
              <span className="hero-mini-arrow" aria-hidden>→</span>
              <span className="hero-mini-step">AI 会話</span>
              <span className="hero-mini-arrow" aria-hidden>→</span>
              <span className="hero-mini-step">ヒアリング</span>
              <span className="hero-mini-arrow" aria-hidden>→</span>
              <span className="hero-mini-step">資料提案</span>
              <span className="hero-mini-arrow" aria-hidden>→</span>
              <span className="hero-mini-step">日程調整</span>
              <span className="hero-mini-arrow" aria-hidden>→</span>
              <span className="hero-mini-step">追客</span>
              <span className="hero-mini-arrow" aria-hidden>→</span>
              <span className="hero-mini-step">CRM</span>
            </div>
          )}

          {/* CTA: Primary デモ予約 / Secondary 仕組みを見る (#how-it-works) /
              Tertiary text link 商談化余地診断 */}
          <div
            className="anim-y d4 hero-ctas"
            style={isLp ? { gap: 12 } : undefined}
          >
            <button
              className="btn btn-cta btn-cta-lg"
              onClick={() => openMeetingModal("hero")}
              style={isLp ? { padding: "20px 44px", fontSize: 19 } : undefined}
            >
              デモを予約
            </button>
            <a
              href="#how-it-works"
              className="btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
            >
              仕組みを見る
            </a>
          </div>
          {!isLp && (
            <div className="anim-y d4 hero-tertiary">
              <a href="#diagnose" className="hero-tertiary-link">
                自社サイトの商談化余地を診断する →
              </a>
            </div>
          )}
          {/* HERO DEMO ANIMATION — skipped in LP mode for LCP */}
          {!isLp && (
            <div
              className="anim d5"
              style={{ marginTop: "clamp(40px,6vw,64px)" }}
            >
              <HeroDemoAnimation />
            </div>
          )}
        </div>
      </section>

      {/* LP PROOF STRIP — 広告流入 LP 向け、Hero 直下に静的な実績証拠
          (アニメーション無し、コンパクト)。Home では Vision → Problem の
          流れがあるので不要、LP では Hero 直後に proof を出して離脱抑止。 */}
      {isLp && (
        <section className="lp-proof-strip" aria-label="導入実績">
          <div className="lp-proof-inner">
            <div className="lp-proof-stats">
              <div className="lp-proof-stat">
                <div className="lp-proof-num">20<span className="lp-proof-unit">倍+</span></div>
                <div className="lp-proof-label">チャット経由リード</div>
              </div>
              <div className="lp-proof-divider" aria-hidden />
              <div className="lp-proof-stat">
                <div className="lp-proof-num">60<span className="lp-proof-unit">%+</span></div>
                <div className="lp-proof-label">AI 経由 商談化率</div>
              </div>
              <div className="lp-proof-divider" aria-hidden />
              <div className="lp-proof-stat">
                <div className="lp-proof-num">2<span className="lp-proof-unit">件</span></div>
                <div className="lp-proof-label">3 ヶ月で受注（BizteX 等）</div>
              </div>
            </div>
            <div className="lp-proof-logos-label">先進企業に選ばれています</div>
            <div className="lp-proof-logos">
              {clients.slice(0, 7).map((c) => (
                <div className="lp-proof-logo" key={c.name}>
                  <img
                    src={c.logo}
                    alt={c.name}
                    width={108}
                    height={32}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
.lp-proof-strip{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:48px clamp(16px,5vw,48px)}
.lp-proof-inner{max-width:1080px;margin:0 auto}
.lp-proof-stats{display:flex;align-items:center;justify-content:center;gap:clamp(16px,4vw,48px);margin-bottom:32px;flex-wrap:wrap}
.lp-proof-stat{text-align:center;min-width:120px}
.lp-proof-num{font-family:var(--fm);font-size:clamp(34px,5vw,44px);font-weight:800;color:var(--heading);line-height:1;letter-spacing:-.02em}
.lp-proof-unit{font-size:.6em;font-weight:700;margin-left:2px;color:var(--cta)}
.lp-proof-label{font-size:13px;color:var(--sub);font-weight:600;margin-top:8px;letter-spacing:-.005em}
.lp-proof-divider{width:1px;height:36px;background:var(--border)}
@media (max-width:680px){.lp-proof-divider{display:none}}
.lp-proof-logos-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--sub);text-align:center;text-transform:uppercase;margin-bottom:18px}
.lp-proof-logos{display:flex;align-items:center;justify-content:center;gap:clamp(20px,4vw,40px);flex-wrap:wrap;opacity:.7}
.lp-proof-logo img{display:block;height:28px;width:auto;object-fit:contain;filter:grayscale(1);transition:filter .2s}
.lp-proof-logo:hover img{filter:none}
` }} />
        </section>
      )}

      {/* CATEGORY / VISION — 「Meeton ai は、Web サイトに配属する AI SDR」
          ダーク背景で先進感、3 カードでコンパクトに */}
      {!isLp && (
        <section
          className="vision-section"
          aria-label="Meeton ai は Web サイトに配属する AI SDR"
        >
          <div className="section-inner" style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div className="vision-heading">
              Meeton ai は、Web サイトに配属する <span className="vision-accent">AI SDR</span> です。
            </div>
            <p className="vision-sub">
              チャットボットでも、単なる日程調整ツールでもありません。
              訪問者を理解し、会話・提案・予約・追客まで、商談機会を生み出す
              ために必要なアクションを実行します。
            </p>
            <div className="vision-grid">
              <div className="vision-card">
                <div className="vision-card-label">01</div>
                <div className="vision-card-title">会話する</div>
                <p className="vision-card-desc">
                  訪問者の興味・行動を検知して、自然な会話で課題をヒアリング。
                </p>
              </div>
              <div className="vision-card">
                <div className="vision-card-label">02</div>
                <div className="vision-card-title">提案する</div>
                <p className="vision-card-desc">
                  事例・料金・比較表など、文脈に合った資料を AI が選んで提示。
                </p>
              </div>
              <div className="vision-card">
                <div className="vision-card-label">03</div>
                <div className="vision-card-title">商談化する</div>
                <p className="vision-card-desc">
                  温度感が高まったタイミングで日程調整。予約しなければ追客まで実行。
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2026-05-19: trust-bar 第二改訂。FV 内の HERO_STATS が同じ 3 社の
          数字 (BizteX 20倍+ / EdulinX 60%+ / Univis 3ヶ月で2件) に
          差替されたため、ここで数字カードを再掲すると密集 + 重複に
          なる。ロゴ band だけに減量し、FV (数字) → ここ (ロゴ) → 機能
          というシンプルな縦の流れに整理。 */}
      {!isLp && (
        <section
          className="trust-bar"
          aria-label="導入企業ロゴ"
          style={{
            background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
            borderBottom: "1px solid var(--border)",
            padding: "clamp(28px, 4vw, 44px) clamp(16px, 5vw, 48px)",
          }}
        >
          <div
            className="section-inner"
            style={{ maxWidth: 1140, margin: "0 auto" }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: "var(--sub)",
                marginBottom: 18,
                textTransform: "uppercase",
                fontFamily: "var(--fm)",
              }}
            >
              先進企業に選ばれています
            </div>

            <div
              className="logo-carousel"
              style={{ marginTop: 8 }}
            >
              <div className="logo-track">
                {[...clients, ...clients].map((c, i) => (
                  <div className="logo-item" key={`trust-${c.name}-${i}`}>
                    <img
                      src={c.logo}
                      alt={c.name}
                      width={120}
                      height={36}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THE PROBLEM — リードはあるのに、商談にならない */}
      {!isLp && (
        <section
          className="section"
          style={{ background: "var(--surface)", paddingTop: 80, paddingBottom: 80 }}
        >
          <div className="section-inner" style={{ maxWidth: 920 }}>
            <div className="slabel" style={{ textAlign: "center" }}>
              The Problem
            </div>
            <div className="stitle" style={{ textAlign: "center", marginBottom: 16 }}>
              リードは増えた。<span style={{ color: "var(--cta)" }}>でも、商談は増えていない。</span>
            </div>
            <p
              className="ssub"
              style={{ textAlign: "center", margin: "0 auto 40px", maxWidth: 720 }}
            >
              広告、SEO、ウェビナー、ホワイトペーパーでリードは集まる。
              それでも多くの見込み客は、初動対応の遅れ、フォロー不足、再訪問の見逃しによって、
              商談にならないまま離脱していきます。
            </p>

            {/* Funnel 図 + KPI Shift Table */}
            <div className="problem-funnel">
              <div className="problem-funnel-row">
                <span className="problem-funnel-step">流入</span>
                <span className="problem-funnel-arrow">→</span>
                <span className="problem-funnel-step">CV</span>
                <span className="problem-funnel-arrow">→</span>
                <span className="problem-funnel-step problem-funnel-gap">初動対応</span>
                <span className="problem-funnel-arrow">→</span>
                <span className="problem-funnel-step problem-funnel-gap">ヒアリング</span>
                <span className="problem-funnel-arrow">→</span>
                <span className="problem-funnel-step problem-funnel-gap">日程調整</span>
                <span className="problem-funnel-arrow">→</span>
                <span className="problem-funnel-step">商談</span>
              </div>
              <p className="problem-funnel-caption">
                ↑ ここが抜け落ちている
              </p>
            </div>

            <div className="kpi-shift-heading">
              Web サイトの KPI を、CV 数から <span style={{ color: "var(--cta)" }}>商談数</span> へ。
            </div>
            <div className="kpi-shift-table-wrap">
              <table className="kpi-shift-table">
                <thead>
                  <tr>
                    <th>従来の見方</th>
                    <th>Meeton ai で見るべき見方</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>問い合わせ数</td><td>Web 経由商談数</td></tr>
                  <tr><td>フォーム CVR</td><td>リード to 商談化率</td></tr>
                  <tr><td>資料 DL 数</td><td>資料 DL 後の商談化率</td></tr>
                  <tr><td>チャット数</td><td>有効会話からの商談化率</td></tr>
                  <tr><td>PV 数</td><td>高意向訪問者の商談化数</td></tr>
                </tbody>
              </table>
            </div>

            {/* Webinar CTA (補助、Problem 直後の自然な誘導) */}
            <Link href="/webinar/" className="problem-webinar-band" aria-label="無料ウェビナー">
              <span className="problem-webinar-tag">今月開催 / 無料</span>
              <span className="problem-webinar-body">
                <strong>「リードは来ているのに、商談にならない」を 30 分で分解する無料ウェビナー</strong>
                <span className="problem-webinar-meta">マーケ・IS 責任者向け · 第 3 木曜 14:00 · 録画あり</span>
              </span>
              <span className="problem-webinar-arrow" aria-hidden>→</span>
            </Link>

            <style dangerouslySetInnerHTML={{ __html: `
.problem-funnel{margin:0 auto 48px;padding:28px clamp(16px,3vw,28px);background:#fff;border:1px solid var(--border);border-radius:18px;max-width:880px;text-align:center}
.problem-funnel-row{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.problem-funnel-step{display:inline-block;padding:8px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:700;color:var(--heading);font-family:var(--fb)}
.problem-funnel-gap{background:#fee2e2;border-color:#fecaca;color:#b91c1c}
.problem-funnel-arrow{color:var(--sub);font-size:14px;font-weight:600}
.problem-funnel-caption{font-size:13px;color:#b91c1c;font-weight:700;font-family:var(--fb);margin:0}
.kpi-shift-heading{font-size:clamp(20px,3vw,26px);font-weight:800;color:var(--heading);text-align:center;margin-bottom:24px;letter-spacing:-.01em;line-height:1.4}
.kpi-shift-table-wrap{max-width:720px;margin:0 auto 48px;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 2px rgba(15,17,40,.03)}
.kpi-shift-table{width:100%;border-collapse:collapse}
.kpi-shift-table th{padding:16px 20px;font-size:13px;font-weight:800;text-align:left;background:var(--surface);color:var(--heading);font-family:var(--fb);letter-spacing:-.005em;border-bottom:1px solid var(--border)}
.kpi-shift-table td{padding:14px 20px;font-size:15px;color:var(--heading);border-bottom:1px solid var(--border);font-weight:600}
.kpi-shift-table tr:last-child td{border-bottom:none}
.kpi-shift-table td:first-child{color:var(--sub);font-weight:500}
.kpi-shift-table td:last-child{color:var(--cta);font-weight:800}
.problem-webinar-band{display:flex;align-items:center;gap:16px;max-width:720px;margin:0 auto;padding:16px 22px;background:#fff;border:1px solid var(--border);border-radius:14px;text-decoration:none;color:inherit;transition:background .2s,border-color .2s,transform .2s;flex-wrap:wrap}
.problem-webinar-band:hover{background:rgba(18,163,125,.04);border-color:rgba(18,163,125,.35);transform:translateY(-1px)}
.problem-webinar-tag{display:inline-flex;align-items:center;padding:5px 12px;font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.08em;background:var(--cta);color:#fff;border-radius:999px;flex-shrink:0}
.problem-webinar-body{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
.problem-webinar-body strong{font-size:14px;font-weight:800;color:var(--heading);line-height:1.5}
.problem-webinar-meta{font-size:12px;color:var(--sub);font-weight:600}
.problem-webinar-arrow{color:var(--cta);font-weight:800;font-size:18px}
@media (max-width:680px){
  .problem-funnel-step{font-size:11px;padding:6px 10px}
  .problem-funnel-arrow{font-size:11px}
  .kpi-shift-table th,.kpi-shift-table td{padding:12px 14px;font-size:13px}
}` }} />
          </div>
        </section>
      )}

      {/* NEW FUNNEL — フォーム送信を待つ Web サイトから、AI SDR が働く Web サイトへ */}
      {!isLp && (
        <section
          className="section"
          style={{ background: "var(--bg)", paddingTop: 64, paddingBottom: 64 }}
        >
          <div className="section-inner" style={{ maxWidth: 1080 }}>
            <div className="slabel" style={{ textAlign: "center" }}>
              New Funnel
            </div>
            <div className="stitle" style={{ textAlign: "center", marginBottom: 16 }}>
              フォーム送信を待つだけの Web サイトから、{" "}
              <span style={{ color: "var(--cta)" }}>AI SDR が働く Web サイト</span>へ。
            </div>
            <p className="ssub" style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 720 }}>
              従来の Web サイトは、訪問者がフォームを送るまで何も起きません。Meeton ai は、訪問者の興味や行動に合わせて会話を開始し、疑問に答え、必要な資料を提案し、温度感が高まったタイミングで商談予約へつなげます。
            </p>
            <div className="funnel-compare">
              <div className="funnel-compare-side funnel-compare-before">
                <div className="funnel-compare-label">Before — 待ちの Web サイト</div>
                <div className="funnel-compare-flow">
                  <span>フォーム送信</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>カレンダー表示</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>予約</span>
                </div>
                <p className="funnel-compare-note">3 step。会話・課題ヒアリングなし。</p>
              </div>
              <div className="funnel-compare-side funnel-compare-after">
                <div className="funnel-compare-label">After — AI SDR が働く Web サイト</div>
                <div className="funnel-compare-flow funnel-compare-flow-vertical">
                  <span>訪問</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>会話</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>ヒアリング</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>資料提案</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>不安解消</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>カレンダー</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>予約</span>
                  <span className="funnel-compare-arrow">→</span>
                  <span>追客</span>
                </div>
                <p className="funnel-compare-note">8 step。AI SDR が文脈を持って商談化まで導く。</p>
              </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
.funnel-compare{display:grid;grid-template-columns:1fr 1.4fr;gap:24px;max-width:1000px;margin:0 auto}
@media (max-width:880px){.funnel-compare{grid-template-columns:1fr}}
.funnel-compare-side{padding:28px 24px;border-radius:16px;background:#fff;border:1px solid var(--border)}
.funnel-compare-before{background:#fafafa}
.funnel-compare-after{background:rgba(18,163,125,.04);border-color:rgba(18,163,125,.25)}
.funnel-compare-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.18em;color:var(--sub);margin-bottom:18px;text-transform:uppercase}
.funnel-compare-after .funnel-compare-label{color:var(--cta)}
.funnel-compare-flow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.funnel-compare-flow span:not(.funnel-compare-arrow){padding:7px 12px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:700;color:var(--heading);font-family:var(--fb)}
.funnel-compare-after .funnel-compare-flow span:not(.funnel-compare-arrow){background:#fff;border-color:rgba(18,163,125,.2)}
.funnel-compare-arrow{color:var(--sub);font-size:13px;font-weight:600}
.funnel-compare-note{font-size:13px;color:var(--sub);font-weight:600;margin:0}
` }} />
          </div>
        </section>
      )}

      {/* USE CASES — 具体的な3つの解決パターン */}
      {!isLp && (
        <section
          className="section"
          style={{ background: "#fff", paddingTop: 80, paddingBottom: 80 }}
        >
          <div className="section-inner" style={{ maxWidth: 1080 }}>
            <div className="slabel" style={{ textAlign: "center" }}>
              Use Cases
            </div>
            <div className="stitle" style={{ textAlign: "center", marginBottom: 16 }}>
              Meeton ai が <span style={{ color: "var(--cta)" }}>商談化する 4 つの瞬間</span>
            </div>
            <p className="ssub" style={{ textAlign: "center", margin: "0 auto 0", maxWidth: 640 }}>
              リードの状態に応じて、Meeton ai が自動で動き分けます。
            </p>
            <div className="usecases-grid">
              {[
                {
                  title: "問い合わせ前の訪問者",
                  subtitle: "フォーム送信せず離脱する",
                  body: "B2B サイト訪問者の 97% はフォームを送らずに離脱。Meeton ai は訪問者の興味・行動を検知し、AI SDR が会話を開始。疑問を解消しながら商談機会へ導きます。",
                  metric: "97%",
                  metricLabel: "離脱する未コンバート訪問者",
                  color: "#0891b2",
                  gradient: "linear-gradient(135deg,#0891b2,#22d3ee)",
                  bg: "linear-gradient(135deg,#ecfeff,#f0fdfa)",
                  // chat
                  iconPath: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
                },
                {
                  title: "資料 DL 直後のリード",
                  subtitle: "温度が高いのに放置される",
                  body: "資料 DL、お問い合わせ、デモリクエスト。その瞬間にリードの温度は最高潮。Meeton ai はその場で Meeton Calendar を起動、温度の高いまま商談予約まで完結させます。",
                  metric: "即時",
                  metricLabel: "高温度時点で商談化",
                  color: "#12a37d",
                  gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
                  bg: "linear-gradient(135deg,#e5f8f2,#f0fdf9)",
                  iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8",
                },
                {
                  title: "予約しなかったリード",
                  subtitle: "その場で決めきれない",
                  body: "その場で予約しなかったリードも、まだ商談機会は残っている。Meeton Email が 1:1 でフォロー。リードの行動シグナル（サイト再訪、メール開封）に応じて AI が動的に内容を調整。返信があれば AI が対話を継続。",
                  metric: "1:1",
                  metricLabel: "MA メールはセグメント配信",
                  color: "#7c5cfc",
                  gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
                  bg: "linear-gradient(135deg,#f0ecfe,#faf5ff)",
                  iconPath: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
                },
                {
                  title: "再訪問した既存リード",
                  subtitle: "検討再開を見逃す",
                  body: "過去にコンバートしたリードが再訪。それは検討再開の最強シグナル。Meeton Live が起動し、過去の全文脈を持って対話を開始。Meeton Library が関連資料を提案・解説。",
                  metric: "100%",
                  metricLabel: "再訪リードに即対応",
                  color: "#3b6ff5",
                  gradient: "linear-gradient(135deg,#3b6ff5,#6690fa)",
                  bg: "linear-gradient(135deg,#eaf0fe,#f5f8ff)",
                  iconPath: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
                },
              ].map((uc, i) => (
                <div
                  key={i}
                  className="usecase-card"
                  style={{
                    padding: 30,
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .25s",
                    boxShadow: "0 1px 2px rgba(15,17,40,.03)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 13,
                      background: uc.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={uc.iconPath} />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: uc.color,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                      fontFamily: "var(--fm)",
                    }}
                  >
                    {uc.title}
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: "var(--heading)",
                      lineHeight: 1.45,
                      marginBottom: 14,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {uc.subtitle}
                  </div>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--sub)",
                      lineHeight: 1.8,
                      marginBottom: 20,
                      flex: 1,
                    }}
                  >
                    {uc.body}
                  </p>
                  <div
                    style={{
                      paddingTop: 18,
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      marginTop: "auto",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 900,
                        background: uc.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        fontFamily: "var(--fm)",
                      }}
                    >
                      {uc.metric}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--sub)",
                        lineHeight: 1.4,
                        fontWeight: 500,
                      }}
                    >
                      {uc.metricLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              .usecases-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
              @media (max-width:780px){.usecases-grid{grid-template-columns:1fr;max-width:560px;margin-left:auto;margin-right:auto}}
              .usecase-card:hover{transform:translateY(-4px);box-shadow:0 20px 48px -16px rgba(15,17,40,.14);border-color:transparent}
            ` }} />
          </div>
        </section>
      )}

      {/* HOW IT WORKS — Meeton ai flow diagram (lazy-loaded in both modes) */}
      <div id="how-it-works">
        <MeetingFlowDiagram />
      </div>

      {/* 3 PRODUCT CARDS */}
      <section
        className="section"
        id="features"
        style={{ position: "relative" }}
      >
        <div
          className="section-inner"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="slabel" style={{ textAlign: "center" }}>
            Capabilities
          </div>
          <div className="stitle" style={{ textAlign: "center" }}>
            AI SDR の仕事を、<span style={{ color: "var(--cta)" }}>機能で支える</span>
          </div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto 40px" }}>
            会話する・予約する・提案する・追客する・判断する。AI SDR の一連の仕事を、
            5 つの機能が連動して 24 時間自動で実行します。
          </p>

          {/* Capabilities Matrix — AI SDR の仕事 → 対応機能 */}
          <div className="capability-matrix-wrap">
            <table className="capability-matrix">
              <thead>
                <tr>
                  <th>AI SDR の仕事</th>
                  <th>対応機能</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cap-job">会話する</td>
                  <td className="cap-feat">Meeton Live</td>
                  <td className="cap-role">訪問者と自然な対話で課題ヒアリング</td>
                </tr>
                <tr>
                  <td className="cap-job">商談予約する</td>
                  <td className="cap-feat">Meeton Calendar</td>
                  <td className="cap-role">温度の高い瞬間に即時カレンダー提示</td>
                </tr>
                <tr>
                  <td className="cap-job">資料を提案する</td>
                  <td className="cap-feat">Meeton Library</td>
                  <td className="cap-role">会話文脈から最適な資料を自動選定</td>
                </tr>
                <tr>
                  <td className="cap-job">追客する</td>
                  <td className="cap-feat">Meeton Email</td>
                  <td className="cap-role">予約しなかったリードに 1:1 で AI メール継続</td>
                </tr>
                <tr>
                  <td className="cap-job">判断する</td>
                  <td className="cap-feat">Meeton Intent</td>
                  <td className="cap-role">訪問企業 ID + 行動シグナルから次のアクションを決定</td>
                </tr>
              </tbody>
            </table>
            <style dangerouslySetInnerHTML={{ __html: `
.capability-matrix-wrap{max-width:880px;margin:0 auto 56px;background:#050807;border:1px solid rgba(255,255,255,.10);border-radius:18px;overflow:hidden;padding:8px}
.capability-matrix{width:100%;border-collapse:collapse;color:#fff}
.capability-matrix th{padding:18px 22px;font-size:11px;font-weight:800;letter-spacing:.18em;text-align:left;background:rgba(255,255,255,.04);color:rgba(255,255,255,.55);font-family:var(--fm);text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.10)}
.capability-matrix td{padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.06);font-size:14.5px;line-height:1.6}
.capability-matrix tr:last-child td{border-bottom:none}
.cap-job{font-weight:800;color:#fff;font-size:15px;white-space:nowrap}
.cap-feat{font-weight:800;color:#04cb78;font-family:var(--fm);font-size:14px;white-space:nowrap}
.cap-role{color:rgba(255,255,255,.7);font-weight:500}
@media (max-width:680px){
  .capability-matrix th{padding:12px 14px;font-size:10px}
  .capability-matrix td{padding:12px 14px;font-size:13px}
  .cap-job{font-size:13px}
  .cap-feat{font-size:12px}
}
` }} />
          </div>

          <div className="slabel" style={{ textAlign: "center", marginTop: 24, marginBottom: 8, color: "var(--sub)" }}>
            主要 3 機能の詳細
          </div>

          {/* 2026-05-19: 4 機能 → 3 機能に整理。Library は補助機能扱いとし、
              トップでは「話しかける(Live) → 商談を取る(Calendar) → 追いかける(Email)」
              の会話フロー順で見せる。レビュー指摘「3 機能 vs 4 機能の表記ブレ」対応。 */}
          <div className="phase-grid">
            {[
              {
                color: "#12a37d",
                gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
                label: "① MEETON LIVE",
                title: "Meeton Live",
                desc: "再訪したリードに、過去の閲覧・資料 DL・メール反応を踏まえて AI SDR が即時対応。検討状況に合わせて会話し、必要に応じて商談予約までその場でつなげます。",
                features: [
                  { label: "過去の全文脈を引き継いで対話開始", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" },
                  { label: "再訪リードに AI SDR がリアルタイム応答", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { label: "商談予約までその場で完結", icon: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
                ],
                link: "/features/ai-chat/",
              },
              {
                color: "#0891b2",
                gradient: "linear-gradient(135deg,#0891b2,#06b6d4)",
                label: "② MEETON CALENDAR",
                title: "Meeton Calendar",
                desc: "リードがコンバートした瞬間、フォーム送信・サンクスページ・メール経由で即座に商談予約を提示。温度の高いタイミングを逃さず商談予約まで完了します。",
                features: [
                  { label: "高意向タイミングで即時に商談予約を提示", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { label: "担当者の自動アサイン（業種・規模ベース）", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" },
                  { label: "AI が事前ヒアリング・CRM 自動登録", icon: "M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z M9 22h6" },
                ],
                link: "/features/meetings/",
              },
              {
                color: "#7c5cfc",
                gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
                label: "③ MEETON EMAIL",
                title: "Meeton Email",
                desc: "即時予約しなかったリードを 1:1 で追跡。AI が動的に内容・タイミング・トーンを判断するパーソナライズドフォロー。MA メールではなく、もう一人の SDR。",
                features: [
                  { label: "リードの行動シグナルでリアルタイム発火", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8" },
                  { label: "AI 生成の個別文面（テンプレートではない）", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
                  { label: "返信に AI が自律的に対話継続", icon: "M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14" },
                ],
                link: "/features/ai-email/",
              },
            ].map((prod, i) => (
              <div
                className="cat-card"
                key={i}
                style={{ "--cat-color": prod.color } as React.CSSProperties}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: prod.gradient,
                    opacity: 0,
                    transition: "opacity .3s",
                  }}
                  className="cat-card-accent"
                />
                <style
                  dangerouslySetInnerHTML={{
                    __html: `.cat-card:hover .cat-card-accent{opacity:1 !important}`,
                  }}
                />
                <div
                  className="cat-label"
                  style={{ background: `${prod.color}10`, color: prod.color }}
                >
                  {prod.label}
                </div>
                <div className="cat-title">{prod.title}</div>
                <div className="cat-desc">{prod.desc}</div>
                <div className="cat-features">
                  {prod.features.map((f, j) => (
                    <div className="cat-feat" key={j}>
                      <div
                        className="cat-feat-icon"
                        style={{ background: `${prod.color}12` }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={prod.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={f.icon} />
                        </svg>
                      </div>
                      {f.label}
                    </div>
                  ))}
                </div>
                <a href={prod.link} className="cat-link">
                  詳しく見る <span>→</span>
                </a>
              </div>
            ))}
          </div>

          {/* 2026-05-19: Library を主要 3 機能から外し、補助機能として
              軽量に紹介。3 vs 4 機能のブレを解消しつつ、既存リード
              ナーチャリング動線は維持。 */}
          <div
            style={{
              marginTop: 36,
              padding: "20px 24px",
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              background: "rgba(208,62,161,0.06)",
              border: "1px solid rgba(208,62,161,0.18)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ minWidth: 240, flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#d03ea1",
                  marginBottom: 4,
                }}
              >
                + 追加機能
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                  color: "var(--heading)",
                  marginBottom: 4,
                }}
              >
                Meeton Library — 既存リードに最適資料を AI が提案
              </div>
              <div style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.65 }}>
                検討フェーズが進んだ既存リードが再訪した瞬間に、行動履歴に応じて
                料金表・事例・比較表・稟議用テンプレートを AI が推薦・解説。
              </div>
            </div>
            <a
              href="/features/ai-library/"
              className="cat-link"
              style={{ whiteSpace: "nowrap" }}
            >
              詳しく見る <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: "center" }}>
            導入実績
          </div>
          <div className="stitle" style={{ textAlign: "center" }}>
            商談創出の実績
          </div>
          <p
            className="ssub"
            style={{ textAlign: "center", margin: "0 auto 44px" }}
          >
            Meeton aiが生み出した商談成果をご紹介します。
          </p>
          <CaseCarousel items={caseStudies} />
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a
              href="/case-studies/"
              style={{
                color: "var(--cta)",
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              すべての導入事例を見る →
            </a>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section
        className="section"
        id="integrations"
        style={{ position: "relative" }}
      >
        <div
          className="section-inner"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="slabel" style={{ textAlign: "center" }}>
            ツール連携
          </div>
          <div className="stitle" style={{ textAlign: "center" }}>
            主要ツールとシームレスに連携
          </div>
          <p
            className="ssub"
            style={{ textAlign: "center", margin: "0 auto 44px" }}
          >
            既存のビジネスツールとかんたんに統合し、すぐに使い始められます。
          </p>
          <div className="int-grid">
            {integrations.map((t, i) => (
              <div className="int-card" key={i}>
                <img src={t.logo} alt={t.name} className="int-icon" loading="lazy" decoding="async" />
                <div className="int-name">{t.name}</div>
                <div className="int-desc">{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a
              href={isJa ? "/ja/integrations/" : "/integrations/"}
              style={{
                color: "#12a37d",
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              {isJa ? "連携一覧を見る →" : "View all integrations →"}
            </a>
          </div>
        </div>
      </section>


      {/* CTA #4 — after STEPS: doc download (post-implementation context, social-proof internal stakeholders) */}
      <MidPageCta
        eyebrow="For internal review"
        heading="社内検討用の資料 (機能・導入事例・料金プラン入り) を無料でダウンロードできます"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={openMeetonDownloadCenter}
      />

      {/* FAQ */}
      <section
        className="section"
        id="faq"
        style={{ background: "var(--surface)" }}
      >
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: "center" }}>
            よくある質問
          </div>
          <div className="stitle" style={{ textAlign: "center" }}>
            FAQ
          </div>
          <div style={{ height: 36 }} />
          <div className="faq-list">
            {faqData.map((f, i) => (
              <div
                className={"faq-item" + (openFaq === i ? " open" : "")}
                key={i}
              >
                <div
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <div className="faq-toggle">+</div>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="final-cta">

        <div className="final-cta-inner" style={{ maxWidth: 720 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              background: "linear-gradient(135deg,var(--cta-light),var(--accent-light))",
              border: "1px solid rgba(18,163,125,.18)",
              borderRadius: 100,
              marginBottom: 28,
              fontSize: 12,
              fontWeight: 700,
              color: "var(--cta)",
              letterSpacing: "0.06em",
              fontFamily: "var(--fm)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--cta)",
                animation: "pulse 2s infinite",
              }}
            />
            GET STARTED
          </div>
          <div
            className="stitle"
            style={{
              textAlign: "center",
              fontSize: "clamp(32px,6vw,56px)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            自社サイトで、{" "}
            <span
              style={{
                background: "linear-gradient(135deg,var(--cta),var(--blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              どれだけ商談化できるか診断しませんか？
            </span>
          </div>
          <p
            className="ssub"
            style={{
              textAlign: "center",
              margin: "20px auto 40px",
              maxWidth: 580,
              fontSize: "clamp(15px,2.2vw,17px)",
            }}
          >
            30 分のデモで、自社サイトの商談化余地を可視化します。タグ設置は最短 5 分。AI SDR「Meeton ai」が 24 時間、訪問者と会話・商談予約・追客まで自律的に実行します。
          </p>
          <div
            id="diagnose"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn btn-cta btn-cta-lg"
              onClick={() => openMeetingModal("final_cta")}
            >
              {isLp ? "無料デモを予約する" : "デモを予約"}
            </button>
            <button
              className="btn-ghost"
              onClick={() => openMeetingModal("diagnose")}
            >
              自社サイトの商談化余地を診断
            </button>
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/webinar/" style={{ color: "var(--sub)", fontSize: 14, fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--border2)", paddingBottom: 2 }}>
              無料ウェビナーを見る →
            </Link>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 13,
              color: "var(--sub)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
              fontWeight: 600,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              クレカ不要
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              5分で導入
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              既存CRMに自動連携
            </span>
          </div>
        </div>
      </section>

      {isLp ? (
        <LpFooter />
      ) : (
        <Footer variant="light" />
      )}

      {isLp && (
        <LpStickyCta
          visible={scrolledLp}
          isMobile={isMobile}
          onPrimary={() => openMeetingModal("sticky")}
          onSecondary={() => openDocModal("sticky")}
        />
      )}
      {!isLp && <MobileStickyCta onClick={openMeetonCalendar} />}

      <HubSpotModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        utmCampaign={utmCampaign}
      />
      <HubSpotMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        utmCampaign={utmCampaign}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * LP-mode sub-components (rendered only when mode='lp')
 * Goal: minimal nav, distraction-free shell, sticky CTA, lean footer
 * ────────────────────────────────────────────────────────────────────── */

function LpNav({
  onCtaClick,
  isMobile,
}: {
  onCtaClick: () => void;
  isMobile: boolean;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isMobile ? "12px 16px" : "14px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,.95)",
        backdropFilter: "blur(24px) saturate(1.4)",
        borderBottom: "1px solid rgba(223,227,240,.6)",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          src="/logo-dark.svg"
          alt="DynaMeet"
          width={140}
          height={30}
          style={{ height: isMobile ? 24 : 28, width: "auto" }}
        />
      </Link>
      <button
        onClick={onCtaClick}
        style={{
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          borderRadius: 10,
          background: "linear-gradient(135deg,#12a37d,#0fc19a)",
          color: "#fff",
          padding: isMobile ? "10px 18px" : "12px 26px",
          fontSize: isMobile ? 13 : 15,
          boxShadow: "0 4px 16px rgba(18,163,125,.25)",
          transition: "all .25s",
          fontFamily: "var(--fb)",
        }}
      >
        デモを予約
      </button>
    </nav>
  );
}

function LpStickyCta({
  visible,
  isMobile,
  onPrimary,
  onSecondary,
}: {
  visible: boolean;
  isMobile: boolean;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <div
      className={`lp-sticky-cta${visible ? " visible" : ""}`}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        padding: isMobile ? "10px 12px" : "14px 24px",
        background: "rgba(255,255,255,.96)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #dfe3f0",
        boxShadow: "0 -4px 24px rgba(15,17,40,.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={onPrimary}
        style={{
          border: "none",
          cursor: "pointer",
          fontWeight: 800,
          borderRadius: 10,
          background: "linear-gradient(135deg,#12a37d,#0fc19a)",
          color: "#fff",
          padding: isMobile ? "12px 22px" : "14px 32px",
          fontSize: isMobile ? 14 : 16,
          boxShadow: "0 4px 16px rgba(18,163,125,.3)",
          flex: isMobile ? 1 : "0 0 auto",
          minWidth: isMobile ? 0 : 200,
          fontFamily: "var(--fb)",
        }}
      >
        無料デモを予約
      </button>
      <button
        onClick={onSecondary}
        style={{
          background: "transparent",
          border: "2px solid #c8cedf",
          color: "#0f1128",
          cursor: "pointer",
          fontWeight: 700,
          borderRadius: 10,
          padding: isMobile ? "10px 18px" : "12px 26px",
          fontSize: isMobile ? 13 : 15,
          flex: isMobile ? 1 : "0 0 auto",
          minWidth: isMobile ? 0 : 160,
          fontFamily: "var(--fb)",
        }}
      >
        資料DL
      </button>
    </div>
  );
}

function LpFooter() {
  return (
    <footer
      style={{
        padding: "20px 24px 100px",
        borderTop: "1px solid #dfe3f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        fontSize: 12,
        color: "#6e7494",
        maxWidth: 1140,
        margin: "0 auto",
      }}
    >
      <span>© {new Date().getFullYear()} DynaMeet K.K.</span>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a
          href="/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6e7494", textDecoration: "none", fontWeight: 600 }}
        >
          プライバシーポリシー
        </a>
        <a
          href="/terms/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6e7494", textDecoration: "none", fontWeight: 600 }}
        >
          利用規約
        </a>
        <a
          href="/security-policy/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6e7494", textDecoration: "none", fontWeight: 600 }}
        >
          情報セキュリティポリシー
        </a>
      </div>
    </footer>
  );
}

const lpCss = `
.lp-sticky-cta{transform:translateY(100%);transition:transform .3s cubic-bezier(.16,1,.3,1)}
.lp-sticky-cta.visible{transform:translateY(0)}
@media(max-width:768px){
  .lp-sticky-cta{padding:8px 10px !important;gap:8px !important}
}
`;
