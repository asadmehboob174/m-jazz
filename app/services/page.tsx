import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Plus } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import { divisions, faqs, process, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Solar, UPS, CCTV, IT & Event Rentals",
  description: "Solar installation from 1 kVA to 1 MW, lithium batteries, UPS sales and repair, CCTV, attendance systems, IT solutions, projectors and event rentals in Lahore.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-coal">
        <div className="container-x py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-mute">
            <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} /><span className="text-soft">Services</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-[42px] md:leading-tight">Sales, installation and after-sales service</h1>
          <p className="mt-3 max-w-2xl text-lg text-soft">
            From a 1 kVA home backup to a 1 MW industrial plant, from one CCTV camera to a full smart campus. We supply it, install it and look after it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink("I want to book a free site survey.")} target="_blank" rel="noopener" className="btn-sun">Book free site survey</a>
            <Link href="/shop" className="btn-ghost">Browse products</Link>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="container-x grid gap-5 py-12 md:grid-cols-2">
        {divisions.map((d) => (
          <article key={d.id} id={d.id} className="grid scroll-mt-36 overflow-hidden rounded-xl border border-line sm:grid-cols-[1fr_180px]">
            <div className="p-6">
              <h2 className="text-xl font-bold">{d.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{d.blurb}</p>
              <ul className="mt-4 grid gap-2 text-[15px] sm:grid-cols-2">
                {d.items.map((it) => (
                  <li key={it} className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0 text-ok" />{it}</li>
                ))}
              </ul>
              <a href={waLink(`I'm interested in ${d.name}.`)} target="_blank" rel="noopener" className="link-more mt-5">
                Enquire on WhatsApp <ChevronRight size={16} />
              </a>
            </div>
            <ProductVisual kind={d.kind} className="hidden h-full bg-coal sm:flex" />
          </article>
        ))}
      </section>

      {/* Process */}
      <section className="cv bg-coal py-12">
        <div className="container-x">
          <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">How a solar project works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-4">
            {process.map((s) => (
              <li key={s.n} className="rounded-xl border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{Number(s.n)}</span>
                  <span className="rounded bg-coal px-2 py-1 text-xs font-medium text-soft">{s.time}</span>
                </div>
                <h3 className="mt-4 font-bold">{s.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-mute">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="cv container-x grid gap-8 py-12 md:grid-cols-[1fr_1.8fr]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">Frequently asked questions</h2>
          <p className="mt-2 text-mute">Can&apos;t find your answer? Our team replies on WhatsApp within minutes during working hours.</p>
          <a href={waLink("I have a question.")} target="_blank" rel="noopener" className="btn-primary mt-5">Ask on WhatsApp</a>
        </div>
        <div className="divide-y divide-line rounded-xl border border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold">
                {f.q}
                <Plus size={20} className="shrink-0 text-mute transition group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
