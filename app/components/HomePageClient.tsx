'use client'

import { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

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
import HubSpotModal from "./HubSpotModal";
import HubSpotMeetingModal from "./HubSpotMeetingModal";

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
.cat-card{background:var(--bg);border:1px solid var(--border);border-radius:24px;padding:36px 32px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.cat-card:hover{border-color:transparent;transform:translateY(-6px);box-shadow:0 16px 48px rgba(18,163,125,.12)}
.cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .3s}
.cat-card:hover::before{opacity:1}
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
.qual-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.qual-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px;transition:all .35s;box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.qual-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.12)}
.qual-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.qual-card:hover::before{opacity:1}
.qual-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;font-size:26px;transition:all .35s}
.qual-card:hover .qual-icon{transform:scale(1.1) rotate(-3deg)}
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
.case-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px 36px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03);min-width:100%;max-width:100%;width:100%;flex-shrink:0;box-sizing:border-box;word-break:break-word;overflow:hidden}
.case-card:hover{box-shadow:0 8px 32px rgba(18,163,125,.08)}
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
@media(max-width:1024px){
  .cat-grid{grid-template-columns:1fr;max-width:560px;margin-left:auto;margin-right:auto}
  .qflow-hz{flex-direction:column;gap:0}
  .qflow-hz-arrow{width:auto;height:36px;transform:rotate(90deg)}
  .qflow-hz-gate{padding:8px 0}
  .qflow-hz-gate>div{writing-mode:horizontal-tb!important;flex-direction:row!important;padding:10px 20px!important}
  .qual-grid{grid-template-columns:1fr}
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
  .final-cta{padding:60px 20px 80px}
  .case-carousel{overflow:hidden;width:100%}
  .case-track{gap:0}
  .case-stats{gap:12px;flex-direction:column;align-items:center;width:100%}
  .case-stats>div{text-align:center;width:100%}
  .case-quote{padding:14px 16px;font-size:13px;line-height:1.7;box-sizing:border-box}
  .case-card{padding:20px 16px;min-width:100%;max-width:100%;width:100%;box-sizing:border-box;overflow:hidden}
  .case-logo{font-size:16px}
  .case-industry{font-size:11px;margin-bottom:14px}
  .case-stat-v{font-size:20px}
  .case-stat-l{font-size:10px}
  .btn-cta-lg{padding:14px 24px;font-size:16px;width:100%}
  .btn-ghost{padding:14px 24px;font-size:16px;width:100%}
  .feat-card-body{padding:24px 20px 20px}
  .feat-card-vis{min-height:180px}
  .qual-card{padding:24px}
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
    title: "Meeton ai \u30c1\u30e3\u30c3\u30c8\u30dc\u30c3\u30c8",
    desc: "\u8a2a\u554f\u8005\u3092\u5f85\u305f\u306a\u3044\u3002AI\u304c\u5148\u306b\u58f0\u3092\u304b\u3051\u3001\u30cb\u30fc\u30ba\u3092\u5f15\u304d\u51fa\u3057\u3001\u8cc7\u6599\u3092\u5c4a\u3051\u3001\u305d\u306e\u307e\u307e\u5546\u8ac7\u4e88\u7d04\u307e\u3067\u5b8c\u7d50\u3002\u901a\u5e38\u306e\u30a6\u30a7\u30d6\u30b5\u30a4\u30c8\u306f\u3082\u3061\u308d\u3093\u3001Google\u5e83\u544a\u30fbLinkedIn\u5e83\u544a\u7d4c\u7531\u306eLP\u306b\u3082\u8a2d\u7f6e\u3067\u304d\u308b\u306e\u3067\u3001\u5e83\u544a\u8cbb\u3092\u304b\u3051\u305f\u6d41\u5165\u3092\u53d6\u308a\u3053\u307c\u3055\u305a\u5546\u8ac7\u3078\u7e4b\u3052\u307e\u3059\u3002",
  },
  {
    num: "02",
    color: "#12a37d",
    bg: "#12a37d10",
    gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
    title: "Meeton ai \u30e1\u30fc\u30eb",
    desc: "\u30a4\u30f3\u30d0\u30a6\u30f3\u30c9\u30ea\u30fc\u30c9\u306b\u5bfe\u3057\u3066AI\u304c\u81ea\u52d5\u3067\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0\u30fb\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7\u3057\u3001\u5546\u8ac7\u78ba\u5b9a\u307e\u3067\u8a98\u5c0e\u3002\u30a6\u30a7\u30d3\u30ca\u30fc\u30fb\u30bb\u30df\u30ca\u30fc\u306e\u53c2\u52a0\u8005\u30ea\u30b9\u30c8\u3082CRM\u9023\u643a\u3084Webhook\u7d4c\u7531\u3067\u81ea\u52d5\u53d6\u308a\u8fbc\u307f\u3001\u30a4\u30d9\u30f3\u30c8\u76f4\u5f8c\u306e\u71b1\u91cf\u304c\u9ad8\u3044\u30bf\u30a4\u30df\u30f3\u30b0\u3092\u9003\u3057\u307e\u305b\u3093\u3002",
  },
  {
    num: "03",
    color: "#3b6ff5",
    bg: "#3b6ff510",
    gradient: "linear-gradient(135deg,#3b6ff5,#6690fa)",
    title: "Meeton ai \u8cc7\u6599\u30da\u30fc\u30b8",
    desc: "AI\u30b3\u30f3\u30b7\u30a7\u30eb\u30b8\u30e5\u4ed8\u304d\u306e\u8cc7\u6599\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30da\u30fc\u30b8\u3092\u30b5\u30a4\u30c8\u306b\u7c21\u5358\u8ffd\u52a0\u3002AI\u304c\u300c\u3069\u306e\u8cc7\u6599\u304c\u5408\u3046\u304b\u300d\u3092\u63d0\u6848\u3057\u306a\u304c\u3089\u3001\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u304b\u3089\u5546\u8ac7\u4e88\u7d04\u307e\u3067\u4e00\u6c17\u306b\u8a98\u5c0e\u3057\u307e\u3059\u3002",
  },
  {
    num: "04",
    color: "#7c5cfc",
    bg: "#7c5cfc10",
    gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
    title: "Meeton ai \u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",
    desc: "\u554f\u3044\u5408\u308f\u305b\u3084\u8cc7\u6599\u8acb\u6c42\u306e\u76f4\u5f8c\u2014\u2014\u6700\u3082\u71b1\u91cf\u304c\u9ad8\u3044\u77ac\u9593\u306b\u3001\u30ab\u30ec\u30f3\u30c0\u30fc\u3092\u63d0\u793a\u3002AI\u30c1\u30e3\u30c3\u30c8\u304c\u6a2a\u3067\u7591\u554f\u306b\u7b54\u3048\u308b\u306e\u3067\u3001\u300c\u3061\u3087\u3063\u3068\u8074\u304d\u305f\u3044\u3053\u3068\u304c\u3042\u308b\u3051\u3069\u2026\u300d\u3067\u96e2\u8131\u3055\u305b\u307e\u305b\u3093\u3002",
  },
  {
    num: "05",
    color: "#d03ea1",
    bg: "#d03ea110",
    gradient: "linear-gradient(135deg,#d03ea1,#e879b9)",
    title: "Meeton ai \u8cc7\u6599\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",
    desc: "\u300c\u4eca\u898b\u3066\u3044\u308b\u30da\u30fc\u30b8\u300d\u306b\u5408\u3063\u305f\u8cc7\u6599\u3092\u3001AI\u304c\u81ea\u52d5\u3067\u9078\u3073\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u63d0\u6848\u3002\u8cc7\u6599DL\u3092\u5165\u308a\u53e3\u306b\u3001\u81ea\u7136\u306a\u6d41\u308c\u3067\u5546\u8ac7\u7372\u5f97\u3078\u7e4b\u3052\u307e\u3059\u3002",
  },
  {
    num: "06",
    color: "#e0475b",
    bg: "#e0475b10",
    gradient: "linear-gradient(135deg,#e0475b,#f87171)",
    title: "Meeton ai \u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af",
    desc: "\u30a2\u30dd\u96fb\u5f8c\u306e\u8cc7\u6599\u9001\u4ed8\u3084\u65e5\u7a0b\u8abf\u6574\u30e1\u30fc\u30eb\u306b\u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af\u3092\u633f\u5165\u3002\u300c\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u306f\uff1f\u300d\u306e\u3084\u308a\u3068\u308a\u304c\u6d88\u3048\u3001\u30ef\u30f3\u30af\u30ea\u30c3\u30af\u3067\u5546\u8ac7\u78ba\u5b9a\u3002AI\u30c1\u30e3\u30c3\u30c8\u304c\u4e88\u7d04\u524d\u306e\u4e0d\u5b89\u3082\u89e3\u6d88\u3057\u307e\u3059\u3002",
  },
  {
    num: "07",
    color: "#c026d3",
    bg: "#c026d310",
    gradient: "linear-gradient(135deg,#c026d3,#d946ef)",
    title: "Meeton ai \u30ab\u30ec\u30f3\u30c0\u30fcQR",
    desc: "\u8cc7\u6599\u3092\u8aad\u3093\u3067\u3044\u308b\u4eba\u306f\u3001\u6700\u3082\u71b1\u91cf\u304c\u9ad8\u3044\u898b\u8fbc\u5ba2\u3002PDF\u5185\u306eURL\u3084QR\u30b3\u30fc\u30c9\u304b\u3089\u3001\u8aad\u3093\u3067\u3044\u308b\u305d\u306e\u77ac\u9593\u306b\u5546\u8ac7\u4e88\u7d04\u3078\u8a98\u5c0e\u3057\u307e\u3059\u3002",
  },
];

const qualityIcons = {
  filter: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" opacity=".15" fill="currentColor" stroke="none"/>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  hearing: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" opacity=".15" fill="currentColor" stroke="none"/>
      <path d="M12 18.5a6.5 6.5 0 0 0 6.5-6.5V8a6.5 6.5 0 0 0-13 0v4a6.5 6.5 0 0 0 6.5 6.5Z" fill="none"/>
      <path d="M12 18.5V22M8 22h8"/>
    </svg>
  ),
  sync: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" opacity=".15" fill="currentColor" stroke="none"/>
      <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
};

const qualityData = [
  {
    iconKey: "filter" as const,
    color: "#12a37d",
    bg: "linear-gradient(135deg,#e5f8f2,#eaf0fe)",
    border: "#b8e6d8",
    title: "AI\u304c\u4e8b\u524d\u306b\u898b\u6975\u3081\u308b",
    desc: "\u30c1\u30e3\u30c3\u30c8\u306e\u56de\u7b54\u3084\u30d5\u30a9\u30fc\u30e0\u5165\u529b\u3092\u3082\u3068\u306b\u3001\u30ab\u30ec\u30f3\u30c0\u30fc\u306e\u8868\u793a/\u975e\u8868\u793a\u30fb\u62c5\u5f53\u8005\u632f\u308a\u5206\u3051\u3092\u81ea\u52d5\u5206\u5c90\u3002\u300c\u4f1a\u3046\u4fa1\u5024\u306e\u3042\u308b\u5546\u8ac7\u300d\u3060\u3051\u304c\u5c4a\u304d\u307e\u3059\u3002",
  },
  {
    iconKey: "hearing" as const,
    color: "#7c5cfc",
    bg: "linear-gradient(135deg,#f0ecfe,#eaf0fe)",
    border: "#c9bef5",
    title: "AI\u304c\u6df1\u6398\u308a\u30d2\u30a2\u30ea\u30f3\u30b0",
    desc: "\u4e88\u7d04\u6e08\u307f\u306e\u9867\u5ba2\u306bAI\u304c\u8ffd\u52a0\u30d2\u30a2\u30ea\u30f3\u30b0\u3002\u55b6\u696d\u306f\u300c\u4f55\u306b\u56f0\u3063\u3066\u3044\u308b\u304b\u300d\u3092\u628a\u63e1\u3057\u305f\u72b6\u614b\u3067\u5546\u8ac7\u306b\u81e8\u3081\u308b\u306e\u3067\u3001\u521d\u56de\u304b\u3089\u63d0\u6848\u306e\u7cbe\u5ea6\u304c\u9055\u3044\u307e\u3059\u3002",
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
  {num:"01",title:"\u30bf\u30b0\u3092\u8a2d\u7f6e",desc:"Web\u30b5\u30a4\u30c8\u306bJavaScript\u30bf\u30b0\u3092\u6570\u884c\u8ffd\u52a0\u3059\u308b\u3060\u3051\u3002WordPress\u30d7\u30e9\u30b0\u30a4\u30f3\u3082\u7528\u610f\u3002\u6240\u8981\u6642\u9593: \u7d045\u5206\u3002"},
  {num:"02",title:"AI\u3092\u8a2d\u5b9a",desc:"\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u304b\u3089AI\u306e\u58f0\u304b\u3051\u5185\u5bb9\u3001\u5546\u8ac7\u4e88\u7d04\u306e\u30eb\u30fc\u30eb\u3001\u63d0\u6848\u306b\u4f7f\u3046\u8cc7\u6599\u7b49\u3092\u8a2d\u5b9a\u3002"},
  {num:"03",title:"\u5546\u8ac7\u304c\u5165\u308a\u59cb\u3081\u308b",desc:"\u8a2d\u5b9a\u5b8c\u4e86\u3057\u305f\u77ac\u9593\u304b\u3089AI\u304c\u7a3c\u50cd\u3002\u5546\u8ac7\u7372\u5f97\u304c\u81ea\u52d5\u3067\u56de\u308a\u59cb\u3081\u307e\u3059\u3002"},
];

const caseData = [
  {name:"G-gen",industry:"Google Cloud プレミアパートナー",
    quote:"Meeton ai 導入後、月10件以上の商談を安定的に創出。リードからの転換率は40%以上を実現し、営業チームが商談対応に集中できる体制が整いました。",
    stats:[{v:"10件+",l:"月間商談創出",c:"var(--cta)"},{v:"40%+",l:"リード→商談 転換率",c:"var(--blue)"},{v:"安定",l:"毎月の商談パイプライン",c:"var(--accent)"}]},
  {name:"Univis",industry:"M&Aアドバイザリー・財務会計コンサル",
    quote:"商談化率は80%超え。Meeton ai が精度の高いMeetingを創出し、確度の高い商談だけが営業に届く仕組みが実現しています。",
    stats:[{v:"80%+",l:"商談化率",c:"var(--cta)"},{v:"高精度",l:"Meeting創出",c:"var(--blue)"},{v:"確度◎",l:"商談の質",c:"var(--accent)"}]},
  {name:"BizteX",industry:"クラウドRPA・業務自動化ツール",
    quote:"導入した1週目から6件の商談を創出。複雑な設定なしで即座に成果が出る、そのスピード感がMeeton ai の最大の魅力です。",
    stats:[{v:"6件",l:"初週の商談創出",c:"var(--cta)"},{v:"1週目",l:"成果が出るまで",c:"var(--blue)"},{v:"即効性",l:"導入スピード",c:"var(--accent)"}]},
];

const integrations = [
  {logo:"/integrations/01_Salesforce.png",name:"Salesforce",desc:"CRM\u9023\u643a"},
  {logo:"/integrations/02_HubSpot.png",name:"HubSpot",desc:"CRM\u9023\u643a"},
  {logo:"/integrations/03_Slack.png",name:"Slack",desc:"\u901a\u77e5\u30fb\u30a2\u30e9\u30fc\u30c8"},
  {logo:"/integrations/04_Microsoft_Teams.png",name:"Microsoft Teams",desc:"\u901a\u77e5\u30fb\u30a2\u30e9\u30fc\u30c8"},
  {logo:"/integrations/05_Google_Calendar.png",name:"Google Calendar",desc:"\u5546\u8ac7\u4e88\u7d04"},
  {logo:"/integrations/06_Google_Chat.png",name:"Google Chat",desc:"\u901a\u77e5\u30fb\u30a2\u30e9\u30fc\u30c8"},
  {logo:"/integrations/07_Zoom.png",name:"Zoom",desc:"Web\u4f1a\u8b70\u9023\u643a"},
  {logo:"/integrations/TimeRex.jpeg",name:"TimeRex",desc:"\u65e5\u7a0b\u8abf\u6574"},
  {logo:"/integrations/08_Marketo.png",name:"Marketo",desc:"MA\u9023\u643a"},
  {logo:"/integrations/10_Oracle_Eloqua.png",name:"Oracle Eloqua",desc:"MA\u9023\u643a"},
];

const faqData = [
  {q:"\u5c0e\u5165\u306b\u3069\u306e\u304f\u3089\u3044\u6642\u9593\u304c\u304b\u304b\u308a\u307e\u3059\u304b\uff1f",a:"JavaScript\u30bf\u30b0\u306e\u8a2d\u7f6e\u306f5\u5206\u3067\u3059\u3002AI\u306e\u8a2d\u5b9a\u3092\u542b\u3081\u3066\u3082\u3001\u6700\u77ed\u3067\u5f53\u65e5\u4e2d\u306b\u7a3c\u50cd\u958b\u59cb\u3067\u304d\u307e\u3059\u3002"},
  {q:"\u65e2\u5b58\u306eCRM\uff08Salesforce / HubSpot\uff09\u3068\u9023\u643a\u3067\u304d\u307e\u3059\u304b\uff1f",a:"\u306f\u3044\u3002Salesforce\u3001HubSpot\u3068\u306e\u30cd\u30a4\u30c6\u30a3\u30d6\u9023\u643a\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\u3002Webhook\u7d4c\u7531\u3067\u4ed6\u306eCRM\u306b\u3082\u63a5\u7d9a\u53ef\u80fd\u3067\u3059\u3002"},
  {q:"\u591a\u8a00\u8a9e\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\u304b\uff1f",a:"\u306f\u3044\u3002\u65e5\u672c\u8a9e\u30fb\u82f1\u8a9e\u30fb\u4e2d\u56fd\u8a9e\u30fb\u97d3\u56fd\u8a9e\u3092\u306f\u3058\u3081\u3001\u4e3b\u8981\u8a00\u8a9e\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\u3002"},
  {q:"\u7121\u6599\u30c8\u30e9\u30a4\u30a2\u30eb\u306f\u3042\u308a\u307e\u3059\u304b\uff1f",a:"14\u65e5\u9593\u306e\u7121\u6599\u30c8\u30e9\u30a4\u30a2\u30eb\u3092\u3054\u7528\u610f\u3057\u3066\u3044\u307e\u3059\u3002\u30af\u30ec\u30b8\u30c3\u30c8\u30ab\u30fc\u30c9\u4e0d\u8981\u3067\u5168\u6a5f\u80fd\u3092\u304a\u8a66\u3057\u3044\u305f\u3060\u3051\u307e\u3059\u3002"},
];

const clients = [
  {name:"G-gen",logo:"/clients/ggen.png"},
  {name:"EdulinX",logo:"/clients/edulinx.png"},
  {name:"Univis",logo:"/clients/univis.png"},
  {name:"\u9280\u5ea7\u685c\u5c4b",logo:"/clients/ginza-sakuraya.png"},
  {name:"BizteX",logo:"/clients/biztex.png"},
  {name:"Domo",logo:"/clients/domo.svg"},
  {name:"\u30a4\u30f3\u30d7\u30ec\u30c3\u30af\u30b9\u30a2\u30f3\u30c9\u30ab\u30f3\u30d1\u30cb\u30fc",logo:"/clients/imprexc.png"},
];

/* ── Diagram Components ── */

function SvgIcon({d,x,y,size=20,color="#0891b2"}:{d:string,x:number,y:number,size?:number,color?:string}) {
  return <g transform={`translate(${x-size/2},${y-size/2})`}><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg></g>;
}
const ICON = {
  chat:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  cal:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  doc:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  form:"M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  cpu:"M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3",
  bell:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  globe:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  link:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  bookmark:"M19 4H5a2 2 0 0 0-2 2v14l7-3 7 3V6a2 2 0 0 0-2-2z",
};

function DiagramChatbot() {
  return (
    <div className="diagram" style={{flexDirection:"column",gap:8}}>
      <svg width="100%" height="100%" viewBox="0 0 460 220" fill="none" style={{maxWidth:600}}>
        {/* Website */}
        <rect x="15" y="60" width="110" height="90" rx="14" fill="#f0fdfa" stroke="#0891b2" strokeWidth="2"/>
        <SvgIcon d={ICON.globe} x={70} y={88} size={20} color="#0891b2"/>
        <text x="70" y="116" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0891b2">{"Web / LP / \u5e83\u544a"}</text>
        {/* Arrow */}
        <line x1="130" y1="105" x2="170" y2="105" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/>
        </line>
        <polygon points="170,100 180,105 170,110" fill="#c8cedf"/>
        {/* AI Chatbot */}
        <rect x="185" y="30" width="130" height="150" rx="16" fill="white" stroke="#0891b2" strokeWidth="2"/>
        <SvgIcon d={ICON.cpu} x={250} y={58} size={24} color="#0891b2"/>
        <text x="250" y="86" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f1128">{"AI\u30c1\u30e3\u30c3\u30c8"}</text>
        <rect x="200" y="98" width="100" height="18" rx="5" fill="#e5f8f2"/>
        <text x="250" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill="#12a37d">{"\u30cb\u30fc\u30ba\u628a\u63e1"}</text>
        <rect x="200" y="122" width="100" height="18" rx="5" fill="#eaf0fe"/>
        <text x="250" y="136" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3b6ff5">{"\u8cc7\u6599\u63d0\u6848"}</text>
        <rect x="200" y="146" width="100" height="18" rx="5" fill="#f0ecfe"/>
        <text x="250" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c5cfc">{"\u4e88\u7d04\u8a98\u5c0e"}</text>
        {/* Arrow */}
        <line x1="320" y1="105" x2="355" y2="105" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/>
        </line>
        <polygon points="355,100 365,105 355,110" fill="#c8cedf"/>
        {/* Meeting */}
        <rect x="370" y="55" width="80" height="100" rx="14" fill="#e5f8f2" stroke="#12a37d" strokeWidth="2"/>
        <SvgIcon d={ICON.cal} x={410} y={88} size={22} color="#12a37d"/>
        <text x="410" y="118" textAnchor="middle" fontSize="11" fontWeight="800" fill="#12a37d">{"\u5546\u8ac7\u78ba\u5b9a"}</text>
      </svg>
    </div>
  );
}

function DiagramEmail() {
  return (
    <div className="diagram" style={{flexDirection:"column"}}>
      <svg width="100%" height="100%" viewBox="0 0 420 210" fill="none" style={{maxWidth:600}}>
        {/* Sources */}
        <rect x="10" y="15" width="85" height="42" rx="8" fill="#eaf0fe" stroke="#3b6ff5" strokeWidth="1.5"/>
        <text x="52" y="41" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b6ff5">{"\u30a4\u30f3\u30d0\u30a6\u30f3\u30c9"}</text>
        <rect x="10" y="67" width="85" height="42" rx="8" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="1.5"/>
        <text x="52" y="93" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c5cfc">{"\u30a6\u30a7\u30d3\u30ca\u30fc"}</text>
        <rect x="10" y="119" width="85" height="42" rx="8" fill="#e5f8f2" stroke="#12a37d" strokeWidth="1.5"/>
        <text x="52" y="145" textAnchor="middle" fontSize="10" fontWeight="700" fill="#12a37d">CRM / API</text>
        {/* Arrows to AI */}
        <line x1="100" y1="36" x2="150" y2="97" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite"/></line>
        <line x1="100" y1="88" x2="150" y2="97" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite"/></line>
        <line x1="100" y1="140" x2="150" y2="97" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite"/></line>
        {/* AI Engine */}
        <rect x="155" y="50" width="120" height="96" rx="14" fill="white" stroke="#12a37d" strokeWidth="2"/>
        <SvgIcon d={ICON.mail} x={215} y={76} size={22} color="#12a37d"/>
        <text x="215" y="100" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f1128">{"AI\u30e1\u30fc\u30eb"}</text>
        <text x="215" y="116" textAnchor="middle" fontSize="9" fill="#6e7494">{"\u81ea\u52d5\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0"}</text>
        <text x="215" y="131" textAnchor="middle" fontSize="9" fill="#6e7494">{"\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7"}</text>
        {/* Arrow */}
        <line x1="280" y1="98" x2="318" y2="98" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="318,93 328,98 318,103" fill="#c8cedf"/>
        {/* Result */}
        <rect x="333" y="55" width="80" height="86" rx="14" fill="#e5f8f2" stroke="#12a37d" strokeWidth="2"/>
        <SvgIcon d={ICON.cal} x={373} y={82} size={22} color="#12a37d"/>
        <text x="373" y="108" textAnchor="middle" fontSize="11" fontWeight="800" fill="#12a37d">{"\u5546\u8ac7\u78ba\u5b9a"}</text>
        <text x="373" y="125" textAnchor="middle" fontSize="9" fill="#6e7494">{"\u81ea\u52d5\u4e88\u7d04"}</text>
        {/* Timeline label */}
        <rect x="140" y="172" width="170" height="28" rx="8" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1"/>
        <text x="225" y="190" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706">{"\u71b1\u91cf\u304c\u9ad8\u3044\u30bf\u30a4\u30df\u30f3\u30b0\u3067\u5373\u30a2\u30af\u30b7\u30e7\u30f3"}</text>
      </svg>
    </div>
  );
}

function DiagramDownloadCenter() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 420 210" fill="none" style={{maxWidth:600}}>
        {/* Download page */}
        <rect x="15" y="10" width="170" height="190" rx="14" fill="white" stroke="#3b6ff5" strokeWidth="2"/>
        <text x="100" y="38" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">{"\u8cc7\u6599\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9"}</text>
        {/* Doc cards */}
        {[{y:52,name:"\u5c0e\u5165\u30ac\u30a4\u30c9",c:"#e0475b"},{y:84,name:"\u6599\u91d1\u6bd4\u8f03\u8868",c:"#3b6ff5"},{y:116,name:"\u4e8b\u4f8b\u96c6",c:"#12a37d"}].map((d,i)=>(
          <g key={i}>
            <rect x="30" y={d.y} width="140" height="26" rx="6" fill={`${d.c}10`} stroke={d.c} strokeWidth="1"/>
            <SvgIcon d={ICON.doc} x={44} y={d.y+13} size={13} color={d.c}/>
            <text x="58" y={d.y+17} fontSize="10" fontWeight="700" fill={d.c}>{d.name}</text>
          </g>
        ))}
        <rect x="30" y="150" width="140" height="22" rx="5" fill="#e5f8f2"/>
        <text x="100" y="165" textAnchor="middle" fontSize="9" fontWeight="700" fill="#12a37d">{"+\u4ed6\u306e\u8cc7\u6599\u3082..."}</text>
        {/* Arrow */}
        <line x1="190" y1="105" x2="225" y2="105" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="225,100 235,105 225,110" fill="#c8cedf"/>
        {/* AI */}
        <rect x="240" y="30" width="130" height="150" rx="16" fill="white" stroke="#3b6ff5" strokeWidth="2"/>
        <SvgIcon d={ICON.cpu} x={305} y={60} size={24} color="#3b6ff5"/>
        <text x="305" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f1128">{"AI\u304c\u6848\u5185"}</text>
        <rect x="256" y="100" width="98" height="18" rx="5" fill="#eaf0fe"/>
        <text x="305" y="114" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3b6ff5">{"\u3053\u306e\u8cc7\u6599\u304c\u304a\u3059\u3059\u3081"}</text>
        <rect x="256" y="124" width="98" height="18" rx="5" fill="#e5f8f2"/>
        <text x="305" y="138" textAnchor="middle" fontSize="9" fontWeight="600" fill="#12a37d">{"\u2192 \u5546\u8ac7\u7372\u5f97"}</text>
      </svg>
    </div>
  );
}

function DiagramThanksPage() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 430 210" fill="none" style={{maxWidth:600}}>
        {/* Form completion */}
        <rect x="10" y="40" width="95" height="120" rx="14" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="1.5"/>
        <SvgIcon d={ICON.form} x={57} y={72} size={18} color="#7c5cfc"/>
        <text x="57" y="98" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c5cfc">{"\u554f\u3044\u5408\u308f\u305b"}</text>
        <text x="57" y="114" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c5cfc">{"\u8cc7\u6599\u8acb\u6c42"}</text>
        <text x="57" y="138" textAnchor="middle" fontSize="9" fill="#6e7494">{"\u5b8c\u4e86\uff01"}</text>
        {/* Arrow */}
        <line x1="110" y1="100" x2="148" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="148,95 158,100 148,105" fill="#c8cedf"/>
        {/* Thanks page */}
        <rect x="162" y="15" width="258" height="185" rx="16" fill="white" stroke="#7c5cfc" strokeWidth="2"/>
        <text x="291" y="42" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f1128">{"\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8"}</text>
        {/* Calendar */}
        <rect x="178" y="55" width="120" height="130" rx="10" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="1"/>
        <SvgIcon d={ICON.cal} x={238} y={73} size={16} color="#7c5cfc"/>
        <text x="238" y="92" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c5cfc">{"\u30ab\u30ec\u30f3\u30c0\u30fc"}</text>
        {["\u6708 10:00","\u6c34 14:00","\u91d1 11:00"].map((t,i)=>(
          <g key={i}>
            <rect x="190" y={102+i*24} width="96" height="18" rx="5" fill="white" stroke="#c9bef5" strokeWidth="1"/>
            <text x="238" y={115+i*24} textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c5cfc">{t}</text>
          </g>
        ))}
        {/* AI Chat */}
        <rect x="308" y="55" width="100" height="130" rx="10" fill="#e5f8f2" stroke="#12a37d" strokeWidth="1"/>
        <SvgIcon d={ICON.chat} x={358} y={73} size={16} color="#12a37d"/>
        <text x="358" y="92" textAnchor="middle" fontSize="9" fontWeight="800" fill="#12a37d">{"AI\u30c1\u30e3\u30c3\u30c8"}</text>
        <rect x="318" y="102" width="80" height="26" rx="5" fill="white"/>
        <text x="358" y="119" textAnchor="middle" fontSize="8" fill="#6e7494">{"\u7591\u554f\u70b9\u3092\u89e3\u6d88"}</text>
        <rect x="318" y="136" width="80" height="26" rx="5" fill="white"/>
        <text x="358" y="153" textAnchor="middle" fontSize="8" fill="#12a37d">{"\u96e2\u8131\u3092\u9632\u6b62"}</text>
      </svg>
    </div>
  );
}

function DiagramPopup() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 420 210" fill="none" style={{maxWidth:600}}>
        <defs><filter id="popShadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.08"/></filter></defs>
        {/* Browser */}
        <rect x="10" y="10" width="170" height="190" rx="14" fill="#fafafa" stroke="#dfe3f0" strokeWidth="2"/>
        <rect x="10" y="10" width="170" height="26" rx="14" fill="#f4f6fb"/>
        <circle cx="28" cy="23" r="4" fill="#e0475b"/>
        <circle cx="40" cy="23" r="4" fill="#f59e0b"/>
        <circle cx="52" cy="23" r="4" fill="#12a37d"/>
        <text x="95" y="56" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6e7494">{"\u8a2a\u554f\u8005\u304c\u95b2\u89a7\u4e2d..."}</text>
        <rect x="26" y="66" width="138" height="8" rx="3" fill="#eaedfa"/>
        <rect x="26" y="80" width="110" height="8" rx="3" fill="#eaedfa"/>
        <rect x="26" y="94" width="124" height="8" rx="3" fill="#eaedfa"/>
        {/* AI analyzing */}
        <text x="95" y="130" textAnchor="middle" fontSize="10" fontWeight="800" fill="#d03ea1">{"AI\u304c\u30da\u30fc\u30b8\u3092\u5206\u6790"}</text>
        <rect x="30" y="138" width="130" height="7" rx="3" fill="#d03ea110"/>
        <rect x="30" y="138" width="80" height="7" rx="3" fill="#d03ea1">
          <animate attributeName="width" from="20" to="130" dur="2s" repeatCount="indefinite"/>
        </rect>
        {/* Arrow */}
        <line x1="185" y1="105" x2="220" y2="105" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="220,100 230,105 220,110" fill="#c8cedf"/>
        {/* Popup */}
        <rect x="234" y="20" width="175" height="175" rx="16" fill="white" stroke="#d03ea1" strokeWidth="2" filter="url(#popShadow)"/>
        <text x="321" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f1128">{"\u304a\u3059\u3059\u3081\u8cc7\u6599"}</text>
        <rect x="250" y="58" width="143" height="34" rx="8" fill="#d03ea108" stroke="#d03ea140" strokeWidth="1"/>
        <SvgIcon d={ICON.doc} x={264} y={75} size={14} color="#d03ea1"/>
        <text x="286" y="74" fontSize="9" fontWeight="700" fill="#0f1128">{"\u5c0e\u5165\u4e8b\u4f8b\u96c6"}</text>
        <text x="286" y="86" fontSize="8" fill="#6e7494">{"\u3053\u306e\u30da\u30fc\u30b8\u306b\u6700\u9069"}</text>
        <rect x="250" y="98" width="143" height="34" rx="8" fill="#d03ea108" stroke="#d03ea140" strokeWidth="1"/>
        <SvgIcon d="M18 20V10a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v10M12 4v12M4 14h16" x={264} y={115} size={14} color="#d03ea1"/>
        <text x="286" y="114" fontSize="9" fontWeight="700" fill="#0f1128">{"\u6599\u91d1\u6bd4\u8f03\u8868"}</text>
        <text x="286" y="126" fontSize="8" fill="#6e7494">{"\u691c\u8a0e\u4e2d\u306e\u65b9\u3078"}</text>
        <rect x="262" y="142" width="135" height="28" rx="8" fill="#12a37d"/>
        <text x="329" y="161" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">{"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9 \u2192"}</text>
      </svg>
    </div>
  );
}

function DiagramCalendarURL() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 430 210" fill="none" style={{maxWidth:600}}>
        {/* Email */}
        <rect x="10" y="10" width="160" height="190" rx="14" fill="white" stroke="#e0475b" strokeWidth="2"/>
        <text x="90" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f1128">{"\u55b6\u696d\u30e1\u30fc\u30eb"}</text>
        <rect x="26" y="50" width="128" height="8" rx="3" fill="#eaedfa"/>
        <rect x="26" y="64" width="105" height="8" rx="3" fill="#eaedfa"/>
        <rect x="26" y="78" width="118" height="8" rx="3" fill="#eaedfa"/>
        {/* Calendar link */}
        <rect x="26" y="98" width="128" height="32" rx="8" fill="#e0475b10" stroke="#e0475b" strokeWidth="1.5"/>
        <SvgIcon d={ICON.cal} x={48} y={114} size={13} color="#e0475b"/>
        <text x="100" y="118" textAnchor="middle" fontSize="10" fontWeight="800" fill="#e0475b">{"\u65e5\u7a0b\u3092\u9078\u3076 \u2192"}</text>
        <rect x="26" y="140" width="128" height="8" rx="3" fill="#eaedfa"/>
        <rect x="26" y="154" width="90" height="8" rx="3" fill="#eaedfa"/>
        {/* Arrow */}
        <line x1="175" y1="105" x2="210" y2="105" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="210,100 220,105 210,110" fill="#c8cedf"/>
        {/* Calendar + AI */}
        <rect x="224" y="10" width="196" height="190" rx="16" fill="white" stroke="#e0475b" strokeWidth="2"/>
        <text x="322" y="38" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">{"\u30ab\u30ec\u30f3\u30c0\u30fc + AI"}</text>
        {/* Calendar side */}
        <rect x="234" y="50" width="86" height="134" rx="10" fill="#fef2f2" stroke="#e0475b" strokeWidth="1"/>
        <SvgIcon d={ICON.cal} x={277} y={66} size={14} color="#e0475b"/>
        {["\u6708 10:00","\u6c34 15:00","\u91d1 13:00"].map((t,i)=>(
          <g key={i}>
            <rect x="242" y={82+i*28} width="70" height="20" rx="5" fill="white" stroke="#fca5a5" strokeWidth="1"/>
            <text x="277" y={96+i*28} textAnchor="middle" fontSize="9" fontWeight="600" fill="#e0475b">{t}</text>
          </g>
        ))}
        {/* AI chat side */}
        <rect x="328" y="50" width="82" height="134" rx="10" fill="#e5f8f2" stroke="#12a37d" strokeWidth="1"/>
        <SvgIcon d={ICON.chat} x={369} y={66} size={14} color="#12a37d"/>
        <rect x="336" y="82" width="66" height="24" rx="5" fill="white"/>
        <text x="369" y="98" textAnchor="middle" fontSize="8" fill="#6e7494">{"\u4e0d\u5b89\u3092\u89e3\u6d88"}</text>
        <rect x="336" y="112" width="66" height="24" rx="5" fill="white"/>
        <text x="369" y="128" textAnchor="middle" fontSize="8" fill="#12a37d">{"\u96e2\u8131\u9632\u6b62"}</text>
        <rect x="336" y="144" width="66" height="24" rx="5" fill="#12a37d"/>
        <text x="369" y="160" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">{"\u5546\u8ac7\u78ba\u5b9a"}</text>
      </svg>
    </div>
  );
}

function DiagramPDF() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 430 210" fill="none" style={{maxWidth:600}}>
        {/* PDF doc */}
        <rect x="20" y="10" width="140" height="180" rx="10" fill="white" stroke="#c026d3" strokeWidth="2"/>
        <rect x="20" y="10" width="140" height="32" rx="10" fill="#c026d310"/>
        <text x="90" y="31" textAnchor="middle" fontSize="12" fontWeight="800" fill="#c026d3">{" PDF \u8cc7\u6599"}</text>
        <rect x="36" y="52" width="108" height="6" rx="3" fill="#eaedfa"/>
        <rect x="36" y="64" width="92" height="6" rx="3" fill="#eaedfa"/>
        <rect x="36" y="76" width="100" height="6" rx="3" fill="#eaedfa"/>
        <rect x="36" y="88" width="80" height="6" rx="3" fill="#eaedfa"/>
        {/* QR / URL */}
        <rect x="36" y="106" width="48" height="48" rx="6" fill="#c026d310" stroke="#c026d3" strokeWidth="1"/>
        <text x="60" y="136" textAnchor="middle" fontSize="8" fontWeight="700" fill="#c026d3">QR</text>
        <rect x="92" y="106" width="56" height="20" rx="4" fill="#c026d3"/>
        <text x="120" y="120" textAnchor="middle" fontSize="7" fontWeight="700" fill="white">{"\u5546\u8ac7\u4e88\u7d04 \u2192"}</text>
        <text x="120" y="142" textAnchor="middle" fontSize="7" fill="#6e7494">{"\u8aad\u8005 = \u71b1\u91cf\u9ad8"}</text>
        {/* Arrow */}
        <line x1="168" y1="100" x2="210" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="210,95 220,100 210,105" fill="#c8cedf"/>
        {/* Booking page */}
        <rect x="230" y="20" width="180" height="160" rx="14" fill="white" stroke="#c026d3" strokeWidth="2"/>
        <text x="320" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">{"\u5546\u8ac7\u4e88\u7d04\u30da\u30fc\u30b8"}</text>
        <SvgIcon d={ICON.cal} x={320} y={80} size={28} color="#c026d3"/>
        <rect x="272" y="106" width="96" height="24" rx="8" fill="#c026d3"/>
        <text x="320" y="122" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">{"\u4e88\u7d04\u78ba\u5b9a"}</text>
        <text x="320" y="152" textAnchor="middle" fontSize="8" fill="#6e7494">{"\u76f4\u63a5\u8a98\u5c0e\u3067\u9ad8CV"}</text>
      </svg>
    </div>
  );
}

function DiagramAIConcierge() {
  const channels = [
    {label:"AI \u30e1\u30fc\u30eb",color:"#12a37d",icon:ICON.mail},
    {label:"\u8cc7\u6599DL\u30bb\u30f3\u30bf\u30fc",color:"#3b6ff5",icon:ICON.doc},
    {label:"\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",color:"#7c5cfc",icon:ICON.bookmark},
    {label:"AI \u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",color:"#d03ea1",icon:ICON.bell},
    {label:"\u30e1\u30fc\u30eb\u30ab\u30ec\u30f3\u30c0\u30fc",color:"#e0475b",icon:ICON.cal},
    {label:"PDF\u30fb\u8cc7\u6599\u5185",color:"#c026d3",icon:ICON.doc},
  ];
  return (
    <svg width="100%" viewBox="0 0 900 480" fill="none" style={{maxWidth:900,margin:"0 auto",display:"block"}}>
      <defs>
        <filter id="concShadow"><feDropShadow dx="0" dy="3" stdDeviation="8" floodOpacity=".08"/></filter>
        <linearGradient id="concGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#12a37d"/><stop offset="100%" stopColor="#0fc19a"/></linearGradient>
      </defs>

      {/* Left: 6 channel sources */}
      {channels.map((ch,i) => {
        const y = 40 + i * 58;
        return (
          <g key={i}>
            <g filter="url(#concShadow)">
              <rect x="10" y={y} width="150" height="42" rx="10" fill="white" stroke={ch.color} strokeWidth="1.5"/>
              <g transform={`translate(22,${y+9})`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ch.icon}/></svg>
              </g>
              <text x="52" y={y+27} fontSize="11" fontWeight="700" fill="#0f1128" fontFamily="var(--fb)">{ch.label}</text>
            </g>
            <line x1="165" y1={y+21} x2="220" y2={y+21} stroke={ch.color} strokeWidth="1.2" strokeDasharray="4 3" opacity=".4">
              <animate attributeName="stroke-dashoffset" from="14" to="0" dur={`${1.2+i*0.1}s`} repeatCount="indefinite"/>
            </line>
            <circle r="2.5" fill={ch.color} opacity=".6">
              <animateMotion dur={`${1.8+i*0.12}s`} repeatCount="indefinite" path={`M165,${y+21} L220,${y+21}`}/>
            </circle>
          </g>
        );
      })}

      {/* Main panel: AI Chat (left) + Calendar (right) merged */}
      <g filter="url(#concShadow)">
        {/* Outer container */}
        <rect x="230" y="20" width="650" height="420" rx="16" fill="white" stroke="var(--border)" strokeWidth="1.5"/>

        {/* AI Chat header (left half) — rectangular */}
        <rect x="231" y="21" width="338" height="48" rx="0" fill="#e5f8f2"/>
        {/* Top-left corner clip */}
        <rect x="231" y="21" width="16" height="16" rx="16" fill="#e5f8f2"/>
        <rect x="231" y="29" width="16" height="8" fill="#e5f8f2"/>
        <rect x="239" y="21" width="8" height="16" fill="#e5f8f2"/>
        <SvgIcon d={ICON.chat} x={380} y={44} size={18} color="#12a37d"/>
        <text x="400" y="52" fontSize="13" fontWeight="800" fill="#12a37d" fontFamily="var(--fb)">{"AI \u30b3\u30f3\u30b7\u30a7\u30eb\u30b8\u30e5"}</text>

        {/* Divider line */}
        <line x1="570" y1="36" x2="570" y2="424" stroke="#dfe3f0" strokeWidth="1"/>

        {/* Calendar header (right half) — rectangular */}
        <rect x="571" y="21" width="308" height="48" rx="0" fill="#f0ecfe"/>
        {/* Top-right corner clip */}
        <rect x="863" y="21" width="16" height="16" rx="16" fill="#f0ecfe"/>
        <rect x="863" y="29" width="16" height="8" fill="#f0ecfe"/>
        <rect x="855" y="21" width="16" height="16" fill="#f0ecfe"/>
        <SvgIcon d={ICON.cal} x={710} y={44} size={18} color="#7c5cfc"/>
        <text x="730" y="52" fontSize="13" fontWeight="800" fill="#7c5cfc" fontFamily="var(--fb)">{"\u65e5\u7a0b\u9078\u629e"}</text>
      </g>

      {/* Chat conversation */}
      {/* AI greeting */}
      <g style={{animation:"chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="254" y="86" width="290" height="38" rx="12" fill="#e5f8f2" stroke="rgba(18,163,125,.15)" strokeWidth="1"/>
        <text x="268" y="110" fontSize="10" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u65e5\u6642\u4e88\u7d04\u524d\u306b\u805e\u304d\u305f\u3044\u3053\u3068\u306f\u3054\u3056\u3044\u307e\u3059\u304b\uff1f"}</text>
      </g>
      {/* User question */}
      <g style={{animation:"chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="340" y="140" width="204" height="38" rx="12" fill="#f0ecfe" stroke="#c9bef5" strokeWidth="1"/>
        <text x="354" y="164" fontSize="10" fontWeight="600" fill="#7c5cfc" fontFamily="var(--fb)">{"\u6599\u91d1\u30d7\u30e9\u30f3\u306b\u3064\u3044\u3066\u77e5\u308a\u305f\u3044\u3067\u3059"}</text>
      </g>
      {/* AI answer */}
      <g style={{animation:"chatPop .5s 2.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="254" y="194" width="300" height="52" rx="12" fill="#e5f8f2" stroke="rgba(18,163,125,.15)" strokeWidth="1"/>
        <text x="268" y="216" fontSize="10" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u5fa1\u793e\u306e\u898f\u6a21\u3067\u3059\u3068\u30b9\u30bf\u30f3\u30c0\u30fc\u30c9\u30d7\u30e9\u30f3\u304c"}</text>
        <text x="268" y="232" fontSize="10" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u6700\u9069\u3067\u3059\u3002\u8a73\u3057\u304f\u306f\u5546\u8ac7\u3067\u3054\u8aac\u660e\u3057\u307e\u3059\uff01"}</text>
      </g>
      {/* AI nudge */}
      <g style={{animation:"chatPop .5s 3.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="254" y="262" width="280" height="38" rx="12" fill="#e5f8f2" stroke="rgba(18,163,125,.15)" strokeWidth="1"/>
        <text x="268" y="286" fontSize="10" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u53f3\u306e\u30ab\u30ec\u30f3\u30c0\u30fc\u304b\u3089\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u3092\u3069\u3046\u305e\uff01"}</text>
      </g>

      {/* Calendar time slots */}
      {[
        {day:"\u6708\u66dc\u65e5",time:"10:00",sel:false},
        {day:"\u6c34\u66dc\u65e5",time:"14:00",sel:false},
        {day:"\u91d1\u66dc\u65e5",time:"11:00",sel:true},
        {day:"\u6765\u9031\u706b",time:"15:00",sel:false},
      ].map((slot,i) => (
        <g key={i}>
          <rect x="590" y={90+i*56} width="270" height="42" rx="10"
            fill={slot.sel?"#7c5cfc":"white"} stroke={slot.sel?"#7c5cfc":"#dfe3f0"} strokeWidth={slot.sel?2:1.5}/>
          <text x="612" y={116+i*56} fontSize="11" fontWeight="700" fill={slot.sel?"white":"#0f1128"} fontFamily="var(--fb)">{slot.day}</text>
          <text x="838" y={116+i*56} textAnchor="end" fontSize="11" fontWeight="600" fill={slot.sel?"rgba(255,255,255,.85)":"#6e7494"} fontFamily="var(--fm)">{slot.time}</text>
          {slot.sel && <SvgIcon d="M20 6L9 17l-5-5" x={848} y={106+i*56} size={14} color="white"/>}
        </g>
      ))}

      {/* Booking confirmed button */}
      <g style={{animation:"chatPop .5s 4.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="254" y="316" width="300" height="44" rx="12" fill="url(#concGrad)"/>
        <text x="404" y="343" textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u2713 \u91d1\u66dc\u65e5 11:00 \u3067\u5546\u8ac7\u78ba\u5b9a\uff01"}</text>
        <rect x="254" y="316" width="300" height="44" rx="12" fill="none" stroke="#12a37d" strokeWidth="2" opacity="0">
          <animate attributeName="opacity" values="0;.5;0" dur="2s" begin="5s" repeatCount="indefinite"/>
        </rect>
      </g>

      {/* Bottom: label + stats */}
      <g>
        <text x="400" y="400" textAnchor="middle" fontSize="10" fill="#6e7494" fontFamily="var(--fb)">{"\u2190 AI\u304c\u7591\u554f\u3092\u89e3\u6d88\u3057\u3066\u304b\u3089\u4e88\u7d04\u3078\u8a98\u5c0e"}</text>
        <rect x="300" y="418" width="100" height="32" rx="8" fill="#f0ecfe" stroke="#c9bef5" strokeWidth="1"/>
        <text x="350" y="439" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c5cfc" fontFamily="var(--fb)">{"\u96e2\u8131\u7387 -40%"}</text>
        <rect x="416" y="418" width="100" height="32" rx="8" fill="#e5f8f2" stroke="#b8e6d8" strokeWidth="1"/>
        <text x="466" y="439" textAnchor="middle" fontSize="10" fontWeight="800" fill="#12a37d" fontFamily="var(--fb)">{"\u4e88\u7d04\u7387 +35%"}</text>
      </g>
    </svg>
  );
}

function DiagramAIConciergeMobile() {
  const channels = [
    {label:"AI \u30e1\u30fc\u30eb",color:"#12a37d",icon:ICON.mail},
    {label:"\u8cc7\u6599DL\u30bb\u30f3\u30bf\u30fc",color:"#3b6ff5",icon:ICON.doc},
    {label:"\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",color:"#7c5cfc",icon:ICON.bookmark},
    {label:"AI \u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",color:"#d03ea1",icon:ICON.bell},
    {label:"\u30e1\u30fc\u30eb\u30ab\u30ec\u30f3\u30c0\u30fc",color:"#e0475b",icon:ICON.cal},
    {label:"PDF\u30fb\u8cc7\u6599\u5185",color:"#c026d3",icon:ICON.doc},
  ];
  return (
    <svg width="100%" viewBox="0 0 380 820" fill="none" style={{maxWidth:400,margin:"0 auto",display:"block"}}>
      <defs>
        <filter id="concShadowM"><feDropShadow dx="0" dy="3" stdDeviation="8" floodOpacity=".08"/></filter>
        <linearGradient id="concGradM" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#12a37d"/><stop offset="100%" stopColor="#0fc19a"/></linearGradient>
      </defs>

      {/* Channel sources - 2 columns */}
      {channels.map((ch,i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 10 : 195;
        const y = 10 + row * 50;
        return (
          <g key={i}>
            <g filter="url(#concShadowM)">
              <rect x={x} y={y} width="170" height="40" rx="10" fill="white" stroke={ch.color} strokeWidth="1.5"/>
              <g transform={`translate(${x+12},${y+8})`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ch.icon}/></svg>
              </g>
              <text x={x+42} y={y+26} fontSize="12" fontWeight="700" fill="#0f1128" fontFamily="var(--fb)">{ch.label}</text>
            </g>
          </g>
        );
      })}

      {/* Converging arrows */}
      {channels.map((ch,i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 95 : 280;
        const y = 10 + row * 50 + 40;
        return (
          <line key={`arrow-${i}`} x1={x} y1={y} x2="190" y2="175" stroke={ch.color} strokeWidth="1" strokeDasharray="4 3" opacity=".3">
            <animate attributeName="stroke-dashoffset" from="14" to="0" dur={`${1.2+i*0.1}s`} repeatCount="indefinite"/>
          </line>
        );
      })}
      <circle cx="190" cy="175" r="4" fill="#12a37d"/>

      {/* Arrow down */}
      <line x1="190" y1="182" x2="190" y2="205" stroke="#12a37d" strokeWidth="2" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
      </line>
      <polygon points="185,203 190,213 195,203" fill="#12a37d"/>

      {/* AI Chat panel */}
      <g filter="url(#concShadowM)">
        <rect x="20" y="220" width="340" height="300" rx="16" fill="white" stroke="var(--border)" strokeWidth="1.5"/>
        {/* Header */}
        <rect x="21" y="221" width="338" height="44" rx="0" fill="#e5f8f2"/>
        <rect x="21" y="221" width="16" height="16" rx="16" fill="#e5f8f2"/>
        <rect x="21" y="229" width="16" height="8" fill="#e5f8f2"/>
        <rect x="29" y="221" width="8" height="16" fill="#e5f8f2"/>
        <rect x="343" y="221" width="16" height="16" rx="16" fill="#e5f8f2"/>
        <rect x="343" y="229" width="16" height="8" fill="#e5f8f2"/>
        <rect x="335" y="221" width="16" height="16" fill="#e5f8f2"/>
        <SvgIcon d={ICON.chat} x={160} y={242} size={18} color="#12a37d"/>
        <text x="180" y="249" fontSize="14" fontWeight="800" fill="#12a37d" fontFamily="var(--fb)">{"AI \u30b3\u30f3\u30b7\u30a7\u30eb\u30b8\u30e5"}</text>
      </g>

      {/* Chat bubbles */}
      <g style={{animation:"chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="40" y="280" width="260" height="36" rx="12" fill="#e5f8f2" stroke="rgba(18,163,125,.15)" strokeWidth="1"/>
        <text x="54" y="303" fontSize="12" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u65e5\u6642\u4e88\u7d04\u524d\u306b\u805e\u304d\u305f\u3044\u3053\u3068\u306f\u3054\u3056\u3044\u307e\u3059\u304b\uff1f"}</text>
      </g>
      <g style={{animation:"chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="140" y="328" width="200" height="36" rx="12" fill="#f0ecfe" stroke="#c9bef5" strokeWidth="1"/>
        <text x="154" y="351" fontSize="12" fontWeight="600" fill="#7c5cfc" fontFamily="var(--fb)">{"\u6599\u91d1\u30d7\u30e9\u30f3\u306b\u3064\u3044\u3066\u77e5\u308a\u305f\u3044\u3067\u3059"}</text>
      </g>
      <g style={{animation:"chatPop .5s 2.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="40" y="376" width="280" height="50" rx="12" fill="#e5f8f2" stroke="rgba(18,163,125,.15)" strokeWidth="1"/>
        <text x="54" y="398" fontSize="12" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u5fa1\u793e\u306e\u898f\u6a21\u3067\u3059\u3068\u30b9\u30bf\u30f3\u30c0\u30fc\u30c9\u30d7\u30e9\u30f3\u304c"}</text>
        <text x="54" y="416" fontSize="12" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u6700\u9069\u3067\u3059\u3002\u8a73\u3057\u304f\u306f\u5546\u8ac7\u3067\u3054\u8aac\u660e\u3057\u307e\u3059\uff01"}</text>
      </g>
      <g style={{animation:"chatPop .5s 3.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="40" y="438" width="260" height="36" rx="12" fill="#e5f8f2" stroke="rgba(18,163,125,.15)" strokeWidth="1"/>
        <text x="54" y="461" fontSize="12" fontWeight="600" fill="#12a37d" fontFamily="var(--fb)">{"\u4e0b\u306e\u30ab\u30ec\u30f3\u30c0\u30fc\u304b\u3089\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u3092\u3069\u3046\u305e\uff01"}</text>
      </g>

      {/* Booking confirmed */}
      <g style={{animation:"chatPop .5s 4.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <rect x="40" y="486" width="300" height="40" rx="12" fill="url(#concGradM)"/>
        <text x="190" y="511" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u2713 \u91d1\u66dc\u65e5 11:00 \u3067\u5546\u8ac7\u78ba\u5b9a\uff01"}</text>
      </g>

      {/* Arrow down to calendar */}
      <line x1="190" y1="530" x2="190" y2="555" stroke="#7c5cfc" strokeWidth="2" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
      </line>
      <polygon points="185,553 190,563 195,553" fill="#7c5cfc"/>

      {/* Calendar panel */}
      <g filter="url(#concShadowM)">
        <rect x="20" y="570" width="340" height="200" rx="16" fill="white" stroke="var(--border)" strokeWidth="1.5"/>
        <rect x="21" y="571" width="338" height="44" rx="0" fill="#f0ecfe"/>
        <rect x="21" y="571" width="16" height="16" rx="16" fill="#f0ecfe"/>
        <rect x="21" y="579" width="16" height="8" fill="#f0ecfe"/>
        <rect x="29" y="571" width="8" height="16" fill="#f0ecfe"/>
        <rect x="343" y="571" width="16" height="16" rx="16" fill="#f0ecfe"/>
        <rect x="343" y="579" width="16" height="8" fill="#f0ecfe"/>
        <rect x="335" y="571" width="16" height="16" fill="#f0ecfe"/>
        <SvgIcon d={ICON.cal} x={160} y={592} size={18} color="#7c5cfc"/>
        <text x="180" y="599" fontSize="14" fontWeight="800" fill="#7c5cfc" fontFamily="var(--fb)">{"\u65e5\u7a0b\u9078\u629e"}</text>
      </g>

      {/* Calendar slots */}
      {[
        {day:"\u6708\u66dc\u65e5",time:"10:00",sel:false},
        {day:"\u6c34\u66dc\u65e5",time:"14:00",sel:false},
        {day:"\u91d1\u66dc\u65e5",time:"11:00",sel:true},
        {day:"\u6765\u9031\u706b",time:"15:00",sel:false},
      ].map((slot,i) => (
        <g key={i}>
          <rect x="40" y={624+i*38} width="300" height="32" rx="10"
            fill={slot.sel?"#7c5cfc":"white"} stroke={slot.sel?"#7c5cfc":"#dfe3f0"} strokeWidth={slot.sel?2:1.5}/>
          <text x="58" y={644+i*38} fontSize="13" fontWeight="700" fill={slot.sel?"white":"#0f1128"} fontFamily="var(--fb)">{slot.day}</text>
          <text x="320" y={644+i*38} textAnchor="end" fontSize="13" fontWeight="600" fill={slot.sel?"rgba(255,255,255,.85)":"#6e7494"} fontFamily="var(--fm)">{slot.time}</text>
          {slot.sel && <SvgIcon d="M20 6L9 17l-5-5" x={330} y={634+i*38} size={14} color="white"/>}
        </g>
      ))}

      {/* Bottom stats */}
      <rect x="60" y="782" width="120" height="30" rx="8" fill="#f0ecfe" stroke="#c9bef5" strokeWidth="1"/>
      <text x="120" y="802" textAnchor="middle" fontSize="12" fontWeight="800" fill="#7c5cfc" fontFamily="var(--fb)">{"\u96e2\u8131\u7387 -40%"}</text>
      <rect x="200" y="782" width="120" height="30" rx="8" fill="#e5f8f2" stroke="#b8e6d8" strokeWidth="1"/>
      <text x="260" y="802" textAnchor="middle" fontSize="12" fontWeight="800" fill="#12a37d" fontFamily="var(--fb)">{"\u4e88\u7d04\u7387 +35%"}</text>
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

/* ── Quality Section Diagram ── */
function QualityFlowDiagram() {
  const card:React.CSSProperties = {borderRadius:18,padding:"20px 18px"};
  const stepLabel:React.CSSProperties = {fontSize:12,fontWeight:800,marginBottom:8};
  const bubble:React.CSSProperties = {borderRadius:10,padding:"6px 12px",fontSize:11,lineHeight:1.5};
  const bubbleBot:React.CSSProperties = {...bubble,background:"white",border:"1px solid #c8cedf",color:"#333"};
  const bubbleUser:React.CSSProperties = {...bubble,background:"#12a37d",color:"white",alignSelf:"flex-end"};

  return (
    <div style={{marginTop:48,padding:"32px 0"}}>
      <div className="qflow-hz">
        {/* STEP 1 */}
        <div className="qflow-hz-step" style={{...card,background:"#e5f8f2",border:"2px solid #12a37d"}}>
          <div style={{...stepLabel,color:"#12a37d"}}>STEP 1 — 事前ヒアリング</div>
          <div style={{fontSize:11,color:"#555",marginBottom:8,lineHeight:1.5}}>必要項目の入力に誘導。基準を満たしたリードのみ次へ。</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
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
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,background:"#f0ecfe",border:"2px dashed #7c5cfc",borderRadius:12,padding:"14px 18px",writingMode:"vertical-rl",textOrientation:"mixed"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
            <span style={{fontSize:11,fontWeight:700,color:"#7c5cfc",letterSpacing:1}}>基準通過</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* STEP 2 */}
        <div className="qflow-hz-step" style={{...card,background:"#eaf0fe",border:"2px solid #3b6ff5"}}>
          <div style={{...stepLabel,color:"#3b6ff5"}}>STEP 2 — 商談日時の確定</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <div style={bubbleBot}>下記日程でご都合はいかがですか？</div>
            <div style={{...bubble,background:"white",border:"1px solid #3b6ff5",color:"#3b6ff5",fontSize:10,display:"flex",gap:8,flexWrap:"wrap"}}>
              <span>📅 3/10 14:00</span><span>📅 3/11 10:00</span><span>📅 3/12 15:00</span>
            </div>
            <div style={bubbleUser}>3/10 14:00でお願いします</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* STEP 3 */}
        <div className="qflow-hz-step" style={{...card,background:"#f0ecfe",border:"2px solid #7c5cfc"}}>
          <div style={{...stepLabel,color:"#7c5cfc"}}>STEP 3 — 追加アンケート</div>
          <div style={{fontSize:11,color:"#555",marginBottom:8,lineHeight:1.5}}>商談準備に必要な情報を取得。</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <div style={bubbleBot}>ご利用中のツールは？</div>
            <div style={bubbleUser}>HubSpotを使っています</div>
            <div style={bubbleBot}>導入の優先度は？</div>
            <div style={bubbleUser}>今四半期中に導入したい</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="qflow-hz-arrow">→</div>

        {/* Result */}
        <div className="qflow-hz-step" style={{...card,background:"#12a37d",border:"2px solid #12a37d",justifyContent:"center",textAlign:"center"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ICON.users}/></svg>
            <span style={{fontSize:13,fontWeight:800,color:"white"}}>営業チームへ</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"5px 12px",fontSize:10,color:"white",fontWeight:600}}>CRM自動登録</span>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"5px 12px",fontSize:10,color:"white",fontWeight:600}}>即日通知</span>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:8,padding:"5px 12px",fontSize:10,color:"white",fontWeight:600}}>ヒアリング内容共有</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseCarousel(){
  const [idx, setIdx] = useState(0);
  const maxIdx = caseData.length - 1;
  const prev = ()=>setIdx(i=>Math.max(0,i-1));
  const next = ()=>setIdx(i=>Math.min(maxIdx,i+1));
  return(
    <div className="case-carousel">
      <div className="case-track" style={{transform:`translateX(-${idx * 100}%)`}}>
        {caseData.map((c,i)=>(
          <div className="case-card" key={i}>
            <div className="case-logo">{c.name}</div>
            <div className="case-industry">{c.industry}</div>
            <div className="case-quote">{c.quote}</div>
            <div className="case-stats">{c.stats.map((s,j)=>(
              <div key={j}><div className="case-stat-v" style={{color:s.c}}>{s.v}</div><div className="case-stat-l">{s.l}</div></div>
            ))}</div>
          </div>
        ))}
      </div>
      <div className="case-arrows">
        <button className="case-arrow" onClick={prev} disabled={idx===0}>←</button>
        <span style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--sub)",alignSelf:"center",fontWeight:600}}>{idx+1} / {caseData.length}</span>
        <button className="case-arrow" onClick={next} disabled={idx>=maxIdx}>→</button>
      </div>
      <div className="case-dots">
        {caseData.map((_,i)=>(
          <div key={i} className={"case-dot"+(i===idx?" active":"")} onClick={()=>setIdx(i)}/>
        ))}
      </div>
    </div>
  );
}

export default function HomePageClient(){
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const isMobile = useIsMobile(768);
  return(
    <div>
      <style dangerouslySetInnerHTML={{__html:css}}/>

      <Nav variant="light" />

      {/* HERO */}
      <section className="hero">
        <div className="dot-grid"/>
        <div className="glow" style={{background:"rgba(18,163,125,.2)",width:600,height:600,top:-200,right:-100}}/>
        <div className="glow" style={{background:"rgba(124,92,252,.15)",width:500,height:500,bottom:-150,left:-80}}/>
        <div className="glow" style={{background:"rgba(59,111,245,.1)",width:400,height:400,top:"40%",left:"50%"}}/>
        <div className="hero-content">
          <div className="anim d1 hero-badge"><div className="hero-badge-dot"/>AI インサイドセールス</div>
          <h1 className="anim d2">営業が動く前に、<br/><em>商談が届く</em></h1>
          <p className="anim d3 hero-sub">Webサイト・メール・資料——あらゆる接点にAIを配置。見込み客の関心が高いうちに、商談予約まで自動で完結します。</p>
          <div className="anim d4 hero-ctas">
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
          <div className="anim d5 hero-stats">
            {[{v:"7",l:"つの自動獲得チャネル"},{v:"24/7",l:"眠らないAIセールス"},{v:"5min",l:"で導入完了"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Overview Diagram */}
      <section className="section" style={{textAlign:"center",background:"var(--surface)",position:"relative"}}>
        <div className="section-inner">
          <div className="slabel">How it works</div>
          <div className="stitle">接点すべてが、<span style={{color:"var(--cta)"}}>商談獲得マシン</span>に変わる</div>
          <p className="ssub" style={{margin:"0 auto"}}>7つのチャネルが同時に稼働。訪問者を逃さず捉え、温度感が高いうちに商談へ変換します。</p>

          {/* Vertical Funnel: 7 channels inside Meeton ai → AI pipeline → Sales */}
          <div style={{marginTop:48,overflowX:"auto",padding:"8px 0"}}>
            {isMobile ? (
            <svg width="100%" viewBox="0 0 380 780" fill="none" style={{maxWidth:400,margin:"0 auto",display:"block"}}>
              <defs>
                <filter id="hubGlow"><feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#12a37d" floodOpacity=".18"/></filter>
                <filter id="nodeGlow"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity=".08"/></filter>
                <linearGradient id="hubGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12a37d" stopOpacity=".07"/><stop offset="100%" stopColor="#0fc19a" stopOpacity=".02"/></linearGradient>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b6ff5"/><stop offset="100%" stopColor="#6690fa"/></linearGradient>
                <linearGradient id="stepGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#12a37d"/><stop offset="100%" stopColor="#0fc19a"/></linearGradient>
              </defs>

              {/* Trapezoid funnel */}
              <g filter="url(#hubGlow)">
                <path d="M20,20 L360,20 Q375,20 375,35 L310,600 Q307,615 295,615 L85,615 Q73,615 70,600 L5,35 Q5,20 20,20 Z" fill="url(#hubGrad)" stroke="#12a37d" strokeWidth="2.5"/>
              </g>
              <path d="M20,20 L360,20 Q375,20 375,35 L310,600 Q307,615 295,615 L85,615 Q73,615 70,600 L5,35 Q5,20 20,20 Z" fill="none" stroke="#12a37d" strokeWidth="1" strokeDasharray="6 6" opacity=".3">
                <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="6s" repeatCount="indefinite"/>
              </path>

              <text x="190" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#12a37d" fontFamily="var(--fb)">Meeton ai</text>

              {/* 7 Channel cards - 2 columns */}
              {[
                {label:"AI \u30c1\u30e3\u30c3\u30c8\u30dc\u30c3\u30c8",color:"#0891b2",icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"},
                {label:"AI \u30e1\u30fc\u30eb",color:"#12a37d",icon:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"},
                {label:"\u8cc7\u6599\u30da\u30fc\u30b8",color:"#3b6ff5",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15l3 3 3-3"},
                {label:"\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",color:"#7c5cfc",icon:"M19 4H5a2 2 0 0 0-2 2v14l7-3 7 3V6a2 2 0 0 0-2-2z"},
                {label:"\u8cc7\u6599\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",color:"#d03ea1",icon:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0"},
                {label:"\u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af",color:"#e0475b",icon:"M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"},
                {label:"\u30ab\u30ec\u30f3\u30c0\u30fcQR",color:"#c026d3",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"},
              ].map((ch, i) => {
                const col = i % 2;
                const row = Math.floor(i / 2);
                const cardW = 155;
                const gap = 10;
                const cx = col === 0 ? 190 - cardW - gap/2 : 190 + gap/2;
                const cy = 64 + row * 46;
                return (
                  <g key={i}>
                    <line x1={cx + cardW / 2} y1={cy + 38} x2={190} y2={260} stroke={ch.color} strokeWidth="1" strokeDasharray="4 4" opacity=".25">
                      <animate attributeName="stroke-dashoffset" from="16" to="0" dur={`${1.5 + i * 0.12}s`} repeatCount="indefinite"/>
                    </line>
                    <circle r="2" fill={ch.color} opacity=".5">
                      <animateMotion dur={`${2.5 + i * 0.18}s`} repeatCount="indefinite" path={`M${cx + cardW / 2},${cy + 38} L190,260`}/>
                    </circle>
                    <g filter="url(#nodeGlow)">
                      <rect x={cx} y={cy} width={cardW} height="36" rx="10" fill="white" stroke={ch.color} strokeWidth="1.5"/>
                      <g transform={`translate(${cx + 10}, ${cy + 6})`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ch.icon}/></svg>
                      </g>
                      <text x={cx + 38} y={cy + 23} fontSize="12" fontWeight="700" fill="#0f1128" fontFamily="var(--fb)">{ch.label}</text>
                    </g>
                  </g>
                );
              })}

              {/* Convergence */}
              <circle cx="190" cy="260" r="14" fill="#12a37d" opacity=".12"/>
              <circle cx="190" cy="260" r="5" fill="#12a37d"/>
              <circle cx="190" cy="260" r="14" fill="none" stroke="#12a37d" strokeWidth="1.5" opacity="0">
                <animate attributeName="r" from="5" to="22" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from=".4" to="0" dur="2s" repeatCount="indefinite"/>
              </circle>

              {/* Arrow down */}
              <line x1="190" y1="276" x2="190" y2="305" stroke="#12a37d" strokeWidth="2.5" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="184,303 190,315 196,303" fill="#12a37d"/>

              {/* Pipeline steps */}
              <g filter="url(#nodeGlow)">
                <rect x="120" y="320" width="140" height="48" rx="14" fill="url(#stepGrad)"/>
                <text x="190" y="350" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u7cbe\u67fb"}</text>
              </g>
              <line x1="190" y1="368" x2="190" y2="393" stroke="#12a37d" strokeWidth="2.5" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="184,391 190,403 196,391" fill="#12a37d"/>

              <g filter="url(#nodeGlow)">
                <rect x="120" y="408" width="140" height="48" rx="14" fill="url(#stepGrad)"/>
                <text x="190" y="438" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u5546\u8ac7\u4e88\u7d04"}</text>
              </g>
              <line x1="190" y1="456" x2="190" y2="481" stroke="#12a37d" strokeWidth="2.5" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="184,479 190,491 196,479" fill="#12a37d"/>

              <g filter="url(#nodeGlow)">
                <rect x="120" y="496" width="140" height="48" rx="14" fill="url(#stepGrad)"/>
                <text x="190" y="526" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u30d2\u30a2\u30ea\u30f3\u30b0"}</text>
              </g>

              <circle r="4" fill="white" opacity=".8">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M190,345 L190,433 L190,521"/>
              </circle>

              {/* Exit */}
              <rect x="172" y="608" width="36" height="14" fill="var(--surface)"/>
              <line x1="190" y1="544" x2="190" y2="645" stroke="#3b6ff5" strokeWidth="3" strokeDasharray="8 4">
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="183,643 190,657 197,643" fill="#3b6ff5"/>
              <circle r="4" fill="#3b6ff5" opacity=".6">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M190,544 L190,653"/>
              </circle>
              <circle cx="190" cy="657" r="6" fill="none" stroke="#3b6ff5" strokeWidth="2" opacity="0">
                <animate attributeName="r" from="6" to="20" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from=".5" to="0" dur="2s" repeatCount="indefinite"/>
              </circle>

              {/* Sales team */}
              <g filter="url(#nodeGlow)">
                <rect x="100" y="670" width="180" height="76" rx="18" fill="url(#salesGrad)"/>
                <text x="190" y="700" textAnchor="middle" fontSize="18" fontWeight="900" fill="white" fontFamily="var(--fb)">{"\u55b6\u696d\u30c1\u30fc\u30e0"}</text>
                <text x="190" y="722" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,.8)" fontFamily="var(--fb)">{"\u8cea\u306e\u9ad8\u3044\u5546\u8ac7\u304c\u5c4a\u304f"}</text>
              </g>
            </svg>
            ) : (
            <svg width="100%" viewBox="0 0 800 700" fill="none" style={{maxWidth:800,margin:"0 auto",display:"block"}}>
              <defs>
                <filter id="hubGlow"><feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#12a37d" floodOpacity=".18"/></filter>
                <filter id="nodeGlow"><feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity=".08"/></filter>
                <linearGradient id="hubGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12a37d" stopOpacity=".07"/><stop offset="100%" stopColor="#0fc19a" stopOpacity=".02"/></linearGradient>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b6ff5"/><stop offset="100%" stopColor="#6690fa"/></linearGradient>
                <linearGradient id="stepGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#12a37d"/><stop offset="100%" stopColor="#0fc19a"/></linearGradient>
              </defs>

              {/* ── Trapezoid funnel boundary (Meeton ai ecosystem) ── */}
              <g filter="url(#hubGlow)">
                <path d="M60,20 L740,20 Q760,20 760,40 L600,540 Q595,555 580,555 L220,555 Q205,555 200,540 L40,40 Q40,20 60,20 Z" fill="url(#hubGrad)" stroke="#12a37d" strokeWidth="2.5"/>
              </g>
              {/* Animated border */}
              <path d="M60,20 L740,20 Q760,20 760,40 L600,540 Q595,555 580,555 L220,555 Q205,555 200,540 L40,40 Q40,20 60,20 Z" fill="none" stroke="#12a37d" strokeWidth="1" strokeDasharray="6 6" opacity=".3">
                <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="6s" repeatCount="indefinite"/>
              </path>

              {/* Ecosystem label at top */}
              <text x="400" y="52" textAnchor="middle" fontSize="24" fontWeight="900" fill="#12a37d" fontFamily="var(--fb)">Meeton ai</text>

              {/* ── 7 Channel cards (top zone inside funnel) ── */}
              {[
                {label:"AI \u30c1\u30e3\u30c3\u30c8\u30dc\u30c3\u30c8",color:"#0891b2",icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"},
                {label:"AI \u30e1\u30fc\u30eb",color:"#12a37d",icon:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"},
                {label:"\u8cc7\u6599\u30da\u30fc\u30b8",color:"#3b6ff5",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15l3 3 3-3"},
                {label:"\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8",color:"#7c5cfc",icon:"M19 4H5a2 2 0 0 0-2 2v14l7-3 7 3V6a2 2 0 0 0-2-2z"},
                {label:"\u8cc7\u6599\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",color:"#d03ea1",icon:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0"},
                {label:"\u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af",color:"#e0475b",icon:"M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"},
                {label:"\u30ab\u30ec\u30f3\u30c0\u30fcQR",color:"#c026d3",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"},
              ].map((ch, i) => {
                /* Row 1: 4 cards, Row 2: 3 cards centered */
                const isRow1 = i < 4;
                const colIdx = isRow1 ? i : i - 4;
                const rowCount = isRow1 ? 4 : 3;
                const cardW = 148;
                const gap = 12;
                const totalW = rowCount * cardW + (rowCount - 1) * gap;
                const startX = 400 - totalW / 2;
                const cx = startX + colIdx * (cardW + gap);
                const cy = isRow1 ? 74 : 124;
                return (
                  <g key={i}>
                    {/* Animated flow line downward to convergence */}
                    <line x1={cx + cardW / 2} y1={cy + 40} x2={400} y2={230} stroke={ch.color} strokeWidth="1" strokeDasharray="4 4" opacity=".25">
                      <animate attributeName="stroke-dashoffset" from="16" to="0" dur={`${1.5 + i * 0.12}s`} repeatCount="indefinite"/>
                    </line>
                    <circle r="2.5" fill={ch.color} opacity=".5">
                      <animateMotion dur={`${2.5 + i * 0.18}s`} repeatCount="indefinite" path={`M${cx + cardW / 2},${cy + 40} L400,230`}/>
                    </circle>
                    {/* Channel card */}
                    <g filter="url(#nodeGlow)">
                      <rect x={cx} y={cy} width={cardW} height="38" rx="10" fill="white" stroke={ch.color} strokeWidth="1.5"/>
                      <g transform={`translate(${cx + 10}, ${cy + 7})`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ch.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ch.icon}/></svg>
                      </g>
                      <text x={cx + 40} y={cy + 24} fontSize="10.5" fontWeight="700" fill="#0f1128" fontFamily="var(--fb)">{ch.label}</text>
                    </g>
                  </g>
                );
              })}

              {/* ── Convergence zone ── */}
              <circle cx="400" cy="230" r="16" fill="#12a37d" opacity=".12"/>
              <circle cx="400" cy="230" r="6" fill="#12a37d"/>
              <circle cx="400" cy="230" r="16" fill="none" stroke="#12a37d" strokeWidth="1.5" opacity="0">
                <animate attributeName="r" from="6" to="24" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from=".4" to="0" dur="2s" repeatCount="indefinite"/>
              </circle>

              {/* Arrow down to pipeline */}
              <line x1="400" y1="246" x2="400" y2="275" stroke="#12a37d" strokeWidth="2.5" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="394,273 400,285 406,273" fill="#12a37d"/>

              {/* ── AI Processing Pipeline (3 vertical steps) ── */}
              {/* Step 1: 精査 */}
              <g filter="url(#nodeGlow)">
                <rect x="330" y="290" width="140" height="50" rx="14" fill="url(#stepGrad)"/>
                <text x="400" y="320" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u7cbe\u67fb"}</text>
              </g>
              <line x1="400" y1="340" x2="400" y2="365" stroke="#12a37d" strokeWidth="2.5" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="394,363 400,375 406,363" fill="#12a37d"/>

              {/* Step 2: 商談予約 */}
              <g filter="url(#nodeGlow)">
                <rect x="330" y="380" width="140" height="50" rx="14" fill="url(#stepGrad)"/>
                <text x="400" y="410" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u5546\u8ac7\u4e88\u7d04"}</text>
              </g>
              <line x1="400" y1="430" x2="400" y2="455" stroke="#12a37d" strokeWidth="2.5" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="394,453 400,465 406,453" fill="#12a37d"/>

              {/* Step 3: ヒアリング */}
              <g filter="url(#nodeGlow)">
                <rect x="330" y="470" width="140" height="50" rx="14" fill="url(#stepGrad)"/>
                <text x="400" y="500" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="var(--fb)">{"\u30d2\u30a2\u30ea\u30f3\u30b0"}</text>
              </g>

              {/* Animated dot along vertical pipeline */}
              <circle r="4" fill="white" opacity=".8">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,315 L400,405 L400,495"/>
              </circle>

              {/* ── Exit: arrow breaking through funnel bottom ── */}
              <rect x="382" y="548" width="36" height="14" fill="var(--surface)"/>
              <line x1="400" y1="520" x2="400" y2="585" stroke="#3b6ff5" strokeWidth="3" strokeDasharray="8 4">
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>
              </line>
              <polygon points="392,583 400,597 408,583" fill="#3b6ff5"/>

              {/* Animated exit dot */}
              <circle r="4" fill="#3b6ff5" opacity=".6">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M400,520 L400,593"/>
              </circle>

              {/* Pulse at exit */}
              <circle cx="400" cy="597" r="6" fill="none" stroke="#3b6ff5" strokeWidth="2" opacity="0">
                <animate attributeName="r" from="6" to="20" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from=".5" to="0" dur="2s" repeatCount="indefinite"/>
              </circle>

              {/* ── 営業チーム (OUTSIDE the funnel) ── */}
              <g filter="url(#nodeGlow)">
                <rect x="310" y="610" width="180" height="76" rx="18" fill="url(#salesGrad)"/>
                <text x="400" y="640" textAnchor="middle" fontSize="18" fontWeight="900" fill="white" fontFamily="var(--fb)">{"\u55b6\u696d\u30c1\u30fc\u30e0"}</text>
                <text x="400" y="662" textAnchor="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,.8)" fontFamily="var(--fb)">{"\u8cea\u306e\u9ad8\u3044\u5546\u8ac7\u304c\u5c4a\u304f"}</text>
              </g>
            </svg>
            )}
          </div>
        </div>
      </section>

      {/* 3 CATEGORY CARDS */}
      <section className="section" id="features" style={{position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>Products</div>
          <div className="stitle" style={{textAlign:"center"}}>商談をつくる、<span style={{color:"var(--cta)"}}>3つのプロダクト</span></div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>AIチャットボットを軸に、サイト内外のあらゆる接点から商談を自動獲得します。</p>

          <div className="cat-grid">
            {/* CORE ENGINE */}
            <div className="cat-card" style={{"--cat-color":"#0891b2"} as React.CSSProperties}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#0891b2,#06b6d4)",opacity:0,transition:"opacity .3s"}} className="cat-card-accent"/>
              <style dangerouslySetInnerHTML={{__html:`.cat-card:hover .cat-card-accent{opacity:1 !important}`}}/>
              <div className="cat-label" style={{background:"#0891b210",color:"#0891b2"}}>CORE ENGINE</div>
              <div className="cat-title">AI チャットボット</div>
              <div className="cat-desc">AIが訪問者に自ら話しかけ、ニーズを把握し、リード獲得から商談予約まで会話の流れで完結。</div>
              <div className="cat-features">
                {[
                  {label:"ページ文脈に応じた自動声かけ",color:"#0891b2",icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"},
                  {label:"会話からニーズ把握＆資料提案",color:"#12a37d",icon:"M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"},
                  {label:"チャット内でリード獲得",color:"#3b6ff5",icon:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"},
                  {label:"温度感に応じて商談予約まで完結",color:"#7c5cfc",icon:"M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"},
                ].map((f,i)=>(
                  <div className="cat-feat" key={i}>
                    <div className="cat-feat-icon" style={{background:`${f.color}12`}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon}/></svg>
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>
              <a href="/features/chatbot/" className="cat-link">詳しく見る <span>→</span></a>
            </div>

            {/* ON-SITE CHANNELS */}
            <div className="cat-card" style={{"--cat-color":"#12a37d"} as React.CSSProperties}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#12a37d,#0fc19a)",opacity:0,transition:"opacity .3s"}} className="cat-card-accent"/>
              <style dangerouslySetInnerHTML={{__html:`.cat-card:hover .cat-card-accent{opacity:1 !important}`}}/>
              <div className="cat-label" style={{background:"#12a37d10",color:"#12a37d"}}>ON-SITE CHANNELS</div>
              <div className="cat-title">サイト内チャネル</div>
              <div className="cat-desc">資料ページ・ポップアップ・サンクスページ。サイト内の3つの接点にAIを配置し、取りこぼしゼロを実現。</div>
              <div className="cat-features">
                {[
                  {label:"AI付き資料ダウンロードページ",color:"#3b6ff5",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15l3 3 3-3"},
                  {label:"関心に応じた資料ポップアップ",color:"#d03ea1",icon:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0"},
                  {label:"サンクスページで追加アクション",color:"#7c5cfc",icon:"M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3"},
                ].map((f,i)=>(
                  <div className="cat-feat" key={i}>
                    <div className="cat-feat-icon" style={{background:`${f.color}12`}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon}/></svg>
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>
              <a href="/features/onsite/" className="cat-link">詳しく見る <span>→</span></a>
            </div>

            {/* OFF-SITE CHANNELS */}
            <div className="cat-card" style={{"--cat-color":"#3b6ff5"} as React.CSSProperties}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#3b6ff5,#6690fa)",opacity:0,transition:"opacity .3s"}} className="cat-card-accent"/>
              <style dangerouslySetInnerHTML={{__html:`.cat-card:hover .cat-card-accent{opacity:1 !important}`}}/>
              <div className="cat-label" style={{background:"#3b6ff510",color:"#3b6ff5"}}>OUTREACH CHANNELS</div>
              <div className="cat-title">サイト外チャネル</div>
              <div className="cat-desc">AIメール・カレンダーリンク・カレンダーQR。サイトの外でもリードを育成し、商談予約を獲得。</div>
              <div className="cat-features">
                {[
                  {label:"AIパーソナライズメール",color:"#12a37d",icon:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"},
                  {label:"メール・PDFにカレンダーリンク",color:"#e0475b",icon:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"},
                  {label:"名刺・展示会にカレンダーQR",color:"#c026d3",icon:"M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z M12 18h.01"},
                ].map((f,i)=>(
                  <div className="cat-feat" key={i}>
                    <div className="cat-feat-icon" style={{background:`${f.color}12`}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon}/></svg>
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>
              <a href="/features/offsite/" className="cat-link">詳しく見る <span>→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* AI CONCIERGE */}
      <section className="section" id="concierge" style={{background:"linear-gradient(165deg,#f3f0ff 0%,#fff 40%,#edfcf7 100%)",position:"relative",overflow:"hidden"}}>
        <div className="dot-grid" style={{opacity:.2}}/>
        <div className="glow" style={{background:"rgba(124,92,252,.12)",width:500,height:500,top:-100,right:-80}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>AI CONCIERGE</div>
          <div className="stitle" style={{textAlign:"center"}}>{"すべてのチャネルに、予約を後押しするAIがいる"}</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>{"カレンダー表示だけでは予約されない。AIチャットが疑問を解消し、最後の一押しで離脱を防ぎます。"}</p>
          <div style={{marginTop:48,overflowX:"auto"}}>
            {isMobile ? <DiagramAIConciergeMobile/> : <DiagramAIConcierge/>}
          </div>
        </div>
      </section>

      {/* QUALITY MEETINGS */}
      <section className="section" id="quality" style={{background:"var(--surface)",position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>Quality Control</div>
          <div className="stitle" style={{textAlign:"center"}}>数だけじゃない。<span style={{color:"var(--cta)"}}>質の高い商談</span>を届ける</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>AIが事前に見極め、ヒアリングし、営業が本当に会うべき相手だけを商談として届けます。</p>

          {/* Quality Flow Diagram */}
          <div style={{overflowX:"auto"}}>
            <QualityFlowDiagram/>
          </div>

          <div className="qual-grid">
            {qualityData.map((q,i)=>(
              <div className="qual-card" key={i}>
                <div className="qual-icon" style={{background:q.bg,border:`1px solid ${q.border}`,color:q.color}}>{qualityIcons[q.iconKey]}</div>
                <div className="qual-title">{q.title}</div>
                <div className="qual-desc">{q.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section">
        <div className="section-inner">
          <div className="slabel" style={{textAlign:"center"}}>導入ステップ</div>
          <div className="stitle" style={{textAlign:"center"}}>かんたん3ステップで導入</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>開発リソース不要。最短当日から稼働開始。</p>
          <div className="steps-row">
            {stepsData.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"stretch",flex:1}}>
                <div className="step-card" style={{display:"flex",flexDirection:"column"}}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                  <div style={{marginTop:"auto",paddingTop:18}}>
                    {i===0&&(
                      <div style={{background:"var(--surface)",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                        <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--sub)",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:6,padding:"6px 10px",whiteSpace:"nowrap",fontWeight:600}}>&lt;script src=&quot;meeton.js&quot;&gt;</div>
                        <div style={{fontSize:18,animation:"pulse 2s infinite"}}>✅</div>
                      </div>
                    )}
                    {i===1&&(
                      <div style={{background:"var(--surface)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:6}}>
                        {["💬 声かけ内容","📅 予約ルール","🎯 見込み基準"].map((item,j)=>(
                          <div key={j} style={{display:"flex",alignItems:"center",gap:8,fontSize:11,fontWeight:700,color:"var(--heading)"}}>
                            <span>{item}</span>
                            <div style={{flex:1,height:6,background:"var(--bg)",borderRadius:3,overflow:"hidden",border:"1px solid var(--border)"}}>
                              <div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,var(--cta),var(--accent))",width:j===0?"90%":j===1?"60%":"40%",transition:"width 1s"}}/>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {i===2&&(
                      <div style={{background:"var(--surface)",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                        <div style={{display:"flex",gap:4}}>
                          {["📧","🎯","📅"].map((e,j)=>(
                            <div key={j} style={{width:32,height:32,borderRadius:8,background:"var(--bg)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,animation:`nodeGrow .4s ${j*0.2}s cubic-bezier(.16,1,.3,1) forwards`,opacity:0,transform:"scale(0)"}}>{e}</div>
                          ))}
                        </div>
                        <div style={{fontSize:10,fontWeight:700,color:"var(--cta)",lineHeight:1.4}}>商談獲得<br/>自動で稼働開始</div>
                      </div>
                    )}
                  </div>
                </div>
                {i<2&&<div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="section" style={{background:"var(--surface)"}}>
        <div className="section-inner">
          <div className="slabel" style={{textAlign:"center"}}>導入実績</div>
          <div className="stitle" style={{textAlign:"center"}}>商談創出の実績</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>Meeton ai が生み出した商談成果をご紹介します。</p>
          <CaseCarousel/>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="section" id="integrations" style={{position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>ツール連携</div>
          <div className="stitle" style={{textAlign:"center"}}>主要ツールとシームレスに連携</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>既存のビジネスツールとかんたんに統合し、すぐに使い始められます。</p>
          <div className="int-grid">
            {integrations.map((t,i)=>(
              <div className="int-card" key={i}>
                <img src={t.logo} alt={t.name} className="int-icon"/>
                <div className="int-name">{t.name}</div>
                <div className="int-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{background:"var(--surface)"}}>
        <div className="section-inner">
          <div className="slabel" style={{textAlign:"center"}}>よくある質問</div>
          <div className="stitle" style={{textAlign:"center"}}>FAQ</div>
          <div style={{height:36}}/>
          <div className="faq-list">{faqData.map((f,i)=>(
            <div className={"faq-item"+(openFaq===i?" open":"")} key={i}>
              <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>{f.q}<div className="faq-toggle">+</div></div>
              {openFaq===i&&<div className="faq-a">{f.a}</div>}
            </div>
          ))}</div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section" style={{textAlign:"center"}}>
        <div className="section-inner">
          <div className="slabel">導入企業</div>
          <div className="stitle">先進企業に選ばれています</div>
          <div style={{height:36}}/>
          <div className="client-logos">{clients.map(c=><div className="client-logo" key={c.name}><img src={c.logo} alt={c.name}/></div>)}</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="glow" style={{background:"rgba(18,163,125,.15)",width:500,height:500,top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
        <div className="final-cta-inner">
          <div className="slabel">Get Started</div>
          <div className="stitle" style={{textAlign:"center"}}>営業チームが、<br/>商談に集中できる世界へ</div>
          <p className="ssub" style={{textAlign:"center",margin:"16px auto 36px"}}>導入は5分。7つのAIチャネルが24時間稼働し、商談を自動で獲得し続けます。</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="meeton-ai" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="meeton-ai" />
    </div>
  );
}
