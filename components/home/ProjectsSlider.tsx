import Link from "next/link";
import { MapPin } from "lucide-react";
import ProductVisual from "../ProductVisual";
import Rail from "../Rail";
import { Heading } from "../SectionHead";
import { projects } from "@/lib/data";

const tints = ["bg-stage-blue", "bg-stage-amber", "bg-stage-green", "bg-stage-purple"];

export default function ProjectsSlider() {
  return (
    <section className="cv container-x py-10 md:py-14">
      <Rail itemClass="w-[84%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
        head={<Heading eyebrow="Recent work" title="Projects we have delivered" sub="Homes, schools, factories and plazas across Lahore" />}>
        {projects.map((pr, n) => (
          <Link key={pr.slug} href={`/projects/${pr.slug}`}
            className="group block h-full overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)]">
            <div className={`relative aspect-[16/10] overflow-hidden ${tints[n % tints.length]}`}>
              <ProductVisual kind={pr.kind} className="h-full w-full transition duration-700 group-hover:scale-110" />
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-panel/90 px-2.5 py-1 text-xs font-medium text-soft"><MapPin size={12} />{pr.area}</span>
              <span className="absolute bottom-3 right-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{pr.outcome[0][0]} {pr.outcome[0][1].toLowerCase()}</span>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-bold group-hover:text-brand">{pr.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mute">{pr.summary}</p>
            </div>
          </Link>
        ))}
      </Rail>
    </section>
  );
}
