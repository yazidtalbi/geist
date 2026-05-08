"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getInitials, getScoreColor, getMetricColor, Product, revvview } from "../lib/data";
import styles from "./revvviewReport.module.css";
import Skeleton from "./Skeleton";
import { createClient } from "../lib/supabase-browser";

interface revvviewReportProps {
  revvviewId: string;
}

type TabType = "overview" | "fixes" | "screenshots";

export default function RevvviewReport({ revvviewId }: revvviewReportProps) {
  const [review, setReview] = useState<revvview | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: reviewData, error: reviewError } = await supabase
          .from('reviews')
          .select('*')
          .eq('id', revvviewId)
          .single();
        
        if (reviewError) throw reviewError;

        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', reviewData.product_id)
          .single();
        
        if (productError) throw productError;

        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', reviewData.auditor_id)
          .single();
        
        if (userError) throw userError;

        // Map data to interfaces
        const mappedReview: revvview = {
          id: reviewData.id,
          auditorId: reviewData.auditor_id,
          productId: reviewData.product_id,
          version: reviewData.version,
          metrics: {
            usability: reviewData.metrics_usability,
            performance: reviewData.metrics_performance,
            value: reviewData.metrics_value,
            trust: reviewData.metrics_trust
          },
          metricFeedback: {
            usability: reviewData.feedback_usability,
            performance: reviewData.feedback_performance,
            value: reviewData.feedback_value,
            trust: reviewData.feedback_trust
          },
          firstImpression: reviewData.first_impression,
          engaged: reviewData.engaged || [],
          confused: reviewData.confused || [],
          wouldUse: reviewData.would_use,
          suggestions: reviewData.suggestions || [],
          strategicOutlook: reviewData.strategic_outlook,
          timeSpent: reviewData.time_spent,
          createdAt: new Date(reviewData.created_at).toLocaleDateString(),
        } as any;

        const mappedProduct: Product = {
          id: productData.id,
          name: productData.name,
          url: productData.url,
          tagline: productData.tagline,
          logo: productData.logo,
          revvScore: productData.revv_score,
        } as any;

        setReview(mappedReview);
        setProduct(mappedProduct);
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch review report data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [revvviewId, supabase]);

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  const toggleAction = (index: number) => {
    setCheckedActions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return (
      <div className={styles.reportContainer} style={{ padding: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <Skeleton width={48} height={48} borderRadius="50%" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton width="40%" height={24} borderRadius={8} />
            <Skeleton width="20%" height={16} borderRadius={8} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <Skeleton width={80} height={32} borderRadius={16} />
          <Skeleton width={80} height={32} borderRadius={16} />
          <Skeleton width={80} height={32} borderRadius={16} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Skeleton width="100%" height={100} borderRadius={12} />
          <Skeleton width="100%" height={100} borderRadius={12} />
          <Skeleton width="100%" height={100} borderRadius={12} />
        </div>
      </div>
    );
  }

  if (!review || !product || !user) {
    return <div className={styles.reportContainer}>Data not found.</div>;
  }

  const avgScore = (review.metrics.usability + review.metrics.performance + review.metrics.value + review.metrics.trust) / 4;
  const scoreColor = getScoreColor(avgScore);

  return (
    <div className={styles.reportContainer}>
      {/* Sticky Header */}
      <div className={styles.stickyHeader}>
        <div className={styles.headerScore}>
          <div className={styles.miniScoreCircle} style={{ borderColor: scoreColor }}>
            <span className={styles.miniScoreValue} style={{ color: scoreColor }}>{avgScore.toFixed(1)}</span>
          </div>
          <div>
            <div className={styles.miniTitle}>{product.name} revvview</div>
            <div className={styles.miniMeta}>Version {review.version} · {review.createdAt}</div>
          </div>
        </div>
        <div className={styles.tabs}>
          {(["overview", "fixes", "screenshots"] as TabType[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "fixes" && <span className={styles.countBadge}>{review.suggestions.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.scrollBody}>
        {activeTab === "overview" && (
          <div className={styles.tabContent}>
            <div className={styles.auditorCard}>
              <div className={styles.auditorInfo}>
                <div className={styles.avatar}>
                   {user.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <span>{getInitials(user.name)}</span>}
                </div>
                <div>
                  <div className={styles.auditorName}>{user.name}</div>
                  <div className={styles.auditorRole}>{user.role}</div>
                </div>
              </div>
              <div className={styles.verdictTag} style={{ color: review.wouldUse ? "var(--green)" : "var(--red)" }}>
                {review.wouldUse ? "Recommended" : "Not Recommended"}
              </div>
            </div>

            <div className={styles.metricsGrid}>
              {Object.entries(review.metrics).map(([key, val]) => (
                <div key={key} className={styles.metricItem}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricLabel}>{key}</span>
                    <span className={styles.metricValue}>{val.toFixed(1)}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${(val as number) * 10}%`, background: getMetricColor(val as number) }} />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pointsSection}>
              <h3 className={styles.subTitle}>Highlights</h3>
              <div className={styles.pointsList}>
                {review.engaged.map((p, i) => (
                  <div key={i} className={styles.point}>
                    <span className={styles.checkIcon}>✓</span>
                    <span className={styles.pointText}>{p}</span>
                  </div>
                ))}
              </div>

              <h3 className={styles.subTitle} style={{ marginTop: "32px" }}>Friction Points</h3>
              <div className={styles.pointsList}>
                {review.confused.map((p, i) => (
                  <div key={i} className={styles.point}>
                    <span className={styles.crossIcon}>×</span>
                    <span className={styles.pointText}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "fixes" && (
          <div className={styles.tabContent}>
            <div className={styles.fixesHeader}>
              <h2 className={styles.title}>Strategic Checklist</h2>
              <p className={styles.description}>Turn these expert suggestions into tasks. Check them off as you fix them.</p>
            </div>

            <div className={styles.checklist}>
              {review.suggestions.map((s, i) => (
                <div
                  key={i}
                  className={`${styles.checkItem} ${checkedActions[i] ? styles.checkItemDone : ""}`}
                  onClick={() => toggleAction(i)}
                >
                  <div className={styles.checkbox}>
                    {checkedActions[i] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                  <div className={styles.checkContent}>
                    <div className={styles.checkText}>{s}</div>
                    <div className={styles.checkMeta}>High Priority · Version {review.version}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "screenshots" && (
          <div className={styles.tabContent}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🖼️</div>
              <h3>UI Evidence Gallery</h3>
              <p>Visual context for each friction point will appear here in the production version.</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.reportFooter}>
        <Link href={`/revvview/deep-dive/${revvviewId}`} className={styles.fullReportBtn}>
          View Exhaustive Editorial Report
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
