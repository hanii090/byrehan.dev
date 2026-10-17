import type { ExperienceItem } from "@/config/types";

export const experienceSectionConfig = {
  title: "Experience",
};

export const experienceConfig: ExperienceItem[] = [
  {
    id: "sorca-founder",
    role: "Founder",
    company: "Sorca",
    period: "Aug 2026 — Present",
    summary:
      "Building Sorca, the AI clinical scribe and thinking partner for UK psychotherapists. Modality-aware notes, NHS Talking Therapies workflows, UK GDPR and EU residency.",
    highlights: [
      "Modality-aware clinical notes across CBT, IFS, EMDR, and more",
      "UK GDPR-aligned architecture with EU data residency",
    ],
    order: 1,
    enabled: true,
  },
  {
    id: "app-store-indie",
    role: "Independent App Developer",
    company: "App Store",
    period: "Aug 2026 — Present",
    summary:
      "Shipping privacy-first iOS apps including Wird, Noor Daily, Our Family Habits, Halia, HUSH, and ShikayatAI.",
    highlights: [
      "Offline-first, analytics-free spiritual and health apps",
      "Published under the Rehan Aslam developer account",
    ],
    order: 2,
    enabled: true,
  },
  {
    id: "cccu-intern",
    role: "Software Engineering Intern",
    company: "Canterbury Christ Church University",
    period: "Sep 2025 — May 2026",
    summary:
      "Maintained the International Student Office website and REST APIs with Python, JavaScript, React, and Node.js.",
    highlights: [
      "Improved student engagement by 40%",
      "Reduced data retrieval time by 25% and resolved 95% of reported bugs before deploy",
    ],
    order: 3,
    enabled: true,
  },
  {
    id: "aims-intern",
    role: "Software Engineering Research Intern",
    company: "AIMS Health Solutions",
    period: "Jul 2025 — Dec 2025",
    summary:
      "Built Python tooling to recover missing hops in multi-protocol traceroutes and validated results across large sample sets.",
    highlights: [
      "Improved network path completeness by 65%",
      "Cut processing time by 40% on large trace datasets",
    ],
    order: 4,
    enabled: true,
  },
];
