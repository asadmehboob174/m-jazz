import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SectionHead({ title, sub, href, more = "View all" }: { title: string; sub?: string; href?: string; more?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">{title}</h2>
        {sub && <p className="mt-1.5 text-mute">{sub}</p>}
      </div>
      {href && <Link href={href} className="link-more">{more} <ChevronRight size={16} /></Link>}
    </div>
  );
}
