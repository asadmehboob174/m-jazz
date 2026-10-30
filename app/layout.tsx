import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import ProductGradients from "@/components/ProductGradients";
import Effects from "@/components/Effects";
import Sky from "@/components/Sky";
import { CartProvider } from "@/components/cart/Cart";
import { company } from "@/lib/data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// Before first paint: apply the saved colour theme, and mark that JS runs (enables scroll reveals).
const bootScript = `document.documentElement.classList.add("js");try{var c=localStorage.getItem("color");if(c&&c!=="blue")document.documentElement.dataset.color=c;var m=localStorage.getItem("mode")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");if(m==="dark")document.documentElement.dataset.mode="dark"}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(company.site),
  title: {
    default: "M.JAZE — Solar, CCTV, UPS, Smart Boards & IT Solutions in Lahore",
    template: "%s | M.JAZE",
  },
  description:
    "Solar systems from 1 kVA to 1 MW, lithium batteries, UPS, CCTV, attendance, fire alarm, electric fence, interactive boards, projectors, rentals and repairs. Sales, installation and service in Lahore.",
  openGraph: { type: "website", siteName: company.legal, locale: "en_PK" },
};

// Local business details for Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.legal,
  url: company.site,
  telephone: [company.phoneIntl, company.landlineIntl],
  email: company.email,
  address: { "@type": "PostalAddress", streetAddress: "E-4/6, Main Ghazi Road, Next to Honda Shop", addressLocality: "Lahore", addressCountry: "PK" },
  sameAs: Object.values(company.socials),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <Sky />
        <ProductGradients />
        <SmoothScroll />
        <Effects />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
