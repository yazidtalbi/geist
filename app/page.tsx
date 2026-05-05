"use client";
import { useState, Fragment } from "react";
import Navbar from "./components/Navbar";
import Trails from "./components/Trails";
import ProductCard from "./components/ProductCard";
import Toprevvviewers from "./components/Toprevvviewers";
import SubmitModal from "./components/SubmitModal";
import { products } from "./lib/data";
import styles from "./page.module.css";

export default function Home() {
  const [submitOpen, setSubmitOpen] = useState(false);

  return (
    <>
      <Navbar onSubmitOpen={() => setSubmitOpen(true)} />

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <div className={styles.announcement}>
              <div className={styles.announcementContent}>
                <div className={styles.announcementText}>
                  <h1 className={styles.announcementTitle}>revvview your product.</h1>
                  <p className={styles.announcementSub}>Get reviewed by the community.</p>
                  <button className={styles.announcementBtn} onClick={() => setSubmitOpen(true)}>
                    Submit product
                  </button>
                </div>
                <div className={styles.announcementIllus}>
                  <img src="/hero-illustration.jpg" alt="Illustration" />
                </div>
              </div>
            </div>

            <h2 className={styles.feedTitle}>Explore</h2>
            <div className={styles.feed}>
              {products.slice(0, 2).map((p, i) => (
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
              {products.slice(2, 3).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 2} />
              ))}
            </div>

            <section className={styles.historySection}>
              <h2 className={styles.feedTitle}>Yesterday&apos;s Top Products</h2>
              <div className={styles.feed}>
                {products.slice(1, 3).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              <button className={styles.seeAllBtn}>See all yesterday&apos;s top products</button>
            </section>

            <section className={styles.historySection}>
              <h2 className={styles.feedTitle}>Last Week&apos;s Top Products</h2>
              <div className={styles.feed}>
                {products.slice(0, 2).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              <button className={styles.seeAllBtn}>See all last week&apos;s top products</button>
            </section>

            <section className={styles.historySection}>
              <h2 className={styles.feedTitle}>Last Month&apos;s Top Products</h2>
              <div className={styles.feed}>
                {products.slice(1, 3).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              <button className={styles.seeAllBtn}>See all last month&apos;s top products</button>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <Trails />
              <Toprevvviewers />
            </div>
          </aside>
        </div>
      </main>

      <SubmitModal key={submitOpen ? "open" : "closed"} open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </>
  );
}
