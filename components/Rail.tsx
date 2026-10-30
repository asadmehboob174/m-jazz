"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// A horizontal, swipeable row of cards with arrow buttons. Header content goes in `head`.
export default function Rail({ head, children, itemClass = "w-[78%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]" }: {
  head: React.ReactNode; children: React.ReactNode[]; itemClass?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = track.current;
    if (el) setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, []);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    el?.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">{head}</div>
        <div className="flex shrink-0 gap-2">
          {([[-1, ChevronLeft, "Previous", edge.start], [1, ChevronRight, "Next", edge.end]] as const).map(([d, Icon, label, off]) => (
            <button key={label} type="button" aria-label={label} disabled={off} onClick={() => move(d)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel transition hover:border-brand hover:bg-brand hover:text-white disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-panel disabled:hover:text-fg">
              <Icon size={19} />
            </button>
          ))}
        </div>
      </div>
      <div ref={track} onScroll={update} data-stagger className="swipe -mx-4 mt-5 flex gap-5 overflow-x-auto scroll-smooth px-4 pb-3 pt-1 md:mt-6 lg:mx-0 lg:px-0">
        {children.map((c, n) => <div key={n} className={`shrink-0 ${itemClass}`}>{c}</div>)}
      </div>
    </>
  );
}
