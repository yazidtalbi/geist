"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { users, revvvviews, products, getInitials, getScoreColor } from "../lib/data";
import styles from "./page.module.css";

export default function ProfilePage() {
  const user = users[0];
  const userrevvvviews = revvvviews.filter((a) => a.auditorId === user.id);
  return (
    <div className={styles.page}>
      <Navbar />

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
              <span className={styles.statValue}>{user.revvvviewsCount}</span>
              <span className={styles.statLabel}>Revvvviews</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>#1</span>
              <span className={styles.statLabel}>Rank</span>
            </div>
          </div>
        </div>

        {/* Revvview history */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Revvview History</h2>
          <div className={styles.auditList}>
            {userrevvvviews.map((revvview) => {
              const product = products.find((p) => p.id === revvview.productId)!;
              const score = Math.round(
                ((revvview.metrics.usability + revvview.metrics.performance + revvview.metrics.value + revvview.metrics.trust) / 40) * 100
              );
              return (
                <div key={revvview.id} className={styles.auditItem}>
                  <div className={styles.auditLeft}>
                    <div className={styles.auditLogo}>{getInitials(product.name)}</div>
                    <div>
                      <div className={styles.auditProduct}>{product.name}</div>
                      <div className={styles.auditDate}>{revvview.createdAt} · {Math.round(revvview.timeSpent / 60)} min</div>
                    </div>
                  </div>
                  <div className={styles.auditRight}>
                    <span className={styles.auditScore} style={{ color: getScoreColor(score) }}>{score}</span>
                    <span className={styles.auditVerdict}>{revvview.wouldUse ? "✓ Would use" : "✗ Would not"}</span>
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
