import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--pink:#d03ea1;--red:#e0475b;
  --fd:'Plus Jakarta Sans',sans-serif;--fb:'Noto Sans JP','Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.52s}.d5{animation-delay:.68s}

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:14px 48px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.85);backdrop-filter:blur(20px) saturate(1.4);border-bottom:1px solid rgba(223,227,240,.6)}
.nav-logo{font-family:var(--fb);font-weight:900;font-size:22px;color:var(--heading)}
.nav-logo span{color:var(--cta)}
.nav-links{display:flex;gap:28px}
.nav-links a{font-size:15px;color:var(--sub);text-decoration:none;font-weight:600;transition:color .2s;position:relative}
.nav-links a:hover{color:var(--heading)}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--cta);border-radius:1px;transition:width .2s}
.nav-links a:hover::after{width:100%}
.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 6px 28px var(--cta-glow)}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 38px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}
.btn-outline{background:transparent;border:2px solid var(--border2);color:var(--sub);padding:12px 26px;border-radius:10px;font-size:15px;cursor:pointer;font-family:var(--fb);font-weight:700;transition:all .25s}
.btn-outline:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--accent);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:100px 48px}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:48px;font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:19px;line-height:1.85;color:var(--sub);max-width:660px}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%)}
.hero-content{max-width:860px;text-align:center;position:relative;z-index:2}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:9px 22px;border-radius:24px;margin-bottom:36px;font-size:15px;font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:76px;font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2.5px;margin-bottom:28px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:22px;line-height:1.8;color:var(--sub);max-width:640px;margin:0 auto 48px}
.hero-ctas{display:flex;gap:14px;justify-content:center}
.hero-stats{display:flex;justify-content:center;gap:72px;margin-top:72px;padding-top:48px;border-top:1px solid var(--border)}
.stat-v{font-family:var(--fm);font-size:52px;font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:15px;color:var(--sub);margin-top:8px;font-weight:600}
.hero-float{position:absolute;animation:float 6s ease-in-out infinite;pointer-events:none;border-radius:16px;backdrop-filter:blur(4px)}

/* PROBLEM */
.pbar{margin:44px auto 0;max-width:520px;background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:22px 28px;text-align:left;box-shadow:0 4px 20px rgba(0,0,0,.04)}
.pbar-track{height:12px;background:var(--surface2);border-radius:6px;overflow:hidden;position:relative}
.pbar-lost{position:absolute;left:0;top:0;height:100%;width:0;background:linear-gradient(90deg,#e0475b,#ff6b81);border-radius:6px 0 0 6px;opacity:.8;animation:barGrow 4s ease infinite}
.pbar-cv{position:absolute;right:0;top:0;height:100%;width:0;background:linear-gradient(90deg,var(--cta),#0fc19a);border-radius:0 6px 6px 0;animation:barCv 4s ease infinite}
@keyframes barGrow{0%{width:0}30%{width:99%}80%{width:99%}100%{width:0}}
@keyframes barCv{0%,40%{width:0}50%{width:1%}80%{width:1%}100%{width:0}}
.pbar-legend{display:flex;justify-content:space-between;margin-top:12px;font-size:12px;font-weight:700}

/* FLOW */
.sflow{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:52px}
.sf-step{display:flex;flex-direction:column;align-items:center;width:168px;cursor:default;transition:transform .35s cubic-bezier(.16,1,.3,1)}
.sf-step:hover{transform:translateY(-6px)}
.sf-num{width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:17px;font-weight:700;color:#fff;margin-bottom:12px;box-shadow:0 6px 20px rgba(0,0,0,.15)}
.sf-label{font-size:15px;font-weight:800;color:var(--heading);margin-bottom:4px}
.sf-desc{font-size:12px;color:var(--sub);text-align:center;font-weight:500}
.sf-arrow{width:48px;height:2px;background:linear-gradient(90deg,var(--border),var(--border2));position:relative;flex-shrink:0}
.sf-arrow::after{content:'';position:absolute;right:-1px;top:-4px;border:5px solid transparent;border-left:6px solid var(--border2)}

/* CARDS */
.pcards{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.pcard{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:30px;position:relative;overflow:hidden;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03)}
.pcard:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1)}
.pcard-top{position:absolute;top:0;left:0;right:0;height:3px}
.pcard-hdr{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.pcard-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px}
.pcard-phase{font-family:var(--fm);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px}
.pcard-title{font-size:18px;font-weight:800;color:var(--heading)}
.pcard-body{font-size:14px;line-height:1.75;margin-bottom:18px}
.pcard-feats{display:flex;flex-direction:column;gap:7px}
.pcard-feat{display:flex;align-items:flex-start;gap:9px;font-size:13px;font-weight:600}
.pcard-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:7px}

/* ZIGZAG PHASES */
.phase-row{display:flex;align-items:center;gap:64px;padding:80px 0;position:relative}
.phase-row.reverse{flex-direction:row-reverse}
.phase-text{flex:1;min-width:0}
.phase-vis{flex:1;min-width:0;display:flex;align-items:center;justify-content:center}
.phase-tag{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:20px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
.phase-h{font-size:32px;font-weight:900;color:var(--heading);letter-spacing:-.5px;margin-bottom:14px;line-height:1.25}
.phase-desc{font-size:16px;line-height:1.85;color:var(--sub);margin-bottom:22px}
.phase-features{display:flex;flex-direction:column;gap:10px}
.phase-feat{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:600;color:var(--text)}
.phase-feat-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:8px}
.phase-divider{height:1px;background:var(--border);max-width:1140px;margin:0 auto}

/* PHASE VISUALS */
.pvis{width:100%;max-width:440px;aspect-ratio:4/3;border-radius:20px;position:relative;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.06);border:1px solid var(--border)}

@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes emailPulse{0%,100%{box-shadow:0 0 0 0 rgba(18,163,125,.3)}50%{box-shadow:0 0 0 10px rgba(18,163,125,0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}

/* Phase 0 - Chat bubbles */
.vis0{background:linear-gradient(160deg,#f0fdfa,#f8f9ff)}
.vis0-bubble{position:absolute;padding:10px 16px;border-radius:14px;font-size:12px;font-weight:600;max-width:200px;line-height:1.5;animation:chatPop .5s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.vis0-ai{background:#fff;border:1px solid var(--border);color:var(--heading);border-bottom-left-radius:4px}
.vis0-res{background:linear-gradient(135deg,#e5f8f2,#eaf0fe);border:1px solid rgba(18,163,125,.15);color:var(--cta);font-size:11px;padding:8px 14px;border-radius:10px;cursor:default}

/* Phase 1 - Email capture */
.vis1{background:linear-gradient(160deg,#f0fdfa,#f0fdf9)}
.vis1-input{position:absolute;bottom:60px;left:50%;transform:translateX(-50%);width:260px;padding:12px 16px;border-radius:12px;border:2px solid var(--cta);background:#fff;font-size:13px;color:var(--heading);font-weight:600;font-family:var(--fb);animation:emailPulse 2s infinite}
.vis1-crm{position:absolute;top:30px;right:30px;background:#fff;border:1px solid var(--border);border-radius:12px;padding:10px 14px;font-size:11px;font-weight:700;color:var(--cta);animation:slideIn .6s .8s cubic-bezier(.16,1,.3,1) forwards;opacity:0;display:flex;align-items:center;gap:6px}
.vis1-badge{width:8px;height:8px;border-radius:50%;background:var(--cta);animation:pulse 1.5s infinite}

/* Phase 2 - Score gauge */
.vis2{background:linear-gradient(160deg,#eef2ff,#f8f9ff)}
.vis2-bar{position:absolute;height:10px;border-radius:5px;left:40px;animation:scoreUp 1.2s cubic-bezier(.16,1,.3,1) forwards}
.vis2-label{position:absolute;left:40px;font-size:11px;font-weight:700;color:var(--sub)}
.vis2-badge{position:absolute;right:40px;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:800;animation:slideIn .5s cubic-bezier(.16,1,.3,1) forwards;opacity:0}

/* Phase 3 - Nurture flow */
.vis3{background:linear-gradient(160deg,#fdf0fc,#f8f0ff)}
.vis3-node{position:absolute;width:80px;height:80px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:22px;border:1px solid;animation:nodeGrow .5s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.vis3-node-label{font-size:9px;font-weight:700;margin-top:4px}
.vis3-arrow{position:absolute;font-family:var(--fm);font-size:16px;color:var(--border2);animation:slideIn .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}

/* DEEP */
.deep-section{margin-bottom:64px}
.deep-hdr{display:flex;align-items:center;gap:18px;margin-bottom:18px}
.deep-icon{width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:24px}
.deep-phase{font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase}
.deep-title{font-size:28px;font-weight:900;color:var(--heading);letter-spacing:-.5px}
.deep-body{font-size:15px;line-height:1.85;max-width:660px;margin-bottom:22px}
.deep-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(248px,1fr));gap:14px}
.deep-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:20px;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 1px 4px rgba(0,0,0,.02)}
.deep-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.06);border-color:transparent}
.deep-card-t{font-size:14px;font-weight:800;color:var(--heading);margin-bottom:7px}
.deep-card-d{font-size:12px;line-height:1.7;color:var(--sub)}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{font-size:32px;margin-bottom:16px}
.why-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px}
.why-desc{font-size:15px;line-height:1.75;color:var(--sub)}

/* STEPS */
.steps-row{display:flex;gap:18px;align-items:stretch}
.step-card{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:30px;box-shadow:0 2px 8px rgba(0,0,0,.03);transition:all .3s;position:relative;overflow:hidden}
.step-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.06)}
.step-num{font-family:var(--fm);font-size:38px;font-weight:700;margin-bottom:14px;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.step-title{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:10px}
.step-desc{font-size:15px;line-height:1.75;color:var(--sub)}
.step-arrow{display:flex;align-items:center;font-family:var(--fm);font-size:22px;color:var(--border2);padding:0 4px}

/* CASES */
.case-carousel{position:relative;overflow:hidden}
.case-track{display:flex;gap:18px;transition:transform .5s cubic-bezier(.16,1,.3,1);padding:4px 0}
.case-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:32px 36px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03);min-width:100%;flex-shrink:0}
.case-card:hover{box-shadow:0 8px 32px rgba(18,163,125,.08)}
.case-arrows{display:flex;justify-content:center;gap:14px;margin-top:28px}
.case-arrow{width:48px;height:48px;border-radius:50%;border:2px solid var(--border);background:var(--bg);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--heading);transition:all .25s;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.case-arrow:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light);box-shadow:0 6px 20px var(--cta-glow)}
.case-arrow:disabled,.case-arrow[disabled]{opacity:.3;cursor:default;pointer-events:none}
.case-dots{display:flex;justify-content:center;gap:8px;margin-top:16px}
.case-dot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all .25s;cursor:pointer}
.case-dot.active{background:var(--cta);width:28px;border-radius:4px;box-shadow:0 0 8px var(--cta-glow)}
.case-logo{font-family:var(--fb);font-size:22px;font-weight:900;color:var(--heading);margin-bottom:4px}
.case-industry{font-size:13px;color:var(--sub);margin-bottom:18px;font-weight:500}
.case-quote{font-size:16px;line-height:1.9;color:var(--text);margin-bottom:24px;padding:20px 26px;background:linear-gradient(135deg,var(--surface),var(--surface2));border-radius:14px;border-left:4px solid var(--cta);width:100%}
.case-stats{display:flex;gap:48px;flex-wrap:wrap;padding-top:18px;border-top:1px solid var(--border)}
.case-stat-v{font-family:var(--fm);font-size:26px;font-weight:700}
.case-stat-l{font-size:12px;color:var(--sub);margin-top:3px;font-weight:500}

/* INTEGRATIONS */
.int-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:820px;margin:0 auto}
.int-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:22px 18px;text-align:center;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03)}
.int-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 10px 30px rgba(0,0,0,.07)}
.int-icon{font-size:32px;margin-bottom:10px}
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
.client-logos{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;align-items:center}
.client-logo{padding:14px 32px;background:var(--bg);border:1px solid var(--border);border-radius:12px;font-family:var(--fd);font-size:15px;font-weight:800;color:var(--sub);transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03);letter-spacing:-.3px}
.client-logo:hover{color:var(--heading);border-color:transparent;box-shadow:0 8px 24px rgba(0,0,0,.07);transform:translateY(-2px)}

/* CTA */
.final-cta{padding:100px 48px 120px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

.footer{border-top:1px solid var(--border);padding:36px 48px;display:flex;align-items:center;justify-content:space-between;background:var(--surface)}
.footer-logo{font-family:var(--fb);font-weight:900;font-size:17px;color:var(--sub)}
.footer-logo span{color:var(--cta)}
.footer-links{display:flex;gap:24px}
.footer-links a{font-size:13px;color:var(--sub);text-decoration:none;font-weight:600;transition:color .2s}
.footer-links a:hover{color:var(--heading)}
`;

const phases = [
  { num:"0",label:"接触",desc:"信頼構築",color:"#0891b2",icon:"👋",phase:"Phase 0",title:"AIが自ら話しかける",
    body:"3つの入り口が同時に機能します。訪問者が見ているページに合わせてAIが声をかけ、資料カードで興味を引き、ダウンロードページではAIが資料選びをサポートします。",
    cards:[
      {t:"ページに合わせた自動あいさつ",d:"料金ページなら「プランについてご質問ありますか？」、ブログなら「詳しい資料をお送りしましょうか？」。ページごとにAIが最適な声かけをします。"},
      {t:"資料カードで興味を引く",d:"チャットの横に表示されるカード。クリックするとフォームではなく、AIとの会話が始まります。資料の内容を説明してから自然にリード情報を取得。"},
      {t:"ダウンロードセンター",d:"お客様の資料を一覧表示する専用ページ。AIがブラウジングをサポートし、最適な資料を提案。すべての導線がリード獲得につながります。"},
      {t:"「すぐ話したい」への即対応",d:"「担当者と話したい」という訪問者には資料の紹介をスキップ。最短ルートでメール取得→商談予約、または営業への即時通知を行います。"},
    ]},
  { num:"1",label:"獲得",desc:"自然な流れで",color:"#12a37d",icon:"📧",phase:"Phase 1",title:"チャットで自然にリード獲得",
    body:"会話の流れの中でメールアドレスを取得。チャット下部の入力欄でバリデーション付きの取得が可能です。入力された瞬間にCRMへ自動登録されるため、ブラウザが閉じてもデータは安全です。",
    cards:[
      {t:"チャット内のメール入力欄",d:"チャット画面の下部に専用の入力フィールド。リアルタイムバリデーションとオートコンプリートに対応。会話の流れを止めずに取得できます。"},
      {t:"CRMへ即時登録",d:"メール入力の瞬間にCRMへ Soft Lead として自動登録。タイムラグなし。ブラウザが落ちてもデータは保存済み。"},
      {t:"資料をその場でお届け",d:"資料はチャット内で直接ダウンロードリンクを表示。「メールをご確認ください」の待ち時間なし。"},
      {t:"急ぎの訪問者には最短ルート",d:"「すぐ話したい」訪問者にはフォーム入力をスキップ。商談予約の条件を満たしていれば即カレンダー表示。そうでなければ営業に即通知。"},
    ]},
  { num:"2",label:"評価",desc:"自動で判定",color:"#3b6ff5",icon:"🎯",phase:"Phase 2",title:"見込み度を自動判定して振り分け",
    body:"ページ閲覧、チャットの内容、訪問パターンをリアルタイムで点数化。お客様が設定したルールに基づき、商談に値する訪問者だけがカレンダー予約に進めます。",
    cards:[
      {t:"リアルタイムの見込み度スコア",d:"料金ページ閲覧+20点、デモ依頼+25点、7日間で3回訪問+25点。どの行動が何点か、すべて透明で設定可能。"},
      {t:"スコアに応じた3段階の振り分け",d:"高スコア: 即座に商談予約へ。中スコア: 追加情報を取得してから判断。低スコア: 行動を記録して次回の訪問に備える。"},
      {t:"商談予約の条件設定",d:"「従業員50人以上」「特定業種のみ」「フリーランス除外」など、お客様が設定したルールで商談予約を制御。無駄な商談を防ぎます。"},
      {t:"リードの温度感に合わせたアプローチ",d:"スコアが高い訪問者には即座に商談予約を提案。中程度なら追加情報を取得してから判断。低スコアなら行動を記録して次回の訪問に備える。温度感に応じた最適な対応を自動で実行します。"},
    ]},
  { num:"3",label:"育成",desc:"AI自動育成",color:"#c026d3",icon:"🤖",phase:"Phase 3",title:"AIがリードを自動で育成",
    body:"リードの状態に応じて、AIが自動でメール配信・チャット再接触・行動トラッキングを組み合わせ、次のステージへ進めます。Soft Lead（メールのみ）→ Hard Lead（詳細情報あり）→ 商談予約まで、すべて自動です。",
    cards:[
      {t:"Soft Lead → 詳細情報の取得",d:"メール獲得後、資料や事例を段階的に送信し、フォーム入力を促します。フォーム完了でHard Leadに昇格、次のステージへ自動移行。"},
      {t:"Hard Lead → 商談予約",d:"業界に合ったケーススタディやROIデータを送信。カレンダーリンク付きで商談予約を促進。料金ページ再訪などのシグナルでメールを前倒し。"},
      {t:"商談の準備からフォローアップまで",d:"確認メール、事前資料、2時間前のリマインダーまで自動化。同僚の訪問を検知したらマルチステークホルダー向け資料も自動生成。"},
      {t:"サイト再訪時のチャット再接触",d:"リードがサイトに戻ってきたら、前回の会話内容を踏まえてAIが声をかけます。メールだけでは届かないタイミングでも接点を作ります。"},
    ]},
];

const whyData = [
  {icon:"💬",title:"チャットだから分かる本音",desc:"フォームでは取れない「何に興味があるか」「何に困っているか」をAIチャットがリアルタイムで把握。最も精度の高い見込み判定を実現。"},
  {icon:"🧠",title:"シナリオ設計不要、AIが自律稼働",desc:"初期設定だけ済ませれば、あとはAIが訪問者の行動・文脈に応じて最適な対応を自律的に判断。従来のチャットボットのようなシナリオ分岐の設計・運用は一切不要。"},
  {icon:"🔄",title:"AI ナーチャリングエンジン",desc:"Soft Lead → Hard Lead → 商談予約。リードの状態に応じてメール配信・チャット再接触・行動シグナルを自動で組み合わせ、人手なしでリードを次のステージへ進めます。"},
  {icon:"⚡",title:"自然な流れでリード獲得",desc:"従来のフォームに加え、チャット内での自然なやりとりでもリード情報を取得。訪問者の体験を損なわず、取りこぼしを減らします。"},
  {icon:"🎯",title:"待ちじゃない、AIから能動的に",desc:"従来のチャットボットは訪問者が話しかけるのを待つだけ。Meeton aiはページ内容・閲覧行動・再訪パターンを読み取り、AIから最適なタイミングで声をかけます。"},
  {icon:"🚀",title:"5分で導入、コード不要",desc:"WebサイトにJSタグを1行追加するだけ。既存のCRM、カレンダー、チャットツールと連携。開発リソース不要。"},
];

const stepsData = [
  {num:"01",title:"タグを設置",desc:"WebサイトにJavaScriptタグを数行追加するだけ。WordPressプラグインも用意。所要時間: 約5分。"},
  {num:"02",title:"AIを設定",desc:"ダッシュボードからAIの声かけ内容、商談予約のルール、提案に使う資料等を設定。テンプレートから簡単に始められます。"},
  {num:"03",title:"リードが入り始める",desc:"設定完了した瞬間からAIが稼働。リードの獲得、評価、育成、商談予約が自動で回り始めます。"},
];

const caseData = [
  {name:"G-gen",industry:"Google Cloud プレミアパートナー",
    quote:"チャットで製品について十分に把握してからのリードのため、見当違いの問い合わせが激減。獲得商談の約半分はMeeton aiによる自動獲得です。",
    stats:[{v:"2x",l:"リード獲得数",c:"var(--cta)"},{v:"60%",l:"商談化率",c:"var(--blue)"},{v:"3x",l:"商談化率の改善",c:"var(--accent)"}]},
  {name:"Univis",industry:"M&Aアドバイザリー・財務会計コンサル",
    quote:"高単価サービスでもAIが専門性の高い説明を的確に実施。「相談したい」という明確な意思のある訪問者を逃さず獲得できています。",
    stats:[{v:"4x",l:"月間リード数",c:"var(--cta)"},{v:"100%",l:"リード→商談化率",c:"var(--blue)"},{v:"12件",l:"月間リード",c:"var(--accent)"}]},
  {name:"BizteX",industry:"クラウドRPA・業務自動化ツール",
    quote:"複雑な設定やシナリオ設計が不要。AIが自動で学習し、導入直後から成果を発揮。比較検討中の訪問者に最適なタイミングで話しかけてくれます。",
    stats:[{v:"25件",l:"導入初月リード",c:"var(--cta)"},{v:"即日",l:"効果発揮",c:"var(--blue)"},{v:"0",l:"必要な開発工数",c:"var(--accent)"}]},
  {name:"EdulinX",industry:"英語eラーニング・教育サービス",
    quote:"BtoB営業のリード獲得だけでなく、受講生からの問い合わせにもAIが24時間対応。営業とカスタマーサポートの両面で効果が出ています。",
    stats:[{v:"14.3%",l:"資料DL CVR",c:"var(--cta)"},{v:"931社",l:"月間企業特定",c:"var(--blue)"},{v:"24/7",l:"サポート自動化",c:"var(--accent)"}]},
];

const integrations = [
  {icon:"☁️",name:"Salesforce",desc:"CRM連携"},
  {icon:"🟠",name:"HubSpot",desc:"CRM連携"},
  {icon:"💬",name:"Slack",desc:"通知・アラート"},
  {icon:"👥",name:"Microsoft Teams",desc:"通知・アラート"},
  {icon:"📅",name:"Google Calendar",desc:"商談予約"},
  {icon:"💭",name:"Google Chat",desc:"通知・アラート"},
  {icon:"🗓️",name:"Spir",desc:"日程調整"},
  {icon:"⏰",name:"TimeRex",desc:"日程調整"},
  {icon:"📊",name:"Marketo",desc:"MA連携"},
];

const faqData = [
  {q:"導入にどのくらい時間がかかりますか？",a:"JavaScriptタグの設置は5分です。AIの設定を含めても、最短で当日中に稼働開始できます。"},
  {q:"既存のCRM（Salesforce / HubSpot）と連携できますか？",a:"はい。Salesforce、HubSpotとのネイティブ連携に対応しています。Webhook経由で他のCRMにも接続可能です。"},
  {q:"多言語に対応していますか？",a:"はい。日本語・英語・中国語・韓国語をはじめ、主要言語に対応しています。海外拠点を持つ企業や多国籍チームでもそのままご利用いただけます。"},
  {q:"無料トライアルはありますか？",a:"14日間の無料トライアルをご用意しています。クレジットカード不要で全機能をお試しいただけます。"},
];

const clients = ["G-gen","OpenLogi","BizteX","Cogent Labs","Enlyt","PRIZMA"];

const whyIcons = {
  chat: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="24" height="16" rx="3" fill="#12a37d" opacity=".15"/>
      <rect x="2" y="4" width="24" height="16" rx="3" stroke="#12a37d" strokeWidth="2" fill="none"/>
      <path d="M8 10h12M8 15h8" stroke="#12a37d" strokeWidth="2" strokeLinecap="round"/>
      <rect x="14" y="16" width="24" height="16" rx="3" fill="#3b6ff5" opacity=".12"/>
      <rect x="14" y="16" width="24" height="16" rx="3" stroke="#3b6ff5" strokeWidth="2" fill="none"/>
      <circle cx="22" cy="24" r="1.5" fill="#3b6ff5"/><circle cx="27" cy="24" r="1.5" fill="#3b6ff5"/><circle cx="32" cy="24" r="1.5" fill="#3b6ff5"/>
    </svg>
  ),
  brain: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4c-7 0-12 5-12 11 0 3.5 1.8 6.5 4.5 8.5L14 34h12l1.5-10.5C30.2 21.5 32 18.5 32 15c0-6-5-11-12-11z" fill="#7c5cfc" opacity=".12" stroke="#7c5cfc" strokeWidth="2"/>
      <path d="M16 34h8M17 37h6" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 16c0 0 2 3 4 3s4-3 4-3" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="20" y1="2" x2="20" y2="4" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="5" x2="13.5" y2="6.5" stroke="#7c5cfc" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
      <line x1="28" y1="5" x2="26.5" y2="6.5" stroke="#7c5cfc" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
    </svg>
  ),
  nurture: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="12" r="6" fill="#12a37d" opacity=".15" stroke="#12a37d" strokeWidth="2"/>
      <circle cx="32" cy="12" r="6" fill="#3b6ff5" opacity=".12" stroke="#3b6ff5" strokeWidth="2"/>
      <circle cx="20" cy="32" r="6" fill="#7c5cfc" opacity=".12" stroke="#7c5cfc" strokeWidth="2"/>
      <path d="M13 15l4 12" stroke="#12a37d" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
      <path d="M27 15l-4 12" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
      <path d="M14 12h12" stroke="#7c5cfc" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity=".5"/>
      <path d="M6 10l4 4-4 0z" fill="#12a37d"/>
      <path d="M30 10l4 0 0 4z" fill="#3b6ff5"/>
      <path d="M18 30l4 4 4-4z" fill="#7c5cfc"/>
    </svg>
  ),
  capture: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="32" height="22" rx="4" fill="#12a37d" opacity=".1" stroke="#12a37d" strokeWidth="2"/>
      <path d="M4 16h32" stroke="#12a37d" strokeWidth="1.5" opacity=".3"/>
      <path d="M10 22h14" stroke="#12a37d" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 27h8" stroke="#12a37d" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
      <circle cx="32" cy="24" r="5" fill="#12a37d" opacity=".2"/>
      <path d="M29.5 24l2 2 3.5-4" stroke="#12a37d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 10V7a5 5 0 0 1 10 0v3" stroke="#12a37d" strokeWidth="2" fill="none"/>
    </svg>
  ),
  proactive: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#3b6ff5" opacity=".08" stroke="#3b6ff5" strokeWidth="2"/>
      <circle cx="20" cy="20" r="9" fill="#3b6ff5" opacity=".12"/>
      <circle cx="20" cy="20" r="4" fill="#3b6ff5"/>
      <line x1="20" y1="2" x2="20" y2="6" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="34" x2="20" y2="38" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round"/>
      <line x1="2" y1="20" x2="6" y2="20" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round"/>
      <line x1="34" y1="20" x2="38" y2="20" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  rocket: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2c-4 7-6 14-6 22h12c0-8-2-15-6-22z" fill="#12a37d" opacity=".15" stroke="#12a37d" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="20" cy="16" r="3" fill="#12a37d" opacity=".4"/>
      <path d="M14 24c-3 0-6 2-8 5l8-1" fill="#12a37d" opacity=".15" stroke="#12a37d" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M26 24c3 0 6 2 8 5l-8-1" fill="#12a37d" opacity=".15" stroke="#12a37d" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M18 28h4v5l-2 5-2-5v-5z" fill="#12a37d" opacity=".3"/>
      <path d="M17 30l3 8 3-8" stroke="#12a37d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
};

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

export default function App(){
  const [openFaq, setOpenFaq] = useState(null);
  return(
    <div>
      <style dangerouslySetInnerHTML={{__html:css}}/>

      <nav className="nav">
        <div className="nav-logo">Meeton<span> ai</span></div>
        <div className="nav-links">
          <a href="#solution">ソリューション</a><a href="#features">機能</a><a href="#integrations">連携</a><a href="#faq">FAQ</a>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn btn-outline">資料請求</button>
          <button className="btn btn-cta">デモを予約</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="dot-grid"/>
        <div className="glow" style={{background:"rgba(18,163,125,.2)",width:600,height:600,top:-200,right:-100}}/>
        <div className="glow" style={{background:"rgba(124,92,252,.15)",width:500,height:500,bottom:-150,left:-80}}/>
        <div className="glow" style={{background:"rgba(59,111,245,.1)",width:400,height:400,top:"40%",left:"50%"}}/>
        <div className="hero-content">
          <div className="anim d1 hero-badge"><div className="hero-badge-dot"/>BtoB企業向け AI SDR</div>
          <h1 className="anim d2">Webサイト訪問者を<br/><em>商談に変える</em> AI</h1>
          <p className="anim d3 hero-sub">Meeton ai がすべてのWebサイト訪問者に対応し、スムーズにリードを獲得。見込み度を自動で評価し、メールとチャットで育成しながら、商談予約まで自動化します。</p>
          <div className="anim d4 hero-ctas">
            <button className="btn btn-cta btn-cta-lg">資料請求</button>
            <button className="btn-ghost">デモを予約 →</button>
          </div>
          <div className="anim d5 hero-stats">
            {[{v:"2x",l:"商談化率の向上"},{v:"3x",l:"リード獲得数の向上"},{v:"24/7",l:"AIが常時対応"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section" style={{textAlign:"center",background:"var(--surface)",position:"relative"}}>
        <div className="section-inner">
          <div className="slabel">課題</div>
          <div className="stitle">Webサイトの訪問者、<span style={{color:"var(--red)"}}>99%</span>を失っていませんか？</div>
          <p className="ssub" style={{margin:"0 auto"}}>従来のフォームのCVRは1%以下。残りの99%は興味を持ったまま離脱し、二度と戻ってきません。</p>
          <div className="pbar">
            <div style={{fontSize:13,color:"var(--sub)",marginBottom:10,fontWeight:600}}>一般的なB2B Webサイトのコンバージョン率</div>
            <div className="pbar-track"><div className="pbar-lost"/><div className="pbar-cv"/></div>
            <div className="pbar-legend"><span style={{color:"var(--red)"}}>99% 離脱・ロスト</span><span style={{color:"var(--cta)"}}>1% フォーム送信</span></div>
          </div>
        </div>
      </section>

      {/* SOLUTION - ZIGZAG */}
      <section className="section" id="solution" style={{position:"relative",paddingBottom:0}}>
        <div className="dot-grid" style={{opacity:.4}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>ソリューション</div>
          <div className="stitle" style={{textAlign:"center"}}>4つのフェーズ。完全自動化。</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 20px"}}>Meeton ai が訪問者への声かけから商談予約まで、すべてを自動で行います。</p>
        </div>
      </section>

      {/* Phase 0 */}
      <section style={{padding:"0 48px",position:"relative"}} id="features">
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#0891b210",color:"#0891b2"}}>Phase 0 — 接触</div>
              <div className="phase-h">AIが自ら話しかける</div>
              <div className="phase-desc">訪問者が見ているページに合わせてAIが声をかけ、資料カードで興味を引き、ダウンロードページではAIが資料選びをサポートします。</div>
              <div className="phase-features">
                {phases[0].cards.map((c,i)=><div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#0891b2"}}/>{c.t}</div>)}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div className="vis0-bubble vis0-ai" style={{top:28,left:24,animationDelay:".2s"}}>こんにちは！👋<br/>プランについてご質問ありますか？</div>
                <div className="vis0-bubble vis0-ai" style={{top:100,left:24,animationDelay:".8s",fontSize:11,color:"var(--sub)"}}>こちらの資料もおすすめです：</div>
                <div className="vis0-bubble vis0-res" style={{top:148,left:24,animationDelay:"1.2s"}}>📄 導入ガイド（PDF）</div>
                <div className="vis0-bubble vis0-res" style={{top:148,left:190,animationDelay:"1.5s"}}>📊 料金比較表</div>
                <div className="vis0-bubble" style={{top:210,right:24,animationDelay:"2s",background:"var(--cta)",color:"#fff",borderBottomRightRadius:4}}>料金について詳しく知りたいです</div>
              </div>
            </div>
          </div>
          <div className="phase-divider"/>

          {/* Phase 1 */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#12a37d10",color:"#12a37d"}}>Phase 1 — 獲得</div>
              <div className="phase-h">チャットで自然にリード獲得</div>
              <div className="phase-desc">会話の流れの中でメールアドレスを取得。入力された瞬間にCRMへ自動登録されるため、ブラウザが閉じてもデータは安全です。</div>
              <div className="phase-features">
                {phases[1].cards.map((c,i)=><div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#12a37d"}}/>{c.t}</div>)}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div className="vis0-bubble vis0-ai" style={{top:20,left:20,animationDelay:".3s"}}>資料をお送りしますね！<br/>メールアドレスを教えてください 📧</div>
                <div style={{position:"absolute",top:88,left:20,right:20,padding:"10px 14px",borderRadius:10,border:"2px solid var(--cta)",background:"#fff",fontSize:13,color:"var(--heading)",fontWeight:600,fontFamily:"var(--fb)",animation:"emailPulse 2s infinite",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span>tanaka@example.co.jp</span>
                  <span style={{background:"var(--cta)",color:"#fff",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700}}>送信</span>
                </div>
                <div style={{position:"absolute",top:140,right:20,background:"#fff",border:"1px solid var(--border)",borderRadius:10,padding:"8px 12px",fontSize:11,fontWeight:700,color:"var(--cta)",animation:"slideIn .6s .8s cubic-bezier(.16,1,.3,1) forwards",opacity:0,display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:"var(--cta)",animation:"pulse 1.5s infinite"}}/>CRMへ即時登録
                </div>
                <div style={{position:"absolute",top:182,left:20,right:20,animation:"slideIn .6s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:10,padding:"10px 14px",marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:700,color:"var(--heading)",marginBottom:8}}>📎 ご希望の資料はこちらです：</div>
                    <div style={{display:"flex",gap:8}}>
                      {[{name:"導入ガイド.pdf",size:"2.4 MB"},{name:"料金比較表.pdf",size:"1.1 MB"}].map((f,j)=>(
                        <div key={j} style={{flex:1,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 10px",display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:28,height:28,borderRadius:6,background:"linear-gradient(135deg,#e0475b,#ff6b81)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:800,flexShrink:0}}>PDF</div>
                          <div>
                            <div style={{fontSize:10,fontWeight:700,color:"var(--heading)",lineHeight:1.3}}>{f.name}</div>
                            <div style={{fontSize:9,color:"var(--sub)"}}>{f.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider"/>

          {/* Phase 2 */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#3b6ff510",color:"#3b6ff5"}}>Phase 2 — 評価</div>
              <div className="phase-h">見込み度を自動判定して振り分け</div>
              <div className="phase-desc">ページ閲覧、チャットの内容、訪問パターンをリアルタイムで点数化。商談に値する訪問者だけがカレンダー予約に進めます。</div>
              <div className="phase-features">
                {phases[2].cards.map((c,i)=><div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#3b6ff5"}}/>{c.t}</div>)}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div className="vis2-label" style={{top:32}}>料金ページ閲覧</div>
                <div className="vis2-bar" style={{top:50,background:"linear-gradient(90deg,#3b6ff5,#7c9dfa)","--sw":"55%",animationDelay:".3s"}}/>
                <div className="vis2-label" style={{top:76}}>デモ依頼</div>
                <div className="vis2-bar" style={{top:94,background:"linear-gradient(90deg,#12a37d,#4dd9b4)","--sw":"70%",animationDelay:".6s"}}/>
                <div className="vis2-label" style={{top:120}}>7日で3回訪問</div>
                <div className="vis2-bar" style={{top:138,background:"linear-gradient(90deg,#7c5cfc,#b49dff)","--sw":"65%",animationDelay:".9s"}}/>
                <div className="vis2-badge" style={{top:30,background:"#12a37d12",color:"var(--cta)",border:"1px solid rgba(18,163,125,.2)",animationDelay:"1.4s"}}>⚡ High: 85点</div>
                <div style={{position:"absolute",bottom:28,left:40,right:40,background:"#fff",border:"1px solid var(--border)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",animation:"slideIn .6s 1.8s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <span style={{fontSize:12,fontWeight:700,color:"var(--heading)"}}>📅 商談予約に進む</span>
                  <span style={{fontSize:11,fontWeight:700,color:"var(--cta)"}}>→</span>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider"/>

          {/* Phase 3 */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{background:"#c026d310",color:"#c026d3"}}>Phase 3 — 育成</div>
              <div className="phase-h">AIがリードを自動で育成</div>
              <div className="phase-desc">リードの状態に応じて、AIが自動でメール配信・チャット再接触・行動トラッキングを組み合わせ、次のステージへ進めます。</div>
              <div className="phase-features">
                {phases[3].cards.map((c,i)=><div className="phase-feat" key={i}><div className="phase-feat-dot" style={{background:"#c026d3"}}/>{c.t}</div>)}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                {/* AI Nurturing Engine header */}
                <div style={{position:"absolute",top:12,left:0,right:0,textAlign:"center",animation:"nodeGrow .5s .2s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                  <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"#f0ecfe",border:"1px solid #c9bef5",borderRadius:10,padding:"5px 14px",fontSize:11,fontWeight:800,color:"#7c5cfc"}}>🤖 AI ナーチャリングエンジン</span>
                </div>

                {/* Stage flow: 3 columns */}
                <div style={{position:"absolute",top:52,left:16,right:16,display:"flex",alignItems:"flex-start",gap:6}}>
                  {/* Soft Lead */}
                  <div style={{flex:1,animation:"nodeGrow .5s .5s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                    <div style={{background:"#e5f8f2",border:"1px solid #b8e6d8",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                      <div style={{fontSize:10,fontWeight:800,color:"#12a37d",marginBottom:4}}>Soft Lead</div>
                      <div style={{fontSize:9,color:"var(--sub)",lineHeight:1.4,marginBottom:6}}>メールのみ</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {["✉️ 資料送付","✉️ 事例メール","✉️ フォーム誘導"].map((s,i)=>(
                          <div key={i} style={{background:"#fff",borderRadius:6,padding:"4px 6px",fontSize:9,fontWeight:600,color:"var(--heading)",textAlign:"left",border:"1px solid #d4ede4"}}>{s}</div>
                        ))}
                      </div>
                    </div>
                    <div style={{textAlign:"center",fontSize:9,fontWeight:700,color:"#12a37d",marginTop:4}}>目標: フォーム入力</div>
                  </div>

                  {/* Arrow */}
                  <div style={{display:"flex",alignItems:"center",paddingTop:40,animation:"slideIn .4s .9s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                    <span style={{fontFamily:"var(--fm)",fontSize:14,color:"var(--border2)"}}>→</span>
                  </div>

                  {/* Hard Lead */}
                  <div style={{flex:1,animation:"nodeGrow .5s .8s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                    <div style={{background:"#eaf0fe",border:"1px solid #bcc8f5",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                      <div style={{fontSize:10,fontWeight:800,color:"#3b6ff5",marginBottom:4}}>Hard Lead</div>
                      <div style={{fontSize:9,color:"var(--sub)",lineHeight:1.4,marginBottom:6}}>詳細情報あり</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {["✉️ ROIデータ","✉️ 業界事例","💬 チャット再接触"].map((s,i)=>(
                          <div key={i} style={{background:"#fff",borderRadius:6,padding:"4px 6px",fontSize:9,fontWeight:600,color:"var(--heading)",textAlign:"left",border:"1px solid #d4daf5"}}>{s}</div>
                        ))}
                      </div>
                    </div>
                    <div style={{textAlign:"center",fontSize:9,fontWeight:700,color:"#3b6ff5",marginTop:4}}>目標: 商談予約</div>
                  </div>

                  {/* Arrow */}
                  <div style={{display:"flex",alignItems:"center",paddingTop:40,animation:"slideIn .4s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                    <span style={{fontFamily:"var(--fm)",fontSize:14,color:"var(--border2)"}}>→</span>
                  </div>

                  {/* Qualified */}
                  <div style={{flex:1,animation:"nodeGrow .5s 1.1s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
                    <div style={{background:"#f0ecfe",border:"1px solid #c9bef5",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                      <div style={{fontSize:10,fontWeight:800,color:"#7c5cfc",marginBottom:4}}>Qualified</div>
                      <div style={{fontSize:9,color:"var(--sub)",lineHeight:1.4,marginBottom:6}}>商談予約済み</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {["✉️ 確認メール","📄 事前資料","⏰ リマインダー"].map((s,i)=>(
                          <div key={i} style={{background:"#fff",borderRadius:6,padding:"4px 6px",fontSize:9,fontWeight:600,color:"var(--heading)",textAlign:"left",border:"1px solid #d8d0f5"}}>{s}</div>
                        ))}
                      </div>
                    </div>
                    <div style={{textAlign:"center",fontSize:9,fontWeight:700,color:"#7c5cfc",marginTop:4}}>目標: 商談成功</div>
                  </div>
                </div>

                {/* Signal bar at bottom */}
                <div style={{position:"absolute",bottom:14,left:16,right:16,background:"#fff",border:"1px solid var(--border)",borderRadius:10,padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",animation:"slideIn .6s 1.6s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:12}}>👁</span>
                    <span style={{fontSize:10,fontWeight:700,color:"var(--heading)"}}>行動シグナルで自動加速</span>
                  </div>
                  <span style={{fontSize:9,fontWeight:600,color:"var(--sub)"}}>料金ページ再訪 → メール前倒し</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>選ばれる理由</div>
          <div className="stitle" style={{textAlign:"center"}}>なぜ Meeton ai なのか</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>従来のチャットボットやフォームとは根本的に異なるアプローチ。</p>
          <div className="why-grid">{whyData.map((w,i)=>(<div className="why-card" key={i}><div className="why-icon">{w.icon}</div><div className="why-title">{w.title}</div><div className="why-desc">{w.desc}</div></div>))}</div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section" style={{background:"var(--surface)"}}>
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
                        <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--sub)",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:6,padding:"6px 10px",whiteSpace:"nowrap",fontWeight:600}}>&lt;script src="meeton.js"&gt;</div>
                        <div style={{fontSize:18,animation:"pulse 2s infinite"}}>✅</div>
                      </div>
                    )}
                    {i===1&&(
                      <div style={{background:"var(--surface)",borderRadius:10,padding:"12px 14px",display:"flex",flexDirection:"column",gap:6}}>
                        {["💬 声かけ内容","📅 予約ルール","🎯 見込み基準"].map((item,j)=>(
                          <div key={j} style={{display:"flex",alignItems:"center",gap:8,fontSize:11,fontWeight:700,color:"var(--heading)"}}>
                            <span>{item}</span>
                            <div style={{flex:1,height:6,background:"var(--bg)",borderRadius:3,overflow:"hidden",border:"1px solid var(--border)"}}>
                              <div style={{height:"100%",borderRadius:3,background:`linear-gradient(90deg,var(--cta),var(--accent))`,width:j===0?"90%":j===1?"60%":"40%",transition:"width 1s"}}/>
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
                        <div style={{fontSize:10,fontWeight:700,color:"var(--cta)",lineHeight:1.4}}>獲得・評価・育成<br/>自動で稼働開始</div>
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
      <section className="section">
        <div className="section-inner">
          <div className="slabel" style={{textAlign:"center"}}>導入事例</div>
          <div className="stitle" style={{textAlign:"center"}}>お客様の成果</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>Meeton ai を導入した企業の実績をご紹介します。</p>
          <CaseCarousel/>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="section" id="integrations" style={{background:"var(--surface)",position:"relative"}}>
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="section-inner" style={{position:"relative",zIndex:2}}>
          <div className="slabel" style={{textAlign:"center"}}>ツール連携</div>
          <div className="stitle" style={{textAlign:"center"}}>主要ツールとシームレスに連携</div>
          <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>既存のビジネスツールとかんたんに統合し、すぐに使い始められます。</p>
          <div className="int-grid">
            {integrations.map((t,i)=>(
              <div className="int-card" key={i}>
                <div className="int-icon">{t.icon}</div>
                <div className="int-name">{t.name}</div>
                <div className="int-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
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
      <section className="section" style={{textAlign:"center",background:"var(--surface)"}}>
        <div className="section-inner">
          <div className="slabel">導入企業</div>
          <div className="stitle">先進企業に選ばれています</div>
          <div style={{height:36}}/>
          <div className="client-logos">{clients.map(c=><div className="client-logo" key={c}>{c}</div>)}</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="dot-grid" style={{opacity:.3}}/>
        <div className="glow" style={{background:"rgba(18,163,125,.15)",width:500,height:500,top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{textAlign:"center"}}>訪問者の99%を<br/>失い続けますか？</div>
          <p className="ssub" style={{textAlign:"center",margin:"16px auto 36px"}}>Meeton ai を数分で導入。コード不要。匿名の訪問者を商談に変えましょう。</p>
          <div style={{display:"flex",gap:14,justifyContent:"center"}}>
            <button className="btn btn-cta btn-cta-lg">資料請求</button>
            <button className="btn-ghost">デモを予約 →</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Meeton<span> ai</span></div>
        <div className="footer-links"><a href="#">プロダクト</a><a href="#">ブログ</a><a href="#">お問い合わせ</a></div>
        <div style={{fontSize:12,color:"#9498b2"}}>© 2025 DynaMeet K.K.</div>
      </footer>
    </div>
  );
}
