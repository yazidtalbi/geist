"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "./components/Skeleton";
import Trails from "./components/Trails";
import ProductCard from "./components/ProductCard";
import Toprevvviewers from "./components/Toprevvviewers";
import { getProducts, Product } from "./lib/data";
import styles from "./page.module.css";

export default function Home() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setDbProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.announcement}>
              <div className={styles.announcementContent}>
                <div className={styles.announcementText}>
                  <p className={styles.announcementSub}>Get reviewed by the community.</p>
                  <Link href="/submit-product" className={styles.announcementBtn}>
                    Submit product
                  </Link>
                </div>
                <div className={styles.announcementIllus}>
                  <img src="/hero-illustration.jpg" alt="Illustration" />
                </div>
              </div>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <Skeleton height={400} borderRadius={12} />
                <Skeleton height={400} borderRadius={12} />
              </div>
            ) : dbProducts.length === 0 ? (
              <div style={{ padding: '40px 0', textAlign: 'center', opacity: 0.5 }}>No products found. Seed the database to get started.</div>
            ) : (
              <>
                <h2 className={styles.feedTitle}>Explore</h2>
                <div className={styles.feed}>
                  {dbProducts.slice(0, 2).map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                <div className={styles.promoBanner}>
                  <div className={styles.promoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <p className={styles.promoBannerText}>Get the best of revvview, directly in your inbox.</p>
                  <button className={styles.promoSignupBtn}>Sign Up</button>
                </div>

                <div className={styles.feed}>
                  {dbProducts.slice(2, 4).map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i + 2} />
                  ))}
                </div>

                <section className={styles.historySection}>
                  <h2 className={styles.feedTitle}>Yesterday&apos;s Top Products</h2>
                  <div className={styles.feed}>
                    {dbProducts.slice(4, 6).map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                  <button className={styles.seeAllBtn}>See all yesterday&apos;s top products</button>
                </section>

                <section className={styles.historySection}>
                  <h2 className={styles.feedTitle}>Last Week&apos;s Top Products</h2>
                  <div className={styles.feed}>
                    {dbProducts.slice(6, 8).map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                  <button className={styles.seeAllBtn}>See all last week&apos;s top products</button>
                </section>
              </>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <Trails />
              <Toprevvviewers />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
