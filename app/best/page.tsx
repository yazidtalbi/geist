"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/data";
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
  const [mode, setMode] = useState("weekly");
  const [activeRange, setActiveRange] = useState("may4-may10");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Update activeRange when mode changes
  useEffect(() => {
    setActiveRange(MODE_RANGES[mode][0].id);
  }, [mode]);

  // Simulation of loading more data on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  const loadMore = () => {
    if (visibleCount >= products.length * 3) return; // Cap for demo
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoading(false);
    }, 800);
  };

  // Mock list for infinite scroll (cycling the products data)
  const displayProducts = Array.from({ length: visibleCount }).map((_, i) => products[i % products.length]);

  return (
    <>
      <Navbar />

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

            <div className={styles.productGrid}>
              {displayProducts.map((p, i) => (
                <ProductCard key={`${p.id}-${i}`} product={p} index={i} />
              ))}
            </div>

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
