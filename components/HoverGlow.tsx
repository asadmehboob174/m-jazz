"use client";

import { useRef, useState } from "react";

// A soft highlight that slides to whichever card is hovered (like Aceternity's card hover effect).
// Pass a single grid element as the child; each of its direct children is a card.
export default function HoverGlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0, on: false });

  const over = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const grid = ref.current?.lastElementChild;
    let el = e.target as HTMLElement | null;
    while (el && el.parentElement !== grid) el = el.parentElement;
    if (el) setBox({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, on: true });
  };

  return (
    <div ref={ref} onPointerOver={over} onPointerLeave={() => setBox((b) => ({ ...b, on: false }))} className="relative">
      <div aria-hidden="true"
        className="pointer-events-none absolute rounded-3xl bg-[color-mix(in_oklab,var(--color-brand)_16%,transparent)] transition-all duration-300 ease-out"
        style={{ left: box.x - 8, top: box.y - 8, width: box.w + 16, height: box.h + 16, opacity: box.on ? 1 : 0 }} />
      {children}
    </div>
  );
}
