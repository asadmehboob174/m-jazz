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

    let tilted: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.<HTMLElement>(".spot");
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      // 3D tilt (mouse only), reset when the pointer leaves the card
      const t = e.pointerType === "mouse" ? target?.closest?.<HTMLElement>(".tilt") ?? null : null;
      if (tilted && tilted !== t) { tilted.style.removeProperty("--rx"); tilted.style.removeProperty("--ry"); }
      tilted = t;
      if (t) {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
        t.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
      }
    };
    document.addEventListener("pointermove", move, { passive: true });

    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); document.removeEventListener("pointermove", move); };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
