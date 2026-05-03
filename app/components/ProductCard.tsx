"use client";
import Link from "next/link";
import { Product, getScoreColor, getInitials, getMetricColor } from "../lib/data";
import styles from "./ProductCard.module.css";

const metricKeys = ["usability", "performance", "value", "trust", "retention"] as const;

const metricLabels: Record<string, string> = {
  usability: "Usability",
  performance: "Performance",
  value: "Value",
  trust: "Trust",
  retention: "Retention",
};

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const scoreColor = getScoreColor(product.revvScore);
  const retentionPct = Math.round((product.retentionYes / product.retentionTotal) * 100);

  const metricValues: Record<string, string> = {
    usability: `${product.metrics.usability.toFixed(1)}/10`,
    performance: `${product.metrics.performance.toFixed(1)}/10`,
    value: `${product.metrics.value.toFixed(1)}/10`,
    trust: `${product.metrics.trust.toFixed(1)}/10`,
    retention: `${retentionPct}%`,
  };

  return (
    <div className={styles.card} style={{ animationDelay: `${index * 0.08}s` }}>
      {/* Link to Product Detail View */}
      <Link href={`/product/${product.id}`} className={styles.mainLink}>
        {/* Header: Name + Score badge */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.logoIcon}>
              {product.logo ? (
                <img src={product.logo} alt={product.name} />
              ) : (
                <span>{getInitials(product.name)}</span>
              )}
            </div>
            <div className={styles.nameWrapper}>
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.tagline}>{product.tagline}</p>
            </div>
          </div>
          <div className={styles.scoreBadge} style={{ borderColor: scoreColor }}>
            <span className={styles.scoreNumber} style={{ color: scoreColor }}>{product.revvScore}</span>
          </div>
        </div>

        {/* Screenshot area */}
        <div className={styles.screenshotWrap}>
          <div className={styles.screenshotFrame}>
            <div className={styles.screenshotBar}>
              <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
            </div>
            <div className={styles.screenshotBody}>
              {product.screenshot ? (
                <img src={product.screenshot} alt={product.name} className={styles.screenshotImage} />
              ) : (
                <div className={styles.screenshotPlaceholder}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span>{product.url}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metrics grid - 3 columns, 2 rows with underline bars */}
        <div className={styles.metricsGrid}>
          {metricKeys.map((key) => {
            const val = key === "retention" ? retentionPct : product.metrics[key as keyof typeof product.metrics] * 10;
            return (
              <div key={key} className={styles.metricItem}>
                <span className={styles.metricLabel}>{metricLabels[key]}</span>
                <span className={styles.metricValue}>{metricValues[key]}</span>
                <div className={styles.metricBarTrack}>
                  <div className={styles.metricBar} style={{ width: `${val}%`, backgroundColor: getMetricColor(key === "retention" ? val / 10 : product.metrics[key as keyof typeof product.metrics]) }} />
                </div>
              </div>
            );
          })}
        </div>
      </Link>

      {/* Footer with Audit Action */}
      <div className={styles.footer}>
        <div className={styles.footerMeta}>
          <span>{product.reviewsTotal} audits</span>
          <span className={styles.sep}>•</span>
          <span>{product.activeUsers} active</span>
        </div>
        <Link href={`/audit/${product.id}`} className={styles.auditBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Join Audit
        </Link>
      </div>
    </div>
  );
}
