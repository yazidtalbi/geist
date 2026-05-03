export interface Product {
  id: string;
  name: string;
  url: string;
  tagline: string;
  category: string;
  screenshot: string;
  logo: string;
  creatorId: string;
  revvScore: number;
  metrics: { usability: number; performance: number; value: number; trust: number };
  retentionYes: number;
  retentionTotal: number;
  activeAuditors: number;
  totalAudits: number;
  createdAt: string;
}

export interface Audit {
  id: string;
  auditorId: string;
  productId: string;
  version: string;
  metrics: { usability: number; performance: number; value: number; trust: number };
  engaged: string[];
  confused: string[];
  wouldUse: boolean;
  suggestions: string[];
  timeSpent: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  reputation: number;
  badges: string[];
  auditsCount: number;
}

export const users: User[] = [
  { id: "u1", name: "Sarah Chen", avatar: "", role: "UX Researcher", reputation: 2840, badges: ["UX Expert", "Early Hunter"], auditsCount: 47 },
  { id: "u2", name: "Marcus Webb", avatar: "", role: "Frontend Engineer", reputation: 2120, badges: ["Honest Critic", "Early Hunter"], auditsCount: 33 },
  { id: "u3", name: "Jane Doe", avatar: "", role: "Product Designer", reputation: 1950, badges: ["UX Expert"], auditsCount: 28 },
  { id: "u4", name: "Alex Rivera", avatar: "", role: "Startup Founder", reputation: 1780, badges: ["Early Hunter"], auditsCount: 22 },
  { id: "u5", name: "Priya Patel", avatar: "", role: "Design Lead", reputation: 1540, badges: ["Honest Critic", "UX Expert"], auditsCount: 19 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Linear", url: "https://linear.app", tagline: "Streamline issues, sprints, and product roadmaps.",
    category: "DEV TOOL", screenshot: "https://www.framer.com/creators-assets/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46825%2FFramer_Marketplace___1-apvlfv7nuGCCsv18MBE23NMm0mdHBh.jpg&w=1920&q=100", logo: "",
    creatorId: "u4", revvScore: 92,
    metrics: { usability: 9.4, performance: 9.6, value: 8.8, trust: 9.2 },
    retentionYes: 142, retentionTotal: 156, activeAuditors: 12, totalAudits: 156, createdAt: "2026-05-01",
  },
  {
    id: "p2", name: "Raycast", url: "https://raycast.com", tagline: "Your shortcut to everything on your Mac.",
    category: "PRODUCTIVITY", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 88,
    metrics: { usability: 9.0, performance: 9.2, value: 8.6, trust: 8.8 },
    retentionYes: 98, retentionTotal: 115, activeAuditors: 8, totalAudits: 115, createdAt: "2026-05-01",
  },
  {
    id: "p3", name: "Cal.com", url: "https://cal.com", tagline: "Open-source scheduling for absolutely everyone.",
    category: "SAAS", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 81,
    metrics: { usability: 8.2, performance: 7.8, value: 8.6, trust: 8.0 },
    retentionYes: 67, retentionTotal: 89, activeAuditors: 5, totalAudits: 89, createdAt: "2026-04-30",
  },
  {
    id: "p4", name: "Resend", url: "https://resend.com", tagline: "Email API for developers that just works.",
    category: "DEV TOOL", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 85,
    metrics: { usability: 8.8, performance: 8.4, value: 8.6, trust: 8.2 },
    retentionYes: 54, retentionTotal: 66, activeAuditors: 6, totalAudits: 66, createdAt: "2026-04-29",
  },
  {
    id: "p5", name: "Vercel", url: "https://vercel.com", tagline: "Develop. Preview. Ship. The frontend cloud.",
    category: "PLATFORM", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 90,
    metrics: { usability: 9.2, performance: 9.0, value: 8.8, trust: 9.0 },
    retentionYes: 188, retentionTotal: 210, activeAuditors: 15, totalAudits: 210, createdAt: "2026-04-28",
  },
];

export const audits: Audit[] = [
  { 
    id: "a1", 
    auditorId: "u1", 
    productId: "p1", 
    version: "v2.4.0",
    metrics: { usability: 9.5, performance: 9.8, value: 9.0, trust: 9.4 }, 
    engaged: ["Lightning fast response times", "Clean and well-documented SDKs"], 
    confused: ["Error messages in the dashboard can be slightly cryptic"], 
    wouldUse: true, 
    suggestions: ["Add detailed error code reference table", "Implement copy-to-clipboard in docs"],
    timeSpent: 480, 
    createdAt: "2026-05-02" 
  },
  { 
    id: "a2", 
    auditorId: "u2", 
    productId: "p1", 
    version: "v2.4.0",
    metrics: { usability: 9.2, performance: 9.4, value: 8.6, trust: 9.0 }, 
    engaged: ["Issue tracking feels natural", "Dark mode is perfectly balanced"], 
    confused: ["The roadmap view needs better filtering options"], 
    wouldUse: true, 
    suggestions: ["Add multi-select filtering to roadmap", "Allow custom status colors"],
    timeSpent: 360, 
    createdAt: "2026-05-01" 
  },
  { 
    id: "a3", 
    auditorId: "u3", 
    productId: "p1", 
    version: "v2.3.8",
    metrics: { usability: 4.2, performance: 4.0, value: 5.0, trust: 4.2 }, 
    engaged: ["Beautiful typography"], 
    confused: ["Onboarding flow is broken on mobile", "API key is hidden in settings"], 
    wouldUse: false, 
    suggestions: ["Fix mobile onboarding layout", "Move API keys to Developer tab"],
    timeSpent: 1200, 
    createdAt: "2026-04-28" 
  },
];

export function getInitials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").toUpperCase();
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "#22C55E";
  if (score >= 70) return "#F59E0B";
  return "#EF4444";
}

export function getMetricBarWidth(value: number): string {
  return `${(value / 10) * 100}%`;
}

export function getMetricColor(value: number): string {
  if (value >= 9.0) return "#22C55E"; // Green
  if (value < 5.0) return "#EF4444";  // Red
  return "#0070F3"; // Electric Blue
}
