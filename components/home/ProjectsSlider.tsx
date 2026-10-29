"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import ProductVisual from "../ProductVisual";
import { projects } from "@/lib/data";

const tints = ["bg-stage-blue", "bg-stage-amber", "bg-stage-green"];

export default function ProjectsSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, []);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };

  return (
    <section className="cv container-x py-10 md:py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span aria-hidden="true" className="mb-2.5 block h-1 w-10 rounded-full bg-sun" />
          <h2 className="text-[22px] font-bold tracking-tight md:text-[28px]">Recent projects</h2>
          <p className="mt-1 text-sm text-mute md:mt-1.5 md:text-base">Homes, factories, schools and clinics we have powered and protected</p>
        </div>
        <div className="flex shrink-0 gap-2">
          {([[-1, ChevronLeft, "Previous projects", edge.start], [1, ChevronRight, "Next projects", edge.end]] as const).map(([d, Icon, label, off]) => (
            <button key={label} type="button" aria-label={label} disabled={off} onClick={() => move(d)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition hover:border-brand hover:text-brand disabled:opacity-35 disabled:hover:border-line disabled:hover:text-fg">
              <Icon size={19} />
            </button>
          ))}
        </div>
      </div>

      <div ref={track} onScroll={update} className="swipe -mx-4 mt-5 flex gap-5 overflow-x-auto scroll-smooth px-4 pb-2 md:mt-6 lg:mx-0 lg:px-0">
        {projects.map((pr, n) => (
          <Link key={pr.slug} href={`/projects/${pr.slug}`}
            className="group w-[84%] shrink-0 overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_12px_32px_-16px_rgba(15,23,42,0.3)] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]">
            <div className={`relative aspect-[16/10] ${tints[n % tints.length]}`}>
              <ProductVisual kind={pr.kind} className="h-full w-full transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs font-medium text-soft"><MapPin size={12} />{pr.area}</span>
              <span className="absolute bottom-3 right-3 rounded bg-navy px-2.5 py-1 text-xs font-bold text-white">{pr.outcome[0][0]} {pr.outcome[0][1].toLowerCase()}</span>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-bold group-hover:text-brand">{pr.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mute">{pr.summary}</p>
              <p className="mt-3 text-xs font-semibold text-brand">{pr.meta[2][1]} · {pr.meta[3][1]}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
