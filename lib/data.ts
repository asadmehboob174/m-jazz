// NOTE: Everything marked SAMPLE is demo content so the design can be judged with
// realistic data. Replace it with M.JAZE's real prices, projects and reviews before launch.

export const company = {
  name: "M.JAZE",
  legal: "M.JAZE (PVT) LTD",
  tagline: "Solar energy, power backup and smart tech — sold, installed and serviced in Lahore.",
  address: "E 4/6, next to Honda shop, Main Defence Ghazi Road, Lahore",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  // TODO: real WhatsApp number in international format, digits only
  whatsapp: "923000000000",
  phone: "+92 300 0000000",
  email: "info@mjaze.pk",
  // SAMPLE
  rating: 4.9,
  reviews: 320,
};

export const waLink = (text = "Assalam-o-Alaikum, I want to know more about your solar solutions.") =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

export type Kind =
  | "panel"
  | "inverter"
  | "battery"
  | "ups"
  | "cctv"
  | "projector"
  | "board"
  | "stand"
  | "attendance"
  | "speaker";

export const divisions = [
  {
    id: "energy",
    name: "Solar & Energy",
    blurb: "On-grid, off-grid and hybrid solar from 1 kVA to 1 Megawatt — panels, inverters, lithium storage and solar stands.",
    items: ["Solar panels", "Solar solutions 1 kVA – 1 MW", "Lithium batteries", "Solar stands & structures"],
    kind: "panel" as Kind,
  },
  {
    id: "backup",
    name: "UPS & Power Backup",
    blurb: "UPS sales and repair, battery replacement and backup sizing so load-shedding never stops your day.",
    items: ["UPS sales", "UPS repair", "Battery replacement", "Backup sizing"],
    kind: "ups" as Kind,
  },
  {
    id: "security",
    name: "CCTV & Attendance",
    blurb: "CCTV camera sales, installation and servicing, plus fingerprint and face attendance systems for offices and factories.",
    items: ["CCTV cameras", "Installation & servicing", "Attendance solutions", "Remote mobile viewing"],
    kind: "cctv" as Kind,
  },
  {
    id: "it",
    name: "IT & Smart Classrooms",
    blurb: "IT solutions, interactive touch boards and touch LEDs for schools, offices and boardrooms.",
    items: ["IT solutions", "Interactive touch boards", "Touch LEDs", "Networking"],
    kind: "board" as Kind,
  },
  {
    id: "av",
    name: "Projectors & Event Rentals",
    blurb: "Projector sales and repairing, and projectors, SMD screens and speakers on rent — delivered and set up by our team.",
    items: ["Projector sales", "Projector repairing", "Projector & SMD on rent", "Speakers on rent"],
    kind: "projector" as Kind,
  },
  {
    id: "care",
    name: "Service & Warranty",
    blurb: "After-sales service, warranty claims and maintenance visits — we stay with you long after installation.",
    items: ["After-sales service", "Warranty claims", "Panel cleaning", "Annual maintenance"],
    kind: "inverter" as Kind,
  },
];

export const process = [
  { n: "01", t: "Site survey", time: "Day 1", d: "An engineer visits, checks your roof, wiring, load and electricity bills." },
  { n: "02", t: "System design", time: "1–2 days", d: "We size the system and send a clear, itemised quote — no hidden extras." },
  { n: "03", t: "Installation", time: "1–5 days", d: "Our own team installs structure, panels, inverter and batteries, then tests everything." },
  { n: "04", t: "After-sales", time: "Ongoing", d: "Monitoring, cleaning visits, repairs and warranty claims handled by us." },
];

// SAMPLE stats
export const stats = [
  { to: 1250, suffix: "+", l: "Systems installed" },
  { to: 8, suffix: " MW", l: "Solar capacity delivered" },
  { to: 9, suffix: " yrs", l: "Serving Lahore" },
  { to: 24, suffix: "h", l: "Average service response" },
];

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  kind: Kind;
  price: number; // SAMPLE PRICES — replace with real ones
  oldPrice?: number;
  unit?: string;
  badge?: string;
  rating?: number;
  specs: [string, string][];
  summary: string;
};

export const categories = ["All", "Solar Panels", "Inverters", "Batteries", "Packages", "UPS", "CCTV", "Attendance", "Projectors", "Touch Boards", "Structures", "Rentals"];

export const products: Product[] = [
  { slug: "itel-3kw-hybrid-inverter", name: "3 kW Hybrid Solar Inverter", brand: "itel", category: "Inverters", kind: "inverter", price: 165000, oldPrice: 178000, badge: "Best seller", rating: 4.8,
    summary: "Compact hybrid inverter for homes — runs on solar, battery and grid with automatic switching.",
    specs: [["Rated power", "3 kW"], ["Type", "Hybrid (on/off-grid)"], ["Battery voltage", "24 V"], ["MPPT", "Built-in, 120 A"], ["Monitoring", "Wi-Fi app"], ["Warranty", "2 years"]] },
  { slug: "knox-6kw-hybrid-inverter", name: "6 kW Hybrid Inverter", brand: "Knox", category: "Inverters", kind: "inverter", price: 238000, rating: 4.7,
    summary: "Popular size for 1-kanal homes — runs 1.5-ton inverter ACs during the day on solar.",
    specs: [["Rated power", "6 kW"], ["Type", "Hybrid"], ["Battery voltage", "48 V"], ["MPPT", "Dual"], ["Monitoring", "Wi-Fi app"], ["Warranty", "5 years"]] },
  { slug: "knox-8kw-hybrid-inverter", name: "8 kW Hybrid Inverter", brand: "Knox", category: "Inverters", kind: "inverter", price: 315000, oldPrice: 330000, rating: 4.8,
    summary: "High-capacity hybrid inverter for large homes and small offices.",
    specs: [["Rated power", "8 kW"], ["Type", "Hybrid"], ["Battery voltage", "48 V"], ["MPPT", "Dual"], ["Monitoring", "Wi-Fi app"], ["Warranty", "5 years"]] },
  { slug: "solis-10kw-ongrid", name: "10 kW On-Grid Inverter", brand: "Solis", category: "Inverters", kind: "inverter", price: 285000, badge: "Net-metering", rating: 4.9,
    summary: "Grid-tied inverter for net-metering — sell extra daytime units back to LESCO.",
    specs: [["Rated power", "10 kW"], ["Phase", "Three-phase"], ["Efficiency", "98.3%"], ["MPPT", "2"], ["Warranty", "5 years"]] },
  { slug: "huawei-20kw-ongrid", name: "20 kW Three-Phase Inverter", brand: "Huawei", category: "Inverters", kind: "inverter", price: 520000, rating: 4.9,
    summary: "Commercial-grade smart inverter for shops, offices and small factories.",
    specs: [["Rated power", "20 kW"], ["Phase", "Three-phase"], ["Efficiency", "98.6%"], ["MPPT", "2"], ["Monitoring", "FusionSolar app"], ["Warranty", "10 years"]] },
  { slug: "longi-585w-bifacial-panel", name: "585 W Bifacial Solar Panel", brand: "LONGi", category: "Solar Panels", kind: "panel", price: 32000, badge: "A-grade", rating: 4.9,
    summary: "N-type bifacial module — generates from both sides for higher daily output.",
    specs: [["Power", "585 W"], ["Cell type", "N-type bifacial"], ["Efficiency", "22.6%"], ["Warranty", "12 years product · 30 years output"]] },
  { slug: "jinko-620w-panel", name: "620 W Tiger Neo Panel", brand: "Jinko", category: "Solar Panels", kind: "panel", price: 35500, rating: 4.8,
    summary: "High-wattage panel for rooftops where space is tight.",
    specs: [["Power", "620 W"], ["Cell type", "N-type TOPCon"], ["Efficiency", "22.9%"], ["Warranty", "12 years product · 30 years output"]] },
  { slug: "ja-580w-panel", name: "580 W DeepBlue 4.0 Panel", brand: "JA Solar", category: "Solar Panels", kind: "panel", price: 31000, oldPrice: 33000, rating: 4.7,
    summary: "Reliable mono panel with strong low-light performance for Lahore winters.",
    specs: [["Power", "580 W"], ["Cell type", "N-type"], ["Efficiency", "22.4%"], ["Warranty", "12 years product · 30 years output"]] },
  { slug: "canadian-550w-panel", name: "550 W HiKu6 Panel", brand: "Canadian Solar", category: "Solar Panels", kind: "panel", price: 27500, badge: "Value", rating: 4.6,
    summary: "Budget-friendly mono PERC panel for small home systems.",
    specs: [["Power", "550 W"], ["Cell type", "Mono PERC"], ["Efficiency", "21.5%"], ["Warranty", "12 years product · 25 years output"]] },
  { slug: "volnex-5kwh-lithium", name: "5.12 kWh Lithium Battery", brand: "Volnex", category: "Batteries", kind: "battery", price: 255000, oldPrice: 270000, badge: "New", rating: 4.8,
    summary: "Wall-mount LiFePO4 battery with built-in BMS and long cycle life.",
    specs: [["Capacity", "5.12 kWh"], ["Chemistry", "LiFePO4"], ["Voltage", "51.2 V"], ["Cycles", "6000+"], ["Warranty", "5 years"]] },
  { slug: "pylontech-16kwh", name: "16 kWh Energy Storage", brand: "Pylontech", category: "Batteries", kind: "battery", price: 640000, oldPrice: 710000, rating: 4.9,
    summary: "Floor-standing storage for full-house backup through long outages.",
    specs: [["Capacity", "16 kWh"], ["Chemistry", "LiFePO4"], ["IP rating", "IP65"], ["Display", "Built-in"], ["Warranty", "10 years"]] },
  { slug: "dyness-10kwh", name: "10 kWh Powerwall Battery", brand: "Dyness", category: "Batteries", kind: "battery", price: 455000, rating: 4.7,
    summary: "Slim powerwall that runs fans, lights and a fridge all night.",
    specs: [["Capacity", "10.24 kWh"], ["Chemistry", "LiFePO4"], ["Voltage", "51.2 V"], ["Cycles", "6000+"], ["Warranty", "10 years"]] },
  { slug: "3kw-hybrid-package", name: "3 kW Hybrid Solar Package", brand: "M.JAZE", category: "Packages", kind: "panel", price: 455000, rating: 4.8,
    summary: "For 5-marla homes — fans, lights, fridge and a TV on solar, with backup at night.",
    specs: [["Inverter", "3 kW hybrid"], ["Panels", "6 × 585 W"], ["Battery", "2.5 kWh lithium"], ["Structure", "Roof-mounted"], ["Installation", "Included"]] },
  { slug: "5kw-hybrid-package", name: "5 kW Hybrid Solar Package", brand: "M.JAZE", category: "Packages", kind: "panel", price: 640000, oldPrice: 690000, badge: "Most chosen", rating: 4.9,
    summary: "The right size for most homes — cut bills and keep fans and lights on during load-shedding.",
    specs: [["Inverter", "5 kW hybrid"], ["Panels", "9 × 585 W"], ["Battery", "5.12 kWh lithium"], ["Structure", "Roof-mounted"], ["Installation", "Included"]] },
  { slug: "10kw-hybrid-package", name: "10 kW Hybrid Solar Package", brand: "M.JAZE", category: "Packages", kind: "panel", price: 1260000, badge: "Complete system", rating: 4.9,
    summary: "Everything for a large home: panels, hybrid inverter, lithium battery, structure, cabling and installation.",
    specs: [["Inverter", "10 kW hybrid"], ["Panels", "18 × 585 W"], ["Battery", "16 kWh lithium"], ["Structure", "Elevated"], ["Installation", "Included"]] },
  { slug: "2kva-ups", name: "2 kVA Pure Sine Wave UPS", brand: "Homage", category: "UPS", kind: "ups", price: 48000, rating: 4.6,
    summary: "Reliable home UPS with fast charging and silent operation.",
    specs: [["Capacity", "2 kVA"], ["Output", "Pure sine wave"], ["Battery", "24 V"], ["Warranty", "1 year"]] },
  { slug: "3-5kva-ups", name: "3.5 kVA Solar-Ready UPS", brand: "Inverex", category: "UPS", kind: "ups", price: 76000, oldPrice: 82000, rating: 4.7,
    summary: "UPS with a built-in solar charger — add panels later without changing the unit.",
    specs: [["Capacity", "3.5 kVA"], ["Output", "Pure sine wave"], ["Solar charger", "PWM 60 A"], ["Warranty", "1 year"]] },
  { slug: "4mp-cctv-kit", name: "4 MP CCTV Kit — 4 Cameras", brand: "Hikvision", category: "CCTV", kind: "cctv", price: 68000, badge: "Installed", rating: 4.8,
    summary: "4 cameras, NVR, hard drive and mobile viewing — installed by our team.",
    specs: [["Cameras", "4 × 4 MP"], ["Night vision", "Colour / IR"], ["Recorder", "4-ch NVR + 1 TB"], ["Mobile app", "Yes"]] },
  { slug: "8mp-cctv-kit", name: "8 MP 4K CCTV Kit — 8 Cameras", brand: "Dahua", category: "CCTV", kind: "cctv", price: 165000, rating: 4.8,
    summary: "4K cameras for factories, schools and plazas with 30 days of recording.",
    specs: [["Cameras", "8 × 8 MP"], ["Night vision", "Full-colour"], ["Recorder", "8-ch NVR + 4 TB"], ["Audio", "Built-in mic"]] },
  { slug: "face-attendance", name: "Face & Fingerprint Attendance", brand: "ZKTeco", category: "Attendance", kind: "attendance", price: 42000, rating: 4.7,
    summary: "Contactless face attendance with monthly reports for payroll.",
    specs: [["Users", "Up to 3,000 faces"], ["Methods", "Face, finger, card"], ["Reports", "Excel / software"], ["Setup", "Included"]] },
  { slug: "4k-laser-projector", name: "4K Laser Projector", brand: "Epson", category: "Projectors", kind: "projector", price: 385000, rating: 4.9,
    summary: "Bright 4K laser projector for classrooms, halls and boardrooms.",
    specs: [["Resolution", "4K enhanced"], ["Brightness", "4,000 lumens"], ["Light source", "Laser"], ["Inputs", "HDMI × 2"]] },
  { slug: "office-projector", name: "Full HD Office Projector", brand: "Epson", category: "Projectors", kind: "projector", price: 145000, oldPrice: 158000, rating: 4.7,
    summary: "Everyday Full HD projector for meeting rooms and classrooms.",
    specs: [["Resolution", "1920 × 1080"], ["Brightness", "3,800 lumens"], ["Lamp life", "12,000 hrs eco"], ["Inputs", "HDMI, VGA"]] },
  { slug: "86-interactive-board", name: "86\" Interactive Touch Board", brand: "MAXHUB", category: "Touch Boards", kind: "board", price: 720000, rating: 4.9,
    summary: "4K touch display with built-in Android and whiteboard software for smart classrooms.",
    specs: [["Size", "86 inch"], ["Resolution", "4K UHD"], ["Touch", "20-point"], ["OS", "Android + OPS slot"]] },
  { slug: "65-interactive-board", name: "65\" Interactive Touch LED", brand: "MAXHUB", category: "Touch Boards", kind: "board", price: 395000, badge: "Schools", rating: 4.8,
    summary: "Smaller touch LED for tuition centres and meeting rooms.",
    specs: [["Size", "65 inch"], ["Resolution", "4K UHD"], ["Touch", "20-point"], ["OS", "Android 13"]] },
  { slug: "elevated-structure", name: "Elevated Solar Structure (per kW)", brand: "M.JAZE", category: "Structures", kind: "stand", price: 18000, unit: "/ kW", rating: 4.8,
    summary: "Hot-dip galvanised elevated stand — keeps your roof usable underneath.",
    specs: [["Material", "Hot-dip galvanised steel"], ["Height", "8–10 ft"], ["Wind rating", "150 km/h"], ["Includes", "Fabrication & fitting"]] },
  { slug: "projector-rental", name: "Projector + Screen on Rent", brand: "M.JAZE Rentals", category: "Rentals", kind: "projector", price: 6500, unit: "/ day", badge: "With setup", rating: 4.9,
    summary: "Full HD projector with 8-ft screen, cables and an operator for events.",
    specs: [["Projector", "Full HD, 4,000 lm"], ["Screen", "8 × 6 ft"], ["Operator", "Included"], ["Area", "Lahore"]] },
  { slug: "smd-screen-rental", name: "SMD Screen on Rent", brand: "M.JAZE Rentals", category: "Rentals", kind: "board", price: 350, unit: "/ sq ft / day", rating: 4.8,
    summary: "Outdoor P3.9 SMD screens for weddings, concerts and corporate events.",
    specs: [["Pixel pitch", "P3.9 outdoor"], ["Sizes", "8×6 ft to 24×12 ft"], ["Includes", "Truss, controller, operator"], ["Area", "Lahore & nearby"]] },
  { slug: "speaker-rental", name: "Sound System on Rent", brand: "M.JAZE Rentals", category: "Rentals", kind: "speaker", price: 12000, unit: "/ day", rating: 4.8,
    summary: "2 tops, 2 subs, mixer and wireless mics — set up and run by our crew.",
    specs: [["Speakers", "2 tops + 2 subs"], ["Mixer", "12-channel"], ["Mics", "4 wireless"], ["Operator", "Included"]] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPKR = (n: number) => "Rs. " + n.toLocaleString("en-PK");

export const brands = ["LONGi", "Jinko", "JA Solar", "Canadian Solar", "Knox", "itel", "Solis", "Huawei", "Pylontech", "Volnex", "Dyness", "Hikvision", "Dahua", "ZKTeco", "Epson", "MAXHUB"];

// SAMPLE pricing for the package toggle on the homepage
export const packages = [
  {
    name: "Home",
    kw: 5,
    for: "5–10 marla homes",
    price: { hybrid: 640000, ongrid: 475000 },
    save: "Rs. 18,000",
    stats: [["Panels", "9 × 585 W"], ["Daily output", "~22 kWh"]],
    features: ["5 kW inverter", "5.12 kWh lithium (hybrid)", "Roof-mounted structure", "Wiring, breakers & earthing", "Installation & testing"],
  },
  {
    name: "Family",
    kw: 10,
    for: "1-kanal homes",
    price: { hybrid: 1260000, ongrid: 860000 },
    save: "Rs. 38,000",
    featured: true,
    stats: [["Panels", "18 × 585 W"], ["Daily output", "~44 kWh"]],
    features: ["10 kW inverter", "16 kWh lithium (hybrid)", "Elevated structure", "Net-metering paperwork", "1 year free cleaning visits"],
  },
  {
    name: "Business",
    kw: 25,
    for: "Shops, offices, clinics",
    price: { hybrid: 2950000, ongrid: 2050000 },
    save: "Rs. 95,000",
    stats: [["Panels", "44 × 585 W"], ["Daily output", "~110 kWh"]],
    features: ["25 kW three-phase inverter", "Battery bank (hybrid)", "Custom structure design", "Net-metering & LESCO follow-up", "Remote monitoring + AMC"],
  },
];

// SAMPLE reviews
export const testimonials = [
  { name: "Ahmed Raza", role: "Homeowner, DHA Phase 6", q: "Our bill went from Rs. 48,000 to under 6,000 in June. The team finished the 10 kW install in two days and cleaned up everything." },
  { name: "Sana Malik", role: "Principal, City School Campus", q: "They installed touch boards in 14 classrooms over one weekend. Teachers were trained on Monday morning. Very professional." },
  { name: "Usman Tariq", role: "Owner, Tariq Textiles", q: "The 250 kW rooftop plant paid for itself faster than we expected. Their after-sales team actually answers on WhatsApp." },
  { name: "Fatima Noor", role: "Homeowner, Johar Town", q: "Load-shedding doesn't exist for us anymore. The lithium battery runs the whole house through the night." },
  { name: "Bilal Hassan", role: "Manager, Hassan Motors", q: "CCTV with mobile viewing was set up in a day. I can watch both showrooms from my phone." },
  { name: "Ayesha Khan", role: "Event planner", q: "Rented the SMD screen and sound system for a wedding — on time, crisp picture, and their operator stayed till the end." },
  { name: "Hamza Iqbal", role: "Homeowner, Bahria Town", q: "They told me honestly that 6 kW was enough instead of selling me 10. That's why I trusted them." },
  { name: "Dr. Kamran Ali", role: "Ali Medical Clinic", q: "Our UPS kept failing. They repaired it, then moved us to solar with backup. Zero downtime since." },
];

export const faqs = [
  { q: "What size solar system do I need?", a: "Send us your last 12 months of electricity bills on WhatsApp. We'll suggest a size for free — most 10-marla homes need 5–8 kW, 1-kanal homes 10–15 kW." },
  { q: "How long does installation take?", a: "Home systems usually take 1–3 days after the site survey. Commercial projects take 1–4 weeks depending on size." },
  { q: "Do you handle net-metering with LESCO?", a: "Yes. We prepare the documents, submit the application and follow up until your green meter is installed." },
  { q: "What warranty do I get?", a: "Panels carry 12 years product and 25–30 years output warranty. Inverters 2–10 years and lithium batteries 5–10 years by brand. We file the claims for you." },
  { q: "Can I pay in instalments?", a: "Yes — we offer bank financing and instalment plans through partner banks. Card, JazzCash, Easypaisa, bank transfer and cash on delivery are also accepted." },
  { q: "Do you rent projectors and SMD screens for one day?", a: "Yes. Projectors, SMD screens and sound systems are available by the day, delivered, set up and operated by our crew." },
];

export const projects = [
  {
    slug: "dha-25kw-hybrid",
    title: "25 kW Hybrid Home",
    area: "DHA Phase 6, Lahore",
    kind: "panel" as Kind,
    summary: "A full-house hybrid system with 32 kWh of lithium storage — the family runs three ACs on solar through summer.",
    meta: [["Client", "Private residence"], ["Completed", "May 2026"], ["System", "25 kW hybrid"], ["Duration", "4 days"]],
    outcome: [["86%", "Lower monthly bill"], ["3,150 kWh", "Generated per month"], ["3.2 yrs", "Payback period"]],
  },
  {
    slug: "factory-250kw",
    title: "250 kW Factory Rooftop",
    area: "Sundar Industrial Estate, Lahore",
    kind: "stand" as Kind,
    summary: "On-grid rooftop plant with net-metering to cut daytime production costs.",
    meta: [["Client", "Tariq Textiles"], ["Completed", "March 2026"], ["System", "250 kW on-grid"], ["Duration", "3 weeks"]],
    outcome: [["62%", "Lower monthly bill"], ["31,500 kWh", "Generated per month"], ["2.8 yrs", "Payback period"]],
  },
  {
    slug: "school-smart-classrooms",
    title: "Smart Classrooms",
    area: "City School Campus, Lahore",
    kind: "board" as Kind,
    summary: "Interactive touch boards, projectors and CCTV across 14 classrooms.",
    meta: [["Client", "City School Campus"], ["Completed", "August 2026"], ["Scope", "Boards, CCTV, IT"], ["Duration", "1 weekend"]],
    outcome: [["14", "Classrooms upgraded"], ["32", "CCTV cameras"], ["0", "Teaching days lost"]],
  },
  {
    slug: "clinic-backup",
    title: "Clinic Power Backup",
    area: "Model Town, Lahore",
    kind: "battery" as Kind,
    summary: "8 kW hybrid with 10 kWh lithium so the clinic's equipment never goes down.",
    meta: [["Client", "Ali Medical Clinic"], ["Completed", "January 2026"], ["System", "8 kW hybrid"], ["Duration", "2 days"]],
    outcome: [["100%", "Uptime since install"], ["71%", "Lower monthly bill"], ["10 kWh", "Night backup"]],
  },
  {
    slug: "farm-tubewell",
    title: "Solar Tubewell",
    area: "Sheikhupura",
    kind: "panel" as Kind,
    summary: "40 kW solar pumping system replacing a diesel generator on a 50-acre farm.",
    meta: [["Client", "Private farm"], ["Completed", "April 2026"], ["System", "40 kW VFD"], ["Duration", "6 days"]],
    outcome: [["Rs. 0", "Diesel per month"], ["50 acres", "Irrigated"], ["2.1 yrs", "Payback period"]],
  },
  {
    slug: "plaza-cctv",
    title: "Plaza Security",
    area: "Gulberg III, Lahore",
    kind: "cctv" as Kind,
    summary: "64 4K cameras, a control room and face attendance for 120 staff.",
    meta: [["Client", "Commercial plaza"], ["Completed", "June 2026"], ["Scope", "CCTV + attendance"], ["Duration", "10 days"]],
    outcome: [["64", "4K cameras"], ["30 days", "Recording"], ["120", "Staff on attendance"]],
  },
];

export const paymentMethods = ["JazzCash", "Easypaisa", "Visa / Mastercard", "Bank transfer", "Cash on delivery"];
