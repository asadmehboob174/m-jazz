import type { Kind } from "./catalog";

// Site layout settings: menus, running bar, hero slides and the order of home-page sections.
// Plain data on purpose: the admin panel will edit this instead of code.

export type LogoVariant = "badge" | "peak" | "spark";
export const logoVariant: LogoVariant = "badge";

export type MenuItem = {
  label: string;
  href: string;
  mega?: boolean; // opens the full shop menu
  children?: { label: string; href: string }[];
  wide?: boolean; // only shown on wide screens
};

export const menu: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", mega: true },
  { label: "Solar Packages", href: "/shop/solar-power/solar-packages" },
  { label: "Security", href: "/shop/security" },
  { label: "IT & Classroom", href: "/shop/it-solutions" },
  { label: "Rentals", href: "/shop/rentals" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Solar installation (1 kVA – 1 MW)", href: "/services#solar-power" },
      { label: "CCTV & security installation", href: "/services#security" },
      { label: "EV charger installation", href: "/shop/solar-power/ev-chargers" },
      { label: "Solar panel washing", href: "/shop/repair-services/solar-cleaning" },
      { label: "UPS repair", href: "/shop/repair-services/ups-repair" },
      { label: "Projector repair", href: "/shop/repair-services/projector-repair" },
      { label: "After-sales & warranty", href: "/services#after-sales" },
    ],
  },
  { label: "Projects", href: "/projects", wide: true },
  { label: "Contact", href: "/contact", wide: true },
];

export const ticker = [
  "Solar systems 1 kVA – 1 MW",
  "Lithium batteries & imported UPS",
  "Authorised Dahua reseller",
  "CCTV sales, installation & servicing",
  "Attendance & access control",
  "Fire alarm & electric fence",
  "Interactive touch boards",
  "Projector & SMD on rent",
  "Speakers on rent",
  "UPS & projector repair",
  "EV charger installation",
  "Solar panel washing",
];

export type Slide = {
  id: string;
  label: string; // short name on the slider tabs
  tag: string;
  title: string;
  text: string;
  kind: Kind;
  price?: { now: number; was?: number; note?: string };
  chips: string[];
  cta: [string, string];
  alt: [string, string]; // [label, WhatsApp message]
};

export const heroStyle: "sidebar" | "wide" = "sidebar";

export const heroSlides: Slide[] = [
  {
    id: "solutions", label: "All solutions",
    tag: "11 years · Lahore",
    title: "Solar, security & IT solutions under one roof.",
    text: "Solar from 1 kVA to 1 MW, CCTV, smart classrooms, rentals and repairs. Supplied, installed and serviced by our own team.",
    kind: "panel",
    chips: ["Free site survey", "Own installation team"],
    cta: ["Shop all products", "/shop"],
    alt: ["Free site survey", "I want a free site survey."],
  },
  {
    id: "solar", label: "6 kVA solar",
    tag: "Complete solar package",
    title: "6 kVA solar with 10 N-type double-glass panels.",
    text: "Inverter, panels, 14-gauge structure, wiring and installation in one price.",
    kind: "panel",
    price: { now: 499000, note: "without battery · Rs. 729,000 with 100Ah lithium" },
    chips: ["30-year panel life", "Installation included"],
    cta: ["View package", "/product/6kva-solar-package"],
    alt: ["Ask on WhatsApp", "I'm interested in the 6 kVA solar package."],
  },
  {
    id: "cctv", label: "CCTV offer",
    tag: "Bumper offer",
    title: "4 Full HD CCTV cameras, fully installed.",
    text: "4-channel DVR, 500 GB drive, 100 ft cable and live mobile view.",
    kind: "cctv",
    price: { now: 35999, note: "complete package" },
    chips: ["2 years camera warranty", "Authorised Dahua reseller"],
    cta: ["View offer", "/product/cctv-4-camera-package"],
    alt: ["Order on WhatsApp", "I want the 4 camera CCTV bumper offer (Rs. 35,999)."],
  },
  {
    id: "board", label: "Smart board",
    tag: "Specially for schools",
    title: "Interactive smart board package.",
    text: "Touch board, ultra-short-throw projector, mounting, installation and teacher training.",
    kind: "board",
    price: { now: 124000, was: 150000 },
    chips: ["Teacher training", "Delivery in Lahore"],
    cta: ["View package", "/product/smart-board-package"],
    alt: ["Ask for schools", "I want the interactive smart board package for our school."],
  },
  {
    id: "ev", label: "EV chargers",
    tag: "EV charger installation",
    title: "Charge at home. Drive with confidence.",
    text: "Wallbox, pedestal and portable chargers for all EV brands, installed safely with after-sales support.",
    kind: "ev",
    chips: ["All EV brands", "Home & commercial"],
    cta: ["See EV chargers", "/shop/solar-power/ev-chargers"],
    alt: ["Book installation", "I want an EV charger installed."],
  },
  {
    id: "rentals", label: "Rentals",
    tag: "Projector, SMD & sound on rent",
    title: "Screens and sound for your event, set up by our crew.",
    text: "Projectors, SMD screens and speakers by the day, with our operator at your event.",
    kind: "speaker",
    chips: ["Delivered & set up", "Operator included"],
    cta: ["View rentals", "/shop/rentals"],
    alt: ["Check availability", "I want to rent a projector / SMD screen / sound system."],
  },
];

// Home page sections, top to bottom. Reorder or remove entries to change the page.
export const homeSections = [
  "ticker", "hero", "trust", "solutions", "deals", "categories", "products",
  "packages", "services", "why", "estimate", "projects", "reviews", "brands",
] as const;
export type HomeSection = (typeof homeSections)[number];
