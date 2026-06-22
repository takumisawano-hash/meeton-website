"use client";

import { useEffect, useRef, useState } from "react";

// Embeds a real product-UI demo (self-contained HTML in /public/product/<slug>.html)
// as an <iframe> that auto-sizes to its content height — the demos are responsive
// and their natural height varies with width, so a fixed aspect-ratio frame
// clipped the bottom. We read the (same-origin) content height and set the iframe
// height to it, re-measuring on load / resize / content mutation. No clip, no
// letterbox: the frame is exactly as tall as the demo at the current width.
//
// - Lazy: src is set only once the frame scrolls into view, so the HTML + its CSS
//   entrance animation load (and "build up") right when the visitor sees it.
// - sandbox "allow-scripts allow-same-origin": first-party content; allow-same-origin
//   is required both so the framing policy accepts it (X-Frame-Options SAMEORIGIN /
//   CSP frame-ancestors 'self') and so we can read contentDocument height. top-nav,
//   forms and popups stay sandboxed.
export default function DemoFrame({ src, title }: { src: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [show, setShow] = useState(false);
  const [h, setH] = useState<number | null>(null);

  // load when scrolled into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // measure content height (same-origin) and keep it synced
  useEffect(() => {
    if (!show) return;
    const ifr = frameRef.current;
    if (!ifr) return;
    let ro: ResizeObserver | undefined;
    const measure = () => {
      try {
        const doc = ifr.contentDocument || ifr.contentWindow?.document;
        if (!doc?.body) return;
        // Measure the demo's STAGE element (body's first child), not body/
        // documentElement scrollHeight: the demo body uses min-height:100vh so
        // its scrollHeight just echoes the iframe height (circular lock → stuck
        // at the fallback). The stage child is content-sized, giving the real
        // reflowed height at the current width → frame fits exactly, no gap.
        const stage = doc.body.firstElementChild as HTMLElement | null;
        const ch = stage
          ? Math.ceil(stage.getBoundingClientRect().height)
          : Math.max(doc.documentElement?.scrollHeight || 0, doc.body.scrollHeight || 0);
        if (ch > 0) setH(ch);
      } catch {
        /* cross-origin guard — shouldn't happen with allow-same-origin */
      }
    };
    const onLoad = () => {
      measure();
      try {
        const doc = ifr.contentDocument;
        const stage = (doc?.body?.firstElementChild as HTMLElement | null) || doc?.body;
        if (stage && typeof ResizeObserver !== "undefined") {
          ro = new ResizeObserver(measure);
          ro.observe(stage);
        }
      } catch {
        /* ignore */
      }
      // re-measure after fonts / entrance animation settle
      setTimeout(measure, 300);
      setTimeout(measure, 1200);
    };
    ifr.addEventListener("load", onLoad);
    if (ifr.contentDocument?.readyState === "complete") onLoad();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      ifr.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [show]);

  return (
    <div ref={wrapRef} style={{ width: "100%" }} role="img" aria-label={title}>
      {show && (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={-1}
          style={{ display: "block", width: "100%", height: h ? `${h}px` : "460px", border: 0 }}
        />
      )}
    </div>
  );
}
