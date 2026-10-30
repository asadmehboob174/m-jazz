import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { SocialIcon } from "./Navbar";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { company, paymentMethods, waLink } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="mt-10">
      {/* Call-to-action band */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 animate-blob rounded-full bg-sun/30 blur-3xl" />
        <div className="container-x relative flex flex-col items-start justify-between gap-5 py-9 md:flex-row md:items-center" data-reveal>
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Not sure what you need?</h2>
            <p className="mt-1.5 max-w-xl text-white/80">Send us your electricity bill, a photo of your site, or just your question on WhatsApp. We reply with a free recommendation and price.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={waLink("Assalam-o-Alaikum, I need a recommendation.")} target="_blank" rel="noopener" className="btn-sun shine glow">Chat on WhatsApp <ArrowRight size={18} /></a>
            <a href={`tel:${company.phoneIntl}`} className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10"><Phone size={17} /> {company.phone}</a>
          </div>
        </div>
      </section>

      <div className="bg-navy text-white/70">
        <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr] lg:py-16">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo invert />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">{company.legal}, {company.slogan.toLowerCase()}. {company.tagline}</p>
            <p className="mt-3 text-sm">NTN: {company.ntn}</p>
            <div className="mt-5 flex gap-2">
              {(["Facebook", "Instagram"] as const).map((s) => (
                <a key={s} href={company.socials[s.toLowerCase() as "facebook" | "instagram"]} target="_blank" rel="noopener" aria-label={s}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-sun hover:text-black">
                  <SocialIcon name={s} size={17} />
                </a>
              ))}
            </div>
          </div>
          {departments.slice(0, 3).map((d) => (
            <div key={d.slug}>
              <Link href={deptHref(d)} className="font-semibold text-white hover:text-sun-2">{d.name}</Link>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {d.categories.slice(0, 5).map((c) => <li key={c.slug}><Link href={catHref(d, c)} className="transition hover:pl-1 hover:text-white">{c.name}</Link></li>)}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <p className="font-semibold text-white">Contact us</p>
            <address className="mt-4 space-y-3 text-[15px] not-italic">
              <p className="flex gap-2.5"><MapPin size={18} className="mt-0.5 shrink-0 text-sun" />{company.address}</p>
              <p className="flex gap-2.5"><Phone size={18} className="mt-0.5 shrink-0 text-sun" />
                <span><a href={`tel:${company.phoneIntl}`} className="hover:text-white">{company.phone}</a> · <a href={`tel:${company.landlineIntl}`} className="hover:text-white">{company.landline}</a></span></p>
              <p className="flex gap-2.5"><Mail size={18} className="mt-0.5 shrink-0 text-sun" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></p>
              <p className="flex gap-2.5"><Clock size={18} className="mt-0.5 shrink-0 text-sun" />{company.hours}</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x flex flex-col items-start justify-between gap-4 py-5 text-sm lg:flex-row lg:items-center">
            <p>© {new Date().getFullYear()} {company.legal}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
              {paymentMethods.map((m) => <li key={m} className="rounded bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">{m}</li>)}
            </ul>
            <p className="flex flex-wrap gap-5">
              <Link href="/services" className="hover:text-white">Services</Link>
              <Link href="/projects" className="hover:text-white">Projects</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
