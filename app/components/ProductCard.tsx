"use client";
import Link from "next/link";
import { Product, getScoreColor, getInitials, getMetricColor } from "../lib/data";
import styles from "./ProductCard.module.css";
import { createClient } from "../lib/supabase-browser";
import { slugify } from "../lib/utils";

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
  const supabase = createClient();

  const handleStartReview = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Trigger modal on current page
      const params = new URLSearchParams(window.location.search);
      params.set('auth', 'signup');
      const newUrl = window.location.pathname + '?' + params.toString() + window.location.hash;
      window.history.replaceState({}, '', newUrl);

      // Dispatch a custom event so Navbar knows to check URL again
      window.dispatchEvent(new Event('popstate'));
    } else {
      // Navigate to audit page
      window.location.href = `/revvview/audit/${slugify(product.name)}`;
    }
  };

  return (
    <div
      className={`${styles.card} ${isCompact ? styles.compact : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Link to Product Detail View */}
      <Link href={`/product/${slugify(product.name)}`} className={styles.mainLink}>
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
          <div className={styles.screenshotSingle}>
            {product.screenshot ? (
              <img src={product.screenshot} alt={product.name} className={styles.screenshotImage} />
            ) : (
              <div className={styles.screenshotPlaceholder}>Preview</div>
            )}
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
            {product.recentReviewerAvatars && product.recentReviewerAvatars.length > 0 ? (
              product.recentReviewerAvatars.map((url, i) => (
                <img key={i} src={url} className={styles.miniAvatar} alt="auditor" />
              ))
            ) : (
              <div className={styles.emptyAvatarStack}>
                <div className={styles.miniAvatarPlaceholder}>?</div>
              </div>
            )}
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
          <button
            onClick={handleStartReview}
            className={styles.auditBtn}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
            <span style={{ fontWeight: 600 }}>Start</span>
            {!isCompact && (
              <span className="logoType" style={{ fontSize: 18, color: 'inherit', position: 'relative', bottom: '1.5px', marginLeft: -8 }}>revvview</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
