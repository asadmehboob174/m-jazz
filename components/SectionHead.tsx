import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SectionHead({ title, sub, href, more = "View all" }: { title: string; sub?: string; href?: string; more?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <span aria-hidden="true" className="mb-2.5 block h-1 w-10 rounded-full bg-sun" />
        <h2 className="text-[22px] font-bold tracking-tight md:text-[28px]">{title}</h2>
        {sub && <p className="mt-1 text-sm text-mute md:mt-1.5 md:text-base">{sub}</p>}
      </div>
      {href && <Link href={href} className="link-more shrink-0 whitespace-nowrap text-sm md:text-[15px]">{more} <ChevronRight size={16} /></Link>}
    </div>
  );
}
