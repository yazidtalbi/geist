"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import SubmitModal from "../../../components/SubmitModal";
import { products, users, getInitials, getScoreColor } from "../../lib/data";
import styles from "./page.module.css";

const funnelData = [
  { stage: "Visit Site", count: 1240, pct: 100 },
  { stage: "Answer Prompts", count: 892, pct: 72 },
  { stage: "Rate Metrics", count: 634, pct: 51 },
  { stage: "Complete Verdict", count: 456, pct: 37 },
];

const inboxItems = [
  { user: users[0], product: products[0], friction: "Onboarding flow requires too many clicks before reaching the dashboard. Users drop off at step 3.", severity: "High", date: "2 hours ago" },
  { user: users[2], product: products[0], friction: "Mobile navigation is confusing — hamburger menu items don't match desktop layout.", severity: "Medium", date: "5 hours ago" },
  { user: users[1], product: products[0], friction: "Settings page lacks search functionality. Power users can't find what they need.", severity: "Low", date: "1 day ago" },
];

export default function AnalyticsPage() {
  const product = products[0];
  const scoreColor = getScoreColor(product.revvScore);
  const [submitOpen, setSubmitOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Navbar onSubmitOpen={() => setSubmitOpen(true)} />

      <main className={styles.main}>
        {/* Product overview */}
        <div className={styles.overviewCard}>
          <div className={styles.overviewLeft}>
            <div className={styles.overviewName}>{product.name}</div>
            <div className={styles.overviewTagline}>{product.tagline}</div>
            <div className={styles.overviewMeta}>
              <span className="pill">{product.category}</span>
              <span className={styles.metaItem}>{product.reviewsTotal} total revvvviews</span>
              <span className={styles.metaItem}>{product.activeUsers} active now</span>
            </div>
          </div>
          <div className={styles.overviewScore}>
            <span className={styles.bigScore} style={{ color: scoreColor }}>{product.revvScore}</span>
            <span className={styles.scoreLabel}>RevvScore</span>
          </div>
        </div>

        {/* Funnel */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>revvview Performance Funnel</h2>
          <p className={styles.cardDesc}>Track where revvviewers drop off during the evaluation process.</p>
          <div className={styles.funnel}>
            {funnelData.map((item, i) => (
              <div key={item.stage} className={styles.funnelRow}>
                <div className={styles.funnelStage}>
                  <span className={styles.funnelStep}>{i + 1}</span>
                  <span className={styles.funnelName}>{item.stage}</span>
                </div>
                <div className={styles.funnelBarWrap}>
                  <div className={styles.funnelBar} style={{ width: `${item.pct}%` }} />
                </div>
                <div className={styles.funnelStats}>
                  <span className={styles.funnelCount}>{item.count.toLocaleString()}</span>
                  <span className={styles.funnelPct}>{item.pct}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.funnelInsight}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>Biggest drop-off: <strong>Visit Site → Answer Prompts</strong> (28% loss). Consider improving the onboarding prompt.</span>
          </div>
        </div>

        {/* Metric trends */}
        <div className={styles.metricsRow}>
          {(["usability", "performance", "value", "trust"] as const).map((key) => (
            <div key={key} className={styles.metricCard}>
              <div className={styles.metricCardLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className={styles.metricCardValue}>{product.metrics[key].toFixed(1)}</div>
              <div className={styles.metricCardBar}>
                <div className="progress-fill" style={{ width: `${(product.metrics[key] / 10) * 100}%`, background: scoreColor }} />
              </div>
            </div>
          ))}
        </div>

        {/* Founder's Inbox */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Founder&apos;s Inbox</h2>
          <p className={styles.cardDesc}>Critical friction points flagged by top revvviewers.</p>
          <div className={styles.inbox}>
            {inboxItems.map((item, i) => (
              <div key={i} className={styles.inboxItem}>
                <div className={styles.inboxHeader}>
                  <div className={styles.inboxUser}>
                    <div className={styles.inboxAvatar}><span>{getInitials(item.user.name)}</span></div>
                    <div>
                      <div className={styles.inboxName}>{item.user.name}</div>
                      <div className={styles.inboxRole}>{item.user.role} · {item.user.reputation} XP</div>
                    </div>
                  </div>
                  <div className={styles.inboxMeta}>
                    <span className={`${styles.severity} ${styles[`severity${item.severity}`]}`}>{item.severity}</span>
                    <span className={styles.inboxDate}>{item.date}</span>
                  </div>
                </div>
                <p className={styles.inboxFriction}>{item.friction}</p>
                <button className="btn-primary" style={{ fontSize: 13, padding: "8px 16px" }}>
                  Upgrade to Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
