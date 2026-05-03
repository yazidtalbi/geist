"use client";
import { use, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { products, users, getInitials, getScoreColor, getMetricColor, audits } from "../../lib/data";
import { Drawer } from "../../components/Drawer";
import AuditReport from "../../components/AuditReport";
import styles from "./page.module.css";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) || products[0];
  const scoreColor = getScoreColor(product.revvScore);

  const productAudits = audits.filter((a) => a.productId === product.id);

  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenAudit = (auditId: string) => {
    setSelectedAuditId(auditId);
    setDrawerOpen(true);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        {/* Product Hero */}
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.header}>
              <div className={styles.logoIcon}>
                {product.logo ? <img src={product.logo} alt="" /> : <span>{getInitials(product.name)}</span>}
              </div>
              <div className={styles.titleInfo}>
                <h1 className={styles.name}>{product.name}</h1>
                <p className={styles.tagline}>{product.tagline}</p>
              </div>
            </div>
            
            <div className={styles.metaRow}>
              <span className="pill">{product.category}</span>
              <span className={styles.metaText}>{product.reviewsTotal} verified audits</span>
              <span className={styles.metaText}>{product.activeUsers} active this week</span>
            </div>
          </div>

          <div className={styles.scoreArea}>
            <div className={styles.scoreCircle} style={{ borderColor: scoreColor }}>
              <span className={styles.scoreValue} style={{ color: scoreColor }}>{product.revvScore}</span>
              <span className={styles.scoreLabel}>RevvScore</span>
            </div>
            <Link href={`/audit/${product.id}`} className={styles.ctaWrapper}>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Start Deep Audit
              </button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className={styles.grid}>
          <div className={styles.metricsCard}>
            <h2 className={styles.sectionTitle}>UX Truth Breakdown</h2>
            <div className={styles.metricsList}>
              {(["usability", "performance", "value", "trust"] as const).map((key) => (
                <div key={key} className={styles.metricItem}>
                  <div className={styles.metricInfo}>
                    <span className={styles.metricLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className={styles.metricValue}>{product.metrics[key].toFixed(1)}/10</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${product.metrics[key] * 10}%`, background: getMetricColor(product.metrics[key]) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.screenshotCard}>
            <h2 className={styles.sectionTitle}>Product Interface</h2>
            <div className={styles.browserFrame}>
              <div className={styles.browserBar}>
                <div className={styles.dots}><span /><span /><span /></div>
                <div className={styles.url}>{product.url}</div>
              </div>
              <div className={styles.browserBody}>
                {product.screenshot ? <img src={product.screenshot} alt="" /> : <div className={styles.placeholder}>Interface Preview</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Community Audits Table */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Verified Audit History</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.auditTable}>
              <thead>
                <tr>
                  <th>Auditor</th>
                  <th>Usability</th>
                  <th>Performance</th>
                  <th>Value</th>
                  <th>Trust</th>
                  <th>RevvScore</th>
                  <th>Date</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {productAudits.map((review) => {
                  const reviewer = users.find(u => u.id === review.auditorId) || users[0];
                  const avgScore = Math.round(((review.metrics.usability + review.metrics.performance + review.metrics.value + review.metrics.trust) / 4) * 10);
                  
                  return (
                    <tr key={review.id} onClick={() => handleOpenAudit(review.id)} className={styles.clickableRow}>
                      <td>
                        <div className={styles.reviewerCell}>
                          <div className={styles.avatarMini}><span>{getInitials(reviewer.name)}</span></div>
                          <div>
                            <div className={styles.reviewerNameMini}>{reviewer.name}</div>
                            <div className={styles.reviewerRoleMini}>{reviewer.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.metricCell}>
                          <span className={styles.metricValMini} style={{ color: getMetricColor(review.metrics.usability) }}>{review.metrics.usability.toFixed(1)}</span>
                          <div className={styles.barMini}><div className={styles.fillMini} style={{ width: `${review.metrics.usability * 10}%`, background: getMetricColor(review.metrics.usability) }} /></div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.metricCell}>
                          <span className={styles.metricValMini} style={{ color: getMetricColor(review.metrics.performance) }}>{review.metrics.performance.toFixed(1)}</span>
                          <div className={styles.barMini}><div className={styles.fillMini} style={{ width: `${review.metrics.performance * 10}%`, background: getMetricColor(review.metrics.performance) }} /></div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.metricCell}>
                          <span className={styles.metricValMini} style={{ color: getMetricColor(review.metrics.value) }}>{review.metrics.value.toFixed(1)}</span>
                          <div className={styles.barMini}><div className={styles.fillMini} style={{ width: `${review.metrics.value * 10}%`, background: getMetricColor(review.metrics.value) }} /></div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.metricCell}>
                          <span className={styles.metricValMini} style={{ color: getMetricColor(review.metrics.trust) }}>{review.metrics.trust.toFixed(1)}</span>
                          <div className={styles.barMini}><div className={styles.fillMini} style={{ width: `${review.metrics.trust * 10}%`, background: getMetricColor(review.metrics.trust) }} /></div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.scoreBadge} style={{ background: getScoreColor(avgScore) + "15", color: getScoreColor(avgScore) }}>
                          {(avgScore / 10).toFixed(1)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>{review.createdAt}</td>
                      <td>
                        <div className={styles.reportIconLink}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Deep Audit Deep Dive">
        {selectedAuditId && <AuditReport auditId={selectedAuditId} />}
      </Drawer>
    </div>
  );
}
