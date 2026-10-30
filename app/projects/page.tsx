import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Solar, CCTV, smart classroom, EV charger and panel washing projects delivered by M.JAZE in Lahore.",
};

const tints = ["bg-stage-blue", "bg-stage-amber", "bg-stage-green", "bg-stage-purple"];

export default function ProjectsPage() {
  return (
    <section className="container-x py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-mute">
        <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} /><span className="text-soft">Projects</span>
      </nav>
      <h1 className="mt-4 text-[30px] font-extrabold tracking-tight md:text-[42px]" data-reveal>Projects we have delivered</h1>
      <p className="mt-2 max-w-2xl text-soft" data-reveal>Homes, schools, factories and plazas across Lahore.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3" data-stagger>
        {projects.map((pr, n) => (
          <Link key={pr.slug} href={`/projects/${pr.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl">
            <div className={`relative aspect-[16/10] overflow-hidden ${tints[n % tints.length]}`}>
              <ProductVisual kind={pr.kind} className="h-full w-full transition duration-700 group-hover:scale-110" />
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-soft"><MapPin size={12} />{pr.area}</span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold group-hover:text-brand">{pr.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-mute">{pr.summary}</p>
              <p className="mt-3 text-sm font-semibold text-brand">{pr.outcome[0][0]} {pr.outcome[0][1].toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
