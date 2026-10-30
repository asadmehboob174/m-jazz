import { logoVariant, type LogoVariant } from "@/lib/site";

// Three logo options for the owner to choose from (see /brand). The default comes from lib/site.
export function LogoMark({ variant = logoVariant, size = 38 }: { variant?: LogoVariant; size?: number }) {
  const line = { fill: "none", strokeWidth: 4.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (variant === "peak") {
    return (
      <svg width={size * 1.2} height={size} viewBox="0 0 48 40" aria-hidden="true">
        <path d="M2 34 L14 5 L24 21 L34 5 L46 34 H37.5 L32 19.5 L24 32 L16 19.5 L10.5 34 Z" fill="var(--color-brand)" />
        <path d="M5 37 Q24 28 45 33" stroke="var(--color-sun)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === "spark") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="var(--color-brand-2)" />
        <path d="M10.5 28.5 V12 L16 18.5" stroke="#fff" {...line} />
        <path d="M29.5 28.5 V12 L24 18.5" stroke="#fff" {...line} />
        <path d="M22 11.5 L16.2 21.6 H20.6 L18.4 29 L24.6 19 H20.2 Z" fill="var(--color-sun)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--color-brand)" />
      <path d="M10 28.5 V12.5 L20 23" stroke="#fff" {...line} />
      <path d="M20 23 L30 12.5 V28.5" stroke="var(--color-sun)" {...line} />
    </svg>
  );
}

export default function Logo({ className = "", invert = false, variant, compact = false }: { className?: string; invert?: boolean; variant?: LogoVariant; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} />
      <span className="leading-none">
        <span className={`block text-[21px] font-extrabold tracking-[-0.02em] ${invert ? "text-white" : "text-navy"}`}>
          M<span className="text-sun">.</span>JAZE
        </span>
        {!compact && (
          <span className={`mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.2em] ${invert ? "text-white/60" : "text-mute"}`}>
            Solar · Security · IT
          </span>
        )}
      </span>
    </span>
  );
}
