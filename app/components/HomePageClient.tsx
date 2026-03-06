'use client'

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
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

/* FEATURE CARDS - 7 features grid */
.feat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
.feat-card{background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:0;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden;display:flex;flex-direction:column}
.feat-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.12)}
.feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;opacity:0;transition:opacity .3s}
.feat-card:hover::before{opacity:1}
.feat-card-body{padding:32px 32px 28px}
.feat-card-vis{flex:1;min-height:220px;position:relative;overflow:hidden;border-top:1px solid var(--border);background:var(--surface)}
.feat-num{font-family:var(--fm);font-size:13px;font-weight:700;letter-spacing:2px;margin-bottom:12px;display:inline-flex;align-items:center;gap:8px;padding:4px 12px;border-radius:8px}
.feat-title{font-size:clamp(20px,3vw,24px);font-weight:900;color:var(--heading);letter-spacing:-.3px;margin-bottom:10px;line-height:1.3}
.feat-desc{font-size:15px;line-height:1.85;color:var(--sub)}
.feat-card-full{grid-column:1/-1}

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
  .feat-grid{grid-template-columns:1fr}
  .feat-card-full{grid-column:1}
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
    title: "AI \u30c1\u30e3\u30c3\u30c8\u30dc\u30c3\u30c8",
    desc: "\u8a2a\u554f\u8005\u3092\u5f85\u305f\u306a\u3044\u3002AI\u304c\u5148\u306b\u58f0\u3092\u304b\u3051\u3001\u30cb\u30fc\u30ba\u3092\u5f15\u304d\u51fa\u3057\u3001\u8cc7\u6599\u3092\u5c4a\u3051\u3001\u305d\u306e\u307e\u307e\u5546\u8ac7\u4e88\u7d04\u307e\u3067\u5b8c\u7d50\u3002Google\u5e83\u544a\u30fbLinkedIn\u5e83\u544a\u7d4c\u7531\u306eLP\u306b\u3082\u8a2d\u7f6e\u3067\u304d\u308b\u306e\u3067\u3001\u5e83\u544a\u8cbb\u3092\u304b\u3051\u305f\u6d41\u5165\u3092\u53d6\u308a\u3053\u307c\u3055\u305a\u5546\u8ac7\u3078\u7e4b\u3052\u307e\u3059\u3002",
  },
  {
    num: "02",
    color: "#12a37d",
    bg: "#12a37d10",
    gradient: "linear-gradient(135deg,#12a37d,#0fc19a)",
    title: "AI \u30e1\u30fc\u30eb",
    desc: "\u30a4\u30f3\u30d0\u30a6\u30f3\u30c9\u30ea\u30fc\u30c9\u306b\u5bfe\u3057\u3066AI\u304c\u81ea\u52d5\u3067\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0\u30fb\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7\u3057\u3001\u5546\u8ac7\u78ba\u5b9a\u307e\u3067\u8a98\u5c0e\u3002\u30a6\u30a7\u30d3\u30ca\u30fc\u30fb\u30bb\u30df\u30ca\u30fc\u306e\u53c2\u52a0\u8005\u30ea\u30b9\u30c8\u3082CRM\u9023\u643a\u3084Webhook\u7d4c\u7531\u3067\u81ea\u52d5\u53d6\u308a\u8fbc\u307f\u3001\u30a4\u30d9\u30f3\u30c8\u76f4\u5f8c\u306e\u71b1\u91cf\u304c\u9ad8\u3044\u30bf\u30a4\u30df\u30f3\u30b0\u3092\u9003\u3057\u307e\u305b\u3093\u3002",
  },
  {
    num: "03",
    color: "#3b6ff5",
    bg: "#3b6ff510",
    gradient: "linear-gradient(135deg,#3b6ff5,#6690fa)",
    title: "AI \u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30bb\u30f3\u30bf\u30fc",
    desc: "\u8cc7\u6599\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30da\u30fc\u30b8\u3092\u30b5\u30a4\u30c8\u306b\u7c21\u5358\u8ffd\u52a0\u3002AI\u304c\u300c\u3069\u306e\u8cc7\u6599\u304c\u5408\u3046\u304b\u300d\u3092\u63d0\u6848\u3057\u306a\u304c\u3089\u3001\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u304b\u3089\u5546\u8ac7\u4e88\u7d04\u307e\u3067\u4e00\u6c17\u306b\u8a98\u5c0e\u3057\u307e\u3059\u3002",
  },
  {
    num: "04",
    color: "#7c5cfc",
    bg: "#7c5cfc10",
    gradient: "linear-gradient(135deg,#7c5cfc,#a78bfa)",
    title: "\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8\u3067\u5373\u5ea7\u306b\u30ab\u30ec\u30f3\u30c0\u30fc\u63d0\u793a",
    desc: "\u554f\u3044\u5408\u308f\u305b\u3084\u8cc7\u6599\u8acb\u6c42\u306e\u76f4\u5f8c\u2014\u2014\u6700\u3082\u71b1\u91cf\u304c\u9ad8\u3044\u77ac\u9593\u306b\u3001\u30ab\u30ec\u30f3\u30c0\u30fc\u3092\u63d0\u793a\u3002AI\u30c1\u30e3\u30c3\u30c8\u304c\u6a2a\u3067\u7591\u554f\u306b\u7b54\u3048\u308b\u306e\u3067\u3001\u300c\u3061\u3087\u3063\u3068\u8074\u304d\u305f\u3044\u3053\u3068\u304c\u3042\u308b\u3051\u3069\u2026\u300d\u3067\u96e2\u8131\u3055\u305b\u307e\u305b\u3093\u3002",
  },
  {
    num: "05",
    color: "#d03ea1",
    bg: "#d03ea110",
    gradient: "linear-gradient(135deg,#d03ea1,#e879b9)",
    title: "AI \u8cc7\u6599\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7",
    desc: "\u300c\u4eca\u898b\u3066\u3044\u308b\u30da\u30fc\u30b8\u300d\u306b\u5408\u3063\u305f\u8cc7\u6599\u3092\u3001AI\u304c\u81ea\u52d5\u3067\u9078\u3073\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u63d0\u6848\u3002\u8cc7\u6599DL\u3092\u5165\u308a\u53e3\u306b\u3001\u81ea\u7136\u306a\u6d41\u308c\u3067\u5546\u8ac7\u7372\u5f97\u3078\u7e4b\u3052\u307e\u3059\u3002",
  },
  {
    num: "06",
    color: "#e0475b",
    bg: "#e0475b10",
    gradient: "linear-gradient(135deg,#e0475b,#f87171)",
    title: "\u55b6\u696d\u30e1\u30fc\u30eb\u306b AI \u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af",
    desc: "\u30a2\u30dd\u96fb\u5f8c\u306e\u8cc7\u6599\u9001\u4ed8\u3084\u65e5\u7a0b\u8abf\u6574\u30e1\u30fc\u30eb\u306b\u30ab\u30ec\u30f3\u30c0\u30fc\u30ea\u30f3\u30af\u3092\u633f\u5165\u3002\u300c\u3054\u90fd\u5408\u306e\u826f\u3044\u65e5\u306f\uff1f\u300d\u306e\u3084\u308a\u3068\u308a\u304c\u6d88\u3048\u3001\u30ef\u30f3\u30af\u30ea\u30c3\u30af\u3067\u5546\u8ac7\u78ba\u5b9a\u3002AI\u30c1\u30e3\u30c3\u30c8\u304c\u4e88\u7d04\u524d\u306e\u4e0d\u5b89\u3082\u89e3\u6d88\u3057\u307e\u3059\u3002",
  },
  {
    num: "07",
    color: "#c026d3",
    bg: "#c026d310",
    gradient: "linear-gradient(135deg,#c026d3,#d946ef)",
    title: "PDF\u30fb\u8cc7\u6599\u5185\u304b\u3089\u76f4\u63a5\u4e88\u7d04",
    desc: "\u8cc7\u6599\u3092\u8aad\u3093\u3067\u3044\u308b\u4eba\u306f\u3001\u6700\u3082\u71b1\u91cf\u304c\u9ad8\u3044\u898b\u8fbc\u5ba2\u3002PDF\u5185\u306eURL\u3084QR\u30b3\u30fc\u30c9\u304b\u3089\u3001\u8aad\u3093\u3067\u3044\u308b\u305d\u306e\u77ac\u9593\u306b\u5546\u8ac7\u4e88\u7d04\u3078\u8a98\u5c0e\u3057\u307e\u3059\u3002",
  },
];

const qualityData = [
  {
    icon: "\ud83c\udfaf",
    bg: "linear-gradient(135deg,#e5f8f2,#eaf0fe)",
    border: "#b8e6d8",
    title: "AI\u304c\u4e8b\u524d\u306b\u898b\u6975\u3081\u308b",
    desc: "\u30c1\u30e3\u30c3\u30c8\u306e\u56de\u7b54\u3084\u30d5\u30a9\u30fc\u30e0\u5165\u529b\u3092\u3082\u3068\u306b\u3001\u30ab\u30ec\u30f3\u30c0\u30fc\u306e\u8868\u793a/\u975e\u8868\u793a\u30fb\u62c5\u5f53\u8005\u632f\u308a\u5206\u3051\u3092\u81ea\u52d5\u5206\u5c90\u3002\u300c\u4f1a\u3046\u4fa1\u5024\u306e\u3042\u308b\u5546\u8ac7\u300d\u3060\u3051\u304c\u5c4a\u304d\u307e\u3059\u3002",
  },
  {
    icon: "\ud83d\udcdd",
    bg: "linear-gradient(135deg,#f0ecfe,#eaf0fe)",
    border: "#c9bef5",
    title: "\u5546\u8ac7\u524d\u306bAI\u304c\u6df1\u6398\u308a",
    desc: "\u4e88\u7d04\u6e08\u307f\u306e\u9867\u5ba2\u306bAI\u304c\u8ffd\u52a0\u30d2\u30a2\u30ea\u30f3\u30b0\u3002\u55b6\u696d\u306f\u300c\u4f55\u306b\u56f0\u3063\u3066\u3044\u308b\u304b\u300d\u3092\u628a\u63e1\u3057\u305f\u72b6\u614b\u3067\u5546\u8ac7\u306b\u81e8\u3081\u308b\u306e\u3067\u3001\u521d\u56de\u304b\u3089\u63d0\u6848\u306e\u7cbe\u5ea6\u304c\u9055\u3044\u307e\u3059\u3002",
  },
  {
    icon: "\ud83d\udd17",
    bg: "linear-gradient(135deg,#eaf0fe,#e5f8f2)",
    border: "#bcc8f5",
    title: "CRM\u81ea\u52d5\u767b\u9332 + Slack\u5373\u6642\u901a\u77e5",
    desc: "\u30ea\u30fc\u30c9\u60c5\u5831\u30fb\u5546\u8ac7\u60c5\u5831\u306fCRM\u3078\u81ea\u52d5\u767b\u9332\u3002AI\u304c\u30d2\u30a2\u30ea\u30f3\u30b0\u3057\u305f\u5185\u5bb9\u306f\u305d\u306e\u307e\u307eSlack\u3067\u55b6\u696d\u30c1\u30fc\u30e0\u306b\u5171\u6709\u3002\u624b\u5165\u529b\u30bc\u30ed\u3067\u60c5\u5831\u304c\u5c4a\u304d\u307e\u3059\u3002",
  },
];

const stepsData = [
  {num:"01",title:"\u30bf\u30b0\u3092\u8a2d\u7f6e",desc:"Web\u30b5\u30a4\u30c8\u306bJavaScript\u30bf\u30b0\u3092\u6570\u884c\u8ffd\u52a0\u3059\u308b\u3060\u3051\u3002WordPress\u30d7\u30e9\u30b0\u30a4\u30f3\u3082\u7528\u610f\u3002\u6240\u8981\u6642\u9593: \u7d045\u5206\u3002"},
  {num:"02",title:"AI\u3092\u8a2d\u5b9a",desc:"\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9\u304b\u3089AI\u306e\u58f0\u304b\u3051\u5185\u5bb9\u3001\u5546\u8ac7\u4e88\u7d04\u306e\u30eb\u30fc\u30eb\u3001\u63d0\u6848\u306b\u4f7f\u3046\u8cc7\u6599\u7b49\u3092\u8a2d\u5b9a\u3002"},
  {num:"03",title:"\u5546\u8ac7\u304c\u5165\u308a\u59cb\u3081\u308b",desc:"\u8a2d\u5b9a\u5b8c\u4e86\u3057\u305f\u77ac\u9593\u304b\u3089AI\u304c\u7a3c\u50cd\u3002\u5546\u8ac7\u7372\u5f97\u304c\u81ea\u52d5\u3067\u56de\u308a\u59cb\u3081\u307e\u3059\u3002"},
];

const caseData = [
  {name:"G-gen",industry:"Google Cloud \u30d7\u30ec\u30df\u30a2\u30d1\u30fc\u30c8\u30ca\u30fc",
    quote:"\u30c1\u30e3\u30c3\u30c8\u3067\u88fd\u54c1\u306b\u3064\u3044\u3066\u5341\u5206\u306b\u628a\u63e1\u3057\u3066\u304b\u3089\u306e\u30ea\u30fc\u30c9\u306e\u305f\u3081\u3001\u898b\u5f53\u9055\u3044\u306e\u554f\u3044\u5408\u308f\u305b\u304c\u6fc0\u6e1b\u3002\u7372\u5f97\u5546\u8ac7\u306e\u7d04\u534a\u5206\u306fMeeton ai\u306b\u3088\u308b\u81ea\u52d5\u7372\u5f97\u3067\u3059\u3002",
    stats:[{v:"2x",l:"\u30ea\u30fc\u30c9\u7372\u5f97\u6570",c:"var(--cta)"},{v:"60%",l:"\u5546\u8ac7\u5316\u7387",c:"var(--blue)"},{v:"3x",l:"\u5546\u8ac7\u5316\u7387\u306e\u6539\u5584",c:"var(--accent)"}]},
  {name:"Univis",industry:"M&A\u30a2\u30c9\u30d0\u30a4\u30b6\u30ea\u30fc\u30fb\u8ca1\u52d9\u4f1a\u8a08\u30b3\u30f3\u30b5\u30eb",
    quote:"\u9ad8\u5358\u4fa1\u30b5\u30fc\u30d3\u30b9\u3067\u3082AI\u304c\u5c02\u9580\u6027\u306e\u9ad8\u3044\u8aac\u660e\u3092\u7684\u78ba\u306b\u5b9f\u65bd\u3002\u300c\u76f8\u8ac7\u3057\u305f\u3044\u300d\u3068\u3044\u3046\u660e\u78ba\u306a\u610f\u601d\u306e\u3042\u308b\u8a2a\u554f\u8005\u3092\u9003\u3055\u305a\u7372\u5f97\u3067\u304d\u3066\u3044\u307e\u3059\u3002",
    stats:[{v:"4x",l:"\u6708\u9593\u30ea\u30fc\u30c9\u6570",c:"var(--cta)"},{v:"100%",l:"\u30ea\u30fc\u30c9\u2192\u5546\u8ac7\u5316\u7387",c:"var(--blue)"},{v:"12\u4ef6",l:"\u6708\u9593\u30ea\u30fc\u30c9",c:"var(--accent)"}]},
  {name:"BizteX",industry:"\u30af\u30e9\u30a6\u30c9RPA\u30fb\u696d\u52d9\u81ea\u52d5\u5316\u30c4\u30fc\u30eb",
    quote:"\u8907\u96d1\u306a\u8a2d\u5b9a\u3084\u30b7\u30ca\u30ea\u30aa\u8a2d\u8a08\u304c\u4e0d\u8981\u3002AI\u304c\u81ea\u52d5\u3067\u5b66\u7fd2\u3057\u3001\u5c0e\u5165\u76f4\u5f8c\u304b\u3089\u6210\u679c\u3092\u767a\u63ee\u3002\u6bd4\u8f03\u691c\u8a0e\u4e2d\u306e\u8a2a\u554f\u8005\u306b\u6700\u9069\u306a\u30bf\u30a4\u30df\u30f3\u30b0\u3067\u8a71\u3057\u304b\u3051\u3066\u304f\u308c\u307e\u3059\u3002",
    stats:[{v:"25\u4ef6",l:"\u5c0e\u5165\u521d\u6708\u30ea\u30fc\u30c9",c:"var(--cta)"},{v:"\u5373\u65e5",l:"\u52b9\u679c\u767a\u63ee",c:"var(--blue)"},{v:"0",l:"\u5fc5\u8981\u306a\u958b\u767a\u5de5\u6570",c:"var(--accent)"}]},
  {name:"EdulinX",industry:"\u82f1\u8a9ee\u30e9\u30fc\u30cb\u30f3\u30b0\u30fb\u6559\u80b2\u30b5\u30fc\u30d3\u30b9",
    quote:"BtoB\u55b6\u696d\u306e\u30ea\u30fc\u30c9\u7372\u5f97\u3060\u3051\u3067\u306a\u304f\u3001\u53d7\u8b1b\u751f\u304b\u3089\u306e\u554f\u3044\u5408\u308f\u305b\u306b\u3082AI\u304c24\u6642\u9593\u5bfe\u5fdc\u3002\u55b6\u696d\u3068\u30ab\u30b9\u30bf\u30de\u30fc\u30b5\u30dd\u30fc\u30c8\u306e\u4e21\u9762\u3067\u52b9\u679c\u304c\u51fa\u3066\u3044\u307e\u3059\u3002",
    stats:[{v:"14.3%",l:"\u8cc7\u6599DL CVR",c:"var(--cta)"},{v:"931\u793e",l:"\u6708\u9593\u4f01\u696d\u7279\u5b9a",c:"var(--blue)"},{v:"24/7",l:"\u30b5\u30dd\u30fc\u30c8\u81ea\u52d5\u5316",c:"var(--accent)"}]},
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

function DiagramChatbot() {
  return (
    <div className="diagram" style={{flexDirection:"column",gap:8}}>
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* Website */}
        <rect x="10" y="60" width="100" height="80" rx="12" fill="#f0fdfa" stroke="#0891b2" strokeWidth="2"/>
        <text x="60" y="92" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0891b2">Web\u30b5\u30a4\u30c8</text>
        <text x="60" y="110" textAnchor="middle" fontSize="9" fill="#6e7494">/ LP / \u5e83\u544a</text>
        {/* Arrow */}
        <line x1="115" y1="100" x2="155" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/>
        </line>
        <polygon points="155,95 165,100 155,105" fill="#c8cedf"/>
        {/* AI Chatbot */}
        <rect x="170" y="40" width="120" height="120" rx="16" fill="white" stroke="#0891b2" strokeWidth="2"/>
        <text x="230" y="68" textAnchor="middle" fontSize="20">🤖</text>
        <text x="230" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f1128">AI\u30c1\u30e3\u30c3\u30c8</text>
        <rect x="186" y="98" width="88" height="16" rx="4" fill="#e5f8f2"/>
        <text x="230" y="110" textAnchor="middle" fontSize="8" fontWeight="600" fill="#12a37d">\u30cb\u30fc\u30ba\u628a\u63e1</text>
        <rect x="186" y="120" width="88" height="16" rx="4" fill="#eaf0fe"/>
        <text x="230" y="132" textAnchor="middle" fontSize="8" fontWeight="600" fill="#3b6ff5">\u8cc7\u6599\u63d0\u6848</text>
        <rect x="186" y="142" width="88" height="12" rx="4" fill="#f0ecfe"/>
        <text x="230" y="151" textAnchor="middle" fontSize="7" fontWeight="600" fill="#7c5cfc">\u4e88\u7d04\u8a98\u5c0e</text>
        {/* Arrow */}
        <line x1="295" y1="100" x2="330" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/>
        </line>
        <polygon points="330,95 340,100 330,105" fill="#c8cedf"/>
        {/* Meeting */}
        <rect x="345" y="60" width="100" height="80" rx="12" fill="#e5f8f2" stroke="#12a37d" strokeWidth="2"/>
        <text x="395" y="92" textAnchor="middle" fontSize="18">📅</text>
        <text x="395" y="112" textAnchor="middle" fontSize="11" fontWeight="800" fill="#12a37d">\u5546\u8ac7\u78ba\u5b9a</text>
      </svg>
    </div>
  );
}

function DiagramEmail() {
  return (
    <div className="diagram" style={{flexDirection:"column"}}>
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* Sources */}
        <rect x="5" y="15" width="80" height="40" rx="8" fill="#eaf0fe" stroke="#3b6ff5" strokeWidth="1.5"/>
        <text x="45" y="40" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b6ff5">\u30a4\u30f3\u30d0\u30a6\u30f3\u30c9</text>
        <rect x="5" y="65" width="80" height="40" rx="8" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="1.5"/>
        <text x="45" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7c5cfc">\u30a6\u30a7\u30d3\u30ca\u30fc</text>
        <rect x="5" y="115" width="80" height="40" rx="8" fill="#e5f8f2" stroke="#12a37d" strokeWidth="1.5"/>
        <text x="45" y="140" textAnchor="middle" fontSize="9" fontWeight="700" fill="#12a37d">CRM / API</text>
        {/* Arrows to AI */}
        <line x1="90" y1="35" x2="140" y2="95" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite"/></line>
        <line x1="90" y1="85" x2="140" y2="95" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite"/></line>
        <line x1="90" y1="135" x2="140" y2="95" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite"/></line>
        {/* AI Engine */}
        <rect x="145" y="55" width="110" height="85" rx="14" fill="white" stroke="#12a37d" strokeWidth="2"/>
        <text x="200" y="82" textAnchor="middle" fontSize="18">🤖</text>
        <text x="200" y="100" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">AI\u30e1\u30fc\u30eb</text>
        <text x="200" y="115" textAnchor="middle" fontSize="8" fill="#6e7494">\u81ea\u52d5\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0</text>
        <text x="200" y="128" textAnchor="middle" fontSize="8" fill="#6e7494">\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7</text>
        {/* Arrow */}
        <line x1="260" y1="97" x2="300" y2="97" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="300,92 310,97 300,102" fill="#c8cedf"/>
        {/* Result */}
        <rect x="315" y="60" width="80" height="75" rx="12" fill="#e5f8f2" stroke="#12a37d" strokeWidth="2"/>
        <text x="355" y="88" textAnchor="middle" fontSize="18">📅</text>
        <text x="355" y="107" textAnchor="middle" fontSize="10" fontWeight="800" fill="#12a37d">\u5546\u8ac7\u78ba\u5b9a</text>
        <text x="355" y="122" textAnchor="middle" fontSize="8" fill="#6e7494">\u81ea\u52d5\u4e88\u7d04</text>
        {/* Timeline label */}
        <rect x="130" y="165" width="150" height="24" rx="6" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1"/>
        <text x="205" y="181" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706">\u30a4\u30d9\u30f3\u30c8\u76f4\u5f8c\u306e\u71b1\u91cf\u304c\u9ad8\u3044\u30bf\u30a4\u30df\u30f3\u30b0\u3067\u5373\u30a2\u30af\u30b7\u30e7\u30f3</text>
      </svg>
    </div>
  );
}

function DiagramDownloadCenter() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* Download page */}
        <rect x="20" y="20" width="160" height="160" rx="14" fill="white" stroke="#3b6ff5" strokeWidth="2"/>
        <text x="100" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">\u8cc7\u6599\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30da\u30fc\u30b8</text>
        {/* Doc cards */}
        {[{y:60,name:"\u5c0e\u5165\u30ac\u30a4\u30c9",c:"#e0475b"},{y:90,name:"\u6599\u91d1\u6bd4\u8f03\u8868",c:"#3b6ff5"},{y:120,name:"\u4e8b\u4f8b\u96c6",c:"#12a37d"}].map((d,i)=>(
          <g key={i}>
            <rect x="36" y={d.y} width="128" height="24" rx="6" fill={`${d.c}10`} stroke={d.c} strokeWidth="1"/>
            <text x="56" y={d.y+16} fontSize="10" fontWeight="700" fill={d.c}>📄 {d.name}</text>
          </g>
        ))}
        <rect x="36" y="152" width="128" height="18" rx="4" fill="#e5f8f2"/>
        <text x="100" y="164" textAnchor="middle" fontSize="8" fontWeight="700" fill="#12a37d">+ \u4ed6\u306e\u8cc7\u6599\u3082\u8868\u793a...</text>
        {/* Arrow */}
        <line x1="185" y1="100" x2="215" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="215,95 225,100 215,105" fill="#c8cedf"/>
        {/* AI */}
        <rect x="230" y="40" width="120" height="120" rx="16" fill="white" stroke="#3b6ff5" strokeWidth="2"/>
        <text x="290" y="72" textAnchor="middle" fontSize="20">🤖</text>
        <text x="290" y="92" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">AI\u304c\u6848\u5185</text>
        <rect x="248" y="102" width="84" height="14" rx="4" fill="#eaf0fe"/>
        <text x="290" y="113" textAnchor="middle" fontSize="8" fontWeight="600" fill="#3b6ff5">\u300c\u3053\u306e\u8cc7\u6599\u304c\u304a\u3059\u3059\u3081\u300d</text>
        <rect x="248" y="122" width="84" height="14" rx="4" fill="#e5f8f2"/>
        <text x="290" y="133" textAnchor="middle" fontSize="8" fontWeight="600" fill="#12a37d">\u2192 \u5546\u8ac7\u7372\u5f97</text>
      </svg>
    </div>
  );
}

function DiagramThanksPage() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* Form completion */}
        <rect x="10" y="50" width="90" height="100" rx="12" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="1.5"/>
        <text x="55" y="78" textAnchor="middle" fontSize="16">📝</text>
        <text x="55" y="96" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c5cfc">\u554f\u3044\u5408\u308f\u305b</text>
        <text x="55" y="110" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c5cfc">\u8cc7\u6599\u8acb\u6c42</text>
        <text x="55" y="130" textAnchor="middle" fontSize="8" fill="#6e7494">\u5b8c\u4e86\uff01</text>
        {/* Arrow */}
        <line x1="105" y1="100" x2="135" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="135,95 145,100 135,105" fill="#c8cedf"/>
        {/* Thanks page */}
        <rect x="150" y="25" width="240" height="155" rx="14" fill="white" stroke="#7c5cfc" strokeWidth="2"/>
        <text x="270" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">\u30b5\u30f3\u30af\u30b9\u30da\u30fc\u30b8</text>
        {/* Calendar */}
        <rect x="166" y="60" width="110" height="105" rx="10" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="1"/>
        <text x="221" y="80" textAnchor="middle" fontSize="14">📅</text>
        <text x="221" y="96" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c5cfc">\u30ab\u30ec\u30f3\u30c0\u30fc\u8868\u793a</text>
        {["\u6708 10:00","\u6c34 14:00","\u91d1 11:00"].map((t,i)=>(
          <g key={i}>
            <rect x="178" y={104+i*18} width="86" height="14" rx="4" fill="white" stroke="#c9bef5" strokeWidth="1"/>
            <text x="221" y={114+i*18} textAnchor="middle" fontSize="8" fontWeight="600" fill="#7c5cfc">{t}</text>
          </g>
        ))}
        {/* AI Chat */}
        <rect x="286" y="60" width="94" height="105" rx="10" fill="#e5f8f2" stroke="#12a37d" strokeWidth="1"/>
        <text x="333" y="80" textAnchor="middle" fontSize="14">🤖</text>
        <text x="333" y="96" textAnchor="middle" fontSize="9" fontWeight="800" fill="#12a37d">AI\u30c1\u30e3\u30c3\u30c8</text>
        <rect x="296" y="104" width="74" height="22" rx="4" fill="white"/>
        <text x="333" y="118" textAnchor="middle" fontSize="7" fill="#6e7494">\u7591\u554f\u70b9\u3092\u89e3\u6d88</text>
        <rect x="296" y="132" width="74" height="22" rx="4" fill="white"/>
        <text x="333" y="146" textAnchor="middle" fontSize="7" fill="#12a37d">\u96e2\u8131\u7387\u3092\u8efd\u6e1b</text>
      </svg>
    </div>
  );
}

function DiagramPopup() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* Browser */}
        <rect x="20" y="20" width="160" height="160" rx="12" fill="#fafafa" stroke="#dfe3f0" strokeWidth="2"/>
        <rect x="20" y="20" width="160" height="24" rx="12" fill="#f4f6fb"/>
        <circle cx="36" cy="32" r="4" fill="#e0475b"/>
        <circle cx="48" cy="32" r="4" fill="#f59e0b"/>
        <circle cx="60" cy="32" r="4" fill="#12a37d"/>
        <text x="100" y="64" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6e7494">\u8a2a\u554f\u8005\u304c\u95b2\u89a7\u4e2d...</text>
        <rect x="36" y="74" width="128" height="8" rx="3" fill="#eaedfa"/>
        <rect x="36" y="88" width="100" height="8" rx="3" fill="#eaedfa"/>
        <rect x="36" y="102" width="115" height="8" rx="3" fill="#eaedfa"/>
        {/* AI analyzing */}
        <text x="100" y="140" textAnchor="middle" fontSize="10" fontWeight="800" fill="#d03ea1">AI\u304c\u30da\u30fc\u30b8\u3092\u5206\u6790</text>
        <rect x="40" y="148" width="120" height="6" rx="3" fill="#d03ea110"/>
        <rect x="40" y="148" width="80" height="6" rx="3" fill="#d03ea1">
          <animate attributeName="width" from="20" to="120" dur="2s" repeatCount="indefinite"/>
        </rect>
        {/* Arrow */}
        <line x1="185" y1="100" x2="215" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="215,95 225,100 215,105" fill="#c8cedf"/>
        {/* Popup */}
        <rect x="230" y="30" width="150" height="140" rx="14" fill="white" stroke="#d03ea1" strokeWidth="2" filter="url(#shadow)"/>
        <defs><filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1"/></filter></defs>
        <text x="305" y="58" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">\u304a\u3059\u3059\u3081\u8cc7\u6599</text>
        <rect x="246" y="68" width="118" height="28" rx="6" fill="#d03ea108" stroke="#d03ea140" strokeWidth="1"/>
        <text x="262" y="86" fontSize="14">📄</text>
        <text x="282" y="82" fontSize="9" fontWeight="700" fill="#0f1128">\u5c0e\u5165\u4e8b\u4f8b\u96c6</text>
        <text x="282" y="92" fontSize="7" fill="#6e7494">\u3053\u306e\u30da\u30fc\u30b8\u306b\u6700\u9069</text>
        <rect x="246" y="102" width="118" height="28" rx="6" fill="#d03ea108" stroke="#d03ea140" strokeWidth="1"/>
        <text x="262" y="120" fontSize="14">📊</text>
        <text x="282" y="116" fontSize="9" fontWeight="700" fill="#0f1128">\u6599\u91d1\u6bd4\u8f03\u8868</text>
        <text x="282" y="126" fontSize="7" fill="#6e7494">\u691c\u8a0e\u4e2d\u306e\u65b9\u3078</text>
        <rect x="256" y="140" width="98" height="20" rx="6" fill="#12a37d"/>
        <text x="305" y="154" textAnchor="middle" fontSize="9" fontWeight="800" fill="white">\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9 \u2192</text>
      </svg>
    </div>
  );
}

function DiagramCalendarURL() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* Email */}
        <rect x="15" y="25" width="150" height="150" rx="12" fill="white" stroke="#e0475b" strokeWidth="2"/>
        <text x="90" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">\u55b6\u696d\u30e1\u30fc\u30eb</text>
        <rect x="30" y="60" width="120" height="8" rx="3" fill="#eaedfa"/>
        <rect x="30" y="74" width="100" height="8" rx="3" fill="#eaedfa"/>
        <rect x="30" y="88" width="110" height="8" rx="3" fill="#eaedfa"/>
        {/* Calendar link */}
        <rect x="30" y="108" width="120" height="28" rx="8" fill="#e0475b10" stroke="#e0475b" strokeWidth="1.5"/>
        <text x="90" y="126" textAnchor="middle" fontSize="9" fontWeight="800" fill="#e0475b">📅 \u65e5\u7a0b\u3092\u9078\u3076 \u2192</text>
        <rect x="30" y="144" width="120" height="8" rx="3" fill="#eaedfa"/>
        <rect x="30" y="158" width="80" height="8" rx="3" fill="#eaedfa"/>
        {/* Arrow */}
        <line x1="170" y1="100" x2="200" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="200,95 210,100 200,105" fill="#c8cedf"/>
        {/* Calendar + AI */}
        <rect x="215" y="25" width="170" height="150" rx="14" fill="white" stroke="#e0475b" strokeWidth="2"/>
        <text x="300" y="50" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">\u30ab\u30ec\u30f3\u30c0\u30fc + AI\u30c1\u30e3\u30c3\u30c8</text>
        {/* Calendar side */}
        <rect x="225" y="60" width="75" height="100" rx="8" fill="#fef2f2" stroke="#e0475b" strokeWidth="1"/>
        <text x="262" y="78" textAnchor="middle" fontSize="12">📅</text>
        {["\u6708 10:00","\u6c34 15:00","\u91d1 13:00"].map((t,i)=>(
          <g key={i}>
            <rect x="233" y={86+i*20} width="60" height="14" rx="4" fill="white" stroke="#fca5a5" strokeWidth="1"/>
            <text x="263" y={96+i*20} textAnchor="middle" fontSize="7" fontWeight="600" fill="#e0475b">{t}</text>
          </g>
        ))}
        {/* AI chat side */}
        <rect x="308" y="60" width="68" height="100" rx="8" fill="#e5f8f2" stroke="#12a37d" strokeWidth="1"/>
        <text x="342" y="78" textAnchor="middle" fontSize="12">🤖</text>
        <rect x="314" y="86" width="56" height="20" rx="4" fill="white"/>
        <text x="342" y="100" textAnchor="middle" fontSize="6" fill="#6e7494">\u4e0d\u5b89\u3092\u89e3\u6d88</text>
        <rect x="314" y="112" width="56" height="20" rx="4" fill="white"/>
        <text x="342" y="126" textAnchor="middle" fontSize="6" fill="#12a37d">\u96e2\u8131\u9632\u6b62</text>
        <rect x="314" y="138" width="56" height="16" rx="4" fill="#12a37d"/>
        <text x="342" y="150" textAnchor="middle" fontSize="6" fontWeight="700" fill="white">\u5546\u8ac7\u78ba\u5b9a</text>
      </svg>
    </div>
  );
}

function DiagramPDF() {
  return (
    <div className="diagram">
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{maxWidth:400}}>
        {/* PDF doc */}
        <rect x="30" y="20" width="130" height="165" rx="10" fill="white" stroke="#c026d3" strokeWidth="2"/>
        <rect x="30" y="20" width="130" height="32" rx="10" fill="#c026d310"/>
        <text x="95" y="41" textAnchor="middle" fontSize="12" fontWeight="800" fill="#c026d3">PDF \u8cc7\u6599</text>
        <rect x="44" y="62" width="102" height="6" rx="3" fill="#eaedfa"/>
        <rect x="44" y="74" width="88" height="6" rx="3" fill="#eaedfa"/>
        <rect x="44" y="86" width="96" height="6" rx="3" fill="#eaedfa"/>
        <rect x="44" y="98" width="78" height="6" rx="3" fill="#eaedfa"/>
        {/* QR / URL */}
        <rect x="44" y="118" width="48" height="48" rx="6" fill="#c026d310" stroke="#c026d3" strokeWidth="1"/>
        <text x="68" y="148" textAnchor="middle" fontSize="8" fontWeight="700" fill="#c026d3">QR</text>
        <rect x="100" y="118" width="50" height="20" rx="4" fill="#c026d3"/>
        <text x="125" y="132" textAnchor="middle" fontSize="7" fontWeight="700" fill="white">\u5546\u8ac7\u4e88\u7d04 \u2192</text>
        <text x="125" y="152" textAnchor="middle" fontSize="7" fill="#6e7494">\u8aad\u8005 = \u71b1\u91cf\u9ad8</text>
        {/* Arrow */}
        <line x1="168" y1="100" x2="205" y2="100" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="205,95 215,100 205,105" fill="#c8cedf"/>
        {/* Booking page */}
        <rect x="220" y="35" width="160" height="130" rx="14" fill="white" stroke="#c026d3" strokeWidth="2"/>
        <text x="300" y="62" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1128">\u5546\u8ac7\u4e88\u7d04\u30da\u30fc\u30b8</text>
        <text x="300" y="90" textAnchor="middle" fontSize="28">📅</text>
        <rect x="252" y="110" width="96" height="24" rx="8" fill="#c026d3"/>
        <text x="300" y="126" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">\u4e88\u7d04\u78ba\u5b9a</text>
        <text x="300" y="152" textAnchor="middle" fontSize="8" fill="#6e7494">\u76f4\u63a5\u8a98\u5c0e\u3067\u9ad8CV</text>
      </svg>
    </div>
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
  return (
    <div style={{marginTop:48,padding:"32px 0"}}>
      <svg width="100%" height="140" viewBox="0 0 900 140" fill="none" style={{maxWidth:900,margin:"0 auto",display:"block"}}>
        {/* Chat/Form input */}
        <rect x="10" y="30" width="140" height="80" rx="14" fill="#e5f8f2" stroke="#12a37d" strokeWidth="2"/>
        <text x="80" y="60" textAnchor="middle" fontSize="16">💬</text>
        <text x="80" y="80" textAnchor="middle" fontSize="10" fontWeight="800" fill="#12a37d">\u30c1\u30e3\u30c3\u30c8 / \u30d5\u30a9\u30fc\u30e0</text>
        <text x="80" y="96" textAnchor="middle" fontSize="8" fill="#6e7494">\u4e8b\u524d\u30d2\u30a2\u30ea\u30f3\u30b0</text>

        {/* Arrow */}
        <line x1="155" y1="70" x2="195" y2="70" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="195,65 205,70 195,75" fill="#c8cedf"/>

        {/* Routing */}
        <rect x="210" y="20" width="160" height="100" rx="14" fill="#f0ecfe" stroke="#7c5cfc" strokeWidth="2"/>
        <text x="290" y="48" textAnchor="middle" fontSize="16">🎯</text>
        <text x="290" y="68" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c5cfc">\u81ea\u52d5\u632f\u308a\u5206\u3051</text>
        <text x="290" y="84" textAnchor="middle" fontSize="8" fill="#6e7494">\u8868\u793a/\u975e\u8868\u793a \u30fb \u62c5\u5f53\u8005\u5206\u5c90</text>
        <text x="290" y="98" textAnchor="middle" fontSize="8" fill="#6e7494">\u8cea\u306e\u9ad8\u3044\u5546\u8ac7\u306e\u307f\u7372\u5f97</text>

        {/* Arrow */}
        <line x1="375" y1="70" x2="415" y2="70" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="415,65 425,70 415,75" fill="#c8cedf"/>

        {/* Meeting booked */}
        <rect x="430" y="30" width="120" height="80" rx="14" fill="#e5f8f2" stroke="#12a37d" strokeWidth="2"/>
        <text x="490" y="58" textAnchor="middle" fontSize="16">📅</text>
        <text x="490" y="78" textAnchor="middle" fontSize="10" fontWeight="800" fill="#12a37d">\u5546\u8ac7\u4e88\u7d04</text>
        <text x="490" y="94" textAnchor="middle" fontSize="8" fill="#6e7494">\u8ffd\u52a0\u30d2\u30a2\u30ea\u30f3\u30b0</text>

        {/* Arrow */}
        <line x1="555" y1="70" x2="595" y2="70" stroke="#c8cedf" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></line>
        <polygon points="595,65 605,70 595,75" fill="#c8cedf"/>

        {/* CRM + Slack */}
        <rect x="610" y="15" width="130" height="50" rx="10" fill="#eaf0fe" stroke="#3b6ff5" strokeWidth="1.5"/>
        <text x="675" y="45" textAnchor="middle" fontSize="10" fontWeight="800" fill="#3b6ff5">CRM\u81ea\u52d5\u767b\u9332</text>

        <rect x="610" y="75" width="130" height="50" rx="10" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="675" y="105" textAnchor="middle" fontSize="10" fontWeight="800" fill="#d97706">Slack\u901a\u77e5</text>

        {/* Final arrow */}
        <line x1="745" y1="40" x2="775" y2="70" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"/>
        <line x1="745" y1="100" x2="775" y2="70" stroke="#c8cedf" strokeWidth="1.5" strokeDasharray="4 3"/>

        {/* Sales team */}
        <rect x="780" y="40" width="110" height="60" rx="12" fill="#12a37d" stroke="#0d8c6a" strokeWidth="1"/>
        <text x="835" y="65" textAnchor="middle" fontSize="14">👥</text>
        <text x="835" y="82" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">\u55b6\u696d\u30c1\u30fc\u30e0</text>
      </svg>
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
          <p className="anim d3 hero-sub">Meeton ai が、Webサイト・メール・資料・広告LPのあらゆる接点で見込み客に自動アプローチ。ニーズを把握し、資料を届け、商談予約まで完結させます。</p>
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
          <p className="ssub" style={{margin:"0 auto"}}>7つのチャネルが同時に稼働。訪問者を逃さず捉え、温度が高いうちに商談へ変換します。</p>

          {/* Overview flow diagram */}
          <div style={{marginTop:48,overflowX:"auto",padding:"8px 0"}}>
            <div className="flow-row">
              {[
                {icon:"🌐",label:"Webサイト",sub:"訪問者",color:"#0891b2",bg:"#0891b210"},
                null,
                {icon:"🤖",label:"AI チャット",sub:"ニーズ把握",color:"#0891b2",bg:"#e0f7fa"},
                null,
                {icon:"📧",label:"AI メール",sub:"自動育成",color:"#12a37d",bg:"#e5f8f2"},
                null,
                {icon:"📄",label:"資料提案",sub:"DL → リード",color:"#3b6ff5",bg:"#eaf0fe"},
                null,
                {icon:"📅",label:"カレンダー",sub:"即時予約",color:"#7c5cfc",bg:"#f0ecfe"},
                null,
                {icon:"🎯",label:"商談確定",sub:"自動獲得",color:"#12a37d",bg:"#d1fae5"},
              ].map((item,i)=>{
                if(!item) return <div className="flow-arrow" key={i}>→</div>;
                return(
                  <div className="flow-node" key={i}>
                    <div className="flow-node-box" style={{borderColor:item.color,background:item.bg}}>
                      <span style={{fontSize:28}}>{item.icon}</span>
                    </div>
                    <div className="flow-node-label">{item.label}</div>
                    <div className="flow-node-sub">{item.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7 FEATURES */}
      <section className="section" id="features" style={{position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>7 Channels</div>
          <div className="stitle" style={{textAlign:"center"}}>商談をつくる、7つの武器</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>それぞれが単体で成果を出し、組み合わせることで商談獲得を最大化します。</p>

          <div className="feat-grid">
            {features.map((f,i)=>{
              const Diagram = diagramComponents[i];
              return(
                <div className={`feat-card${i===0?" feat-card-full":""}`} key={i} style={{"--card-color":f.color} as React.CSSProperties}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:f.gradient,opacity:0,transition:"opacity .3s"}} className="feat-card-accent"/>
                  <style dangerouslySetInnerHTML={{__html:`.feat-card:hover .feat-card-accent{opacity:1 !important}`}}/>
                  <div className="feat-card-body">
                    <div className="feat-num" style={{background:f.bg,color:f.color}}>{f.num}</div>
                    <div className="feat-title">{f.title}</div>
                    <div className="feat-desc">{f.desc}</div>
                  </div>
                  <div className="feat-card-vis" style={{background:f.bg}}>
                    <Diagram/>
                  </div>
                </div>
              );
            })}
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
                <div className="qual-icon" style={{background:q.bg,border:`1px solid ${q.border}`}}>{q.icon}</div>
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
          <div className="slabel" style={{textAlign:"center"}}>導入事例</div>
          <div className="stitle" style={{textAlign:"center"}}>お客様の成果</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>Meeton ai を導入した企業の実績をご紹介します。</p>
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
          <div className="stitle" style={{textAlign:"center"}}>営業チームに、<br/>毎朝商談が届く世界へ</div>
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
