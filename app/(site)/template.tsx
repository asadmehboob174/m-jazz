"use client";

import { usePathname } from "next/navigation";

// Keyed on the path so each new page rises in softly (header and footer stay put).
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-[page-in_.55s_cubic-bezier(.22,1,.36,1)_both]">
      {children}
    </div>
  );
}
