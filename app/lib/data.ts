import { createClient } from "./supabase-browser";

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
  activeUsers: number;
  reviewsTotal: number;
  createdAt: string;
  socials: { twitter?: string; github?: string; website?: string; discord?: string };
  awards?: { name: string; emoji: string }[];
  recentReviewerAvatars?: string[];
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

// Map database row to Product interface
export function mapProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    tagline: row.tagline,
    longDescription: row.long_description,
    services: row.services || [],
    tags: row.tags || [],
    gallery: row.gallery || [],
    category: row.category,
    screenshot: row.screenshot,
    logo: row.logo,
    creatorId: row.creator_id,
    revvScore: row.revv_score,
    metrics: {
      usability: row.metrics_usability,
      performance: row.metrics_performance,
      value: row.metrics_value,
      trust: row.metrics_trust,
    },
    activeUsers: row.active_users,
    reviewsTotal: row.reviews_total,
    createdAt: row.created_at,
    socials: {
      twitter: row.socials_twitter,
      github: row.socials_github,
      website: row.socials_website,
      discord: row.socials_discord,
    },
    awards: row.awards || [],
    recentReviewerAvatars: row.reviews 
      ? Array.from(new Set(
          row.reviews
            .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((r: any) => r.profiles?.avatar)
            .filter(Boolean)
        )).slice(0, 3) as string[]
      : [],
  };
}

// Map database row to revvview interface
export function mapReview(row: any): revvview {
  return {
    id: row.id,
    auditorId: row.auditor_id,
    productId: row.product_id,
    version: row.version,
    metrics: {
      usability: row.metrics_usability,
      performance: row.metrics_performance,
      value: row.metrics_value,
      trust: row.metrics_trust,
    },
    metricFeedback: {
      usability: row.feedback_usability,
      performance: row.feedback_performance,
      value: row.feedback_value,
      trust: row.feedback_trust,
    },
    firstImpression: row.first_impression,
    engaged: row.engaged || [],
    confused: row.confused || [],
    wouldUse: row.would_use,
    suggestions: row.suggestions || [],
    strategicOutlook: row.strategic_outlook,
    timeSpent: row.time_spent,
    createdAt: row.created_at,
  };
}

// Client-side fetching (for components that use "use client")
export async function getProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      reviews (
        auditor_id,
        created_at,
        profiles (
          avatar
        )
      )
    `)
    .order('revv_score', { ascending: false });
  
  if (error) throw error;
  return data.map(mapProduct);
}

export async function getProductById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return mapProduct(data);
}

export async function getReviews(productId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data.map(mapReview);
}

export async function getTopReviewers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('reputation', { ascending: false })
    .limit(5);
  
  if (error) throw error;
  return data;
}

export async function getTrendingProducts(limit = 3) {
  const supabase = createClient();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      reviews (
        id,
        created_at,
        profiles (
          avatar
        )
      )
    `);

  if (error) throw error;

  return data
    .map(product => {
      const recentReviews = product.reviews?.filter(
        (r: any) => new Date(r.created_at) > sevenDaysAgo
      ) || [];
      
      // Calculate Score: Velocity (10pts per review) + Quality (2pts per score point)
      const trendingScore = (recentReviews.length * 10) + (product.revv_score * 2);
      
      return {
        ...mapProduct(product),
        trendingScore
      };
    })
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);
}

// Legacy exports for backward compatibility during transition
export const products: Product[] = [
  {
    id: "default",
    name: "Loading...",
    url: "#",
    tagline: "Product data is loading",
    longDescription: "",
    services: [],
    tags: [],
    gallery: [],
    category: "GENERAL",
    screenshot: "",
    logo: "",
    creatorId: "",
    revvScore: 0,
    metrics: { usability: 0, performance: 0, value: 0, trust: 0 },
    activeUsers: 0,
    reviewsTotal: 0,
    createdAt: new Date().toISOString(),
    socials: {}
  }
];
export const users: User[] = [
  {
    id: "default",
    name: "Guest User",
    avatar: "",
    role: "User",
    reputation: 0,
    badges: [],
    revvvviewsCount: 0
  }
];
export const revvvviews: revvview[] = [];

export function getInitials(name: string): string {
  if (!name) return "U";
  return name.split(" ").map(w => w[0]).join("").toUpperCase();
}

export function getScoreColor(score: number): string {
  if (score >= 8.5) return "#22C55E";
  if (score >= 7.0) return "#F59E0B";
  return "#3b82f6";
}

export function getMetricBarWidth(value: number): string {
  return `${(value / 10) * 100}%`;
}

export function getMetricColor(value: number): string {
  if (value >= 9.0) return "#22C55E"; // Green
  if (value < 5.0) return "#3b82f6";  // Blue instead of Red
  return "#0070F3"; // Electric Blue
}
