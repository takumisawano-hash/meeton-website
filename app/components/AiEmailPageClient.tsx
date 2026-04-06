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
  --cta:#3b6ff5;--cta-hover:#6690fa;--cta-glow:rgba(59,111,245,.25);--cta-light:#eaf0fe;
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

.dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(59,111,245,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:10px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#6690fa);color:#fff;padding:12px 26px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
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
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:130px 48px 90px;background:linear-gradient(165deg,#eaf0fe 0%,#fff 30%,#f0ecfe 60%,#fff 100%)}
.hero-inner{max-width:1200px;width:100%;display:flex;align-items:center;gap:clamp(32px,5vw,64px);position:relative;z-index:2}
.hero-text{flex:1.2;min-width:0}
.hero-visual{flex:1;min-width:0;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(59,111,245,.15);padding:9px 22px;border-radius:24px;margin-bottom:28px;font-size:clamp(13px,3vw,15px);font-weight:700;color:var(--cta);backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:clamp(32px,5vw,62px);font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2px;margin-bottom:22px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(15px,2.5vw,19px);line-height:1.8;color:var(--sub);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-stats{display:flex;gap:clamp(24px,4vw,48px);margin-top:clamp(32px,5vw,48px);padding-top:clamp(24px,4vw,36px);border-top:1px solid var(--border);flex-wrap:wrap}
.stat-v{font-family:var(--fm);font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--heading);background:linear-gradient(135deg,var(--heading),var(--cta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.stat-l{font-size:clamp(12px,1.5vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* Dashboard Visual */
@keyframes rowSlide{0%{opacity:0;transform:translateX(-16px)}100%{opacity:1;transform:translateX(0)}}
@keyframes barGrow{0%{width:0}100%{width:var(--bw)}}
@keyframes badgePop{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}
@keyframes dotBlink{0%,100%{opacity:.3}50%{opacity:1}}
.dash{width:100%;max-width:420px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border);overflow:hidden;animation:fadeUp .8s .4s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.dash-hdr{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#eaf0fe,#f0ecfe)}
.dash-row{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid rgba(223,227,240,.5);opacity:0;animation:rowSlide .5s cubic-bezier(.16,1,.3,1) forwards}

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
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(59,111,245,.4)}70%{box-shadow:0 0 0 12px rgba(59,111,245,0)}100%{box-shadow:0 0 0 0 rgba(59,111,245,0)}}

.vis0{background:linear-gradient(160deg,#eaf0fe,#f0ecfe)}
.vis1{background:linear-gradient(160deg,#f0ecfe,#eaf0fe)}
.vis2{background:linear-gradient(160deg,#e5f8f2,#eaf0fe)}
.vis3{background:linear-gradient(160deg,#ecfeff,#eaf0fe)}

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
.usecase-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(59,111,245,.1);border-color:transparent}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.why-card{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 8px rgba(0,0,0,.03);position:relative;overflow:hidden}
.why-card:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(59,111,245,.1)}
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
.final-cta{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px) clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#eaf0fe 0%,#fff 40%,#f0ecfe 80%,#eaf0fe 100%)}
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
  { q: 'AIメールはどのようなタイミングで送信されますか？', a: 'フォーム送信・資料ダウンロード・チャット終了などのトリガーイベント直後に自動送信されます。また、Day 1→Day 3→Day 5の自動フォローアップシーケンスにより、未反応リードへの再接触も自動で行います。' },
  { q: 'メール文面は自分で作成する必要がありますか？', a: 'いいえ。AIがリードの行動履歴やナレッジベースをもとに、パーソナライズされたメール文面を自動生成します。もちろん、テンプレートやトーンの指定も可能です。' },
  { q: '既存のMAツール（Marketo等）と競合しませんか？', a: '競合ではなく補完関係です。Meeton aiのAIメールはリードの初回フォローと育成に特化しており、MAツールのワークフローと並行して利用できます。Marketo・Eloquaとの連携も可能です。' },
  { q: '送信数に制限はありますか？', a: 'プランにより月間送信数の上限があります。詳細は資料をご請求いただくか、デモでご確認ください。' },
  { q: '配信停止（オプトアウト）は対応していますか？', a: 'はい。すべてのメールに配信停止リンクが自動挿入されます。GDPR・特定電子メール法に準拠した運用が可能です。' },
];

const whyData = [
  { title: '即時フォロー', desc: 'フォーム送信・資料DL直後にAIが自動送信。42時間の遅延をゼロに。', color: '#3b6ff5', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: '個別最適化', desc: '一斉配信ではなく、行動履歴に基づくパーソナライズドメール。', color: '#7c5cfc', iconPath: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z M20 8v6 M23 11h-6' },
  { title: '自動シーケンス', desc: 'Day 1→3→5で自動フォロー。休眠リードも逃さない。', color: '#12a37d', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { title: 'AI応答', desc: 'リードからの返信にも自動で文脈に合った応答を生成。', color: '#0891b2', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
];

const flowSteps = [
  { num: '1', title: 'トリガー検知', sub: 'Trigger detected', color: '#6e7494' },
  { num: '2', title: '即座にフォロー', sub: 'Instant follow-up', color: '#3b6ff5' },
  { num: '3', title: 'パーソナライズ', sub: 'Personalized', color: '#6690fa' },
  { num: '4', title: '自動再接触', sub: 'Auto re-engage', color: '#7c5cfc' },
  { num: '5', title: '商談獲得', sub: 'Meeting booked', color: '#12a37d' },
];

const flowStepIcons = [
  <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"/>,
  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M12.5 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z M20 8v6 M23 11h-6"/>,
  <path d="M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3"/>,
  <><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></>,
];

const useCaseData = [
  {
    title: 'フォーム送信直後',
    color: '#3b6ff5',
    desc: '問い合わせフォーム送信の直後に、AIが即座にパーソナライズドメールを送信。スピードが商談獲得の鍵。',
    example: 'お問い合わせありがとうございます。ご関心のプランについて詳しい資料をお送りしました。',
  },
  {
    title: '資料ダウンロード後',
    color: '#7c5cfc',
    desc: '資料をDLしたリードに対し、関連コンテンツの追加案内や商談予約の提案を自動送信。',
    example: '導入事例集をダウンロードいただきありがとうございます。御社の業界に近い事例をピックアップしました。',
  },
  {
    title: '未予約リードへの追客',
    color: '#12a37d',
    desc: 'チャットやサンクスページで予約しなかったリードに、カレンダーURL付きメールを自動送信。',
    example: '15分で概要をご説明できます。下記からご都合の良い日時をお選びください。',
  },
];

export default function AiEmailPageClient() {
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
        <div className="glow" style={{ background: 'rgba(59,111,245,.2)', width: 600, height: 600, top: -200, right: -100 }} />
        <div className="glow" style={{ background: 'rgba(124,92,252,.1)', width: 500, height: 500, bottom: -150, left: -80 }} />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="anim d1 hero-badge"><div className="hero-badge-dot" />AI EMAIL</div>
            <h1 className="anim d2">AIメールで<br /><em>自動フォロー&商談化</em></h1>
            <p className="anim d3 hero-sub">フォーム送信・資料DL直後にAIが即座にフォローアップ。パーソナライズドメールで育成し、未反応リードも逃さず商談化します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '< 5秒', l: 'フォロー開始' }, { v: 'Day 1-5', l: '自動シーケンス' }, { v: '24/7', l: '自律稼働' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual anim d4">
            <div className="dash">
              <div className="dash-hdr">
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 800 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>フォローアップシーケンス</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>実行中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '6px 0' }}>
                {[
                  { day: 'Day 0', subject: '資料をお送りしました', status: '送信済み ✓', statusColor: '#12a37d', statusBg: '#e5f8f2', delay: '.6s' },
                  { day: 'Day 1', subject: 'ご確認いただけましたか？', status: '開封済み', statusColor: '#3b6ff5', statusBg: '#eaf0fe', delay: '.9s' },
                  { day: 'Day 3', subject: 'よくある質問をまとめました', status: '送信予定', statusColor: '#6e7494', statusBg: '#f4f6fb', delay: '1.2s' },
                  { day: 'Day 5', subject: '15分だけお時間いただけませんか？', status: '送信予定', statusColor: '#6e7494', statusBg: '#f4f6fb', delay: '1.5s' },
                ].map((v, i) => (
                  <div className="dash-row" key={i} style={{ animationDelay: v.delay }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${v.statusColor}cc,${v.statusColor})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800, flexShrink: 0 }}>{v.day.replace('Day ', 'D')}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.subject}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>{v.day}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: v.statusColor, background: v.statusBg, padding: '2px 6px', borderRadius: 4 }}>{v.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>4通のシーケンス</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)' }}>すべて表示 →</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>AIメールの流れ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>トリガーからフォローアップ完了まで、AIが自動で最適なメールを送信し続けます。</p>
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
          <div className="stitle" style={{ textAlign: 'center' }}>AIメールの仕組みを深掘り</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>トリガー検知からフォローアップ完了まで、AIメールの各機能をステップごとに解説します。</p>
        </div>
      </section>

      {/* Feature 1: Instant Follow-up */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>FEATURE 01</div>
              <div className="phase-h">高関心リードに即座にフォローアップ</div>
              <div className="phase-desc">フォーム送信・資料DL直後にAIメールを自動送信。人間SDRの平均42時間に対し、Meeton aiは数分以内にフォロー開始。リードの関心が最も高い瞬間を逃しません。</div>
              <div className="phase-features">
                {['フォーム送信直後に自動送信', '資料DL直後にフォローアップ', 'レスポンスは分単位', '関心が高い瞬間を逃さない'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>フォロー速度の比較</div>
                  {/* Speed comparison */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: '#f4f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>人間SDR</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>平均レスポンス時間</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,#e0475b,#ff6b81)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 900, color: '#e0475b', fontFamily: 'var(--fm)' }}>42h</span>
                    </div>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #3b6ff530', borderRadius: 12, padding: 14, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, boxShadow: '0 4px 16px rgba(59,111,245,.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', fontWeight: 800 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>Meeton ai</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>AIメール自動送信</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '5%', height: '100%', background: 'linear-gradient(90deg,#3b6ff5,#6690fa)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 900, color: '#3b6ff5', fontFamily: 'var(--fm)' }}>&lt;5秒</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, animation: 'slideIn .5s 1.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#3b6ff5' }}>840倍高速</span>
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>なフォローアップ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 2: Personalized Nurturing */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#7c5cfc10', color: '#7c5cfc' }}>FEATURE 02</div>
              <div className="phase-h">パーソナライズドメールで育成</div>
              <div className="phase-desc">行動履歴をもとにメール文面を個別最適化。一斉配信ではなく、リードごとにカスタマイズされたメッセージで検討度を引き上げます。</div>
              <div className="phase-features">
                {['行動履歴ベースの文面最適化', 'リードごとにカスタマイズ', '一斉配信ではない個別対応', '検討段階に応じた内容'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#7c5cfc' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis1">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>パーソナライズドメール プレビュー</div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600, marginBottom: 6 }}>To: tanaka@example.com</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)', marginBottom: 10 }}>田中様、導入事例をお送りします</div>
                    <div style={{ fontSize: 10, lineHeight: 1.7, color: 'var(--text)' }}>
                      <span>田中様</span><br /><br />
                      <span>先ほどは</span>
                      <span style={{ background: '#7c5cfc18', color: '#7c5cfc', fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>料金ページ</span>
                      <span>をご覧いただきありがとうございます。</span><br /><br />
                      <span>御社の</span>
                      <span style={{ background: '#7c5cfc18', color: '#7c5cfc', fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>IT業界</span>
                      <span>での導入事例をまとめました。</span><br /><br />
                      <span style={{ background: '#3b6ff518', color: '#3b6ff5', fontWeight: 700, padding: '1px 4px', borderRadius: 3 }}>15分のデモ</span>
                      <span>で詳しくご説明できます。</span>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                      {['行動履歴', '業界情報', 'CRMデータ'].map((tag, j) => (
                        <span key={j} style={{ fontSize: 8, fontWeight: 700, color: '#7c5cfc', background: '#f0ecfe', padding: '2px 6px', borderRadius: 4 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c5cfc', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#7c5cfc' }}>AIが自動生成中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 3: Auto Sequence */}
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#12a37d10', color: '#12a37d' }}>FEATURE 03</div>
              <div className="phase-h">未反応リードに自動再接触</div>
              <div className="phase-desc">Day 1→Day 3→Day 5で自動フォローアップシーケンスを実行。休眠リードの掘り起こしもAIが自動で行い、商談機会を最大化します。</div>
              <div className="phase-features">
                {['Day 1→3→5の自動シーケンス', '休眠リードの掘り起こし', '開封・クリック追跡で最適化', 'カレンダーURL自動挿入'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>自動シーケンス タイムライン</div>
                  {[
                    { day: 'Day 1', label: 'フォローアップ①', status: '送信済み', statusColor: '#12a37d', icon: '✓', delay: '.4s' },
                    { day: 'Day 3', label: 'フォローアップ②', status: '開封済み', statusColor: '#3b6ff5', icon: '📧', delay: '.7s' },
                    { day: 'Day 5', label: '商談提案', status: '送信予定', statusColor: '#6e7494', icon: '📅', delay: '1.0s' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 12, marginBottom: 0 }}>
                      {/* Timeline line */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.statusColor, flexShrink: 0, animation: `nodeGrow .4s ${item.delay} cubic-bezier(.16,1,.3,1) forwards`, transform: 'scale(0)', opacity: 0 }} />
                        {i < 2 && <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg,${item.statusColor}40,${['#3b6ff5', '#6e7494'][i]}40)`, minHeight: 20 }} />}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 12, opacity: 0, animation: `slideIn .5s ${item.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>{item.day} — {item.label}</span>
                            <span style={{ fontSize: 9, fontWeight: 700, color: item.statusColor, background: `${item.statusColor}15`, padding: '2px 6px', borderRadius: 4 }}>{item.status}</span>
                          </div>
                          <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>
                            {i === 0 && '資料の内容についてフォロー'}
                            {i === 1 && 'よくある質問と追加情報を送付'}
                            {i === 2 && 'カレンダーURL付きで商談提案'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4, animation: 'slideIn .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d' }}>シーケンス実行中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phase-divider" />

          {/* Feature 4: Auto Reply */}
          <div className="phase-row reverse">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#0891b210', color: '#0891b2' }}>FEATURE 04</div>
              <div className="phase-h">返信にもAIが自動応答</div>
              <div className="phase-desc">リードからの返信に対し、ナレッジベースから文脈に合った回答を即時生成。営業チームが対応するまでの間も、AIが会話を途切れさせません。</div>
              <div className="phase-features">
                {['リード返信への即時自動応答', 'ナレッジベースから回答生成', '文脈を理解した対応', '営業チームへの自動エスカレーション'].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>メール返信チェーン</div>
                  {/* Lead reply */}
                  <div style={{ background: '#f4f6fb', border: '1px solid var(--border)', borderRadius: '12px 12px 12px 4px', padding: 12, marginBottom: 8, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, background: '#6e7494', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>田</div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)' }}>田中様</span>
                      <span style={{ fontSize: 8, color: 'var(--sub)' }}>10:32</span>
                    </div>
                    <div style={{ fontSize: 10, lineHeight: 1.7, color: 'var(--text)' }}>料金プランについて詳しく教えていただけますか？年間契約の割引はありますか？</div>
                  </div>
                  {/* AI reply */}
                  <div style={{ background: '#fff', border: '1px solid #0891b230', borderRadius: '12px 12px 4px 12px', padding: 12, marginBottom: 8, animation: 'chatPop .5s .9s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, boxShadow: '0 2px 8px rgba(8,145,178,.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#0891b2' }}>AI自動応答</span>
                      <span style={{ fontSize: 8, color: 'var(--sub)' }}>10:32</span>
                    </div>
                    <div style={{ fontSize: 10, lineHeight: 1.7, color: 'var(--text)' }}>田中様、ご質問ありがとうございます。年間契約では20%の割引がございます。詳しい料金表をお送りいたします。</div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: '#0891b2', background: '#ecfeff', padding: '2px 6px', borderRadius: 4 }}>ナレッジベース参照</span>
                    </div>
                  </div>
                  {/* Escalation */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, animation: 'slideIn .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0891b2' }}>営業チームに通知済み</span>
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
          <div className="stitle" style={{ textAlign: 'center' }}>AIメールの活用シーン</div>
          <div className="usecase-grid">
            {useCaseData.map((uc, i) => (
              <div className="usecase-card" key={i}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${uc.color},${uc.color}88)`, opacity: 0, transition: 'opacity .3s' }} className="usecase-bar" />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${uc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>}
                    {i === 1 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></>}
                    {i === 2 && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>}
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', marginBottom: 10 }}>{uc.title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--sub)', marginBottom: 16 }}>{uc.desc}</div>
                <div style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}20`, borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: uc.color, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>送信例</div>
                  <div style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic' }}>&ldquo;{uc.example}&rdquo;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="slabel" style={{ textAlign: 'center' }}>選ばれる理由</div>
          <div className="stitle" style={{ textAlign: 'center' }}>なぜ Meeton ai のAIメールなのか</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 44px' }}>従来のメール配信とは根本的に異なるアプローチ。</p>
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
        <div className="glow" style={{ background: 'rgba(59,111,245,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>AIメールで、<br />フォロー漏れをゼロに</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>フォーム送信直後から自動フォロー。パーソナライズドメールで見込み客を商談につなげます。</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
            <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <HubSpotModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} utmCampaign="features-ai-email" />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign="features-ai-email" />
    </div>
  );
}
