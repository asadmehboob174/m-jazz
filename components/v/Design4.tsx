import Link from "next/link";
import { CheckCircle2, Globe, Mail, MapPin, Phone, ShoppingCart } from "lucide-react";
import Logo from "../Logo";
import ProductVisual from "../ProductVisual";
import DeptIcon from "../DeptIcon";
import Marquee from "../Marquee";
import { AddToCart, CartButton } from "../cart/Cart";
import { departments, deptHref } from "@/lib/catalog";
import { company, formatPKR, waLink } from "@/lib/data";
import { ticker } from "@/lib/site";
import { deals, navLinks } from "./shared";

// Star-burst price sticker, like the "Bumper offer" badges on M.JAZE's posters.
function Burst({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const pts = Array.from({ length: 32 }, (_, i) => { const r = i % 2 ? 42 : 50; const a = (i / 32) * Math.PI * 2; return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`; }).join(" ");
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite]" aria-hidden="true"><polygon points={pts} fill="var(--color-sale)" /></svg>
      <div className="relative text-center font-extrabold leading-tight text-white">{children}</div>
    </div>
  );
}

// Design 4 · Poster: bold, energetic and colourful, in the style of M.JAZE's own social posts.
export default function Design4() {
  return (
    <div className="min-h-screen overflow-x-clip bg-panel text-fg">
      <div className="bg-sun py-1.5 text-center text-sm font-bold text-black">⚡ Free site survey in Lahore · Call / WhatsApp {company.phone}</div>
      <header className="sticky top-0 z-50 border-b-4 border-sun bg-panel">
        <div className="mx-auto flex h-20 max-w-[1300px] items-center gap-6 px-4">
          <Link href="/" aria-label="Home"><Logo /></Link>
          <nav className="hidden gap-1 text-[15px] font-bold uppercase lg:flex">
            {navLinks.slice(0, 6).map((l) => <Link key={l.label} href={l.href} className="rounded-md px-3 py-2 hover:bg-brand hover:text-white">{l.label}</Link>)}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <CartButton />
            <a href={`tel:${company.phoneIntl}`} className="hidden items-center gap-2 rounded-full bg-brand py-1.5 pl-1.5 pr-5 text-white sm:flex">
              <span className="flex h-9 w-9 animate-[ring_2.4s_ease-out_infinite] items-center justify-center rounded-full bg-sun text-black"><Phone size={18} /></span>
              <span className="leading-tight"><span className="block text-[11px] uppercase text-white/70">Call now</span><b>{company.phone}</b></span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero: diagonal brand band, seal and sticker */}
      <section className="relative overflow-hidden bg-brand text-white [clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_40px,rgba(255,255,255,.04)_40px_80px)]" />
        <div aria-hidden="true" className="absolute -right-20 top-0 h-full w-1/2 skew-x-[-12deg] bg-navy/40" />
        <div className="relative mx-auto grid max-w-[1300px] items-center gap-8 px-4 pb-28 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pb-36">
          <div>
            <div className="flex items-center gap-4" data-reveal>
              <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-gradient-to-b from-sun-2 to-sun-3 text-black shadow-xl ring-4 ring-white/30">
                <span className="text-center font-extrabold leading-none"><span className="block text-3xl">{company.years}</span><span className="text-[10px] uppercase">years</span></span>
              </div>
              <p className="text-xl font-bold italic text-sun-2">No one is better</p>
            </div>
            <h1 className="mt-6 text-[42px] font-black uppercase leading-[0.95] tracking-tight md:text-[68px]" data-reveal>
              Your trusted<br /><span className="bg-sun px-2 text-black">technology</span><br />partner
            </h1>
            <ul className="mt-6 grid max-w-xl gap-2 text-lg font-semibold sm:grid-cols-2" data-stagger>
              {["Solar 1 kW to 1 MW", "CCTV & attendance", "UPS & lithium batteries", "Smart boards & IT", "Projector / SMD on rent", "Repair & service"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 size={20} className="shrink-0 text-sun" />{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <Link href="/shop" className="shine rounded-lg bg-sun px-7 py-3.5 text-lg font-extrabold uppercase text-black shadow-[0_6px_0_var(--color-sun-3)] transition active:translate-y-1 active:shadow-none">Shop now</Link>
              <a href={waLink()} target="_blank" rel="noopener" className="rounded-lg bg-[#25D366] px-7 py-3.5 text-lg font-extrabold uppercase text-black shadow-[0_6px_0_#128c4a] transition active:translate-y-1 active:shadow-none">WhatsApp</a>
            </div>
          </div>
          <div className="relative h-[340px] md:h-[440px]">
            <ProductVisual kind="panel" className="absolute left-0 top-0 h-[70%] w-[60%] animate-float" />
            <ProductVisual kind="battery" className="absolute bottom-0 left-[30%] h-[55%] w-[35%] animate-float [animation-delay:-2s]" />
            <ProductVisual kind="cctv" className="absolute right-0 top-[20%] h-[45%] w-[45%] animate-float [animation-delay:-3.5s]" />
            <Link href="/product/cctv-4-camera-package" className="absolute right-2 top-0 transition hover:scale-110">
              <Burst className="h-32 w-32 md:h-36 md:w-36"><span className="block text-[11px] uppercase">Bumper offer</span><span className="text-lg">Rs. 35,999</span></Burst>
            </Link>
          </div>
        </div>
      </section>

      <div className="-mt-6 rotate-[-1.5deg] bg-navy py-3 text-lg font-extrabold uppercase text-white">
        <Marquee>{ticker.map((t) => <span key={t} className="flex items-center gap-4 px-4">{t}<span className="text-sun">★</span></span>)}</Marquee>
      </div>

      {/* Division tiles like the poster */}
      <section className="mx-auto max-w-[1300px] px-4 py-16">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight md:text-5xl" data-reveal>Complete solutions <span className="text-brand">under one roof</span></h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-stagger="zoom">
          {departments.map((d, i) => (
            <Link key={d.slug} href={deptHref(d)} style={{ "--tone": d.color } as React.CSSProperties}
              className={`group overflow-hidden rounded-2xl border-4 border-[var(--tone)] bg-panel transition hover:-translate-y-1 hover:shadow-[0_12px_0_var(--tone)] ${i === 0 ? "lg:row-span-2" : ""}`}>
              <div className="flex items-center gap-3 bg-[var(--tone)] px-5 py-4 text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--tone)] transition group-hover:rotate-12"><DeptIcon icon={d.icon} size={24} /></span>
                <div><h3 className="text-xl font-black uppercase leading-none">{d.name}</h3><p className="mt-1 text-xs font-semibold text-white/80">{d.tagline}</p></div>
              </div>
              <div className={`relative p-5 ${i === 0 ? "min-h-[420px]" : "min-h-[200px]"}`}>
                <ul className="relative z-10 space-y-1.5 text-[15px] font-semibold">
                  {d.categories.slice(0, i === 0 ? 7 : 4).map((c) => <li key={c.slug} className="flex items-center gap-2"><CheckCircle2 size={17} className="text-[var(--tone)]" />{c.name}</li>)}
                </ul>
                <ProductVisual kind={d.kind} className={`absolute bottom-2 right-2 transition duration-500 group-hover:scale-110 ${i === 0 ? "h-56 w-56" : "h-32 w-32"}`} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Offers as posters */}
      <section className="bg-[repeating-linear-gradient(45deg,var(--color-coal)_0_20px,var(--color-panel)_20px_40px)] py-16">
        <div className="mx-auto max-w-[1300px] px-4">
          <h2 className="text-center text-4xl font-black uppercase md:text-5xl" data-reveal><span className="text-sale">Hot</span> offers</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {deals.map((p) => (
              <article key={p.slug} className="group relative overflow-hidden rounded-2xl bg-navy text-white shadow-xl">
                {p.badge && <span className="absolute left-0 top-5 z-10 bg-sale px-4 py-1 text-sm font-black uppercase">{p.badge}</span>}
                <Link href={`/product/${p.slug}`} className="block bg-gradient-to-br from-brand to-navy p-6 pt-14">
                  <ProductVisual kind={p.kind} className="mx-auto aspect-[4/3] w-4/5 transition duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                </Link>
                <div className="p-5">
                  <h3 className="text-xl font-black uppercase leading-tight">{p.name}</h3>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                      {p.oldPrice && <p className="text-sm text-white/50 line-through">{formatPKR(p.oldPrice)}</p>}
                      <p className="inline-block -rotate-2 bg-sun px-3 py-1 text-2xl font-black text-black">{formatPKR(p.price!)}</p>
                    </div>
                    {p.variants ? <Link href={`/product/${p.slug}`} className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy">Choose</Link>
                      : <AddToCart p={p} className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy hover:bg-sun"><ShoppingCart size={16} /> Add</AddToCart>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip like the poster footer */}
      <section className="bg-navy py-10 text-white">
        <div className="mx-auto grid max-w-[1300px] gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {[[Phone, "Contact us", `${company.phone}`, `tel:${company.phoneIntl}`], [Mail, "E-mail", company.email, `mailto:${company.email}`], [Globe, "Website", "www.mjaze.com", company.site], [MapPin, "Visit", company.address, "/contact"]].map(([I, t, v, h]) => {
            const Icon = I as typeof Phone;
            return (
              <a key={t as string} href={h as string} className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sun text-black"><Icon size={26} /></span>
                <span><span className="block text-sm text-white/60">{t as string}</span><b className="text-lg leading-tight">{v as string}</b></span>
              </a>
            );
          })}
        </div>
      </section>
      <footer className="bg-black pb-24 pt-6 text-center text-sm text-white/50">
        <p>{departments.map((d) => <Link key={d.slug} href={deptHref(d)} className="mx-3 hover:text-white">{d.short}</Link>)}</p>
        <p className="mt-4">© {new Date().getFullYear()} {company.legal} · Better solutions, brighter future</p>
      </footer>
    </div>
  );
}
