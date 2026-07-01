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

// ── Rich case study (optional, flagship projects only) ──────────────────────
// A project can opt into a deeper layout by providing `caseStudy`. When present
// it replaces the simple `sections` + gallery. Other projects are untouched.

/** A captioned screen inside a rich block. Drop the file at the matching
 *  /public path; the colored placeholder shows until it exists. */
export type CaseImage = {
  src: string;
  caption?: string;
  /** tailwind aspect-ratio class, e.g. "aspect-[9/16]"; defaults to phone */
  ratio?: string;
};

/** A bold sub-heading + paragraph (one Design-Approach decision, a role, etc.) */
export type CasePoint = { title: string; body: string };

export type RichSection = {
  /** kicker above the heading, e.g. "Feature 02" or "The story" */
  kicker?: string;
  heading: string;
  /** short line under a feature name */
  oneLiner?: string;
  /** body paragraph(s); blank lines become paragraph breaks */
  body?: string;
  /** bold sub-heading + paragraph list */
  points?: CasePoint[];
  /** two-column reference rows, e.g. user insight → design priority */
  table?: { left: string; right: string }[];
  /** highlighted result / pull-quote (e.g. a validation number) */
  callout?: string;
  /** reflection list: each a principle + explanation + a "now" takeaway */
  lessons?: { heading: string; body: string; now: string }[];
  /** screens shown below the text, each with an optional caption */
  images?: CaseImage[];
  /** columns the image row uses (default 3) */
  imageCols?: 2 | 3;
  /** infinite auto-scroll image strip (two rows, opposite directions) */
  slider?: string[];
  sliderCaption?: string;
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
  /** extended meta shown in the case-study sidebar (optional) */
  team?: string;
  platform?: string;
  tools?: string;
  methods?: string;
  /** flagship rich case study; when present it replaces `sections` + gallery */
  caseStudy?: RichSection[];
};

const projectList: Project[] = [
  {
    slug: "k-plus-investment",
    title: "K PLUS Investment",
    category: "UX/UI Design",
    summary:
      "Designed the investment experience for Thailand's most-used banking app, bringing investing directly to millions of K PLUS users.",
    client: "Kasikorn Bank",
    role: "Senior UX/UI Designer",
    year: "2024",
    tags: ["Fintech", "Investing", "Mobile", "Design System"],
    accent: "#0f5132",
    accentText: "light",
    team: "Suppanut Sukuntapuksa, Watsakan Aunarout, Kiattisak Deethongon",
    platform: "Mobile (iOS, Android)",
    tools: "Figma, Adobe Creative Suite, Overflow",
    methods: "Wireframing, Prototyping, Usability Testing, Empathy & Journey Mapping",
    overview:
      "K PLUS Investment is a financial and investment experience built into K PLUS, Thailand's most-used banking app. It offers a wide range of investment assets from leading asset management companies, with tools that make investing timely and accessible: recommended funds, price alerts, tax-saving fund summaries, and buy/sell gold online. The goal was an experience that feels native to K PLUS while serving everyone from first-time investors to seasoned fund holders.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "The problem",
        body: "K PLUS Investment moved from a standalone app into a dedicated feature inside the K PLUS ecosystem, so it had to feel native to an app millions already use daily, while serving both first-time and experienced investors.",
      },
      {
        heading: "Approach",
        body: "Discovery surfaced three pain points, not knowing where to start, losing track of holdings, and slow fund search, which shaped six features that make investing accessible from the first fund to complex portfolios.",
      },
      {
        heading: "Outcome",
        body: "Launched as part of the K PLUS app, serving millions of users daily across all six feature areas designed.",
      },
    ],
    metrics: [
      { value: "10M+", label: "K PLUS users reached" },
      { value: "90%+", label: "Alert setup completed first try" },
    ],
    gallery: 0,
    caseStudy: [
      {
        kicker: "Role",
        heading: "What I did",
        points: [
          {
            title: "As UI Designer",
            body: "Created the user interface and worked with developers to plan the app's interactions.",
          },
          {
            title: "As UX Designer",
            body: "Discovered user needs and pain points, brainstormed ideas with the team, and developed features from findings, building medium-fidelity wireframes and prototypes to communicate ideas and gather feedback.",
          },
        ],
      },
      {
        kicker: "The story",
        heading: "The problem",
        body: `K PLUS Investment began as a standalone investment application. As the product direction evolved, Kasikorn Bank decided to consolidate it as a dedicated investment feature within the existing K PLUS ecosystem, bringing investing directly into the app millions of users already rely on daily.

This shift meant we weren't just designing an investment product. We were designing an experience that had to feel native to K PLUS while serving users who ranged from first-time investors to seasoned fund holders.`,
      },
      {
        kicker: "The story",
        heading: "What we discovered",
        body: "Through desk research and competitor analysis, three recurring pain points emerged from investment app users, each pointing to a clear design priority.",
        table: [
          { left: "“I don't know where to start.”", right: "Simplify discovery" },
          { left: "“I forgot what I was holding.”", right: "Surface portfolio at a glance" },
          { left: "“Finding a specific fund takes too long.”", right: "Make search faster" },
        ],
      },
      {
        kicker: "Foundation",
        heading: "Design foundation",
        body: `The design system balances K PLUS's established brand identity with the needs of a financial product, where clarity, trust, and data legibility come first.

Typography prioritizes readability of numbers and financial data at a glance. The palette extends K PLUS's existing green brand while introducing semantic colors for investment-specific states: gains, losses, neutral performance, and alerts.`,
        slider: [
          "/work/k-plus-investment/foundation.jpg",
          "/work/k-plus-investment/theme-01.jpg",
          "/work/k-plus-investment/tax-01.jpg",
          "/work/k-plus-investment/portfolio-01.jpg",
          "/work/k-plus-investment/alert-01.jpg",
          "/work/k-plus-investment/history-01.jpg",
          "/work/k-plus-investment/investment-01.jpg",
          "/work/k-plus-investment/theme-02.jpg",
        ],
      },
      {
        kicker: "Feature 01",
        heading: "App Theme",
        oneLiner: "A multi-tier theming system supporting General, Private Bank, and Wisdom customer segments.",
        body: "The Wisdom theme presented two technical challenges: color components needed conversion from a dark to a light theme structure, and the coding framework didn't support multi-theme creation out of the box.",
        points: [
          {
            title: "Solution",
            body: "I created a new semantic color system that supports each component while preserving the existing structure, enabling future theme variations without changing the underlying component code, across both General and Wisdom themes.",
          },
        ],
        images: [
          { src: "/work/k-plus-investment/theme-01.jpg", caption: "Theme color comparison, General vs Wisdom", ratio: "aspect-[4/3]" },
          { src: "/work/k-plus-investment/theme-02.jpg", caption: "Final screens across themes", ratio: "aspect-square" },
        ],
        imageCols: 2,
      },
      {
        kicker: "Feature 02",
        heading: "Tax Fund Summary",
        oneLiner: "An annual summary tool helping investors track tax-deductible fund purchases and identify matured holdings.",
        body: "Tax-deductible fund investors struggle to calculate deductions manually, track what they're still holding, and identify which funds have reached maturity.",
        points: [
          {
            title: "Separating fund types clearly",
            body: "Grouped SSF, RMF, and other categories visually with distinct labels and color coding, so users can identify holdings without needing to know the regulations.",
          },
          {
            title: "Managing dense information",
            body: "Structured the layout with a clear hierarchy: total deductible amount at the top, with scannable fund cards and collapsible details.",
          },
          {
            title: "Surfacing matured funds upfront",
            body: "Placed a dedicated “Matured Funds” tab at the top, separating sell-eligible holdings from the rest, turning a hidden status into the first thing users see.",
          },
        ],
        images: [
          { src: "/work/k-plus-investment/tax-01.jpg", caption: "Yearly summary, total deductible with breakdown by fund type", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/tax-02.jpg", caption: "Fund type detail, purchases and holding status", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/tax-03.jpg", caption: "Matured funds, met holding criteria and ready to sell", ratio: "aspect-square" },
        ],
      },
      {
        kicker: "Feature 03",
        heading: "Portfolio",
        oneLiner: "A unified view consolidating every asset type a user holds, from mutual funds to gold.",
        body: "K PLUS Investment offers a wide range of assets, but users holding multiple types had no single place to see them together, they had to navigate between sections and mentally piece together their financial position.",
        points: [
          {
            title: "Unifying diverse asset types in one view",
            body: "Designed a modular card system where each asset follows the same visual pattern but surfaces the data points most relevant to that asset type.",
          },
          {
            title: "Information architecture for scalability",
            body: "Before designing screens, I mapped the full IA so Portfolio could accommodate every asset type K PLUS offers, and future additions. This groundwork shaped how data is grouped, organized, and navigated.",
          },
        ],
        images: [
          { src: "/work/k-plus-investment/portfolio-ia.jpg", caption: "Information architecture, from overview to holding detail", ratio: "aspect-[4/3]" },
          { src: "/work/k-plus-investment/portfolio-01.jpg", caption: "Portfolio overview, total value with allocation breakdown", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/portfolio-02.jpg", caption: "Asset type breakdown, grouped by category", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/portfolio-03.jpg", caption: "Individual asset detail, performance & history", ratio: "aspect-[4/3]" },
        ],
        imageCols: 2,
      },
      {
        kicker: "Feature 04",
        heading: "Asset Alert",
        oneLiner: "A custom price-notification system letting investors act on opportunities without constant monitoring.",
        body: "Active investors miss buy/sell opportunities because fund prices fluctuate constantly, and they had no way to monitor multiple funds at once, forcing them to compare prices manually or rely on memory.",
        points: [
          {
            title: "Supporting multiple alert types in a single flow",
            body: "Designed a unified setup where users select alert type, direction, and threshold in one continuous flow, reducing decision fatigue while covering every common use case.",
          },
          {
            title: "Making multi-alert management effortless",
            body: "Designed the alert list to be quickly scannable, with clear status indicators and one-tap actions for editing, pausing, or deleting individual alerts.",
          },
        ],
        callout:
          "Over 90% of participants completed the full alert setup flow successfully on the first attempt, indicating the interaction model was intuitive across user types.",
        images: [
          { src: "/work/k-plus-investment/alert-01.jpg", caption: "Alert setup, type, direction, threshold in one flow", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/alert-02.jpg", caption: "Confirmation, review before confirming", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/alert-03.jpg", caption: "Alert list, scannable with quick management actions", ratio: "aspect-square" },
        ],
      },
      {
        kicker: "Feature 05",
        heading: "Transaction History",
        oneLiner: "An audit trail of all investment activity, designed to make high-volume data feel manageable.",
        body: "Users come to transaction history with intent, not curiosity, trying to answer a specific question. But long lists with no structure, ambiguous status, and a mental model fragmented across asset types kept them from getting answers quickly.",
        points: [
          {
            title: "Grouping by date, turning reading into scanning",
            body: "By grouping transactions under date headers, I shifted the interaction from “read every entry” to “find the right time period, then look”, leveraging how users actually remember financial events.",
          },
          {
            title: "A unified feed, designing for the user's mental model",
            body: "Different assets have different transaction structures, but users think of their activity as one history. I chose a single consolidated feed with a fixed card anatomy plus variable secondary data that adapts to each asset.",
          },
        ],
        images: [
          { src: "/work/k-plus-investment/history-01.jpg", caption: "Consolidated feed, chronological, grouped by date", ratio: "aspect-[4/3]" },
          { src: "/work/k-plus-investment/history-02.jpg", caption: "Filtered view, narrow to type, asset, or period", ratio: "aspect-square" },
        ],
        imageCols: 2,
      },
      {
        kicker: "Feature 06",
        heading: "Investment",
        oneLiner: "The gateway to every asset type K PLUS offers, designed as a decision aid, not a menu.",
        body: "Users arrive at investment screens in one of two mindsets: knowing exactly what they want, or having no idea where to start. The previous experience served neither, entry points were hidden, and users had no guidance on what fit them.",
        points: [
          {
            title: "Hierarchy through user intent, not product taxonomy",
            body: "Ordered asset types by user accessibility rather than alphabetically or by internal structure, placing familiar, low-barrier assets (mutual funds) above specialized instruments (structured notes). The layout signals where most investors typically begin.",
          },
          {
            title: "An entry point as a decision aid, not a directory",
            body: "Each tile surfaces three things per asset: what it is, why someone would choose it, and a clear entry action, turning each tile from a destination into a decision moment.",
          },
        ],
        images: [
          { src: "/work/k-plus-investment/investment-01.jpg", caption: "Investment hub, asset types ordered by accessibility", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/investment-02.jpg", caption: "Asset entry, cards that help users self-qualify", ratio: "aspect-square" },
          { src: "/work/k-plus-investment/investment-03.jpg", caption: "Category drill-down, hand-off to the dedicated flow", ratio: "aspect-square" },
        ],
      },
      {
        kicker: "Process",
        heading: "Collaboration & development",
        lessons: [
          {
            heading: "Align the vision before the first pixel.",
            body: "A stakeholder workshop before kickoff surfaced misaligned expectations early, when they were still cheap to resolve. The hours spent agreeing on direction saved weeks of rework downstream.",
            now: "“run a stakeholder workshop to lock the design vision before any screen gets designed.”",
          },
          {
            heading: "Critique is what keeps teams in sync.",
            body: "Weekly critiques with design, product, and engineering kept everyone working from the same picture. Decisions were pressure-tested in the room instead of discovered late in handoff.",
            now: "“hold a standing weekly critique so cross-functional teams stay aligned, not just informed.”",
          },
          {
            heading: "Launch is the start of the feedback loop.",
            body: "Post-launch user feedback drove a second round of refinements across the main page, portfolio, and investment entry points, the kind of calibration only real usage can reveal.",
            now: "“treat launch as the beginning of learning, and plan a refinement round around real user behaviour.”",
          },
        ],
      },
      {
        kicker: "Outcome",
        heading: "Outcome",
        body: "Launched as part of the K PLUS app, Thailand's most-used banking app, serving millions of users daily. The investment feature is now an active part of the K PLUS experience, with users engaging across all six feature areas designed.",
      },
    ],
  },
  {
    slug: "bitkub-next",
    title: "Bitkub NEXT",
    category: "UX/UI Design",
    summary: "A self-custody crypto wallet that makes Web3 feel as safe as mobile banking.",
    client: "Bitkub",
    role: "Senior UX/UI Designer",
    year: "2025",
    tags: ["Crypto", "Web3", "Blockchain", "Fintech", "Mobile"],
    accent: "#0a5f55",
    accentText: "light",
    overview:
      "Bitkub NEXT (now known as KUB Wallet) is a digital wallet application designed for conducting transactions, storing digital assets, and serving as a gateway to various dApps. While the product has been shaped by multiple designers, my role focused on designing and delivering new features within the existing ecosystem. I was responsible for the UX and UI design of key features, including Thai Baht Programmable Payment, Manage Shortcuts, and Manage Token & NFT, ensuring consistency with the product’s design system and overall user experience.",
    sections: [
      {
        heading: "DISCOVER",
        body: `Researched 9 banking and wallet apps cross 4 key screens: Transfer, Review, Complete, and Transaction History.
​
Transfer Step Two input patterns emerged apps that transfer within the same platform (e.g. App Wallet, KBank, UOB) and apps that transfer to other banks, requiring recipient selection, account number, bank selection, and amount.
​
Review Step All apps consistently display: recipient info, account number, transfer channel, amount, and fee giving users a final chance to verify before confirming.
​
Complete Step Split into two groups minimal confirmation (status + amount) and detailed summary mirroring the review screen, including recipient, channel, amount, fee, and timestamp.
​
Transaction History Common pattern includes: sender/receiver info, date, amount, and receipt. Some apps offer an expandable view with full transaction details and slip download.`,
      },
      {
        heading: "DEFINE",
        body: "After consolidating and synthesizing insights, user flows were designed and iteratively refined through strategic evaluation to identify the optimal solution ensuring clarity, ease of use, and seamless integration with the existing application ecosystem.",
      },
      {
        heading: "DESIGN & DEVELOP",
        body: `Following competitive research, I created low/high-fidelity prototypes for user testing to uncover user needs and pain points. The testing phase was divided into two methods:
A/B Testing: Compared two design variations of the "THBK Pending Transfer" page to determine which performed better.
Usability Testing: Evaluated all core features of THBK, including Top-up, Pay, Transfer (via 2 channels), and History.`,
      },
      {
        heading: "Results",
        body: `The overall satisfaction score reached over 8.9/10 on the Opinion Scale, over 80% on the Success rate and the System Usability Scale (SUS) score achieved 83.4 (Excellent).
​
Based on these insights, I iterated on the designs by proposing 3 high-impact solutions with minimal development effort:
Separate "Transfer" from "THBK".
Display the recipient's name before confirming a transfer.
Streamline the transfer channel selection process.`,
      },
      {
        heading: "Deliver",
        body: "After completing the design and validating it through user testing to arrive at the optimal version, I prepared detailed workflows, components, design tokens, icons, and various UI states to ensure a smooth and effective handoff to the development team.",
      },  
    ],
    metrics: [
      { value: "83.4", label: "SUS score (Excellent)" },
      { value: "8.9/10", label: "Satisfaction score" },
    ],
    gallery: 4,
  },
  {
    slug: "finvest-redesign",
    title: "Finvest Redesign",
    category: "UX/UI Design",
    summary:
      "Redesigning a live investment app that brings global funds together, from research through a delivered design system.",
    client: "Finvest (company redesign, not carried into development)",
    role: "UX/UI Designer",
    year: "2023",
    tags: ["Fintech", "Investing", "Redesign", "Mobile", "Design System"],
    accent: "#1d3a8a",
    accentText: "light",
    platform: "Mobile (iOS)",
    tools: "Figma, Adobe Creative Suite",
    methods:
      "Desk Research, Qualitative Interviews, Competitive Analysis, Wireframing, Design System, Usability Testing",
    overview:
      "Finvest is an investment app that brings together funds from around the world, letting Thai investors buy local mutual funds and invest directly in foreign funds in one place. It is a live product, and I was brought in on a company project to redesign it. My role ran from research through visual design and a delivered design system. My goal was to take a dense, feature heavy product and make it easier to read, navigate, and act on.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "The problem",
        body: "Finvest is a live, dense, feature heavy investment app. I was brought in to redesign it so users could read, navigate, and act on it more easily.",
      },
      {
        heading: "Approach",
        body: "I started by listening: public feedback plus interviews with the operations team. I then ran a competitive analysis, built a UI style guide and design system, and redesigned the core screens.",
      },
      {
        heading: "Outcome",
        body: "I delivered the research, a design system, and redesigned Home, Fund Info, Portfolio, and Filters. The redesign was not carried into development, so there are no post launch metrics to report.",
      },
    ],
    gallery: 4,
    caseStudy: [
      {
        kicker: "Discovery",
        heading: "I listened before I redesigned",
        body: `I did not want to redesign on assumptions, so I started by listening. I compiled user comments from social media and app store reviews to map where the current app frustrated people. To go deeper, I interviewed the operations team who speak with customers directly every day, pairing their frontline view with the public feedback.

Three problems surfaced again and again.`,
        points: [
          {
            title: "Expiring ID cards blocked users",
            body: "A large share of customers got stuck when their ID card expired, with no clear path to resolve it.",
          },
          {
            title: "Transaction data felt incomplete",
            body: "Users could not always find a full, trustworthy record of their activity.",
          },
          {
            title: "People wanted to see performance visually",
            body: "Investors asked for graph based performance instead of numbers alone.",
          },
        ],
      },
      {
        kicker: "Research",
        heading: "Competitive analysis",
        body: "I opened the redesign proper with a competitive analysis, benchmarking how other investment apps structured fund information, portfolios, and performance. That let me build on proven patterns before diverging where Finvest needed something of its own.",
      },
      {
        kicker: "Foundation",
        heading: "Design system and style guide",
        body: "Before I touched high fidelity screens, I built a UI style guide covering typography, color, iconography, and components. This kept the redesign consistent and gave it room to scale as the product grew.",
      },
      {
        kicker: "The redesign",
        heading: "Reworking the core screens",
        body: "With the foundation in place, I reworked the core screens.",
        points: [
          {
            title: "Home",
            body: "I customized the components and colors and surfaced the most used features, so the important actions are visible the moment users open the app.",
          },
          {
            title: "Fund Info",
            body: "I grouped the data into clear sections so investors can read a fund's details without wading through a wall of numbers.",
          },
          {
            title: "Portfolio",
            body: "I reorganized the portfolio data to feel more modern and easier to parse at a glance.",
          },
          {
            title: "Filters",
            body: "I expanded filtering so users can narrow funds in more detail, changed the display to work from the side, and added imagery to make searching faster.",
          },
        ],
      },
      {
        kicker: "Outcome",
        heading: "Status",
        body: "The Finvest app is live on the App Store. This redesign was a company project, and I delivered the full package: the research, a UI style guide and design system, and redesigned Home, Fund Info, Portfolio, and Filters screens. The redesign was not carried forward into development, so there are no post launch metrics to report. What I can point to is the reasoning and the system I handed over, shown in full in the gallery.",
      },
    ],
  },
  {
    slug: "kublerx",
    title: "Kublerx",
    category: "UX/UI Design",
    summary:
      "A decentralized exchange (DEX) bringing DeFi to everyday crypto users on KUB Chain.",
    client: "Bitkub",
    role: "Senior UX/UI Designer",
    year: "2025",
    tags: ["DeFi", "Crypto", "DEX", "Design System"],
    accent: "#047857",
    accentText: "light",
    platform: "Desktop, Tablet, Mobile",
    tools: "Figma, Adobe Creative Suite, Prototypes",
    methods: "Competitive Analysis, Information Architecture, Design System, Usability Testing",
    externalUrl: "https://kublerx.com",
    externalLabel: "Visit kublerx.com ↗",
    overview: `Kublerx is a decentralized exchange (DEX) built on the KUB Chain — designed to be the central liquidity hub of the KUB ecosystem. The platform lets users swap crypto, provide liquidity to earn rewards, and access DeFi tools without leaving the KUB network.

Unlike traditional crypto exchanges where transactions are managed by a central party, Kublerx runs entirely on smart contracts — giving users full custody of their assets and direct access to on-chain liquidity.`,
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "The problem",
        body: "Bitkub users were familiar with buying and holding crypto on a centralized exchange, but had never used a DEX. Kublerx had to feel approachable to those transitioning from CEX while still serving experienced DeFi traders.",
      },
      {
        heading: "Approach",
        body: "Designed end-to-end — research, IA, interaction, visual system, and handoff — translating DeFi mechanics into intuitive flows across desktop, tablet, and mobile.",
      },
      {
        heading: "Outcome",
        body: "Launched as the central liquidity hub of the KUB ecosystem, live at kublerx.com with swap and liquidity features across all platforms.",
      },
    ],
    metrics: [
      { value: "DeFi", label: "Decentralized exchange (DEX)" },
      { value: "3", label: "Platforms — desktop, tablet, mobile" },
    ],
    gallery: 0,
    caseStudy: [
      {
        kicker: "Role",
        heading: "What I did",
        body: "Led the design from concept to delivery — user research, information architecture, interaction design, visual system, and developer handoff. I collaborated closely with product managers, blockchain engineers, and stakeholders to align DeFi mechanics with intuitive experiences across desktop, tablet, and mobile.",
      },
      {
        kicker: "The story",
        heading: "The problem",
        body: `Kublerx was built from the ground up to solve a specific gap: bringing DeFi to Thai crypto users who already live in the Bitkub ecosystem.

Many Bitkub users were familiar with buying and holding crypto through the centralized exchange, but had never used a DEX before. They wanted to access DeFi opportunities — liquidity pools, swaps, and on-chain trading — without leaving the network they already trusted.

The challenge wasn't just designing another DEX. It was designing a DEX that felt approachable to users transitioning from centralized exchanges, while still serving the depth that experienced DeFi traders expect.`,
      },
      {
        kicker: "Discovery",
        heading: "Discovery & research",
        body: "Three core insights shaped the design direction.",
        points: [
          {
            title: "DeFi terminology creates friction",
            body: "Concepts like liquidity pools, slippage, impermanent loss, and AMM are second nature to DeFi users but opaque to newcomers. The interface needed to explain without lecturing.",
          },
          {
            title: "Centralized-exchange users expect different patterns",
            body: "Bitkub users were used to instant order matching, hidden technical complexity, and a clear buy/sell mental model. DEX flows like approve-then-swap or connecting a wallet felt unfamiliar.",
          },
          {
            title: "Mobile-first behavior, desktop-first conventions",
            body: "Most DEX products are designed desktop-first for trader workflows. But the Bitkub user base is primarily mobile — so Kublerx had to invert the convention without losing power-user functionality.",
          },
        ],
      },
      {
        kicker: "Foundation",
        heading: "Design foundation",
        body: "The design system balanced two opposing needs: making DeFi feel approachable for first-time users, while preserving the data density and precision experienced traders expect.",
        points: [
          {
            title: "Typography",
            body: "Prioritizes legibility of numbers and ratios — critical for prices, slippage tolerances, and liquidity figures.",
          },
          {
            title: "Color palette",
            body: "Extends the KUB ecosystem's visual identity while introducing semantic colors for DeFi-specific states: gains, losses, pending transactions, and warning thresholds.",
          },
          {
            title: "Responsive system",
            body: "Designed mobile-first then scaled up, ensuring no functionality was sacrificed at smaller breakpoints.",
          },
        ],
        images: [
          { src: "/work/kublerx/foundation.jpg", caption: "Color palette & typography specimen", ratio: "aspect-[16/10]" },
        ],
        imageCols: 2,
      },
      {
        kicker: "Feature 01",
        heading: "Swap",
        oneLiner: "A streamlined token swap interface designed to lower the barrier for first-time DEX users.",
        points: [
          {
            title: "Hiding complexity, surfacing essentials",
            body: "Instead of exposing every DeFi parameter upfront (slippage, gas, route, minimum received), I designed layered disclosure — showing only the essential from / to / rate by default, with advanced settings tucked behind a clear secondary action.",
          },
          {
            title: "Real-time feedback at every step",
            body: "Price quotes, slippage warnings, and transaction states surface immediately rather than only at confirmation. Users always know what's happening before they commit.",
          },
          {
            title: "Trust through transparency",
            body: "Every step — wallet connection, token approval, transaction signing — is visualized with clear status indicators, so users moving from a centralized exchange understand what each on-chain step means.",
          },
        ],
        images: [
          { src: "/work/kublerx/swap-01.jpg", caption: "Swap interface — token selection, rate, and execution in one flow" },
          { src: "/work/kublerx/swap-02.jpg", caption: "Slippage settings — advanced parameters on demand" },
          { src: "/work/kublerx/swap-03.jpg", caption: "Transaction confirmation — every on-chain step visualized" },
        ],
      },
      {
        kicker: "Feature 02",
        heading: "Liquidity Pools",
        oneLiner: "A liquidity provision experience that makes passive yield accessible without requiring users to master the mechanics first.",
        points: [
          {
            title: "Pool discovery designed for clarity, not just data",
            body: "Each pool surfaces what matters most — APR, TVL, paired tokens, and risk indicators — without burying them under technical metrics. Users filter and sort by what they care about rather than navigating a flat list.",
          },
          {
            title: "Progressive disclosure for pool management",
            body: "Adding liquidity, claiming rewards, and removing liquidity each have their own focused flow. Users don't see options they don't need at the moment they're acting.",
          },
          {
            title: "Educational moments without disruption",
            body: "Concepts like impermanent loss are introduced inline at the point of decision — short, contextual explanations that empower users without forcing them through a tutorial.",
          },
        ],
        images: [
          { src: "/work/kublerx/pool-01.jpg", caption: "Pool discovery — sortable, filterable list with key metrics" },
          { src: "/work/kublerx/pool-02.jpg", caption: "Add liquidity — focused flow for a selected pool" },
          { src: "/work/kublerx/pool-03.jpg", caption: "Position management — claim rewards & remove liquidity" },
        ],
      },
      {
        kicker: "Craft",
        heading: "Responsive across platforms",
        body: "Designed mobile-first, then scaled up — keeping full functionality at every breakpoint for both newcomers and power users.",
        images: [
          { src: "/work/kublerx/responsive-desktop.jpg", caption: "Desktop — full trading interface with extended data", ratio: "aspect-[16/10]" },
          { src: "/work/kublerx/responsive-tablet.jpg", caption: "Tablet — adapted layout, all functionality intact", ratio: "aspect-[3/4]" },
          { src: "/work/kublerx/responsive-mobile.jpg", caption: "Mobile — patterns optimized for one-handed use" },
        ],
      },
      {
        kicker: "Process",
        heading: "Collaboration",
        body: `I led collaboration across the project lifecycle — running stakeholder alignment workshops at kickoff to define product vision, partnering with blockchain engineers to understand on-chain constraints, and conducting weekly design critiques with the broader Bitkub design team to keep the design system consistent across the ecosystem.

Working closely with product managers and developers throughout, I translated technical blockchain requirements into design decisions that protected the user experience without compromising the underlying protocol.`,
      },
      {
        kicker: "Outcome",
        heading: "Outcome",
        body: `Kublerx successfully launched as the central liquidity hub for the KUB ecosystem — making DeFi accessible to Thai crypto users transitioning from centralized exchanges. The platform is now live at kublerx.com, supporting swap and liquidity features across desktop, tablet, and mobile.

The design bridged two audiences: bringing newcomers into DeFi through approachable patterns, while still serving experienced traders with the depth and precision they expect.`,
      },
    ],
  },
  {
    slug: "staygold",
    title: "StayGold",
    category: "UX/UI Design",
    summary: "A health and lifestyle app helping users live longer, healthier lives.",
    client: "StayGold",
    role: "UX/UI Designer",
    year: "2025",
    tags: ["Health", "Lifestyle", "Mobile", "Design System"],
    accent: "#b45309",
    accentText: "light",
    overview:
      "StayGold is a health and lifestyle app aimed at helping users live longer, healthier lives. I joined at the early concept stage — my role was to translate stakeholder vision and user research into a complete product experience, from information architecture to a delivered design system ready for handoff. The challenge: designing for a wellness audience who were skeptical of health apps that felt isolating, judgmental, or overwhelming.",
    sections: [
      {
        heading: "Discover",
        body: `I began by collaborating with stakeholders and gathering requirements to ground the work in both user needs and business objectives. I then established the information architecture to support smooth, intuitive navigation, and ran desk research, competitor benchmarking, and small-scale user interviews to uncover behaviours, needs, and pain points.

A few key insights shaped the product:
"I won't go if I have to exercise alone." → social features to invite friends and join community challenges.
"I want to track and review my health history." → a personalized health dashboard showing trends over time, not just a daily overview.
"Seeing others run long distances makes me feel discouraged." → daily challenges and rewards for achievements, instead of intimidating comparisons.
"It would be great to have health-related knowledge." → an integrated content feed with curated articles from health experts.`,
      },
      {
        heading: "Design",
        body: `With this groundwork in place, I built a design system and moved on to high-fidelity interfaces that reflected the brand's visual identity while keeping usability and accessibility at the core. Due to time constraints, I ran quick internal testing sessions and iterated on feedback to validate the key decisions.

The design system rested on three principles:
Premium warmth — positioning wellness as something to elevate, not just monitor; a sophisticated yet warm palette and type that stay approachable.
Accessible by default — components meet WCAG AA contrast, with type scales tested across age groups.
Component-first architecture — tokens and components structured so developers can implement and extend without a designer for every variant.

Stakeholder feedback led to three refinements: the Health screen was restructured to surface personal data at a glance; the Challenge screen was reordered to put today's active challenges above historical ones; and the Leaderboard was redesigned to give points, ranking, and streak count a stronger visual hierarchy.`,
      },
      {
        heading: "Deliver",
        body: "Prepared screens, user flows, design tokens, component states, and detailed specifications for handoff to the development team for implementation.",
      },
    ],
    caseStudy: [
      {
        kicker: "Discover",
        heading: "From insights to decisions",
        body: "I began by collaborating with stakeholders and gathering requirements to ground the work in both user needs and business objectives. I then established the information architecture for smooth, intuitive navigation, and ran desk research, competitor benchmarking, and small-scale user interviews. A few recurring quotes shaped the product — each pointing to a specific design decision.",
        table: [
          {
            left: "“I won't go if I have to exercise alone.”",
            right: "Designed **social features** that let users **invite friends to exercise sessions** and **join community challenges**.",
          },
          {
            left: "“I want to track and review my health history.”",
            right: "A personalized **health dashboard** displaying **trends over time** instead of just a daily overview, and showing users' **average BMI** visually.",
          },
          {
            left: "“Seeing others run long distances makes me feel discouraged.”",
            right: "Added **daily challenges** and **rewards for major achievements** or campaign activities, instead of intimidating comparisons.",
          },
          {
            left: "“It would be great to have health-related knowledge.”",
            right: "An integrated content feed with **curated articles from health experts**, aligning with users' tracking behaviours.",
          },
        ],
      },
      {
        kicker: "Design",
        heading: "Design system & UI",
        body: "With this groundwork in place, I built a design system and moved on to high-fidelity interfaces that reflected the brand's visual identity while keeping usability and accessibility at the core. Due to time constraints, I ran quick internal testing sessions and iterated on feedback to validate the key decisions.",
        points: [
          {
            title: "Premium warmth",
            body: "Positioning wellness as something to elevate, not just monitor — a sophisticated yet warm palette and type that stay approachable.",
          },
          {
            title: "Accessible by default",
            body: "Components meet WCAG AA contrast, with type scales tested across age groups.",
          },
          {
            title: "Component-first architecture",
            body: "Tokens and components structured so developers can implement and extend without a designer for every variant.",
          },
        ],
        callout:
          "Stakeholder feedback led to three refinements: the Health screen surfaces personal data at a glance, the Challenge screen puts today's active challenges above historical ones, and the Leaderboard gives points, ranking, and streak count a stronger visual hierarchy.",
      },
      {
        kicker: "Deliver",
        heading: "Handoff",
        body: "Prepared screens, user flows, design tokens, component states, and detailed specifications for handoff to the development team for implementation.",
      },
    ],
    gallery: 0,
  },
  {
    slug: "de-fence",
    title: "DE-fence",
    category: "UX/UI Design",
    summary: "A security platform that screens scam calls and SMS, and verifies trusted numbers.",
    client: "Concept project",
    role: "UX/UI Designer",
    year: "2024",
    tags: ["Security", "Anti-scam", "Mobile", "Design System"],
    accent: "#1f2937",
    accentText: "light",
    overview:
      "DE-fence Platform is a security-focused platform designed to protect the public by screening incoming calls and SMS messages from potential scammers, while also verifying phone numbers from trusted institutions such as the police or financial organizations. It plays a crucial role in preventing cybercrime by providing users with a reliable and effective layer of protection.",
    sections: [
      {
        heading: "Start",
        body: "Begin by analyzing the TOR document to clearly define the problem, scope, and project requirements. Conduct competitor analysis and research relevant use cases to identify best practices and opportunities for improvement. Based on these insights, define the information architecture by outlining key screens and core features, then design the user flow to ensure a clear, intuitive, and goal-oriented user experience.",
      },
      {
        heading: "Design",
        body: "After establishing the information architecture and user journey, the next step was to develop the design system, followed by designing the user interface to ensure visual consistency, usability, and scalability across the product.",
      },
      {
        heading: "Deliver",
        body: "Once the design was finalized, it was handed off to the development team with detailed explanations of the design decisions and the design-system specifications.",
      },
    ],
    metrics: [
      { value: "3 wks", label: "Project duration" },
      { value: "3", label: "Team size" },
    ],
    gallery: 4,
  },
  {
    slug: "tossakan",
    title: "Tossakan",
    category: "UX/UI Design",
    summary:
      "Designing the Incident Case and Data Collection features for a security incident reporting app.",
    client: "Tossakan",
    role: "UX/UI Designer",
    year: "2022",
    tags: ["Incident Management", "Data Collection", "Security", "Mobile"],
    accent: "#7f1d1d",
    accentText: "light",
    methods: "Visual Design, Wireframe, User Flow",
    overview:
      "Tossakan is an application used by security guards, building and estate management teams, and security teams to report and manage incident cases in the field. In a focused three week engagement, I designed two features: Incident Case, where a reported case is logged and managed, and Collect Data, where the information tied to that case is captured in a structured way. I owned the visual design, wireframes, and user flow for both.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "Scope",
        body: "A three week engagement to design two features for a field incident reporting app: Incident Case and Collect Data.",
      },
      {
        heading: "Status",
        body: "Tossakan was built and shipped to the App Store. I was not looped into post launch feedback, so I do not have usage data to report.",
      },
    ],
    gallery: 4,
    caseStudy: [
      {
        kicker: "Feature 01",
        heading: "Incident Case",
        body: "I designed the flow for creating and managing an incident case, structuring it so a user can log a case and move it forward step by step without confusion.",
      },
      {
        kicker: "Feature 02",
        heading: "Collect Data",
        body: "I designed the data collection feature so the information attached to each case is captured in a clear, structured order, rather than through one long undifferentiated form.",
      },
      {
        kicker: "Outcome",
        heading: "Status",
        body: "Tossakan was built and shipped to the App Store. I was not looped into post launch feedback, so I do not have usage data to report, but the app went live with the features I designed.",
      },
    ],
  },
  {
    slug: "samui-plus",
    title: "Samui Plus",
    category: "UX/UI Design",
    summary:
      "My part of a team pitch for a Koh Samui travel app: the Explore and Me features.",
    client: "Samui Plus (team pitch for a government agency)",
    role: "UX/UI Designer",
    year: "2022",
    tags: ["Travel", "Mobile", "Pitch"],
    accent: "#0e7490",
    accentText: "light",
    methods: "Visual Design, Wireframe, User Flow",
    overview:
      "Samui Plus is a travel app for Koh Samui, produced as a team pitch to a government agency. The work was divided across the team, and my part was two features across a two week sprint: Explore, which helps visitors discover what the island offers, and Me, the personal space where a traveler manages their own information. I handled visual design, wireframes, and user flow for those two features.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "Scope",
        body: "A two week sprint within a team pitch to a government agency. My part was the Explore and Me features.",
      },
      {
        heading: "Status",
        body: "This was a team pitch, not a shipped product, so there is no live release or metrics. It is included to show the Explore and Me features I designed.",
      },
    ],
    gallery: 4,
    caseStudy: [
      {
        kicker: "Feature 01",
        heading: "Explore",
        body: "I designed the Explore feature to help visitors browse island activities and services in a way that feels inviting rather than overwhelming.",
      },
      {
        kicker: "Feature 02",
        heading: "Me",
        body: "I designed the Me feature as a clear personal hub where a traveler can find their own details and status at a glance.",
      },
      {
        kicker: "Outcome",
        heading: "Status",
        body: "This was a team pitch to a government agency, not a shipped product, so there is no live release or metrics. It is included to show the Explore and Me features I designed within the pitch.",
      },
    ],
  },
  {
    slug: "cargo-work",
    title: "Cargo Work",
    category: "Web Design",
    summary:
      "Designing the login and E-Weight Slip flow for a logistics operations platform.",
    client: "Cargo Work",
    role: "UX/UI Designer",
    year: "2022",
    tags: ["Logistics", "Web App", "Design System", "User Flow"],
    accent: "#15803d",
    accentText: "light",
    methods: "Visual Design, Wireframe, User Flow, Design System",
    overview:
      "Cargo Work is a logistics platform for shipping and freight operations. My focus was scoped to two critical pieces: the login flow and the E-Weight Slip feature, where operators record and confirm cargo weight. Across two months I handled the visual design, user flow, and a design system to keep the work consistent.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "Scope",
        body: "Two months on two critical pieces of a logistics platform: the login flow and the E-Weight Slip feature.",
      },
      {
        heading: "Status",
        body: "The login and E-Weight Slip shipped and are in real use. I designed to a defined set of requirements and was not looped into post launch feedback.",
      },
    ],
    gallery: 4,
    caseStudy: [
      {
        kicker: "Foundation",
        heading: "Design system",
        body: "I built a design system so the platform's screens shared one visual language. That made the login and E-Weight Slip work faster to design and easier to extend later.",
      },
      {
        kicker: "Process",
        heading: "User flow",
        body: "I mapped the E-Weight Slip flow end to end, from login through to a completed weight slip, so the steps matched how operators actually work rather than how the database is structured.",
      },
      {
        kicker: "Design",
        heading: "User interface",
        body: "I designed the login and E-Weight Slip screens against that system, keeping dense operational data calm and scannable so operators can move quickly without second guessing.",
      },
      {
        kicker: "Outcome",
        heading: "Status",
        body: "The login and E-Weight Slip shipped and are in real use. I designed to a defined set of requirements and was not looped into post launch feedback, so I do not have usage metrics to report, but the work is live and in operators' hands.",
      },
    ],
  },
  {
    slug: "astro-solutions",
    title: "Astro Solutions",
    category: "Web Design",
    summary: "A corporate site that makes a technical service feel clear and credible.",
    client: "Astro Solutions",
    role: "Web Designer",
    year: "2021",
    tags: ["Corporate", "Website", "Web"],
    accent: "#312e81",
    accentText: "light",
    methods: "Web Design, Visual Design",
    overview:
      "Astro Solutions is a technology services company that needed a corporate website to present itself with clarity and credibility. I designed the marketing site across its core pages, Home, About Us, Portfolio, and News, shaping how the company introduces its work and earns trust from the first scroll.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "Scope",
        body: "A multi page corporate site across Home, About Us, Portfolio, and News.",
      },
      {
        heading: "Approach",
        body: "I structured the site so a visitor moves naturally from what the company does, to who they are, to proof of work, to what is current.",
      },
    ],
    gallery: 3,
    caseStudy: [
      {
        kicker: "Approach",
        heading: "Approach",
        body: "I structured the site so a visitor moves naturally from what the company does on Home, to who they are on About Us, to proof of work in the Portfolio, to what is current in News. I worked from the company's CI palette and extended it with supporting colors so the design had enough range to work with. I shaped the content in coordination with the marketing and business teams and other stakeholders, then designed around it.",
      },
    ],
  },
  {
    slug: "airport-thailand",
    title: "Airport Thailand",
    category: "Web Design",
    summary:
      "A marketing landing page for an Airports of Thailand site, plus client side design direction.",
    client: "Airports of Thailand (vendor built the main site)",
    role: "Web Designer, client side direction",
    year: "2021",
    tags: ["Public Sector", "Web", "Landing Page"],
    accent: "#155e75",
    accentText: "light",
    overview:
      "Airports of Thailand ran a web project where a vendor built and designed the main site. My role sat on the client side. I designed a marketing landing page that lives within the site and fell outside the vendor's scope, and I prepared the site map, content, and color themes, then reviewed the vendor's work and gave design direction across the whole site.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "Scope",
        body: "A vendor built the main site. I designed one marketing landing page within it and gave client side design direction across the whole site.",
      },
      {
        heading: "Status",
        body: "The site is live. The main site design was the vendor's work. My own contribution is the marketing landing page, alongside the client side direction and review.",
      },
    ],
    gallery: 3,
    caseStudy: [
      {
        kicker: "Approach",
        heading: "Approach",
        body: "On the part I designed myself, the marketing landing page, I focused on making a public sector service feel clear and easy to enter, with a straightforward path to the action a traveler came to take. Across the rest of the site, my job was to keep the vendor's work aligned to the site map, content, and visual direction we had set.",
      },
      {
        kicker: "Outcome",
        heading: "Status",
        body: "The site is live. The main site design was the vendor's work. My own design contribution is the marketing landing page, alongside the client side direction and review.",
      },
    ],
  },
  {
    slug: "unicorn-house",
    title: "Unicorn House",
    category: "Web Design",
    summary: "A bold brand site with playful motion and strong typography.",
    client: "Unicorn House",
    role: "Web Designer",
    year: "2020",
    tags: ["Brand", "Web", "Motion"],
    accent: "#9d174d",
    accentText: "light",
    methods: "Web Design, Visual Design, Motion",
    overview:
      "Unicorn House needed a website as distinctive as its brand. I designed the entire site myself, and it went live. I owned the full design, from layout to visual style, leaning into strong typography, color, and motion while keeping the content easy to navigate.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "The work",
        body: "I designed the entire site myself, owning the full design from layout to visual style, leaning into strong typography, color, and motion.",
      },
      {
        heading: "Note on the live version",
        body: "The brand has since changed its CI, and the current live site uses a different design. The work shown here is my original design, which I have archived.",
      },
    ],
    gallery: 3,
    caseStudy: [
      {
        kicker: "The work",
        heading: "A site as distinctive as the brand",
        body: "I designed the entire site myself, and it went live. I owned the full design, from layout to visual style, leaning into strong typography, color, and motion while keeping the content easy to navigate.",
      },
      {
        kicker: "Note",
        heading: "Note on the live version",
        body: "The brand has since changed its CI, and the current live site uses a different design. The work shown here is my original design, which I have archived, so what you see stays true to what I built rather than the newer site. For that reason there is no live link out.",
      },
    ],
  },
  {
    slug: "sha-plus",
    title: "SHA+",
    category: "Web Design",
    summary: "A hotel booking marketplace landing page for SHA+ certified hotels.",
    client: "SHA+",
    role: "Web Designer",
    year: "2022",
    tags: ["Hotel Booking", "Marketplace", "Web"],
    accent: "#0f766e",
    accentText: "light",
    methods: "Web Design, Visual Design",
    overview:
      "SHA+ is Thailand's tourism safety and hygiene standard. I designed a hotel booking marketplace landing page for hotels certified under that standard, so travelers could find and book stays they could trust. I designed the page end to end myself.",
    // Simple fallback (unused while `caseStudy` is present)
    sections: [
      {
        heading: "Approach",
        body: "I led with the trust the SHA+ certification represents, then made finding and booking a certified hotel simple and quick.",
      },
      {
        heading: "Status",
        body: "The page went live. It has most likely since been taken down, and I do not have usage data to report.",
      },
    ],
    gallery: 3,
    caseStudy: [
      {
        kicker: "Approach",
        heading: "Approach",
        body: "I led with the trust the SHA+ certification represents, then made finding and booking a certified hotel simple and quick, keeping the path from landing to booking short and the next step always obvious.",
      },
      {
        kicker: "Outcome",
        heading: "Status",
        body: "The page went live. It has most likely since been taken down, and I do not have usage data to report. It is included to show the marketplace landing page I designed end to end. For that reason there is no live link out.",
      },
    ],
  },
];

// ── Display order ──────────────────────────────────────────────────────────
// Reorder projects across the whole site (home featured + /work) by editing
// this list of slugs. The home page shows the first 8.
const order = [
  "k-plus-investment",
  "staygold",
  "bitkub-next",
  "de-fence",
  "kublerx",
  "finvest-redesign",
  "cargo-work",
  "tossakan",
  "samui-plus",
  "sha-plus",
  "astro-solutions",
  "airport-thailand",
  "unicorn-house",
];

export const projects: Project[] = order
  .map((slug) => projectList.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsByCategory = (category: Category) =>
  projects.filter((p) => p.category === category);

export const categories: Category[] = ["UX/UI Design", "Web Design"];
