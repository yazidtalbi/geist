"use client";
import { useState, Fragment } from "react";
import Navbar from "./components/Navbar";
import Trails from "./components/Trails";
import ProductCard from "./components/ProductCard";
import TopAuditors from "./components/TopAuditors";
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
          <aside className={styles.sidebar}>
            <Trails />
          </aside>

          <div className={styles.content}>
            <div className={styles.announcement}>
              <div className={styles.announcementText}>
                <h1 className={styles.announcementTitle}>Ready for the UX truth?</h1>
                <p className={styles.announcementSub}>Get your product audited by real users and identify friction points.</p>
              </div>
              <button className={styles.announcementBtn} onClick={() => setSubmitOpen(true)}>
                Submit your website
              </button>
            </div>

            <div className={styles.feed}>
              {products.map((p, i) => (
                <Fragment key={p.id}>
                  <ProductCard product={p} index={i} />
                  {i === 2 && (
                    <div className={styles.leaderboardSection}>
                      <TopAuditors />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </>
  );
}
