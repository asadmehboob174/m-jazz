export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.04] px-4 py-1.5 text-sm text-soft">
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" className="fill-sun" aria-hidden="true"><path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" /></svg>
    </span>
  );
}

export function SectionTitle({ badge, children, className = "" }: { badge: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <Badge>{badge}</Badge>
      <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">{children}</h2>
    </div>
  );
}
