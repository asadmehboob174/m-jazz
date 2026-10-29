import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import Sky from "@/components/Sky";
import { Reveal } from "@/components/Reveal";
import { projects, testimonials, waLink } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pr = projects.find((p) => p.slug === slug);
  return pr ? { title: `${pr.title} — Project`, description: pr.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const pr = projects.find((p) => p.slug === slug);
  if (!pr) notFound();
  const others = projects.filter((p) => p.slug !== pr.slug).slice(0, 4);
  const quote = testimonials[projects.indexOf(pr) % testimonials.length];

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-40">
        <Sky beams={false} />
        <div className="container-x relative">
          <p className="tag">[ Project · {pr.area} ]</p>
          <h1 className="mt-6 text-[clamp(52px,9vw,150px)] font-semibold leading-[0.9] tracking-[-0.05em] text-gradient">
            {pr.title}<span className="text-sun">®</span>
          </h1>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-fg/[0.07] bg-fg/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {pr.meta.map(([k, v]) => (
              <div key={k} className="bg-ink p-6">
                <p className="tag">{k}</p>
                <p className="mt-2 text-lg font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="container-x">
        <Reveal>
          <div className="relative aspect-[16/8] overflow-hidden rounded-[36px] border border-fg/[0.07] bg-gradient-to-br from-stage-blue via-stage-end to-warm-2">
            <ProductVisual kind={pr.kind} className="h-full w-full" />
            <span className="absolute bottom-6 left-6 rounded-full bg-ink/50 px-4 py-2 text-sm backdrop-blur">[Replace with drone photo of the installation]</span>
          </div>
        </Reveal>
      </section>

      {/* Story */}
      <section className="container-x grid gap-14 py-28 md:grid-cols-[1fr_1.6fr]">
        <p className="tag">[ The brief ]</p>
        <Reveal><p className="text-2xl leading-snug tracking-tight md:text-4xl">{pr.summary}</p></Reveal>

        <p className="tag">[ The solution ]</p>
        <Reveal>
          <p className="text-lg leading-relaxed text-soft">We studied 12 months of bills and the roof layout, then designed a {pr.meta[2][1]} system sized to the real daytime load — with room to add more panels later. Our own team handled structure, wiring, commissioning and app setup.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Site survey & load analysis", "Custom structure design", "Hybrid inverter + lithium storage", "App monitoring & after-sales"].map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-2xl border border-fg/[0.07] p-4"><span className="h-2 w-2 rounded-full bg-sun" />{f}</li>
            ))}
          </ul>
        </Reveal>

        <p className="tag">[ The outcome ]</p>
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {pr.outcome.map(([v, l]) => (
              <div key={l} className="rounded-3xl border border-fg/[0.07] bg-panel/60 p-6">
                <p className="text-4xl font-semibold text-sun-gradient">{v}</p>
                <p className="mt-2 text-sm text-mute">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="container-x grid gap-4 md:grid-cols-2">
        {["from-stage-blue", "from-stage-amber", "from-stage-green", "from-stage-purple"].map((g, i) => (
          <Reveal key={g} delay={i * 0.05} className={i === 0 ? "md:col-span-2" : ""}>
            <div className={`relative overflow-hidden rounded-[28px] border border-fg/[0.07] bg-gradient-to-br ${g} to-stage-end ${i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
              <ProductVisual kind={i % 2 ? "inverter" : pr.kind} className="h-full w-full" />
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/50 px-3 py-1.5 text-xs backdrop-blur">[Installation photo {i + 1}]</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Testimonial */}
      <section className="container-x py-28 text-center">
        <Reveal>
          <p className="mx-auto max-w-4xl text-3xl font-medium leading-snug tracking-tight md:text-5xl">
            “{quote.q}”
          </p>
          <p className="mt-8 text-mute">{quote.name} · {quote.role}</p>
        </Reveal>
      </section>

      {/* More projects */}
      <section className="container-x pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">More projects</h2>
          <a href={waLink("I want a system like your project.")} target="_blank" rel="noopener" className="btn-sun">Get a similar system</a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/projects/${o.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-fg/[0.07] bg-gradient-to-br from-stage-blue to-stage-end">
                <ProductVisual kind={o.kind} className="h-full w-full transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight group-hover:text-sun">{o.title}</h3>
                <ArrowUpRight className="text-mute transition group-hover:rotate-45 group-hover:text-sun" />
              </div>
              <p className="mt-1 text-mute">{o.area}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
