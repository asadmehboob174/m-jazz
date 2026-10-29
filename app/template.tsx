"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

// Keyed on the full path so a short fade plays on every page change,
// including nested ones like /shop → /shop/some-product.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
