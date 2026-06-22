"use client";

import { useEffect, useRef, useState } from "react";

// Embeds a real product-UI demo (self-contained HTML in /public/product/<slug>.html)
// as an <iframe>, absolutely filling its (position:relative) parent media frame.
//
// - Lazy: the iframe src is only set once the frame scrolls into view, so the
//   HTML (and its CSS entrance animation) loads exactly when visible — the demo
//   "builds up" in front of the viewer, matching the old ProductAnim behaviour
//   but with the real UI.
// - prefers-reduced-motion: still loads (the final state is the readable UI);
//   the entrance is a one-shot CSS animation the global reduce-motion guard
//   collapses inside the iframe document is out of our scope, but the frames are
//   self-contained and end on the complete UI either way.
// - sandbox allow-scripts: the demos are self-contained (inline data-URI images,
//   one inline script, no network) so this is safe and blocks any same-origin access.
export default function DemoFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }} aria-label={title} role="img">
      {show && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          sandbox="allow-scripts"
          tabIndex={-1}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
        />
      )}
    </div>
  );
}
