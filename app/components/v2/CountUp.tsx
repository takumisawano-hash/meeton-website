"use client";

import { useEffect, useRef, useState } from "react";

// Stat number that counts 0 → `to` ONCE when it first scrolls into view.
// Server HTML and prefers-reduced-motion render the final value immediately,
// so AI crawlers / no-JS readers (§4.16) never see a zero. tabular-nums keeps
// the digit width stable while counting.
export default function CountUp({ to, duration = 1000 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || played.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {val}
    </span>
  );
}
