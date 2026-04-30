"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import HubSpotMeetingModal from "./HubSpotMeetingModal";
import HubSpotModal from "./HubSpotModal";
import Nav from "./Nav";

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
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
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
  .hero-stats-grid{grid-template-columns:1fr!important;max-width:360px!important}
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
  .int-grid{grid-template-columns:repeat(2,1fr)}
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
  .int-grid{grid-template-columns:1fr}
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
  {
    q: "Meeton aiと従来のチャットボットやImmedio等のツールとの違いは？",
    a: "従来のツールはカレンダー表示やルールベースの応答が中心です。Meeton aiはAI SDRとして、リードの温度感を判断し、チャット・メール・資料提案・カレンダーの中から最適なアプローチを自律的に選択して商談を獲得します。",
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

/* ── Diagram Components ── */

function SvgIcon({
  d,
  x,
  y,
  size = 20,
  color = "#0891b2",
}: {
  d: string;
  x: number;
  y: number;
  size?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x - size / 2},${y - size / 2})`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </g>
  );
}
const ICON = {
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  cal: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  form: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  cpu: "M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  bookmark: "M19 4H5a2 2 0 0 0-2 2v14l7-3 7 3V6a2 2 0 0 0-2-2z",
};

function DiagramChatbot() {
  return (
    <div className="diagram" style={{ flexDirection: "column", gap: 8 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 460 220"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        {/* Website */}
        <rect
          x="15"
          y="60"
          width="110"
          height="90"
          rx="14"
          fill="#f0fdfa"
          stroke="#0891b2"
          strokeWidth="2"
        />
        <SvgIcon d={ICON.globe} x={70} y={88} size={20} color="#0891b2" />
        <text
          x="70"
          y="116"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#0891b2"
        >
          {"Web / LP / \u5e83\u544a"}
        </text>
        {/* Arrow */}
        <line
          x1="130"
          y1="105"
          x2="170"
          y2="105"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="170,100 180,105 170,110" fill="#c8cedf" />
        {/* AI Chatbot */}
        <rect
          x="185"
          y="30"
          width="130"
          height="150"
          rx="16"
          fill="white"
          stroke="#0891b2"
          strokeWidth="2"
        />
        <SvgIcon d={ICON.cpu} x={250} y={58} size={24} color="#0891b2" />
        <text
          x="250"
          y="86"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#0f1128"
        >
          {"AI\u30c1\u30e3\u30c3\u30c8"}
        </text>
        <rect x="200" y="98" width="100" height="18" rx="5" fill="#e5f8f2" />
        <text
          x="250"
          y="112"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#12a37d"
        >
          {"\u30cb\u30fc\u30ba\u628a\u63e1"}
        </text>
        <rect x="200" y="122" width="100" height="18" rx="5" fill="#eaf0fe" />
        <text
          x="250"
          y="136"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#3b6ff5"
        >
          {"\u8cc7\u6599\u63d0\u6848"}
        </text>
        <rect x="200" y="146" width="100" height="18" rx="5" fill="#f0ecfe" />
        <text
          x="250"
          y="160"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#7c5cfc"
        >
          {"\u4e88\u7d04\u8a98\u5c0e"}
        </text>
        {/* Arrow */}
        <line
          x1="320"
          y1="105"
          x2="355"
          y2="105"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="355,100 365,105 355,110" fill="#c8cedf" />
        {/* Meeting */}
        <rect
          x="370"
          y="55"
          width="80"
          height="100"
          rx="14"
          fill="#e5f8f2"
          stroke="#12a37d"
          strokeWidth="2"
        />
        <SvgIcon d={ICON.cal} x={410} y={88} size={22} color="#12a37d" />
        <text
          x="410"
          y="118"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#12a37d"
        >
          {"\u5546\u8ac7\u78ba\u5b9a"}
        </text>
      </svg>
    </div>
  );
}

function DiagramEmail() {
  return (
    <div className="diagram" style={{ flexDirection: "column" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 420 210"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        {/* Sources */}
        <rect
          x="10"
          y="15"
          width="85"
          height="42"
          rx="8"
          fill="#eaf0fe"
          stroke="#3b6ff5"
          strokeWidth="1.5"
        />
        <text
          x="52"
          y="41"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#3b6ff5"
        >
          {"\u30a4\u30f3\u30d0\u30a6\u30f3\u30c9"}
        </text>
        <rect
          x="10"
          y="67"
          width="85"
          height="42"
          rx="8"
          fill="#f0ecfe"
          stroke="#7c5cfc"
          strokeWidth="1.5"
        />
        <text
          x="52"
          y="93"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#7c5cfc"
        >
          {"\u30a6\u30a7\u30d3\u30ca\u30fc"}
        </text>
        <rect
          x="10"
          y="119"
          width="85"
          height="42"
          rx="8"
          fill="#e5f8f2"
          stroke="#12a37d"
          strokeWidth="1.5"
        />
        <text
          x="52"
          y="145"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#12a37d"
        >
          CRM / API
        </text>
        {/* Arrows to AI */}
        <line
          x1="100"
          y1="36"
          x2="150"
          y2="97"
          stroke="#c8cedf"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="8"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="100"
          y1="88"
          x2="150"
          y2="97"
          stroke="#c8cedf"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="8"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="100"
          y1="140"
          x2="150"
          y2="97"
          stroke="#c8cedf"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="8"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        {/* AI Engine */}
        <rect
          x="155"
          y="50"
          width="120"
          height="96"
          rx="14"
          fill="white"
          stroke="#12a37d"
          strokeWidth="2"
        />
        <SvgIcon d={ICON.mail} x={215} y={76} size={22} color="#12a37d" />
        <text
          x="215"
          y="100"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#0f1128"
        >
          {"AI\u30e1\u30fc\u30eb"}
        </text>
        <text x="215" y="116" textAnchor="middle" fontSize="9" fill="#6e7494">
          {"\u81ea\u52d5\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0"}
        </text>
        <text x="215" y="131" textAnchor="middle" fontSize="9" fill="#6e7494">
          {"\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7"}
        </text>
        {/* Arrow */}
        <line
          x1="280"
          y1="98"
          x2="318"
          y2="98"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="318,93 328,98 318,103" fill="#c8cedf" />
        {/* Result */}
        <rect
          x="333"
          y="55"
          width="80"
          height="86"
          rx="14"
          fill="#e5f8f2"
          stroke="#12a37d"
          strokeWidth="2"
        />
        <SvgIcon d={ICON.cal} x={373} y={82} size={22} color="#12a37d" />
        <text
          x="373"
          y="108"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#12a37d"
        >
          {"\u5546\u8ac7\u78ba\u5b9a"}
        </text>
        <text x="373" y="125" textAnchor="middle" fontSize="9" fill="#6e7494">
          {"\u81ea\u52d5\u4e88\u7d04"}
        </text>
        {/* Timeline label */}
        <rect
          x="140"
          y="172"
          width="170"
          height="28"
          rx="8"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text
          x="225"
          y="190"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#d97706"
        >
          {
            "\u71b1\u91cf\u304c\u9ad8\u3044\u30bf\u30a4\u30df\u30f3\u30b0\u3067\u5373\u30a2\u30af\u30b7\u30e7\u30f3"
          }
        </text>
      </svg>
    </div>
  );
}

function DiagramDownloadCenter() {
  return (
    <div className="diagram">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 420 210"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        {/* Download page */}
        <rect
          x="15"
          y="10"
          width="170"
          height="190"
          rx="14"
          fill="white"
          stroke="#3b6ff5"
          strokeWidth="2"
        />
        <text
          x="100"
          y="38"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#0f1128"
        >
          {"\u8cc7\u6599\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9"}
        </text>
        {/* Doc cards */}
        {[
          { y: 52, name: "\u5c0e\u5165\u30ac\u30a4\u30c9", c: "#e0475b" },
          { y: 84, name: "\u6599\u91d1\u6bd4\u8f03\u8868", c: "#3b6ff5" },
          { y: 116, name: "\u4e8b\u4f8b\u96c6", c: "#12a37d" },
        ].map((d, i) => (
          <g key={i}>
            <rect
              x="30"
              y={d.y}
              width="140"
              height="26"
              rx="6"
              fill={`${d.c}10`}
              stroke={d.c}
              strokeWidth="1"
            />
            <SvgIcon d={ICON.doc} x={44} y={d.y + 13} size={13} color={d.c} />
            <text x="58" y={d.y + 17} fontSize="10" fontWeight="700" fill={d.c}>
              {d.name}
            </text>
          </g>
        ))}
        <rect x="30" y="150" width="140" height="22" rx="5" fill="#e5f8f2" />
        <text
          x="100"
          y="165"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#12a37d"
        >
          {"+\u4ed6\u306e\u8cc7\u6599\u3082..."}
        </text>
        {/* Arrow */}
        <line
          x1="190"
          y1="105"
          x2="225"
          y2="105"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="225,100 235,105 225,110" fill="#c8cedf" />
        {/* AI */}
        <rect
          x="240"
          y="30"
          width="130"
          height="150"
          rx="16"
          fill="white"
          stroke="#3b6ff5"
          strokeWidth="2"
        />
        <SvgIcon d={ICON.cpu} x={305} y={60} size={24} color="#3b6ff5" />
        <text
          x="305"
          y="88"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#0f1128"
        >
          {"AI\u304c\u6848\u5185"}
        </text>
        <rect x="256" y="100" width="98" height="18" rx="5" fill="#eaf0fe" />
        <text
          x="305"
          y="114"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#3b6ff5"
        >
          {"\u3053\u306e\u8cc7\u6599\u304c\u304a\u3059\u3059\u3081"}
        </text>
        <rect x="256" y="124" width="98" height="18" rx="5" fill="#e5f8f2" />
        <text
          x="305"
          y="138"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#12a37d"
        >
          {"\u2192 \u5546\u8ac7\u7372\u5f97"}
        </text>
      </svg>
    </div>
  );
}

function DiagramThanksPage() {
  return (
    <div className="diagram">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 430 210"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        {/* Form completion */}
        <rect
          x="10"
          y="40"
          width="95"
          height="120"
          rx="14"
          fill="#f0ecfe"
          stroke="#7c5cfc"
          strokeWidth="1.5"
        />
        <SvgIcon d={ICON.form} x={57} y={72} size={18} color="#7c5cfc" />
        <text
          x="57"
          y="98"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#7c5cfc"
        >
          {"\u554f\u3044\u5408\u308f\u305b"}
        </text>
        <text
          x="57"
          y="114"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#7c5cfc"
        >
          {"\u8cc7\u6599\u8acb\u6c42"}
        </text>
        <text x="57" y="138" textAnchor="middle" fontSize="9" fill="#6e7494">
          {"\u5b8c\u4e86\uff01"}
        </text>
        {/* Arrow */}
        <line
          x1="110"
          y1="100"
          x2="148"
          y2="100"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="148,95 158,100 148,105" fill="#c8cedf" />
        {/* Thanks page */}
        <rect
          x="162"
          y="15"
          width="258"
          height="185"
          rx="16"
          fill="white"
          stroke="#7c5cfc"
          strokeWidth="2"
        />
        <text
          x="291"
          y="42"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#0f1128"
        >
          {"\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8"}
        </text>
        {/* Calendar */}
        <rect
          x="178"
          y="55"
          width="120"
          height="130"
          rx="10"
          fill="#f0ecfe"
          stroke="#7c5cfc"
          strokeWidth="1"
        />
        <SvgIcon d={ICON.cal} x={238} y={73} size={16} color="#7c5cfc" />
        <text
          x="238"
          y="92"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill="#7c5cfc"
        >
          {"\u30ab\u30ec\u30f3\u30c0\u30fc"}
        </text>
        {["\u6708 10:00", "\u6c34 14:00", "\u91d1 11:00"].map((t, i) => (
          <g key={i}>
            <rect
              x="190"
              y={102 + i * 24}
              width="96"
              height="18"
              rx="5"
              fill="white"
              stroke="#c9bef5"
              strokeWidth="1"
            />
            <text
              x="238"
              y={115 + i * 24}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#7c5cfc"
            >
              {t}
            </text>
          </g>
        ))}
        {/* AI Chat */}
        <rect
          x="308"
          y="55"
          width="100"
          height="130"
          rx="10"
          fill="#e5f8f2"
          stroke="#12a37d"
          strokeWidth="1"
        />
        <SvgIcon d={ICON.chat} x={358} y={73} size={16} color="#12a37d" />
        <text
          x="358"
          y="92"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill="#12a37d"
        >
          {"AI\u30c1\u30e3\u30c3\u30c8"}
        </text>
        <rect x="318" y="102" width="80" height="26" rx="5" fill="white" />
        <text x="358" y="119" textAnchor="middle" fontSize="8" fill="#6e7494">
          {"\u7591\u554f\u70b9\u3092\u89e3\u6d88"}
        </text>
        <rect x="318" y="136" width="80" height="26" rx="5" fill="white" />
        <text x="358" y="153" textAnchor="middle" fontSize="8" fill="#12a37d">
          {"\u96e2\u8131\u3092\u9632\u6b62"}
        </text>
      </svg>
    </div>
  );
}

function DiagramPopup() {
  return (
    <div className="diagram">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 420 210"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        <defs>
          <filter id="popShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.08" />
          </filter>
        </defs>
        {/* Browser */}
        <rect
          x="10"
          y="10"
          width="170"
          height="190"
          rx="14"
          fill="#fafafa"
          stroke="#dfe3f0"
          strokeWidth="2"
        />
        <rect x="10" y="10" width="170" height="26" rx="14" fill="#f4f6fb" />
        <circle cx="28" cy="23" r="4" fill="#e0475b" />
        <circle cx="40" cy="23" r="4" fill="#f59e0b" />
        <circle cx="52" cy="23" r="4" fill="#12a37d" />
        <text
          x="95"
          y="56"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#6e7494"
        >
          {"\u8a2a\u554f\u8005\u304c\u95b2\u89a7\u4e2d..."}
        </text>
        <rect x="26" y="66" width="138" height="8" rx="3" fill="#eaedfa" />
        <rect x="26" y="80" width="110" height="8" rx="3" fill="#eaedfa" />
        <rect x="26" y="94" width="124" height="8" rx="3" fill="#eaedfa" />
        {/* AI analyzing */}
        <text
          x="95"
          y="130"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#d03ea1"
        >
          {"AI\u304c\u30da\u30fc\u30b8\u3092\u5206\u6790"}
        </text>
        <rect x="30" y="138" width="130" height="7" rx="3" fill="#d03ea110" />
        <rect x="30" y="138" width="80" height="7" rx="3" fill="#d03ea1">
          <animate
            attributeName="width"
            from="20"
            to="130"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        {/* Arrow */}
        <line
          x1="185"
          y1="105"
          x2="220"
          y2="105"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="220,100 230,105 220,110" fill="#c8cedf" />
        {/* Popup */}
        <rect
          x="234"
          y="20"
          width="175"
          height="175"
          rx="16"
          fill="white"
          stroke="#d03ea1"
          strokeWidth="2"
          filter="url(#popShadow)"
        />
        <text
          x="321"
          y="48"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#0f1128"
        >
          {"\u304a\u3059\u3059\u3081\u8cc7\u6599"}
        </text>
        <rect
          x="250"
          y="58"
          width="143"
          height="34"
          rx="8"
          fill="#d03ea108"
          stroke="#d03ea140"
          strokeWidth="1"
        />
        <SvgIcon d={ICON.doc} x={264} y={75} size={14} color="#d03ea1" />
        <text x="286" y="74" fontSize="9" fontWeight="700" fill="#0f1128">
          {"\u5c0e\u5165\u4e8b\u4f8b\u96c6"}
        </text>
        <text x="286" y="86" fontSize="8" fill="#6e7494">
          {"\u3053\u306e\u30da\u30fc\u30b8\u306b\u6700\u9069"}
        </text>
        <rect
          x="250"
          y="98"
          width="143"
          height="34"
          rx="8"
          fill="#d03ea108"
          stroke="#d03ea140"
          strokeWidth="1"
        />
        <SvgIcon
          d="M18 20V10a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v10M12 4v12M4 14h16"
          x={264}
          y={115}
          size={14}
          color="#d03ea1"
        />
        <text x="286" y="114" fontSize="9" fontWeight="700" fill="#0f1128">
          {"\u6599\u91d1\u6bd4\u8f03\u8868"}
        </text>
        <text x="286" y="126" fontSize="8" fill="#6e7494">
          {"\u691c\u8a0e\u4e2d\u306e\u65b9\u3078"}
        </text>
        <rect x="262" y="142" width="135" height="28" rx="8" fill="#12a37d" />
        <text
          x="329"
          y="161"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="white"
        >
          {"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9 \u2192"}
        </text>
      </svg>
    </div>
  );
}

function DiagramCalendarURL() {
  return (
    <div className="diagram">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 430 210"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        {/* Email */}
        <rect
          x="10"
          y="10"
          width="160"
          height="190"
          rx="14"
          fill="white"
          stroke="#e0475b"
          strokeWidth="2"
        />
        <text
          x="90"
          y="38"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill="#0f1128"
        >
          {"\u55b6\u696d\u30e1\u30fc\u30eb"}
        </text>
        <rect x="26" y="50" width="128" height="8" rx="3" fill="#eaedfa" />
        <rect x="26" y="64" width="105" height="8" rx="3" fill="#eaedfa" />
        <rect x="26" y="78" width="118" height="8" rx="3" fill="#eaedfa" />
        {/* Calendar link */}
        <rect
          x="26"
          y="98"
          width="128"
          height="32"
          rx="8"
          fill="#e0475b10"
          stroke="#e0475b"
          strokeWidth="1.5"
        />
        <SvgIcon d={ICON.cal} x={48} y={114} size={13} color="#e0475b" />
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#e0475b"
        >
          {"\u65e5\u7a0b\u3092\u9078\u3076 \u2192"}
        </text>
        <rect x="26" y="140" width="128" height="8" rx="3" fill="#eaedfa" />
        <rect x="26" y="154" width="90" height="8" rx="3" fill="#eaedfa" />
        {/* Arrow */}
        <line
          x1="175"
          y1="105"
          x2="210"
          y2="105"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="210,100 220,105 210,110" fill="#c8cedf" />
        {/* Calendar + AI */}
        <rect
          x="224"
          y="10"
          width="196"
          height="190"
          rx="16"
          fill="white"
          stroke="#e0475b"
          strokeWidth="2"
        />
        <text
          x="322"
          y="38"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#0f1128"
        >
          {"\u30ab\u30ec\u30f3\u30c0\u30fc + AI"}
        </text>
        {/* Calendar side */}
        <rect
          x="234"
          y="50"
          width="86"
          height="134"
          rx="10"
          fill="#fef2f2"
          stroke="#e0475b"
          strokeWidth="1"
        />
        <SvgIcon d={ICON.cal} x={277} y={66} size={14} color="#e0475b" />
        {["\u6708 10:00", "\u6c34 15:00", "\u91d1 13:00"].map((t, i) => (
          <g key={i}>
            <rect
              x="242"
              y={82 + i * 28}
              width="70"
              height="20"
              rx="5"
              fill="white"
              stroke="#fca5a5"
              strokeWidth="1"
            />
            <text
              x="277"
              y={96 + i * 28}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#e0475b"
            >
              {t}
            </text>
          </g>
        ))}
        {/* AI chat side */}
        <rect
          x="328"
          y="50"
          width="82"
          height="134"
          rx="10"
          fill="#e5f8f2"
          stroke="#12a37d"
          strokeWidth="1"
        />
        <SvgIcon d={ICON.chat} x={369} y={66} size={14} color="#12a37d" />
        <rect x="336" y="82" width="66" height="24" rx="5" fill="white" />
        <text x="369" y="98" textAnchor="middle" fontSize="8" fill="#6e7494">
          {"\u4e0d\u5b89\u3092\u89e3\u6d88"}
        </text>
        <rect x="336" y="112" width="66" height="24" rx="5" fill="white" />
        <text x="369" y="128" textAnchor="middle" fontSize="8" fill="#12a37d">
          {"\u96e2\u8131\u9632\u6b62"}
        </text>
        <rect x="336" y="144" width="66" height="24" rx="5" fill="#12a37d" />
        <text
          x="369"
          y="160"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="white"
        >
          {"\u5546\u8ac7\u78ba\u5b9a"}
        </text>
      </svg>
    </div>
  );
}

function DiagramPDF() {
  return (
    <div className="diagram">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 430 210"
        fill="none"
        style={{ maxWidth: 600 }}
      >
        {/* PDF doc */}
        <rect
          x="20"
          y="10"
          width="140"
          height="180"
          rx="10"
          fill="white"
          stroke="#c026d3"
          strokeWidth="2"
        />
        <rect x="20" y="10" width="140" height="32" rx="10" fill="#c026d310" />
        <text
          x="90"
          y="31"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#c026d3"
        >
          {" PDF \u8cc7\u6599"}
        </text>
        <rect x="36" y="52" width="108" height="6" rx="3" fill="#eaedfa" />
        <rect x="36" y="64" width="92" height="6" rx="3" fill="#eaedfa" />
        <rect x="36" y="76" width="100" height="6" rx="3" fill="#eaedfa" />
        <rect x="36" y="88" width="80" height="6" rx="3" fill="#eaedfa" />
        {/* QR / URL */}
        <rect
          x="36"
          y="106"
          width="48"
          height="48"
          rx="6"
          fill="#c026d310"
          stroke="#c026d3"
          strokeWidth="1"
        />
        <text
          x="60"
          y="136"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#c026d3"
        >
          QR
        </text>
        <rect x="92" y="106" width="56" height="20" rx="4" fill="#c026d3" />
        <text
          x="120"
          y="120"
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          fill="white"
        >
          {"\u5546\u8ac7\u4e88\u7d04 \u2192"}
        </text>
        <text x="120" y="142" textAnchor="middle" fontSize="7" fill="#6e7494">
          {"\u8aad\u8005 = \u71b1\u91cf\u9ad8"}
        </text>
        {/* Arrow */}
        <line
          x1="168"
          y1="100"
          x2="210"
          y2="100"
          stroke="#c8cedf"
          strokeWidth="2"
          strokeDasharray="6 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <polygon points="210,95 220,100 210,105" fill="#c8cedf" />
        {/* Booking page */}
        <rect
          x="230"
          y="20"
          width="180"
          height="160"
          rx="14"
          fill="white"
          stroke="#c026d3"
          strokeWidth="2"
        />
        <text
          x="320"
          y="50"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#0f1128"
        >
          {"\u5546\u8ac7\u4e88\u7d04\u30da\u30fc\u30b8"}
        </text>
        <SvgIcon d={ICON.cal} x={320} y={80} size={28} color="#c026d3" />
        <rect x="272" y="106" width="96" height="24" rx="8" fill="#c026d3" />
        <text
          x="320"
          y="122"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="white"
        >
          {"\u4e88\u7d04\u78ba\u5b9a"}
        </text>
        <text x="320" y="152" textAnchor="middle" fontSize="8" fill="#6e7494">
          {"\u76f4\u63a5\u8a98\u5c0e\u3067\u9ad8CV"}
        </text>
      </svg>
    </div>
  );
}

function DiagramAIConcierge() {
  const channels = [
    { label: "AI \u30e1\u30fc\u30eb", color: "#12a37d", icon: ICON.mail },
    {
      label: "\u8cc7\u6599DL\u30bb\u30f3\u30bf\u30fc",
      color: "#3b6ff5",
      icon: ICON.doc,
    },
    {
      label: "\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",
      color: "#7c5cfc",
      icon: ICON.bookmark,
    },
    {
      label: "AI \u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",
      color: "#d03ea1",
      icon: ICON.bell,
    },
    {
      label: "\u30e1\u30fc\u30eb\u30ab\u30ec\u30f3\u30c0\u30fc",
      color: "#e0475b",
      icon: ICON.cal,
    },
    { label: "PDF\u30fb\u8cc7\u6599\u5185", color: "#c026d3", icon: ICON.doc },
  ];
  return (
    <svg
      width="100%"
      viewBox="0 0 900 480"
      fill="none"
      style={{ maxWidth: 900, margin: "0 auto", display: "block" }}
    >
      <defs>
        <filter id="concShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodOpacity=".08" />
        </filter>
        <linearGradient id="concGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12a37d" />
          <stop offset="100%" stopColor="#0fc19a" />
        </linearGradient>
      </defs>

      {/* Left: 6 channel sources */}
      {channels.map((ch, i) => {
        const y = 40 + i * 58;
        return (
          <g key={i}>
            <g filter="url(#concShadow)">
              <rect
                x="10"
                y={y}
                width="150"
                height="42"
                rx="10"
                fill="white"
                stroke={ch.color}
                strokeWidth="1.5"
              />
              <g transform={`translate(22,${y + 9})`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={ch.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ch.icon} />
                </svg>
              </g>
              <text
                x="52"
                y={y + 27}
                fontSize="11"
                fontWeight="700"
                fill="#0f1128"
                fontFamily="var(--fb)"
              >
                {ch.label}
              </text>
            </g>
            <line
              x1="165"
              y1={y + 21}
              x2="220"
              y2={y + 21}
              stroke={ch.color}
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity=".4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="14"
                to="0"
                dur={`${1.2 + i * 0.1}s`}
                repeatCount="indefinite"
              />
            </line>
            <circle r="2.5" fill={ch.color} opacity=".6">
              <animateMotion
                dur={`${1.8 + i * 0.12}s`}
                repeatCount="indefinite"
                path={`M165,${y + 21} L220,${y + 21}`}
              />
            </circle>
          </g>
        );
      })}

      {/* Main panel: AI Chat (left) + Calendar (right) merged */}
      <g filter="url(#concShadow)">
        {/* Outer container */}
        <rect
          x="230"
          y="20"
          width="650"
          height="420"
          rx="16"
          fill="white"
          stroke="var(--border)"
          strokeWidth="1.5"
        />

        {/* AI Chat header (left half) — rectangular */}
        <rect x="231" y="21" width="338" height="48" rx="0" fill="#e5f8f2" />
        {/* Top-left corner clip */}
        <rect x="231" y="21" width="16" height="16" rx="16" fill="#e5f8f2" />
        <rect x="231" y="29" width="16" height="8" fill="#e5f8f2" />
        <rect x="239" y="21" width="8" height="16" fill="#e5f8f2" />
        <SvgIcon d={ICON.chat} x={380} y={44} size={18} color="#12a37d" />
        <text
          x="400"
          y="52"
          fontSize="13"
          fontWeight="800"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {"AI \u30b3\u30f3\u30b7\u30a7\u30eb\u30b8\u30e5"}
        </text>

        {/* Divider line */}
        <line
          x1="570"
          y1="36"
          x2="570"
          y2="424"
          stroke="#dfe3f0"
          strokeWidth="1"
        />

        {/* Calendar header (right half) — rectangular */}
        <rect x="571" y="21" width="308" height="48" rx="0" fill="#f0ecfe" />
        {/* Top-right corner clip */}
        <rect x="863" y="21" width="16" height="16" rx="16" fill="#f0ecfe" />
        <rect x="863" y="29" width="16" height="8" fill="#f0ecfe" />
        <rect x="855" y="21" width="16" height="16" fill="#f0ecfe" />
        <SvgIcon d={ICON.cal} x={710} y={44} size={18} color="#7c5cfc" />
        <text
          x="730"
          y="52"
          fontSize="13"
          fontWeight="800"
          fill="#7c5cfc"
          fontFamily="var(--fb)"
        >
          {"\u65e5\u7a0b\u9078\u629e"}
        </text>
      </g>

      {/* Chat conversation */}
      {/* AI greeting */}
      <g
        style={{
          animation: "chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="254"
          y="86"
          width="290"
          height="38"
          rx="12"
          fill="#e5f8f2"
          stroke="rgba(18,163,125,.15)"
          strokeWidth="1"
        />
        <text
          x="268"
          y="110"
          fontSize="10"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u65e5\u6642\u4e88\u7d04\u524d\u306b\u805e\u304d\u305f\u3044\u3053\u3068\u306f\u3054\u3056\u3044\u307e\u3059\u304b\uff1f"
          }
        </text>
      </g>
      {/* User question */}
      <g
        style={{
          animation: "chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="340"
          y="140"
          width="204"
          height="38"
          rx="12"
          fill="#f0ecfe"
          stroke="#c9bef5"
          strokeWidth="1"
        />
        <text
          x="354"
          y="164"
          fontSize="10"
          fontWeight="600"
          fill="#7c5cfc"
          fontFamily="var(--fb)"
        >
          {
            "\u6599\u91d1\u30d7\u30e9\u30f3\u306b\u3064\u3044\u3066\u77e5\u308a\u305f\u3044\u3067\u3059"
          }
        </text>
      </g>
      {/* AI answer */}
      <g
        style={{
          animation: "chatPop .5s 2.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="254"
          y="194"
          width="300"
          height="52"
          rx="12"
          fill="#e5f8f2"
          stroke="rgba(18,163,125,.15)"
          strokeWidth="1"
        />
        <text
          x="268"
          y="216"
          fontSize="10"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u5fa1\u793e\u306e\u898f\u6a21\u3067\u3059\u3068\u30b9\u30bf\u30f3\u30c0\u30fc\u30c9\u30d7\u30e9\u30f3\u304c"
          }
        </text>
        <text
          x="268"
          y="232"
          fontSize="10"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u6700\u9069\u3067\u3059\u3002\u8a73\u3057\u304f\u306f\u5546\u8ac7\u3067\u3054\u8aac\u660e\u3057\u307e\u3059\uff01"
          }
        </text>
      </g>
      {/* AI nudge */}
      <g
        style={{
          animation: "chatPop .5s 3.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="254"
          y="262"
          width="280"
          height="38"
          rx="12"
          fill="#e5f8f2"
          stroke="rgba(18,163,125,.15)"
          strokeWidth="1"
        />
        <text
          x="268"
          y="286"
          fontSize="10"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u53f3\u306e\u30ab\u30ec\u30f3\u30c0\u30fc\u304b\u3089\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u3092\u3069\u3046\u305e\uff01"
          }
        </text>
      </g>

      {/* Calendar time slots */}
      {[
        { day: "\u6708\u66dc\u65e5", time: "10:00", sel: false },
        { day: "\u6c34\u66dc\u65e5", time: "14:00", sel: false },
        { day: "\u91d1\u66dc\u65e5", time: "11:00", sel: true },
        { day: "\u6765\u9031\u706b", time: "15:00", sel: false },
      ].map((slot, i) => (
        <g key={i}>
          <rect
            x="590"
            y={90 + i * 56}
            width="270"
            height="42"
            rx="10"
            fill={slot.sel ? "#7c5cfc" : "white"}
            stroke={slot.sel ? "#7c5cfc" : "#dfe3f0"}
            strokeWidth={slot.sel ? 2 : 1.5}
          />
          <text
            x="612"
            y={116 + i * 56}
            fontSize="11"
            fontWeight="700"
            fill={slot.sel ? "white" : "#0f1128"}
            fontFamily="var(--fb)"
          >
            {slot.day}
          </text>
          <text
            x="838"
            y={116 + i * 56}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill={slot.sel ? "rgba(255,255,255,.85)" : "#6e7494"}
            fontFamily="var(--fm)"
          >
            {slot.time}
          </text>
          {slot.sel && (
            <SvgIcon
              d="M20 6L9 17l-5-5"
              x={848}
              y={106 + i * 56}
              size={14}
              color="white"
            />
          )}
        </g>
      ))}

      {/* Booking confirmed button */}
      <g
        style={{
          animation: "chatPop .5s 4.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="254"
          y="316"
          width="300"
          height="44"
          rx="12"
          fill="url(#concGrad)"
        />
        <text
          x="404"
          y="343"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill="white"
          fontFamily="var(--fb)"
        >
          {
            "\u2713 \u91d1\u66dc\u65e5 11:00 \u3067\u5546\u8ac7\u78ba\u5b9a\uff01"
          }
        </text>
        <rect
          x="254"
          y="316"
          width="300"
          height="44"
          rx="12"
          fill="none"
          stroke="#12a37d"
          strokeWidth="2"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;.5;0"
            dur="2s"
            begin="5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Bottom: label + stats */}
      <g>
        <text
          x="400"
          y="400"
          textAnchor="middle"
          fontSize="10"
          fill="#6e7494"
          fontFamily="var(--fb)"
        >
          {
            "\u2190 AI\u304c\u7591\u554f\u3092\u89e3\u6d88\u3057\u3066\u304b\u3089\u4e88\u7d04\u3078\u8a98\u5c0e"
          }
        </text>
        <rect
          x="300"
          y="418"
          width="100"
          height="32"
          rx="8"
          fill="#f0ecfe"
          stroke="#c9bef5"
          strokeWidth="1"
        />
        <text
          x="350"
          y="439"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#7c5cfc"
          fontFamily="var(--fb)"
        >
          {"\u96e2\u8131\u7387 -40%"}
        </text>
        <rect
          x="416"
          y="418"
          width="100"
          height="32"
          rx="8"
          fill="#e5f8f2"
          stroke="#b8e6d8"
          strokeWidth="1"
        />
        <text
          x="466"
          y="439"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {"\u4e88\u7d04\u7387 +35%"}
        </text>
      </g>
    </svg>
  );
}

function DiagramAIConciergeMobile() {
  const channels = [
    { label: "AI \u30e1\u30fc\u30eb", color: "#12a37d", icon: ICON.mail },
    {
      label: "\u8cc7\u6599DL\u30bb\u30f3\u30bf\u30fc",
      color: "#3b6ff5",
      icon: ICON.doc,
    },
    {
      label: "\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",
      color: "#7c5cfc",
      icon: ICON.bookmark,
    },
    {
      label: "AI \u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",
      color: "#d03ea1",
      icon: ICON.bell,
    },
    {
      label: "\u30e1\u30fc\u30eb\u30ab\u30ec\u30f3\u30c0\u30fc",
      color: "#e0475b",
      icon: ICON.cal,
    },
    { label: "PDF\u30fb\u8cc7\u6599\u5185", color: "#c026d3", icon: ICON.doc },
  ];
  return (
    <svg
      width="100%"
      viewBox="0 0 380 820"
      fill="none"
      style={{ maxWidth: 400, margin: "0 auto", display: "block" }}
    >
      <defs>
        <filter id="concShadowM">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodOpacity=".08" />
        </filter>
        <linearGradient id="concGradM" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12a37d" />
          <stop offset="100%" stopColor="#0fc19a" />
        </linearGradient>
      </defs>

      {/* Channel sources - 2 columns */}
      {channels.map((ch, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 10 : 195;
        const y = 10 + row * 50;
        return (
          <g key={i}>
            <g filter="url(#concShadowM)">
              <rect
                x={x}
                y={y}
                width="170"
                height="40"
                rx="10"
                fill="white"
                stroke={ch.color}
                strokeWidth="1.5"
              />
              <g transform={`translate(${x + 12},${y + 8})`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={ch.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ch.icon} />
                </svg>
              </g>
              <text
                x={x + 42}
                y={y + 26}
                fontSize="12"
                fontWeight="700"
                fill="#0f1128"
                fontFamily="var(--fb)"
              >
                {ch.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* Converging arrows */}
      {channels.map((ch, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 95 : 280;
        const y = 10 + row * 50 + 40;
        return (
          <line
            key={`arrow-${i}`}
            x1={x}
            y1={y}
            x2="190"
            y2="175"
            stroke={ch.color}
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity=".3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="14"
              to="0"
              dur={`${1.2 + i * 0.1}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}
      <circle cx="190" cy="175" r="4" fill="#12a37d" />

      {/* Arrow down */}
      <line
        x1="190"
        y1="182"
        x2="190"
        y2="205"
        stroke="#12a37d"
        strokeWidth="2"
        strokeDasharray="4 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="14"
          to="0"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
      <polygon points="185,203 190,213 195,203" fill="#12a37d" />

      {/* AI Chat panel */}
      <g filter="url(#concShadowM)">
        <rect
          x="20"
          y="220"
          width="340"
          height="300"
          rx="16"
          fill="white"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        {/* Header */}
        <rect x="21" y="221" width="338" height="44" rx="0" fill="#e5f8f2" />
        <rect x="21" y="221" width="16" height="16" rx="16" fill="#e5f8f2" />
        <rect x="21" y="229" width="16" height="8" fill="#e5f8f2" />
        <rect x="29" y="221" width="8" height="16" fill="#e5f8f2" />
        <rect x="343" y="221" width="16" height="16" rx="16" fill="#e5f8f2" />
        <rect x="343" y="229" width="16" height="8" fill="#e5f8f2" />
        <rect x="335" y="221" width="16" height="16" fill="#e5f8f2" />
        <SvgIcon d={ICON.chat} x={160} y={242} size={18} color="#12a37d" />
        <text
          x="180"
          y="249"
          fontSize="14"
          fontWeight="800"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {"AI \u30b3\u30f3\u30b7\u30a7\u30eb\u30b8\u30e5"}
        </text>
      </g>

      {/* Chat bubbles */}
      <g
        style={{
          animation: "chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="40"
          y="280"
          width="260"
          height="36"
          rx="12"
          fill="#e5f8f2"
          stroke="rgba(18,163,125,.15)"
          strokeWidth="1"
        />
        <text
          x="54"
          y="303"
          fontSize="12"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u65e5\u6642\u4e88\u7d04\u524d\u306b\u805e\u304d\u305f\u3044\u3053\u3068\u306f\u3054\u3056\u3044\u307e\u3059\u304b\uff1f"
          }
        </text>
      </g>
      <g
        style={{
          animation: "chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="140"
          y="328"
          width="200"
          height="36"
          rx="12"
          fill="#f0ecfe"
          stroke="#c9bef5"
          strokeWidth="1"
        />
        <text
          x="154"
          y="351"
          fontSize="12"
          fontWeight="600"
          fill="#7c5cfc"
          fontFamily="var(--fb)"
        >
          {
            "\u6599\u91d1\u30d7\u30e9\u30f3\u306b\u3064\u3044\u3066\u77e5\u308a\u305f\u3044\u3067\u3059"
          }
        </text>
      </g>
      <g
        style={{
          animation: "chatPop .5s 2.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="40"
          y="376"
          width="280"
          height="50"
          rx="12"
          fill="#e5f8f2"
          stroke="rgba(18,163,125,.15)"
          strokeWidth="1"
        />
        <text
          x="54"
          y="398"
          fontSize="12"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u5fa1\u793e\u306e\u898f\u6a21\u3067\u3059\u3068\u30b9\u30bf\u30f3\u30c0\u30fc\u30c9\u30d7\u30e9\u30f3\u304c"
          }
        </text>
        <text
          x="54"
          y="416"
          fontSize="12"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u6700\u9069\u3067\u3059\u3002\u8a73\u3057\u304f\u306f\u5546\u8ac7\u3067\u3054\u8aac\u660e\u3057\u307e\u3059\uff01"
          }
        </text>
      </g>
      <g
        style={{
          animation: "chatPop .5s 3.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="40"
          y="438"
          width="260"
          height="36"
          rx="12"
          fill="#e5f8f2"
          stroke="rgba(18,163,125,.15)"
          strokeWidth="1"
        />
        <text
          x="54"
          y="461"
          fontSize="12"
          fontWeight="600"
          fill="#12a37d"
          fontFamily="var(--fb)"
        >
          {
            "\u4e0b\u306e\u30ab\u30ec\u30f3\u30c0\u30fc\u304b\u3089\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u3092\u3069\u3046\u305e\uff01"
          }
        </text>
      </g>

      {/* Booking confirmed */}
      <g
        style={{
          animation: "chatPop .5s 4.2s cubic-bezier(.16,1,.3,1) forwards",
          opacity: 0,
        }}
      >
        <rect
          x="40"
          y="486"
          width="300"
          height="40"
          rx="12"
          fill="url(#concGradM)"
        />
        <text
          x="190"
          y="511"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill="white"
          fontFamily="var(--fb)"
        >
          {
            "\u2713 \u91d1\u66dc\u65e5 11:00 \u3067\u5546\u8ac7\u78ba\u5b9a\uff01"
          }
        </text>
      </g>

      {/* Arrow down to calendar */}
      <line
        x1="190"
        y1="530"
        x2="190"
        y2="555"
        stroke="#7c5cfc"
        strokeWidth="2"
        strokeDasharray="4 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="14"
          to="0"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
      <polygon points="185,553 190,563 195,553" fill="#7c5cfc" />

      {/* Calendar panel */}
      <g filter="url(#concShadowM)">
        <rect
          x="20"
          y="570"
          width="340"
          height="200"
          rx="16"
          fill="white"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <rect x="21" y="571" width="338" height="44" rx="0" fill="#f0ecfe" />
        <rect x="21" y="571" width="16" height="16" rx="16" fill="#f0ecfe" />
        <rect x="21" y="579" width="16" height="8" fill="#f0ecfe" />
        <rect x="29" y="571" width="8" height="16" fill="#f0ecfe" />
        <rect x="343" y="571" width="16" height="16" rx="16" fill="#f0ecfe" />
        <rect x="343" y="579" width="16" height="8" fill="#f0ecfe" />
        <rect x="335" y="571" width="16" height="16" fill="#f0ecfe" />
        <SvgIcon d={ICON.cal} x={160} y={592} size={18} color="#7c5cfc" />
        <text
          x="180"
          y="599"
          fontSize="14"
          fontWeight="800"
          fill="#7c5cfc"
          fontFamily="var(--fb)"
        >
          {"\u65e5\u7a0b\u9078\u629e"}
        </text>
      </g>

      {/* Calendar slots */}
      {[
        { day: "\u6708\u66dc\u65e5", time: "10:00", sel: false },
        { day: "\u6c34\u66dc\u65e5", time: "14:00", sel: false },
        { day: "\u91d1\u66dc\u65e5", time: "11:00", sel: true },
        { day: "\u6765\u9031\u706b", time: "15:00", sel: false },
      ].map((slot, i) => (
        <g key={i}>
          <rect
            x="40"
            y={624 + i * 38}
            width="300"
            height="32"
            rx="10"
            fill={slot.sel ? "#7c5cfc" : "white"}
            stroke={slot.sel ? "#7c5cfc" : "#dfe3f0"}
            strokeWidth={slot.sel ? 2 : 1.5}
          />
          <text
            x="58"
            y={644 + i * 38}
            fontSize="13"
            fontWeight="700"
            fill={slot.sel ? "white" : "#0f1128"}
            fontFamily="var(--fb)"
          >
            {slot.day}
          </text>
          <text
            x="320"
            y={644 + i * 38}
            textAnchor="end"
            fontSize="13"
            fontWeight="600"
            fill={slot.sel ? "rgba(255,255,255,.85)" : "#6e7494"}
            fontFamily="var(--fm)"
          >
            {slot.time}
          </text>
          {slot.sel && (
            <SvgIcon
              d="M20 6L9 17l-5-5"
              x={330}
              y={634 + i * 38}
              size={14}
              color="white"
            />
          )}
        </g>
      ))}

      {/* Bottom stats */}
      <rect
        x="60"
        y="782"
        width="120"
        height="30"
        rx="8"
        fill="#f0ecfe"
        stroke="#c9bef5"
        strokeWidth="1"
      />
      <text
        x="120"
        y="802"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="#7c5cfc"
        fontFamily="var(--fb)"
      >
        {"\u96e2\u8131\u7387 -40%"}
      </text>
      <rect
        x="200"
        y="782"
        width="120"
        height="30"
        rx="8"
        fill="#e5f8f2"
        stroke="#b8e6d8"
        strokeWidth="1"
      />
      <text
        x="260"
        y="802"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="#12a37d"
        fontFamily="var(--fb)"
      >
        {"\u4e88\u7d04\u7387 +35%"}
      </text>
    </svg>
  );
}

const diagramComponents = [
  DiagramChatbot,
  DiagramEmail,
  DiagramDownloadCenter,
  DiagramThanksPage,
  DiagramPopup,
  DiagramCalendarURL,
  DiagramPDF,
];

function QualityFlowDiagram_UNUSED() {
  const card: React.CSSProperties = { borderRadius: 18, padding: "20px 18px" };
  const stepLabel: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 8,
  };
  const bubble: React.CSSProperties = {
    borderRadius: 10,
    padding: "6px 12px",
    fontSize: 11,
    lineHeight: 1.5,
  };
  const bubbleBot: React.CSSProperties = {
    ...bubble,
    background: "white",
    border: "1px solid #c8cedf",
    color: "#333",
  };
  const bubbleUser: React.CSSProperties = {
    ...bubble,
    background: "#12a37d",
    color: "white",
    alignSelf: "flex-end",
  };

  return (
    <div style={{ marginTop: 48, padding: "32px 0" }}>
      <div className="qflow-hz">
        {/* STEP 1 */}
        <div
          className="qflow-hz-step"
          style={{
            ...card,
            background: "#e5f8f2",
            border: "2px solid #12a37d",
          }}
        >
          <div style={{ ...stepLabel, color: "#12a37d" }}>
            STEP 1 — 事前ヒアリング
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#555",
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            必要項目の入力に誘導。基準を満たしたリードのみ次へ。
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={bubbleBot}>ご検討中の課題を教えてください</div>
            <div style={bubbleUser}>リード獲得を自動化したい</div>
            <div style={bubbleBot}>現在のチーム規模は？</div>
            <div style={bubbleUser}>5名で運用中です</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* Gate */}
        <div className="qflow-hz-gate">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#f0ecfe",
              border: "2px dashed #7c5cfc",
              borderRadius: 12,
              padding: "14px 18px",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7c5cfc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
            </svg>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#7c5cfc",
                letterSpacing: 1,
              }}
            >
              基準通過
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* STEP 2 */}
        <div
          className="qflow-hz-step"
          style={{
            ...card,
            background: "#eaf0fe",
            border: "2px solid #3b6ff5",
          }}
        >
          <div style={{ ...stepLabel, color: "#3b6ff5" }}>
            STEP 2 — 商談日時の確定
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={bubbleBot}>下記日程でご都合はいかがですか？</div>
            <div
              style={{
                ...bubble,
                background: "white",
                border: "1px solid #3b6ff5",
                color: "#3b6ff5",
                fontSize: 10,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span>📅 3/10 14:00</span>
              <span>📅 3/11 10:00</span>
              <span>📅 3/12 15:00</span>
            </div>
            <div style={bubbleUser}>3/10 14:00でお願いします</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* STEP 3 */}
        <div
          className="qflow-hz-step"
          style={{
            ...card,
            background: "#f0ecfe",
            border: "2px solid #7c5cfc",
          }}
        >
          <div style={{ ...stepLabel, color: "#7c5cfc" }}>
            STEP 3 — 追加アンケート
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#555",
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            商談準備に必要な情報を取得。
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={bubbleBot}>ご利用中のツールは？</div>
            <div style={bubbleUser}>HubSpotを使っています</div>
            <div style={bubbleBot}>導入の優先度は？</div>
            <div style={bubbleUser}>今四半期中に導入したい</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* Result */}
        <div
          className="qflow-hz-step"
          style={{
            ...card,
            background: "#12a37d",
            border: "2px solid #12a37d",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={ICON.users} />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>
              営業チームへ
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 10,
                color: "white",
                fontWeight: 600,
              }}
            >
              CRM自動登録
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 10,
                color: "white",
                fontWeight: 600,
              }}
            >
              即日通知
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 10,
                color: "white",
                fontWeight: 600,
              }}
            >
              ヒアリング内容共有
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <div key={i} style={{
          background:"rgba(255,255,255,.9)",
          backdropFilter:"blur(16px)",
          borderRadius:20,
          padding:"clamp(24px,3vw,36px) clamp(20px,2.5vw,28px)",
          textAlign:"center",
          border:"1px solid rgba(0,0,0,.05)",
          boxShadow:`0 8px 32px rgba(0,0,0,.06), 0 1px 0 rgba(255,255,255,.8) inset`,
          transition:"transform .3s, box-shadow .3s",
        }}>
          <div style={{
            fontFamily:"var(--fm)",
            fontSize:"clamp(48px,7vw,72px)",
            fontWeight:800,
            background:s.gradient,
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            letterSpacing:-2,
            lineHeight:1,
          }}>
            {vals[i]}<span style={{fontSize:"clamp(18px,2.5vw,28px)",fontWeight:700,letterSpacing:0}}>{s.suffix}</span>
          </div>
          <div style={{
            fontSize:"clamp(14px,1.5vw,16px)",
            fontWeight:800,
            color:"var(--heading)",
            marginTop:8,
          }}>{s.label}</div>
          <div style={{
            fontSize:"clamp(11px,1.2vw,13px)",
            color:"var(--sub)",
            marginTop:4,
            fontWeight:500,
          }}>{s.desc}</div>
        </div>
      ))}
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
          <div className="anim d1 hero-badge">
            <div className="hero-badge-dot" />
            {isLp
              ? (lpVariant === "trial"
                ? "14日間無料トライアル"
                : "AI SDR で商談を自動獲得")
              : "日本唯一の最先端 AI SDR"}
          </div>
          <h1 className="anim d2">
            {lpHeadline ?? "AIが商談をつくる時代へ"}
          </h1>
          <p className="anim d3 hero-sub">
            {lpSubheadline ??
              "Web サイト・サンクスページ・メール — あらゆる接点に AI を配置。見込み客の関心が高いうちに、商談予約まで自動で完結します。"}
          </p>
          <div
            className="anim d4 hero-ctas"
            style={isLp ? { gap: 12 } : undefined}
          >
            <button
              className="btn btn-cta btn-cta-lg"
              onClick={() => openMeetingModal("hero")}
              style={isLp ? { padding: "20px 44px", fontSize: 19 } : undefined}
            >
              {isLp ? "無料デモを予約する" : "AIデモを体験"}
            </button>
            <button
              className="btn-ghost"
              onClick={() => openDocModal("hero")}
            >
              資料請求 →
            </button>
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
            Meeton ai が商談をつくる、
            <span style={{ color: "var(--cta)" }}>3 つの AI 機能</span>
          </div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto" }}>
            Chat / Calendar / Email — 3 つの AI が連動し、リード発見から商談獲得までを 24 時間自動で実行します。
          </p>

          <div className="phase-grid">
            {[
              {
                color: "#12a37d",
                gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
                label: "① AI CHAT",
                title: "AI チャット",
                desc: "サイト訪問者と対話し、商談予約まで会話で完結。ページ文脈に応じた声かけと、関心に合った資料の自動提案で、温度感に応じてカレンダー提示まで自動で行います。",
                features: [
                  { label: "ページ文脈に応じた自動声かけ", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { label: "閲覧ページに合わせて関連資料を自動提案", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" },
                  { label: "温度感に応じて商談予約まで誘導", icon: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
                ],
                link: "/features/ai-chat/",
              },
              {
                color: "#0891b2",
                gradient: "linear-gradient(135deg,#0891b2,#06b6d4)",
                label: "② AI CALENDAR",
                title: "AI カレンダー",
                desc: "チャット内・サンクスページ・メール経由で発動し、関心が高い瞬間を逃さずカレンダーを提示。割り振りルールを細かく設定でき、適切な担当者に自動アサインします。",
                features: [
                  { label: "チャット内・サンクスページ・メール経由で発動", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
                  { label: "割り振りルールを細かく設定可能", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" },
                  { label: "AI が事前ヒアリング・CRM 自動登録まで完了", icon: "M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z M9 22h6" },
                ],
                link: "/features/meetings/",
              },
              {
                color: "#7c5cfc",
                gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
                label: "③ AI EMAIL",
                title: "AI メール",
                desc: "離脱リードを自動で取り戻す。行動シグナルに応じた自動再接触、パーソナライズドメールで育成。メール内 URL から AI Calendar へ誘導し再度商談獲得。",
                features: [
                  { label: "高関心リードに即座にフォローアップ", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8" },
                  { label: "行動履歴をもとにパーソナライズ", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
                  { label: "未反応リードに自動再接触 → 商談予約", icon: "M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14" },
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
        </div>
      </section>

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
                1日8時間 / 手動フォロー / チャネルごとに別ツール<br/>リード対応の遅延 / 属人的な品質
              </div>
            </div>
            <div style={{ fontSize: 32, color: "var(--cta)", fontWeight: 900 }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--cta)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 2, fontFamily: "var(--fm)" }}>Meeton ai（AI SDR）</div>
              <div style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8 }}>
                24時間365日 / 自律フォロー / マルチチャネル<br/>即時レスポンス / 一貫した高品質対応
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON — vs Human SDR vs Chatbot (lazy-loaded in both modes) */}
      <ComparisonTable />

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
