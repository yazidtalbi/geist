"use client";
import Link from "next/link";
import { Product, getScoreColor, getInitials, getMetricColor } from "../lib/data";
import styles from "./ProductCard.module.css";

const metricKeys = ["usability", "performance", "value", "trust"] as const;

const metricLabels: Record<string, string> = {
  usability: "Usability",
  performance: "Performance",
  value: "Value",
  trust: "Trust",
};

export default function ProductCard({
  product,
  index,
  variant = "default"
}: {
  product: Product;
  index: number;
  variant?: "default" | "compact";
}) {
  const scoreColor = getScoreColor(product.revvScore);
  const isCompact = variant === "compact";

  return (
    <div
      className={`${styles.card} ${isCompact ? styles.compact : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
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
            <span className={styles.scoreNumber} style={{ color: scoreColor }}>{product.revvScore.toFixed(1)}</span>
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

        {/* Metrics grid - 1x4 with underline bars */}
        <div className={styles.metricsGrid}>
          {metricKeys.map((key) => {
            const val = product.metrics[key as keyof typeof product.metrics] * 10;
            return (
              <div key={key} className={styles.metricItem}>
                <span className={styles.metricValue}>{product.metrics[key as keyof typeof product.metrics].toFixed(1)}</span>
                <div className={styles.metricBarTrack}>
                  <div className={styles.metricBar} style={{ width: `${val}%`, backgroundColor: getMetricColor(product.metrics[key as keyof typeof product.metrics]) }} />
                </div>
                <span className={styles.metricLabel}>{metricLabels[key]}</span>
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
          </div>
          <span className={styles.auditNumber}>{product.reviewsTotal}</span>
        </div>
        <div className={styles.footerActions}>
          {!isCompact && (
            <>
              <a href={product.url} target="_blank" className={styles.iconAction} aria-label="Visit Website">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </>
          )}
          <Link href={`/revvview/${product.id}`} className={styles.auditBtn}>
            <span style={{ fontWeight: 600 }}>Start</span>
            {!isCompact && (
              <span className="logoType" style={{ fontSize: 18, color: 'inherit', position: 'relative', bottom: '1.5px', marginLeft: 4 }}>revvview</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
