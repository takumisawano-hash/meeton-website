import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { altLanguages, ogLocale, EN_OG_IMAGE } from "@/app/lib/i18n";
import { integrations } from "@/lib/integrations-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// /en/integrations/ — English twin of the integrations directory. Reuses the
// shared `integrations` data (product names kept verbatim; EN copy translated).
// Detail pages have no /en/integrations/<slug>/ twin, so cards render UNLINKED.
// CTA follows the trial-first EN site convention (/en/trial/ + Book a demo).
// Nav/Footer rendered with lang="en" so the whole page is English.

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Meeton ai to Slack, Zoom, Salesforce, HubSpot, Google Calendar, Microsoft Teams, and more.",
  alternates: altLanguages("/integrations/", "en"),
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Integrations｜Meeton ai",
    description:
      "Connect Meeton ai to Slack, Zoom, Salesforce, HubSpot, and more.",
    url: "https://dynameet.ai/en/integrations/",
    type: "website",
    siteName: "Meeton ai",
    locale: ogLocale("en"),
  },
};

export default function IntegrationsPageEn() {
  const count = integrations.length;

  return (
    <>
      <style>{`
        /* ===== Hero ===== */
        .int-dir-hero{
          position: relative;
          padding: 132px clamp(16px,5vw,48px) 56px;
          background: #fff;
          text-align: center;
          overflow: hidden;
          isolation: isolate;
        }
        .int-dir-hero::before{
          content: "";
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(15,45,64,.09) 1px, transparent 0);
          background-size: 22px 22px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
          z-index: -2;
        }
        .int-dir-hero::after{
          content: "";
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 18% 15%, rgba(18,163,125,.18), transparent 45%),
            radial-gradient(circle at 82% 20%, rgba(124,92,252,.16), transparent 45%),
            radial-gradient(circle at 50% 100%, rgba(8,145,178,.10), transparent 55%);
          z-index: -1;
          pointer-events: none;
        }
        .int-dir-eyebrow{
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#ecfdf5,#f0fdfa);
          border: 1px solid #a7f3d0;
          padding: 7px 16px; border-radius: 999px;
          font-size: 12.5px; font-weight: 700; color: #065f46;
          margin-bottom: 24px; letter-spacing: .08em;
          text-transform: uppercase;
          box-shadow: 0 1px 2px rgba(6,95,70,.04), inset 0 1px 0 rgba(255,255,255,.7);
        }
        .int-dir-eyebrow::before{
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: #12a37d;
          box-shadow: 0 0 0 3px rgba(18,163,125,.18);
        }
        .int-dir-h1{
          font-size: clamp(30px,5.6vw,56px); font-weight: 800;
          color: #0f2d40; line-height: 1.05; letter-spacing: -0.035em;
          margin: 0 auto 20px; max-width: 920px;
        }
        .int-dir-h1 em{
          font-style: normal;
          background: linear-gradient(120deg,#12a37d 0%,#0891b2 55%,#7c5cfc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .int-dir-sub{
          font-size: clamp(15px,1.6vw,18px); line-height: 1.65;
          color: #475569; max-width: 680px; margin: 0 auto;
          letter-spacing: -0.005em;
        }

        /* ===== Logo strip ===== */
        .int-dir-strip-wrap{
          position: relative;
          padding: 28px clamp(16px,5vw,48px) 48px;
          max-width: 1188px;
          margin: 0 auto;
        }
        .int-dir-strip-label{
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #8fa0ae;
          text-align: center; margin-bottom: 20px;
        }
        .int-dir-strip{
          display: flex; flex-wrap: wrap; justify-content: center;
          align-items: center; gap: 8px 12px;
        }
        .int-dir-strip-item{
          display: inline-flex; align-items: center; justify-content: center;
          width: 56px; height: 56px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #eef2f6;
          padding: 10px;
          transition: all .25s ease;
          filter: grayscale(100%);
          opacity: .55;
        }
        .int-dir-strip-item:hover{
          filter: grayscale(0%);
          opacity: 1;
          border-color: #c8efe2;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(18,163,125,.12);
        }
        .int-dir-strip-item img{
          width: 100%; height: 100%; object-fit: contain;
        }

        /* ===== Count ===== */
        .int-dir-count-wrap{
          padding: 8px clamp(16px,5vw,48px) 0;
          max-width: 1188px; margin: 0 auto;
          text-align: center;
        }
        .int-dir-count{
          display: inline-block;
          font-size: 12px; color: #5a7080; font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          background: #fafbfc;
          border: 1px solid #eef2f6;
          letter-spacing: 0.01em;
        }

        /* ===== Grid ===== */
        .int-dir-grid{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 24px clamp(16px,5vw,48px) 64px;
          max-width: 1188px; margin: 0 auto;
        }
        .int-dir-card{
          position: relative;
          background: #fff;
          border: 1px solid #eef2f6;
          border-radius: 18px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          overflow: hidden;
          isolation: isolate;
        }
        .int-dir-card::before{
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg,#12a37d 0%,#0891b2 50%,#7c5cfc 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform .4s cubic-bezier(.16,1,.3,1);
        }
        .int-dir-card:hover{
          border-color: #d9f0e6;
          transform: translateY(-3px);
          box-shadow: 0 1px 2px rgba(15,45,64,.04), 0 14px 36px rgba(18,163,125,.10);
        }
        .int-dir-card:hover::before{ transform: scaleX(1); }
        .int-dir-card-top{
          display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
        }
        .int-dir-logo{
          width: 56px; height: 56px; object-fit: contain;
          border: 1px solid #eef2f6;
          border-radius: 14px;
          padding: 8px;
          background: #fafbfc;
          flex-shrink: 0;
          box-shadow: inset 0 1px 2px rgba(15,45,64,.03);
          transition: transform .3s ease;
        }
        .int-dir-card:hover .int-dir-logo{ transform: scale(1.04); }
        .int-dir-name-block{ min-width: 0; }
        .int-dir-name{
          font-size: 18px; font-weight: 800;
          color: #0f2d40; line-height: 1.2;
          letter-spacing: -0.015em;
        }
        .int-dir-cat-label{
          font-size: 11px; font-weight: 700;
          color: #12a37d;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .int-dir-tagline{
          font-size: 14px; line-height: 1.7;
          color: #475569; flex: 1;
          margin: 0 0 20px;
          letter-spacing: -0.003em;
        }
        .int-dir-card-foot{
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f1f4f7;
        }
        .int-dir-cat-pill{
          font-size: 11px; font-weight: 700;
          padding: 5px 11px;
          border-radius: 999px;
          background: #f5f8fa;
          border: 1px solid #eef2f6;
          color: #5a7080;
          letter-spacing: 0.01em;
        }

        /* ===== Closing CTA ===== */
        .int-dir-cta-wrap{
          padding: 32px clamp(16px,5vw,48px) 96px;
          max-width: 1188px; margin: 0 auto;
        }
        .int-dir-cta{
          position: relative;
          border-radius: 24px;
          padding: clamp(32px,5vw,56px) clamp(24px,5vw,64px);
          background:
            radial-gradient(ellipse 80% 100% at 0% 0%, rgba(18,163,125,.10), transparent 60%),
            radial-gradient(ellipse 80% 100% at 100% 100%, rgba(124,92,252,.10), transparent 60%),
            linear-gradient(135deg,#f8fefb 0%,#fbfaff 100%);
          border: 1px solid #e4f0ea;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px;
          overflow: hidden;
        }
        .int-dir-cta-text{ flex: 1; min-width: 0; }
        .int-dir-cta-eyebrow{
          display: inline-block;
          font-size: 11.5px; font-weight: 800;
          color: #12a37d;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .int-dir-cta-title{
          font-size: clamp(20px,2.8vw,28px); font-weight: 800;
          color: #0f2d40; line-height: 1.25;
          letter-spacing: -0.025em;
          margin: 0 0 10px;
        }
        .int-dir-cta-body{
          font-size: 15px; line-height: 1.65; color: #475569;
          margin: 0;
          max-width: 640px;
        }
        .int-dir-cta-actions{
          display: flex; flex-direction: column; gap: 12px;
          flex-shrink: 0;
        }
        .int-dir-cta-btn{
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 26px;
          border-radius: 999px;
          background: linear-gradient(135deg,#12a37d 0%,#065f46 100%);
          color: #fff;
          font-size: 14.5px; font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.005em;
          transition: all .25s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 1px 2px rgba(6,95,70,.2), 0 8px 24px rgba(18,163,125,.25);
          min-height: 48px;
        }
        .int-dir-cta-btn:hover{
          transform: translateY(-2px);
          box-shadow: 0 1px 2px rgba(6,95,70,.25), 0 14px 32px rgba(18,163,125,.32);
        }
        .int-dir-cta-btn span{
          transition: transform .25s ease;
        }
        .int-dir-cta-btn:hover span{ transform: translateX(4px); }
        .int-dir-cta-btn-secondary{
          background: #fff;
          color: #0f2d40;
          border: 1px solid #d9e2e8;
          box-shadow: 0 1px 2px rgba(15,45,64,.04);
        }
        .int-dir-cta-btn-secondary:hover{
          border-color: #c8efe2;
          box-shadow: 0 1px 2px rgba(15,45,64,.06), 0 10px 24px rgba(18,163,125,.12);
        }

        /* ===== Responsive ===== */
        @media(max-width:1024px){
          .int-dir-grid{ grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:720px){
          .int-dir-grid{ grid-template-columns: 1fr; gap: 16px; }
          .int-dir-cta{ flex-direction: column; align-items: flex-start; }
          .int-dir-cta-actions{ width: 100%; }
          .int-dir-cta-btn{ width: 100%; }
          .int-dir-strip-item{ width: 48px; height: 48px; padding: 8px; }
        }
      `}</style>

      <Nav lang="en" />

      {/* Hero */}
      <section className="int-dir-hero">
        <div className="int-dir-eyebrow">Integrations</div>
        <h1 className="int-dir-h1">
          Connect Meeton ai to your <em>entire stack</em>
        </h1>
        <p className="int-dir-sub">
          Sync leads, send notifications, and book meetings automatically — using
          the tools your revenue team already lives in. Set up in minutes, not
          weeks.
        </p>
      </section>

      {/* Logo strip */}
      <section className="int-dir-strip-wrap">
        <div className="int-dir-strip-label">
          Trusted with the tools you already use
        </div>
        <div className="int-dir-strip">
          {integrations.map((i) => (
            <span
              key={`strip-${i.slug}`}
              className="int-dir-strip-item"
              aria-label={i.name}
              title={i.name}
            >
              <Image src={i.logo} alt={i.name} width={40} height={40} />
            </span>
          ))}
        </div>
      </section>

      {/* Count */}
      <div className="int-dir-count-wrap">
        <span className="int-dir-count">
          {count} integration{count === 1 ? "" : "s"}
        </span>
      </div>

      {/* Grid */}
      <div className="int-dir-grid">
        {integrations.map((integration) => {
          const content = integration.en;
          return (
            <article key={integration.slug} className="int-dir-card">
              <div className="int-dir-card-top">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={56}
                  height={56}
                  className="int-dir-logo"
                />
                <div className="int-dir-name-block">
                  <div className="int-dir-name">{integration.name}</div>
                  <div className="int-dir-cat-label">{content.categoryLabel}</div>
                </div>
              </div>
              <p className="int-dir-tagline">{content.tagline}</p>
              <div className="int-dir-card-foot">
                <span className="int-dir-cat-pill">{content.categoryLabel}</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Closing CTA */}
      <section className="int-dir-cta-wrap">
        <div className="int-dir-cta">
          <div className="int-dir-cta-text">
            <div className="int-dir-cta-eyebrow">Need something custom?</div>
            <h2 className="int-dir-cta-title">Don&rsquo;t see your tool?</h2>
            <p className="int-dir-cta-body">
              We integrate with anything that has an API — including Zapier, Make,
              and custom webhooks. Start your free trial and connect your stack in
              minutes, or talk to us about a custom setup.
            </p>
          </div>
          <div className="int-dir-cta-actions">
            <Link href="/en/trial/" className="int-dir-cta-btn">
              Start 1-month free trial
              <span>→</span>
            </Link>
            <Link
              href="/en/contact/"
              className="int-dir-cta-btn int-dir-cta-btn-secondary"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <Footer lang="en" />
    </>
  );
}
