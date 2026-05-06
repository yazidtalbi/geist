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
    usability: `${product.metrics.usability.toFixed(1)}`,
    performance: `${product.metrics.performance.toFixed(1)}`,
    value: `${product.metrics.value.toFixed(1)}`,
    trust: `${product.metrics.trust.toFixed(1)}`,
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
          <div className={styles.screenshotGrid}>
            <div className={styles.screenshotMain}>
              {product.screenshot ? (
                <img src={product.screenshot} alt={product.name} className={styles.screenshotImage} />
              ) : (
                <div className={styles.screenshotPlaceholder}>Preview</div>
              )}
            </div>
            <div className={styles.screenshotSide}>
              <div className={styles.screenshotSmall}>
                {product.gallery?.[0] ? (
                  <img src={product.gallery[0]} alt="" className={styles.screenshotImage} />
                ) : (
                  <div className={styles.screenshotPlaceholder}>Gallery 1</div>
                )}
              </div>
              <div className={styles.screenshotSmall}>
                {product.gallery?.[1] ? (
                  <img src={product.gallery[1]} alt="" className={styles.screenshotImage} />
                ) : (
                  <div className={styles.screenshotPlaceholder}>Gallery 2</div>
                )}
              </div>
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
          <div className={styles.avatarStack}>
            <img src="https://api.dicebear.com/9.x/dylan/svg?seed=Felix" className={styles.miniAvatar} alt="revvviewer" />
            <img src="https://api.dicebear.com/9.x/dylan/svg?seed=Aneka" className={styles.miniAvatar} alt="revvviewer" />
            <img src="https://api.dicebear.com/9.x/dylan/svg?seed=Jasper" className={styles.miniAvatar} alt="revvviewer" />
          </div>
          <span className={styles.auditNumber}>{product.reviewsTotal}</span>
        </div>
        <div className={styles.footerActions}>
          <a href={product.url} target="_blank" className={styles.iconAction} aria-label="Visit Website">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
          <button className={styles.iconAction} aria-label="Share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          </button>
          <Link href={`/revvview/${product.id}`} className={styles.auditBtn}>
            <span style={{ fontWeight: 600, marginRight: 4 }}>Start</span>
            <span className="logoType" style={{ fontSize: 18, color: 'inherit', position: 'relative', bottom: '1.5px' }}>revvview</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2 }}>
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
