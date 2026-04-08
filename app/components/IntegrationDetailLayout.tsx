import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { Integration } from "@/lib/integrations-data";
import Image from "next/image";
import Link from "next/link";

type Props = {
  integration: Integration;
  lang: "en" | "ja";
};

const strings = {
  en: {
    breadcrumbRoot: "Integrations",
    breadcrumbRootHref: "/integrations",
    howToInstall: "How to install",
    troubleshootingLinkText: "Contact support",
    usageAndPrereqs: "Usage & Prerequisites",
    prerequisites: "Prerequisites:",
    featuresAndUseCases: "Features & Use Cases",
    howToUninstall: "Removing the App",
    implications: "Implications of removal:",
    dataHandlingTitle: "How your data is handled:",
    developer: "Developer",
    developerName: "DynaMeet K.K.",
    website: "Website",
    support: "Support",
    supportLabel: "Contact support",
    privacyPolicy: "Privacy policy",
    privacyPolicyLabel: "View policy",
    langChip: "日本語",
    langHrefBase: "/ja/integrations",
  },
  ja: {
    breadcrumbRoot: "連携一覧",
    breadcrumbRootHref: "/ja/integrations",
    howToInstall: "導入手順",
    troubleshootingLinkText: "サポートに問い合わせる",
    usageAndPrereqs: "使い方と前提条件",
    prerequisites: "前提条件：",
    featuresAndUseCases: "機能と利用シナリオ",
    howToUninstall: "アプリの削除",
    implications: "削除後の影響：",
    dataHandlingTitle: "データの取り扱い：",
    developer: "開発元",
    developerName: "DynaMeet株式会社",
    website: "ウェブサイト",
    support: "サポート",
    supportLabel: "サポートに問い合わせる",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyLabel: "ポリシーを確認する",
    langChip: "EN",
    langHrefBase: "/integrations",
  },
};

export default function IntegrationDetailLayout({ integration, lang }: Props) {
  const s = strings[lang];
  const content = lang === "en" ? integration.en : integration.ja;
  const langSwitchHref = `${s.langHrefBase}/${integration.slug}`;

  return (
    <>
      <style>{`
        .int-detail-wrap{
          max-width: 1100px; margin: 0 auto;
          padding: 100px clamp(16px,5vw,48px) 80px;
        }
        .int-detail-breadcrumb{
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600; color: #8fa0ae;
          margin-bottom: 32px; flex-wrap: wrap;
        }
        .int-detail-breadcrumb a{
          color: #12a37d; text-decoration: none;
        }
        .int-detail-breadcrumb a:hover{ text-decoration: underline; }
        .int-detail-grid{
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px; align-items: start;
        }
        .int-detail-header{
          display: flex; align-items: center; gap: 20px; margin-bottom: 28px;
        }
        .int-detail-logo{
          border: 1.5px solid #e4eaef; border-radius: 14px;
          padding: 8px; background: #f8fafb; flex-shrink: 0;
          object-fit: contain;
        }
        .int-detail-name{ font-size: clamp(28px,5vw,42px); font-weight: 900; color: #0f2d40; line-height: 1.2; }
        .int-detail-cat{
          font-size: 11px; font-weight: 700; color: #12a37d;
          display: inline-flex; align-items: center;
          background: #ecfdf5; border: 1px solid #a7f3d0;
          padding: 3px 10px; border-radius: 10px; white-space: nowrap;
        }
        .int-detail-desc{
          font-size: 17px; line-height: 1.85; color: #3d5566; margin-bottom: 40px;
        }
        .int-detail-steps-label{
          font-size: 12px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #12a37d; margin-bottom: 20px;
        }
        .int-detail-steps{ display: flex; flex-direction: column; gap: 0; }
        .int-detail-step{
          display: flex; align-items: flex-start; gap: 16px;
          position: relative; padding-bottom: 20px;
        }
        .int-detail-step:last-child{ padding-bottom: 0; }
        .int-detail-step:not(:last-child)::before{
          content: ''; position: absolute;
          left: 17px; top: 36px; bottom: 0; width: 1.5px;
          background: linear-gradient(180deg,#a7f3d0 0%,transparent 100%);
        }
        .int-detail-step-num{
          width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
          background: #ecfdf5; border: 1.5px solid #a7f3d0;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; color: #12a37d;
        }
        .int-detail-step-text{
          font-size: 16px; line-height: 1.75; color: #3d5566;
          padding-top: 6px;
        }
        /* Sidebar */
        .int-detail-sidebar{
          background: #f8fafb; border: 1.5px solid #e4eaef;
          border-radius: 16px; padding: 28px; box-sizing: border-box;
          position: sticky; top: 100px;
        }
        .int-detail-cta{
          display: block; width: 100%; padding: 14px 20px;
          box-sizing: border-box;
          background: linear-gradient(135deg,#12a37d,#0fc19a);
          color: #fff; border: none; border-radius: 10px;
          font-size: 16px; font-weight: 700; text-align: center;
          text-decoration: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(18,163,125,.25);
          transition: all .25s; margin-bottom: 24px;
        }
        .int-detail-cta:hover{
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(18,163,125,.3);
        }
        .int-detail-divider{
          border: none; border-top: 1px solid #e4eaef; margin: 0 0 16px;
        }
        .int-detail-meta{ display: flex; flex-direction: column; gap: 0; }
        .int-detail-meta-row{
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 11px 0; border-bottom: 1px solid #f0f2f5;
        }
        .int-detail-meta-row:last-child{ border-bottom: none; padding-bottom: 0; }
        .int-detail-meta-label{
          font-size: 12px; font-weight: 600; color: #8fa0ae; flex-shrink: 0;
        }
        .int-detail-meta-value{
          font-size: 14px; font-weight: 700; color: #3d5566; text-align: right;
        }
        .int-detail-meta-value a{
          color: #12a37d; text-decoration: none;
        }
        .int-detail-meta-value a:hover{ text-decoration: underline; }
        .int-detail-lang-chip{
          display: inline-flex; align-items: center;
          padding: 5px 14px; border-radius: 8px; font-size: 13px;
          font-weight: 700; color: #3d5566; border: 1.5px solid #e4eaef;
          background: #fff; text-decoration: none; transition: all .2s;
        }
        .int-detail-lang-chip:hover{ border-color: #12a37d; color: #12a37d; }
        /* Install note (troubleshooting) */
        .int-detail-install-note{
          font-size: 14px; color: #5a7080; font-style: italic;
          margin-top: 16px; line-height: 1.6;
        }
        .int-detail-install-note a{ color: #12a37d; text-decoration: none; }
        .int-detail-install-note a:hover{ text-decoration: underline; }
        /* Usage & Prerequisites section */
        .int-detail-prereq-block{
          margin-top: 40px; padding: 20px 24px;
          background: #f0fdf9; border: 1.5px solid #a7f3d0;
          border-radius: 12px;
        }
        .int-detail-prereq-prereq{
          font-size: 15px; color: #3d5566; margin-bottom: 16px; line-height: 1.7;
        }
        .int-detail-prereq-prereq strong{ color: #0f2d40; }
        .int-detail-use-cases{ display: flex; flex-direction: column; gap: 12px; }
        .int-detail-use-case{
          background: #fff; border: 1px solid #d1fae5;
          border-radius: 8px; padding: 14px 16px;
        }
        .int-detail-use-case-title{
          font-size: 14px; font-weight: 700; color: #12a37d; margin-bottom: 6px;
        }
        .int-detail-use-case-desc{
          font-size: 14px; color: #3d5566; line-height: 1.7;
        }
        /* Post-uninstall notes */
        .int-detail-uninstall-note{
          margin-top: 20px; padding: 14px 16px;
          background: #fef9ec; border: 1px solid #fde68a;
          border-radius: 8px; font-size: 14px; color: #3d5566; line-height: 1.7;
        }
        .int-detail-uninstall-note strong{ color: #0f2d40; }
        @media(max-width:860px){
          .int-detail-grid{
            grid-template-columns: 1fr;
          }
          .int-detail-sidebar{ position: static; }
        }
        @media(max-width:600px){
          .int-detail-wrap{ padding-top: 80px; }
          .int-detail-name{ font-size: 28px; }
          .int-detail-desc{ font-size: 15px; }
          .int-detail-step-text{ font-size: 15px; }
        }
      `}</style>

      <div
        style={{
          background: "linear-gradient(180deg,#f0fdf9 0%,#fff 300px)",
          minHeight: "100vh",
        }}
      >
        <Nav langSwitchHref={langSwitchHref} langSwitchLabel={s.langChip} />

        <main className="int-detail-wrap">
          {/* Breadcrumb */}
          <div className="int-detail-breadcrumb">
            <Link href={s.breadcrumbRootHref}>{s.breadcrumbRoot}</Link>
            <span>›</span>
            <span style={{ color: "#3d5566" }}>{integration.name}</span>
          </div>

          <div className="int-detail-grid">
            {/* Left column */}
            <div>
              <div className="int-detail-header">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={64}
                  height={64}
                  className="int-detail-logo"
                />
                <div>
                  <h1 className="int-detail-name">
                    {integration.name} Integration
                  </h1>
                </div>
              </div>

              <p className="int-detail-desc">{content.description}</p>

              <div className="int-detail-steps-label">{s.howToInstall}</div>
              <ol
                className="int-detail-steps"
                style={{ listStyle: "none", margin: 0, padding: 0 }}
              >
                {content.steps.map((step, i) => (
                  <li key={i} className="int-detail-step">
                    <div className="int-detail-step-num">{i + 1}</div>
                    <div className="int-detail-step-text">{step}</div>
                  </li>
                ))}
              </ol>

              {content.installNote && (
                <p className="int-detail-install-note">
                  {content.installNote}{" "}
                  <a
                    href={integration.links.support}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.troubleshootingLinkText}
                  </a>
                  .
                </p>
              )}

              {(content.prerequisites ||
                (content.useCases && content.useCases.length > 0)) && (
                <div className="int-detail-prereq-block">
                  <div
                    className="int-detail-steps-label"
                    style={{ marginBottom: 12 }}
                  >
                    {s.usageAndPrereqs}
                  </div>
                  {content.prerequisites && (
                    <p className="int-detail-prereq-prereq">
                      <strong>{s.prerequisites}</strong> {content.prerequisites}
                    </p>
                  )}
                  {content.useCases && content.useCases.length > 0 && (
                    <>
                      <div
                        className="int-detail-steps-label"
                        style={{ marginBottom: 12 }}
                      >
                        {s.featuresAndUseCases}
                      </div>
                      <div className="int-detail-use-cases">
                        {content.useCases.map((uc, i) => (
                          <div key={i} className="int-detail-use-case">
                            <div className="int-detail-use-case-title">
                              {uc.title}
                            </div>
                            <div className="int-detail-use-case-desc">
                              {uc.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="int-detail-steps-label" style={{ marginTop: 40 }}>
                {s.howToUninstall}
              </div>
              <ol
                className="int-detail-steps"
                style={{ listStyle: "none", margin: 0, padding: 0 }}
              >
                {content.uninstallSteps.map((step, i) => (
                  <li key={i} className="int-detail-step">
                    <div className="int-detail-step-num">{i + 1}</div>
                    <div className="int-detail-step-text">{step}</div>
                  </li>
                ))}
              </ol>

              {content.uninstallImplications && (
                <div className="int-detail-uninstall-note">
                  <strong>{s.implications}</strong>{" "}
                  {content.uninstallImplications}
                </div>
              )}

              {content.dataHandling && (
                <div
                  className="int-detail-uninstall-note"
                  style={{ marginTop: 10 }}
                >
                  <strong>{s.dataHandlingTitle}</strong> {content.dataHandling}
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <aside className="int-detail-sidebar">
              <a
                href={integration.links.cta}
                target="_blank"
                rel="noopener noreferrer"
                className="int-detail-cta"
              >
                {content.ctaText}
              </a>
              <hr className="int-detail-divider" />
              <div className="int-detail-meta">
                <div className="int-detail-meta-row">
                  <span className="int-detail-meta-label">{s.developer}</span>
                  <span className="int-detail-meta-value">
                    {s.developerName}
                  </span>
                </div>
                <div className="int-detail-meta-row">
                  <span className="int-detail-meta-label">{s.website}</span>
                  <span className="int-detail-meta-value">
                    <a
                      href={integration.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {new URL(integration.links.website).hostname.replace(
                        /^www\./,
                        "",
                      )}
                    </a>
                  </span>
                </div>
                <div className="int-detail-meta-row">
                  <span className="int-detail-meta-label">{s.support}</span>
                  <span className="int-detail-meta-value">
                    <a
                      href={integration.links.support}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.supportLabel}
                    </a>
                  </span>
                </div>
                <div className="int-detail-meta-row">
                  <span className="int-detail-meta-label">
                    {s.privacyPolicy}
                  </span>
                  <span className="int-detail-meta-value">
                    <a
                      href={integration.links.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.privacyPolicyLabel}
                    </a>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
