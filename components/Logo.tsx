export default function Logo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="28" viewBox="0 0 44 36" aria-hidden="true">
        <path d="M3 33 L14 5 L22 20 L30 5 L41 33" fill="none" stroke={invert ? "#ffffff" : "var(--color-brand)"} strokeWidth="5" strokeLinejoin="round" />
        <path d="M6 29 Q22 21 40 27" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className={`text-[19px] font-bold tracking-tight ${invert ? "text-white" : "text-navy"}`}>M.JAZE</span>
    </span>
  );
}
