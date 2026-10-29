import Link from "next/link";
import { ArrowUpRight, Check, Plus, Star } from "lucide-react";
import Logo from "./Logo";
import { company, waLink, divisions } from "@/lib/data";

const socials = [
  { label: "Facebook", d: "M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z" },
  { label: "Instagram", d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" },
  { label: "YouTube", d: "M22 8.5s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-.9C15.8 5 12 5 12 5s-3.8 0-6.9.3c-.4 0-1.4 0-2.2.9C2.2 6.9 2 8.5 2 8.5S1.8 10.3 1.8 12v1.6c0 1.8.2 3.6.2 3.6s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 6.7.2 6.7.2s3.8 0 6.9-.3c.4 0 1.4 0 2.2-.9.7-.7.9-2.3.9-2.3s.2-1.8.2-3.6V12c0-1.7-.2-3.5-.2-3.5ZM10 15V9l5 3-5 3Z" },
  { label: "TikTok", d: "M16 3c.3 2.2 1.7 3.7 4 4v3c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3Z" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* CTA band */}
      <section className="border-y border-fg/[0.06] bg-gradient-to-br from-warm via-warm-2 to-ink">
        <div className="container-x flex flex-wrap items-center justify-between gap-10 py-20">
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Book your free<br /><span className="em text-sun-gradient">site survey</span>
            </h2>
            <ul className="mt-7 flex flex-wrap gap-3 text-[15px]">
              {["No obligation", "Engineer visit in 48 hours", "Quote on WhatsApp"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-full bg-fg/[0.05] py-1.5 pl-1.5 pr-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sun text-black"><Check size={14} strokeWidth={3} /></span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <a href={waLink("I want to book a free site survey.")} target="_blank" rel="noopener"
              className="flex items-center gap-4 rounded-full bg-sun py-2 pl-7 pr-2 text-lg font-semibold text-black transition hover:bg-sun-2">
              Book now <span className="flex h-10 w-14 items-center justify-center rounded-full bg-black/15"><Plus size={20} /></span>
            </a>
            <div className="flex items-center gap-3 border-l border-fg/10 pl-8">
              <Star size={30} className="text-sun" fill="currentColor" />
              <div className="text-sm"><p className="font-semibold">{company.rating} / 5</p><p className="text-mute">from {company.reviews}+ Google reviews</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x relative z-10">
        <div className="grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="lg:border-r lg:border-fg/[0.07] lg:pr-10">
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-mute">{company.legal} — {company.tagline}</p>
            <address className="mt-6 space-y-1.5 text-[15px] not-italic text-soft">
              <p>{company.address}</p>
              <p>{company.hours}</p>
              <p>{company.phone} · {company.email}</p>
            </address>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full bg-fg/[0.06] text-soft transition hover:bg-sun hover:text-black">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold">Solutions</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              {divisions.map((d) => (
                <li key={d.id}><Link href={`/services#${d.id}`} className="text-mute hover:text-fg">{d.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl font-semibold">Shop</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              {["Solar Panels", "Inverters", "Batteries", "Packages", "CCTV", "Rentals"].map((c) => (
                <li key={c}><Link href={`/shop?c=${encodeURIComponent(c)}`} className="text-mute hover:text-fg">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl font-semibold">Solar tips & offers</p>
            <p className="mt-5 text-[15px] text-mute">Monthly price updates, net-metering news and seasonal deals. No spam.</p>
            <form className="mt-6 flex rounded-full border border-sun/40 bg-fg/[0.03] p-1.5 focus-within:border-sun">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" required placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-[15px] outline-none placeholder:text-mute" />
              <button type="submit" aria-label="Subscribe" className="flex h-11 w-14 items-center justify-center rounded-full bg-sun text-black hover:bg-sun-2"><ArrowUpRight size={20} /></button>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-fg/[0.06] py-8 text-sm text-mute">
          <p>© {new Date().getFullYear()} {company.legal}. All rights reserved.</p>
          <p className="flex gap-6"><Link href="#" className="hover:text-fg">Privacy policy</Link><Link href="#" className="hover:text-fg">Warranty terms</Link><Link href="#" className="hover:text-fg">Returns</Link></p>
        </div>
      </div>

      {/* glow + watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[1100px] -translate-x-1/2 rounded-full bg-sun/20 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none select-none bg-gradient-to-b from-fg/[0.07] to-transparent bg-clip-text text-center text-[24vw] font-bold leading-[0.75] tracking-tighter text-transparent lg:text-[300px]">
        M.JAZE
      </div>
    </footer>
  );
}
