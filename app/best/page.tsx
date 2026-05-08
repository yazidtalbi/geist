"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Skeleton from "../components/Skeleton";
import ProductCard from "../components/ProductCard";
import { getProducts, Product } from "../lib/data";

const MODE_RANGES: Record<string, { id: string; label: string }[]> = {
  daily: [
    { id: "may10", label: "mai 10" },
    { id: "may9", label: "mai 9" },
    { id: "may8", label: "mai 8" },
    { id: "may7", label: "mai 7" },
    { id: "may6", label: "mai 6" },
    { id: "may5", label: "mai 5" },
    { id: "may4", label: "mai 4" },
  ],
  weekly: [
    { id: "may4-may10", label: "mai 4—10" },
    { id: "may11-may17", label: "mai 11—17" },
    { id: "may18-may24", label: "mai 18—24" },
    { id: "may25-may31", label: "mai 25—31" },
  ],
  monthly: [
    { id: "may2026", label: "Mai 2026" },
    { id: "apr2026", label: "Avril 2026" },
    { id: "mar2026", label: "Mars 2026" },
    { id: "feb2026", label: "Février 2026" },
  ]
};

import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { DateRangePicker } from "../components/ui/date-range-picker";
import styles from "./page.module.css";

export default function BestPage() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [mode, setMode] = useState("weekly");
  const [activeRange, setActiveRange] = useState("may4-may10");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setDbProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchData();
  }, []);

  // Update activeRange when mode changes
  useEffect(() => {
    setActiveRange(MODE_RANGES[mode][0].id);
  }, [mode]);

  // Simulation of loading more data on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !loadingInitial) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, loadingInitial, dbProducts.length]);

  const loadMore = () => {
    if (visibleCount >= dbProducts.length) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  const displayProducts = dbProducts.slice(0, visibleCount);

  return (
    <>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <header className={styles.pageHeader}>
              <div className={styles.headerTitleArea}>
                <h1 className={styles.pageTitle}>Best Products</h1>
                <p className={styles.pageSub}>The most loved products by the community.</p>
              </div>

              <div className={styles.filterArea}>
                <Tabs value={mode} onValueChange={setMode} className={styles.modeTabs}>
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>

                <DateRangePicker 
                  ranges={MODE_RANGES[mode]} 
                  value={activeRange} 
                  onChange={setActiveRange} 
                />
              </div>
            </header>

            {loadingInitial ? (
              <div className={styles.productGrid}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Skeleton key={i} height={400} borderRadius={12} />
                ))}
              </div>
            ) : dbProducts.length === 0 ? (
              <div style={{ padding: '80px 0', textAlign: 'center', opacity: 0.5 }}>No products found.</div>
            ) : (
              <div className={styles.productGrid}>
                {displayProducts.map((p, i) => (
                  <ProductCard key={`${p.id}-${i}`} product={p} index={i} />
                ))}
              </div>
            )}

            <div ref={loaderRef} className={styles.loaderArea}>
              {isLoading && (
                <div className={styles.loader}>
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
