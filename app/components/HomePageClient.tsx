"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import MidPageCta from "./MidPageCta";
import Nav from "./Nav";

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
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--pink:#d03ea1;--red:#e0475b;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;--fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 6px 28px var(--cta-glow)}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 38px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--accent);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.85;color:var(--sub);max-width:660px}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%)}
.hero-content{max-width:860px;text-align:center;position:relative;z-index:2}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:9px 22px;border-radius:24px;margin-bottom:36px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,7vw,72px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2.5px;margin-bottom:28px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(16px,3vw,22px);line-height:1.8;color:var(--sub);max-width:640px;margin:0 auto 48px}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.hero-stats{display:flex;justify-content:center;gap:clamp(32px,8vw,72px);margin-top:clamp(40px,8vw,72px);padding-top:clamp(32px,6vw,48px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(36px,6vw,52px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(13px,2vw,15px);color:var(--sub);margin-top:8px;font-weight:600}

/* CATEGORY CARDS - 3 categories */
.cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
.phase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.cat-card{background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:32px 28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.cat-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 20px 56px -16px rgba(18,163,125,.18)}
.cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--cat-color, #12a37d);opacity:.85;transition:opacity .3s, height .3s}
.cat-card:hover::before{opacity:1;height:5px}
.cat-label{font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:20px}
.cat-title{font-size:clamp(20px,3vw,26px);font-weight:900;color:var(--heading);letter-spacing:-.3px;margin-bottom:12px;line-height:1.3}
.cat-desc{font-size:15px;line-height:1.8;color:var(--sub);margin-bottom:24px}
.cat-features{display:flex;flex-direction:column;gap:10px;margin-bottom:28px;flex:1}
.cat-feat{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--text)}
.cat-feat-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cat-link{display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:800;color:var(--cta);text-decoration:none;transition:all .25s;margin-top:auto;padding-top:20px;border-top:1px solid var(--border)}
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
.step-card{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,.03);transition:all .3s;position:relative;overflow:hidden}
.step-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.06)}
.step-num{font-family:var(--fm);font-size:38px;font-weight:700;margin-bottom:14px;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.step-title{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:10px}
.step-desc{font-size:15px;line-height:1.75;color:var(--sub)}
.step-arrow{display:flex;align-items:center;font-family:var(--fm);font-size:22px;color:var(--border2);padding:0 4px}

/* CASES */
.case-carousel{position:relative;overflow:hidden;width:100%}
.case-track{display:flex;gap:0;transition:transform .5s cubic-bezier(.16,1,.3,1);padding:4px 0}
.case-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:28px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03);min-width:100%;max-width:100%;width:100%;flex-shrink:0;box-sizing:border-box;word-break:break-word;overflow:hidden;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:28px;align-items:center}
.case-card:hover{box-shadow:0 16px 40px -16px rgba(18,163,125,.18);border-color:var(--cta);transform:translateY(-2px)}
.case-card-link{cursor:pointer}
.case-img{position:relative;width:100%;aspect-ratio:4/3;border-radius:14px;overflow:hidden;background:#f3f2ed}
.case-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.case-content{display:flex;flex-direction:column;min-width:0}
.case-arrows{display:flex;justify-content:center;gap:14px;margin-top:28px}
.case-arrow{width:48px;height:48px;border-radius:50%;border:2px solid var(--border);background:var(--bg);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--heading);transition:all .25s;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.case-arrow:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light);box-shadow:0 6px 20px var(--cta-glow)}
.case-arrow:disabled{opacity:.3;cursor:default;pointer-events:none}
.case-dots{display:flex;justify-content:center;gap:8px;margin-top:16px}
.case-dot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all .25s;cursor:pointer}
.case-dot.active{background:var(--cta);width:28px;border-radius:4px;box-shadow:0 0 8px var(--cta-glow)}
.case-logo{font-family:var(--fb);font-size:22px;font-weight:900;color:var(--heading);margin-bottom:4px}
.case-industry{font-size:13px;color:var(--sub);margin-bottom:18px;font-weight:500}
.case-quote{font-size:16px;line-height:1.9;color:var(--text);margin-bottom:24px;padding:20px 26px;background:linear-gradient(135deg,var(--surface),var(--surface2));border-radius:14px;border-left:4px solid var(--cta);width:100%;box-sizing:border-box;overflow-wrap:break-word}
.case-stats{display:flex;gap:48px;flex-wrap:wrap;padding-top:18px;border-top:1px solid var(--border)}
.case-stat-v{font-family:var(--fm);font-size:26px;font-weight:700}
.case-stat-l{font-size:12px;color:var(--sub);margin-top:3px;font-weight:500}

/* INTEGRATIONS */
.int-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;max-width:900px;margin:0 auto}
.int-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:22px 18px;text-align:center;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03)}
.int-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 10px 30px rgba(0,0,0,.07)}
.int-icon{width:48px;height:48px;margin:0 auto 12px;object-fit:contain}
.int-name{font-size:14px;font-weight:800;color:var(--heading)}
.int-desc{font-size:11px;color:var(--sub);margin-top:3px;font-weight:500}

/* FAQ */
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all .25s}
.faq-item:hover{border-color:var(--border2)}
.faq-q{padding:20px 26px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:18px;font-weight:700;color:var(--heading);transition:color .2s}
.faq-q:hover{color:var(--cta)}
.faq-toggle{width:28px;height:28px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--sub);transition:all .25s;flex-shrink:0}
.faq-item.open .faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.faq-a{padding:0 26px 20px;font-size:16px;line-height:1.8;color:var(--sub)}

/* CLIENTS */
.client-logos{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;align-items:center}
.client-logo{padding:20px 32px;background:var(--bg);border:1px solid var(--border);border-radius:14px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03);display:flex;align-items:center;justify-content:center;min-width:160px;height:80px}
.client-logo:hover{border-color:transparent;box-shadow:0 8px 24px rgba(0,0,0,.07);transform:translateY(-2px)}
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
.logo-item{padding:16px 28px;background:var(--bg);border:1px solid var(--border);border-radius:12px;display:flex;align-items:center;justify-content:center;min-width:150px;height:72px;flex-shrink:0;transition:all .3s}
.logo-item:hover{border-color:transparent;box-shadow:0 4px 16px rgba(0,0,0,.06)}
.logo-item img{height:36px;width:auto;max-width:120px;object-fit:contain}

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
  .hero{padding:90px 20px 50px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:24px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:300px;margin:0 auto}
  .hero-stats{flex-direction:column;gap:20px;align-items:center}
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
const HERO_STATS = [
  { num: "2", suffix: "倍以上", label: "商談化率", desc: "人間SDRと比較", icon: "target" as IconKey, gradient: "linear-gradient(135deg, #12a37d, #34d399)", glow: "rgba(18,163,125,.25)" },
  { num: "66", suffix: "%削減", label: "商談獲得コスト", desc: "人件費を大幅カット", icon: "bolt" as IconKey, gradient: "linear-gradient(135deg, #3b6ff5, #60a5fa)", glow: "rgba(59,111,245,.25)" },
  { num: "20", suffix: "h+/人", label: "月間工数削減", desc: "より重要な営業活動に集中", icon: "calendar" as IconKey, gradient: "linear-gradient(135deg, #7c5cfc, #a78bfa)", glow: "rgba(124,92,252,.25)" },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
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

  const v0 = useCountUp(2, 1200, visible);
  const v1 = useCountUp(66, 1800, visible);
  const v2 = useCountUp(20, 1600, visible);
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

  // LP-mode: enriched CTA handlers (track + open modal)
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
    setIsMeetingModalOpen(true);
  };

  const openDocModal = (location: string) => {
    if (isLp && typeof window !== "undefined") {
      window.gtag?.("event", "lp_cta_doc_click", {
        lp_variant: lpVariant,
        location,
      });
    }
    setIsDocModalOpen(true);
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
        <div className="dot-grid" />
        <div
          className="glow"
          style={{
            background: "rgba(18,163,125,.2)",
            width: 600,
            height: 600,
            top: -200,
            right: -100,
          }}
        />
        <div
          className="glow"
          style={{
            background: "rgba(124,92,252,.15)",
            width: 500,
            height: 500,
            bottom: -150,
            left: -80,
          }}
        />
        <div
          className="glow"
          style={{
            background: "rgba(59,111,245,.1)",
            width: 400,
            height: 400,
            top: "40%",
            left: "50%",
          }}
        />
        <div className="hero-content">
          {/* Hero elements use anim-y (transform-only) instead of anim
              (opacity 0→1). Initial opacity:0 was preventing Lighthouse
              from registering the H1 as painted until ~1s after CSS load,
              which alone added ~1s to LCP. Visual slide-in is preserved. */}
          <div className="anim-y d1 hero-badge">
            <div className="hero-badge-dot" />
            {isLp && lpVariant === "trial"
              ? "14日間無料トライアル"
              : "AI SDR Platform for B2B Sales Teams"}
          </div>
          <h1 className="anim-y d2">
            {lpHeadline ?? "ウェブサイトのリードを、5秒で商談に変える"}
          </h1>
          <p className="anim-y d3 hero-sub">
            {lpSubheadline ??
              "リードがコンバートした瞬間、Meeton Calendar が起動。リード発生から商談予約まで、人間の介在ゼロ。MA や CRM では届かない「コンバージョン直前の最後の100m」を AI SDR が走る。"}
          </p>
          <div
            className="anim-y d4 hero-ctas"
            style={isLp ? { gap: 12 } : undefined}
          >
            <button
              className="btn btn-cta btn-cta-lg"
              onClick={() => openMeetingModal("hero")}
              style={isLp ? { padding: "20px 44px", fontSize: 19 } : undefined}
            >
              AIデモを体験
            </button>
            <button
              className="btn-ghost"
              onClick={() => openDocModal("hero")}
            >
              資料請求 →
            </button>
          </div>
          {/* ROI Simulator entry point — placed below the primary CTAs so it
              doesn't dilute "demo / resource" action priority but is still
              visible. Active LPs (/lp/, /lp/inside-sales/, /lp/lead-gen/)
              currently sit at 0 conversions despite 3% CTR, and the ROI
              calculator is the only interactive lead magnet we have.
              Light hero background → use --sub color, not white. */}
          <div
            className="anim-y d4"
            style={{ marginTop: 18, fontSize: 14, color: "var(--sub)" }}
          >
            <Link
              href="/roi-simulator/"
              style={{
                color: "var(--cta)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                textDecorationThickness: 1,
                fontWeight: 600,
              }}
            >
              ▸ SDRコストを試算する（30秒）
            </Link>
          </div>
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

      {/* THE PROBLEM — リードはあるのに、商談にならない */}
      {!isLp && (
        <section
          className="section"
          style={{ background: "var(--surface)", paddingTop: 64, paddingBottom: 64 }}
        >
          <div className="section-inner" style={{ maxWidth: 920 }}>
            <div className="slabel" style={{ textAlign: "center" }}>
              The Problem
            </div>
            <div className="stitle" style={{ textAlign: "center", marginBottom: 16 }}>
              リードはあるのに、<span style={{ color: "var(--cta)" }}>商談にならない</span>
            </div>
            <p
              className="ssub"
              style={{ textAlign: "center", margin: "0 auto 40px", maxWidth: 720 }}
            >
              MA でリードは集まる。CRM にも溜まる。でも、その大半は商談にならずに消えていく。
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
                marginBottom: 32,
              }}
            >
              {[
                { num: "5分", label: "以内のフォローで商談化率 100倍", note: "業界標準" },
                { num: "42時間", label: "実際の B2B 営業の平均レスポンスタイム", note: "現実" },
                { num: "78%", label: "「最初に応答した会社」から購入", note: "顧客行動" },
                { num: "12ヶ月", label: "SDR 採用 → 立ち上げ → 離職のサイクル", note: "組織課題" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 24,
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--sub)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {item.note}
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      color: "var(--cta)",
                      lineHeight: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    {item.num}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "24px 28px",
                background: "linear-gradient(135deg, var(--cta-light), #fff)",
                borderRadius: 14,
                borderLeft: "4px solid var(--cta)",
              }}
            >
              <p style={{ fontSize: 16, color: "var(--heading)", lineHeight: 1.8, fontWeight: 600 }}>
                リードを集めるツール（MA / 広告 / コンテンツ）はあっても、
                <br />
                <span style={{ color: "var(--cta)" }}>
                  「集めたリードを商談に変える」
                </span>
                ところで、ほぼ全ての企業が詰まっています。
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--sub)",
                  marginTop: 12,
                  lineHeight: 1.7,
                }}
              >
                Meeton ai は、その「最後の100m」だけに特化した AI SDR Platform です。
              </p>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS — Meeton ai flow diagram (lazy-loaded in both modes) */}
      <MeetingFlowDiagram />

      {/* 3 PRODUCT CARDS */}
      <section
        className="section"
        id="features"
        style={{ position: "relative" }}
      >
        <div className="dot-grid" style={{ opacity: 0.3 }} />
        <div
          className="section-inner"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="slabel" style={{ textAlign: "center" }}>
            What Meeton Does
          </div>
          <div className="stitle" style={{ textAlign: "center" }}>
            リードを商談に変える、
            <span style={{ color: "var(--cta)" }}>4 つの AI 機能</span>
          </div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto" }}>
            リードコンバートから商談予約まで、4 つの AI が連動して 24 時間自動で実行します。
          </p>

          <div className="phase-grid">
            {[
              {
                color: "#0891b2",
                gradient: "linear-gradient(135deg,#0891b2,#06b6d4)",
                label: "① MEETON CALENDAR",
                title: "Meeton Calendar",
                desc: "リードがコンバートした瞬間、即座に商談予約を提示。フォーム送信・サンクスページ・メール経由で発動し、5秒以内に動く。リード発生から商談予約完了まで人間の介在ゼロ。",
                features: [
                  { label: "コンバート直後に5秒で商談予約を提示", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { label: "担当者の自動アサイン（業種・規模ベース）", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" },
                  { label: "AI が事前ヒアリング・CRM 自動登録", icon: "M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z M9 22h6" },
                ],
                link: "/features/meetings/",
              },
              {
                color: "#7c5cfc",
                gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
                label: "② MEETON EMAIL",
                title: "Meeton Email",
                desc: "即時予約しなかったリードを 1:1 で追跡。AI が動的に内容・タイミング・トーンを判断するパーソナライズドフォロー。MA メールではなく、もう一人の SDR。",
                features: [
                  { label: "リードの行動シグナルでリアルタイム発火", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8" },
                  { label: "AI 生成の個別文面（テンプレートではない）", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
                  { label: "返信に AI が自律的に対話継続", icon: "M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14" },
                ],
                link: "/features/ai-email/",
              },
              {
                color: "#12a37d",
                gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
                label: "③ MEETON LIVE",
                title: "Meeton Live",
                desc: "過去にコンバートしたリードがサイトに再訪した瞬間、過去の全文脈を引き継いで対話を開始。匿名訪問者には起動しない、識別済みリード専用の AI SDR 対話。",
                features: [
                  { label: "再訪した識別済みリードのみに起動", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { label: "過去の閲覧・DL・メール履歴を全文脈で活用", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" },
                  { label: "HubSpot / Salesforce 連携でその場で商談予約", icon: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
                ],
                link: "/features/ai-chat/",
              },
              {
                color: "#d03ea1",
                gradient: "linear-gradient(135deg,#d03ea1,#e0475b)",
                label: "④ MEETON LIBRARY",
                title: "Meeton Library",
                desc: "再訪した既存リードに、AI が文脈に応じた資料を提案・解説。検討フェーズが進んだリードに適切な情報提供で商談機会を再発火。新規リード獲得用ではない、既存リードのナーチャリング専用機能。",
                features: [
                  { label: "行動履歴・興味分野から最適な資料を AI 推薦", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8" },
                  { label: "AI チャットが資料の中身を解説・質問対応", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
                  { label: "検討再開のタイミングで Meeton Calendar に引き渡し", icon: "M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14" },
                ],
                link: "/features/ai-library/",
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
        </div>
      </section>

      {/* CTA #1 — after 3 product cards: doc download (low-friction next step) */}
      <MidPageCta
        eyebrow="Resource"
        heading="3 つの AI 機能の詳細・導入手順・料金プランを 1 つの資料にまとめました"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={() => setIsDocModalOpen(true)}
      />

      {/* WHY AI SDR */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="dot-grid" style={{ opacity: 0.3 }} />
        <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: "center" }}>Why AI SDR?</div>
          <div className="stitle" style={{ textAlign: "center" }}>
            なぜ今、<span style={{ color: "var(--cta)" }}>AI SDR</span>なのか
          </div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto 0" }}>
            人間のSDRが行ってきた業務を、Meeton aiが24時間・高精度で代替する時代が来ました。
          </p>
          <div className="why-grid">
            {[
              {
                iconKey: "robot" as IconKey,
                color: "var(--cta)",
                bg: "var(--cta-light)",
                border: "linear-gradient(135deg,var(--cta),var(--blue))",
                title: "自律的に判断・行動",
                desc: "設定に従って表示するだけのツールとは違います。Meeton aiはリードの行動データを分析し、最適なチャネル・タイミング・メッセージを自分で選択して商談を獲得します。",
              },
              {
                iconKey: "bolt" as IconKey,
                color: "var(--accent)",
                bg: "var(--accent-light)",
                border: "linear-gradient(135deg,var(--accent),var(--pink))",
                title: "SDR 3人分を24時間稼働",
                desc: "人間のSDRは1日8時間。Meeton aiは深夜も週末も休まず、見込み客の熱量が最も高い瞬間を逃さずアプローチ。休眠リードの掘り起こしも自動で行います。",
              },
              {
                iconKey: "target" as IconKey,
                color: "var(--blue)",
                bg: "var(--blue-light)",
                border: "linear-gradient(135deg,var(--blue),var(--cyan))",
                title: "ファネル全体を一気通貫",
                desc: "初回接触→ナーチャリング→商談予約→事前ヒアリングまで。従来バラバラだったツールが1つのAIエージェントに統合され、リードが途中で途切れません。",
              },
            ].map((item, i) => (
              <div className="why-card" key={i} style={{ boxShadow: "0 2px 8px rgba(0,0,0,.03)" }}>
                <div className="why-card" style={{ all: "unset" }}>
                  <div style={{ display: "none" }} className="why-card-before" />
                </div>
                <div className="why-icon" style={{ background: item.bg }}>
                  <Ico name={item.iconKey} size={28} color={item.color} />
                </div>
                <div className="why-title">{item.title}</div>
                <div className="why-desc">{item.desc}</div>
              </div>
            ))}
          </div>
          {/* Comparison strip */}
          <div style={{
            marginTop: 48,
            background: "linear-gradient(135deg, var(--surface), var(--surface2))",
            borderRadius: 16,
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
            flexWrap: "wrap",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sub)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "var(--fm)" }}>従来のSDR</div>
              <div style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8 }}>
                平均レスポンス 42時間 / 1日8時間稼働<br/>属人的な品質 / 採用と離職の繰り返し
              </div>
            </div>
            <div style={{ fontSize: 32, color: "var(--cta)", fontWeight: 900 }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--cta)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "var(--fm)" }}>Meeton ai（AI SDR）</div>
              <div style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8 }}>
                <strong>初動5秒</strong> / 24時間365日稼働<br/>AI 動的判断 / 一貫した高品質対応
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON — vs Human SDR vs Chatbot (lazy-loaded in both modes) */}
      <ComparisonTable />

      {/* CTA #2 — after comparison table: demo (high-intent moment after seeing differentiation) */}
      <MidPageCta
        eyebrow="Live Demo"
        heading="比較表で見えた違いを、実際の管理画面で 15 分で体験してください"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={() => setIsMeetingModalOpen(true)}
      />

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

      {/* CTA #3 — after cases: demo (social-proof momentum) */}
      <MidPageCta
        eyebrow="Try it on your site"
        heading="同じ仕組みを自社サイトでも。15 分のデモで御社の業界に合わせた成果イメージをお伝えします"
        ctaLabel="デモを予約する"
        variant="demo"
        tone="surface"
        onClick={() => setIsMeetingModalOpen(true)}
      />

      {/* INTEGRATIONS */}
      <section
        className="section"
        id="integrations"
        style={{ position: "relative" }}
      >
        <div className="dot-grid" style={{ opacity: 0.3 }} />
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

      {/* STEPS (skipped in LP — focus on conversion) */}
      {!isLp && (
      <section className="section">
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: "center" }}>
            導入ステップ
          </div>
          <div className="stitle" style={{ textAlign: "center" }}>
            かんたん3ステップで<span style={{ color: "var(--cta)" }}>Meeton aiが稼働開始</span>
          </div>
          <p
            className="ssub"
            style={{ textAlign: "center", margin: "0 auto 44px" }}
          >
            開発リソース不要。最短当日からMeeton aiがあなたのAI SDRとして働き始めます。
          </p>
          <div className="steps-row">
            {stepsData.map((s, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "stretch", flex: 1 }}
              >
                <div
                  className="step-card"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="step-num">{s.num}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                  <div style={{ marginTop: "auto", paddingTop: 18 }}>
                    {i === 0 && (
                      <div
                        style={{
                          background: "var(--surface)",
                          borderRadius: 10,
                          padding: "12px 14px",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontFamily: "var(--fm)",
                            color: "var(--sub)",
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            borderRadius: 6,
                            padding: "6px 10px",
                            whiteSpace: "nowrap",
                            fontWeight: 600,
                          }}
                        >
                          &lt;script src=&quot;meeton.js&quot;&gt;
                        </div>
                        <div
                          style={{
                            animation: "pulse 2s infinite",
                          }}
                        >
                          <Ico name="check" size={18} color="var(--cta)" />
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      <div
                        style={{
                          background: "var(--surface)",
                          borderRadius: 10,
                          padding: "12px 14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        {[
                          { iconKey: "chat" as IconKey, label: "声かけ内容" },
                          { iconKey: "calendar" as IconKey, label: "予約ルール" },
                          { iconKey: "target" as IconKey, label: "見込み基準" },
                        ].map((item, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontSize: 11,
                              fontWeight: 700,
                              color: "var(--heading)",
                            }}
                          >
                            <span style={{display:"flex",alignItems:"center",gap:4}}><Ico name={item.iconKey} size={12} color="var(--cta)" />{item.label}</span>
                            <div
                              style={{
                                flex: 1,
                                height: 6,
                                background: "var(--bg)",
                                borderRadius: 3,
                                overflow: "hidden",
                                border: "1px solid var(--border)",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  borderRadius: 3,
                                  background:
                                    "linear-gradient(90deg,var(--cta),var(--accent))",
                                  width:
                                    j === 0 ? "90%" : j === 1 ? "60%" : "40%",
                                  transition: "width 1s",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 2 && (
                      <div
                        style={{
                          background: "var(--surface)",
                          borderRadius: 10,
                          padding: "12px 14px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div style={{ display: "flex", gap: 4 }}>
                          {(["mail", "target", "calendar"] as IconKey[]).map((iconName, j) => (
                            <div
                              key={j}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                animation: `nodeGrow .4s ${j * 0.2}s cubic-bezier(.16,1,.3,1) forwards`,
                                opacity: 0,
                                transform: "scale(0)",
                              }}
                            >
                              <Ico name={iconName} size={14} color="var(--cta)" />
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "var(--cta)",
                            lineHeight: 1.4,
                          }}
                        >
                          商談獲得
                          <br />
                          自動で稼働開始
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {i < 2 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* CTA #4 — after STEPS: doc download (post-implementation context, social-proof internal stakeholders) */}
      <MidPageCta
        eyebrow="For internal review"
        heading="社内検討用の資料 (機能・導入事例・料金プラン入り) を無料でダウンロードできます"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={() => setIsDocModalOpen(true)}
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

      {/* CLIENTS */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="section-inner">
          <div className="slabel">導入企業</div>
          <div className="stitle">先進企業に選ばれています</div>
          <div style={{ height: 36 }} />
          <div className="logo-carousel">
            <div className="logo-track">
              {/* Double the logos for seamless infinite scroll */}
              {[...clients, ...clients].map((c, i) => (
                <div className="logo-item" key={`${c.name}-${i}`}>
                  <img src={c.logo} alt={c.name} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 24, fontSize: 14, fontWeight: 700, color: "var(--sub)" }}>
            ...ほか多数の企業様にご導入いただいています
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="dot-grid" style={{ opacity: 0.3 }} />
        <div
          className="glow"
          style={{
            background: "rgba(18,163,125,.15)",
            width: 500,
            height: 500,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div className="final-cta-inner">
          <div className="slabel">Get Started</div>
          <div className="stitle" style={{ textAlign: "center" }}>
            Meeton aiに、
            <br />
            商談獲得を任せよう
          </div>
          <p
            className="ssub"
            style={{ textAlign: "center", margin: "16px auto 36px" }}
          >
            導入は5分。あなた専属のAI SDR「Meeton ai」が24時間稼働し、ファネル全体を自律的に動かして商談を創出し続けます。
          </p>
          <div
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
              {isLp ? "無料デモを予約する" : "AIデモを体験"}
            </button>
            <button
              className="btn-ghost"
              onClick={() => openDocModal("final_cta")}
            >
              資料請求 →
            </button>
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
      {!isLp && <MobileStickyCta onClick={() => setIsMeetingModalOpen(true)} />}

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
          セキュリティポリシー
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
