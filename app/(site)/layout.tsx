import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavProgress from "@/components/NavProgress";
import { Suspense } from "react";

// Header, footer, page-change loading bar and page transition for the whole site.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense><NavProgress /></Suspense>
      <Navbar />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
