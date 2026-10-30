"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import ProductVisual from "../ProductVisual";
import DeptIcon from "../DeptIcon";
import { catHref, departments, deptHref } from "@/lib/catalog";

// After Aceternity's "Sticky Scroll Reveal": text blocks scroll past while the picture on the right
// stays pinned and changes to match the block in view.
export default function StickyScroll() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const d = departments[active];

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        {departments.map((x, i) => (
          <div key={x.slug} ref={(el) => { refs.current[i] = el; }} data-i={i} style={{ "--tone": x.color } as React.CSSProperties}
            className={`flex min-h-[70vh] flex-col justify-center transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-30"}`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--tone)] text-white"><DeptIcon icon={x.icon} size={24} /></span>
            <p className="mt-5 text-sm font-semibold text-[var(--tone)]">{x.tagline}</p>
            <h3 className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">{x.name}</h3>
            <p className="mt-4 max-w-md text-lg text-mute">{x.blurb}</p>
            <ul className="mt-5 grid max-w-md gap-2 sm:grid-cols-2">
              {x.categories.map((c) => <li key={c.slug}><Link href={catHref(x, c)} className="flex items-center gap-2 text-[15px] hover:text-[var(--tone)]"><Check size={16} className="text-[var(--tone)]" />{c.name}</Link></li>)}
            </ul>
            <Link href={deptHref(x)} className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--tone)] px-5 py-2.5 font-semibold text-white">Shop {x.short} <ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link>
            <ProductVisual kind={x.kind} className="mt-8 aspect-[4/3] rounded-3xl bg-coal lg:hidden" />
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-[20vh] h-[60vh] overflow-hidden rounded-[2rem] transition-colors duration-700"
          style={{ background: `radial-gradient(circle at 50% 40%, color-mix(in oklab, ${d.color} 30%, var(--color-panel)), var(--color-coal))` }}>
          {departments.map((x, i) => (
            <ProductVisual key={x.slug} kind={x.kind}
              className={`absolute inset-[12%] transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i === active ? "scale-100 opacity-100" : i < active ? "-translate-y-16 scale-90 opacity-0" : "translate-y-16 scale-90 opacity-0"}`} />
          ))}
          <p className="absolute bottom-6 left-6 rounded-full bg-panel/90 px-4 py-2 text-sm font-semibold backdrop-blur">{String(active + 1).padStart(2, "0")} / 05 · {d.name}</p>
        </div>
      </div>
    </div>
  );
}
