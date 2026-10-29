// A running strip. The list is rendered twice so the loop is seamless; hovering pauses it.
export default function Marquee({ children, reverse = false, className = "" }: { children: React.ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] ${className}`}>
      <div className={`flex w-max shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
