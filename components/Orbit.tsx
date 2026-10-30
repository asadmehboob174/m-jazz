import Link from "next/link";
import DeptIcon from "./DeptIcon";
import { LogoMark } from "./Logo";
import { departments, deptHref } from "@/lib/catalog";

// The five divisions orbiting the M.JAZE mark (after Magic UI's orbiting circles). CSS-only.
export default function Orbit() {
  const inner = departments.slice(0, 2);
  const outer = departments.slice(2);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]" aria-label="Our five divisions">
      <div aria-hidden="true" className="absolute inset-[22%] rounded-full border border-white/15" />
      <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-dashed border-white/15" />
      <div aria-hidden="true" className="absolute inset-[38%] rounded-full bg-sun/20 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur">
        <LogoMark size={64} />
      </div>
      {inner.map((d, n) => (
        <div key={d.slug} className="orbit" style={{ "--r": "min(112px, 28vw)", "--t": "22s", "--d": `${-n * 11}s` } as React.CSSProperties}>
          <Link href={deptHref(d)} title={d.name} style={{ background: d.color }} className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_0_24px_-4px_currentColor] ring-4 ring-white/10 transition hover:scale-110">
            <DeptIcon icon={d.icon} size={22} />
          </Link>
        </div>
      ))}
      {outer.map((d, n) => (
        <div key={d.slug} className="orbit rev" style={{ "--r": "min(184px, 44vw)", "--t": "36s", "--d": `${-n * 12}s` } as React.CSSProperties}>
          <Link href={deptHref(d)} title={d.name} style={{ background: d.color }} className="flex h-12 w-12 items-center justify-center rounded-full text-white ring-4 ring-white/10 transition hover:scale-110">
            <DeptIcon icon={d.icon} size={22} />
          </Link>
        </div>
      ))}
    </div>
  );
}
