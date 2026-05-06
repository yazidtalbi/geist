"use client";
import { use } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RevvviewReport from "../../../components/revvviewReport";
import { products, revvvviews } from "../../../lib/data";
import styles from "./page.module.css";
import { useState } from "react";

export default function revvviewHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const revvview = revvvviews.find((a) => a.id === id) || revvvviews[0];
  const product = products.find((p) => p.id === revvview.productId) || products[0];

  return (
    <div className={styles.page}>
      <Navbar  />
      
      <main className={styles.container}>
        <div className={styles.topNav}>
          <Link href={`/product/${product.id}`} className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back to {product.name}
          </Link>
          <div className={styles.actions}>
            <button className="btn-secondary" onClick={() => window.print()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Export PDF
            </button>
            <button className="btn-primary">Share Report</button>
          </div>
        </div>

        <div className={styles.reportCard}>
          <RevvviewReport revvviewId={id} />
        </div>
      </main>
    </div>
  );
}
