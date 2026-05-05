"use client";
import { useState } from "react";
import Link from "next/link";
import { revvvviews, products, users, getInitials, getScoreColor, getMetricColor } from "../lib/data";
import styles from "./revvviewReport.module.css";

interface revvviewReportProps {
  revvviewId: string;
}

type TabType = "overview" | "fixes" | "screenshots";

export default function RevvviewReport({ revvviewId }: revvviewReportProps) {
  const revvview = revvvviews.find((a) => a.id === revvviewId) || revvvviews[0];
  const product = products.find((p) => p.id === revvview.productId) || products[0];
  const user = users.find((u) => u.id === revvview.auditorId) || users[0];
  const avgScore = Math.round(((revvview.metrics.usability + revvview.metrics.performance + revvview.metrics.value + revvview.metrics.trust) / 4) * 10);
  const scoreColor = getScoreColor(avgScore);

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  const toggleAction = (index: number) => {
    setCheckedActions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className={styles.reportContainer}>
      {/* Sticky Header */}
      <div className={styles.stickyHeader}>
        <div className={styles.headerScore}>
          <div className={styles.miniScoreCircle} style={{ borderColor: scoreColor }}>
            <span className={styles.miniScoreValue} style={{ color: scoreColor }}>{avgScore}</span>
          </div>
          <div>
            <div className={styles.miniTitle}>{product.name} revvview</div>
            <div className={styles.miniMeta}>Version {revvview.version} · {revvview.createdAt}</div>
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
              {tab === "fixes" && <span className={styles.countBadge}>{revvview.suggestions.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.scrollBody}>
        {activeTab === "overview" && (
          <div className={styles.tabContent}>
            <div className={styles.auditorCard}>
              <div className={styles.auditorInfo}>
                <div className={styles.avatar}><span>{getInitials(user.name)}</span></div>
                <div>
                  <div className={styles.auditorName}>{user.name}</div>
                  <div className={styles.auditorRole}>{user.role}</div>
                </div>
              </div>
              <div className={styles.verdictTag} style={{ color: revvview.wouldUse ? "var(--green)" : "var(--red)" }}>
                {revvview.wouldUse ? "Recommended" : "Not Recommended"}
              </div>
            </div>

            <div className={styles.metricsGrid}>
              {Object.entries(revvview.metrics).map(([key, val]) => (
                <div key={key} className={styles.metricItem}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricLabel}>{key}</span>
                    <span className={styles.metricValue}>{val}</span>
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
                {revvview.engaged.map((p, i) => (
                  <div key={i} className={styles.point}>
                    <span className={styles.checkIcon}>✓</span>
                    <span className={styles.pointText}>{p}</span>
                  </div>
                ))}
              </div>

              <h3 className={styles.subTitle} style={{ marginTop: "32px" }}>Friction Points</h3>
              <div className={styles.pointsList}>
                {revvview.confused.map((p, i) => (
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
              {revvview.suggestions.map((s, i) => (
                <div 
                  key={i} 
                  className={`${styles.checkItem} ${checkedActions[i] ? styles.checkItemDone : ""}`}
                  onClick={() => toggleAction(i)}
                >
                  <div className={styles.checkbox}>
                    {checkedActions[i] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div className={styles.checkContent}>
                    <div className={styles.checkText}>{s}</div>
                    <div className={styles.checkMeta}>High Priority · Version {revvview.version}</div>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  );
}
