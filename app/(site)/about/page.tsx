import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ChevronRight, HardHat, Headset, ShieldCheck } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import DeptIcon from "@/components/DeptIcon";
import { Heading } from "@/components/SectionHead";
import { CountUp } from "@/components/Reveal";
import { departments, deptHref } from "@/lib/catalog";
import { company, process, stats, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "About M.JAZE",
  description: `${company.legal}: solar, security and IT solutions supplied, installed and serviced in Lahore for ${company.years} years.`,
};

const values = [
  [BadgeCheck, "Genuine products", "Authorised Dahua reseller and official warranty on every product."],
  [HardHat, "Our own engineers", "The team that sells it installs it. No sub-contractors."],
  [ShieldCheck, "Warranty handled by us", "We file and follow every claim for you."],
  [Headset, "After-sales that answers", `Repairs, cleaning and service contracts. WhatsApp ${company.phone}.`],
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="hero-bg relative isolate overflow-hidden text-white">
        <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={14} /><span className="text-white/85">About</span>
            </nav>
            <h1 className="mt-4 text-[30px] font-extrabold leading-tight tracking-tight md:text-[48px]" data-reveal>{company.slogan}, since {company.since}</h1>
            <p className="mt-4 max-w-xl text-white/75 sm:text-lg" data-reveal>
              {company.legal} supplies, installs and services complete technology solutions in Lahore: solar from 1 kVA to 1 MW, CCTV and security, smart classrooms, event rentals and repairs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3" data-reveal>
              <a href={waLink("Assalam-o-Alaikum, I want to talk to M.JAZE.")} target="_blank" rel="noopener" className="btn-sun shine glow">Talk to us <ArrowRight size={18} /></a>
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-semibold hover:bg-white/10">See our projects</Link>
            </div>
          </div>
          <div className="relative hidden h-80 lg:block" data-reveal="zoom">
            <div className="absolute left-0 top-0 h-56 w-56 animate-float"><ProductVisual kind="panel" className="h-full w-full" /></div>
            <div className="absolute bottom-0 right-4 h-48 w-48 animate-float [animation-delay:-3s]"><ProductVisual kind="cctv" className="h-full w-full" /></div>
            <div className="absolute right-24 top-6 h-36 w-32 animate-float [animation-delay:-1.5s]"><ProductVisual kind="battery" className="h-full w-full" /></div>
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4" data-stagger="zoom">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-line bg-panel p-5 text-center">
              <dd className="text-[36px] font-extrabold leading-none text-brand"><CountUp to={s.to} suffix={s.suffix} /></dd>
              <dt className="mt-2 text-sm text-mute">{s.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-coal py-12 md:py-16">
        <div className="container-x">
          <Heading eyebrow="Why M.JAZE" title="What we stand for" />
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {values.map(([Icon, t, d]) => (
              <li key={t} className="group rounded-2xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-stage-blue text-brand transition group-hover:bg-brand group-hover:text-white"><Icon size={24} /></span>
                <h3 className="mt-4 font-bold">{t}</h3>
                <p className="mt-1 text-sm text-mute">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <Heading eyebrow="Five divisions" title="Everything under one roof" />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
          {departments.map((d) => (
            <Link key={d.slug} href={deptHref(d)} style={{ "--tone": d.color } as React.CSSProperties} className="group rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-[var(--tone)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--tone)] text-white"><DeptIcon icon={d.icon} size={22} /></span>
              <h3 className="mt-4 font-bold group-hover:text-[var(--tone)]">{d.name}</h3>
              <p className="mt-1 text-sm text-mute">{d.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-coal py-12 md:py-16">
        <div className="container-x">
          <Heading eyebrow="How we work" title="From survey to after-sales" />
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {process.map((s) => (
              <li key={s.n} className="rounded-2xl border border-line bg-panel p-6">
                <span className="text-3xl font-extrabold text-brand">{s.n}</span>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-mute">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-mute">{company.legal} · NTN {company.ntn} · {company.address}</p>
        </div>
      </section>
    </>
  );
}
