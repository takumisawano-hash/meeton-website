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

/* Phase 0 - Proactive Greeting */
.vis0{background:linear-gradient(160deg,#f0fdfa,#f8f9ff)}
.vis0-bubble{position:absolute;padding:10px 16px;border-radius:14px;font-size:12px;font-weight:600;max-width:200px;line-height:1.5;animation:chatPop .5s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.vis0-ai{background:#fff;border:1px solid var(--border);color:var(--heading);border-bottom-left-radius:4px}
.vis0-res{background:linear-gradient(135deg,#e5f8f2,#eaf0fe);border:1px solid rgba(18,163,125,.15);color:var(--cta);font-size:11px;padding:8px 14px;border-radius:10px;cursor:default}

/* Phase 1 - Need Understanding & Resources */
.vis1{background:linear-gradient(160deg,#f0fdfa,#f0fdf9)}

/* Phase 2 - Lead Capture */
.vis2-email{background:linear-gradient(160deg,#f0fdfa,#f0fdf9)}

/* Phase 3 - Meeting Booking */
.vis3-scoring{background:linear-gradient(160deg,#eef2ff,#f8f9ff)}
.vis2-bar{position:absolute;height:10px;border-radius:5px;left:40px;animation:scoreUp 1.2s cubic-bezier(.16,1,.3,1) forwards}
.vis2-label{position:absolute;left:40px;font-size:11px;font-weight:700;color:var(--sub)}
.vis2-badge{position:absolute;right:40px;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:800;animation:slideIn .5s cubic-bezier(.16,1,.3,1) forwards;opacity:0}

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
  .vis2-label{font-size:9px !important;left:20px !important}
  .vis2-bar{left:20px !important}
  .vis2-badge{right:20px !important;font-size:10px !important;padding:4px 10px !important}
  .flow-step{flex:0 0 100%}
  .flow-num{width:48px;height:48px;font-size:18px}
}
`;

const faqData = [
  { q: 'AIチャットボットはどのように訪問者に話しかけますか？', a: 'Meeton aiのチャットボットは、訪問者が閲覧しているページの内容や行動パターンを分析し、最適なタイミングで自動的に声をかけます。料金ページなら「プランについてご質問ありますか？」、ブログなら「詳しい資料をお送りしましょうか？」のように、文脈に合わせた自然な挨拶を行います。' },
  { q: 'シナリオの設計は必要ですか？', a: 'いいえ、従来のチャットボットのようなシナリオ分岐の設計は一切不要です。AIが訪問者の質問や行動に応じて自律的に最適な対応を判断します。初期設定（声かけ内容、商談予約ルール、資料の登録）を行うだけで稼働を開始できます。' },
  { q: 'どのようにリード情報を取得しますか？', a: 'チャットの会話の流れの中で自然にメールアドレスを取得します。チャット画面下部に専用の入力フィールドがあり、リアルタイムバリデーションとオートコンプリートに対応。入力された瞬間にCRMへ自動登録されるため、ブラウザが閉じてもデータは安全です。' },
  { q: '商談予約はどのように行われますか？', a: '訪問者の行動（ページ閲覧、チャット内容、訪問回数）をリアルタイムでスコアリングし、設定した基準を満たした訪問者にのみカレンダーを表示して商談予約を促します。Google CalendarやTimeRexなど主要な日程調整ツールと連携しています。' },
  { q: '導入にどのくらい時間がかかりますか？', a: 'JavaScriptタグの設置は約5分です。AIの声かけ内容や商談予約ルールの設定を含めても、最短で当日中に稼働開始できます。開発リソースは不要です。' },
];

const whyData = [
  { title: 'シナリオ設計不要', desc: 'AIが自律稼働し、訪問者の行動・文脈に応じて最適な対応を自動判断。従来のチャットボットのような分岐設計の手間はゼロ。', color: '#7c5cfc', iconPath: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 18h6M10 22h4' },
  { title: '能動型、待ちじゃない', desc: '訪問者が話しかけるのを待つのではなく、AIがページ内容・行動パターンを読み取り、最適なタイミングで自ら声をかけます。', color: '#0891b2', iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { title: '自然な会話でリード獲得', desc: 'フォームではなくチャットの流れの中で自然にメールアドレスを取得。訪問者体験を損なわずにリード獲得率を最大化。', color: '#12a37d', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { title: '5分で導入', desc: 'WebサイトにJavaScriptタグを1行追加するだけ。コード不要、開発リソース不要。最短当日から稼働開始。', color: '#3b6ff5', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
];

const flowSteps = [
  { num: '1', title: 'サイト訪問', sub: 'Visitor arrives', color: '#6e7494' },
  { num: '2', title: 'AI声かけ', sub: 'Proactive greeting', color: '#0891b2' },
  { num: '3', title: 'ニーズ把握\n& 資料提案', sub: 'Need understanding', color: '#12a37d' },
  { num: '4', title: 'リード獲得\n& 予約誘導', sub: 'Lead capture', color: '#3b6ff5' },
  { num: '5', title: '商談確定', sub: 'Meeting confirmed', color: '#7c5cfc' },
];

const flowStepIcons = [
  <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>,
  <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></>,
];

export default function ChatbotPageClient() {
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
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />CORE ENGINE</div>
            <h1 className="anim d2">AIチャットで<br /><em>訪問者を商談に変える</em></h1>
            <p className="anim d3 hero-sub">Webサイトに訪れたすべての訪問者にAIが自ら話しかけ、会話の流れでニーズを把握し、リードを獲得。商談予約まで完全自動化します。</p>
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
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>Meeton ai</div>
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
          <div className="stitle" style={{ textAlign: 'center' }}>訪問から商談まで、5つのステップ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>AIチャットボットが訪問者を自動で商談へ導く、エンドツーエンドのプロセス。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>各ステップを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>AIチャットボットがどのように訪問者を商談まで導くか、ステップごとに解説します。</p>
        </div>
      </section>

      {/* Phase 1: Proactive Greeting */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>STEP 01</div>
              <div className="phase-h">ページに合わせてAIが自ら話しかける</div>
              <div className="phase-desc">訪問者が閲覧しているページの内容や滞在時間を分析し、最適なタイミングでAIが自動的に声をかけます。料金ページ、製品ページ、ブログ記事など、コンテキストに応じた自然な挨拶で会話を開始。従来の「何かお困りですか？」という画一的な声かけとは根本的に異なります。</div>
              <div className="phase-features">
                {['ページ文脈対応', '最適タイミング判定', '資料カード表示', '「すぐ話したい」への即対応'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
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
                <div className="vis0-bubble vis0-ai" style={{ top: 42, left: 20, animationDelay: '.4s' }}>こんにちは！<br />プランについてご質問ありますか？</div>
                <div className="vis0-bubble vis0-ai" style={{ top: 108, left: 20, animationDelay: '1s', fontSize: 11, color: 'var(--sub)' }}>こちらの資料もおすすめです：</div>
                <div className="vis0-bubble vis0-res" style={{ top: 148, left: 20, animationDelay: '1.4s', maxWidth: 145 }}>📄 導入ガイド（PDF）</div>
                <div className="vis0-bubble vis0-res" style={{ top: 148, left: 175, animationDelay: '1.7s', maxWidth: 145 }}>📊 料金比較表</div>
                <div className="vis0-bubble" style={{ top: 200, right: 20, animationDelay: '2.2s', background: 'var(--cta)', color: '#fff', borderBottomRightRadius: 4 }}>料金について詳しく知りたいです</div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 2: Need Understanding & Resource Suggestion */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>STEP 02</div>
              <div className="phase-h">会話からニーズを把握し最適な資料を提案</div>
              <div className="phase-desc">AIが自然な会話を通じて訪問者のニーズを理解し、登録されている資料の中から最も適切なものを自動で選定・提案します。チャット内で即時ダウンロードが可能なため、訪問者を待たせません。ダウンロードセンターとも連携し、すべての資料がリード獲得の導線になります。</div>
              <div className="phase-features">
                {['自然な会話でニーズ把握', '最適な資料をAIが選定', 'チャット内で即時ダウンロード', 'ダウンロードセンター連携'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div className="vis0-bubble vis0-ai" style={{ top: 12, left: 16, animationDelay: '.2s' }}>どのような課題をお持ちですか？</div>
                <div className="vis0-bubble" style={{ top: 62, right: 16, animationDelay: '.7s', background: 'var(--cta)', color: '#fff', borderBottomRightRadius: 4 }}>リード獲得を効率化したいです</div>
                <div className="vis0-bubble vis0-ai" style={{ top: 116, left: 16, animationDelay: '1.2s', fontSize: 11 }}>それなら、こちらの資料がおすすめです：</div>
                <div style={{ position: 'absolute', top: 152, left: 16, right: 16, animation: 'slideIn .6s 1.6s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[{ name: 'リード獲得ガイド.pdf', size: '3.2 MB', match: '98%' }, { name: '導入事例集.pdf', size: '2.1 MB', match: '92%' }].map((f, j) => (
                      <div key={j} style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px', transition: 'all .2s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#e0475b,#ff6b81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 800, flexShrink: 0 }}>PDF</div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)', lineHeight: 1.3 }}>{f.name}</div>
                            <div style={{ fontSize: 9, color: 'var(--sub)' }}>{f.size}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--cta)' }}>AI推奨度 {f.match}</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--blue)', background: 'var(--blue-light)', padding: '2px 6px', borderRadius: 4 }}>DL</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 3: Lead Capture */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>STEP 03</div>
              <div className="phase-h">チャットの流れで自然にリード獲得</div>
              <div className="phase-desc">資料のダウンロードや詳しい情報の提供をきっかけに、チャット画面内で自然にメールアドレスを取得します。専用の入力フィールドはリアルタイムバリデーションとオートコンプリートに対応。入力された瞬間にCRMへ自動登録されるため、ブラウザが閉じてもデータは安全です。</div>
              <div className="phase-features">
                {['チャット内メール入力', 'CRM即時登録', 'リアルタイムバリデーション', 'ブラウザが落ちてもデータ安全'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2-email">
                <div className="vis0-bubble vis0-ai" style={{ top: 16, left: 20, animationDelay: '.3s' }}>資料をお送りしますね！<br />メールアドレスを教えてください 📧</div>
                <div style={{ position: 'absolute', top: 82, left: 20, right: 20, padding: '10px 14px', borderRadius: 10, border: '2px solid var(--cta)', background: '#fff', fontSize: 13, color: 'var(--heading)', fontWeight: 600, fontFamily: 'var(--fb)', animation: 'emailPulse 2s infinite', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>tanaka@example.co.jp</span>
                  <span style={{ background: 'var(--cta)', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>送信</span>
                </div>
                <div style={{ position: 'absolute', top: 128, left: 20, display: 'flex', alignItems: 'center', gap: 4, animation: 'slideIn .6s .6s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <span style={{ fontSize: 10, color: 'var(--cta)', fontWeight: 600 }}>✓ メール形式OK</span>
                </div>
                <div style={{ position: 'absolute', top: 152, right: 20, background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 12px', fontSize: 11, fontWeight: 700, color: 'var(--cta)', animation: 'slideIn .6s .9s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cta)', animation: 'pulse 1.5s infinite' }} />CRMへ即時登録
                </div>
                <div style={{ position: 'absolute', top: 188, left: 20, right: 20, animation: 'slideIn .6s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)', marginBottom: 8 }}>📎 ご希望の資料はこちらです：</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[{ name: 'リード獲得ガイド.pdf', size: '3.2 MB' }, { name: '導入事例集.pdf', size: '2.1 MB' }].map((f, j) => (
                        <div key={j} style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#e0475b,#ff6b81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 800, flexShrink: 0 }}>PDF</div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--heading)', lineHeight: 1.3 }}>{f.name}</div>
                            <div style={{ fontSize: 9, color: 'var(--sub)' }}>{f.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Phase 4: Meeting Booking */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>STEP 04</div>
              <div className="phase-h">資料DLなどの関心に応じてすぐに商談を打診</div>
              <div className="phase-desc">資料のダウンロードやチャットでの質問など、温度感が高い行動をAIが検知。条件を満たした訪問者にはチャット内でそのまま商談予約を促し、カレンダー振り分けまで自動で完結します。</div>
              <div className="phase-features">
                {['温度感の高い行動を即検知', '条件に基づく自動カレンダー振り分け', 'チャット内で商談予約まで完結', '確認メール・リマインダー自動化'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3-scoring">
                <div className="vis2-label" style={{ top: 24 }}>ページ閲覧スコア</div>
                <div className="vis2-bar" style={{ top: 42, background: 'linear-gradient(90deg,#3b6ff5,#7c9dfa)', '--sw': '55%', animationDelay: '.3s' } as React.CSSProperties} />
                <div className="vis2-label" style={{ top: 66 }}>チャット内容スコア</div>
                <div className="vis2-bar" style={{ top: 84, background: 'linear-gradient(90deg,#12a37d,#4dd9b4)', '--sw': '70%', animationDelay: '.6s' } as React.CSSProperties} />
                <div className="vis2-label" style={{ top: 108 }}>訪問パターンスコア</div>
                <div className="vis2-bar" style={{ top: 126, background: 'linear-gradient(90deg,#7c5cfc,#b49dff)', '--sw': '65%', animationDelay: '.9s' } as React.CSSProperties} />
                <div className="vis2-badge" style={{ top: 24, background: '#12a37d12', color: 'var(--cta)', border: '1px solid rgba(18,163,125,.2)', animationDelay: '1.4s' }}>⚡ High: 85点</div>
                <div style={{ position: 'absolute', bottom: 56, left: 24, right: 24, animation: 'slideIn .6s 1.8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--heading)' }}>📅 商談予約</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)', background: 'var(--cta-light)', padding: '3px 8px', borderRadius: 6 }}>カレンダー表示</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {['10:00', '14:00', '16:00'].map((time, j) => (
                        <div key={j} style={{ flex: 1, background: j === 1 ? 'var(--cta)' : 'var(--surface)', borderRadius: 6, padding: '6px 4px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: j === 1 ? '#fff' : 'var(--heading)', border: j === 1 ? 'none' : '1px solid var(--border)' }}>{time}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 18, left: 24, right: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', animation: 'slideIn .6s 2.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>✉️</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>確認メール送信済み</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>⏰</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>リマインダー設定済み</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai のチャットボットなのか</div>
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
          <div className="stitle" style={{ textAlign: 'center' }}>Webサイト訪問者を<br />商談に変えませんか？</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>AIチャットボットを数分で導入。コード不要、シナリオ設計不要。訪問者への声かけからリード獲得、商談予約までを完全自動化。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-chatbot" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-chatbot" />
    </div>
  );
}
