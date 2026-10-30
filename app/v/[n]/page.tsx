import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Design1 from "@/components/v/Design1";
import Design2 from "@/components/v/Design2";
import Design3 from "@/components/v/Design3";
import Design4 from "@/components/v/Design4";
import Design5 from "@/components/v/Design5";
import Design6 from "@/components/v/Design6";
import { VSwitch } from "@/components/v/Kit";

export const metadata: Metadata = { title: "Design preview", robots: { index: false } };

const all = [Design1, Design2, Design3, Design4, Design5, Design6];

export function generateStaticParams() {
  return all.map((_, i) => ({ n: String(i + 1) }));
}

export default async function DesignPreview({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  const Design = all[n - 1];
  if (!Design) notFound();
  return (
    <>
      <Design />
      <VSwitch current={n} />
    </>
  );
}
