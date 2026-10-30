import { BadgeCheck, HardHat, Headset, MessageCircle, ReceiptText, ShieldCheck } from "lucide-react";
import { Heading } from "../SectionHead";
import { CountUp } from "../Reveal";
import { company, stats } from "@/lib/data";

const reasons = [
  [BadgeCheck, "Authorised Dahua reseller", "Genuine stock with official warranty."],
  [HardHat, "Our own trained team", "No sub-contractors on your roof or site."],
  [ShieldCheck, "Warranty handled by us", "We file and follow every claim for you."],
  [Headset, "After-sales & SLAs", "Repairs, cleaning and scheduled maintenance."],
  [MessageCircle, "Quick WhatsApp support", `Message ${company.phone} any time.`],
  [ReceiptText, "Registered company", `${company.legal} · NTN ${company.ntn}`],
] as const;

export default function Why() {
  return (
    <section className="cv relative isolate overflow-hidden bg-navy py-12 text-white md:py-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-brand opacity-50 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 animate-blob rounded-full bg-sun opacity-20 blur-3xl [animation-delay:-7s]" />
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <Heading light eyebrow={`${company.years} years of experience`} title="Your trusted technology partner" sub="No one is better at keeping your power, security and classrooms running." />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2" data-stagger>
            {reasons.map(([Icon, t, d]) => (
              <li key={t} className="group flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:border-sun/50 hover:bg-white/[0.08]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sun/15 text-sun-2 transition group-hover:scale-110 group-hover:bg-sun group-hover:text-black"><Icon size={20} /></span>
                <span><span className="block font-semibold">{t}</span><span className="text-sm text-white/60">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:gap-4" data-stagger="zoom">
          {stats.map((s) => (
            <div key={s.l} className="flex flex-col-reverse rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-5 sm:p-6">
              <dt className="mt-1 text-sm text-white/65">{s.l}</dt>
              <dd className="text-[34px] font-extrabold leading-none tracking-tight text-sun-2 sm:text-[44px]"><CountUp to={s.to} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
