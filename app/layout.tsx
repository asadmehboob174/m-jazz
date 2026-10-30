import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import ProductGradients from "@/components/ProductGradients";
import Effects from "@/components/Effects";
import DesignPreview from "@/components/DesignPreview";
import { CartProvider } from "@/components/cart/Cart";
import { company } from "@/lib/data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
// Fonts for the "modern" and "elegant" design looks; not preloaded, so they only download when used.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", preload: false });

// Before first paint: apply the saved colour theme and light/dark mode.
// ?look= and ?color= in the address switch the design for previewing and are remembered.
const bootScript = `try{var d=document.documentElement,u=new URLSearchParams(location.search),q=u.get("look"),k=u.get("color");if(q)localStorage.setItem("look",q);if(k)localStorage.setItem("color",k);if(q||k)localStorage.setItem("designPreview","1");var c=localStorage.getItem("color");if(c&&c!=="blue")d.dataset.color=c;var l=localStorage.getItem("look");if(l&&l!=="classic")d.dataset.look=l;var m=localStorage.getItem("mode")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");if(m==="dark")d.dataset.mode="dark"}catch(e){}`;

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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${jakarta.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <ProductGradients />
        <SmoothScroll />
        <Effects />
        <CartProvider>
          {children}
        </CartProvider>
        <WhatsAppButton />
        <DesignPreview />
      </body>
    </html>
  );
}
