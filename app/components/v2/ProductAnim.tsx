// Lightweight CSS/SVG product animations — stand-ins for real screenshots/
// video until those exist (2026-06-09, Takumi). One per stage/product, themed
// navy + green. Pure CSS keyframes, no JS, respects prefers-reduced-motion.
// Rendered inside the navy media frame (ProductMedia / StageMedia fallback).

export default function ProductAnim({ kind }: { kind: string }) {
  return (
    <div className="v2-anim">
      {kind === "chat" && <ChatAnim />}
      {kind === "library" && <LibraryAnim />}
      {kind === "calendar" && <CalendarAnim />}
      {kind === "email" && <EmailAnim />}
      <style>{`
        .v2-anim{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;
          background:radial-gradient(circle at 28% 24%,rgba(7,203,121,.16),transparent 55%),radial-gradient(circle at 78% 80%,rgba(7,203,121,.07),transparent 55%),var(--navy-2)}
        .v2-anim *{box-sizing:border-box}
        .v2-anim .win{width:min(78%,520px);background:rgba(255,255,255,.04);border:1px solid var(--on-navy-border);border-radius:16px;padding:18px;backdrop-filter:blur(4px)}
        .v2-anim .bar{display:flex;gap:6px;margin-bottom:14px}
        .v2-anim .bar i{width:9px;height:9px;border-radius:50%;background:var(--on-navy-border);display:block}
        .v2-anim .bar i:first-child{background:var(--cta)}
        @media(prefers-reduced-motion:reduce){.v2-anim *{animation:none!important}}
      `}</style>
    </div>
  );
}

/* ① Chat — visitor掴む: bubbles pop in, then a green "リード化" tag */
function ChatAnim() {
  return (
    <div className="win ca">
      <div className="bar"><i/><i/><i/></div>
      <div className="ca-b ca-in">こんにちは。導入を検討中ですか？</div>
      <div className="ca-b ca-out ca-d1">料金と他社比較を知りたい</div>
      <div className="ca-b ca-in ca-d2">3プランあります。最適な構成を提案します</div>
      <div className="ca-tag ca-d3">● リード化</div>
      <style>{`
        .ca-b{max-width:80%;font-size:13px;line-height:1.5;padding:9px 13px;border-radius:14px;margin-bottom:9px;opacity:0;animation:caPop .5s cubic-bezier(.16,1,.3,1) forwards}
        .ca-in{background:rgba(255,255,255,.10);color:#fff;border-top-left-radius:4px}
        .ca-out{background:var(--cta);color:#04231a;margin-left:auto;border-top-right-radius:4px;font-weight:700}
        .ca-d1{animation-delay:.8s}.ca-d2{animation-delay:1.7s}.ca-d3{animation-delay:2.6s}
        .ca-tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:var(--cta);background:rgba(7,203,121,.14);border:1px solid rgba(7,203,121,.4);border-radius:999px;padding:5px 12px;opacity:0;animation:caPop .5s cubic-bezier(.16,1,.3,1) forwards}
        .ca{animation:caLoop 7s infinite}
        @keyframes caPop{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}
        @keyframes caLoop{0%,90%{opacity:1}97%,100%{opacity:0}}
      `}</style>
    </div>
  );
}

/* ① Library — 育てる: doc cards + an open-rate gauge filling up */
function LibraryAnim() {
  return (
    <div className="win lb">
      <div className="bar"><i/><i/><i/></div>
      <div className="lb-row">
        <span className="lb-doc lb-d0">📄 提案資料.pdf</span>
        <span className="lb-pct lb-d0b">68%</span>
      </div>
      <div className="lb-track"><span className="lb-fill"/></div>
      <div className="lb-row lb-d1">
        <span className="lb-doc">📊 導入事例.pdf</span>
        <span className="lb-sig">○○社が閲覧中</span>
      </div>
      <div className="lb-tag lb-d2">● 検討が温まっています</div>
      <style>{`
        .lb-row{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#fff;margin-bottom:10px;opacity:0;animation:caPop .5s forwards}
        .lb-d0{animation-delay:.2s}.lb-d1{animation-delay:1.9s}
        .lb-doc{font-weight:600}.lb-pct{color:var(--cta);font-weight:800}
        .lb-pct.lb-d0b{opacity:0;animation:caPop .5s 1.4s forwards}
        .lb-track{height:8px;border-radius:5px;background:rgba(255,255,255,.10);overflow:hidden;margin-bottom:16px}
        .lb-fill{display:block;height:100%;width:0;background:var(--cta);border-radius:5px;animation:lbFill 1.6s .4s cubic-bezier(.16,1,.3,1) forwards}
        .lb-sig{font-size:11px;color:var(--cta);font-weight:700}
        .lb-tag{display:inline-flex;font-size:12px;font-weight:800;color:var(--cta);background:rgba(7,203,121,.14);border:1px solid rgba(7,203,121,.4);border-radius:999px;padding:5px 12px;opacity:0;animation:caPop .5s 2.6s forwards}
        .lb{animation:caLoop 7s infinite}
        @keyframes lbFill{to{width:68%}}
      `}</style>
    </div>
  );
}

/* ② Calendar — 商談化: a slot fills "予約済み" */
function CalendarAnim() {
  return (
    <div className="win cl">
      <div className="bar"><i/><i/><i/></div>
      <div className="cl-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`cl-cell ${i === 6 ? "cl-pick" : ""}`} />
        ))}
      </div>
      <div className="cl-book cl-d1">
        <span className="cl-dot" /> 6/12 14:00 商談予約 確定
      </div>
      <div className="cl-tag cl-d2">● CRM 登録・通知 完了</div>
      <style>{`
        .cl-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin-bottom:16px}
        .cl-cell{height:26px;border-radius:6px;background:rgba(255,255,255,.07)}
        .cl-pick{background:var(--cta);animation:clPulse 7s infinite}
        .cl-book{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#fff;background:rgba(255,255,255,.06);border:1px solid var(--on-navy-border);border-radius:10px;padding:10px 12px;margin-bottom:10px;opacity:0;animation:caPop .5s 1.2s forwards}
        .cl-dot{width:8px;height:8px;border-radius:50%;background:var(--cta)}
        .cl-tag{display:inline-flex;font-size:12px;font-weight:800;color:var(--cta);background:rgba(7,203,121,.14);border:1px solid rgba(7,203,121,.4);border-radius:999px;padding:5px 12px;opacity:0;animation:caPop .5s 2.2s forwards}
        .cl{animation:caLoop 7s infinite}
        @keyframes clPulse{0%,12%{background:rgba(255,255,255,.07)}18%,100%{background:var(--cta)}}
      `}</style>
    </div>
  );
}

/* ③ Email — 追客: email sends, signal returns, re-engage */
function EmailAnim() {
  return (
    <div className="win em">
      <div className="bar"><i/><i/><i/></div>
      <div className="em-card em-d0">
        <div className="em-h">AI が生成した1:1フォロー</div>
        <div className="em-l" style={{ width: "92%" }} />
        <div className="em-l" style={{ width: "74%" }} />
        <div className="em-l" style={{ width: "84%" }} />
      </div>
      <div className="em-sig em-d1"><span className="em-dot" /> 再訪を検知 — 開封 → リンククリック</div>
      <div className="em-tag em-d2">● 再商談化へ</div>
      <style>{`
        .em-card{background:rgba(255,255,255,.06);border:1px solid var(--on-navy-border);border-radius:12px;padding:14px;margin-bottom:12px;opacity:0;animation:caPop .5s .2s forwards}
        .em-h{font-size:12px;font-weight:800;color:var(--cta);margin-bottom:10px}
        .em-l{height:7px;border-radius:4px;background:rgba(255,255,255,.14);margin-bottom:8px;transform-origin:left;transform:scaleX(0);animation:emLine .5s forwards}
        .em-card .em-l:nth-child(2){animation-delay:.6s}.em-card .em-l:nth-child(3){animation-delay:.9s}.em-card .em-l:nth-child(4){animation-delay:1.2s}
        .em-sig{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:700;color:#fff;opacity:0;animation:caPop .5s 1.9s forwards}
        .em-dot{width:8px;height:8px;border-radius:50%;background:var(--cta);animation:emBlink 1.4s infinite}
        .em-tag{display:inline-flex;margin-top:12px;font-size:12px;font-weight:800;color:var(--cta);background:rgba(7,203,121,.14);border:1px solid rgba(7,203,121,.4);border-radius:999px;padding:5px 12px;opacity:0;animation:caPop .5s 2.7s forwards}
        .em{animation:caLoop 7s infinite}
        @keyframes emLine{to{transform:scaleX(1)}}
        @keyframes emBlink{0%,100%{opacity:.4}50%{opacity:1}}
      `}</style>
    </div>
  );
}
