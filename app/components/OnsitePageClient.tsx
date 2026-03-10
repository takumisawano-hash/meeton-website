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
  --cyan:#0891b2;--cyan-light:#ecfeff;
  --pink:#d03ea1;--red:#e0475b;
  --green:#12a37d;--green-light:#e5f8f2;
  --purple:#7c5cfc;--purple-light:#f0ecfe;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;--fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes slideInRight{0%{opacity:0;transform:translateX(20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes popIn{0%{opacity:0;transform:scale(.7) translateY(20px)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes flowPulse{0%,100%{box-shadow:0 0 0 0 rgba(18,163,125,.3)}50%{box-shadow:0 0 0 8px rgba(18,163,125,0)}}
@keyframes arrowBounce{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
@keyframes popupSlide{0%{opacity:0;transform:translateY(30px) scale(.9)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes docFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-6px) rotate(1deg)}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(18,163,125,.4)}70%{box-shadow:0 0 0 12px rgba(18,163,125,0)}100%{box-shadow:0 0 0 0 rgba(18,163,125,0)}}
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.52s}.d5{animation-delay:.68s}

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(18,163,125,.06) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
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
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#ecfdf5 0%,#fff 30%,#f0ecfe 60%,#fff 100%)}
.hero-content{max-width:860px;text-align:center;position:relative;z-index:2}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:9px 22px;border-radius:24px;margin-bottom:36px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,7vw,72px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2.5px;margin-bottom:28px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(16px,3vw,22px);line-height:1.8;color:var(--sub);max-width:640px;margin:0 auto 48px}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.hero-stats{display:flex;justify-content:center;gap:clamp(32px,8vw,72px);margin-top:clamp(40px,8vw,72px);padding-top:clamp(32px,6vw,48px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(36px,6vw,52px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(13px,2vw,15px);color:var(--sub);margin-top:8px;font-weight:600}

/* WHY GRID (3-channel overview) */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{font-size:32px;margin-bottom:16px}
.why-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px}
.why-desc{font-size:15px;line-height:1.75;color:var(--sub)}

/* PHASE ROWS (deep dive zigzag) */
.phase-row{display:flex;align-items:center;gap:clamp(32px,6vw,64px);padding:clamp(40px,8vw,80px) 0;position:relative}
.phase-row.reverse{flex-direction:row-reverse}
.phase-text{flex:1;min-width:0}
.phase-vis{flex:1;min-width:0;display:flex;align-items:center;justify-content:center}
.phase-tag{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:20px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
.phase-h{font-size:clamp(24px,4vw,32px);font-weight:900;color:var(--heading);letter-spacing:-.5px;margin-bottom:14px;line-height:1.25}
.phase-desc{font-size:clamp(14px,2vw,16px);line-height:1.85;color:var(--sub);margin-bottom:22px}
.phase-features{display:flex;flex-direction:column;gap:10px}
.phase-feat{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:600;color:var(--text)}
.phase-feat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:8px}
.phase-divider{height:1px;background:var(--border);max-width:1140px;margin:0 auto}

/* PHASE VISUALS */
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:20px;position:relative;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.06);border:1px solid var(--border)}

/* FLOW */
.flow-container{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;padding:40px 0}
.flow-node{display:flex;flex-direction:column;align-items:center;gap:8px;padding:18px 16px;border-radius:16px;border:1px solid var(--border);background:var(--bg);box-shadow:0 4px 16px rgba(0,0,0,.04);transition:all .35s;min-width:120px;position:relative}
.flow-node:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(18,163,125,.12);border-color:var(--cta)}
.flow-node-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}
.flow-node-label{font-size:12px;font-weight:700;color:var(--heading);text-align:center}
.flow-node-sub{font-size:10px;color:var(--sub);text-align:center}
.flow-arrow{font-family:var(--fm);font-size:20px;color:var(--border2);padding:0 8px;animation:arrowBounce 1.5s ease-in-out infinite;flex-shrink:0}
.flow-core{padding:22px 28px;border-radius:20px;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;display:flex;flex-direction:column;align-items:center;gap:8px;box-shadow:0 8px 32px var(--cta-glow);min-width:160px;animation:ringPulse 2s infinite}
.flow-core-icon{font-size:28px}
.flow-core-label{font-size:14px;font-weight:800}
.flow-core-sub{font-size:10px;opacity:.85}

/* FAQ */
.faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all .25s}
.faq-item:hover{border-color:var(--border2)}
.faq-q{padding:20px 26px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:18px;font-weight:700;color:var(--heading);transition:color .2s}
.faq-q:hover{color:var(--cta)}
.faq-toggle{width:28px;height:28px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--sub);transition:all .25s;flex-shrink:0}
.faq-item.open .faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.faq-a{padding:0 26px 20px;font-size:16px;line-height:1.8;color:var(--sub)}

/* CTA */
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#ecfdf5 0%,#fff 40%,#f0ecfe 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* RESPONSIVE */
@media(max-width:1024px){
  .phase-row{flex-direction:column;gap:40px}
  .phase-row.reverse{flex-direction:column}
  .why-grid{grid-template-columns:repeat(2,1fr)}
  .flow-container{flex-direction:column;gap:12px}
  .flow-arrow{transform:rotate(90deg)}
}
@media(max-width:768px){
  .hero{padding:90px 20px 50px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:24px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:300px;margin:0 auto}
  .hero-stats{flex-direction:column;gap:20px;align-items:center}
  .why-grid{grid-template-columns:1fr}
  .pvis{max-width:100%;aspect-ratio:1/1.2;min-height:380px}
  .final-cta{padding:60px 20px 80px}
  .btn-cta-lg{padding:14px 24px;font-size:16px;width:100%}
  .btn-ghost{padding:14px 24px;font-size:16px;width:100%}
  .phase-features{gap:8px}
  .phase-feat{font-size:13px}
  .why-card{padding:22px}
  .faq-q{padding:16px 20px;font-size:16px}
  .faq-a{padding:0 20px 16px;font-size:14px}
  .flow-node{min-width:100px;padding:14px 12px}
  .flow-core{min-width:140px;padding:18px 22px}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-node{min-width:90px}
  .flow-core{min-width:120px}
}
`;

const channelCards = [
  { icon: "\u{1F4C4}", title: "\u8CC7\u6599\u30DA\u30FC\u30B8", sub: "AI\u8CC7\u6599\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u4F53\u9A13", desc: "\u304A\u5BA2\u69D8\u306E\u8CC7\u6599\u3092\u4E00\u89A7\u8868\u793A\u3059\u308B\u5C02\u7528\u30DA\u30FC\u30B8\u3002AI\u304C\u8A2A\u554F\u8005\u306E\u8208\u5473\u306B\u5408\u3063\u305F\u8CC7\u6599\u3092\u63D0\u6848\u3057\u3001\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u6642\u306B\u81EA\u7136\u306B\u30EA\u30FC\u30C9\u60C5\u5831\u3092\u53D6\u5F97\u3057\u307E\u3059\u3002" },
  { icon: "\u2705", title: "\u30B5\u30F3\u30AF\u30B9\u30DA\u30FC\u30B8", sub: "\u30B3\u30F3\u30D0\u30FC\u30B8\u30E7\u30F3\u5F8C\u306E\u8FFD\u52A0\u30A2\u30AF\u30B7\u30E7\u30F3", desc: "\u30D5\u30A9\u30FC\u30E0\u9001\u4FE1\u5F8C\u306E\u9AD8\u3044\u95A2\u5FC3\u3092\u9003\u3055\u305A\u3001\u8FFD\u52A0\u8CC7\u6599\u306E\u63D0\u6848\u3084\u5546\u8AC7\u4E88\u7D04\u3078\u306E\u8A98\u5C0E\u3092AI\u304C\u81EA\u52D5\u3067\u884C\u3044\u307E\u3059\u3002" },
  { icon: "\u{1F4A1}", title: "\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7", sub: "\u884C\u52D5\u30C8\u30EA\u30AC\u30FC\u578B\u306EAI\u30A2\u30D7\u30ED\u30FC\u30C1", desc: "\u96E2\u8131\u30BF\u30A4\u30DF\u30F3\u30B0\u3084\u30B9\u30AF\u30ED\u30FC\u30EB\u5230\u9054\u306A\u3069\u3001\u884C\u52D5\u306B\u5FDC\u3058\u305F\u6700\u9069\u306A\u30BF\u30A4\u30DF\u30F3\u30B0\u3067AI\u304C\u58F0\u3092\u304B\u3051\u307E\u3059\u3002" },
];

const faqData = [
  { q: '\u8CC7\u6599\u30DA\u30FC\u30B8\u3068\u306F\u4F55\u3067\u3059\u304B\uFF1F', a: '\u304A\u5BA2\u69D8\u306E\u8CC7\u6599\uFF08\u30DB\u30EF\u30A4\u30C8\u30DA\u30FC\u30D1\u30FC\u3001\u4E8B\u4F8B\u96C6\u3001\u6599\u91D1\u8868\u306A\u3069\uFF09\u3092\u4E00\u89A7\u8868\u793A\u3059\u308B\u5C02\u7528\u30DA\u30FC\u30B8\u3067\u3059\u3002AI\u304C\u8A2A\u554F\u8005\u306E\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u3092\u30B5\u30DD\u30FC\u30C8\u3057\u3001\u8208\u5473\u306B\u5408\u3063\u305F\u8CC7\u6599\u3092\u63D0\u6848\u3057\u307E\u3059\u3002\u8CC7\u6599\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3059\u308B\u969B\u306BAI\u30C1\u30E3\u30C3\u30C8\u304C\u8D77\u52D5\u3057\u3001\u81EA\u7136\u306A\u6D41\u308C\u3067\u30EA\u30FC\u30C9\u60C5\u5831\u3092\u53D6\u5F97\u3057\u307E\u3059\u3002' },
  { q: '\u30B5\u30F3\u30AF\u30B9\u30DA\u30FC\u30B8\u3067\u306F\u3069\u306E\u3088\u3046\u306BAI\u304C\u6A5F\u80FD\u3057\u307E\u3059\u304B\uFF1F', a: '\u30D5\u30A9\u30FC\u30E0\u9001\u4FE1\u5F8C\u306E\u30B5\u30F3\u30AF\u30B9\u30DA\u30FC\u30B8\u306BAI\u30C1\u30E3\u30C3\u30C8\u3092\u914D\u7F6E\u3057\u307E\u3059\u3002\u300C\u8CC7\u6599\u3092\u304A\u9001\u308A\u3057\u307E\u3057\u305F\u3002\u4ED6\u306B\u3054\u8208\u5473\u306E\u3042\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u3059\u304B\uFF1F\u300D\u306E\u3088\u3046\u306B\u58F0\u3092\u304B\u3051\u3001\u8FFD\u52A0\u306E\u8CC7\u6599\u63D0\u6848\u3084\u5546\u8AC7\u4E88\u7D04\u3078\u306E\u8A98\u5C0E\u3092\u884C\u3044\u307E\u3059\u3002\u30B3\u30F3\u30D0\u30FC\u30B8\u30E7\u30F3\u76F4\u5F8C\u306E\u9AD8\u3044\u95A2\u5FC3\u3092\u9003\u3055\u305A\u3001\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3\u306B\u3064\u306A\u3052\u307E\u3059\u3002' },
  { q: '\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u306F\u3069\u306E\u3088\u3046\u306A\u30BF\u30A4\u30DF\u30F3\u30B0\u3067\u8868\u793A\u3055\u308C\u307E\u3059\u304B\uFF1F', a: '\u96E2\u8131\u3057\u3088\u3046\u3068\u3057\u305F\u30BF\u30A4\u30DF\u30F3\u30B0\uFF08Exit Intent\uFF09\u3001\u4E00\u5B9A\u6642\u9593\u306E\u6EDE\u5728\u5F8C\u3001\u30DA\u30FC\u30B8\u30B9\u30AF\u30ED\u30FC\u30EB\u5230\u9054\u6642\u306A\u3069\u3001\u8A2A\u554F\u8005\u306E\u884C\u52D5\u306B\u5FDC\u3058\u3066\u6700\u9069\u306A\u30BF\u30A4\u30DF\u30F3\u30B0\u3067\u8868\u793A\u3055\u308C\u307E\u3059\u3002\u8868\u793A\u5185\u5BB9\u3082\u95B2\u89A7\u30DA\u30FC\u30B8\u306B\u5408\u308F\u305B\u3066AI\u304C\u81EA\u52D5\u3067\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u3057\u307E\u3059\u3002' },
  { q: '\u3053\u308C\u3089\u306E\u30C1\u30E3\u30CD\u30EB\u306FAI\u30C1\u30E3\u30C3\u30C8\u30DC\u30C3\u30C8\u3068\u9023\u643A\u3057\u307E\u3059\u304B\uFF1F', a: '\u306F\u3044\u3001\u3059\u3079\u3066\u306E\u30B5\u30A4\u30C8\u5185\u30C1\u30E3\u30CD\u30EB\u306FAI\u30C1\u30E3\u30C3\u30C8\u30DC\u30C3\u30C8\u306E\u30B3\u30A2\u30A8\u30F3\u30B8\u30F3\u3068\u9023\u643A\u3057\u3066\u3044\u307E\u3059\u3002\u8CC7\u6599\u30DA\u30FC\u30B8\u3067\u306E\u8208\u5473\u3001\u30B5\u30F3\u30AF\u30B9\u30DA\u30FC\u30B8\u3067\u306E\u884C\u52D5\u3001\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u3078\u306E\u53CD\u5FDC\u306F\u3059\u3079\u3066\u30EA\u30FC\u30C9\u30B9\u30B3\u30A2\u306B\u53CD\u6620\u3055\u308C\u3001\u6700\u9069\u306A\u30D5\u30A9\u30ED\u30FC\u30A2\u30C3\u30D7\u306B\u3064\u306A\u304C\u308A\u307E\u3059\u3002' },
  { q: '\u65E2\u5B58\u306EWeb\u30B5\u30A4\u30C8\u306B\u3069\u306E\u3088\u3046\u306B\u5C0E\u5165\u3057\u307E\u3059\u304B\uFF1F', a: '\u5171\u901A\u306EJavaScript\u30BF\u30B01\u3064\u3067\u3059\u3079\u3066\u306E\u30B5\u30A4\u30C8\u5185\u30C1\u30E3\u30CD\u30EB\u304C\u6709\u52B9\u306B\u306A\u308A\u307E\u3059\u3002\u8CC7\u6599\u30DA\u30FC\u30B8\u306F\u5C02\u7528URL\u304C\u767A\u884C\u3055\u308C\u3001\u30B5\u30F3\u30AF\u30B9\u30DA\u30FC\u30B8\u3068\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u306F\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u304B\u3089\u8868\u793A\u6761\u4EF6\u3092\u8A2D\u5B9A\u3059\u308B\u3060\u3051\u3067\u3059\u3002\u958B\u767A\u30EA\u30BD\u30FC\u30B9\u306F\u4E0D\u8981\u3067\u3059\u3002' },
];

export default function OnsitePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Nav variant="light" />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="dot-grid" />
        <div className="glow" style={{ background: "rgba(18,163,125,.2)", width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: "rgba(124,92,252,.15)", width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="glow" style={{ background: "rgba(8,145,178,.1)", width: 400, height: 400, top: "40%", left: "50%" }} />
        <div className="hero-content">
          <div className="anim d1 hero-badge"><div className="hero-badge-dot" />ON-SITE CHANNELS</div>
          <h1 className="anim d2">サイト内のあらゆる接点を<br /><em>商談に変える</em></h1>
          <p className="anim d3 hero-sub">資料ページ・サンクスページ・ポップアップ。3つのサイト内チャネルにAIを配置し、訪問者のあらゆる行動を商談につなげます。</p>
          <div className="anim d4 hero-ctas">
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
          <div className="anim d5 hero-stats">
            {[
              { v: "3", l: "チャネル", c: "var(--cta)" },
              { v: "3x", l: "リード獲得", c: "var(--accent)" },
              { v: "65%", l: "エンゲージメント向上", c: "var(--cyan)" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}><div className="stat-v" style={{ background: `linear-gradient(135deg,${s.c},var(--accent))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.v}</div><div className="stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3-CHANNEL OVERVIEW ===== */}
      <section className="section" style={{ background: "var(--surface)", position: "relative" }}>
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: "center" }}>ON-SITE CHANNELS</div>
          <div className="stitle" style={{ textAlign: "center" }}>3つのサイト内チャネル</div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto 44px" }}>訪問者がサイト内で通過するあらゆる接点にAIを配置。取りこぼしゼロを実現します。</p>
          <div className="why-grid">
            {channelCards.map((c, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{c.icon}</div>
                <div className="why-title">{c.title}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--cta)", marginBottom: 10, fontFamily: "var(--fm)", letterSpacing: 1 }}>{c.sub}</div>
                <div className="why-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEEP DIVE SECTIONS ===== */}
      <section className="section" style={{ paddingBottom: 0, position: "relative" }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: "center" }}>DEEP DIVE</div>
          <div className="stitle" style={{ textAlign: "center" }}>各チャネルの詳細</div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto 20px" }}>3つのチャネルがそれぞれ異なるタイミングで訪問者にアプローチ。AIが最適な体験を提供します。</p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(16px,5vw,48px)", position: "relative" }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>

          {/* CHANNEL 01 - 資料ページ (left) */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: "#0891b210", color: "#0891b2" }}>CHANNEL 01</div>
              <div className="phase-h">AIが資料選びをサポートするダウンロードセンター</div>
              <div className="phase-desc">お客様の資料を一覧表示する専用ページをAIが常駐サポート。訪問者の興味に合わせて最適な資料を提案し、ダウンロード時に自然な流れでリード情報を取得します。</div>
              <div className="phase-features">
                {["資料一覧の自動生成", "AIによる最適な資料提案", "チャットで資料の内容説明", "DL時にリード情報を自然に取得"].map((f, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: "#0891b2" }} />{f}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis" style={{ background: "linear-gradient(160deg,#ecfeff,#f0f9ff)", padding: 16 }}>
                {/* Resource library visual */}
                <div style={{ position: "absolute", top: 14, left: 14, right: 14 }}>
                  {/* Header bar */}
                  <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", animation: "chatPop .5s .2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: "linear-gradient(135deg,#0891b2,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 800 }}>AI</div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--heading)" }}>資料ライブラリ</span>
                    </div>
                    <span style={{ fontSize: 9, color: "var(--sub)" }}>6件の資料</span>
                  </div>
                  {/* Document cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
                    {[
                      { name: "導入ガイド", type: "PDF", color: "#e0475b" },
                      { name: "事例集", type: "PDF", color: "#3b6ff5" },
                      { name: "料金表", type: "XLS", color: "#12a37d" },
                      { name: "セキュリティ", type: "PDF", color: "#7c5cfc" },
                    ].map((doc, i) => (
                      <div key={i} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 8px", display: "flex", alignItems: "center", gap: 6, animation: `chatPop .5s ${0.4 + i * 0.15}s cubic-bezier(.16,1,.3,1) forwards`, opacity: 0 }}>
                        <div style={{ width: 24, height: 24, borderRadius: 5, background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#fff", fontWeight: 800, flexShrink: 0 }}>{doc.type}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--heading)", lineHeight: 1.2 }}>{doc.name}</div>
                      </div>
                    ))}
                  </div>
                  {/* AI chat bubble */}
                  <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, borderBottomLeftRadius: 4, padding: "8px 12px", marginBottom: 8, animation: "chatPop .5s 1.1s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--heading)", lineHeight: 1.5 }}>SaaSの導入事例をお探しですね！<br />こちらの事例集がおすすめです</div>
                  </div>
                  {/* Suggestion chips */}
                  <div style={{ display: "flex", gap: 5, marginBottom: 8, animation: "chatPop .5s 1.5s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    {["事例集を見る", "料金表も見たい"].map((chip, k) => (
                      <div key={k} style={{ background: "linear-gradient(135deg,var(--cyan-light),#e0f2fe)", border: "1px solid rgba(8,145,178,.15)", borderRadius: 8, padding: "5px 10px", fontSize: 9, fontWeight: 700, color: "#0891b2" }}>{chip}</div>
                    ))}
                  </div>
                  {/* DL + lead capture */}
                  <div style={{ background: "linear-gradient(135deg,#ecfeff,#e0f2fe)", border: "1px solid rgba(8,145,178,.12)", borderRadius: 10, padding: "8px 10px", animation: "chatPop .5s 1.9s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12 }}>📧</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#0891b2" }}>メールを入力して資料をダウンロード</span>
                    </div>
                    <div style={{ background: "#0891b2", color: "#fff", borderRadius: 6, padding: "3px 8px", fontSize: 8, fontWeight: 700 }}>DL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* CHANNEL 02 - サンクスページ (right) */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: "#12a37d10", color: "#12a37d" }}>CHANNEL 02</div>
              <div className="phase-h">フォーム送信後の「次の一手」を逃さない</div>
              <div className="phase-desc">フォーム送信後のサンクスページは、訪問者の関心が最も高い瞬間です。AIチャットが「資料をお送りしました。他にご興味のある情報はありますか？」と声をかけ、追加の資料提案や商談予約への誘導を行います。</div>
              <div className="phase-features">
                {["関連資料の追加提案", "商談予約への自然な誘導", "追加情報の取得", "リードスコア加点"].map((f, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: "#12a37d" }} />{f}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis" style={{ background: "linear-gradient(160deg,#ecfdf5,#f0fdf4)", padding: 16 }}>
                <div style={{ position: "absolute", top: 14, left: 14, right: 14 }}>
                  {/* Thank you message */}
                  <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", marginBottom: 10, textAlign: "center", animation: "chatPop .5s .2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>&#10003;</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--heading)" }}>資料のダウンロードありがとうございます</div>
                    <div style={{ fontSize: 9, color: "var(--sub)", marginTop: 2 }}>メールにもお送りしました</div>
                  </div>
                  {/* AI chat bubble */}
                  <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, borderBottomLeftRadius: 4, padding: "8px 12px", marginBottom: 8, animation: "chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, background: "linear-gradient(135deg,#12a37d,#0fc19a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#fff", fontWeight: 800 }}>AI</div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: "var(--sub)" }}>Meeton AI</span>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--heading)", lineHeight: 1.5 }}>他にご興味のある資料はありますか？<br />御社に合った事例もご用意できます</div>
                  </div>
                  {/* Related resource cards */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 8, animation: "chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    {[
                      { name: "SaaS業界事例集", icon: "📊" },
                      { name: "ROI試算シート", icon: "📈" },
                    ].map((r, k) => (
                      <div key={k} style={{ flex: 1, background: "linear-gradient(135deg,var(--cta-light),#d1fae5)", border: "1px solid rgba(18,163,125,.15)", borderRadius: 8, padding: "7px 8px", display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 14 }}>{r.icon}</span>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#12a37d" }}>{r.name}</div>
                      </div>
                    ))}
                  </div>
                  {/* Meeting CTA */}
                  <div style={{ background: "linear-gradient(135deg,#12a37d,#0fc19a)", borderRadius: 10, padding: "8px 12px", animation: "chatPop .5s 1.6s cubic-bezier(.16,1,.3,1) forwards", opacity: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>詳しい話を聞いてみませんか？</div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,.8)", marginTop: 1 }}>15分のカジュアル面談</div>
                    </div>
                    <div style={{ background: "#fff", color: "#12a37d", borderRadius: 6, padding: "4px 10px", fontSize: 9, fontWeight: 800 }}>予約 →</div>
                  </div>
                  {/* Score indicator */}
                  <div style={{ marginTop: 8, background: "#fff", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", animation: "slideIn .6s 2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "var(--heading)" }}>リードスコア</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 60, height: 4, borderRadius: 2, background: "var(--surface2)", overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#12a37d,#0fc19a)", "--sw": "72%", animation: "scoreUp 1.2s 2.2s cubic-bezier(.16,1,.3,1) forwards" } as React.CSSProperties} />
                      </div>
                      <span style={{ fontFamily: "var(--fm)", fontSize: 10, fontWeight: 700, color: "#12a37d" }}>+15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* CHANNEL 03 - ポップアップ (left) */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: "#7c5cfc10", color: "#7c5cfc" }}>CHANNEL 03</div>
              <div className="phase-h">最適なタイミングでAIが声をかける</div>
              <div className="phase-desc">離脱しようとしたタイミング、一定時間の滞在後、スクロール到達時など、訪問者の行動に応じたトリガーでAIポップアップを表示。閲覧ページの文脈に合わせたメッセージで、離脱を商談に変えます。</div>
              <div className="phase-features">
                {["Exit Intent検知", "スクロール到達トリガー", "滞在時間トリガー", "ページ文脈対応メッセージ"].map((f, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: "#7c5cfc" }} />{f}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis" style={{ background: "linear-gradient(160deg,#f5f3ff,#ede9fe)", padding: 16 }}>
                <div style={{ position: "absolute", top: 14, left: 14, right: 14 }}>
                  {/* Browser tab mockup */}
                  <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 8, marginBottom: 8, animation: "chatPop .5s .2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e0475b" }} />
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#12a37d" }} />
                    </div>
                    <div style={{ height: 6, background: "var(--surface2)", borderRadius: 3, marginBottom: 4 }} />
                    <div style={{ height: 6, background: "var(--surface2)", borderRadius: 3, width: "70%" }} />
                  </div>
                  {/* Cursor moving to exit */}
                  <div style={{ position: "relative", marginBottom: 8, animation: "chatPop .5s .5s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(124,92,252,.08)", border: "1px solid rgba(124,92,252,.15)", borderRadius: 8, padding: "5px 10px" }}>
                      <span style={{ fontSize: 12 }}>🖱️</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#7c5cfc" }}>Exit Intent 検知</span>
                      <span style={{ fontSize: 8, color: "var(--sub)", marginLeft: "auto" }}>カーソルが離脱方向へ</span>
                    </div>
                  </div>
                  {/* Popup overlay */}
                  <div style={{ background: "rgba(15,17,40,.4)", borderRadius: 12, padding: 8, animation: "popupSlide .6s .9s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    <div style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", boxShadow: "0 8px 32px rgba(0,0,0,.15)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg,#7c5cfc,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 800 }}>AI</div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--heading)" }}>ちょっとお待ちください！</span>
                      </div>
                      <div style={{ fontSize: 10, color: "var(--sub)", lineHeight: 1.5, marginBottom: 10 }}>料金ページをご覧いただいていましたね。<br />御社に最適なプランをご提案できます。</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <div style={{ flex: 1, background: "linear-gradient(135deg,#7c5cfc,#a78bfa)", color: "#fff", borderRadius: 8, padding: "6px 8px", fontSize: 9, fontWeight: 700, textAlign: "center" }}>プランを相談する</div>
                        <div style={{ flex: 1, background: "var(--surface)", color: "var(--heading)", borderRadius: 8, padding: "6px 8px", fontSize: 9, fontWeight: 700, textAlign: "center" }}>料金表をDL</div>
                      </div>
                    </div>
                  </div>
                  {/* Trigger indicators */}
                  <div style={{ display: "flex", gap: 5, marginTop: 8, animation: "slideIn .6s 1.5s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
                    {[
                      { icon: "🚪", label: "Exit Intent" },
                      { icon: "📜", label: "Scroll 80%" },
                      { icon: "⏱️", label: "滞在 30s" },
                    ].map((t, k) => (
                      <div key={k} style={{ flex: 1, background: "#fff", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 5px", textAlign: "center" }}>
                        <div style={{ fontSize: 10 }}>{t.icon}</div>
                        <div style={{ fontSize: 7, fontWeight: 700, color: "var(--sub)" }}>{t.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTEGRATION FLOW ===== */}
      <section className="section" style={{ background: "var(--surface)", position: "relative" }}>
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: "center" }}>INTEGRATION</div>
          <div className="stitle" style={{ textAlign: "center" }}>3つのチャネルが連携して取りこぼしゼロ</div>
          <p className="ssub" style={{ textAlign: "center", margin: "0 auto 20px" }}>すべてのサイト内チャネルがAI Chatコアエンジンに接続。訪問者のあらゆる行動がリードスコアに反映され、最適なタイミングでフォローアップにつながります。</p>
          <div className="flow-container">
            {/* Visitor */}
            <div className="flow-node" style={{ animation: "popIn .5s .2s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
              <div className="flow-node-icon" style={{ background: "linear-gradient(135deg,var(--surface2),#fff)" }}>👤</div>
              <div className="flow-node-label">訪問者</div>
              <div className="flow-node-sub">Webサイト来訪</div>
            </div>
            <div className="flow-arrow" style={{ animationDelay: ".4s" }}>→</div>
            {/* Resource Page */}
            <div className="flow-node" style={{ borderColor: "rgba(8,145,178,.2)", animation: "popIn .5s .5s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
              <div className="flow-node-icon" style={{ background: "var(--cyan-light)" }}>📄</div>
              <div className="flow-node-label">資料ページ</div>
              <div className="flow-node-sub">AI資料提案</div>
            </div>
            <div className="flow-arrow" style={{ animationDelay: ".7s" }}>→</div>
            {/* Thank you Page */}
            <div className="flow-node" style={{ borderColor: "rgba(18,163,125,.2)", animation: "popIn .5s .8s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
              <div className="flow-node-icon" style={{ background: "var(--cta-light)" }}>✅</div>
              <div className="flow-node-label">サンクスページ</div>
              <div className="flow-node-sub">追加アクション</div>
            </div>
            <div className="flow-arrow" style={{ animationDelay: "1s" }}>→</div>
            {/* Popup */}
            <div className="flow-node" style={{ borderColor: "rgba(124,92,252,.2)", animation: "popIn .5s 1.1s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
              <div className="flow-node-icon" style={{ background: "var(--accent-light)" }}>💡</div>
              <div className="flow-node-label">ポップアップ</div>
              <div className="flow-node-sub">離脱防止</div>
            </div>
            <div className="flow-arrow" style={{ animationDelay: "1.3s" }}>→</div>
            {/* AI Core */}
            <div className="flow-core" style={{ animation: "popIn .5s 1.4s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}>
              <div className="flow-core-icon">🤖</div>
              <div className="flow-core-label">AI Chat コア</div>
              <div className="flow-core-sub">統合リードスコア管理</div>
            </div>
          </div>
          {/* Connection details */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 800, margin: "20px auto 0" }}>
            {[
              { icon: "📄", channel: "資料ページ", action: "興味・閲覧履歴", color: "#0891b2", bg: "var(--cyan-light)" },
              { icon: "✅", channel: "サンクスページ", action: "CV後の行動", color: "#12a37d", bg: "var(--cta-light)" },
              { icon: "💡", channel: "ポップアップ", action: "離脱意図・反応", color: "#7c5cfc", bg: "var(--accent-light)" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", textAlign: "center", transition: "all .3s" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.channel}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.color }} />
                  <span style={{ fontSize: 11, color: "var(--sub)", fontWeight: 600 }}>{item.action}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 9, fontFamily: "var(--fm)", fontWeight: 700, color: item.color, background: item.bg, borderRadius: 6, padding: "3px 8px", display: "inline-block" }}>→ スコアに反映</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: "center" }}>よくある質問</div>
          <div className="stitle" style={{ textAlign: "center" }}>FAQ</div>
          <div style={{ height: 36 }} />
          <div className="faq-list">
            {faqData.map((f, i) => (
              <div className={"faq-item" + (openFaq === i ? " open" : "")} key={i}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{f.q}<div className="faq-toggle">+</div></div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta">
        <div className="dot-grid" />
        <div className="glow" style={{ background: "rgba(18,163,125,.15)", width: 500, height: 500, top: -100, right: -50 }} />
        <div className="glow" style={{ background: "rgba(124,92,252,.1)", width: 400, height: 400, bottom: -100, left: -50 }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: "center" }}>サイト内のあらゆる接点を<br />AIが最適化</div>
          <p className="ssub" style={{ textAlign: "center", margin: "16px auto 36px" }}>資料ページ・サンクスページ・ポップアップ。3つのチャネルでリード獲得を最大化しましょう。</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-onsite" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-onsite" />
    </div>
  );
}
