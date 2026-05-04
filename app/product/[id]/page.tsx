"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { products, users, getInitials, getScoreColor, getMetricColor, audits } from "../../lib/data";
import { Drawer } from "../../components/Drawer";
import AuditReport from "../../components/AuditReport";
import styles from "./page.module.css";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) || products[0];
  const scoreColor = getScoreColor(product.revvScore);
  const productAudits = audits.filter((a) => a.productId === product.id);
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [activeTab, setActiveTab] = useState("Overview");
  const [showMiniHeader, setShowMiniHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMiniHeader(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "Overview") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab(id);
      return;
    }
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
  };
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenAudit = (auditId: string) => {
    setSelectedAuditId(auditId);
    setDrawerOpen(true);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      {/* Sticky Mini Header on Scroll */}
      <div className={`${styles.miniHeader} ${showMiniHeader ? styles.miniHeaderVisible : ""}`}>
        <div className={styles.miniHeaderInner}>
          <div className={styles.miniHeaderLeft}>
            <div className={styles.miniLogo}>
              {product.logo ? <img src={product.logo} alt="" /> : <span>{getInitials(product.name)}</span>}
            </div>
            <span className={styles.miniTitle}>{product.name}</span>
          </div>
          
          <div className={styles.miniHeaderRight}>
            <div className={styles.headerActionsMini}>
              <a href={product.url} target="_blank" className={styles.headerActionBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Visit Website
              </a>
              <button className={styles.headerActionBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                Share
              </button>
            </div>
            <div className={styles.miniScore} style={{ color: scoreColor, borderColor: scoreColor }}>
              {product.revvScore}
            </div>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        {/* Header Section */}
        <header className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.logoIconLarge}>
              {product.logo ? <img src={product.logo} alt="" /> : <span>{getInitials(product.name)}</span>}
            </div>
            <div className={styles.titleArea}>
              <h1 className={styles.titleMain}>{product.name}</h1>
              <p className={styles.taglineMain}>{product.tagline}</p>
              
              <div className={styles.headerActions}>
                <a href={product.url} target="_blank" className={styles.headerActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  Visit Website
                </a>
                <button className={styles.headerActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                  Share
                </button>
              </div>
            </div>
          </div>
          <div className={styles.overallScoreCircle} style={{ color: scoreColor, borderColor: scoreColor }}>
            {product.revvScore}
          </div>
        </header>

        {/* Product Interface Section - FULL WIDTH BENEATH TITLE+DESC */}
        <section className={styles.interfaceSection}>
          <div className={styles.mainImageContainer}>
            {product.screenshot ? (
              <img src={product.screenshot} className={styles.mainImage} alt={product.name} />
            ) : (
              <div className={styles.imagePlaceholder}>Preview Unavailable</div>
            )}
          </div>
        </section>

        {/* Dual Image Showcase */}
        <section className={styles.showcaseSection}>
          <div className={styles.dualGrid}>
            {product.gallery?.slice(0, 2).map((img, i) => (
              <div key={i} className={styles.showcaseItem}>
                <img src={img} alt={`${product.name} showcase ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <div className={styles.infoSection} id="overview">
          <div className={styles.infoLeft}>
            <p className={styles.mainSummary}>
              {product.longDescription}
            </p>
            
            <div className={styles.techSection}>
              <h3 className={styles.sectionTitle}>Tech Stack & Tags</h3>
              <div className={styles.tagsWrapper}>
                {product.tags?.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.infoRight}>
            <div className={styles.metaGroup}>
              <h4 className={styles.metaGroupTitle}>Details</h4>
              <div className={styles.metaListItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>{product.reviewsTotal} verified audits</span>
              </div>
              <div className={styles.metaListItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2H2v10h10V2z"/><path d="m17 15 3-3 3 3"/><path d="m17 21 3-3 3 3"/><path d="M2 12h20"/><path d="M7 2v10"/><path d="M12 2v10"/><path d="M17 2v10"/><path d="M2 17h10"/><path d="M2 21h10"/></svg>
                <span>{product.category}</span>
              </div>
            </div>

            <div className={styles.metaGroup}>
              <h4 className={styles.metaGroupTitle}>Socials</h4>
              {product.socials?.twitter && (
                <a href={`https://twitter.com/${product.socials.twitter}`} target="_blank" className={styles.metaListItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                  <span>Twitter</span>
                </a>
              )}
              {product.socials?.github && (
                <a href={`https://github.com/${product.socials.github}`} target="_blank" className={styles.metaListItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  <span>Github</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* UX Truth Section - BIG FULL WIDTH VERTICAL */}
        <section className={`${styles.uxTruthSection} ${styles.whiteCard}`} id="stats">
          <div className={styles.truthList}>
            {(["usability", "performance", "value", "trust"] as const).map((key) => (
              <div key={key} className={styles.truthRowNew}>
                <div className={styles.truthHeaderRow}>
                  <span className={styles.truthLabelNew}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className={styles.truthScoreNew}>{product.metrics[key].toFixed(1)}</span>
                </div>
                <div className={styles.truthRowBar}>
                  <div
                    className={styles.truthRowFill}
                    style={{
                      width: `${product.metrics[key] * 10}%`,
                      background: getMetricColor(product.metrics[key])
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Verified Audit History Table */}
        <section className={`${styles.auditSection} ${styles.whiteCard}`} id="audits">
          <div className={styles.auditPromo}>
            <p className={styles.promoText}>
              Have your say, if you used <strong>{product.name}</strong> make your audit here!
            </p>
            <Link href={`/audit/${product.id}`} style={{ textDecoration: 'none' }}>
              <button className={styles.promoButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                Start deep audits
              </button>
            </Link>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.auditTable}>
              <thead>
                <tr>
                  <th>Auditor</th>
                  <th>Usability</th>
                  <th>Performance</th>
                  <th>Value</th>
                  <th>Trust</th>
                  <th style={{ textAlign: 'right' }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {productAudits.map((review) => {
                  const reviewer = users.find(u => u.id === review.auditorId) || users[0];
                  const avgScore = Math.round(((review.metrics.usability + review.metrics.performance + review.metrics.value + review.metrics.trust) / 4) * 10);

                  return (
                    <tr key={review.id} onClick={() => handleOpenAudit(review.id)} className={styles.clickableRow}>
                      <td>
                        <div className={styles.reviewerInfo}>
                          <div className={styles.avatarCircle}><span>{getInitials(reviewer.name)}</span></div>
                          <div>
                            <div className={styles.reviewerNameMini}>{reviewer.name}</div>
                            <div className={styles.reviewerRole}>{reviewer.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableMetric}>
                          <span className={styles.tableMetricValue}>{review.metrics.usability.toFixed(1)}</span>
                          <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.usability * 10}%`, background: getMetricColor(review.metrics.usability) }} /></div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableMetric}>
                          <span className={styles.tableMetricValue}>{review.metrics.performance.toFixed(1)}</span>
                          <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.performance * 10}%`, background: getMetricColor(review.metrics.performance) }} /></div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableMetric}>
                          <span className={styles.tableMetricValue}>{review.metrics.value.toFixed(1)}</span>
                          <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.value * 10}%`, background: getMetricColor(review.metrics.value) }} /></div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableMetric}>
                          <span className={styles.tableMetricValue}>{review.metrics.trust.toFixed(1)}</span>
                          <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.trust * 10}%`, background: getMetricColor(review.metrics.trust) }} /></div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={styles.scoreBadge} style={{ background: getScoreColor(avgScore) + "15", color: getScoreColor(avgScore), fontSize: 16 }}>
                          {(avgScore / 10).toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <section className={styles.similarSection}>
        <div className={styles.similarInner}>
          <h3 className={styles.auditTitle} style={{ fontSize: 32, marginBottom: 40 }}>Similar Products</h3>
          <div className={styles.similarGrid}>
            {similarProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tabs FAB Menu */}
      <nav className={styles.tabsFab}>
        <div className={styles.fabLogo}>
          <img src="/logo.png" alt="" style={{ width: 22, height: 22, display: 'block' }} />
        </div>
        {["Overview", "Audits", "Stats"].map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
          >
            {tab}
          </button>
        ))}
        <a href={product.url} target="_blank" className={styles.visitLink}>
          Visit Website
        </a>
      </nav>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Deep Audit Deep Dive">
        {selectedAuditId && <AuditReport auditId={selectedAuditId} />}
      </Drawer>
    </div>
  );
}
