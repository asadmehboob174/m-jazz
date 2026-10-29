import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import ProductGradients from "@/components/ProductGradients";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// Applies the saved colour theme before first paint, so the default colour never flashes.
const colorScript = `try{var c=localStorage.getItem("color");if(c&&c!=="blue")document.documentElement.dataset.color=c}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://mjaze.pk"),
  title: {
    default: "M.JAZE — Solar Systems, Lithium Batteries, UPS & CCTV in Lahore",
    template: "%s | M.JAZE",
  },
  description:
    "Solar solutions from 1 kVA to 1 MW, lithium batteries, UPS, CCTV, attendance systems, projectors and interactive boards. Sales, installation and after-sales service in Lahore.",
  openGraph: { type: "website", siteName: "M.JAZE (PVT) LTD", locale: "en_PK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorScript }} />
      </head>
      <body className="font-sans">
        <ProductGradients />
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
