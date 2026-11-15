export type NavEntry = { href: string; label: string };

export const COMMUNITY_URL = "https://www.cross-omics.com/";

export const NAV: NavEntry[] = [
  { href: "/about", label: "About" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/research", label: "Research" },
  { href: "/approach", label: "Approach" },
  { href: "/roadmap", label: "Roadmap" },
  { href: COMMUNITY_URL, label: "Community" }
];

export const GITHUB_URL = "https://github.com/CrossOmics/Gardener-Agent";
