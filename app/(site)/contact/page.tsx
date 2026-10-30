import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit ${company.legal} at ${company.address}, call ${company.phone} or message us on WhatsApp.`,
};

export default function ContactPage() {
  const cards = [
    { Icon: MessageCircle, t: "WhatsApp", v: company.phone, href: waLink(), note: "Fastest reply" },
    { Icon: Phone, t: "Call", v: `${company.phone} · ${company.landline}`, href: `tel:${company.phoneIntl}`, note: company.hours },
    { Icon: Mail, t: "Email", v: company.email, href: `mailto:${company.email}`, note: "Quotes & tenders" },
    { Icon: MapPin, t: "Visit", v: company.address, href: `https://maps.google.com/?q=${encodeURIComponent(company.mapQuery)}`, note: "Get directions" },
  ];
  return (
    <section className="container-x py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-mute">
        <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} /><span className="text-soft">Contact</span>
      </nav>
      <h1 className="mt-4 text-[30px] font-extrabold tracking-tight md:text-[42px]" data-reveal>Talk to M.JAZE</h1>
      <p className="mt-2 max-w-2xl text-soft" data-reveal>Questions, quotes or a free site survey. We usually reply within minutes during working hours.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" data-stagger>
          {cards.map(({ Icon, t, v, href, note }) => (
            <li key={t}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"
                className="spot group flex h-full gap-4 rounded-2xl border border-line p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stage-blue text-brand transition group-hover:bg-brand group-hover:text-white"><Icon size={22} /></span>
                <span className="min-w-0"><span className="block text-sm text-mute">{t}</span><span className="block font-semibold">{v}</span><span className="mt-1 flex items-center gap-1 text-xs text-mute"><Clock size={12} />{note}</span></span>
              </a>
            </li>
          ))}
        </ul>
        <div className="min-h-[360px] overflow-hidden rounded-2xl border border-line bg-coal" data-reveal="zoom">
          <iframe title="M.JAZE location map" src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            className="h-full min-h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
