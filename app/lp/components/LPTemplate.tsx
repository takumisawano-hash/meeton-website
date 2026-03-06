'use client'

import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

type LPSection = {
  type: 'hero' | 'problem' | 'solution' | 'features' | 'testimonial' | 'cta'
  title?: string
  subtitle?: string
  content?: string
  items?: { icon: string; title: string; description: string }[]
  ctaText?: string
  ctaLink?: string
  image?: string
}

type LPTemplateProps = {
  sections: LPSection[]
  noNav?: boolean
  noFooter?: boolean
}

const css = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;
  --fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px}

.lp-hero{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:120px 48px 80px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%);text-align:center}
.lp-hero-inner{max-width:800px}
.lp-hero h1{font-size:clamp(36px,6vw,64px);font-weight:900;color:var(--heading);line-height:1.15;margin-bottom:24px}
.lp-hero p{font-size:clamp(16px,3vw,22px);color:var(--sub);line-height:1.8;margin-bottom:40px}
.lp-cta{display:inline-block;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:18px 48px;border-radius:12px;font-size:18px;font-weight:700;text-decoration:none;box-shadow:0 6px 28px var(--cta-glow);transition:all .25s}
.lp-cta:hover{transform:translateY(-2px);box-shadow:0 10px 36px var(--cta-glow)}

.lp-section{padding:80px 48px}
.lp-section-inner{max-width:1100px;margin:0 auto}
.lp-section h2{font-size:clamp(28px,4vw,42px);font-weight:900;color:var(--heading);margin-bottom:20px;text-align:center}
.lp-section p{font-size:18px;color:var(--sub);line-height:1.8;text-align:center;max-width:700px;margin:0 auto 40px}

.lp-features{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.lp-feature{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:32px;transition:all .3s}
.lp-feature:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(18,163,125,.08)}
.lp-feature-icon{font-size:40px;margin-bottom:16px}
.lp-feature h3{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:10px}
.lp-feature p{font-size:16px;color:var(--sub);line-height:1.7;text-align:left}

.lp-problem{background:var(--surface)}
.lp-solution{background:linear-gradient(135deg,var(--cta-light),var(--accent-light))}

.lp-cta-section{background:linear-gradient(135deg,var(--heading),#1a1f4d);color:#fff;text-align:center;padding:100px 48px}
.lp-cta-section h2{color:#fff}
.lp-cta-section p{color:rgba(255,255,255,.8)}

@media(max-width:768px){
  .lp-hero,.lp-section,.lp-cta-section{padding:60px 24px}
}
`

export default function LPTemplate({ sections, noNav = false, noFooter = false }: LPTemplateProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {!noNav && <Nav />}
      
      {sections.map((section, i) => {
        switch (section.type) {
          case 'hero':
            return (
              <section key={i} className="lp-hero">
                <div className="lp-hero-inner">
                  <h1>{section.title}</h1>
                  <p>{section.subtitle}</p>
                  {section.ctaText && (
                    <a href={section.ctaLink || '#'} className="lp-cta">{section.ctaText}</a>
                  )}
                </div>
              </section>
            )
          
          case 'problem':
            return (
              <section key={i} className="lp-section lp-problem">
                <div className="lp-section-inner">
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              </section>
            )
          
          case 'solution':
            return (
              <section key={i} className="lp-section lp-solution">
                <div className="lp-section-inner">
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              </section>
            )
          
          case 'features':
            return (
              <section key={i} className="lp-section">
                <div className="lp-section-inner">
                  <h2>{section.title}</h2>
                  <p>{section.subtitle}</p>
                  <div className="lp-features">
                    {section.items?.map((item, j) => (
                      <div key={j} className="lp-feature">
                        <div className="lp-feature-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          
          case 'cta':
            return (
              <section key={i} className="lp-cta-section">
                <div className="lp-section-inner">
                  <h2>{section.title}</h2>
                  <p>{section.subtitle}</p>
                  {section.ctaText && (
                    <a href={section.ctaLink || '#'} className="lp-cta">{section.ctaText}</a>
                  )}
                </div>
              </section>
            )
          
          default:
            return null
        }
      })}
      
      {!noFooter && <Footer />}
    </>
  )
}
