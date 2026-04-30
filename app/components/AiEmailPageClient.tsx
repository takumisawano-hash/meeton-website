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
  { q: 'AIメールはどのようなタイミングで送信されますか？', a: 'AI Calendar で商談予約に至らなかったリードに対し、AIが自動でフォローメールを送信します。1通目以降は、開封・クリック・サイト再訪などの行動データを分析し、文面を都度生成して継続的にアプローチします。' },
  { q: 'メール文面は自分で作成する必要がありますか？', a: 'いいえ。AIがリードの行動履歴やナレッジベースをもとに、メール文面を毎通自動生成します。テンプレートやトーンの指定も可能です。' },
  { q: '完全自動と承認モードはどう違いますか？', a: '完全自動モードは AI が作成から送信まですべて自動で行います。承認モードは AI が下書きを作成し、送信前に人間が確認・編集してから送信できます。チームの運用方針に合わせて選択でき、1通単位での切り替えも可能です。' },
  { q: 'リードからの返信には対応していますか？', a: 'いいえ、Meeton AIメールは送信専用です。返信が届いた場合は、ご担当者様のメールアドレスへ通知され、人による対応となります（CC で営業マネジメント層を含めることも可能）。' },
  { q: '既存のMAツール（Marketo等）と競合しませんか？', a: '競合ではなく補完関係です。Meeton AIメールは AI Calendar で取りこぼしたリードの自動フォローに特化しており、MAツールのワークフローと並行して利用できます。Marketo・Eloquaとの連携も可能です。' },
  { q: '送信数や送信間隔は制限できますか？', a: 'はい。リード 1 人あたりの最大送信数（例: 5通まで）、送信間隔（例: 72時間ごと）を管理画面で細かく設定できます。配信停止リンクもすべてのメールに自動挿入されます。' },
];

const whyData = [
  { title: '取りこぼしを自動回収', desc: 'AI Calendar で予約しなかった見込み客を、AIが自動でメールフォロー。1件も諦めない。', color: '#3b6ff5', iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3' },
  { title: '毎通、行動から再生成', desc: '前回の開封・クリック・サイト再訪・閲覧ページから、次のメール文面を都度生成。', color: '#7c5cfc', iconPath: 'M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5' },
  { title: '2通目・3通目も自動で継続', desc: '1通で諦めない。未反応なら別の切り口で、開封済みなら次のステップへ。', color: '#12a37d', iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { title: '完全自動 / 承認モード', desc: 'AI に完全に任せるか、送信前に人間が確認・編集するか、運用方針で選択可能。', color: '#0891b2', iconPath: 'M9 12l2 2 4-4 M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.49 0 4.74 1.01 6.36 2.64' },
];

const flowSteps = [
  { num: '1', title: '離脱を自動検知', sub: 'Drop-off detected', color: '#6e7494' },
  { num: '2', title: '1通目を自動送信', sub: 'First email', color: '#3b6ff5' },
  { num: '3', title: '行動を分析', sub: 'Analyze behavior', color: '#6690fa' },
  { num: '4', title: '次のメールを再生成', sub: 'Regenerate', color: '#7c5cfc' },
  { num: '5', title: '商談予約獲得', sub: 'Meeting booked', color: '#12a37d' },
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
    title: '商談予約に至らなかったリードの回収',
    color: '#3b6ff5',
    desc: 'AI Chat や AI Calendar で予約に至らなかった見込み客に、AIが自動でフォローメールを送信。離脱を取り戻します。',
    example: '先ほどはサイトをご覧いただきありがとうございます。御社の課題に近い導入事例を1つご紹介させてください。',
  },
  {
    title: '資料DL 後の継続育成',
    color: '#7c5cfc',
    desc: '資料DL したリードのその後の閲覧履歴を分析し、興味の方向に合わせて 2 通目・3 通目を自動生成。',
    example: '資料の中で特にご関心が高そうな「料金最適化」の章について、追加資料をお送りしました。',
  },
  {
    title: '休眠リードの再接触',
    color: '#12a37d',
    desc: '過去に接点があったが冷えてしまったリードへ、最新の閲覧データを踏まえて再アプローチ。',
    example: '半年ぶりにサイトをご覧いただいたようなので、改めて15分のお時間をいただけませんか？',
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
            <h1 className="anim d2">離脱リードを<br /><em>自動で取り戻す</em></h1>
            <p className="anim d3 hero-sub">AI Calendar で予約に至らなかった見込み客に、AIが自動でメールを送信。2通目・3通目も継続フォローし、毎通のメール文面は前回の開封・クリック・サイト再訪などの最新行動から再生成します。</p>
            <div className="anim d4 hero-ctas">
              <button className="btn btn-cta btn-cta-lg" onClick={() => setIsDocModalOpen(true)}>資料請求</button>
              <button className="btn-ghost" onClick={() => setIsMeetingModalOpen(true)}>デモを予約 →</button>
            </div>
            <div className="anim d5 hero-stats">
              {[{ v: '24/7', l: '自動フォロー' }, { v: '毎通', l: '行動から再生成' }, { v: '自動 / 承認', l: '送信モード切替' }].map((s, i) => (
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
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--heading)' }}>取りこぼし回収フロー</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cta)', animation: 'dotBlink 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', fontWeight: 600 }}>AI 稼働中</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '6px 0' }}>
                {[
                  { step: '1 通目', subject: '初動メール', status: '開封 ✗', statusColor: '#6e7494', statusBg: '#f4f6fb', delay: '.6s', behavior: 'AI Calendar 離脱を検知' },
                  { step: '2 通目', subject: '別アングルで再アプローチ', status: '開封 ✓', statusColor: '#3b6ff5', statusBg: '#eaf0fe', delay: '.9s', behavior: '料金ページ再訪を反映' },
                  { step: '3 通目', subject: '事例を交えてフォロー', status: 'クリック ✓', statusColor: '#7c5cfc', statusBg: '#f0ecfe', delay: '1.2s', behavior: '前回クリックした章を深掘り' },
                  { step: '4 通目', subject: 'カレンダー提案', status: '送信予定', statusColor: '#12a37d', statusBg: '#e5f8f2', delay: '1.5s', behavior: '行動データから商談提案へ' },
                ].map((v, i) => (
                  <div className="dash-row" key={i} style={{ animationDelay: v.delay }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${v.statusColor}cc,${v.statusColor})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 800, flexShrink: 0 }}>{(i + 1).toString()}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.subject}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>{v.step}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: v.statusColor, background: v.statusBg, padding: '2px 6px', borderRadius: 4 }}>{v.status}</span>
                        <span style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 500 }}>{v.behavior}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)' }}>毎通、行動から再生成</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--cta)' }}>承認 / 完全自動 切替可能</span>
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
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 52px' }}>離脱検知から商談獲得まで、AIが行動データを更新しながらメール文面を都度生成し続けます。</p>
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
          <p className="ssub" style={{ textAlign: 'center', margin: '0 auto 20px' }}>取りこぼしリードの自動回収から、行動データに応じた継続フォロー、送信モード切替まで。</p>
        </div>
      </section>

      {/* Feature 1: Instant Follow-up */}
      <section style={{ padding: '0 clamp(16px,5vw,48px)', position: 'relative' }}>
        <div className="dot-grid" style={{ opacity: .3 }} />
        <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="phase-row">
            <div className="phase-text">
              <div className="phase-tag" style={{ background: '#3b6ff510', color: '#3b6ff5' }}>FEATURE 01</div>
              <div className="phase-h">取りこぼしリードを自動で取り戻す</div>
              <div className="phase-desc">即時の商談予約は AI Calendar が担います。AI Email はその先 ── 商談予約に至らずに離脱してしまったリードへの自動フォローを担当します。サイトを離れたあとも、AIが諦めずに接触を続けます。</div>
              <div className="phase-features">
                {[
                  'AI Calendar で予約に至らなかったリードを自動検知',
                  '行動データから初動メールを自動生成',
                  '通常は離脱して終わるリードを商談化へ',
                  '人間 SDR を増やさずに取りこぼしを回収',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#3b6ff5' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis0">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>離脱リードの行方</div>
                  {/* Without AI Email */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 10, animation: 'chatPop .5s .4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18 M6 6l12 12"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>AI Email なしの場合</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>離脱したらそのまま消滅</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '8%', height: '100%', background: 'linear-gradient(90deg,#dc2626,#ef4444)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#dc2626', fontFamily: 'var(--fm)' }}>回収率 数%</span>
                    </div>
                  </div>
                  {/* With AI Email */}
                  <div style={{ background: '#fff', border: '1px solid #3b6ff530', borderRadius: 12, padding: 14, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, boxShadow: '0 4px 16px rgba(59,111,245,.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#3b6ff5,#6690fa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--heading)' }}>AI Email あり</div>
                        <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>離脱者を継続フォロー</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg,#3b6ff5,#6690fa)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#3b6ff5', fontFamily: 'var(--fm)' }}>継続フォロー</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, animation: 'slideIn .5s 1.2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b6ff5', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#3b6ff5' }}>離脱の先までAIが追いかける</span>
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
              <div className="phase-h">毎通、最新の行動データから再生成</div>
              <div className="phase-desc">テンプレートを使い回す一斉配信とは違います。前回送ったメールの開封・クリック、その後のサイト再訪、新たに見たページ。AIはそれらを毎回反映し、次のメール文面を都度生成し直します。</div>
              <div className="phase-features">
                {[
                  '前回メールの開封・クリックを反映',
                  'サイト再訪後に見たページを次の話題に',
                  '一斉配信ではない毎通生成方式',
                  'リード 1 人 1 人で全く違う文面',
                ].map((feat, i) => (
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
              <div className="phase-h">2 通目・3 通目も自動で継続</div>
              <div className="phase-desc">1 通だけで諦めません。未開封なら別の切り口で、開封済みなら次のステップへ。最大送信数（例: 5通まで）と送信間隔（例: 72時間ごと）を細かく設定でき、リードの行動に応じて次の手を変えていきます。</div>
              <div className="phase-features">
                {[
                  '未反応なら自動で 2 通目・3 通目',
                  '開封・未開封で次のメールの方向性を切替',
                  '最大送信数 / 送信間隔を細かく設定',
                  'カレンダー URL を自動挿入',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#12a37d' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis2">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 12, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>継続フォローのフロー</div>
                  {[
                    { step: '1 通目', label: '初動メール', status: '開封 ✗', statusColor: '#6e7494', subDesc: '未反応 → 別の切り口で次のメール生成', delay: '.4s' },
                    { step: '2 通目', label: '別アングルで再アプローチ', status: '開封 ✓', statusColor: '#3b6ff5', subDesc: '開封 + リンククリック → 興味あり', delay: '.7s' },
                    { step: '3 通目', label: 'カレンダー提案', status: 'クリック ✓', statusColor: '#12a37d', subDesc: '行動データから商談提案へ移行', delay: '1.0s' },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 12, marginBottom: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.statusColor, flexShrink: 0, animation: `nodeGrow .4s ${item.delay} cubic-bezier(.16,1,.3,1) forwards`, transform: 'scale(0)', opacity: 0 }} />
                        {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg,${item.statusColor}40,${arr[i + 1].statusColor}40)`, minHeight: 20 }} />}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 12, opacity: 0, animation: `slideIn .5s ${item.delay} cubic-bezier(.16,1,.3,1) forwards` }}>
                        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)' }}>{item.step} — {item.label}</span>
                            <span style={{ fontSize: 9, fontWeight: 700, color: item.statusColor, background: `${item.statusColor}15`, padding: '2px 6px', borderRadius: 4 }}>{item.status}</span>
                          </div>
                          <div style={{ fontSize: 9, color: 'var(--sub)', fontWeight: 600 }}>{item.subDesc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4, animation: 'slideIn .5s 1.3s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#12a37d', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#12a37d' }}>反応に合わせて文面が変わる</span>
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
              <div className="phase-h">完全自動モード or 承認モードを選択</div>
              <div className="phase-desc">AI に完全に任せて自動送信させるか、AI が下書きを作成してから人間が確認・編集してから送信するか。チームの運用方針や慎重度に応じて選択でき、1 通単位での切り替えも可能です。</div>
              <div className="phase-features">
                {[
                  '完全自動モード: AI が作成・送信まで完結',
                  '承認モード: 送信前に人間が確認・編集',
                  '1 通単位で承認可否を切り替え可能',
                  'チーム単位で初期モードを設定可能',
                ].map((feat, i) => (
                  <div className="phase-feat" key={i}><div className="phase-feat-dot" style={{ background: '#0891b2' }} />{feat}</div>
                ))}
              </div>
            </div>
            <div className="phase-vis">
              <div className="pvis vis3">
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sub)', marginBottom: 10, animation: 'chatPop .4s .2s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>送信モード</div>
                  {/* Mode toggle */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, animation: 'chatPop .5s .35s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: '#fff', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--sub)', marginBottom: 2 }}>完全自動</div>
                      <div style={{ fontSize: 8, color: 'var(--sub)' }}>AI 任せ</div>
                    </div>
                    <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'linear-gradient(135deg, #ecfeff, #fff)', border: '1.5px solid #0891b2', textAlign: 'center', boxShadow: '0 2px 8px rgba(8,145,178,.18)' }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#0891b2', marginBottom: 2 }}>承認モード ✓</div>
                      <div style={{ fontSize: 8, color: '#0891b2' }}>送信前に確認</div>
                    </div>
                  </div>
                  {/* Pending email card */}
                  <div style={{ background: '#fff', border: '1px solid #0891b230', borderRadius: 12, padding: 12, animation: 'chatPop .5s .8s cubic-bezier(.16,1,.3,1) forwards', opacity: 0, boxShadow: '0 4px 16px rgba(8,145,178,.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--heading)' }}>承認待ち</span>
                      <span style={{ fontSize: 8, color: 'var(--sub)' }}>3 分後に送信予定</span>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--heading)', marginBottom: 4 }}>To: tanaka@example.com</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--heading)', marginBottom: 6 }}>導入事例の追加情報をお送りします</div>
                    <div style={{ fontSize: 9, color: 'var(--sub)', lineHeight: 1.5, marginBottom: 8 }}>先日ご覧いただいた料金ページの内容について、御社の業界に近い導入事例を 3 つピックアップしました…</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ flex: 1, padding: '6px 8px', fontSize: 9, fontWeight: 800, background: 'linear-gradient(135deg,#12a37d,#0fc19a)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>承認 → 送信</button>
                      <button style={{ flex: 1, padding: '6px 8px', fontSize: 9, fontWeight: 700, background: '#fff', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>編集</button>
                      <button style={{ padding: '6px 8px', fontSize: 9, fontWeight: 700, background: '#fff', color: 'var(--sub)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>却下</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, animation: 'slideIn .5s 1.4s cubic-bezier(.16,1,.3,1) forwards', opacity: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0891b2', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0891b2' }}>運用方針に合わせて切替可能</span>
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

      {/* CTA — after USE CASES: demo */}
      <MidPageCta
        eyebrow="See it in action"
        heading="行動データから AI が文面を都度生成する流れと、承認モードの操作感を実機で 15 分で体験"
        ctaLabel="デモを予約する"
        variant="demo"
        onClick={() => setIsMeetingModalOpen(true)}
      />

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

      {/* CTA — after WHY: doc */}
      <MidPageCta
        eyebrow="For internal review"
        heading="AI メールの仕様・行動再生成の仕組み・送信モード・連携先をまとめた資料を社内検討用にお送りします"
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
        <div className="glow" style={{ background: 'rgba(59,111,245,.15)', width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="final-cta-inner">
          <div className="slabel">今すぐ始める</div>
          <div className="stitle" style={{ textAlign: 'center' }}>AI Email で、<br />取りこぼしをゼロへ</div>
          <p className="ssub" style={{ textAlign: 'center', margin: '16px auto 36px' }}>AI Calendar で予約しなかった見込み客を、AIが行動データから毎通文面を生成し、自動でフォローし続けます。</p>
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
