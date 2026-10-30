import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import Logo from "../Logo";
import ProductVisual from "../ProductVisual";
import { CountUp } from "../Reveal";
import { CartButton } from "../cart/Cart";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { company, formatPKR, inCat, process, stats, testimonials, waLink } from "@/lib/data";
import { navLinks } from "./shared";

const serif = { fontFamily: "var(--font-fraunces), Georgia, serif" };

// Design 3 · Editorial: a calm, corporate magazine layout with serif headlines and zig-zag sections.
export default function Design3() {
  const pkgs = inCat("solar-packages").filter((p) => p.price);
  return (
    <div className="min-h-screen bg-ink text-fg">
      {/* Hero: header sits on top of a full-height split */}
      <section className="relative grid min-h-[100svh] lg:grid-cols-2">
        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-6 px-6">
            <Link href="/" aria-label="Home"><Logo invert /></Link>
            <nav className="hidden gap-6 text-sm text-white/75 xl:flex">
              {navLinks.slice(0, 7).map((l) => <Link key={l.label} href={l.href} className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-white after:transition hover:text-white hover:after:origin-left hover:after:scale-x-100">{l.label}</Link>)}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:text-fg">
              <div className="rounded-full bg-white text-fg"><CartButton /></div>
              <a href={waLink("I want a free quote.")} target="_blank" rel="noopener" className="hidden rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white hover:text-navy sm:block">Request a quote</a>
            </div>
          </div>
        </header>

        <div className="relative flex flex-col justify-end bg-navy px-6 pb-14 pt-32 text-white md:px-14 lg:pb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-sun-2" data-reveal>Est. {company.since} · Lahore</p>
          <h1 className="mt-6 text-[48px] font-medium leading-[1] tracking-[-0.02em] sm:text-[64px] xl:text-[88px]" style={serif} data-reveal="clip">
            Powering homes.<br /><em className="text-sun-2">Protecting</em> business.<br />Teaching smarter.
          </h1>
          <p className="mt-8 max-w-md text-lg text-white/65" data-reveal>Solar, security and IT solutions, designed, installed and looked after by one Lahore team.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6" data-reveal>
            <Link href="/shop" className="group inline-flex items-center gap-3 rounded-full bg-sun py-2 pl-6 pr-2 font-semibold text-black">
              Explore solutions <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition group-hover:rotate-[-45deg]"><ArrowRight size={18} /></span>
            </Link>
            <a href={`tel:${company.phoneIntl}`} className="text-white/80 underline-offset-4 hover:underline">{company.phone}</a>
          </div>
        </div>

        <div className="relative hidden overflow-hidden bg-brand lg:block">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--color-sun)_45%,transparent),transparent_55%)]" />
          <div className="tilt absolute inset-0">
            <ProductVisual kind="panel" className="pop3d absolute left-[10%] top-[16%] h-[46%] w-[52%] animate-float" />
            <ProductVisual kind="cctv" className="absolute right-[6%] top-[12%] h-[30%] w-[36%] animate-float [animation-delay:-2s]" />
            <ProductVisual kind="board" className="absolute bottom-[10%] right-[12%] h-[36%] w-[46%] animate-float [animation-delay:-4s]" />
            <ProductVisual kind="battery" className="absolute bottom-[8%] left-[14%] h-[32%] w-[26%] animate-float [animation-delay:-1s]" />
          </div>
          <dl className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-white/20 bg-black/20 text-white backdrop-blur">
            {stats.slice(0, 3).map((s) => (
              <div key={s.l} className="border-r border-white/20 p-5 last:border-0">
                <dd className="text-3xl font-medium" style={serif}><CountUp to={s.to} suffix={s.suffix} /></dd>
                <dt className="text-xs text-white/70">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-[28px] leading-snug tracking-tight md:text-[42px]" style={serif} data-reveal>
          For {company.years} years we&apos;ve helped Lahore cut its electricity bills, secure its premises and modernise its classrooms, with <span className="text-brand">genuine products</span>, <span className="text-brand">our own engineers</span> and <span className="text-brand">real after-sales</span>.
        </p>
      </section>

      {/* Zig-zag divisions */}
      <section className="mx-auto max-w-[1300px] space-y-24 px-6 pb-24">
        {departments.map((d, i) => (
          <article key={d.slug} className="grid items-center gap-10 lg:grid-cols-2" style={{ "--tone": d.color } as React.CSSProperties}>
            <div className={i % 2 ? "lg:order-2" : ""} data-reveal={i % 2 ? "right" : "left"}>
              <p className="text-sm font-semibold text-[var(--tone)]">0{i + 1} — {d.tagline}</p>
              <h2 className="mt-3 text-[40px] font-medium leading-tight tracking-tight md:text-[56px]" style={serif}>{d.name}</h2>
              <p className="mt-4 max-w-lg text-lg text-soft">{d.blurb}</p>
              <ul className="mt-6 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
                {d.categories.map((c) => (
                  <li key={c.slug}><Link href={catHref(d, c)} className="flex items-center gap-2 border-b border-line py-2 text-[15px] transition hover:border-[var(--tone)] hover:text-[var(--tone)]"><Check size={15} className="text-[var(--tone)]" />{c.name}</Link></li>
                ))}
              </ul>
              <Link href={deptHref(d)} className="group mt-8 inline-flex items-center gap-2 font-semibold">Explore {d.short} <ArrowUpRight size={18} className="transition group-hover:rotate-45" /></Link>
            </div>
            <div className="tilt relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-[color-mix(in_oklab,var(--tone)_12%,var(--color-panel))]" data-reveal="zoom">
              <span aria-hidden="true" className="absolute -left-4 -top-10 text-[180px] font-medium leading-none text-[var(--tone)] opacity-10" style={serif}>0{i + 1}</span>
              <ProductVisual kind={d.kind} className="pop3d absolute inset-[10%]" />
            </div>
          </article>
        ))}
      </section>

      {/* Packages comparison */}
      <section className="bg-coal py-24">
        <div className="mx-auto max-w-[1300px] px-6">
          <h2 className="text-[40px] font-medium tracking-tight md:text-[56px]" style={serif} data-reveal>Solar packages, side by side</h2>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-panel" data-reveal>
            <table className="w-full min-w-[760px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="p-5 font-normal text-mute">Package</th>
                  {pkgs.map((p) => <th key={p.slug} className="p-5"><span className="block text-2xl font-medium" style={serif}>{p.name.split(" ").slice(0, 2).join(" ")}</span>{p.badge && <span className="mt-1 inline-block rounded-full bg-sun/20 px-2 py-0.5 text-xs font-semibold text-sun-3">{p.badge}</span>}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line"><td className="p-5 text-mute">Price</td>{pkgs.map((p) => <td key={p.slug} className="p-5 text-lg font-bold">{formatPKR(p.price!)}</td>)}</tr>
                {[0, 1, 2, 3].map((r) => (
                  <tr key={r} className="border-b border-line last:border-0">
                    <td className="p-5 text-mute">{["Inverter", "Panels / battery", "Structure & wiring", "Installation"][r]}</td>
                    {pkgs.map((p) => <td key={p.slug} className="p-5 text-soft">{p.includes?.[r] ?? "—"}</td>)}
                  </tr>
                ))}
                <tr><td className="p-5" />{pkgs.map((p) => <td key={p.slug} className="p-5"><Link href={`/product/${p.slug}`} className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">Choose <ArrowRight size={15} /></Link></td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1300px] px-6 py-24">
        <h2 className="text-[40px] font-medium tracking-tight md:text-[56px]" style={serif} data-reveal>How we work</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4" data-stagger>
          {process.map((s) => (
            <li key={s.n} className="group bg-panel p-8 transition hover:bg-navy hover:text-white">
              <span className="text-5xl font-medium text-brand transition group-hover:text-sun-2" style={serif}>{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-mute group-hover:text-white/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line py-24">
        <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:grid-cols-3" data-stagger>
          {testimonials.slice(0, 3).map((t) => (
            <figure key={t.name}>
              <blockquote className="text-2xl leading-snug" style={serif}>“{t.q}”</blockquote>
              <figcaption className="mt-6 text-sm"><b>{t.name}</b> <span className="text-mute">· {t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy px-6 pb-28 pt-20 text-white">
        <div className="mx-auto max-w-[1300px]">
          <h2 className="text-[56px] font-medium leading-none tracking-tight md:text-[110px]" style={serif} data-reveal>Let&apos;s talk.</h2>
          <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 text-white/75 md:grid-cols-3">
            <a href={`tel:${company.phoneIntl}`} className="flex items-center gap-3 hover:text-white"><Phone size={20} className="text-sun" />{company.phone} · {company.landline}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-white"><Mail size={20} className="text-sun" />{company.email}</a>
            <p className="flex items-center gap-3"><MapPin size={20} className="shrink-0 text-sun" />{company.address}</p>
          </div>
          <p className="mt-12 text-sm text-white/40">© {new Date().getFullYear()} {company.legal} · NTN {company.ntn}</p>
        </div>
      </footer>
    </div>
  );
}
