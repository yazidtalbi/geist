"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "../components/Skeleton";
import { getProducts, getTopReviewers, getInitials, Product } from "../lib/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import styles from "./page.module.css";
import { createClient } from "../lib/supabase-browser";
import { slugify } from "../lib/utils";

export default function LeaderboardPage() {
  const [rankedProducts, setRankedProducts] = useState<Product[]>([]);
  const [rankedUsers, setRankedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();

        // Fetch more reviewers for the leaderboard
        const { data: reviewersData } = await supabase
          .from('profiles')
          .select('*')
          .order('reputation', { ascending: false })
          .limit(20);

        setRankedProducts(productsData);
        setRankedUsers(reviewersData || []);
      } catch (err) {
        console.error("Failed to fetch leaderboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Skeleton width="60%" height={40} borderRadius={8} className="mb-4" />
          <Skeleton width="40%" height={24} borderRadius={8} className="mb-12" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} width="100%" height={100} borderRadius={12} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>The Leaderboard</h1>
              <p className={styles.subtitle}>Recognizing excellence across the community. Updated in real-time.</p>
            </div>

            <Tabs defaultValue="products" className={styles.tabs}>
              <TabsList>
                <TabsTrigger value="products">Top Products</TabsTrigger>
                <TabsTrigger value="users">Top Reviewers</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className={styles.tabContent}>
                <div className={styles.list}>
                  {rankedProducts.map((product, index) => (
                    <Link href={`/product/${slugify(product.name)}`} key={product.id} className={styles.item}>
                      <div className={styles.rankCol}>
                        <span className={`${styles.rank} ${index < 3 ? styles[`rank${index + 1}`] : ""}`}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </span>
                      </div>
                      <div className={styles.identityCol}>
                        <div className={styles.imageBox}>
                          {product.logo ? (
                            <img src={product.logo} alt={product.name} className={styles.logo} />
                          ) : (
                            <div className={styles.placeholderLogo}>{product.name[0]}</div>
                          )}
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.name}>{product.name}</h3>
                          <p className={styles.tagline}>{product.tagline}</p>
                        </div>
                      </div>
                      <div className={styles.statsCol}>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{product.revvScore.toFixed(1)}</span>
                          <span className={styles.statLabel}>Score</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{product.reviewsTotal}</span>
                          <span className={styles.statLabel}>Reviews</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="users" className={styles.tabContent}>
                <div className={styles.list}>
                  {rankedUsers.map((user, index) => (
                    <Link href={`/profile/${getInitials(user.name).toLowerCase()}`} key={user.id} className={styles.item}>
                      <div className={styles.rankCol}>
                        <span className={`${styles.rank} ${index < 3 ? styles[`rank${index + 1}`] : ""}`}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </span>
                      </div>
                      <div className={styles.identityCol}>
                        <div className={styles.avatarBox}>
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className={styles.avatar} />
                          ) : (
                            <div className={styles.placeholderAvatar}>{getInitials(user.name)}</div>
                          )}
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.name}>{user.name}</h3>
                          <p className={styles.tagline}>{user.role}</p>
                        </div>
                      </div>
                      <div className={styles.statsCol}>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{user.reputation.toLocaleString()}</span>
                          <span className={styles.statLabel}>XP</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{user.revvvviews_count || 0}</span>
                          <span className={styles.statLabel}>Reviews</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </header>
        </div>
      </main>
    </>
  );
}
