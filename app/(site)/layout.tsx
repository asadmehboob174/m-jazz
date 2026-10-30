import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// The live site's header and footer. Design previews under /v use their own.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
