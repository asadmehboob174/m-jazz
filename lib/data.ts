import { departments, findCat, type Kind } from "./catalog";
export type { Kind } from "./catalog";

// Contact details and offer prices come from M.JAZE's visiting card and social posts.
// Anything marked SAMPLE is placeholder content to replace before launch.

export const company = {
  name: "M.JAZE",
  legal: "M.JAZE (Pvt) Ltd",
  tagline: "Solar, security and IT solutions: sold, installed and serviced from Lahore.",
  slogan: "Customize Solutions Provider",
  owner: "Sardar Abdul Majid",
  address: "Office # E-4/6, Main Ghazi Road, Next to Honda Shop, Lahore",
  mapQuery: "M.JAZE Pvt Ltd, E-4/6 Main Ghazi Road, Lahore",
  hours: "Mon – Sat · 10:00 AM – 7:00 PM", // TODO confirm
  whatsapp: "923007787860",
  phone: "0300-7787860",
  phoneIntl: "+923007787860",
  landline: "042-35812296",
  landlineIntl: "+924235812296",
  email: "sales@mjaze.com",
  site: "https://www.mjaze.com",
  ntn: "8993954",
  since: 2015,
  years: 11,
  recommend: 100, // Facebook: 100% recommend
  reviews: 37,
  socials: {
    facebook: "https://www.facebook.com/mjazepvt",
    instagram: "https://www.instagram.com/mjazepvtltd/",
  },
};

export const waLink = (text = "Assalam-o-Alaikum, I want to know more about M.JAZE products and services.") =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

export const formatPKR = (n: number) => "Rs. " + n.toLocaleString("en-PK");

export type Variant = { label: string; price: number; oldPrice?: number };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  cat: string; // category slug from lib/catalog
  kind: Kind;
  price?: number; // no price = "price on request"
  oldPrice?: number;
  unit?: string;
  badge?: string;
  rating?: number;
  summary: string;
  specs: [string, string][];
  includes?: string[];
  variants?: Variant[];
  sample?: boolean; // SAMPLE price, replace before launch
};

export const products: Product[] = [
  // ── Solar packages (prices from M.JAZE posts) ──
  { slug: "1kw-solar-solution", name: "1 kW Solar Solution with Battery", brand: "M.JAZE", cat: "solar-packages", kind: "panel", price: 149500, badge: "Starter", rating: 4.9,
    summary: "A complete starter system for fans, lights and a TV, with battery backup through load-shedding.",
    specs: [["Inverter", "1.6 kW"], ["Panels", "2 × 585 W"], ["Battery", "Osaka HT-200 Ah"], ["Structure", "14-gauge"], ["Panel warranty", "30 years life"]],
    includes: ["1.6 kW solar inverter", "Osaka HT-200 Ah lead-acid battery", "2 × 585 W solar panels", "Complete 14-gauge mounting structure", "Wires, breakers & DB box", "DC combiner box", "AC/DC surge protection", "Delivery & installation in Lahore"] },
  { slug: "4kva-solar-system", name: "4 kVA Solar System", brand: "M.JAZE", cat: "solar-packages", kind: "panel", price: 369500, badge: "Limited offer", rating: 4.8,
    summary: "A complete 4 kVA home system with inverter, panels, structure, wiring and installation.",
    specs: [["Size", "4 kVA"], ["Type", "Hybrid"], ["Installation", "Included in Lahore"]],
    includes: ["4 kVA hybrid inverter", "High-efficiency solar panels", "Mounting structure", "Wiring & breakers", "Installation & configuration"] },
  { slug: "5kw-solar-package", name: "5 kW Solar Package with Batteries", brand: "M.JAZE", cat: "solar-packages", kind: "panel", price: 449000, badge: "Best value", rating: 4.9,
    summary: "Power your home with solar: inverter, batteries for reliable backup, 585 W panels and complete installation.",
    specs: [["Size", "5 kW"], ["Panels", "585 W high-efficiency"], ["Inverter warranty", "2 years"], ["Panel warranty", "30 years life"]],
    includes: ["5 kW solar inverter", "Batteries for reliable backup", "585 W high-efficiency panels", "Heavy-duty mounting structure", "DB box, breakers & complete wiring", "Professional installation"] },
  { slug: "6kva-solar-package", name: "6 kVA Solar Package", brand: "M.JAZE", cat: "solar-packages", kind: "panel", price: 499000, badge: "Most popular", rating: 4.9,
    summary: "10 N-type double-glass panels with a 6 kVA inverter. Choose with or without a lithium battery.",
    specs: [["Inverter", "6 kVA"], ["Panels", "10 × 585 W N-type double glass"], ["Structure", "14-gauge"], ["Installation", "Included"]],
    variants: [{ label: "Without battery", price: 499000 }, { label: "With 100Ah lithium battery", price: 729000 }],
    includes: ["6 kVA inverter", "10 × N-type double-glass 585 W panels", "DB box & breakers", "AC & DC wiring", "14-gauge structure", "Installation & configuration"] },
  { slug: "commercial-solar", name: "10 kW – 1 MW Commercial Solar", brand: "M.JAZE", cat: "solar-packages", kind: "stand", badge: "Custom quote", rating: 4.9,
    summary: "On-grid and hybrid plants for factories, schools, plazas and farms, designed after a free site survey.",
    specs: [["Size", "10 kW to 1 MW"], ["Type", "On-grid / hybrid"], ["Net-metering", "Paperwork handled"], ["Survey", "Free"]] },

  // ── Solar panels (SAMPLE prices) ──
  { slug: "longi-585w-bifacial-panel", name: "585 W Bifacial Solar Panel", brand: "LONGi", cat: "solar-panels", kind: "panel", price: 32000, badge: "A-grade", rating: 4.9, sample: true,
    summary: "N-type bifacial module that generates from both sides for higher daily output.",
    specs: [["Power", "585 W"], ["Cell type", "N-type bifacial"], ["Efficiency", "22.6%"], ["Warranty", "12 years product · 30 years output"]] },
  { slug: "jinko-620w-panel", name: "620 W Tiger Neo Panel", brand: "Jinko", cat: "solar-panels", kind: "panel", price: 35500, rating: 4.8, sample: true,
    summary: "High-wattage panel for rooftops where space is tight.",
    specs: [["Power", "620 W"], ["Cell type", "N-type TOPCon"], ["Efficiency", "22.9%"], ["Warranty", "12 years product · 30 years output"]] },
  { slug: "ja-580w-panel", name: "580 W DeepBlue 4.0 Panel", brand: "JA Solar", cat: "solar-panels", kind: "panel", price: 31000, oldPrice: 33000, rating: 4.7, sample: true,
    summary: "Reliable N-type panel with strong low-light output for Lahore winters.",
    specs: [["Power", "580 W"], ["Cell type", "N-type"], ["Efficiency", "22.4%"], ["Warranty", "12 years product · 30 years output"]] },
  { slug: "canadian-550w-panel", name: "550 W HiKu6 Panel", brand: "Canadian Solar", cat: "solar-panels", kind: "panel", price: 27500, badge: "Value", rating: 4.6, sample: true,
    summary: "Budget-friendly mono panel for small home systems.",
    specs: [["Power", "550 W"], ["Cell type", "Mono PERC"], ["Efficiency", "21.5%"], ["Warranty", "12 years product · 25 years output"]] },

  // ── Inverters (SAMPLE) ──
  { slug: "growatt-6kw-hybrid", name: "6 kW Hybrid Solar Inverter", brand: "Growatt", cat: "inverters", kind: "inverter", price: 238000, badge: "Best seller", rating: 4.8, sample: true,
    summary: "Popular size for 10-marla homes. Runs on solar, battery and grid with automatic switching.",
    specs: [["Rated power", "6 kW"], ["Type", "Hybrid"], ["Battery voltage", "48 V"], ["MPPT", "Dual"], ["Monitoring", "Wi-Fi app"]] },
  { slug: "knox-8kw-hybrid", name: "8 kW Hybrid Inverter", brand: "Knox", cat: "inverters", kind: "inverter", price: 315000, oldPrice: 330000, rating: 4.8, sample: true,
    summary: "High-capacity hybrid inverter for large homes and small offices.",
    specs: [["Rated power", "8 kW"], ["Type", "Hybrid"], ["Battery voltage", "48 V"], ["Monitoring", "Wi-Fi app"]] },
  { slug: "solis-10kw-ongrid", name: "10 kW On-Grid Inverter", brand: "Solis", cat: "inverters", kind: "inverter", price: 285000, badge: "Net-metering", rating: 4.9, sample: true,
    summary: "Grid-tied inverter for net-metering: sell extra daytime units back to LESCO.",
    specs: [["Rated power", "10 kW"], ["Phase", "Three-phase"], ["Efficiency", "98.3%"], ["MPPT", "2"]] },
  { slug: "huawei-20kw-ongrid", name: "20 kW Three-Phase Inverter", brand: "Huawei", cat: "inverters", kind: "inverter", price: 520000, rating: 4.9, sample: true,
    summary: "Commercial smart inverter for shops, offices and small factories.",
    specs: [["Rated power", "20 kW"], ["Phase", "Three-phase"], ["Efficiency", "98.6%"], ["Monitoring", "FusionSolar app"]] },

  // ── Lithium batteries (SAMPLE) ──
  { slug: "lithium-100ah-48v", name: "100Ah 48 V Lithium Battery", brand: "M.JAZE", cat: "lithium-batteries", kind: "battery", price: 230000, badge: "New", rating: 4.8, sample: true,
    summary: "LiFePO4 battery for hybrid inverters with built-in BMS and long cycle life.",
    specs: [["Capacity", "100 Ah · 5.12 kWh"], ["Chemistry", "LiFePO4"], ["Voltage", "51.2 V"], ["Cycles", "6000+"]] },
  { slug: "pylontech-16kwh", name: "16 kWh Energy Storage", brand: "Pylontech", cat: "lithium-batteries", kind: "battery", price: 640000, oldPrice: 710000, rating: 4.9, sample: true,
    summary: "Floor-standing storage for full-house backup through long outages.",
    specs: [["Capacity", "16 kWh"], ["Chemistry", "LiFePO4"], ["IP rating", "IP65"], ["Display", "Built-in"]] },
  { slug: "dyness-10kwh", name: "10 kWh Powerwall Battery", brand: "Dyness", cat: "lithium-batteries", kind: "battery", price: 455000, rating: 4.7, sample: true,
    summary: "Slim powerwall that runs fans, lights and a fridge all night.",
    specs: [["Capacity", "10.24 kWh"], ["Chemistry", "LiFePO4"], ["Voltage", "51.2 V"], ["Cycles", "6000+"]] },

  // ── UPS & batteries (SAMPLE) ──
  { slug: "osaka-ht200-battery", name: "HT-200 Ah Tubular Battery", brand: "Osaka", cat: "ups-batteries", kind: "battery", price: 62000, rating: 4.6, sample: true,
    summary: "Deep-cycle tubular battery for UPS and small solar systems.",
    specs: [["Capacity", "200 Ah"], ["Type", "Lead-acid tubular"], ["Voltage", "12 V"]] },
  { slug: "imported-3-5kva-ups", name: "3.5 kVA Imported Pure Sine UPS", brand: "Imported", cat: "ups-batteries", kind: "ups", price: 76000, oldPrice: 82000, rating: 4.7, sample: true,
    summary: "Branded imported UPS with built-in solar charger: add panels later without changing the unit.",
    specs: [["Capacity", "3.5 kVA"], ["Output", "Pure sine wave"], ["Solar charger", "Built-in"]] },

  // ── Structures & EV ──
  { slug: "elevated-structure", name: "Elevated Solar Structure", brand: "M.JAZE", cat: "solar-structures", kind: "stand", price: 18000, unit: "/ kW", rating: 4.8, sample: true,
    summary: "Hot-dip galvanised elevated stand that keeps your roof usable underneath.",
    specs: [["Material", "Hot-dip galvanised steel"], ["Height", "8–10 ft"], ["Includes", "Fabrication & fitting"]] },
  { slug: "standard-structure-14g", name: "14-Gauge Standard Structure", brand: "M.JAZE", cat: "solar-structures", kind: "stand", price: 9500, unit: "/ kW", rating: 4.7, sample: true,
    summary: "Heavy 14-gauge roof structure, the same one used in our solar packages.",
    specs: [["Gauge", "14"], ["Finish", "Galvanised"], ["Includes", "Fitting"]] },
  { slug: "ev-wallbox-charger", name: "7 kW Wallbox EV Charger", brand: "M.JAZE", cat: "ev-chargers", kind: "ev", badge: "Installed", rating: 4.9,
    summary: "Home and office wallbox charger, compatible with all EV brands, installed by our team.",
    specs: [["Power", "7 kW"], ["Use", "Home / office"], ["Compatibility", "All EV brands"], ["Support", "After-sales included"]] },
  { slug: "ev-pedestal-charger", name: "Pedestal EV Charger (Commercial)", brand: "M.JAZE", cat: "ev-chargers", kind: "ev", rating: 4.8,
    summary: "Commercial EV charging stations for plazas, hotels and offices.",
    specs: [["Use", "Commercial"], ["Mount", "Pedestal"], ["Installation", "Included"]] },
  { slug: "ev-portable-charger", name: "Portable EV Charger", brand: "M.JAZE", cat: "ev-chargers", kind: "ev", rating: 4.7,
    summary: "On-the-go charger that plugs into a standard socket.",
    specs: [["Use", "On the go"], ["Compatibility", "All EV brands"]] },

  // ── Security ──
  { slug: "cctv-4-camera-package", name: "4 Camera Full HD CCTV Package", brand: "M.JAZE", cat: "cctv-packages", kind: "cctv", price: 35999, badge: "Bumper offer", rating: 4.9,
    summary: "4 Full HD cameras, DVR, 500 GB hard drive and mobile view, fully installed. 2 years camera warranty.",
    specs: [["Cameras", "4 × Full HD (indoor & outdoor)"], ["Recorder", "4-channel DVR, remote access"], ["Storage", "500 GB"], ["Warranty", "2 years camera"]],
    includes: ["4 Full HD security cameras", "4-channel DVR (remote access)", "500 GB hard drive", "100 ft high-quality CCTV cable", "BNC pins & power connectors", "Centralised power supply", "Complete installation & setup", "Mobile view (4-screen split)"] },
  { slug: "cctv-8-camera-4k", name: "8 Camera 4K CCTV Package", brand: "Dahua", cat: "cctv-packages", kind: "cctv", price: 165000, rating: 4.8, sample: true,
    summary: "4K cameras for factories, schools and plazas with 30 days of recording.",
    specs: [["Cameras", "8 × 8 MP"], ["Night vision", "Full-colour"], ["Recorder", "8-ch NVR + 4 TB"], ["Audio", "Built-in mic"]] },
  { slug: "pollo-guardian-360x", name: "Guardian 360°x Wi-Fi PT Camera", brand: "Pöllö", cat: "cctv-cameras", kind: "dome", badge: "Back in stock", rating: 4.7,
    summary: "Wireless pan-tilt camera with two-way audio, human tracking, night vision and cloud storage.",
    specs: [["Connection", "Wi-Fi"], ["Rotation", "360° pan-tilt"], ["Audio", "Two-way"], ["Storage", "Cloud & local"], ["Alerts", "Motion & human tracking"]] },
  { slug: "dahua-4mp-dome", name: "4 MP Dome Camera", brand: "Dahua", cat: "cctv-cameras", kind: "dome", price: 6500, rating: 4.7, sample: true,
    summary: "Indoor dome camera with clear night vision from an authorised Dahua reseller.",
    specs: [["Resolution", "4 MP"], ["Night vision", "30 m IR"], ["Type", "Dome"]] },
  { slug: "face-attendance", name: "Face & Fingerprint Attendance", brand: "ZKTeco", cat: "attendance-access", kind: "attendance", price: 42000, rating: 4.7, sample: true,
    summary: "Contactless face attendance with monthly reports for payroll.",
    specs: [["Users", "Up to 3,000 faces"], ["Methods", "Face, finger, card"], ["Reports", "Excel / software"]] },
  { slug: "access-control-lock", name: "Access Control & Smart Lock", brand: "ZKTeco", cat: "attendance-access", kind: "attendance", rating: 4.7,
    summary: "Door access by face, card or fingerprint for offices and server rooms.",
    specs: [["Methods", "Face, card, fingerprint"], ["Lock", "Magnetic / electric strike"]] },
  { slug: "fire-alarm-system", name: "Conventional Fire Alarm System", brand: "M.JAZE", cat: "fire-alarm", kind: "fire", rating: 4.8,
    summary: "Smoke and heat detectors, sounders and panel, designed for your building and installed to code.",
    specs: [["Detectors", "Smoke & heat"], ["Panel", "Conventional zones"], ["Survey", "Free"]] },
  { slug: "electric-fence", name: "Electric Fence Installation", brand: "M.JAZE", cat: "electric-fence", kind: "fence", rating: 4.8,
    summary: "Perimeter electric fencing with energiser, alarm and warning signs for homes, farms and factories.",
    specs: [["Energiser", "Alarm-ready"], ["Wires", "Galvanised"], ["Pricing", "Per running foot"]] },

  // ── IT & smart classroom ──
  { slug: "smart-board-package", name: "Interactive Smart Board Package", brand: "M.JAZE", cat: "interactive-boards", kind: "board", price: 124000, oldPrice: 150000, badge: "For schools", rating: 4.9,
    summary: "Interactive touch board with an ultra-short-throw projector, installed with teacher training.",
    specs: [["Board", "Interactive multi-touch"], ["Projector", "Ultra short throw"], ["Training", "Included"], ["Delivery", "Lahore"]],
    includes: ["Interactive touch board", "Ultra short throw projector", "Mounting & wires", "Installation, configuration & teacher training", "Delivery in Lahore"] },
  { slug: "86-interactive-led", name: "86\" Interactive Touch LED", brand: "MAXHUB", cat: "interactive-boards", kind: "board", price: 720000, rating: 4.9, sample: true,
    summary: "4K touch display with built-in Android and whiteboard software for smart classrooms.",
    specs: [["Size", "86 inch"], ["Resolution", "4K UHD"], ["Touch", "20-point"], ["OS", "Android + OPS slot"]] },
  { slug: "65-interactive-led", name: "65\" Interactive Touch LED", brand: "MAXHUB", cat: "interactive-boards", kind: "board", price: 395000, rating: 4.8, sample: true,
    summary: "Touch LED for tuition centres and meeting rooms.",
    specs: [["Size", "65 inch"], ["Resolution", "4K UHD"], ["Touch", "20-point"]] },
  { slug: "epson-fhd-projector", name: "Full HD Multimedia Projector", brand: "Epson", cat: "projectors", kind: "projector", price: 145000, oldPrice: 158000, rating: 4.7, sample: true,
    summary: "Everyday Full HD projector for meeting rooms and classrooms.",
    specs: [["Resolution", "1920 × 1080"], ["Brightness", "3,800 lumens"], ["Inputs", "HDMI, VGA"]] },
  { slug: "epson-4k-laser", name: "4K Laser Projector", brand: "Epson", cat: "projectors", kind: "projector", price: 385000, rating: 4.9, sample: true,
    summary: "Bright 4K laser projector for halls and boardrooms.",
    specs: [["Resolution", "4K enhanced"], ["Brightness", "4,000 lumens"], ["Light source", "Laser"]] },
  { slug: "video-conference-kit", name: "Video Conferencing Kit", brand: "M.JAZE", cat: "video-conferencing", kind: "computer", rating: 4.8,
    summary: "4K conference camera, speakerphone and screen set up for Zoom and Teams meetings.",
    specs: [["Camera", "4K PTZ"], ["Audio", "Speakerphone"], ["Works with", "Zoom, Teams, Meet"]] },
  { slug: "computers-laptops", name: "Computers, Laptops & Accessories", brand: "Various", cat: "computers", kind: "computer", rating: 4.7,
    summary: "Office PCs, laptops, printers and accessories, supplied with setup.",
    specs: [["Brands", "HP, Dell, Lenovo"], ["Setup", "Included"]] },
  { slug: "office-networking", name: "Office Networking & Wi-Fi", brand: "M.JAZE", cat: "networking", kind: "network", rating: 4.8,
    summary: "Structured cabling, routers, switches and Wi-Fi for offices, schools and factories, plus IT support.",
    specs: [["Scope", "Cabling, switches, Wi-Fi"], ["Support", "Monthly IT support plans"]] },

  // ── Rentals (SAMPLE prices) ──
  { slug: "projector-rental", name: "Projector + Screen on Rent", brand: "M.JAZE Rentals", cat: "projector-rental", kind: "projector", price: 6500, unit: "/ day", badge: "With setup", rating: 4.9, sample: true,
    summary: "Full HD projector with 8 ft screen, cables and an operator for events.",
    specs: [["Projector", "Full HD, 4,000 lm"], ["Screen", "8 × 6 ft"], ["Operator", "Included"]] },
  { slug: "smd-screen-rental", name: "SMD Screen on Rent", brand: "M.JAZE Rentals", cat: "smd-rental", kind: "board", price: 350, unit: "/ sq ft / day", rating: 4.8, sample: true,
    summary: "Outdoor SMD screens for weddings, concerts and corporate events.",
    specs: [["Pixel pitch", "P3.9 outdoor"], ["Sizes", "8×6 ft to 24×12 ft"], ["Includes", "Truss, controller, operator"]] },
  { slug: "speaker-rental", name: "Sound System on Rent", brand: "M.JAZE Rentals", cat: "sound-rental", kind: "speaker", price: 12000, unit: "/ day", rating: 4.8, sample: true,
    summary: "2 tops, 2 subs, mixer and wireless mics, set up and run by our crew.",
    specs: [["Speakers", "2 tops + 2 subs"], ["Mixer", "12-channel"], ["Mics", "4 wireless"]] },

  // ── Repair & services ──
  { slug: "ups-repair", name: "UPS Repair: Local & Imported", brand: "M.JAZE Service", cat: "ups-repair", kind: "ups", rating: 4.9,
    summary: "Diagnosis and repair of all local and imported UPS units, with battery replacement.",
    specs: [["Brands", "All local & imported"], ["Pickup", "Available in Lahore"]] },
  { slug: "projector-repair", name: "Projector Repair & Servicing", brand: "M.JAZE Service", cat: "projector-repair", kind: "projector", rating: 4.8,
    summary: "Lamp replacement, cleaning, board repair and servicing for all projector brands.",
    specs: [["Service", "Repair, cleaning, lamp change"], ["Brands", "All"]] },
  { slug: "cctv-dvr-repair", name: "CCTV & DVR Repair", brand: "M.JAZE Service", cat: "cctv-repair", kind: "cctv", rating: 4.8,
    summary: "Dahua DVR repair, camera faults, cabling and complete CCTV maintenance.",
    specs: [["Service", "DVR, cameras, cabling"], ["Visit", "On-site"]] },
  { slug: "solar-panel-washing", name: "Professional Solar Panel Washing", brand: "M.JAZE Service", cat: "solar-cleaning", kind: "wash", badge: "Up to 90% output", rating: 4.9,
    summary: "Removes dust and bird droppings safely to restore output and extend panel life. Homes, offices and commercial.",
    specs: [["Method", "Safe, scratch-free"], ["Coverage", "Across Lahore"], ["For", "Homes, offices, commercial"]] },
  { slug: "service-contract", name: "Service Level Agreement (SLA)", brand: "M.JAZE Service", cat: "service-contracts", kind: "tools", rating: 4.8,
    summary: "Scheduled maintenance and priority repairs for solar, UPS, CCTV and IT equipment.",
    specs: [["Visits", "Scheduled"], ["Response", "Priority"]] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productPlace = (p: Product) => findCat(p.cat)!;
export const inCat = (slug: string) => products.filter((p) => p.cat === slug);
export const inDept = (slug: string) => {
  const cats = new Set(departments.find((d) => d.slug === slug)?.categories.map((c) => c.slug));
  return products.filter((p) => cats.has(p.cat));
};
export const priceOf = (p: Product, variant?: string) => p.variants?.find((v) => v.label === variant)?.price ?? p.price;

export const brands = ["Dahua", "Hikvision", "Growatt", "LONGi", "Jinko", "JA Solar", "Canadian Solar", "Knox", "Solis", "Huawei", "Pylontech", "Osaka", "Pöllö", "ZKTeco", "Epson", "MAXHUB"];

export const stats = [
  { to: company.years, suffix: "+", l: "Years of experience" },
  { to: 5, suffix: "", l: "Divisions under one roof" },
  { to: 1, suffix: " MW", l: "Solar solutions up to" },
  { to: company.recommend, suffix: "%", l: `Recommend us on Facebook (${company.reviews} reviews)` },
];

export const process = [
  { n: "01", t: "Free site survey", time: "Day 1", d: "An engineer visits, checks your roof, wiring, load and electricity bills." },
  { n: "02", t: "Design & quote", time: "1–2 days", d: "We size the system and send a clear, itemised quote with no hidden extras." },
  { n: "03", t: "Installation", time: "1–5 days", d: "Our own team installs, configures and tests everything." },
  { n: "04", t: "After-sales", time: "Ongoing", d: "Service, repairs, cleaning and warranty claims handled by us." },
];

// SAMPLE reviews
export const testimonials = [
  { name: "Ahmed Raza", role: "Homeowner, DHA", q: "Our bill dropped from Rs. 48,000 to under 6,000 in June. The team finished the install in two days and cleaned up everything." },
  { name: "Sana Malik", role: "Principal, school campus", q: "They installed smart boards in our classrooms over one weekend and trained the teachers on Monday morning." },
  { name: "Bilal Hassan", role: "Showroom owner", q: "CCTV with mobile viewing was set up in a day. I can watch both showrooms from my phone." },
  { name: "Ayesha Khan", role: "Event planner", q: "Rented the SMD screen and sound system for a wedding. On time, crisp picture, and their operator stayed till the end." },
  { name: "Usman Tariq", role: "Factory owner", q: "The rooftop plant paid for itself faster than we expected. Their after-sales team actually answers on WhatsApp." },
  { name: "Dr. Kamran Ali", role: "Clinic owner", q: "Our UPS kept failing. They repaired it, then moved us to solar with backup. Zero downtime since." },
];

export const faqs = [
  { q: "How do I order?", a: "Add products to your cart and press “Send order on WhatsApp”. Our team confirms stock, delivery and installation with you on WhatsApp before you pay." },
  { q: "How can I pay?", a: "Cash on delivery, bank transfer, JazzCash or Easypaisa. Online card payment is coming soon." },
  { q: "What size solar system do I need?", a: "Send us your electricity bill on WhatsApp and we will suggest a size for free. Most 10-marla homes need 5–8 kW." },
  { q: "Do you handle net-metering?", a: "Yes. We prepare the documents, submit the application and follow up until your green meter is installed." },
  { q: "Do you install CCTV, fire alarms and electric fences too?", a: "Yes. Our security team supplies, installs and services CCTV, attendance, access control, fire alarm and electric fence systems." },
  { q: "Do you repair UPS and projectors?", a: "Yes. We repair all local and imported UPS units and service projectors of every brand. Pickup is available in Lahore." },
  { q: "Do you rent projectors, SMD screens and speakers for one day?", a: "Yes. Everything is delivered, set up and operated by our crew." },
];

// SAMPLE projects (replace with real installations and photos)
export const projects = [
  { slug: "dha-6kva-hybrid", title: "6 kVA Hybrid Home", area: "DHA, Lahore", kind: "panel" as Kind,
    summary: "10 N-type panels with a 6 kVA inverter and lithium battery. The family runs ACs on solar through summer.",
    meta: [["Client", "Private residence"], ["Completed", "2026"], ["System", "6 kVA hybrid"], ["Duration", "2 days"]],
    outcome: [["80%", "Lower monthly bill"], ["10", "N-type panels"], ["All night", "Battery backup"]] },
  { slug: "ev-charger-deepal", title: "7 kW EV Charger", area: "Lahore", kind: "ev" as Kind,
    summary: "Wallbox charger installed for a Deepal EV, with a dedicated circuit and protection.",
    meta: [["Client", "Private residence"], ["Completed", "2026"], ["System", "7 kW wallbox"], ["Duration", "1 day"]],
    outcome: [["7 kW", "Charging power"], ["1 day", "Installation"], ["Safe", "Dedicated circuit"]] },
  { slug: "school-smart-classrooms", title: "Smart Classrooms", area: "School campus, Lahore", kind: "board" as Kind,
    summary: "Interactive boards, projectors and CCTV across classrooms, with teacher training.",
    meta: [["Client", "School campus"], ["Completed", "2026"], ["Scope", "Boards, CCTV, IT"], ["Duration", "1 weekend"]],
    outcome: [["14", "Classrooms upgraded"], ["32", "CCTV cameras"], ["0", "Teaching days lost"]] },
  { slug: "factory-rooftop", title: "Factory Rooftop Solar", area: "Industrial area, Lahore", kind: "stand" as Kind,
    summary: "On-grid rooftop plant with net-metering to cut daytime production costs.",
    meta: [["Client", "Textile unit"], ["Completed", "2026"], ["System", "250 kW on-grid"], ["Duration", "3 weeks"]],
    outcome: [["62%", "Lower monthly bill"], ["250 kW", "Installed"], ["Net", "Metering approved"]] },
  { slug: "plaza-cctv", title: "Plaza Security", area: "Gulberg, Lahore", kind: "cctv" as Kind,
    summary: "4K cameras, a control room, fire alarm and face attendance for staff.",
    meta: [["Client", "Commercial plaza"], ["Completed", "2026"], ["Scope", "CCTV, fire alarm, attendance"], ["Duration", "10 days"]],
    outcome: [["64", "4K cameras"], ["30 days", "Recording"], ["120", "Staff on attendance"]] },
  { slug: "panel-washing", title: "Solar Panel Washing", area: "Johar Town, Lahore", kind: "wash" as Kind,
    summary: "Professional washing restored output on a dusty 10 kW rooftop.",
    meta: [["Client", "Private residence"], ["Completed", "2026"], ["System", "10 kW"], ["Duration", "3 hours"]],
    outcome: [["90%", "Efficiency after wash"], ["3 hrs", "On site"], ["0", "Scratches"]] },
];

export const paymentMethods = ["Cash on delivery", "Bank transfer", "JazzCash", "Easypaisa"];
