"use client";

import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { IntegrationCategory, integrations } from "@/lib/integrations-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  lang: "en" | "ja";
};

type FilterKey = "all" | IntegrationCategory;

const enFilters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "crm", label: "CRM" },
  { key: "notify", label: "Notifications" },
  { key: "calendar", label: "Calendar" },
  { key: "meeting", label: "Meetings" },
];

const jaFilters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "crm", label: "CRM連携" },
  { key: "notify", label: "通知" },
  { key: "calendar", label: "カレンダー" },
  { key: "meeting", label: "Web会議" },
];

export default function IntegrationDirectoryClient({ lang }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const filters = lang === "en" ? enFilters : jaFilters;
  const basePath = lang === "en" ? "/integrations" : "/ja/integrations";

  const visible = integrations.filter(
    (i) => activeFilter === "all" || i.category === activeFilter,
  );

  const copy = {
    en: {
      eyebrow: "Integrations",
      h1: "Connect Meeton ai to your favorite tools",
      subtitle:
        "Sync leads, send notifications, and book meetings automatically — using the tools your team already uses.",
      count: (n: number) => `${n} integration${n === 1 ? "" : "s"}`,
      viewLink: "View →",
      langChip: "日本語",
      langHref: "/ja/integrations",
    },
    ja: {
      eyebrow: "連携",
      h1: "Meeton aiを主要ツールと連携",
      subtitle:
        "リード同期・通知・商談予約を自動化。今すぐ使い始められる連携が揃っています。",
      count: (n: number) => `${n}件の連携`,
      viewLink: "詳細を見る →",
      langChip: "EN",
      langHref: "/integrations",
    },
  }[lang];

  return (
    <>
      <style>{`
        .int-dir-hero{
          padding: 120px clamp(16px,5vw,48px) 60px;
          background: linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#fff 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .int-dir-eyebrow{
          display: inline-flex; align-items: center; gap: 8px;
          background: #ecfdf5; border: 1px solid #a7f3d0;
          padding: 6px 18px; border-radius: 20px;
          font-size: 13px; font-weight: 700; color: #12a37d;
          margin-bottom: 24px; letter-spacing: .5px;
        }
        .int-dir-h1{
          font-size: clamp(28px,6vw,52px); font-weight: 900;
          color: #0f2d40; line-height: 1.2; letter-spacing: -1.5px;
          margin-bottom: 18px;
        }
        .int-dir-sub{
          font-size: clamp(15px,2.5vw,19px); line-height: 1.85;
          color: #3d5566; max-width: 600px; margin: 0 auto;
        }
        .int-dir-filters{
          display: flex; align-items: center; gap: 10px;
          flex-wrap: wrap; padding: 0 clamp(16px,5vw,48px);
          max-width: 1188px; margin: 0 auto 32px;
        }
        .int-dir-pill{
          padding: 8px 20px; border-radius: 20px; font-size: 14px;
          font-weight: 700; cursor: pointer; border: 2px solid #e4eaef;
          background: #fff; color: #3d5566; transition: all .2s;
        }
        .int-dir-pill:hover{ border-color: #12a37d; color: #12a37d; }
        .int-dir-pill.active{
          background: #12a37d; border-color: #12a37d; color: #fff;
        }
        .int-dir-count{
          margin-left: auto; font-size: 13px; color: #8fa0ae; font-weight: 600;
        }
        .int-dir-grid{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 clamp(16px,5vw,48px) 80px;
          max-width: 1188px; margin: 0 auto;
        }
        .int-dir-card{
          background: #fff; border: 1.5px solid #e4eaef; border-radius: 16px;
          padding: 28px; text-decoration: none; display: flex;
          flex-direction: column; transition: all .3s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 2px 8px rgba(0,0,0,.03);
        }
        .int-dir-card:hover{
          border-color: #12a37d; transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(18,163,125,.1);
        }
        .int-dir-card-top{
          display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
        }
        .int-dir-logo{
          width: 40px; height: 40px; object-fit: contain;
          border: 1px solid #e4eaef; border-radius: 10px; padding: 4px;
          background: #f8fafb; flex-shrink: 0;
        }
        .int-dir-name{ font-size: 17px; font-weight: 800; color: #0f2d40; }
        .int-dir-cat-label{
          font-size: 12px; font-weight: 700; color: #12a37d; margin-top: 2px;
        }
        .int-dir-tagline{
          font-size: 14px; line-height: 1.7; color: #5a7080; flex: 1;
          margin-bottom: 20px;
        }
        .int-dir-card-foot{
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 16px; border-top: 1px solid #e4eaef;
        }
        .int-dir-cat-pill{
          font-size: 11px; font-weight: 700; padding: 4px 12px;
          border-radius: 12px; background: #f8fafb; border: 1px solid #e4eaef;
          color: #5a7080;
        }
        .int-dir-view-link{
          font-size: 13px; font-weight: 800; color: #12a37d;
        }
        .int-dir-lang-chip{
          display: inline-flex; align-items: center;
          padding: 5px 14px; border-radius: 8px; font-size: 13px;
          font-weight: 700; color: #3d5566; border: 1.5px solid #e4eaef;
          background: #fff; text-decoration: none; transition: all .2s;
        }
        .int-dir-lang-chip:hover{ border-color: #12a37d; color: #12a37d; }
        @media(max-width:900px){
          .int-dir-grid{ grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:600px){
          .int-dir-grid{ grid-template-columns: 1fr; }
          .int-dir-count{ margin-left: 0; width: 100%; }
        }
      `}</style>

      <Nav langSwitchHref={copy.langHref} langSwitchLabel={copy.langChip} />

      {/* Hero */}
      <section className="int-dir-hero">
        <div className="int-dir-eyebrow">{copy.eyebrow}</div>
        <h1 className="int-dir-h1">{copy.h1}</h1>
        <p className="int-dir-sub">{copy.subtitle}</p>
      </section>

      {/* Filters */}
      <div className="int-dir-filters" style={{ paddingTop: 32 }}>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`int-dir-pill${activeFilter === f.key ? " active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <span className="int-dir-count">{copy.count(visible.length)}</span>
      </div>

      {/* Grid */}
      <div className="int-dir-grid">
        {visible.map((integration) => {
          const content = lang === "en" ? integration.en : integration.ja;
          return (
            <Link
              key={integration.slug}
              href={`${basePath}/${integration.slug}`}
              className="int-dir-card"
            >
              <div className="int-dir-card-top">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={40}
                  height={40}
                  className="int-dir-logo"
                />
                <div>
                  <div className="int-dir-name">{integration.name}</div>
                  <div className="int-dir-cat-label">
                    {content.categoryLabel}
                  </div>
                </div>
              </div>
              <p className="int-dir-tagline">{content.tagline}</p>
              <div className="int-dir-card-foot">
                <span className="int-dir-cat-pill">
                  {content.categoryLabel}
                </span>
                <span className="int-dir-view-link">{copy.viewLink}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
