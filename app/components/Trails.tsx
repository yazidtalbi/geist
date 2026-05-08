"use client";
import { useEffect, useState } from "react";
import styles from "./Trails.module.css";
import { getTrendingProducts, Product } from "../lib/data";
import Link from "next/link";
import { slugify } from "../lib/utils";

import { createClient } from "../lib/supabase-browser";

export default function Trails() {
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const [trendingData, { data: { session } }] = await Promise.all([
          getTrendingProducts(3),
          supabase.auth.getSession()
        ]);
        setTrending(trendingData);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Failed to load trails data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [supabase]);

  return (
    <div className={styles.trailsContainer}>
      {/* Network Card / Stats Card */}
      {!user ? (
        <div className={styles.networkCard}>
          <h2 className={styles.networkTitle}>Ship better products</h2>
          <ul className={styles.networkList}>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Get direct, high-impact feedback from a community of 1,250+ reviewers
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Connect with the people behind the world&apos;s most successful startups
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Refine your product through continuous, data-backed insights
            </li>
          </ul>
          <button className={styles.signupBtn}>Join the community</button>
        </div>
      ) : (
        <div className={styles.networkCard}>
          <h2 className={styles.networkTitle}>Platform Insight</h2>
          <ul className={styles.networkList}>
            <li className={styles.insightItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
              <div className={styles.insightContent}>
                <span className={styles.insightTitle}>Global Audit Velocity</span>
                <span className={styles.insightText}>48.2% increase in peer reviews this week across all categories.</span>
              </div>
            </li>
            <li className={styles.insightItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <div className={styles.insightContent}>
                <span className={styles.insightTitle}>Tier Requirements</span>
                <span className={styles.insightText}>2,500 reputation points now required for Beta Access.</span>
              </div>
            </li>
            <li className={styles.insightItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              <div className={styles.insightContent}>
                <span className={styles.insightTitle}>Upcoming: AI Audit Tools</span>
                <span className={styles.insightText}>AI-assisted UX audit tools launching soon for all community members.</span>
              </div>
            </li>
            <li className={styles.insightItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              <div className={styles.insightContent}>
                <span className={styles.insightTitle}>Upcoming: Creator Dashboard</span>
                <span className={styles.insightText}>Advanced analytics for product owners to track real-time feedback impact.</span>
              </div>
            </li>
            <li className={styles.insightItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
              <div className={styles.insightContent}>
                <span className={styles.insightTitle}>Upcoming: Mobile App</span>
                <span className={styles.insightText}>iOS and Android versions entering private alpha for community testing.</span>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className={styles.trendingCard}>
        <div className={styles.trendingHeader}>
          <span>TRENDING</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
        </div>

        <div className={styles.trendingList}>
          {loading ? (
            <div className={styles.loadingPlaceholder}>Calculating trends...</div>
          ) : (
            trending.map((product) => (
              <Link href={`/product/${slugify(product.name)}`} key={product.id} className={styles.trendingItem}>
                {product.logo ? (
                  <img src={product.logo} alt={product.name} className={styles.miniIconImage} />
                ) : (
                  <div className={styles.miniIcon}>{product.name[0]}</div>
                )}
                <div className={styles.trendingInfo}>
                  <div className={styles.trendingTitle}>{product.name}</div>
                  <div className={styles.trendingSub}>{product.category}</div>
                </div>
                {product.recentReviewerAvatars && product.recentReviewerAvatars.length > 0 && (
                  <div className={styles.avatarStack}>
                    {product.recentReviewerAvatars.map((avatar, i) => (
                      <img key={i} src={avatar} className={styles.miniAvatar} alt="Reviewer" />
                    ))}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
