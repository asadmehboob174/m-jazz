"use client";

import { useEffect, useRef, useState } from "react";

// Calls back once, the first time the element scrolls into view.
function useSeen<T extends HTMLElement>(margin = "0px 0px -60px 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}

// Fades content up the first time it scrolls into view.
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`}
      style={{ transitionDelay: seen ? `${delay}s` : "0s" }}
    >
      {children}
    </div>
  );
}

// Counts up to `to` the first time it is seen.
export function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [ref, seen] = useSeen<HTMLSpanElement>("0px");
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1500);
      setV(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{v.toLocaleString("en-PK", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}
