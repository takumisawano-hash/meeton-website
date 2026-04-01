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

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--accent);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px)}
.section-inner{max-width:1140px;margin:0 auto}
.stitle{font-size:clamp(28px,5vw,48px);font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:clamp(15px,2.5vw,19px);line-height:1.85;color:var(--sub);max-width:660px}

/* HERO - Split Layout */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%)}
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
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Chat Window */
@keyframes typingDot{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes msgAppear{0%{opacity:0;transform:translateY(12px) scale(.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
.chat-win{width:100%;max-width:400px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.chat-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f8fffe,#f8f6ff)}
.chat-msg{display:flex;gap:8px;margin-bottom:12px;opacity:0;animation:msgAppear .5s cubic-bezier(.16,1,.3,1) forwards}
.chat-avatar{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--cta),#0fc19a);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:800;flex-shrink:0}
.chat-bubble{background:var(--surface);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;padding:10px 14px;font-size:13px;font-weight:600;color:var(--heading);line-height:1.55;max-width:280px}
.chat-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:10px 12px;margin-top:8px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.03);cursor:default}
.typing-dots{display:flex;gap:4px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:14px;border-top-left-radius:4px;width:fit-content}
.typing-dots span{width:6px;height:6px;border-radius:50%;background:var(--sub);animation:typingDot 1.2s infinite}
.typing-dots span:nth-child(2){animation-delay:.2s}
.typing-dots span:nth-child(3){animation-delay:.4s}

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

@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes emailPulse{0%,100%{box-shadow:0 0 0 0 rgba(18,163,125,.3)}50%{box-shadow:0 0 0 10px rgba(18,163,125,0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}

.vis0{background:linear-gradient(160deg,#f0fdfa,#f8f9ff)}
.vis1{background:linear-gradient(160deg,#edfcf7,#f0fdf9)}
.vis2{background:linear-gradient(160deg,#f0fdfa,#f5f3ff)}

/* FLOW STEPS */
.flow-section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px);background:var(--surface);position:relative;overflow:hidden}
.flow-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;max-width:1140px;margin:0 auto;position:relative}
.flow-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative;padding:0 8px;min-width:0}
.flow-num{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:20px;font-weight:800;color:#fff;margin-bottom:14px;position:relative;z-index:2;box-shadow:0 4px 16px rgba(0,0,0,.1)}
.flow-title{font-size:clamp(12px,1.5vw,15px);font-weight:800;color:var(--heading);line-height:1.3;margin-bottom:4px}
.flow-sub{font-size:clamp(10px,1.2vw,12px);color:var(--sub);line-height:1.4;font-weight:500}
.flow-arrow{display:flex;align-items:center;padding-top:20px;color:var(--border2);font-size:24px;font-family:var(--fm);flex-shrink:0;width:40px;justify-content:center}
.flow-connector{position:absolute;top:28px;left:calc(50% + 28px);width:calc(100% - 56px);height:2px;background:linear-gradient(90deg,var(--border2),var(--cta),var(--border2));z-index:1}
.flow-step:last-child .flow-connector{display:none}

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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
.final-cta-inner{max-width:620px;margin:0 auto;position:relative;z-index:2}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;text-align:center}
  .hero-text{text-align:center}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center}
  .chat-win{max-width:360px}
  .phase-row{flex-direction:column;gap:40px}
  .phase-row.reverse{flex-direction:column}
  .why-grid{grid-template-columns:repeat(2,1fr)}
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
  .chat-win{max-width:320px}
  .chat-bubble{font-size:12px;padding:8px 12px}
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
  .flow-step{flex:0 0 calc(50% - 10px)}
}
@media(max-width:480px){
  .hero{padding:80px 16px 40px}
  .chat-win{max-width:100%}
  .pvis{aspect-ratio:1/1.4;min-height:400px}
  .pvis>div{transform:scale(0.78);transform-origin:top center}
  .vis0-bubble{font-size:10px !important;padding:8px 12px !important;max-width:140px !important}
  .flow-step{flex:0 0 100%}
  .flow-num{width:48px;height:48px;font-size:18px}
}
`;

const faqData = [
  { q: 'AIはどのように訪問者に話しかけますか？', a: '訪問者が閲覧しているページの内容や行動パターンを分析し、最適なタイミングで自動的に声をかけます。料金ページなら「プランについてご質問ありますか？」、ブログなら「詳しい資料をお送りしましょうか？」のように、文脈に合わせた自然な挨拶を行います。' },
  { q: 'メールの自動送信はどのように動きますか？', a: 'リードのスコアや行動履歴に基づいて、AIがパーソナライズされたメールを自動送信します。料金ページを再訪したリードには「プランの比較資料をお送りしますか？」のように、行動シグナルに応じた最適なメッセージを最適なタイミングで送信します。' },
  { q: 'シナリオの設計は必要ですか？', a: 'いいえ、従来のチャットボットのようなシナリオ分岐の設計は一切不要です。AIが訪問者の質問や行動に応じて自律的に最適な対応を判断します。初期設定（声かけ内容、商談予約ルール、資料の登録）を行うだけで稼働を開始できます。' },
  { q: 'フォローアップの頻度はカスタマイズできますか？', a: 'はい。フォローアップの間隔、回数上限、トリガー条件（未反応日数、ページ再訪など）を自由に設定できます。デフォルトでは最適化されたシーケンスが用意されていますので、そのまま運用開始し、後から調整することも可能です。' },
  { q: '導入にどのくらい時間がかかりますか？', a: 'JavaScriptタグの設置は約5分です。AIの声かけ内容やメール設定を含めても、最短で当日中に稼働開始できます。開発リソースは不要です。' },
];

const whyData = [
  { title: 'シナリオ設計不要', desc: 'AIが自律稼働し、訪問者の行動・文脈に応じて最適な対応を自動判断。従来のチャットボットのような分岐設計の手間はゼロ。', color: '#7c5cfc', iconPath: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 18h6M10 22h4' },
  { title: '能動型、待ちじゃない', desc: '訪問者が話しかけるのを待つのではなく、AIがページ内容・行動パターンを読み取り、最適なタイミングで自ら声をかけます。', color: '#0891b2', iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { title: 'マルチチャネル接触', desc: 'チャット・メール・フォローアップの3チャネルを統合。リードの反応状況に応じて最適なチャネルで自動接触します。', color: '#12a37d', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { title: '5分で導入', desc: 'WebサイトにJavaScriptタグを1行追加するだけ。コード不要、開発リソース不要。最短当日から稼働開始。', color: '#3b6ff5', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

const flowSteps = [
  { num: '1', title: 'リード検知', sub: 'From Detect phase', color: '#0891b2' },
  { num: '2', title: 'AIチャット', sub: 'Proactive greeting', color: '#12a37d' },
  { num: '3', title: 'メール送信', sub: 'Personalized email', color: '#0fc19a' },
  { num: '4', title: 'フォローアップ', sub: 'Auto follow-up', color: '#3b6ff5' },
  { num: '5', title: '次のフェーズへ', sub: 'Nurture / Convert', color: '#7c5cfc' },
];

const flowStepIcons = [
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>,
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>,
  <path d="M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14"/>,
  <path d="M5 12h14 M12 5l7 7-7 7"/>,
];

export default function EngagePageClient() {
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
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />PHASE 02 — ENGAGE</div>
            <h1 className="anim d2">AIが自ら話しかけ<br /><em>会話を始める</em></h1>
            <p className="anim d3 hero-sub">チャットやメールでミートンが自ら接触。ページの文脈やリードの行動履歴に合わせてパーソナライズされた会話を展開します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '24/7', l: 'AIが常時対応' }, { v: '2x', l: '商談化率の向上' }, { v: '5min', l: '導入時間' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="chat-win">
              <div className="chat-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,var(--cta),#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>M</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>ミートン</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>オンライン</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '18px 16px 14px' }}>
                {/* Context badge */}
                <div style={{ textAlign: 'center', marginBottom: 14, opacity: 0, animation: 'msgAppear .4s .6s cubic-bezier(.16,1,.3,1) forwards' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cta)' }} />料金ページを閲覧中
                  </span>
                </div>
                {/* AI message 1 */}
                <div className="chat-msg" style={{ animationDelay: '.9s' }}>
                  <div className="chat-avatar">AI</div>
                  <div className="chat-bubble">はじめまして！ 料金プランについてご質問はありますか？</div>
                </div>
                {/* AI message 2 + resource card */}
                <div className="chat-msg" style={{ animationDelay: '1.6s' }}>
                  <div className="chat-avatar">AI</div>
                  <div>
                    <div className="chat-bubble">こちらの資料もお役に立つかもしれません</div>
                    <div className="chat-card">
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#e0475b,#ff6b81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800, flexShrink: 0 }}>PDF</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)' }}>導入ガイド.pdf</div>
                        <div style={{ fontSize: 10, color: 'var(--sub)' }}>3.2 MB</div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)', background: 'var(--cta-light)', padding: '4px 10px', borderRadius: 6 }}>DL</div>
                    </div>
                  </div>
                </div>
                {/* Typing indicator */}
                <div className="chat-msg" style={{ animationDelay: '2.3s' }}>
                  <div className="chat-avatar">AI</div>
                  <div className="typing-dots"><span /><span /><span /></div>
                </div>
              </div>
              {/* Input bar */}
              <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'var(--border2)' }}>メッセージを入力...</div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,var(--cta),#0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', flexShrink: 0 }}>↑</div>
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
          <div className="stitle" style={{ textAlign: 'center' }}>検知からエンゲージメントへ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>検知されたリードに対して、チャット・メール・フォローアップの3チャネルでAIが自動接触します。</p>
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

      {/* PHASE DETAILS */}
      <section className="section" style={{ position: 'relative', paddingBottom: 0 }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>機能詳細</div>
          <div className="stitle" style={{ textAlign: 'center' }}>エンゲージメントを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>AIがどのようにリードに接触し、会話を展開するか、ステップごとに解説します。</p>
        </div>
      </section>

      {/* Phase 1: AI Chat Proactive Greeting */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>STEP 01</div>
              <div className="phase-h">AIチャットで即座に会話を開始</div>
              <div className="phase-desc">訪問者が閲覧しているページの内容や滞在時間を分析し、最適なタイミングでAIが自動的に声をかけます。料金ページ、製品ページ、ブログ記事など、コンテキストに応じた自然な挨拶で会話を開始。シナリオ設計は一切不要です。</div>
              <div className="phase-features">
                {['ページ文脈対応の自然な声かけ', '最適タイミングの自動判定', '資料カードの自動表示', 'チャット内でリード情報を自然に取得'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                {/* Page context indicator */}
                <div style={{ position: 'absolute', top: 12, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, animation: 'chatPop .4s .1s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '5px 10px', fontSize: 10, fontWeight: 700, color: 'var(--sub)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', display: 'inline-block' }} />
                    料金ページを閲覧中
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 42, left: 20, background: '#fff', border: '1px solid var(--border)', borderRadius: 14, borderBottomLeftRadius: 4, padding: '10px 16px', fontSize: 12, fontWeight: 600, maxWidth: 200, lineHeight: 1.5, color: 'var(--heading)', animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>こんにちは！<br />プランについてご質問ありますか？</div>
                <div style={{ position: 'absolute', top: 116, left: 20, background: '#fff', border: '1px solid var(--border)', borderRadius: 14, borderBottomLeftRadius: 4, padding: '8px 14px', fontSize: 11, fontWeight: 600, color: 'var(--sub)', animation: 'chatPop .5s 1s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>こちらの資料もおすすめです：</div>
                <div style={{ position: 'absolute', top: 154, left: 20, background: 'linear-gradient(135deg,#e5f8f2,#eaf0fe)', border: '1px solid rgba(18,163,125,.15)', borderRadius: 10, padding: '8px 14px', fontSize: 11, fontWeight: 700, color: 'var(--cta)', animation: 'chatPop .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, maxWidth: 145, cursor: 'default' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                  導入ガイド
                </div>
                <div style={{ position: 'absolute', top: 154, left: 175, background: 'linear-gradient(135deg,#e5f8f2,#eaf0fe)', border: '1px solid rgba(18,163,125,.15)', borderRadius: 10, padding: '8px 14px', fontSize: 11, fontWeight: 700, color: 'var(--cta)', animation: 'chatPop .5s 1.7s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, maxWidth: 145, cursor: 'default' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  料金比較表
                </div>
                <div style={{ position: 'absolute', top: 210, right: 20, background: 'var(--cta)', color: '#fff', borderRadius: 14, borderBottomRightRadius: 4, padding: '10px 16px', fontSize: 12, fontWeight: 600, animation: 'chatPop .5s 2.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>料金について詳しく知りたいです</div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 2: Personalized Email */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>STEP 02</div>
              <div className="phase-h">パーソナライズドメールを自動送信</div>
              <div className="phase-desc">リードの行動履歴やスコアに基づいて、AIが最適なタイミングでパーソナライズされたメールを自動送信。料金ページを再訪した、資料をDLした、チャットで質問した——行動シグナルに応じたメッセージで反応率を最大化します。</div>
              <div className="phase-features">
                {['行動シグナルに基づく送信トリガー', 'AIによるメール文面の自動生成', 'リードスコア連動の送信タイミング', '開封・クリック率のリアルタイム追跡'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  {/* Email preview */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, animation: 'chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>自動メール送信</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>トリガー: 料金ページ再訪</div>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#12a37d', background: '#e5f8f2', padding: '3px 8px', borderRadius: 6 }}>送信済み</span>
                    </div>
                    <div style={{ background: 'var(--surface)', borderRadius: 8, padding: 10, fontSize: 11, color: 'var(--text)', lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 700, color: 'var(--heading)', marginBottom: 4 }}>田中様</div>
                      先日は料金ページをご覧いただきありがとうございます。御社に最適なプランのご提案資料をお送りします...
                    </div>
                  </div>
                  {/* Trigger badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, animation: 'slideIn .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)' }}>開封率 <span style={{ color: '#12a37d' }}>68%</span></span>
                    </div>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b6ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)' }}>クリック率 <span style={{ color: '#3b6ff5' }}>32%</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 3: Auto Follow-up */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>STEP 03</div>
              <div className="phase-h">未反応リードには自動フォローアップ</div>
              <div className="phase-desc">チャットやメールに反応がないリードに対して、AIが自動でフォローアップを実行。最適な間隔とメッセージで再接触を図り、リードの関心を引き戻します。反応があった時点で即座にライブ会話に切り替えます。</div>
              <div className="phase-features">
                {['未反応の自動検知', '最適間隔でのフォローアップ', 'メッセージの自動パーソナライズ', '反応時のライブ会話切り替え'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  {/* Follow-up sequence timeline */}
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>フォローアップシーケンス</div>
                  {[
                    { day: 'Day 0', action: 'チャット — 初回接触', status: '未反応', statusColor: '#6e7494', statusBg: '#f4f6fb', delay: '.4s' },
                    { day: 'Day 1', action: 'メール — 資料送付', status: '開封済み', statusColor: '#f59e0b', statusBg: '#fffbeb', delay: '.7s' },
                    { day: 'Day 3', action: 'メール — 事例紹介', status: '未開封', statusColor: '#6e7494', statusBg: '#f4f6fb', delay: '1.0s' },
                    { day: 'Day 5', action: 'チャット — 再訪時に再接触', status: '反応あり', statusColor: '#12a37d', statusBg: '#e5f8f2', delay: '1.3s' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, opacity: 0, animation: `slideIn .5s ${item.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                      <div style={{ width: 48, textAlign: 'center' }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--heading)', fontFamily: 'var(--fm)' }}>{item.day}</div>
                      </div>
                      <div style={{ width: 2, height: 36, background: i === 3 ? '#12a37d' : 'var(--border)', borderRadius: 1, flexShrink: 0 }} />
                      <div style={{ flex: 1, background: '#fff', border: `1px solid ${i === 3 ? 'rgba(18,163,125,.3)' : 'var(--border)'}`, borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)', marginBottom: 3 }}>{item.action}</div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: item.statusColor, background: item.statusBg, padding: '2px 6px', borderRadius: 4 }}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                  {/* Success badge */}
                  <div style={{ textAlign: 'center', marginTop: 4, animation: 'chatPop .5s 1.7s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#e5f8f2', border: '1px solid rgba(18,163,125,.2)', borderRadius: 8, padding: '6px 14px', fontSize: 10, fontWeight: 800, color: '#12a37d' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      ライブ会話に切り替え
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>選ばれる理由</div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai のエンゲージメントなのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>待ちの姿勢ではなく、AIが自ら動く。マルチチャネルで逃さない。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>訪問者との会話を<br />AIに任せませんか？</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>チャット・メール・フォローアップ。AIが最適なタイミングで自ら話しかけ、リードとの接点を逃しません。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-engage" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-engage" />
    </div>
  );
}
