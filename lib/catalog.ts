// Shop structure: departments → categories. Products point at a category slug.
// Kept as plain data so the admin panel can later add, rename and reorder it.

export type Kind =
  | "panel" | "inverter" | "battery" | "ups" | "stand" | "ev"
  | "cctv" | "dome" | "attendance" | "fire" | "fence"
  | "board" | "projector" | "computer" | "network"
  | "speaker" | "tools" | "wash";

export type IconKey = "sun" | "shield" | "monitor" | "calendar" | "wrench";

export type Category = { slug: string; name: string; kind: Kind };

export type Department = {
  slug: string;
  name: string;
  short: string;
  icon: IconKey;
  color: string; // accent used on this department's cards and banners
  tagline: string;
  blurb: string;
  kind: Kind;
  categories: Category[];
};

export const departments: Department[] = [
  {
    slug: "solar-power",
    name: "Solar & Power",
    short: "Solar & Power",
    icon: "sun",
    color: "#1747b3",
    tagline: "Clean energy · Lower bills",
    blurb: "Solar systems from 1 kVA to 1 MW, inverters, lithium batteries, imported UPS and EV chargers.",
    kind: "panel",
    categories: [
      { slug: "solar-packages", name: "Solar Packages", kind: "panel" },
      { slug: "solar-panels", name: "Solar Panels", kind: "panel" },
      { slug: "inverters", name: "Solar Inverters", kind: "inverter" },
      { slug: "lithium-batteries", name: "Lithium Batteries", kind: "battery" },
      { slug: "ups-batteries", name: "UPS & Batteries", kind: "ups" },
      { slug: "solar-structures", name: "Solar Stands & Structures", kind: "stand" },
      { slug: "ev-chargers", name: "EV Chargers", kind: "ev" },
    ],
  },
  {
    slug: "security",
    name: "Security & Safety",
    short: "Security",
    icon: "shield",
    color: "#15803d",
    tagline: "Your safety · Our priority",
    blurb: "CCTV cameras, attendance and access control, fire alarms and electric fencing, supplied, installed and serviced.",
    kind: "cctv",
    categories: [
      { slug: "cctv-packages", name: "CCTV Packages", kind: "cctv" },
      { slug: "cctv-cameras", name: "CCTV & Wi-Fi Cameras", kind: "dome" },
      { slug: "attendance-access", name: "Attendance & Access Control", kind: "attendance" },
      { slug: "fire-alarm", name: "Fire Alarm Systems", kind: "fire" },
      { slug: "electric-fence", name: "Electric Fencing", kind: "fence" },
    ],
  },
  {
    slug: "it-solutions",
    name: "IT & Smart Classroom",
    short: "IT Solutions",
    icon: "monitor",
    color: "#6d28d9",
    tagline: "Smart technology · Better connectivity",
    blurb: "Interactive touch boards, multimedia projectors, video conferencing, computers and networking.",
    kind: "board",
    categories: [
      { slug: "interactive-boards", name: "Interactive Touch Boards", kind: "board" },
      { slug: "projectors", name: "Multimedia Projectors", kind: "projector" },
      { slug: "video-conferencing", name: "Video Conferencing", kind: "computer" },
      { slug: "computers", name: "Computers & Accessories", kind: "computer" },
      { slug: "networking", name: "Networking & IT Support", kind: "network" },
    ],
  },
  {
    slug: "rentals",
    name: "Event Rentals",
    short: "Rentals",
    icon: "calendar",
    color: "#ea580c",
    tagline: "For your events · For your success",
    blurb: "Projectors, SMD screens and speakers on rent, delivered, set up and run by our crew.",
    kind: "speaker",
    categories: [
      { slug: "projector-rental", name: "Projector on Rent", kind: "projector" },
      { slug: "smd-rental", name: "SMD Screen on Rent", kind: "board" },
      { slug: "sound-rental", name: "Speakers on Rent", kind: "speaker" },
    ],
  },
  {
    slug: "repair-services",
    name: "Repair & Services",
    short: "Services",
    icon: "wrench",
    color: "#dc2626",
    tagline: "Keep your systems running",
    blurb: "UPS and projector repair, CCTV and DVR repair, solar panel washing and service contracts.",
    kind: "tools",
    categories: [
      { slug: "ups-repair", name: "UPS Repair (Local & Imported)", kind: "ups" },
      { slug: "projector-repair", name: "Projector Repair & Servicing", kind: "projector" },
      { slug: "cctv-repair", name: "CCTV & DVR Repair", kind: "cctv" },
      { slug: "solar-cleaning", name: "Solar Panel Washing", kind: "wash" },
      { slug: "service-contracts", name: "Service Contracts (SLA)", kind: "tools" },
    ],
  },
];

export const findDept = (slug: string) => departments.find((d) => d.slug === slug);

export function findCat(slug: string) {
  for (const dept of departments) {
    const cat = dept.categories.find((c) => c.slug === slug);
    if (cat) return { dept, cat };
  }
}

export const deptHref = (d: Department) => `/shop/${d.slug}`;
export const catHref = (d: Department, c: Category) => `/shop/${d.slug}/${c.slug}`;
