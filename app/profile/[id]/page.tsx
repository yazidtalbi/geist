"use client";
import { use } from "react";
import Link from "next/link";
import { users, revvvviews, products, getInitials, getScoreColor } from "../../lib/data";
import styles from "../page.module.css";

export default function DynamicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = users.find(u => u.id === id) || users[0];
  const userrevvvviews = revvvviews.filter((a) => a.auditorId === user.id);
  
  return (
    <div className={styles.page}>

      <main className={styles.main}>
        {/* Profile Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.avatarWrapper}>
              <div className={styles.profileAvatar}>
                {user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{getInitials(user.name)}</span>}
              </div>
              <div className={styles.statusDot}></div>
            </div>
            
            <div className={styles.profileHeader}>
              <div className={styles.badgeRow}>
                {user.badges.map((b) => (
                  <span key={b} className="pill">{b}</span>
                ))}
              </div>
              <div className={styles.nameRow}>
                <h1 className={styles.profileName}>{user.name}</h1>
                <Link href="/settings" className={styles.settingsBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>Edit Profile</span>
                </Link>
              </div>
              <p className={styles.profileRole}>{user.role}</p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Reputation</span>
              <span className={styles.statValue}>{user.reputation.toLocaleString()}</span>
              <span className={styles.statTrend}>+12% this month</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Total Revvvviews</span>
              <span className={styles.statValue}>{user.revvvviewsCount}</span>
              <span className={styles.statTrend}>Top 1% Auditor</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Global Rank</span>
              <span className={styles.statValue}>#1</span>
              <span className={styles.statTrend}>Elite Tier</span>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          {/* Left Column: Bio & Specialties */}
          <aside className={styles.sideContent}>
            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Bio</h3>
              <p className={styles.bioText}>
                Senior Product Researcher specializing in developer experience and blazingly fast interfaces. 
                Focusing on the intersection of brutalist design and premium utility.
              </p>
            </div>
            
            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>Specialties</h3>
              <div className={styles.tagsCloud}>
                {["DevTools", "SaaS", "UX Audit", "Performance", "Design Systems"].map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column: History */}
          <section className={styles.historySection}>
            <div className={styles.historyHeader}>
              <h2 className={styles.historyTitle}>Revvview History</h2>
              <div className={styles.historyFilter}>
                <span>Latest</span>
                <span className={styles.dot}></span>
                <span>Most Impactful</span>
              </div>
            </div>

            <div className={styles.auditList}>
              {userrevvvviews.length > 0 ? (
                userrevvvviews.map((revvview) => {
                  const product = products.find((p) => p.id === revvview.productId)!;
                  const score = Math.round(
                    ((revvview.metrics.usability + revvview.metrics.performance + revvview.metrics.value + revvview.metrics.trust) / 40) * 100
                  );
                  return (
                    <Link href={`/revvview/${revvview.id}`} key={revvview.id} className={styles.auditItem}>
                      <div className={styles.auditLogo}>
                        {product.logo ? <img src={product.logo} alt={product.name} /> : <span>{getInitials(product.name)}</span>}
                      </div>
                      <div className={styles.auditMain}>
                        <div className={styles.auditTop}>
                          <h4 className={styles.auditProductName}>{product.name}</h4>
                          <span className={styles.auditScore} style={{ color: getScoreColor(score) }}>{score}</span>
                        </div>
                        <div className={styles.auditMeta}>
                          <span>{revvview.createdAt}</span>
                          <span className={styles.dot}></span>
                          <span>{Math.round(revvview.timeSpent / 60)}m audit</span>
                          <span className={styles.dot}></span>
                          <span className={styles.auditVerdict}>
                            {revvview.wouldUse ? "✓ Approved" : "✗ Needs Work"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className={styles.emptyState}>No audits found for this user yet.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
