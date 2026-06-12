"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// AnimGate — play-on-visible wrapper for the ProductAnim mock scenes.
// The scenes are appear-once CSS animations; ungated they start at page load
// and are already finished by the time the visitor scrolls to them.
//
// How it works (styling for .v2ag/.armed/.play lives in ProductAnim):
// - SSR sends the scene un-gated → no-JS browsers / crawlers see the finished,
//   readable scene (the .ap default state is the final one).
// - The inline <script> runs during HTML parse — before first paint — adding
//   .armed (hides elements, pauses animations) and observing visibility, so
//   gating works even before React hydrates. React never executes inline
//   scripts it mounts client-side, so this only runs on real SSR loads.
// - .play is added at first visibility (threshold .35) and never removed —
//   the scene plays once and stays on its final frame, no restart spam.
// - The effect covers client-side navigations (where the inline script does
//   not execute); duplicate observers are harmless — classList.add is
//   idempotent and each observer disconnects after firing.
const GATE_SCRIPT =
  '(function(s){var e=s.parentElement;if(!e)return;e.classList.add("armed");' +
  'if(!("IntersectionObserver"in window)){e.classList.add("play");return}' +
  'var o=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting){e.classList.add("play");o.disconnect();return}}},{threshold:.35});' +
  "o.observe(e)})(document.currentScript)";

export default function AnimGate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("armed");
    if (el.classList.contains("play")) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("play");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("play");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="v2ag" suppressHydrationWarning>
      {children}
      <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />
    </div>
  );
}

// Reduced-motion-aware product video (the <video> branch of StageMedia /
// ProductMedia). Autoplay is driven imperatively after checking
// prefers-reduced-motion — reduced-motion users get the first frame with
// controls instead of an autoplaying loop. No autoPlay attribute in the SSR
// markup, so the video never starts before the preference is known.
export function MotionSafeVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced) v.pause();
    else v.play().catch(() => {}); // autoplay blocked → first frame stays
  }, [reduced]);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
