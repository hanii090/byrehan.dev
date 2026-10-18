import { socialsConfig } from "@/config/socials";
import type { AboutGreetings, AboutItem, FooterConfig, PortfolioConfig } from "@/config/types";
import SoloLearnIcon from "@/public/sololearn-icon";
import BrandNextjs from "@/public/stacks/nextjs";
import X from "@/public/x-icon";
import { BookmarkCheckIcon } from "@/components/shared/site-icons";
import { FaYoutube } from "react-icons/fa";

export const aboutGreetings: AboutGreetings = {
  morning: "Good morning !",
  afternoon: "Good afternoon !",
  evening: "Good evening !",
};

export const aboutItems: AboutItem[] = [
  {
    id: "build",
    lead: "I'm Rehan. I build AI products",
    illustration: "browser",
    body: "for clinicians, marketers, and everyday people, from first idea to the moment they ship on the web or the App Store.",
  },
  {
    id: "share",
    lead: "I share the decisions, mistakes, and lessons",
    illustration: "notebook",
    body: "along the way, because privacy-first product craft is often more useful than a polished launch announcement.",
  },
  {
    id: "learn",
    lead: "Right now, I'm shipping useful software",
    illustration: "plane",
    body: "from Canterbury, UK, across SaaS, iOS, and AI tools that respect the people who use them.",
  },
];

export const footerConfig: FooterConfig = {
  quote: "The soul becomes dyed with the color of its thoughts.",
  attribution: "Marcus Aurelius",
  credit: "Made with <3 and lots of coffee.",
  artwork: {
    src: "/images/footer-garden-strip.webp",
    width: 1264,
    height: 600,
  },
};

export const siteConfig: PortfolioConfig = {
  meta: {
    url: "https://byrehan.dev",
    title: "Rehan Aslam — Building AI products that ship",
    titleTemplate: "%s | Rehan Aslam",
    shortTitle: "Rehan Aslam",
    description:
      "Rehan builds AI products and privacy-first apps for clinicians, marketers, and everyday people. Founder of UmmahSignal and Sorca. Based in Canterbury, UK.",
    keywords: [
      "Rehan Aslam",
      "AI products",
      "iOS developer",
      "Next.js",
      "React",
      "TypeScript",
      "SwiftUI",
      "UmmahSignal",
      "Sorca",
      "Canterbury",
      "UK GDPR",
      "Indie hacker",
    ],
    authors: [{ name: "Rehan Aslam", url: "https://byrehan.dev" }],
    creator: "Rehan Aslam",
    publisher: "Rehan Aslam",
    classification: "Portfolio",
    category: "technology",
    locale: "en_GB",
    ogImage: {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Rehan Aslam — building AI products that ship",
    },
    twitterCreator: "@haani0090",
    icon: "/favicon.svg",
    appleIcon: "/apple-touch-icon.png",
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    manifest: {
      name: "Rehan Aslam — Building AI products that ship",
      short_name: "Rehan",
      description:
        "Rehan builds AI products and privacy-first apps from Canterbury, UK.",
      start_url: "/",
      display: "standalone",
      background_color: "#fafafa",
      theme_color: "#18181b",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "any",
          type: "image/x-icon",
        },
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    robots: {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      sitemap: "https://byrehan.dev/sitemap.xml",
    },
    sitemap: [
      { url: "https://byrehan.dev", changeFrequency: "monthly", priority: 1 },
    ],
  },
  personal: {
    fullName: "Rehan Aslam",
    firstName: "Rehan",
    avatar: {
      src: "/images/profile-cutout.webp",
      alt: "Illustrated portrait of Rehan waving with a laptop",
      fallback: "RA",
    },
    location: {
      label: "Canterbury, UK",
      timeZone: "Europe/London",
    },
    githubUsername: "hanii090",
  },
  sectionOrder: [
    "socials",
    "projects",
    "skills",
    "about",
    "experience",
    "github",
  ],
  sectionFlags: {
    socials: true,
    skills: true,
    components: false,
    about: true,
    testimonials: false,
    projects: true,
    bookmarks: false,
    certifications: false,
    sponsors: false,
    experience: true,
    services: false,
    workflow: false,
    github: true,
    contact: false,
  },
  banner: {
    imageSrc: "/images/profile-banner-cutout.webp",
    imageAlt: "Paper cutouts of a keyboard, notebook, paper plane, and coffee cup",
    openSourceUrl: "https://github.com/hanii090/byrehan.dev",
    openSourceTooltip: "View on GitHub",
    themeToggleLabel: "Toggle theme",
    themeShortcut: "D",
    themeTooltip: "Toggle theme",
    switchAudioSrc: "/switch.mp3",
  },
  about: {
    title: "Hello there !",
    body: aboutItems.map(({ lead, body }) => `${lead} ${body}`).join(" "),
  },
  services: {
    title: "What I build best",
    items: [
      "AI SaaS products with clear workflows, privacy constraints, and production deployments.",
      "Privacy-first iOS apps that stay useful offline and avoid dark patterns.",
      "Full-stack Next.js products that need one strong feature shipped without overengineering.",
    ],
  },
  workflow: {
    title: "How I run a project",
    items: [
      {
        label: "Scope",
        description:
          "We agree on one core workflow, fixed deliverables, and what is explicitly out of scope.",
      },
      {
        label: "Communication",
        description:
          "You get short async updates, working demos, and clear blockers instead of vague progress.",
      },
      {
        label: "Handoff",
        description:
          "I ship clean code, deployment support, and next-step recommendations after the first release.",
      },
    ],
  },
  contact: {
    title: "Say hello",
    description:
      "On X and LinkedIn I share what I'm shipping. For product questions, email works best.",
    pricing: [
      {
        label: "Minimum engagement",
        value: "Scoped quote",
        note: "A good fit for smaller builds, feature sprints, or setup work.",
      },
      {
        label: "Typical product range",
        value: "Depends on scope",
        note: "Most builds land once scope, integrations, and handoff are clear.",
      },
      {
        label: "How pricing works",
        value: "Final quote depends on scope",
        note: "Complex workflows, compliance, and admin tooling push projects higher.",
      },
    ],
    channels: socialsConfig.filter((item) =>
      ["email", "x", "linkedin"].includes(item.id),
    ),
  },
  bookmarks: {
    title: "Bookmarks",
    items: [
      {
        id: "1",
        url: "https://x.com/thedankoe/status/2014022520513634718",
        title: "The future of work when work is meaningless",
        domain: "x.com",
        icon: X,
      },
      {
        id: "2",
        url: "https://youtu.be/xwbI8VOsDTo?si=bSU7AkTOZJt-esFd",
        title: "Power Of Words | Mohammed Qathani",
        domain: "youtube.com",
        icon: FaYoutube,
      },
      {
        id: "3",
        url: "https://arxiv.org/abs/1706.03762",
        title: "Attention Is All You Need",
        domain: "arxiv.org",
        icon: BookmarkCheckIcon,
      },
    ],
  },
  certifications: {
    title: "Certificates",
    items: [
      {
        id: "certificate-1",
        url: "https://www.theforage.com/completion-certificates/Zbnc2o4ok6kD2NEXx/EuvC8GPjkZ6xaiP9p_Zbnc2o4ok6kD2NEXx_693ce0449f6548245819491e_1765744610923_completion_certificate.pdf",
        title: "Lloyds Banking Group — Data Science Job Simulation",
        domain: "theforage.com",
        date: "2025",
        icon: BrandNextjs,
      },
      {
        id: "certificate-2",
        url: "https://www.coursera.org/account/accomplishments/specialization/RUVXND31F5UC",
        title: "Google Digital Marketing & E-commerce",
        domain: "coursera.org",
        date: "2024",
        icon: SoloLearnIcon,
      },
    ],
  },
};
