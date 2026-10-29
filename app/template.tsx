"use client";

import { usePathname } from "next/navigation";

// Keyed on the full path so a short fade plays on every page change,
// including nested ones like /shop → /shop/some-product.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-[fade_.3s_ease-out_both]">
      {children}
    </div>
  );
}
