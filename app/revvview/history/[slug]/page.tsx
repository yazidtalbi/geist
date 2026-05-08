"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import RevvviewReport from "../../../components/revvviewReport";
import { Product } from "../../../lib/data";
import styles from "./page.module.css";
import Skeleton from "../../../components/Skeleton";
import { createClient } from "../../../lib/supabase-browser";
import { slugify } from "../../../lib/utils";

export default function revvviewHistoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: reviewData } = await supabase
          .from('reviews')
          .select('product_id')
          .eq('id', slug)
          .single();

        if (reviewData) {
          const { data: productData } = await supabase
            .from('products')
            .select('*')
            .eq('id', reviewData.product_id)
            .single();

          if (productData) {
            setProduct({
              id: productData.id,
              name: productData.name,
            } as any);
          }
        }
      } catch (err) {
        console.error("Failed to fetch history data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, supabase]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Skeleton width="40%" height={24} borderRadius={8} className="mb-8" />
          <Skeleton width="100%" height={600} borderRadius={12} />
        </div>
      </div>
    );
  }
  if (!product) return <div className={styles.page}>Review not found.</div>;

  return (
    <div className={styles.page}>

      <main className={styles.container}>
        <div className={styles.topNav}>
          <Link href={`/product/${slugify(product.name)}`} className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            Back to {product.name}
          </Link>
          <div className={styles.actions}>
            <button className="btn-secondary" onClick={() => window.print()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
              Export PDF
            </button>
            <button className="btn-primary">Share Report</button>
          </div>
        </div>

        <div className={styles.reportCard}>
          <RevvviewReport revvviewId={slug} />
        </div>
      </main>
    </div>
  );
}
