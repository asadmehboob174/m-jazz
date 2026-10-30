"use client";

import Link from "next/link";
import { useState } from "react";
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

  return (
    <section className="cv container-x py-10 md:py-14" style={{ "--tone": d.color } as React.CSSProperties}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading eyebrow="Shop online, confirm on WhatsApp" title="Featured products" />
        <div role="tablist" aria-label="Departments" className="swipe -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:w-auto md:px-0">
          {departments.map((x, n) => (
            <button key={x.slug} role="tab" aria-selected={n === tab} type="button" onClick={() => setTab(n)} style={{ "--tone": x.color } as React.CSSProperties}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${n === tab ? "border-[var(--tone)] bg-[var(--tone)] text-white shadow-[0_8px_18px_-8px_var(--tone)]" : "border-line bg-panel text-soft hover:border-[var(--tone)] hover:text-[var(--tone)]"}`}>
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
