export interface Product {
  id: string;
  name: string;
  url: string;
  tagline: string;
  longDescription: string;
  services: string[];
  tags: string[];
  gallery: string[];
  category: string;
  screenshot: string;
  logo: string;
  creatorId: string;
  revvScore: number;
  metrics: { usability: number; performance: number; value: number; trust: number };
  retentionYes: number;
  retentionTotal: number;
  activeUsers: number;
  reviewsTotal: number;
  createdAt: string;
  socials: { twitter?: string; github?: string; website?: string; discord?: string };
  awards?: { name: string; emoji: string }[];
}

export interface revvview {
  id: string;
  auditorId: string;
  productId: string;
  version: string;
  metrics: { usability: number; performance: number; value: number; trust: number };
  metricFeedback: { usability: string; performance: string; value: string; trust: string };
  firstImpression?: string;
  engaged: string[];
  confused: string[];
  wouldUse: boolean;
  suggestions: string[];
  strategicOutlook?: string;
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
  revvvviewsCount: number;
}

export const users: User[] = [
  { id: "u1", name: "Sarah Chen", avatar: "", role: "product Researcher", reputation: 2840, badges: ["product Expert", "Early Hunter"], revvvviewsCount: 47 },
  { id: "u2", name: "Marcus Webb", avatar: "", role: "Frontend Engineer", reputation: 2120, badges: ["Honest Critic", "Early Hunter"], revvvviewsCount: 33 },
  { id: "u3", name: "Jane Doe", avatar: "", role: "Product Designer", reputation: 1950, badges: ["product Expert"], revvvviewsCount: 28 },
  { id: "u4", name: "Alex Rivera", avatar: "", role: "Startup Founder", reputation: 1780, badges: ["Early Hunter"], revvvviewsCount: 22 },
  { id: "u5", name: "Priya Patel", avatar: "", role: "Design Lead", reputation: 1540, badges: ["Honest Critic", "product Expert"], revvvviewsCount: 19 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Linear", url: "https://linear.app", tagline: "Streamline issues, sprints, and product roadmaps.",
    longDescription: "Linear is the system for modern software development. It helps teams streamline their software development workflow, from issue tracking and sprint planning to product roadmaps and automated workflows. Designed for speed and focus, Linear is built to help teams build better products.",
    services: ["Issue Tracking", "Sprint Planning", "Roadmaps", "Automated Workflows", "Team Collaboration"],
    tags: ["Productivity", "DevTools", "SaaS", "Management"],
    gallery: [
      "https://www.framer.com/creators-assets/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46825%2FFramer_Marketplace___3-zLngoUHhHCQYGq69nNkVplv4S3c4vi.jpg&w=3840&q=100",
      "https://www.framer.com/creators-assets/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46825%2FFramer_Marketplace___2-BqQCggvua6yHmCesbVJAqSGZvanTWj.jpg&w=3840&q=100",
      "https://www.framer.com/creators-assets/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46825%2Fkokoro-iesEntdorhXt0F5B8YRGUFCjGi5Ygb&w=3840&q=100"
    ],
    category: "DEV TOOL", screenshot: "https://www.framer.com/creators-assets/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46825%2FFramer_Marketplace___1-apvlfv7nuGCCsv18MBE23NMm0mdHBh.jpg&w=1920&q=100", logo: "",
    creatorId: "u4", revvScore: 92,
    metrics: { usability: 9.4, performance: 9.6, value: 8.8, trust: 9.2 },
    retentionYes: 142, retentionTotal: 156, activeUsers: 12, reviewsTotal: 156, createdAt: "2026-05-01",
    socials: { twitter: "linear", github: "linear", website: "https://linear.app" },
    awards: [
      { name: "Product of the Year", emoji: "🏆" },
      { name: "Best Design 2024", emoji: "✨" },
      { name: "Developer Choice", emoji: "💻" },
      { name: "Golden Pixel", emoji: "💎" }
    ]
  },
  {
    id: "p2", name: "Raycast", url: "https://raycast.com", tagline: "Your shortcut to everything on your Mac.",
    longDescription: "Raycast is a blazingly fast, extendable launcher that lets you control your tools with a few keystrokes. It's built to help you get things done faster and more efficiently, with a focus on simplicity and performance.",
    services: ["App Launcher", "System Controls", "Developer Tools", "Custom Extensions", "Clipboard History"],
    tags: ["Productivity", "Utility", "Mac", "DevTools"],
    gallery: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"],
    category: "PRODUCTIVITY", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 88,
    metrics: { usability: 9.0, performance: 9.2, value: 8.6, trust: 8.8 },
    retentionYes: 98, retentionTotal: 115, activeUsers: 8, reviewsTotal: 115, createdAt: "2026-05-01",
    socials: { twitter: "raycastapp", github: "raycast", website: "https://raycast.com" }
  },
  {
    id: "p3", name: "Cal.com", url: "https://cal.com", tagline: "Open-source scheduling for absolutely everyone.",
    longDescription: "Cal.com is the open-source alternative to Calendly. It gives you full control over your data and scheduling experience, with powerful features and a focus on privacy and openness.",
    services: ["Scheduling", "Team Coordination", "Calendar Integration", "API Access", "Self-Hosting"],
    tags: ["Scheduling", "Open Source", "SaaS", "Privacy"],
    gallery: ["https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"],
    category: "SAAS", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 81,
    metrics: { usability: 8.2, performance: 7.8, value: 8.6, trust: 8.0 },
    retentionYes: 67, retentionTotal: 89, activeUsers: 5, reviewsTotal: 89, createdAt: "2026-04-30",
    socials: { twitter: "calcom", github: "calcom", website: "https://cal.com" }
  },
  {
    id: "p4", name: "Resend", url: "https://resend.com", tagline: "Email API for developers that just works.",
    longDescription: "Resend is the best way to send emails from your application. It's built for developers, with a simple API and powerful features that make email integration a breeze.",
    services: ["Email API", "Domain Verification", "Email Templates", "Analytics", "Webhooks"],
    tags: ["Email", "DevTools", "API", "Marketing"],
    gallery: ["https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070&auto=format&fit=crop"],
    category: "DEV TOOL", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 85,
    metrics: { usability: 8.8, performance: 8.4, value: 8.6, trust: 8.2 },
    retentionYes: 54, retentionTotal: 66, activeUsers: 6, reviewsTotal: 66, createdAt: "2026-04-29",
    socials: { twitter: "resend", github: "resendlabs", website: "https://resend.com" }
  },
  {
    id: "p5", name: "Vercel", url: "https://vercel.com", tagline: "Develop. Preview. Ship. The frontend cloud.",
    longDescription: "Vercel is the platform for frontend developers, providing the speed and reliability needed to create at the moment of inspiration. We enable the world's most innovative teams to deploy faster and with confidence.",
    services: ["Frontend Hosting", "Serverless Functions", "Edge Computing", "Analytics", "Global CDN"],
    tags: ["Hosting", "Cloud", "Frontend", "Next.js"],
    gallery: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"],
    category: "PLATFORM", screenshot: "", logo: "",
    creatorId: "u4", revvScore: 90,
    metrics: { usability: 9.2, performance: 9.0, value: 8.8, trust: 9.0 },
    retentionYes: 188, retentionTotal: 210, activeUsers: 15, reviewsTotal: 210, createdAt: "2026-04-28",
    socials: { twitter: "vercel", github: "vercel", website: "https://vercel.com" }
  },
];

export const revvvviews: revvview[] = [
  { 
    id: "a1", 
    auditorId: "u1", 
    productId: "p1", 
    version: "v2.4.0",
    metrics: { usability: 9.5, performance: 9.8, value: 9.0, trust: 9.4 }, 
    metricFeedback: {
      usability: "Linear's navigation is buttery smooth. The keyboard shortcuts are a game changer for power users, making issue management feel effortless.",
      performance: "Blazingly fast. No lag even with thousands of issues. The optimistic UI updates make the application feel instantaneous.",
      value: "High value for money if you're a scaling startup. The time saved on sprint planning pays for itself within the first month.",
      trust: "Solid security practices and transparent communication about updates. Feels like a mature, reliable piece of infrastructure."
    },
    engaged: ["Lightning fast response times", "Clean and well-documented SDKs"], 
    confused: ["Error messages in the dashboard can be slightly cryptic"], 
    wouldUse: true, 
    suggestions: ["Add detailed error code reference table", "Implement copy-to-clipboard in docs"],
    strategicOutlook: "Linear continues to set the benchmark for developer tools. By addressing the minor cryptographic friction in error reporting, they can achieve near-perfect UX parity across their entire ecosystem.",
    timeSpent: 480, 
    createdAt: "2026-05-02" 
  },
  { 
    id: "a2", 
    auditorId: "u2", 
    productId: "p1", 
    version: "v2.4.0",
    metrics: { usability: 9.2, performance: 9.4, value: 8.6, trust: 9.0 }, 
    metricFeedback: {
      usability: "Extremely intuitive once you learn the hotkeys. The layout is clean and the hierarchy is well-defined.",
      performance: "Impressive speed. The app is highly optimized for fast workflows and doesn't buckle under pressure.",
      value: "Good value, although some advanced features could be more accessible for smaller teams.",
      trust: "Very trustworthy. Consistent performance and clear documentation build strong confidence in the platform."
    },
    engaged: ["Issue tracking feels natural", "Dark mode is perfectly balanced"], 
    confused: ["The current roadmap view lacks granular filtering capabilities, making it increasingly difficult for stakeholders to isolate specific project milestones or filter by strategic priority. This leads to information overload and significantly slows down the decision-making process for larger product dossiers."], 
    wouldUse: true, 
    suggestions: ["Add multi-select filtering to roadmap", "Allow custom status colors"],
    strategicOutlook: "The roadmap experience is currently the primary bottleneck for power users. Resolving this will transform the tool from a tactical issue tracker into a truly strategic project management engine.",
    timeSpent: 360, 
    createdAt: "2026-05-01" 
  },
  { 
    id: "a3", 
    auditorId: "u3", 
    productId: "p1", 
    version: "v2.3.8",
    metrics: { usability: 4.2, performance: 4.0, value: 5.0, trust: 4.2 }, 
    metricFeedback: {
      usability: "Major friction on mobile. Many buttons are too small or completely unresponsive. The layout breaks on smaller screens.",
      performance: "Poor performance on mobile devices. Heavy assets and lack of optimization lead to slow load times and stuttering animations.",
      value: "Value is diminished due to the poor mobile experience. It's hard to justify the price when the product is unusable on the go.",
      trust: "Low trust due to the broken state of the mobile app. It feels unfinished and unpolished."
    },
    engaged: ["Beautiful typography"], 
    confused: ["Onboarding flow is broken on mobile", "API key is hidden in settings"], 
    wouldUse: false, 
    suggestions: ["Fix mobile onboarding layout", "Move API keys to Developer tab"],
    strategicOutlook: "A classic case of 'form over function' on mobile. While the desktop experience is divine, the mobile onboarding requires an immediate structural overhaul to avoid massive churn at the top of the funnel.",
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
