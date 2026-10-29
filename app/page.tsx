import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import DashboardPreview from "@/components/home/DashboardPreview";
import FeatureCards from "@/components/home/FeatureCards";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import BrandDome from "@/components/home/BrandDome";
import FAQ from "@/components/FAQ";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import Badge, { SectionTitle } from "@/components/Badge";
import { Reveal, Counter, Spotlight } from "@/components/Reveal";
import { divisions, process, products, projects, stats } from "@/lib/data";

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 8);

  return (
    <>
      <Hero />
      <DashboardPreview />
      <FeatureCards />

      {/* Divisions bento */}
      <section className="cv atmo-r container-x py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge>What we do</Badge>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Everything that runs on power. <span className="em text-mute">We sell it, fit it, fix it.</span>
            </h2>
          </div>
          <Link href="/services" className="btn-ghost">All services <ArrowRight size={18} /></Link>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {divisions.map((d, i) => {
            if (i < 2) {
              return (
                <Reveal key={d.id} delay={i * 0.06} className={i === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-2"}>
                  <Spotlight className="h-full">
                    <Link href={`/services#${d.id}`} className="flex h-full flex-col p-7 md:p-8">
                      <div className="flex items-center justify-between">
                        <span className="tag">0{i + 1}</span>
                        <ArrowUpRight size={20} className="text-mute transition group-hover:rotate-45 group-hover:text-sun" />
                      </div>
                      <ProductVisual kind={d.kind} className="my-6 h-56 md:h-72" />
                      <div className="mt-auto pt-8">
                        <h3 className={`${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"} font-semibold tracking-tight`}>{d.name}</h3>
                        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-mute">{d.blurb}</p>
                      </div>
                    </Link>
                  </Spotlight>
                </Reveal>
              );
            }
            // Cards 3–6: half-width, soft accent tint with the product picture on the right
            return (
              <Reveal key={d.id} delay={i * 0.06} className="md:col-span-3">
                <Spotlight className="h-full bg-gradient-to-br from-warm-2 via-panel to-panel">
                  <Link href={`/services#${d.id}`} className="grid h-full min-h-[260px] grid-cols-[1fr_auto] items-stretch gap-4 p-7 md:p-8">
                    <div className="flex flex-col">
                      <span className="tag">0{i + 1}</span>
                      <div className="mt-auto pt-10">
                        <h3 className="text-2xl font-semibold tracking-tight">{d.name}</h3>
                        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-mute">{d.blurb}</p>
                      </div>
                    </div>
                    <div className="relative flex w-32 flex-col items-end sm:w-44">
                      <ArrowUpRight size={20} className="text-mute transition group-hover:rotate-45 group-hover:text-sun" />
                      <ProductVisual kind={d.kind} className="mt-auto h-36 w-full transition duration-700 group-hover:scale-110 sm:h-44" />
                    </div>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Numbers */}
      <section className="container-x py-12">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-fg/[0.07] bg-fg/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-panel/85 p-8 md:p-10">
              <p className="text-5xl font-semibold tracking-tight md:text-6xl"><Counter to={s.to} suffix={s.suffix} /></p>
              <p className="mt-3 text-mute">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing />

      {/* Featured products */}
      <section className="cv atmo container-x py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge>Shop</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Best <span className="em text-sun-gradient">sellers</span></h2>
          </div>
          <Link href="/shop" className="btn-ghost">Browse all {products.length} products <ArrowRight size={18} /></Link>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.08}><ProductCard p={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="cv relative overflow-hidden py-24">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/10 blur-[140px]" />
        <div className="container-x relative">
          <SectionTitle badge="How it works">From rooftop to <span className="em text-sun-gradient">switch-on</span></SectionTitle>
          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {process.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-fg/[0.07] bg-panel/60 p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-semibold text-fg/15">{s.n}</span>
                    <span className="rounded-full border border-fg/10 px-3 py-1 font-mono text-xs text-soft">{s.time}</span>
                  </div>
                  <h3 className="mt-10 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="cv atmo-r container-x py-24">
        <Reveal>
          <Badge>Recent work</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Installed by <span className="em text-sun-gradient">M.JAZE</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {projects.map((pr, i) => (
            <Reveal key={pr.slug} delay={(i % 3) * 0.08}>
              <Link href={`/projects/${pr.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-fg/[0.07] bg-gradient-to-br from-stage-blue to-stage-end">
                  <ProductVisual kind={pr.kind} className="h-full w-full transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/50 px-3 py-1 text-xs">{pr.area}</span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-sun px-3 py-1 text-xs font-bold text-black">{pr.outcome[0][0]} {pr.outcome[0][1].toLowerCase()}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight group-hover:text-sun">{pr.title}</h3>
                <p className="mt-2 text-mute">{pr.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />
      <BrandDome />
      <FAQ />
    </>
  );
}
