'use client'

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const css = `
:root {
  --bg:#ffffff;--surface:#f8f9fc;--surface2:#eef1f8;
  --border:#e2e6f0;--border2:#cdd3e2;
  --text:#4a506e;--heading:#111827;--sub:#64748b;
  --cta:#2563eb;--cta-hover:#3b82f6;--cta-glow:rgba(37,99,235,.22);--cta-light:#eff6ff;
  --accent:#7c3aed;--accent-light:#f5f3ff;
  --warm:#f59e0b;--warm-light:#fffbeb;
  --teal:#0d9488;--teal-light:#f0fdfa;
  --rose:#e11d48;--rose-light:#fff1f2;
  --blue:#3b82f6;--blue-light:#eff6ff;
  --fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes slideIn{0%{opacity:0;transform:translateX(-20px)}100%{opacity:1;transform:translateX(0)}}
@keyframes chatPop{0%{opacity:0;transform:translateY(16px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes scoreUp{0%{width:0}100%{width:var(--sw)}}
@keyframes emailPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.25)}50%{box-shadow:0 0 0 10px rgba(37,99,235,0)}}
@keyframes nodeGrow{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
.anim{opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.35s}.d4{animation-delay:.5s}.d5{animation-delay:.65s}

.btn{border:none;cursor:pointer;font-family:var(--fb);transition:all .25s;font-weight:700;border-radius:12px}
.btn-cta{background:linear-gradient(135deg,var(--cta),#3b82f6);color:#fff;padding:14px 28px;font-size:15px;box-shadow:0 4px 16px var(--cta-glow)}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.btn-cta-lg{padding:18px 40px;font-size:18px}
.btn-ghost{background:transparent;color:var(--heading);border:2px solid var(--border2);padding:16px 38px;border-radius:12px;font-size:18px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.slabel{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--accent);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.section{padding:100px 48px}
.mx{max-width:1140px;margin:0 auto}
.stitle{font-size:48px;font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-.5px;margin-bottom:18px}
.ssub{font-size:19px;line-height:1.85;color:var(--sub);max-width:660px}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:120px 48px 80px;background:linear-gradient(170deg,#eff6ff 0%,#fff 35%,#f5f3ff 65%,#fffbeb 100%)}
.hero-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:64px}
.hero-text{flex:1}
.hero-visual{flex:1;display:flex;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(37,99,235,.12);padding:8px 20px;border-radius:24px;margin-bottom:28px;font-size:14px;font-weight:700;color:var(--cta)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);animation:pulse 2s infinite}
.hero h1{font-size:72px;font-weight:900;color:var(--heading);line-height:1.15;letter-spacing:-2.5px;margin-bottom:28px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:20px;line-height:1.85;color:var(--sub);max-width:520px;margin-bottom:40px}
.hero-ctas{display:flex;gap:14px;margin-bottom:40px}
.hero-stats{display:flex;gap:40px;padding-top:28px;border-top:1px solid var(--border)}
.stat-v{font-family:var(--fm);font-size:34px;font-weight:700;letter-spacing:-1px}
.stat-l{font-size:13px;color:var(--sub);margin-top:4px;font-weight:600}

/* Funnel card */
.fc{width:100%;max-width:440px;background:#fff;border-radius:24px;border:1px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.07);padding:24px;position:relative}
.fc-hdr{display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.fc-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--cta),var(--accent));display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff}
.fc-step{display:flex;align-items:center;gap:12px;padding:10px 0}
.fc-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.fc-bar{height:5px;border-radius:3px;margin-top:5px;background:var(--surface2);overflow:hidden}
.fc-fill{height:100%;border-radius:3px;animation:scoreUp 1.5s cubic-bezier(.16,1,.3,1) forwards}
.fc-conn{width:1px;height:6px;background:var(--border);margin-left:14px}
.fc-result{margin-top:14px;padding:12px 16px;border-radius:14px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(37,99,235,.1);display:flex;align-items:center;justify-content:space-between}

/* Pain cards */
.pain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
.pain-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;transition:all .3s}
.pain-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.06)}

/* Phase rows */
.pr{display:flex;align-items:center;gap:56px;padding:80px 0}
.pr.rev{flex-direction:row-reverse}
.pr-text{flex:1}.pr-vis{flex:1;display:flex;justify-content:center}
.ptag{display:inline-flex;padding:6px 16px;border-radius:20px;font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
.ph{font-size:32px;font-weight:900;color:var(--heading);letter-spacing:-.5px;margin-bottom:14px;line-height:1.25}
.pd{font-size:16px;line-height:1.85;color:var(--sub);margin-bottom:22px}
.pf{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:600;color:var(--text);margin-bottom:8px}
.pf-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:7px}
.pdiv{height:1px;background:var(--border);max-width:1140px;margin:0 auto}
.pvis{width:100%;max-width:420px;aspect-ratio:4/3;border-radius:20px;position:relative;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.06);border:1px solid var(--border)}

/* Candidate card */
.cc{background:#fff;border:1px solid var(--border);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px}
.cc-av{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0}
.cc-info{flex:1;min-width:0}
.cc-name{font-size:11px;font-weight:700;color:var(--heading)}
.cc-role{font-size:9px;color:var(--sub)}
.cc-badge{padding:3px 10px;border-radius:6px;font-size:9px;font-weight:700}

/* Comparison */
.ctbl{width:100%;border-collapse:separate;border-spacing:0;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.05)}
.ctbl th,.ctbl td{padding:16px 22px;text-align:left;font-size:14px}
.ctbl thead th{background:var(--heading);color:#fff;font-weight:700}
.ctbl thead th:first-child{border-radius:16px 0 0 0}.ctbl thead th:last-child{border-radius:0 16px 0 0}
.ctbl tbody td{background:#fff;border-bottom:1px solid var(--border);vertical-align:top}
.ctbl tbody tr:last-child td{border-bottom:none}
.ctbl tbody tr:last-child td:first-child{border-radius:0 0 0 16px}.ctbl tbody tr:last-child td:last-child{border-radius:0 0 16px 0}

/* Why grid */
.wg{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.wc{background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;transition:all .35s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
.wc:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 12px 40px rgba(37,99,235,.1)}
.wc-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:18px}

/* Steps */
.sr{display:flex;gap:18px;align-items:stretch}
.sc{flex:1;background:#fff;border:1px solid var(--border);border-radius:18px;padding:28px;transition:all .3s}
.sc:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.06)}
.sn{font-family:var(--fm);font-size:36px;font-weight:700;margin-bottom:12px;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sa{display:flex;align-items:center;font-family:var(--fm);font-size:22px;color:var(--border2);padding:0 4px}

/* Integrations */
.ig{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:820px;margin:0 auto}
.ic{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px 18px;text-align:center;transition:all .3s}
.ic:hover{border-color:transparent;transform:translateY(-4px);box-shadow:0 10px 30px rgba(0,0,0,.07)}

/* FAQ */
.fl{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.fi{background:#fff;border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all .25s}
.fi:hover{border-color:var(--border2)}
.fq{padding:20px 26px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:17px;font-weight:700;color:var(--heading);transition:color .2s}
.fq:hover{color:var(--cta)}
.ft{width:28px;height:28px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--sub);transition:all .25s;flex-shrink:0}
.fi.open .ft{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.fa{padding:0 26px 20px;font-size:15px;line-height:1.8;color:var(--sub)}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero-inner{flex-direction:column;gap:48px;text-align:center}
  .hero h1{font-size:52px}
  .hero-sub{margin:0 auto 40px}
  .hero-ctas{justify-content:center}
  .hero-stats{justify-content:center}
  .pr{flex-direction:column!important;gap:40px}
  .pr-text{text-align:center}
  .pf{justify-content:center}
  .pain-grid{grid-template-columns:repeat(2,1fr)}
  .wg{grid-template-columns:repeat(2,1fr)}
  .sr{flex-direction:column}
  .sa{display:none}
  .ig{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:768px){
  .section{padding:80px 24px}
  .hero{padding:100px 24px 60px}
  .hero h1{font-size:38px;letter-spacing:-1.5px}
  .hero-sub{font-size:17px}
  .hero-ctas{flex-direction:column;width:100%;max-width:320px;margin:0 auto 40px}
  .hero-stats{flex-direction:column;gap:24px}
  .stitle{font-size:32px}
  .ssub{font-size:16px}
  .pain-grid{grid-template-columns:1fr}
  .wg{grid-template-columns:1fr}
  .ig{grid-template-columns:repeat(2,1fr)}
  .ctbl{font-size:12px}
  .ctbl th,.ctbl td{padding:12px 14px}
  .fc{max-width:100%}
  .pvis{max-width:100%}
}
@media(max-width:480px){
  .hero h1{font-size:32px}
  .btn-cta-lg{padding:16px 32px;font-size:16px}
  .btn-ghost{padding:14px 28px;font-size:16px}
  .ig{grid-template-columns:1fr}
}
`;

const compData = [
  {cat:"候補者との接点",old:"フォーム送信を待つだけ",nw:"AIが閲覧行動を読み取り、最適なタイミングで声をかける"},
  {cat:"情報の取得方法",old:"長いエントリーフォーム → 離脱率70%超",nw:"チャットの会話中に自然に取得 → 離脱率大幅減"},
  {cat:"志望度の判定",old:"書類選考まで不明",nw:"閲覧・チャット・再訪をリアルタイムでスコア化"},
  {cat:"候補者の育成",old:"人事が手動でメール送信",nw:"AIがリードステージに応じて自動でメール+チャット育成"},
  {cat:"面談の設定",old:"メールで数往復の日程調整",nw:"スコア条件を満たした候補者に即カレンダー表示"},
  {cat:"運用コスト",old:"シナリオ設計・更新に月数十時間",nw:"初期設定のみ。AIが自律的に最適化"},
];

const whyData = [
  {icon:"💬",bg:"var(--cta-light)",title:"チャットだから分かる本音",desc:"エントリーフォームでは取れない「何に興味があるか」「何を不安に思っているか」をAIチャットがリアルタイムで把握。"},
  {icon:"🧠",bg:"var(--accent-light)",title:"シナリオ設計不要",desc:"初期設定だけ済ませれば、AIが候補者の行動・文脈に応じて最適な対応を自律的に判断。"},
  {icon:"🔄",bg:"var(--teal-light)",title:"AI ナーチャリング",desc:"Cold → Warm → 面談予約。メール配信・チャット再接触・行動シグナルを自動で組み合わせます。"},
  {icon:"⚡",bg:"var(--warm-light)",title:"自然な流れで獲得",desc:"チャット内での自然なやりとりで候補者情報を取得。体験を損なわず、取りこぼしを減らします。"},
  {icon:"🎯",bg:"var(--rose-light)",title:"AIから能動的に",desc:"閲覧職種・行動パターン・再訪を読み取り、AIから最適なタイミングで声をかけます。"},
  {icon:"🚀",bg:"var(--blue-light)",title:"5分で導入",desc:"採用サイトにJSタグを1行追加するだけ。ATS、カレンダー、チャットツールと即連携。"},
];

const integrations = [
  {icon:"📋",name:"ジョブカン採用管理",desc:"ATS連携"},
  {icon:"🟣",name:"HRMOS採用",desc:"ATS連携"},
  {icon:"🔴",name:"リクナビHRTech",desc:"ATS連携"},
  {icon:"🟢",name:"HERP Hire",desc:"ATS連携"},
  {icon:"💬",name:"Slack",desc:"通知"},
  {icon:"👥",name:"Teams",desc:"通知"},
  {icon:"📅",name:"Google Calendar",desc:"面談予約"},
  {icon:"🗓️",name:"Spir",desc:"日程調整"},
];

const faqData = [
  {q:"導入にどのくらい時間がかかりますか？",a:"JavaScriptタグの設置は5分。AIの設定を含めても最短当日中に稼働開始できます。"},
  {q:"既存のATSと連携できますか？",a:"HRMOS、ジョブカン、リクナビHRTech、HERP Hireとネイティブ連携。Webhook経由で他ATSにも接続可能。"},
  {q:"多言語に対応していますか？",a:"日本語・英語・中国語・韓国語をはじめ主要言語に対応。グローバル採用にもご利用いただけます。"},
  {q:"無料トライアルはありますか？",a:"14日間の無料トライアルをご用意。クレジットカード不要で全機能をお試しいただけます。"},
  {q:"候補者の個人情報は安全ですか？",a:"SOC 2 Type II準拠。データは日本国内サーバーに保存、暗号化通信で保護されます。"},
];

const stepsData = [
  {num:"01",title:"タグを設置",desc:"採用サイトにJavaScriptタグを数行追加するだけ。WordPressプラグインも用意。所要時間: 約5分。"},
  {num:"02",title:"AIを設定",desc:"ダッシュボードからAIの声かけ内容、面談予約ルール、紹介する求人等を設定。テンプレートから簡単スタート。"},
  {num:"03",title:"候補者が入り始める",desc:"設定完了した瞬間からAIが稼働。候補者の獲得、評価、育成、面談予約が自動で回り始めます。"},
];

const phases = [
  [{t:"職種ページに合わせた自動あいさつ"},{t:"求人カードで興味を引く"},{t:"募集要項ライブラリ"},{t:"「すぐ話したい」への即対応"}],
  [{t:"チャット内のメール入力欄"},{t:"ATSへ即時登録"},{t:"求人情報をその場でお届け"},{t:"急ぎの候補者には最短ルート"}],
  [{t:"リアルタイムの志望度スコア"},{t:"スコアに応じた3段階の振り分け"},{t:"面談予約の条件設定"},{t:"温度感に合わせたアプローチ"}],
  [{t:"Cold Lead → 詳細情報の取得"},{t:"Warm Lead → 面談予約"},{t:"面談の準備からフォローアップまで"},{t:"サイト再訪時のチャット再接触"}],
];

export default function Page(){
  const [faq,setFaq]=useState<number | null>(null);
  return(<div><style dangerouslySetInnerHTML={{__html:css}}/>

  <Nav variant="light" />

  {/* ===== HERO - left/right layout with funnel card ===== */}
  <section className="hero">
    <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(37,99,235,.05) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
    <div className="hero-inner">
      <div className="hero-text">
        <div className="anim d1 hero-badge"><div className="hero-badge-dot"/>採用サイト特化 AI リクルーター</div>
        <h1 className="anim d2">採用サイト訪問者を<em>面談に変える</em> AI</h1>
        <p className="anim d3 hero-sub">すべての訪問者にAIが対応。候補者を自然に獲得し、志望度を自動で評価。メールとチャットで育成しながら面談予約まで完全自動化。</p>
        <div className="anim d4 hero-ctas"><button className="btn btn-cta btn-cta-lg">資料請求</button><button className="btn-ghost">デモを予約 →</button></div>
        <div className="anim d5 hero-stats">
          {[{v:"3x",l:"エントリー数",c:"var(--cta)"},{v:"65%",l:"面談化率",c:"var(--accent)"},{v:"24/7",l:"AI常時対応",c:"var(--teal)"}].map((s,i)=>(
            <div key={i}><div className="stat-v" style={{color:s.c}}>{s.v}</div><div className="stat-l">{s.l}</div></div>
          ))}
        </div>
      </div>
      <div className="hero-visual anim d4">
        <div className="fc">
          <div className="fc-hdr"><div className="fc-icon">🎯</div><div><div style={{fontSize:14,fontWeight:800,color:"var(--heading)"}}>候補者パイプライン</div><div style={{fontSize:11,color:"var(--sub)"}}>リアルタイム · 今日</div></div></div>
          {[
            {l:"サイト訪問",d:"AI が自動で声かけ",n:"1,240",w:"100%",c:"#94a3b8"},
            {l:"AI チャット開始",d:"職種に合わせた会話",n:"428",w:"68%",c:"var(--cta)"},
            {l:"候補者情報を獲得",d:"メール取得 → ATS登録",n:"186",w:"42%",c:"var(--accent)"},
            {l:"面談予約完了",d:"カレンダー自動連携",n:"72",w:"22%",c:"var(--teal)"},
          ].map((s,i)=>(<div key={i}>
            {i>0&&<div className="fc-conn"/>}
            <div className="fc-step">
              <div className="fc-num" style={{background:s.c}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:"var(--heading)"}}>{s.l}</div>
                <div style={{fontSize:10,color:"var(--sub)"}}>{s.d}</div>
                <div className="fc-bar"><div className="fc-fill" style={{background:s.c,"--sw":s.w,animationDelay:`${i*.3}s`} as React.CSSProperties}/></div>
              </div>
              <div style={{fontFamily:"var(--fm)",fontSize:12,fontWeight:700,color:s.c,minWidth:36,textAlign:"right"}}>{s.n}</div>
            </div>
          </div>))}
          <div className="fc-result"><span style={{fontSize:13,fontWeight:700,color:"var(--cta)"}}>📅 今日の面談予約</span><span style={{background:"var(--cta)",color:"#fff",padding:"5px 14px",borderRadius:8,fontSize:12,fontWeight:800}}>72件</span></div>
        </div>
      </div>
    </div>
  </section>

  {/* ===== PROBLEM - pain cards ===== */}
  <section className="section" style={{background:"var(--surface)"}}>
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>課題</div>
      <div className="stitle" style={{textAlign:"center"}}>採用サイトの訪問者、<span style={{color:"var(--rose)"}}>99%</span>がエントリーせず離脱</div>
      <p className="ssub" style={{textAlign:"center",margin:"0 auto"}}>採用サイトの平均エントリー率はわずか0.5〜1%。興味を持った候補者の大半が、接点を持てないまま離脱しています。</p>
      <div className="pain-grid">
        {[
          {icon:"😔",title:"フォームの壁",desc:"「ちょっと聞きたいだけ」の候補者がエントリーフォームの前で離脱。興味があっても応募に至らない。",stat:"70%",sc:"var(--rose)",sl:"フォーム離脱率"},
          {icon:"💸",title:"エージェント依存",desc:"1人あたり年収の30〜35%のフィー。採用コストが膨らむ一方、自社サイトからの直接応募は増えない。",stat:"35%",sc:"var(--warm)",sl:"平均紹介手数料"},
          {icon:"⏰",title:"人事の工数不足",desc:"スカウトメール、日程調整、問い合わせ対応。面談・選考に時間が割けない。",stat:"60%",sc:"var(--accent)",sl:"が事務作業に消える"},
        ].map((p,i)=>(
          <div className="pain-card" key={i}>
            <div style={{fontSize:28,marginBottom:14}}>{p.icon}</div>
            <div style={{fontSize:16,fontWeight:800,color:"var(--heading)",marginBottom:8}}>{p.title}</div>
            <div style={{fontSize:13,lineHeight:1.75,color:"var(--sub)",marginBottom:12}}>{p.desc}</div>
            <div style={{fontFamily:"var(--fm)",fontSize:24,fontWeight:700,color:p.sc}}>{p.stat}<span style={{fontSize:12,fontWeight:600,color:"var(--sub)",marginLeft:6}}>{p.sl}</span></div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ===== SOLUTION HEADER ===== */}
  <section className="section" id="sol" style={{paddingBottom:0}}>
    <div className="mx" style={{textAlign:"center"}}>
      <div className="slabel">ソリューション</div>
      <div className="stitle">4つのフェーズ。完全自動化。</div>
      <p className="ssub" style={{margin:"0 auto"}}>Meeton Talent が声かけから面談予約まで、すべてを自動で行います。</p>
    </div>
  </section>

  {/* ===== PHASES ===== */}
  <section style={{padding:"0 48px"}} id="feat"><div className="mx">

    {/* P0 - chat UI */}
    <div className="pr"><div className="pr-text">
      <div className="ptag" style={{background:"#0d948815",color:"var(--teal)"}}>Phase 0 — 接触</div>
      <div className="ph">AIが候補者に自ら話しかける</div>
      <div className="pd">候補者が見ている職種ページに合わせてAIが声をかけ、求人カードで興味を引きます。</div>
      {phases[0].map((c,i)=><div className="pf" key={i}><div className="pf-dot" style={{background:"var(--teal)"}}/>{c.t}</div>)}
    </div><div className="pr-vis">
      <div className="pvis" style={{background:"linear-gradient(160deg,#f0fdfa,#eff6ff)",padding:20}}>
        <div style={{position:"absolute",top:24,left:20,right:20}}>
          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:14,padding:"10px 16px",marginBottom:10,animation:"chatPop .5s .2s cubic-bezier(.16,1,.3,1) forwards",opacity:0,fontSize:12,fontWeight:600,color:"var(--heading)",lineHeight:1.5,borderBottomLeftRadius:4}}>こんにちは！👋<br/>エンジニア職に興味がありますか？</div>
          <div style={{display:"flex",gap:8,marginBottom:12,animation:"chatPop .5s .7s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
            {["💻 フロントエンド","⚙️ SRE","📊 データ"].map((j,k)=>(
              <div key={k} style={{background:"linear-gradient(135deg,var(--cta-light),var(--accent-light))",border:"1px solid rgba(37,99,235,.12)",borderRadius:10,padding:"7px 12px",fontSize:11,fontWeight:700,color:"var(--cta)"}}>{j}</div>
            ))}
          </div>
          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:14,padding:"10px 16px",marginBottom:10,animation:"chatPop .5s 1.2s cubic-bezier(.16,1,.3,1) forwards",opacity:0,fontSize:11,color:"var(--sub)",lineHeight:1.5,borderBottomLeftRadius:4}}>フロントエンドチームはReact+TypeScript。<br/>リモートOK、フレックスタイム制です 🏠</div>
          <div style={{animation:"chatPop .5s 1.8s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
            <div style={{background:"var(--cta)",color:"#fff",borderRadius:14,borderBottomRightRadius:4,padding:"10px 16px",fontSize:12,fontWeight:600,marginLeft:"auto",maxWidth:240,textAlign:"right"}}>開発環境について詳しく知りたいです</div>
          </div>
        </div>
      </div>
    </div></div>
    <div className="pdiv"/>

    {/* P1 - candidate card */}
    <div className="pr rev"><div className="pr-text">
      <div className="ptag" style={{background:"#2563eb15",color:"var(--cta)"}}>Phase 1 — 獲得</div>
      <div className="ph">チャットで自然に候補者情報を獲得</div>
      <div className="pd">会話の流れの中でメール取得。入力された瞬間にATSへ自動登録。</div>
      {phases[1].map((c,i)=><div className="pf" key={i}><div className="pf-dot" style={{background:"var(--cta)"}}/>{c.t}</div>)}
    </div><div className="pr-vis">
      <div className="pvis" style={{background:"linear-gradient(160deg,#eff6ff,#f5f3ff)",padding:20}}>
        <div style={{position:"absolute",top:20,left:20,right:20}}>
          <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:14,padding:"10px 16px",marginBottom:12,animation:"chatPop .5s .3s cubic-bezier(.16,1,.3,1) forwards",opacity:0,fontSize:12,fontWeight:600,color:"var(--heading)",lineHeight:1.5,borderBottomLeftRadius:4}}>詳しい求人情報をお送りしますね！<br/>メールアドレスを教えてください 📧</div>
          <div style={{padding:"10px 14px",borderRadius:12,border:"2px solid var(--cta)",background:"#fff",fontSize:13,color:"var(--heading)",fontWeight:600,animation:"emailPulse 2s infinite",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <span>sato@example.co.jp</span><span style={{background:"var(--cta)",color:"#fff",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700}}>送信</span>
          </div>
          <div style={{animation:"slideIn .6s .8s cubic-bezier(.16,1,.3,1) forwards",opacity:0,marginBottom:12}}>
            <div className="cc"><div className="cc-av" style={{background:"linear-gradient(135deg,var(--cta),var(--accent))"}}>S</div><div className="cc-info"><div className="cc-name">佐藤 太郎</div><div className="cc-role">sato@example.co.jp · フロントエンド希望</div></div><div className="cc-badge" style={{background:"var(--cta-light)",color:"var(--cta)"}}>ATS登録済</div></div>
          </div>
          <div style={{animation:"slideIn .6s 1.3s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
            <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:12,padding:"10px 14px"}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--heading)",marginBottom:8}}>📎 求人情報をお届け：</div>
              <div style={{display:"flex",gap:8}}>
                {["フロントエンドエンジニア.pdf","開発チーム紹介.pdf"].map((f,j)=>(
                  <div key={j} style={{flex:1,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 8px",display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:22,height:22,borderRadius:5,background:"linear-gradient(135deg,var(--cta),var(--accent))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff",fontWeight:800,flexShrink:0}}>PDF</div>
                    <div style={{fontSize:9,fontWeight:700,color:"var(--heading)"}}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
    <div className="pdiv"/>

    {/* P2 - score cards */}
    <div className="pr"><div className="pr-text">
      <div className="ptag" style={{background:"#7c3aed15",color:"var(--accent)"}}>Phase 2 — 評価</div>
      <div className="ph">志望度を自動判定して振り分け</div>
      <div className="pd">閲覧、チャット内容、訪問パターンをリアルタイムで点数化。面談に値する候補者だけが予約へ。</div>
      {phases[2].map((c,i)=><div className="pf" key={i}><div className="pf-dot" style={{background:"var(--accent)"}}/>{c.t}</div>)}
    </div><div className="pr-vis">
      <div className="pvis" style={{background:"linear-gradient(160deg,#f5f3ff,#eff6ff)",padding:20}}>
        <div style={{position:"absolute",top:18,left:18,right:18}}>
          {[
            {name:"佐藤 太郎",role:"フロントエンド希望",score:88,level:"Hot",color:"var(--cta)",bg:"var(--cta-light)",delay:".3s"},
            {name:"田中 花子",role:"SRE希望",score:62,level:"Warm",color:"var(--warm)",bg:"var(--warm-light)",delay:".6s"},
            {name:"山本 健一",role:"データエンジニア希望",score:35,level:"Cold",color:"var(--sub)",bg:"var(--surface)",delay:".9s"},
          ].map((c,i)=>(
            <div key={i} style={{animation:`chatPop .5s ${c.delay} cubic-bezier(.16,1,.3,1) forwards`,opacity:0,marginBottom:10}}>
              <div className="cc" style={{padding:"10px 12px"}}>
                <div className="cc-av" style={{background:c.color}}>{c.name[0]}</div>
                <div className="cc-info">
                  <div className="cc-name">{c.name}</div>
                  <div className="cc-role">{c.role}</div>
                  <div style={{height:4,borderRadius:2,background:"var(--surface2)",marginTop:4,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:2,background:c.color,"--sw":`${c.score}%`,animation:`scoreUp 1s ${c.delay} cubic-bezier(.16,1,.3,1) forwards`} as React.CSSProperties}/>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"var(--fm)",fontSize:16,fontWeight:700,color:c.color}}>{c.score}</div>
                  <div className="cc-badge" style={{background:c.bg,color:c.color,marginTop:2}}>{c.level}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{animation:"slideIn .6s 1.4s cubic-bezier(.16,1,.3,1) forwards",opacity:0,marginTop:12}}>
            <div style={{background:"#fff",border:"1px solid var(--border)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:26,height:26,borderRadius:8,background:"var(--cta-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>📅</div>
                <div><div style={{fontSize:11,fontWeight:700,color:"var(--heading)"}}>佐藤 太郎 → カジュアル面談</div><div style={{fontSize:9,color:"var(--sub)"}}>スコア88 · 条件クリア</div></div>
              </div>
              <span style={{fontSize:11,fontWeight:700,color:"var(--cta)"}}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div></div>
    <div className="pdiv"/>

    {/* P3 - kanban */}
    <div className="pr rev"><div className="pr-text">
      <div className="ptag" style={{background:"#f59e0b15",color:"var(--warm)"}}>Phase 3 — 育成</div>
      <div className="ph">AIが候補者を自動で育成</div>
      <div className="pd">候補者の状態に応じてメール配信・チャット再接触・行動トラッキングを自動で組み合わせます。</div>
      {phases[3].map((c,i)=><div className="pf" key={i}><div className="pf-dot" style={{background:"var(--warm)"}}/>{c.t}</div>)}
    </div><div className="pr-vis">
      <div className="pvis" style={{background:"linear-gradient(160deg,#fffbeb,#f5f3ff)",padding:14}}>
        <div style={{position:"absolute",top:12,left:0,right:0,textAlign:"center",animation:"nodeGrow .5s .2s cubic-bezier(.16,1,.3,1) forwards",opacity:0,transform:"scale(0)"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--accent-light)",border:"1px solid rgba(124,58,237,.15)",borderRadius:10,padding:"4px 12px",fontSize:10,fontWeight:800,color:"var(--accent)"}}>🤖 AI ナーチャリングエンジン</span>
        </div>
        <div style={{position:"absolute",top:44,left:10,right:10,display:"flex",gap:6}}>
          {[
            {t:"Cold Lead",c:"var(--sub)",bg:"var(--surface)",bd:"var(--border)",items:["✉️ 社員インタビュー","✉️ 開発文化紹介","✉️ エントリー誘導"],g:"エントリー完了",d:".5s"},
            {t:"Warm Lead",c:"var(--cta)",bg:"var(--cta-light)",bd:"#bfdbfe",items:["✉️ ポジション詳細","✉️ 待遇・福利厚生","💬 チャット再接触"],g:"面談予約",d:".8s"},
            {t:"Qualified",c:"var(--accent)",bg:"var(--accent-light)",bd:"#c4b5fd",items:["✉️ 確認メール","📄 会社紹介資料","⏰ リマインダー"],g:"選考通過",d:"1.1s"},
          ].map((col,i)=>(
            <div key={i} style={{flex:1,animation:`nodeGrow .5s ${col.d} cubic-bezier(.16,1,.3,1) forwards`,opacity:0,transform:"scale(0)"}}>
              <div style={{background:col.bg,border:`1px solid ${col.bd}`,borderRadius:10,padding:"8px 6px"}}>
                <div style={{fontSize:9,fontWeight:800,color:col.c,marginBottom:4,textAlign:"center"}}>{col.t}</div>
                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                  {col.items.map((it,j)=><div key={j} style={{background:"#fff",borderRadius:5,padding:"3px 5px",fontSize:8,fontWeight:600,color:"var(--heading)",border:`1px solid ${col.bd}`}}>{it}</div>)}
                </div>
                <div style={{textAlign:"center",fontSize:7,fontWeight:700,color:col.c,marginTop:5}}>目標: {col.g}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{position:"absolute",bottom:12,left:10,right:10,background:"#fff",border:"1px solid var(--border)",borderRadius:10,padding:"7px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",animation:"slideIn .6s 1.6s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:11}}>👁</span><span style={{fontSize:9,fontWeight:700,color:"var(--heading)"}}>行動シグナルで自動加速</span></div>
          <span style={{fontSize:8,fontWeight:600,color:"var(--sub)"}}>募集要項を再閲覧 → メール前倒し</span>
        </div>
      </div>
    </div></div>
  </div></section>

  {/* ===== COMPARISON TABLE ===== */}
  <section className="section" id="comp" style={{background:"var(--surface)"}}>
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>比較</div>
      <div className="stitle" style={{textAlign:"center"}}>従来の採用 vs Meeton Talent</div>
      <p className="ssub" style={{textAlign:"center",margin:"0 auto 40px"}}>フォームとシナリオ型チャットボットの限界を、AIが根本から解決。</p>
      <div style={{maxWidth:920,margin:"0 auto"}}>
        <table className="ctbl">
          <thead><tr><th style={{width:"20%"}}></th><th style={{width:"40%"}}>従来の採用サイト</th><th style={{width:"40%"}}>Meeton Talent</th></tr></thead>
          <tbody>{compData.map((r,i)=>(
            <tr key={i}><td style={{fontWeight:800,color:"var(--heading)",fontSize:13}}>{r.cat}</td><td style={{color:"var(--sub)",fontSize:13,lineHeight:1.7}}>{r.old}</td><td style={{color:"var(--cta)",fontWeight:600,fontSize:13,lineHeight:1.7}}>✓ {r.nw}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  </section>

  {/* ===== WHY ===== */}
  <section className="section">
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>選ばれる理由</div>
      <div className="stitle" style={{textAlign:"center"}}>なぜ Meeton Talent なのか</div>
      <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>従来の採用チャットボットやエントリーフォームとは根本的に異なるアプローチ。</p>
      <div className="wg">{whyData.map((w,i)=>(
        <div className="wc" key={i}><div className="wc-icon" style={{background:w.bg}}>{w.icon}</div><div style={{fontSize:17,fontWeight:800,color:"var(--heading)",marginBottom:10}}>{w.title}</div><div style={{fontSize:14,lineHeight:1.8,color:"var(--sub)"}}>{w.desc}</div></div>
      ))}</div>
    </div>
  </section>

  {/* ===== STEPS ===== */}
  <section className="section" style={{background:"var(--surface)"}}>
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>導入ステップ</div>
      <div className="stitle" style={{textAlign:"center"}}>かんたん3ステップで導入</div>
      <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>開発リソース不要。最短当日から稼働開始。</p>
      <div className="sr">{stepsData.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"stretch",flex:1}}>
          <div className="sc" style={{display:"flex",flexDirection:"column"}}><div className="sn">{s.num}</div><div style={{fontSize:20,fontWeight:800,color:"var(--heading)",marginBottom:10}}>{s.title}</div><div style={{fontSize:15,lineHeight:1.75,color:"var(--sub)"}}>{s.desc}</div></div>
          {i<2&&<div className="sa">→</div>}
        </div>
      ))}</div>
    </div>
  </section>

  {/* ===== CASES COMING SOON ===== */}
  <section className="section">
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>導入事例</div>
      <div className="stitle" style={{textAlign:"center"}}>導入企業の成果</div>
      <div style={{position:"relative",borderRadius:24,overflow:"hidden",maxWidth:780,margin:"28px auto 0",background:"linear-gradient(135deg,#111827 0%,#1e293b 50%,#111827 100%)",padding:"72px 48px",textAlign:"center",border:"1px solid rgba(37,99,235,.2)",boxShadow:"0 8px 40px rgba(0,0,0,.2)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(37,99,235,.06) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,99,235,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(37,99,235,.15)",border:"1px solid rgba(37,99,235,.3)",borderRadius:20,padding:"6px 18px",marginBottom:28,fontSize:13,fontWeight:700,color:"#60a5fa"}}><div style={{width:6,height:6,borderRadius:"50%",background:"#60a5fa",animation:"pulse 2s infinite"}}/>準備中</div>
          <div style={{fontFamily:"var(--fm)",fontSize:44,fontWeight:800,letterSpacing:6,background:"linear-gradient(135deg,#fff,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:16}}>COMING SOON</div>
          <p style={{fontSize:15,lineHeight:1.8,color:"rgba(255,255,255,.45)",maxWidth:440,margin:"0 auto 32px"}}>現在、導入企業様の成果データを準備中です。<br/>先行導入にご興味のある企業様はお気軽にお問い合わせください。</p>
          <button className="btn btn-cta">先行導入について相談する</button>
        </div>
      </div>
    </div>
  </section>

  {/* ===== INTEGRATIONS ===== */}
  <section className="section" style={{background:"var(--surface)"}}>
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>ツール連携</div>
      <div className="stitle" style={{textAlign:"center"}}>主要採用ツールとシームレスに連携</div>
      <p className="ssub" style={{textAlign:"center",margin:"0 auto 44px"}}>既存のATSやビジネスツールとかんたんに統合。</p>
      <div className="ig">{integrations.map((t,i)=>(<div className="ic" key={i}><div style={{fontSize:32,marginBottom:10}}>{t.icon}</div><div style={{fontSize:14,fontWeight:800,color:"var(--heading)"}}>{t.name}</div><div style={{fontSize:11,color:"var(--sub)",marginTop:3}}>{t.desc}</div></div>))}</div>
    </div>
  </section>

  {/* ===== FAQ ===== */}
  <section className="section" id="faq">
    <div className="mx">
      <div className="slabel" style={{textAlign:"center"}}>よくある質問</div>
      <div className="stitle" style={{textAlign:"center"}}>FAQ</div>
      <div style={{height:36}}/>
      <div className="fl">{faqData.map((f,i)=>(
        <div className={"fi"+(faq===i?" open":"")} key={i}>
          <div className="fq" onClick={()=>setFaq(faq===i?null:i)}>{f.q}<div className="ft">+</div></div>
          {faq===i&&<div className="fa">{f.a}</div>}
        </div>
      ))}</div>
    </div>
  </section>

  {/* ===== CLIENTS COMING SOON ===== */}
  <section className="section" style={{textAlign:"center",background:"var(--surface)"}}>
    <div className="mx">
      <div className="slabel">導入企業</div>
      <div className="stitle">採用に強い企業に選ばれています</div>
      <div style={{position:"relative",borderRadius:20,overflow:"hidden",maxWidth:680,margin:"36px auto 0",background:"linear-gradient(135deg,#111827,#1e293b)",padding:"52px 40px",border:"1px solid rgba(124,58,237,.2)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(124,58,237,.05) 1px,transparent 1px)",backgroundSize:"20px 20px",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:2}}>
          <div style={{fontFamily:"var(--fm)",fontSize:28,fontWeight:800,letterSpacing:4,marginBottom:12,background:"linear-gradient(135deg,#fff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>COMING SOON</div>
          <p style={{fontSize:14,lineHeight:1.8,color:"rgba(255,255,255,.4)",maxWidth:380,margin:"0 auto"}}>導入企業様のロゴは準備ができ次第公開いたします。</p>
        </div>
      </div>
    </div>
  </section>

  {/* ===== FINAL CTA ===== */}
  <section style={{padding:"100px 48px 120px",textAlign:"center",position:"relative",overflow:"hidden",background:"linear-gradient(170deg,#eff6ff 0%,#fff 40%,#f5f3ff 80%,#fffbeb 100%)"}}>
    <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(37,99,235,.04) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
    <div style={{maxWidth:620,margin:"0 auto",position:"relative",zIndex:2}}>
      <div className="slabel">今すぐ始める</div>
      <div className="stitle" style={{textAlign:"center"}}>採用サイト訪問者の99%を<br/>失い続けますか？</div>
      <p className="ssub" style={{textAlign:"center",margin:"16px auto 36px"}}>Meeton Talent を数分で導入。コード不要。興味を持った候補者を面談に変えましょう。</p>
      <div style={{display:"flex",gap:14,justifyContent:"center"}}><button className="btn btn-cta btn-cta-lg">資料請求</button><button className="btn-ghost">デモを予約 →</button></div>
    </div>
  </section>

  <Footer variant="light" />

  </div>);
}
