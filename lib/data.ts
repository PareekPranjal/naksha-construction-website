// Placeholder data for the entire site.
// All content here is fictional / Lorem-style and intended to be swapped
// with real content by the client one section at a time.

import { picsum } from "./utils";

export const LOREM = {
  short:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum nibh.",
  medium:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum nibh ut enim suscipit, in pulvinar lectus tincidunt. Mauris a porta lacus, vitae pharetra ipsum. Phasellus auctor lacus a metus convallis, in pretium urna ultrices.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum nibh ut enim suscipit, in pulvinar lectus tincidunt. Mauris a porta lacus, vitae pharetra ipsum. Phasellus auctor lacus a metus convallis, in pretium urna ultrices. Etiam quis purus eget tortor pulvinar imperdiet. Sed accumsan, sapien at faucibus dictum, mauris urna posuere lectus, vitae lacinia neque ipsum vitae lectus. Nullam tincidunt sapien quis sapien commodo, eget porta lectus tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  paragraphs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum nibh ut enim suscipit, in pulvinar lectus tincidunt. Mauris a porta lacus.",
    "Phasellus auctor lacus a metus convallis, in pretium urna ultrices. Etiam quis purus eget tortor pulvinar imperdiet. Sed accumsan, sapien at faucibus dictum.",
    "Mauris urna posuere lectus, vitae lacinia neque ipsum vitae lectus. Nullam tincidunt sapien quis sapien commodo, eget porta lectus tincidunt. Pellentesque habitant.",
    "Curabitur ac eros at libero gravida tristique. Vivamus mollis, est nec ornare bibendum, magna sapien lacinia ipsum, in tristique enim mi at orci.",
  ],
  bullets: [
    "Quality-first delivery rooted in 11 years of regional expertise",
    "Integrated preconstruction and value-engineering workflows",
    "Sustainable material sourcing across every project tier",
    "Transparent client reporting from kickoff through handover",
    "In-house safety program meeting international benchmarks",
  ],
};

// ── Markets ───────────────────────────────────────────────────────────────────

export type Market = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  capabilities: string[];
  image: string;
  stats: { label: string; value: string }[];
};

export const MARKETS: Market[] = [
  {
    slug: "aviation",
    title: "Aviation",
    short: "Terminals, hangars, and airside facilities engineered for round-the-clock operations.",
    intro: LOREM.medium,
    capabilities: [
      "Terminal expansions and renovations",
      "Cargo and maintenance hangars",
      "Air traffic and control facilities",
      "Airside support infrastructure",
    ],
    image: picsum("market-aviation", 1600, 1000),
    stats: [
      { label: "Aviation projects delivered", value: "12" },
      { label: "Sq. ft. of terminal space", value: "1.4M" },
      { label: "On-time handover rate", value: "97%" },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial",
    short: "Office towers, mixed-use developments, and retail destinations across Rajasthan.",
    intro: LOREM.medium,
    capabilities: [
      "Grade A office buildings",
      "Mixed-use developments",
      "Retail and hospitality interiors",
      "Tenant fit-outs and core-and-shell",
    ],
    image: picsum("market-commercial", 1600, 1000),
    stats: [
      { label: "Commercial sq. ft. delivered", value: "3.2M" },
      { label: "Tenant fit-outs completed", value: "85+" },
      { label: "LEED-certified projects", value: "9" },
    ],
  },
  {
    slug: "education",
    title: "Education",
    short: "Schools, universities, and research campuses built around how people actually learn.",
    intro: LOREM.medium,
    capabilities: [
      "K-12 academic buildings",
      "University libraries and labs",
      "Research and innovation centers",
      "Student housing and recreation",
    ],
    image: picsum("market-education", 1600, 1000),
    stats: [
      { label: "Campuses delivered", value: "18" },
      { label: "Classrooms built", value: "240" },
      { label: "Schedule adherence", value: "94%" },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    short: "Hospitals, diagnostic centers, and specialty clinics held to clinical-grade tolerances.",
    intro: LOREM.medium,
    capabilities: [
      "Acute-care hospital additions",
      "Operating theaters and ICUs",
      "Outpatient and diagnostic centers",
      "Medical office and research wings",
    ],
    image: picsum("market-healthcare", 1600, 1000),
    stats: [
      { label: "Healthcare beds added", value: "1,250" },
      { label: "Operating theaters", value: "32" },
      { label: "Compliance audits passed", value: "100%" },
    ],
  },
  {
    slug: "pharmaceutical",
    title: "Pharmaceutical",
    short: "GMP manufacturing, R&D labs, and cleanroom environments held to regulatory standards.",
    intro: LOREM.medium,
    capabilities: [
      "GMP manufacturing facilities",
      "Cleanroom and lab fit-outs",
      "Process utility infrastructure",
      "Validation and commissioning support",
    ],
    image: picsum("market-pharma", 1600, 1000),
    stats: [
      { label: "GMP facilities delivered", value: "7" },
      { label: "Cleanroom sq. ft.", value: "180k" },
      { label: "Validation pass rate", value: "100%" },
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    short: "Stadiums, training facilities, and recreational venues for athletes and fans alike.",
    intro: LOREM.medium,
    capabilities: [
      "Stadium and arena construction",
      "Training and performance centers",
      "Aquatic and indoor facilities",
      "Spectator and broadcast infrastructure",
    ],
    image: picsum("market-sports", 1600, 1000),
    stats: [
      { label: "Spectator capacity built", value: "65,000" },
      { label: "Training centers", value: "11" },
      { label: "Event-ready handovers", value: "100%" },
    ],
  },
  {
    slug: "government",
    title: "Government",
    short: "Civic, judicial, and infrastructure projects delivered to public-sector standards.",
    intro: LOREM.medium,
    capabilities: [
      "Civic centers and administrative buildings",
      "Judicial and correctional facilities",
      "Transportation infrastructure",
      "Public realm and streetscape works",
    ],
    image: picsum("market-government", 1600, 1000),
    stats: [
      { label: "Government projects", value: "22" },
      { label: "Public sq. ft. delivered", value: "1.8M" },
      { label: "Audit compliance", value: "100%" },
    ],
  },
  {
    slug: "data-centers",
    title: "Data Centers",
    short: "Mission-critical hyperscale and colocation facilities for the digital economy.",
    intro: LOREM.medium,
    capabilities: [
      "Hyperscale data center cores",
      "Colocation fit-outs",
      "Power and cooling infrastructure",
      "Network and meet-me rooms",
    ],
    image: picsum("market-datacenters", 1600, 1000),
    stats: [
      { label: "MW of capacity built", value: "180" },
      { label: "Tier III+ deliveries", value: "6" },
      { label: "Schedule certainty", value: "98%" },
    ],
  },
];

// ── Services ──────────────────────────────────────────────────────────────────

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  outcomes: string[];
  process: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  image: string;
};

const SERVICE_PROCESS = [
  {
    step: "01",
    title: "Discovery",
    body: "Site walks, stakeholder interviews, and program mapping to set a shared baseline before drawings begin.",
  },
  {
    step: "02",
    title: "Preconstruction",
    body: "Estimating, schedule modeling, value engineering, and constructability review against the brief.",
  },
  {
    step: "03",
    title: "Build",
    body: "Trade coordination, daily safety briefings, transparent reporting, and proactive risk management.",
  },
  {
    step: "04",
    title: "Handover",
    body: "Punch-list closeout, commissioning, owner training, and a structured warranty program.",
  },
];

const SERVICE_FAQ = [
  { q: "What size projects do you take on?", a: LOREM.medium },
  { q: "How do you price preconstruction services?", a: LOREM.medium },
  { q: "Can you work alongside our existing architects?", a: LOREM.medium },
  { q: "What is your safety record?", a: LOREM.medium },
];

export const SERVICES: Service[] = [
  {
    slug: "construction-management",
    title: "Construction Management",
    short: "End-to-end management of complex builds, from groundbreaking to handover.",
    description: LOREM.long,
    outcomes: [
      "Single point of accountability through delivery",
      "Integrated cost and schedule controls",
      "Transparent reporting cadence with the owner",
      "Risk-managed trade coordination",
    ],
    process: SERVICE_PROCESS,
    faq: SERVICE_FAQ,
    image: picsum("service-cm", 1600, 1000),
  },
  {
    slug: "general-contracting",
    title: "General Contracting",
    short: "Lump-sum or GMP delivery with the trade depth Rajasthan projects demand.",
    description: LOREM.long,
    outcomes: [
      "Competitive, scope-tight bids",
      "Self-perform capability on key trades",
      "Schedule and budget certainty",
      "Quality control across every package",
    ],
    process: SERVICE_PROCESS,
    faq: SERVICE_FAQ,
    image: picsum("service-gc", 1600, 1000),
  },
  {
    slug: "design-build",
    title: "Design-Build",
    short: "One contract, one team, one accountable outcome — design and construction integrated.",
    description: LOREM.long,
    outcomes: [
      "Earlier price certainty",
      "Faster delivery via overlap",
      "Single source of design and build risk",
      "Tighter feedback between trades and design",
    ],
    process: SERVICE_PROCESS,
    faq: SERVICE_FAQ,
    image: picsum("service-db", 1600, 1000),
  },
  {
    slug: "preconstruction",
    title: "Preconstruction",
    short: "Estimating, scheduling, and constructability work before a shovel hits the ground.",
    description: LOREM.long,
    outcomes: [
      "Reliable conceptual estimates",
      "Constructability and value engineering",
      "Detailed CPM schedule modeling",
      "Procurement and long-lead planning",
    ],
    process: SERVICE_PROCESS,
    faq: SERVICE_FAQ,
    image: picsum("service-precon", 1600, 1000),
  },
  {
    slug: "special-projects",
    title: "Special Projects",
    short: "Fit-outs, renovations, and fast-track work where speed and surgical precision matter.",
    description: LOREM.long,
    outcomes: [
      "Fast-track scheduling",
      "Minimal disruption to occupied spaces",
      "Phased delivery options",
      "Specialty trade coordination",
    ],
    process: SERVICE_PROCESS,
    faq: SERVICE_FAQ,
    image: picsum("service-special", 1600, 1000),
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export type Project = {
  slug: string;
  title: string;
  category: string; // matches Market.title
  location: string;
  year: number;
  squareFeet: string;
  duration: string;
  client: string;
  cover: string;
  gallery: string[];
  challenge: string;
  solution: string;
  outcomes: string[];
  testimonial?: { quote: string; attribution: string; role: string };
};

const RAJASTHAN_CITIES = [
  "Jaipur",
  "Udaipur",
  "Jodhpur",
  "Ajmer",
  "Bikaner",
  "Kota",
  "Alwar",
  "Bhilwara",
  "Sikar",
  "Mount Abu",
  "Pushkar",
  "Chittorgarh",
];

const PROJECT_TITLES: { title: string; category: string }[] = [
  { title: "Aravalli Tech Park", category: "Commercial" },
  { title: "Sundar Marg Civic Center", category: "Government" },
  { title: "Chand Mahal Hospital Wing", category: "Healthcare" },
  { title: "Pink City International School", category: "Education" },
  { title: "Marwar Hyperscale Campus", category: "Data Centers" },
  { title: "Thar Sports Arena", category: "Sports" },
  { title: "Dhola Bio-Pharma Facility", category: "Pharmaceutical" },
  { title: "Vidhya Nagar University Library", category: "Education" },
  { title: "Sambhar Aviation Hangar", category: "Aviation" },
  { title: "Ranthambore Retail Quarter", category: "Commercial" },
  { title: "Jal Mahal Wellness Center", category: "Healthcare" },
  { title: "Nathdwara Government Complex", category: "Government" },
];

export const PROJECTS: Project[] = PROJECT_TITLES.map((p, i) => {
  const city = RAJASTHAN_CITIES[i % RAJASTHAN_CITIES.length];
  return {
    slug: p.title.toLowerCase().replace(/\s+/g, "-"),
    title: p.title,
    category: p.category,
    location: `${city}, Rajasthan`,
    year: 2024 - (i % 6),
    squareFeet: `${(80 + i * 23).toLocaleString()},000`,
    duration: `${18 + (i % 18)} months`,
    client: `Confidential Client ${String.fromCharCode(65 + i)}`,
    cover: picsum(`project-${i}-cover`, 1600, 1000),
    gallery: [
      picsum(`project-${i}-g1`, 1400, 900),
      picsum(`project-${i}-g2`, 1400, 900),
      picsum(`project-${i}-g3`, 1400, 900),
      picsum(`project-${i}-g4`, 1400, 900),
    ],
    challenge: LOREM.long,
    solution: LOREM.long,
    outcomes: [
      "Delivered ahead of schedule",
      "Zero lost-time incidents",
      "Under-budget close-out",
      "Sustained client partnership",
    ],
    testimonial: {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum nibh ut enim suscipit, in pulvinar lectus tincidunt mauris a porta lacus.",
      attribution: `Placeholder Name ${i + 1}`,
      role: "Owner Representative",
    },
  };
});

// ── Leadership ────────────────────────────────────────────────────────────────

export type Leader = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

export const LEADERS: Leader[] = [
  { name: "Aarav Sharma", role: "Managing Director" },
  { name: "Diya Mehta", role: "Chief Operating Officer" },
  { name: "Vihaan Khandelwal", role: "Director of Preconstruction" },
  { name: "Anaya Rathore", role: "Head of Design-Build" },
  { name: "Reyansh Agarwal", role: "Director of Field Operations" },
  { name: "Kavya Bansal", role: "Head of Sustainability" },
  { name: "Arjun Choudhary", role: "Director of Healthcare Markets" },
  { name: "Saanvi Joshi", role: "Head of People & Culture" },
].map((p, i) => ({
  ...p,
  bio: LOREM.medium,
  avatar: picsum(`leader-${i}`, 800, 800),
}));

// ── Insights / Articles ───────────────────────────────────────────────────────

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  cover: string;
  body: string[];
};

const ARTICLE_TITLES = [
  { t: "Why Modular Builds Are Reshaping Rajasthan", c: "Innovation" },
  { t: "Five Sustainability Wins From Our Last Twelve Months", c: "Sustainability" },
  { t: "What Owners Should Ask in a Preconstruction Kickoff", c: "Insight" },
  { t: "Lessons From Delivering a Hospital in Eighteen Months", c: "Healthcare" },
  { t: "Heat-Resilient Materials for the Thar Climate", c: "Materials" },
  { t: "How We Train First-Year Engineers at Naksha", c: "Careers" },
  { t: "Designing Education Spaces for the Next Decade", c: "Education" },
  { t: "Risk Modeling in Mid-Sized Construction", c: "Operations" },
];

export const ARTICLES: Article[] = ARTICLE_TITLES.map((a, i) => {
  const slug = a.t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const date = new Date(2025, 11 - i, 5 + i).toISOString();
  return {
    slug,
    title: a.t,
    category: a.c,
    date,
    excerpt: LOREM.medium,
    author: LEADERS[i % LEADERS.length].name,
    cover: picsum(`article-${i}`, 1600, 1000),
    body: [...LOREM.paragraphs, ...LOREM.paragraphs],
  };
});

// ── Open roles ────────────────────────────────────────────────────────────────

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Apprenticeship";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

const JOB_TITLES = [
  { t: "Senior Project Manager", d: "Operations" },
  { t: "Site Safety Officer", d: "Operations" },
  { t: "Estimator (Preconstruction)", d: "Preconstruction" },
  { t: "MEP Coordinator", d: "Engineering" },
  { t: "Quantity Surveyor", d: "Commercial" },
  { t: "Sustainability Lead", d: "Sustainability" },
  { t: "Junior Architect (Design-Build)", d: "Design" },
  { t: "Apprentice Carpenter", d: "Trades" },
];

export const JOBS: Job[] = JOB_TITLES.map((j, i) => ({
  slug: j.t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title: j.t,
  department: j.d,
  location: RAJASTHAN_CITIES[i % RAJASTHAN_CITIES.length] + ", India",
  type: i === 7 ? "Apprenticeship" : i === 4 ? "Contract" : "Full-time",
  summary: LOREM.medium,
  responsibilities: LOREM.bullets,
  requirements: LOREM.bullets,
  benefits: [
    "Comprehensive medical and dental cover",
    "Annual professional development budget",
    "Hybrid working where the role allows",
    "Performance-linked annual bonus",
    "Family leave above statutory minimums",
  ],
}));

// ── Office locations ──────────────────────────────────────────────────────────

export type Location = {
  city: string;
  address: string[];
  phone: string;
  email: string;
  image: string;
};

export const LOCATIONS: Location[] = [
  {
    city: "Jaipur (HQ)",
    address: ["Plot 12, Civil Lines", "Jaipur, Rajasthan 302006"],
    phone: "+91 98765 43210",
    email: "jaipur@nakshaconstruction.example",
    image: picsum("loc-jaipur", 1200, 800),
  },
  {
    city: "Udaipur",
    address: ["28 Lake View Marg", "Udaipur, Rajasthan 313001"],
    phone: "+91 98765 43211",
    email: "udaipur@nakshaconstruction.example",
    image: picsum("loc-udaipur", 1200, 800),
  },
  {
    city: "Jodhpur",
    address: ["6 Industrial Estate, Phase II", "Jodhpur, Rajasthan 342003"],
    phone: "+91 98765 43212",
    email: "jodhpur@nakshaconstruction.example",
    image: picsum("loc-jodhpur", 1200, 800),
  },
  {
    city: "Kota",
    address: ["44 Talwandi Sector", "Kota, Rajasthan 324005"],
    phone: "+91 98765 43213",
    email: "kota@nakshaconstruction.example",
    image: picsum("loc-kota", 1200, 800),
  },
  {
    city: "Bikaner",
    address: ["19 Rani Bazaar Road", "Bikaner, Rajasthan 334001"],
    phone: "+91 98765 43214",
    email: "bikaner@nakshaconstruction.example",
    image: picsum("loc-bikaner", 1200, 800),
  },
  {
    city: "Ajmer",
    address: ["Beawar Road, MIA", "Ajmer, Rajasthan 305002"],
    phone: "+91 98765 43215",
    email: "ajmer@nakshaconstruction.example",
    image: picsum("loc-ajmer", 1200, 800),
  },
];

// ── Headline stats (for stat strips) ──────────────────────────────────────────

export const COMPANY_STATS = [
  { value: 11, suffix: "+", label: "Years of practice" },
  { value: 50, suffix: "+", label: "People across the studio" },
  { value: 120, suffix: "", label: "Projects delivered" },
  { value: 6, suffix: "M", label: "Sq. ft. built" },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    quote: LOREM.medium,
    attribution: "Placeholder Client A",
    role: "Director of Facilities",
  },
  {
    quote: LOREM.medium,
    attribution: "Placeholder Client B",
    role: "Vice President, Real Estate",
  },
  {
    quote: LOREM.medium,
    attribution: "Placeholder Client C",
    role: "Chief Operating Officer",
  },
];

// ── Sustainability commitments ────────────────────────────────────────────────

export const COMMITMENTS = [
  {
    key: "materials",
    title: "Sustainable Materials",
    body: LOREM.long,
    image: picsum("commit-materials", 1400, 900),
  },
  {
    key: "energy",
    title: "Energy & Carbon",
    body: LOREM.long,
    image: picsum("commit-energy", 1400, 900),
  },
  {
    key: "water",
    title: "Water Stewardship",
    body: LOREM.long,
    image: picsum("commit-water", 1400, 900),
  },
  {
    key: "community",
    title: "Community & Skills",
    body: LOREM.long,
    image: picsum("commit-community", 1400, 900),
  },
  {
    key: "safety",
    title: "Health & Safety",
    body: LOREM.long,
    image: picsum("commit-safety", 1400, 900),
  },
];

// ── Timeline (history) ────────────────────────────────────────────────────────

export const TIMELINE = [
  { year: "2014", title: "Naksha founded", body: LOREM.short },
  { year: "2016", title: "First commercial milestone", body: LOREM.short },
  { year: "2018", title: "Healthcare practice launched", body: LOREM.short },
  { year: "2020", title: "Sustainability framework introduced", body: LOREM.short },
  { year: "2022", title: "Expanded to four cities", body: LOREM.short },
  { year: "2024", title: "Crossed 100 projects delivered", body: LOREM.short },
];
