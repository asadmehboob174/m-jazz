import type { Metadata } from "next";
import Checkout from "@/components/cart/Checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="container-x">
      <Checkout />
    </section>
  );
}
