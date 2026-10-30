"use client";

import { useEffect } from "react";

// One observer for every [data-reveal] / [data-stagger] element on the page (so server components
// can use reveals with a plain attribute), plus the pointer position for .spot cards.
export default function Effects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.in), [data-stagger]:not(.in)").forEach((el) => io.observe(el));
    scan();
    let raf = 0;
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });

    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });

    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); document.removeEventListener("pointermove", move); };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
