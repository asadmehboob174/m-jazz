import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { company, waLink, divisions, paymentMethods } from "@/lib/data";

const socials = [
  { label: "Facebook", d: "M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z" },
  { label: "Instagram", d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" },
  { label: "YouTube", d: "M22 8.5s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-.9C15.8 5 12 5 12 5s-3.8 0-6.9.3c-.4 0-1.4 0-2.2.9C2.2 6.9 2 8.5 2 8.5S1.8 10.3 1.8 12v1.6c0 1.8.2 3.6.2 3.6s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 6.7.2 6.7.2s3.8 0 6.9-.3c.4 0 1.4 0 2.2-.9.7-.7.9-2.3.9-2.3s.2-1.8.2-3.6V12c0-1.7-.2-3.5-.2-3.5ZM10 15V9l5 3-5 3Z" },
  { label: "TikTok", d: "M16 3c.3 2.2 1.7 3.7 4 4v3c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3Z" },
];

const shop = ["Solar Panels", "Inverters", "Batteries", "Packages", "UPS", "CCTV", "Rentals"];

export default function Footer() {
  return (
    <footer id="contact" className="mt-6">
      {/* Quote band */}
      <section className="bg-brand text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <h2 className="text-xl font-bold md:text-2xl">Not sure what size you need?</h2>
            <p className="mt-1 text-white/80">Send us your electricity bill on WhatsApp. We&apos;ll suggest a system and price for free.</p>
          </div>
          <a href={waLink("Here is my electricity bill — please suggest a solar system.")} target="_blank" rel="noopener" className="btn-sun">
            Send bill on WhatsApp
          </a>
        </div>
      </section>

      <div className="bg-navy text-white/70">
        <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Logo invert />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">{company.legal}. {company.tagline}</p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-sun hover:text-black">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">Shop</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {shop.map((c) => (
                <li key={c}><Link href={`/shop?c=${encodeURIComponent(c)}`} className="hover:text-white">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Services</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {divisions.map((d) => (
                <li key={d.id}><Link href={`/services#${d.id}`} className="hover:text-white">{d.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Contact us</p>
            <address className="mt-4 space-y-3 text-[15px] not-italic">
              <p className="flex gap-2.5"><MapPin size={18} className="mt-0.5 shrink-0 text-sun" />{company.address}</p>
              <p className="flex gap-2.5"><Clock size={18} className="mt-0.5 shrink-0 text-sun" />{company.hours}</p>
              <p className="flex gap-2.5"><Phone size={18} className="mt-0.5 shrink-0 text-sun" /><a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-white">{company.phone}</a></p>
              <p className="flex gap-2.5"><Mail size={18} className="mt-0.5 shrink-0 text-sun" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x flex flex-wrap items-center justify-between gap-4 py-5 text-sm">
            <p>© {new Date().getFullYear()} {company.legal}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
              {paymentMethods.map((m) => (
                <li key={m} className="rounded bg-white px-2.5 py-1 text-xs font-semibold text-navy">{m}</li>
              ))}
            </ul>
            <p className="flex gap-5"><Link href="#" className="hover:text-white">Privacy</Link><Link href="#" className="hover:text-white">Warranty terms</Link><Link href="#" className="hover:text-white">Returns</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
