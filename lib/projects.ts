// ─────────────────────────────────────────────────────────────────────────
// PROJECT DATA — edit everything here. Each project renders a full case study
// at /work/[slug]. Drop a cover image at /public/work/<slug>/cover.jpg and
// gallery images at /public/work/<slug>/01.jpg, 02.jpg ... to replace the
// colored placeholders automatically.
// ─────────────────────────────────────────────────────────────────────────

export type Category = "UX/UI Design" | "Web Design";

export type CaseSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** short tagline shown under the title in lists */
  summary: string;
  client: string;
  role: string;
  year: string;
  /** comma-free list of tags shown in the case study meta */
  tags: string[];
  /** hex used for the placeholder block + accent until real images are added */
  accent: string;
  /** dark or light text over the accent block */
  accentText?: "light" | "dark";
  /** the opening paragraph of the case study */
  overview: string;
  /** ordered case-study sections: challenge → process → solution → impact */
  sections: CaseSection[];
  /** headline outcomes shown as big stats (optional) */
  metrics?: { value: string; label: string }[];
  /** number of gallery image slots to render */
  gallery: number;
  /** optional external link (live site, Dribbble, prototype) */
  externalUrl?: string;
  externalLabel?: string;
};

const placeholderSections = (kind: string): CaseSection[] => [
  {
    heading: "The challenge",
    body: `Replace this with the core problem you set out to solve on ${kind}. Frame it around the user need and the business goal — what was broken, who it affected, and why it mattered.`,
  },
  {
    heading: "Process",
    body: "Walk through how you approached it: research, user flows, wireframes, design-system work, and the key decisions and trade-offs you made along the way. Keep it focused on your thinking.",
  },
  {
    heading: "Solution",
    body: "Describe the final design — the flows, the components, the interaction patterns — and how each piece answers the challenge above. Pair this with the screens in the gallery.",
  },
  {
    heading: "Impact",
    body: "Close with outcomes: adoption, task-completion, conversion, qualitative feedback, or what shipped. Even directional numbers help recruiters understand the value you delivered.",
  },
];

export const projects: Project[] = [
  {
    slug: "k-plus-investment",
    title: "K PLUS Investment",
    category: "UX/UI Design",
    summary: "An in-app investment experience for one of Thailand's largest banking apps.",
    client: "KASIKORNBANK",
    role: "Senior UX/UI Designer",
    year: "2024",
    tags: ["Fintech", "Mobile", "Investing", "Design System"],
    accent: "#0f5132",
    accentText: "light",
    overview:
      "Designing an approachable investment flow inside K PLUS — helping everyday banking customers move from saving to investing without feeling overwhelmed.",
    sections: placeholderSections("the K PLUS Investment flow"),
    metrics: [
      { value: "10M+", label: "App users reached" },
      { value: "Mobile", label: "Platform focus" },
    ],
    gallery: 4,
  },
  {
    slug: "bitkub-next",
    title: "Bitkub NEXT",
    category: "UX/UI Design",
    summary: "A self-custody crypto wallet that makes Web3 feel as safe as mobile banking.",
    client: "Bitkub",
    role: "Senior UX/UI Designer",
    year: "2023",
    tags: ["Crypto", "Web3", "Wallet", "Mobile"],
    accent: "#0a5f55",
    accentText: "light",
    overview:
      "Bitkub NEXT brings self-custody wallets, NFTs and dApps into one place. The work focused on demystifying Web3 concepts for mainstream Thai users.",
    sections: placeholderSections("Bitkub NEXT"),
    metrics: [
      { value: "Web3", label: "Self-custody wallet" },
      { value: "0→1", label: "Product stage" },
    ],
    gallery: 4,
  },
  {
    slug: "finvest-redesign",
    title: "Finvest Redesign",
    category: "UX/UI Design",
    summary: "Rethinking a wealth-management platform from the information architecture up.",
    client: "Finvest",
    role: "UX/UI Designer",
    year: "2023",
    tags: ["Fintech", "Redesign", "Wealth", "IA"],
    accent: "#1d3a8a",
    accentText: "light",
    overview:
      "A ground-up redesign of Finvest's wealth platform — restructuring navigation, modernising the visual language and tightening the path to action.",
    sections: placeholderSections("the Finvest redesign"),
    gallery: 4,
  },
  {
    slug: "skl-connect",
    title: "SKL Connect",
    category: "UX/UI Design",
    summary: "A leasing & financing companion app built around real customer journeys.",
    client: "Saksiam Leasing",
    role: "UX/UI Designer",
    year: "2022",
    tags: ["Fintech", "Mobile", "Leasing"],
    accent: "#9a3412",
    accentText: "light",
    overview:
      "SKL Connect gives leasing customers a clear view of their contracts, payments and services — turning paperwork-heavy processes into a few taps.",
    sections: placeholderSections("SKL Connect"),
    gallery: 4,
  },
  {
    slug: "daily-ui-challenge",
    title: "Daily UI Challenge",
    category: "UX/UI Design",
    summary: "A running series of UI explorations and interaction studies.",
    client: "Personal",
    role: "UI Designer",
    year: "Ongoing",
    tags: ["UI", "Exploration", "Motion", "Dribbble"],
    accent: "#7c2d92",
    accentText: "light",
    overview:
      "An ongoing personal practice — one interface a day — used to explore visual styles, micro-interactions and edge-case states outside of client constraints.",
    sections: placeholderSections("the Daily UI series"),
    gallery: 6,
    externalUrl: "https://dribbble.com/sukuntapuksa",
    externalLabel: "View on Dribbble",
  },
  {
    slug: "staygold",
    title: "StayGold",
    category: "UX/UI Design",
    summary: "A lifestyle booking experience with a warm, premium feel.",
    client: "StayGold",
    role: "UX/UI Designer",
    year: "2022",
    tags: ["Booking", "Lifestyle", "Mobile"],
    accent: "#b45309",
    accentText: "light",
    overview:
      "StayGold reimagines the booking journey with a premium, editorial aesthetic — balancing rich imagery against a frictionless reservation flow.",
    sections: placeholderSections("StayGold"),
    gallery: 4,
  },
  {
    slug: "de-fence",
    title: "DE-fence",
    category: "UX/UI Design",
    summary: "A security-focused product concept turning protection into clarity.",
    client: "DE-fence",
    role: "UX/UI Designer",
    year: "2022",
    tags: ["Security", "Concept", "Mobile"],
    accent: "#1f2937",
    accentText: "light",
    overview:
      "DE-fence explores how to communicate digital safety without fear — using calm visuals and progressive disclosure to keep users informed and in control.",
    sections: placeholderSections("DE-fence"),
    gallery: 4,
  },
  {
    slug: "tossakan",
    title: "Tossakan",
    category: "UX/UI Design",
    summary: "A culturally-rooted concept blending Thai heritage with modern UI.",
    client: "Tossakan",
    role: "UX/UI Designer",
    year: "2021",
    tags: ["Concept", "Branding", "UI"],
    accent: "#7f1d1d",
    accentText: "light",
    overview:
      "Tossakan is a concept that weaves Thai mythological identity into a contemporary digital product — a study in cultural storytelling through interface.",
    sections: placeholderSections("Tossakan"),
    gallery: 4,
  },
  {
    slug: "samui-plus",
    title: "Samui Plus",
    category: "UX/UI Design",
    summary: "A travel-program app guiding visitors through a safe-island journey.",
    client: "Samui Plus",
    role: "UX/UI Designer",
    year: "2021",
    tags: ["Travel", "Mobile", "Service Design"],
    accent: "#0e7490",
    accentText: "light",
    overview:
      "Samui Plus guides travellers step-by-step through the island's entry programme — turning a complex set of requirements into a guided, reassuring flow.",
    sections: placeholderSections("Samui Plus"),
    gallery: 4,
  },
  {
    slug: "cargo-work",
    title: "Cargo Work",
    category: "Web Design",
    summary: "A logistics platform spanning web dashboard and mobile operations.",
    client: "Cargo Work",
    role: "UX/UI Designer",
    year: "2023",
    tags: ["Logistics", "Web App", "Dashboard", "Mobile"],
    accent: "#15803d",
    accentText: "light",
    overview:
      "Cargo Work connects shippers and operators across web and mobile — designing dense operational data into a calm, scannable working surface.",
    sections: placeholderSections("Cargo Work"),
    gallery: 4,
  },
  {
    slug: "astro-solutions",
    title: "Astro Solutions",
    category: "Web Design",
    summary: "A corporate site that makes a technical service feel effortless.",
    client: "Astro Solutions",
    role: "Web Designer",
    year: "2022",
    tags: ["Corporate", "Landing", "Web"],
    accent: "#312e81",
    accentText: "light",
    overview:
      "A marketing site for a technology services company — built to communicate credibility, clarity and momentum from the first scroll.",
    sections: placeholderSections("Astro Solutions"),
    gallery: 3,
  },
  {
    slug: "airport-thailand",
    title: "Airport Thailand",
    category: "Web Design",
    summary: "A landing page concept for the national airports experience.",
    client: "Airports of Thailand",
    role: "Web Designer",
    year: "2022",
    tags: ["Landing Page", "Public Sector", "Web"],
    accent: "#155e75",
    accentText: "light",
    overview:
      "A landing-page concept for Airports of Thailand — organising travel information, services and wayfinding into a single welcoming entry point.",
    sections: placeholderSections("the Airport Thailand landing page"),
    gallery: 3,
  },
  {
    slug: "unicorn-house",
    title: "Unicorn House",
    category: "Web Design",
    summary: "A bold brand site with playful motion and strong typography.",
    client: "Unicorn House",
    role: "Web Designer",
    year: "2021",
    tags: ["Brand", "Web", "Motion"],
    accent: "#9d174d",
    accentText: "light",
    overview:
      "Unicorn House needed a site as distinctive as its brand — leaning into expressive type, colour and motion while keeping the content easy to navigate.",
    sections: placeholderSections("Unicorn House"),
    gallery: 3,
  },
  {
    slug: "sha-plus",
    title: "SHA+",
    category: "Web Design",
    summary: "A landing page for Thailand's tourism safety & hygiene standard.",
    client: "SHA+ / TAT",
    role: "Web Designer",
    year: "2021",
    tags: ["Landing Page", "Tourism", "Web"],
    accent: "#0f766e",
    accentText: "light",
    overview:
      "A landing page communicating the SHA+ safety standard to travellers and businesses — clear, trustworthy and quick to act on.",
    sections: placeholderSections("the SHA+ landing page"),
    gallery: 3,
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsByCategory = (category: Category) =>
  projects.filter((p) => p.category === category);

export const categories: Category[] = ["UX/UI Design", "Web Design"];
