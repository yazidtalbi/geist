
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTrending() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  console.log("Fetching products and reviews...");
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      category,
      logo,
      revv_score,
      reviews (
        id,
        created_at,
        profiles (
          avatar
        )
      )
    `);

  if (error) {
    console.error("Error:", error);
    return;
  }

  const productsWithTrendingScore = data.map(product => {
    const recentReviews = product.reviews.filter((r: any) => new Date(r.created_at) > sevenDaysAgo);
    const trendingScore = recentReviews.length;
    
    return {
      name: product.name,
      category: product.category,
      logo: product.logo,
      revvScore: product.revv_score,
      recentReviewsCount: recentReviews.length,
      trendingScore: trendingScore,
      recentAvatars: Array.from(new Set(recentReviews.map((r: any) => r.profiles?.avatar).filter(Boolean))).slice(0, 3)
    };
  });

  const trendingProducts = productsWithTrendingScore
    .sort((a, b) => b.trendingScore - a.trendingScore || b.revvScore - a.revvScore)
    .slice(0, 5);

  console.log("Trending Products:");
  console.table(trendingProducts);
}

testTrending();
