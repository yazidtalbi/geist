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
      {!user && (
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
