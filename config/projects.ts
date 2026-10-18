import type { Project } from "@/config/types";

export const projectsSectionConfig = {
  title: "Work",
  liveButtonLabel: "View Product",
  liveTooltip: "Open project",
};

export const projectsConfig: Project[] = [
  {
    id: "ummahsignal",
    title: "UmmahSignal — Social listening for brands",
    description:
      "Know what the internet says about your brand, app, or organisation. Find the conversations that matter, understand recurring feedback, and make sure someone handles it.",
    content:
      "## Problem\nPublic questions, bug reports, and praise scatter across X, YouTube, and other platforms. Teams miss replies, lose context, and burn out trying to stay online.\n\n## Solution\nUmmahSignal brings supported public conversations into one review workflow. Configure keywords, collect mentions from live sources, triage what needs action, and keep ownership clear without autonomous replies.\n\n## Outcome\nAn invite-only beta for founders, brands, creators, and community teams who need signal over noise, with human review at every step.",
    image: "/ummahsignal.png",
    imageAlt: "UmmahSignal social listening product",
    liveUrl: "https://ummahsignal.com",
    tags: ["SaaS", "Social listening", "AI", "Next.js"],
    metrics: [
      { icon: "chart", label: "X + YouTube live" },
      { icon: "users", label: "Invite-only beta" },
    ],
    year: 2026,
    status: "new",
    category: "SaaS",
    order: 1,
    enabled: true,
  },
  {
    id: "dhikrbuddy",
    title: "DhikrBuddy — Notch companion for Mac",
    description:
      "A tiny Mac notch companion for dhikr and the small tools you keep alt-tabbing for. Lifetime updates, calm and local-first.",
    content:
      "## Problem\nYour Mac sits open all day, and it is still easy to forget the one habit that actually matters.\n\n## Solution\nDhikrBuddy lives in the notch with dhikr reminders and the small utilities you reach for constantly, without another crowded menu bar app.\n\n## Outcome\nA focused $5 lifetime Mac companion at dhikrbuddy.com.",
    image: "/dhikrbuddy.png",
    imageAlt: "DhikrBuddy Mac notch companion",
    liveUrl: "https://dhikrbuddy.com",
    tags: ["macOS", "Dhikr", "Productivity"],
    metrics: [
      { icon: "chart", label: "Lifetime updates" },
      { icon: "users", label: "Mac notch" },
    ],
    year: 2026,
    status: "shipped",
    category: "Desktop",
    order: 2,
    enabled: true,
  },
  {
    id: "sorca",
    title: "Sorca — AI thinking partner for UK therapists",
    description:
      "Modality-aware AI clinical scribe and thinking partner for UK psychotherapists. Notes only when you save. UK GDPR and EU data residency.",
    content:
      "## Problem\nUK therapists lose hours every week to notes, letters, and admin that still has to meet clinical and GDPR standards.\n\n## Solution\nSorca generates modality-aware clinical notes (CBT, IFS, EMDR, and more), supports NHS Talking Therapies workflows, PHQ-9 and GAD-7 outcomes, and keeps audio out of storage. Notes persist only when the clinician explicitly saves.\n\n## Outcome\nBuilt UK-first for solo and private-practice therapists: Firestore EU residency, ICO registered, and designed to cut roughly six hours of admin a week.",
    image: "/sorca.png",
    imageAlt: "Sorca AI clinical scribe",
    liveUrl: "https://sorca.life",
    tags: ["AI", "Healthcare", "UK GDPR", "SaaS"],
    metrics: [
      { icon: "chart", label: "~6 hrs admin saved / week" },
      { icon: "users", label: "UK therapists" },
    ],
    year: 2026,
    status: "shipped",
    category: "Healthcare AI",
    order: 3,
    enabled: true,
  },
  {
    id: "sourced",
    title: "Sourced — Generative engine optimisation",
    description:
      "Content and weekly citation reports so ChatGPT, Claude, and Gemini actually name your business.",
    content:
      "## Problem\nBrands invest in SEO, but generative engines still omit them from answers that drive discovery and trust.\n\n## Solution\nSourced (polhia.com) helps marketers earn citations in AI answers with content guidance and weekly citation reports across major models.\n\n## Outcome\nA practical GEO workflow for teams who want to show up when people ask AI for recommendations.",
    image: "/sourced.png",
    imageAlt: "Sourced generative engine optimisation",
    liveUrl: "https://polhia.com",
    tags: ["GEO", "Marketing", "AI", "SaaS"],
    metrics: [
      { icon: "chart", label: "Weekly citation reports" },
      { icon: "users", label: "Marketers" },
    ],
    year: 2026,
    status: "shipped",
    category: "Marketing AI",
    order: 4,
    enabled: true,
  },
  {
    id: "zijra",
    title: "Zijra — Coming soon",
    description:
      "A new product under zijra.com. Details soon.",
    content:
      "## Status\nZijra is in early exploration. The domain is reserved and the product direction is taking shape.\n\n## Next\nPublic details will land here when the first build is ready to share.",
    image: "/zijra.png",
    imageAlt: "Zijra coming soon",
    liveUrl: "https://zijra.com",
    tags: ["Coming soon"],
    metrics: [
      { icon: "chart", label: "Coming soon" },
    ],
    year: 2026,
    status: "building",
    category: "Product",
    order: 5,
    enabled: true,
  },
  {
    id: "clypt",
    title: "Clypt — Local clipboard history for Mac",
    description:
      "Your Mac clipboard only holds one thing. Clypt keeps everything local and encrypted. Press ⌘⇧V and it is back.",
    content:
      "## Problem\nmacOS clipboard history disappears the moment you copy something new.\n\n## Solution\nClypt stores clipboard history on device, encrypted, with a quick shortcut to bring anything back.\n\n## Outcome\nLifetime updates from getclypt.store for people who live in copy-paste workflows.",
    image: "/clypt.png",
    imageAlt: "Clypt clipboard history for Mac",
    liveUrl: "https://getclypt.store",
    tags: ["macOS", "Clipboard", "Privacy"],
    metrics: [
      { icon: "chart", label: "Encrypted locally" },
      { icon: "users", label: "Lifetime updates" },
    ],
    year: 2025,
    status: "shipped",
    category: "Desktop",
    order: 6,
    enabled: true,
  },
  {
    id: "synthia",
    title: "Synthia — App idea validation in 90 seconds",
    description:
      "AI-powered app idea validation and market research across 30+ cultural markets. Built to replace expensive research agencies with fast cultural intelligence.",
    content:
      "## Problem\nIndie developers and founders burn weeks and budgets validating ideas with slow research agencies.\n\n## Solution\nSynthia scans App Store gaps and cultural markets so you can validate an idea in about 90 seconds.\n\n## Outcome\nAffordable cultural intelligence at trysynthia.com for builders who need signal before they write code.",
    image: "/synthia.png",
    imageAlt: "Synthia idea validation",
    liveUrl: "https://trysynthia.com",
    tags: ["AI", "Research", "App Store", "SaaS"],
    metrics: [
      { icon: "chart", label: "30+ markets" },
      { icon: "users", label: "~90 second scans" },
    ],
    year: 2025,
    status: "shipped",
    category: "Research AI",
    order: 7,
    enabled: true,
  },
  {
    id: "noor-immigration",
    title: "Noor — AI Practice OS for UK immigration firms",
    description:
      "Multilingual inbox, document OCR, and tribunal-ready evidence bundles for UK immigration solicitors whose clients do not speak English.",
    content:
      "## Problem\nImmigration caseworkers receive WhatsApp messages, voice notes, and documents in many languages that never flow cleanly into a case management system.\n\n## Solution\nNoor unifies a multilingual inbox with auto-translate and transcription, SHA-256 hashing on receipt, document OCR, and one-click tribunal-ready evidence bundles. Morning digests surface urgency by tribunal deadlines.\n\n## Outcome\nCompliance-minded architecture on AWS eu-west-2 with zero-retention AI agreements, aligned to SRA and IAA expectations.",
    image: "/noor-immigration.png",
    imageAlt: "Noor AI practice OS for immigration firms",
    liveUrl: "https://trynoor.legal",
    tags: ["AI", "LegalTech", "WhatsApp", "OCR"],
    metrics: [
      { icon: "chart", label: "EU data residency" },
      { icon: "users", label: "UK immigration firms" },
    ],
    year: 2026,
    status: "shipped",
    category: "LegalTech",
    order: 8,
    enabled: true,
  },
  {
    id: "ustaad",
    title: "Ustaad — Screen-aware voice AI for Mac",
    description:
      "Hold a shortcut, show your screen, and ask by voice. Ustaad guides any software step by step and doubles as an exam tutor.",
    content:
      "## Problem\nPeople get stuck in complex software and exam prep tools without a hands-free guide that can see what they see.\n\n## Solution\nUstaad is a screen-aware voice assistant for macOS with General Mode for any workflow and Tutor Mode for board-aware exam coaching across major curricula.\n\n## Outcome\nPrivacy-first design that excludes password managers and System Settings, never stores screenshots, and responds in under two seconds.",
    image: "/ustaad.png",
    imageAlt: "Ustaad screen-aware voice AI for macOS",
    liveUrl: "https://tryustaad.com",
    tags: ["macOS", "Voice AI", "Education", "Privacy"],
    metrics: [
      { icon: "chart", label: "Sub-2s responses" },
      { icon: "users", label: "Students and professionals" },
    ],
    year: 2024,
    status: "shipped",
    category: "Desktop AI",
    order: 9,
    enabled: true,
  },
  {
    id: "app-store",
    title: "App Store — Privacy-first iOS apps",
    description:
      "Consumer apps on the App Store: Wird, Noor Daily, Our Family Habits, Halia, HUSH, Luteal, and more. Offline-first where it matters, zero analytics by principle.",
    content:
      "## Problem\nPeople need calm, useful tools for worship, family habits, and health without dark patterns or surveillance.\n\n## Solution\nA suite of privacy-first iOS apps covering prayer and Qur'an tracking, daily Islamic guidance, family habits, skin analysis, and cycle tracking.\n\n## Outcome\nShipped under the Rehan Aslam developer account with a focus on offline-first design and intentional product decisions over vanity metrics.",
    image: "/app-store-apps.png",
    imageAlt: "Rehan Aslam App Store apps",
    liveUrl: "https://apps.apple.com/ng/developer/rehan-aslam/id1880228970",
    tags: ["iOS", "SwiftUI", "Privacy", "Consumer"],
    metrics: [
      { icon: "users", label: "App Store" },
      { icon: "chart", label: "Privacy-first" },
    ],
    year: 2026,
    status: "shipped",
    category: "Mobile",
    order: 10,
    enabled: true,
  },
];
