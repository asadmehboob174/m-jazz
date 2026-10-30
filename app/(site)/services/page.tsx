import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Plus } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import DeptIcon from "@/components/DeptIcon";
import { Heading } from "@/components/SectionHead";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { company, faqs, process, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services: Solar, CCTV, Fire Alarm, IT, Rentals & Repairs",
  description: "Solar installation from 1 kVA to 1 MW, CCTV, attendance, fire alarm, electric fence, smart classrooms, projector & SMD rentals, UPS and projector repair, EV chargers and solar panel washing in Lahore.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="hero-bg relative isolate overflow-hidden text-white">
        <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-96 w-96 animate-blob rounded-full bg-sun opacity-25 blur-3xl" />
        <div className="container-x py-10 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={14} /><span className="text-white/85">Services</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-[30px] font-extrabold leading-tight tracking-tight md:text-[48px]" data-reveal>Sales, installation and after-sales service</h1>
          <p className="mt-3 max-w-2xl text-white/75 sm:text-lg" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
            From a 1 kVA home backup to a 1 MW plant, from one CCTV camera to a full smart campus. {company.years} years of supplying it, installing it and looking after it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3" data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
            <a href={waLink("I want to book a free site survey.")} target="_blank" rel="noopener" className="btn-sun shine glow">Book free site survey</a>
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-semibold hover:bg-white/10">Browse products</Link>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="container-x space-y-5 py-10 md:py-14">
        {departments.map((d, n) => (
          <article key={d.slug} id={d.slug} style={{ "--tone": d.color } as React.CSSProperties} data-reveal={n % 2 ? "right" : "left"}
            className="spot grid scroll-mt-36 overflow-hidden rounded-2xl border border-line md:grid-cols-[1fr_280px]">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--tone)] text-white"><DeptIcon icon={d.icon} size={22} /></span>
                <div>
                  <h2 className="text-xl font-extrabold md:text-2xl">{d.name}</h2>
                  <p className="text-sm font-semibold text-[var(--tone)]">{d.tagline}</p>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-soft">{d.blurb}</p>
              <ul className="mt-4 grid gap-2 text-[15px] sm:grid-cols-2">
                {d.categories.map((c) => (
                  <li key={c.slug}><Link href={catHref(d, c)} className="flex items-start gap-2 hover:text-[var(--tone)]"><Check size={17} className="mt-0.5 shrink-0 text-ok" />{c.name}</Link></li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href={deptHref(d)} className="inline-flex items-center gap-1.5 font-semibold text-[var(--tone)] hover:underline">Shop {d.short} <ArrowRight size={16} /></Link>
                <a href={waLink(`I'm interested in ${d.name}.`)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-[#1fa855] hover:underline">Enquire on WhatsApp</a>
              </div>
            </div>
            <ProductVisual kind={d.kind} className="hidden h-full bg-[color-mix(in_oklab,var(--tone)_8%,var(--color-panel))] md:flex" />
          </article>
        ))}
      </section>

      {/* Process */}
      <section id="after-sales" className="scroll-mt-36 bg-coal py-12 md:py-14">
        <div className="container-x">
          <Heading eyebrow="How we work" title="From survey to after-sales" />
          {/* Tracing beam: fills left to right as the steps scroll into view */}
          <div aria-hidden="true" className="relative mt-8 hidden h-1 rounded-full bg-line lg:block">
            <div className="trace absolute inset-0 rounded-full bg-gradient-to-r from-brand via-brand to-sun shadow-[0_0_12px_var(--color-sun)]" />
            {[12.5, 37.5, 62.5, 87.5].map((x) => <span key={x} className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-panel" style={{ left: `${x}%` }} />)}
          </div>
          <ol className="mt-7 grid gap-3 sm:grid-cols-2 md:gap-4 lg:mt-5 lg:grid-cols-4" data-stagger>
            {process.map((s) => (
              <li key={s.n} className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <span aria-hidden="true" className="absolute -right-2 -top-4 text-[80px] font-extrabold leading-none text-coal transition group-hover:text-stage-blue">{s.n}</span>
                <div className="relative flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{Number(s.n)}</span>
                  <span className="rounded-full bg-coal px-2.5 py-1 text-xs font-medium text-soft">{s.time}</span>
                </div>
                <h3 className="relative mt-4 font-bold">{s.t}</h3>
                <p className="relative mt-1.5 text-[15px] leading-relaxed text-mute">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x grid grid-cols-1 gap-6 py-10 md:grid-cols-[1fr_1.8fr] md:gap-8 md:py-14">
        <div>
          <Heading eyebrow="FAQ" title="Frequently asked questions" sub="Can't find your answer? We reply on WhatsApp during working hours." />
          <a href={waLink("I have a question.")} target="_blank" rel="noopener" className="btn-primary shine mt-5">Ask on WhatsApp</a>
        </div>
        <div className="divide-y divide-line rounded-2xl border border-line" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold">
                {f.q}
                <Plus size={20} className="shrink-0 text-mute transition group-open:rotate-45 group-open:text-brand" />
              </summary>
              <p className="pb-5 leading-relaxed text-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
