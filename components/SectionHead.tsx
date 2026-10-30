import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Heading({ eyebrow, title, sub, light = false }: { eyebrow?: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="min-w-0" data-reveal>
      {eyebrow && (
        <p className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] ${light ? "text-sun-2" : "text-sun-3"}`}>
          <span aria-hidden="true" className="bar-draw block h-[3px] w-8 rounded-full bg-sun" />{eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-[24px] font-extrabold tracking-tight md:text-[32px] ${light ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-1 text-sm md:mt-1.5 md:text-base ${light ? "text-white/70" : "text-mute"}`}>{sub}</p>}
    </div>
  );
}

export default function SectionHead({ eyebrow, title, sub, href, more = "View all" }: { eyebrow?: string; title: string; sub?: string; href?: string; more?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <Heading eyebrow={eyebrow} title={title} sub={sub} />
      {href && (
        <Link href={href} className="group flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-brand md:text-[15px]">
          {more}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stage-blue transition group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white"><ArrowRight size={15} /></span>
        </Link>
      )}
    </div>
  );
}
