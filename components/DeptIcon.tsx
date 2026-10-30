import { CalendarDays, MonitorSmartphone, ShieldCheck, Sun, Wrench, type LucideProps } from "lucide-react";
import type { IconKey } from "@/lib/catalog";

const icons = { sun: Sun, shield: ShieldCheck, monitor: MonitorSmartphone, calendar: CalendarDays, wrench: Wrench };

export default function DeptIcon({ icon, ...props }: { icon: IconKey } & LucideProps) {
  const Icon = icons[icon];
  return <Icon {...props} />;
}
