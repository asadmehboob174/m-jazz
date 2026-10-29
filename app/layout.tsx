import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import ThemePicker from "@/components/ThemePicker";
import ProductGradients from "@/components/ProductGradients";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

// Applies the saved light/dark theme and accent colour before first paint, so nothing flashes.
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("theme"),a=localStorage.getItem("accent");if(t==="light")d.dataset.theme="light";if(a&&a!=="amber")d.dataset.accent=a}catch(e){}`;

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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ProductGradients />
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ThemePicker />
      </body>
    </html>
  );
}
