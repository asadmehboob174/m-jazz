import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import DeptIcon from "../DeptIcon";
import ProductVisual from "../ProductVisual";
import { Heading } from "../SectionHead";
import FlipWords from "../FlipWords";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { formatPKR, inCat, inDept } from "@/lib/data";

// The five divisions as a bento grid: one big card for Solar & Power, four around it.
export default function Solutions() {
  return (
    <section className="container-x py-10 md:py-14">
      <Heading eyebrow="Complete technology solutions under one roof" title={<>One trusted team for <br className="sm:hidden" /><FlipWords className="text-brand" words={["solar systems", "CCTV & security", "smart classrooms", "UPS & batteries", "EV chargers", "event rentals", "repairs"]} /></>} sub="Five divisions. One call. Sales, installation and after-sales service." />
      <div className="sv-zoom mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-3 lg:grid-rows-2" data-stagger="zoom">
        {departments.map((d, n) => {
          const big = n === 0;
          const from = Math.min(...(big ? inCat("solar-packages") : inDept(d.slug)).flatMap((p) => (p.price ? [p.price] : [])));
          return (
            <div key={d.slug} style={{ "--tone": d.color } as React.CSSProperties}
              className={`spot group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-[linear-gradient(150deg,color-mix(in_oklab,var(--tone)_9%,var(--color-panel)),var(--color-panel)_60%)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--tone)] hover:shadow-[0_20px_44px_-20px_color-mix(in_oklab,var(--tone)_55%,transparent)] sm:p-6 ${big ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--tone)] text-white shadow-[0_8px_20px_-8px_var(--tone)] transition duration-500 group-hover:rotate-[-10deg] group-hover:scale-110">
                  <DeptIcon icon={d.icon} size={24} />
                </span>
                <Link href={deptHref(d)} aria-label={`Shop ${d.name}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-soft transition group-hover:rotate-45 group-hover:border-[var(--tone)] group-hover:bg-[var(--tone)] group-hover:text-white">
                  <ArrowUpRight size={18} />
                </Link>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--tone)]">{d.tagline}</p>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight md:text-2xl"><Link href={deptHref(d)} className="after:absolute after:inset-0">{d.name}</Link></h3>
              <ul className={`relative z-10 mt-3 space-y-1 text-[14.5px] ${big ? "" : "max-w-[62%]"}`}>
                {d.categories.slice(0, big ? 7 : 4).map((c) => (
                  <li key={c.slug}>
                    <Link href={catHref(d, c)} className="inline-flex items-center gap-1.5 text-soft transition hover:translate-x-1 hover:text-[var(--tone)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone)]" />{c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {big && Number.isFinite(from) && (
                <p className="relative z-10 mt-5 w-fit rounded-full bg-panel px-3 py-1.5 text-sm shadow-sm">Packages from <span className="font-bold text-[var(--tone)]">{formatPKR(from)}</span></p>
              )}
              <ProductVisual kind={d.kind}
                className={`pointer-events-none transition duration-700 group-hover:-translate-y-2 group-hover:scale-110 ${big ? "sv-float mt-auto aspect-[4/3] w-full" : "absolute -bottom-3 -right-3 h-[58%] w-[46%]"}`} />
              {big && (
                <span className="relative z-10 mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tone)]">Explore {d.short} <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
