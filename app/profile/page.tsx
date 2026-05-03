"use client";
import Link from "next/link";
import { users, audits, products, getInitials, getScoreColor } from "../lib/data";
import styles from "./page.module.css";

export default function ProfilePage() {
  const user = users[0];
  const userAudits = audits.filter((a) => a.auditorId === user.id);

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>revvview</Link>
          <span className={styles.navLabel}>Profile</span>
          <div className={styles.avatar}><span>{getInitials(user.name)}</span></div>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Profile header */}
        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>
            <span>{getInitials(user.name)}</span>
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{user.name}</h1>
            <p className={styles.profileRole}>{user.role}</p>
            <div className={styles.badges}>
              {user.badges.map((b) => (
                <span key={b} className="pill">{b}</span>
              ))}
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{user.reputation.toLocaleString()}</span>
              <span className={styles.statLabel}>Reputation XP</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{user.auditsCount}</span>
              <span className={styles.statLabel}>Audits</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>#1</span>
              <span className={styles.statLabel}>Rank</span>
            </div>
          </div>
        </div>

        {/* Audit history */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Audit History</h2>
          <div className={styles.auditList}>
            {userAudits.map((audit) => {
              const product = products.find((p) => p.id === audit.productId)!;
              const score = Math.round(
                ((audit.metrics.usability + audit.metrics.performance + audit.metrics.value + audit.metrics.trust) / 40) * 100
              );
              return (
                <div key={audit.id} className={styles.auditItem}>
                  <div className={styles.auditLeft}>
                    <div className={styles.auditLogo}>{getInitials(product.name)}</div>
                    <div>
                      <div className={styles.auditProduct}>{product.name}</div>
                      <div className={styles.auditDate}>{audit.createdAt} · {Math.round(audit.timeSpent / 60)} min</div>
                    </div>
                  </div>
                  <div className={styles.auditRight}>
                    <span className={styles.auditScore} style={{ color: getScoreColor(score) }}>{score}</span>
                    <span className={styles.auditVerdict}>{audit.wouldUse ? "✓ Would use" : "✗ Would not"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
