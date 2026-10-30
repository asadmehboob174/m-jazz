"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import DeptIcon from "../DeptIcon";
import ProductCard from "../ProductCard";
import { Heading } from "../SectionHead";
import { departments, deptHref } from "@/lib/catalog";
import { inDept } from "@/lib/data";

// Featured products, one tab per department.
export default function ProductTabs() {
  const [tab, setTab] = useState(0);
  const d = departments[tab];
  const list = inDept(d.slug).slice(0, 8);
  // Sliding pill behind the active tab (after Aceternity's animated tabs)
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const place = () => { const b = tabs.current[tab]; if (b) setPill({ x: b.offsetLeft, w: b.offsetWidth }); };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [tab]);

  return (
    <section className="cv container-x py-10 md:py-14" style={{ "--tone": d.color } as React.CSSProperties}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading eyebrow="Shop online, confirm on WhatsApp" title="Featured products" />
        <div role="tablist" aria-label="Departments" className="swipe relative -mx-4 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto px-4 py-1 md:mx-0 md:w-auto md:rounded-full md:border md:border-line md:bg-panel md:p-1">
          <span aria-hidden="true" className="absolute top-1 bottom-1 rounded-full bg-[var(--tone)] shadow-[0_8px_18px_-8px_var(--tone)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ left: pill.x, width: pill.w }} />
          {departments.map((x, n) => (
            <button key={x.slug} ref={(el) => { tabs.current[n] = el; }} role="tab" aria-selected={n === tab} type="button" onClick={() => setTab(n)} style={{ "--tone": x.color } as React.CSSProperties}
              className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${n === tab ? "text-white" : "text-soft hover:text-[var(--tone)]"}`}>
              <DeptIcon icon={x.icon} size={16} />{x.short}
            </button>
          ))}
        </div>
      </div>
      <div key={d.slug} role="tabpanel" data-stagger className="mt-6 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
      <div className="mt-7 text-center">
        <Link href={deptHref(d)} className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--tone)] px-6 py-2.5 font-semibold text-[var(--tone)] transition hover:bg-[var(--tone)] hover:text-white">
          View all {d.name} <ArrowRight size={17} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
