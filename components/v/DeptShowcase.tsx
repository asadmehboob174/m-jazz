"use client";

import Link from "next/link";
import { useState } from "react";
import ProductVisual from "../ProductVisual";
import { departments, deptHref } from "@/lib/catalog";

// Big segmented control that swaps a large department showcase (Design 5).
export default function DeptShowcase() {
  const [i, setI] = useState(0);
  const d = departments[i];
  return (
    <div style={{ "--tone": d.color } as React.CSSProperties}>
      <div role="tablist" className="swipe mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-coal p-1">
        {departments.map((x, n) => (
          <button key={x.slug} role="tab" aria-selected={n === i} type="button" onClick={() => setI(n)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${n === i ? "bg-panel text-fg shadow" : "text-mute hover:text-fg"}`}>{x.short}</button>
        ))}
      </div>
      <div key={d.slug} className="mt-10 grid items-center gap-8 md:grid-cols-2">
        <div className="animate-[rv-up_.6s_cubic-bezier(.22,1,.36,1)_both] text-center md:text-left">
          <p className="text-sm font-semibold text-[var(--tone)]">{d.tagline}</p>
          <h3 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{d.name}</h3>
          <p className="mx-auto mt-4 max-w-md text-lg text-mute md:mx-0">{d.blurb}</p>
          <div className="mt-6 flex justify-center gap-6 md:justify-start">
            <Link href={deptHref(d)} className="rounded-full bg-[var(--tone)] px-5 py-2.5 text-sm font-medium text-white">Shop {d.short}</Link>
            <Link href="/services" className="py-2.5 text-sm font-medium text-[var(--tone)] hover:underline">Learn more ›</Link>
          </div>
        </div>
        <ProductVisual kind={d.kind} className="aspect-square animate-[rv-zoom_.7s_cubic-bezier(.22,1,.36,1)_both] rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--tone)_14%,var(--color-panel)),var(--color-coal))]" />
      </div>
    </div>
  );
}
