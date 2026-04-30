'use client'

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import HubSpotModal from "./HubSpotModal";
import HubSpotMeetingModal from "./HubSpotMeetingModal";
import MidPageCta from "./MidPageCta";

const css = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --cyan:#0891b2;--green:#12a37d;--pink:#d03ea1;--red:#e0475b;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;--fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',var(--font-mono),monospace;
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(18,163,125,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.btn-cta-lg{padding:18px 40px;font-size:18px;box-shadow:0 6px 28px var(--cta-glow)}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 38px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.85;color:var(--sub);max-width:660px}

/* HERO - Split Layout */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f0ecfe 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,64px);position:relative;z-index:2}
.hero-text{flex:1.2;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,5vw,62px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2px;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:clamp(24px,4vw,48px);margin-top:clamp(32px,5vw,48px);padding-top:clamp(24px,4vw,36px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Chat Visual */
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(18,163,125,.4)}70%{box-shadow:0 0 0 12px rgba(18,163,125,0)}100%{box-shadow:0 0 0 0 rgba(18,163,125,0)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}

.dash{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#edfcf7,#f5f3ff)}

/* PHASE ROWS */
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

.vis0{background:linear-gradient(160deg,#edfcf7,#f0f9ff)}
.vis1{background:linear-gradient(160deg,#edfcf7,#f5f3ff)}
.vis2{background:linear-gradient(160deg,#eaf0fe,#edfcf7)}
.vis3{background:linear-gradient(160deg,#ecfeff,#edfcf7)}

/* FLOW STEPS */
.flow-section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px);background:var(--surface);position:relative;overflow:hidden}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0}
.flow-num{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:20px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 4px 16px rgba(0,0,0,.1)}
.flow-icon{font-size:24px;margin-bottom:8px}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500}
.flow-arrow{display:flex;align-items:center;padding-top:20px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:28px;left:calc(50% + 28px);width:calc(100% - 56px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1}
.flow-step:last-child .flow-connector{display:none}

/* USE CASES */
.usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
.usecase-card{background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:28px;transition:all .35s;position:relative;overflow:hidden}
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1);border-color:transparent}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.1)}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--cta),var(--accent));opacity:0;transition:opacity .3s}
.why-card:hover::before{opacity:1}
.why-icon{margin-bottom:16px}
.why-title{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:10px}
.why-desc{font-size:15px;line-height:1.75;color:var(--sub)}

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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f0ecfe 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-text{text-align:center}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center}
  .dash{max-width:360px}
  .phase-row{flex-direction:column;gap:40px}
  .phase-row.reverse{flex-direction:column}
  .why-grid{grid-template-columns:repeat(2,1fr)}
  .usecase-grid{grid-template-columns:repeat(2,1fr)}
  .flow-steps{flex-wrap:wrap;gap:20px;justify-content:center}
  .flow-step{flex:0 0 calc(33.33% - 14px);min-width:120px}
  .flow-connector{display:none}
  .flow-arrow{display:none}
}
@media(max-width:768px){
  .hero{padding:90px 20px 50px;min-height:auto}
  .hero-badge{padding:7px 16px;margin-bottom:20px}
  .hero-ctas{flex-direction:column;align-items:stretch;width:100%;max-width:300px;margin:0 auto}
  .hero-stats{flex-direction:row;gap:24px;justify-content:center}
  .dash{max-width:320px}
  .why-grid{grid-template-columns:1fr}
  .usecase-grid{grid-template-columns:1fr}
  .pvis{max-width:100%;aspect-ratio:1/1.2;min-height:380px}
  .final-cta{padding:60px 20px 80px}
  .btn-cta-lg{padding:14px 24px;font-size:16px;width:100%}
  .btn-ghost{padding:14px 24px;font-size:16px;width:100%}
  .phase-features{gap:8px}
  .phase-feat{font-size:13px}
  .why-card{padding:22px}
  .faq-q{padding:16px 20px;font-size:16px}
  .faq-a{padding:0 20px 16px;font-size:14px}
  .flow-step{flex:0 0 calc(50% - 10px)}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .dash{max-width:100%}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .flow-step{flex:0 0 100%}
  .flow-num{width:48px;height:48px;font-size:18px}
}
`;

const faqData = [
  { q: 'AIチャットの設定にどのくらい時間がかかりますか？', a: 'JavaScriptタグの設置は約5分です。AIはナレッジベースを自動学習するため、シナリオ設計は不要。設置直後から自律的に最適な対応を開始します。' },
  { q: '既存のチャットボットとの違いは何ですか？', a: '従来のチャットボットはルール分岐やシナリオ設計が必要で、想定外の質問に対応できません。Meeton aiのAIチャットは文脈を理解し、自律的に最適な回答を生成。商談予約まで会話内で完結します。' },
  { q: 'どの言語に対応していますか？', a: '日本語・英語・中国語・韓国語をはじめ、主要な言語に対応しています。多言語のサイトでもそのままご利用いただけます。' },
  { q: 'CRMとの連携は可能ですか？', a: 'HubSpot、Salesforceとネイティブ連携しています。チャットで取得したリード情報はリアルタイムでCRMに自動登録されます。Webhookによる他ツールとの連携も可能です。' },
  { q: '無料トライアルはありますか？', a: '14日間の無料トライアルをご用意しています。クレジットカード不要で、全機能をお試しいただけます。' },
];

const whyData = [
  { title: 'シナリオ不要', desc: 'ルールベースのチャットボットとは根本的に異なります。AIが文脈を理解し、最適な対応を自律的に判断。', color: '#12a37d', iconPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z M12 6v6l4 2' },
  { title: '即時レスポンス', desc: '24時間365日、5秒以内に初回アプローチ。深夜・週末のリードも逃しません。', color: '#7c5cfc', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: 'フルファネル対応', desc: '声かけから資料提案、商談予約まで一気通貫。チャット内ですべて完結します。', color: '#3b6ff5', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { title: '5分で導入', desc: 'JavaScriptタグ1行でAIチャットが稼働。開発リソース不要。', color: '#0891b2', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

const flowSteps = [
  { num: '1', title: '訪問者が来訪', sub: 'Visitor arrives', color: '#6e7494' },
  { num: '2', title: 'AIが声かけ', sub: 'Auto greeting', color: '#12a37d' },
  { num: '3', title: '会話でニーズ把握', sub: 'Needs discovery', color: '#0fc19a' },
  { num: '4', title: '資料提案', sub: 'Resource offer', color: '#7c5cfc' },
  { num: '5', title: '商談予約', sub: 'Meeting booked', color: '#3b6ff5' },
];

const flowStepIcons = [
  <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>,
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/>,
  <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></>,
];

const useCases = [
  { title: '高関心リード', color: '#12a37d', desc: '料金ページを閲覧中の訪問者を検知し、すぐに声かけ。関心が高いうちにカレンダーを提示して商談を獲得します。', msg: 'こんにちは！料金ページをご覧いただきありがとうございます。プランについてご質問はありますか？' },
  { title: 'ターゲットアカウント', color: '#7c5cfc', desc: 'CRM連携で重点企業の訪問を即座に検知。企業名入りのパーソナライズメッセージで会話を開始します。', msg: 'ようこそ、{会社名}様！以前ウェビナーにご参加いただきましたね。' },
  { title: 'リピート訪問者', color: '#3b6ff5', desc: '過去の閲覧履歴やチャット履歴を踏まえた声かけ。前回の続きからスムーズに会話を再開します。', msg: 'お帰りなさい！前回お話した導入事例、お役に立ちましたか？' },
];

export default function AiChatPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Nav variant="light" />

      {/* HERO - Split Layout */}
      <section className="hero">
        <div className="dot-grid" />
        <div className="glow" style={{ background: 'rgba(18,163,125,.2)', width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: 'rgba(124,92,252,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />AI CHAT</div>
            <h1 className="anim d2">AIが対話し、<br /><em>商談予約まで完結</em></h1>
            <p className="anim d3 hero-sub">シナリオ設計は不要。Meeton aiが訪問者と自律的に会話し、ニーズを把握、資料提案、商談予約までチャット内で完結します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '即時', l: '初回アプローチ' }, { v: '40%+', l: '商談化率' }, { v: '24/7', l: '自律稼働' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>AI チャット</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#12a37d', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>オンライン</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* AI message 1 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s .6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#e5f8f2', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    こんにちは！料金ページをご覧いただきありがとうございます。プランについてご質問はありますか？
                  </div>
                </div>
                {/* Visitor message */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.0s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: 'var(--surface)', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', maxWidth: '75%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    プランについて質問があるのですが
                  </div>
                </div>
                {/* AI message 2 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', opacity: 0, animation: 'chatPop .5s 1.4s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div style={{ background: '#e5f8f2', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '80%', fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.6 }}>
                    御社の規模ですとスタンダードプランが最適です！右のカレンダーからご予約ください
                  </div>
                </div>
                {/* Calendar confirmation badge */}
                <div style={{ display: 'flex', justifyContent: 'center', opacity: 0, animation: 'chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <div style={{ background: '#e5f8f2', border: '1px solid #12a37d30', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13 }}>✓</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#12a37d' }}>14:00 で商談確定</span>
                  </div>
                </div>
              </div>
              {/* Summary bar */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>AI応答中</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)' }}>商談予約完了 →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STEP FLOW */}
      <section className="flow-section">
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1140, margin: '0 auto' }}>
          <div className="slabel" style={{ textAlign: 'center' }}>パイプライン</div>
          <div className="stitle" style={{ textAlign: 'center' }}>AIチャットの流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>訪問者の来訪から商談予約まで、AIがすべて自律的に対応します。</p>
          <div className="flow-steps">
            {flowSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                <div className="flow-step">
                  <div className="flow-connector" style={{ background: `linear-gradient(90deg, ${step.color}40, ${flowSteps[Math.min(i + 1, 4)].color}40)` }} />
                  <div className="flow-num" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}>{step.num}</div>
                  <div style={{width:28,height:28,margin:'0 auto 8px'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {flowStepIcons[i]}
                    </svg>
                  </div>
                  <div className="flow-title" style={{ whiteSpace: 'pre-line' }}>{step.title}</div>
                  <div className="flow-sub">{step.sub}</div>
                </div>
                {i < 4 && <div className="flow-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE DETAILS */}
      <section className="section" style={{ position: 'relative', paddingBottom: 0 }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>機能詳細</div>
          <div className="stitle" style={{ textAlign: 'center' }}>AIチャットの仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>訪問者への声かけから商談予約まで、AIチャットがどのように機能するかをステップごとに解説します。</p>
        </div>
      </section>

      {/* Feature 1: Context-aware greeting */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>FEATURE 01</div>
              <div className="phase-h">ページ文脈に応じた自動声かけ</div>
              <div className="phase-desc">料金ページなら料金の質問、事例ページなら導入事例の深掘り。訪問者が見ているページの文脈を理解し、最適な声かけを自動で行います。シナリオ設計は不要です。</div>
              <div className="phase-features">
                {['ページ内容を自動解析', '文脈に合った声かけメッセージ', '訪問者ごとにパーソナライズ', 'シナリオ設計・ルール分岐不要'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>ページ別声かけ</span>
                  </div>
                  {[
                    { page: '料金ページ', msg: 'プランについてご質問はありますか？', icon: '💰', bg: '#e5f8f2', border: '#12a37d' },
                    { page: '事例ページ', msg: '導入事例の詳細をご案内しましょうか？', icon: '📋', bg: '#f0ecfe', border: '#7c5cfc' },
                    { page: '機能ページ', msg: 'お探しの機能はございますか？', icon: '⚙️', bg: '#eaf0fe', border: '#3b6ff5' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${item.border}20`, borderRadius: 12, padding: 12, marginBottom: 8, opacity: 0, animation: `slideIn .5s ${.4 + i * .3}s cubic-bezier(.16,1,.3,1) forwards` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: item.border }}>{item.page}</span>
                      </div>
                      <div style={{ background: item.bg, borderRadius: 8, padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                        {item.msg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: Needs discovery & resource suggestion */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>FEATURE 02</div>
              <div className="phase-h">会話からニーズ把握&資料提案</div>
              <div className="phase-desc">訪問者の質問に即座に回答しながら、会話の流れで最適な資料を提示。押し売りではなく、自然な対話の中でリードの関心を深めます。</div>
              <div className="phase-features">
                {['質問への即座の回答', '会話内で最適な資料を提示', 'ナレッジベースから自動生成', '自然な対話でリード育成'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Chat with resource suggestion */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 9, fontWeight: 800, color: 'var(--heading)' }}>U</div>
                    <div style={{ background: 'var(--surface)', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      リード獲得の方法について知りたいです
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#7c5cfc,#9b7fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div style={{ background: '#f0ecfe', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      こちらのガイドが参考になりますよ！
                    </div>
                  </div>
                  {/* Resource card */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginLeft: 30, opacity: 0, animation: 'chatPop .5s 1.1s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#e0475b,#ff6b81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>PDF</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>リード獲得ガイド.pdf</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>マッチ度 98%</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', padding: '3px 8px', borderRadius: 6 }}>リード獲得</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#12a37d', background: '#e5f8f2', padding: '3px 8px', borderRadius: 6 }}>自動提案</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: Lead info capture */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>FEATURE 03</div>
              <div className="phase-h">チャット内でリード情報を獲得</div>
              <div className="phase-desc">自然な会話の中で連絡先・課題・利用ツールをヒアリング。フォーム入力のハードルなく、会話の流れでリード情報を収集しCRMに自動登録します。</div>
              <div className="phase-features">
                {['会話の流れでリード情報を収集', '連絡先・課題・利用ツールを把握', 'フォーム不要で離脱率を削減', 'CRMへ自動登録'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>リード情報カード</span>
                  </div>
                  {/* Collected lead info card */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, opacity: 0, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                    {[
                      { label: '会社名', value: 'ABC株式会社', color: '#3b6ff5' },
                      { label: '担当者名', value: '田中 太郎', color: '#3b6ff5' },
                      { label: 'メール', value: 'tanaka@abc.co.jp', color: '#12a37d' },
                      { label: '課題', value: 'リード獲得の自動化', color: '#7c5cfc' },
                      { label: '利用ツール', value: 'HubSpot', color: '#0891b2' },
                    ].map((field, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', opacity: 0, animation: `slideIn .5s ${.6 + i * .2}s cubic-bezier(.16,1,.3,1) forwards` }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>{field.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: field.color }}>{field.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* CRM sync badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, opacity: 0, animation: 'slideIn .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#3b6ff5' }}>CRMへ自動登録中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Meeting booking */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>FEATURE 04</div>
              <div className="phase-h">温度感に応じて商談予約まで完結</div>
              <div className="phase-desc">高関心リードにはカレンダーを自動表示し、離脱前に予約を獲得。温度感の低いリードには資料提案や育成メールにつなげ、最適な次のアクションをAIが自律判断します。</div>
              <div className="phase-features">
                {['高関心リードに自動でカレンダー表示', 'ページ遷移なしで予約完了', '温度感に応じたアクション判断', '離脱前のタイミングで提案'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  {/* Chat with calendar widget */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10, opacity: 0, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div style={{ background: '#ecfeff', borderRadius: '10px 10px 10px 4px', padding: '8px 12px', fontSize: 10, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5 }}>
                      ぜひデモをご覧ください！ご都合の良い日時をお選びください。
                    </div>
                  </div>
                  {/* Calendar widget */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginLeft: 30, opacity: 0, animation: 'chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      日時を選択
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                      {['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((time, i) => (
                        <div key={i} style={{
                          padding: '6px 0', textAlign: 'center', fontSize: 10, fontWeight: 700, borderRadius: 8,
                          background: time === '14:00' ? '#0891b2' : 'var(--surface)',
                          color: time === '14:00' ? '#fff' : 'var(--heading)',
                          border: time === '14:00' ? 'none' : '1px solid var(--border)',
                          opacity: 0, animation: `badgePop .3s ${.9 + i * .1}s cubic-bezier(.16,1,.3,1) forwards`
                        }}>{time}</div>
                      ))}
                    </div>
                  </div>
                  {/* Confirmation */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, opacity: 0, animation: 'chatPop .5s 1.6s cubic-bezier(.16,1,.3,1) forwards' }}>
                    <div style={{ background: '#e5f8f2', border: '1px solid #12a37d30', borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, animation: 'ringPulse 2s infinite' }}>
                      <span style={{ fontSize: 12 }}>✓</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#12a37d' }}>14:00 で商談確定</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>USE CASES</div>
          <div className="stitle" style={{ textAlign: 'center' }}>AIチャットの活用シーン</div>
          <div className="usecase-grid">
            {useCases.map((uc, i) => (
              <div className="usecase-card" key={i}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: uc.color, borderRadius: '20px 20px 0 0' }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 10 }}>{uc.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 16 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}20`, borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: uc.color }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: uc.color }}>声かけ例</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--heading)', lineHeight: 1.5, fontStyle: 'italic' }}>
                    &ldquo;{uc.msg}&rdquo;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after USE CASES: demo (visualizing real conversations boosts intent) */}
      <MidPageCta
        eyebrow="See it in action"
        heading="実際のチャット動作と AI コンシェルジュの応答品質を、御社の業界に合わせたデモで 15 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={() => setIsMeetingModalOpen(true)}
      />

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>選ばれる理由</div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai のAIチャットなのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>従来のチャットボットとは根本的に異なるアプローチ。</p>
          <div className="why-grid">
            {whyData.map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon" style={{width:48,height:48,borderRadius:12,background:`${w.color}12`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={w.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={w.iconPath}/></svg>
                </div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — after WHY: doc (internal review framing) */}
      <MidPageCta
        eyebrow="For internal review"
        heading="AI チャットの仕様・導入事例・料金プランをまとめた資料を社内検討用にお送りします"
        ctaLabel="資料を請求する"
        variant="doc"
        onClick={() => setIsDocModalOpen(true)}
      />

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <div className="slabel" style={{ textAlign: 'center' }}>よくある質問</div>
          <div className="stitle" style={{ textAlign: 'center' }}>FAQ</div>
          <div style={{ height: 36 }} />
          <div className="faq-list">
            {faqData.map((f, i) => (
              <div className={'faq-item' + (openFaq === i ? ' open' : '')} key={i}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="glow" style={{ background: 'rgba(18,163,125,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>AIチャットで、<br />商談獲得を自動化しよう</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>シナリオ設計不要。AIが訪問者と自律的に会話し、商談予約まで完結します。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-ai-chat" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-ai-chat" />
    </div>
  );
}
