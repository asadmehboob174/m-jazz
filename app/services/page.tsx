import type { Metadata } from "next";
import { Plus } from "lucide-react";
import Sky from "@/components/Sky";
import ServiceRows from "@/components/ServiceRows";
import { Reveal, Counter } from "@/components/Reveal";
import { company, process, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Solar, UPS, CCTV, IT & Event Rentals",
  description: "Solar installation from 1 kVA to 1 MW, lithium batteries, UPS sales and repair, CCTV, attendance systems, IT solutions, projectors and event rentals in Lahore.",
};

const faqs = [
  ["How long does a home solar installation take?", "Most home systems are installed in 1–3 days after the site survey and final quote."],
  ["Do you handle net-metering?", "Yes. We prepare the documents and follow up with the distribution company for on-grid and hybrid systems."],
  ["What happens if something stops working?", "Open a service request on WhatsApp or in the M.JAZE app. We visit, repair, and file warranty claims with the manufacturer for you."],
  ["Can I rent a projector or SMD screen for one day?", "Yes — projectors, SMD screens and speakers are available by the day, delivered and set up by our team."],
];

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden pb-20 pt-40">
        <Sky beams={false} />
        <div aria-hidden="true" className="absolute right-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-sun/10 blur-[140px]" />
        <div className="container-x relative">
          <p className="tag">[ Services ]</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(44px,7vw,104px)] font-semibold leading-[0.95] tracking-[-0.045em] text-gradient">
            Six divisions. One team you can call.
          </h1>
          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-soft">
              From a 1 kVA home backup to a 1 MW industrial plant, from a single CCTV camera to a full smart campus — we supply, install and look after it.
            </p>
            <div className="rounded-2xl border border-fg/10 bg-fg/[0.03] p-5 text-sm backdrop-blur">
              <p className="tag mb-2">Get in touch</p>
              <p className="text-soft">{company.phone}</p>
              <p className="text-soft">{company.address}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x"><ServiceRows /></div>

      {/* Process with timeframes */}
      <section className="container-x py-28">
        <Reveal>
          <p className="tag">[ Our process ]</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">How a solar project runs</h2>
        </Reveal>
        <div className="mt-14 space-y-4">
          {process.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid items-center gap-6 rounded-3xl border border-fg/[0.07] bg-panel/60 p-6 md:grid-cols-[120px_1fr_1.4fr_140px] md:p-8">
                <span className="text-6xl font-semibold text-sun/80">{s.n}</span>
                <h3 className="text-2xl font-semibold">{s.t}</h3>
                <p className="text-mute">{s.d}</p>
                <span className="justify-self-start rounded-full border border-fg/10 px-4 py-2 font-mono text-xs text-soft md:justify-self-end">{s.time}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Counters */}
      <section className="border-y border-fg/[0.06] py-20">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {[
            [<Counter key="a" to={1} suffix=" kVA" />, "Smallest system — a home backup"],
            [<Counter key="b" to={1000} suffix=" kW" />, "Largest — industrial & agricultural"],
            [<Counter key="c" to={15} suffix="+" />, "Products & services we offer"],
          ].map(([v, l], i) => (
            <div key={i}>
              <p className="text-6xl font-semibold tracking-tight md:text-7xl">{v}</p>
              <p className="mt-3 text-mute">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x grid gap-12 py-28 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="tag">[ FAQ ]</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Questions people ask us</h2>
          <a href={waLink("I have a question.")} target="_blank" rel="noopener" className="btn-sun mt-8">Ask on WhatsApp</a>
        </div>
        <div className="border-t border-fg/10">
          {faqs.map(([q, a], i) => (
            <details key={q} className="group border-b border-fg/10 py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium md:text-xl">
                <span><span className="mr-4 font-mono text-sm text-mute">0{i + 1}</span>{q}</span>
                <Plus size={22} className="shrink-0 transition group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-2xl pl-10 text-mute">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
