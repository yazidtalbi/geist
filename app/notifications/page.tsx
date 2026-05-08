"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function NotificationsPage() {
  
  const notifications = [
    { id: 1, type: "review", user: "Sarah Chen", action: "reviewed Linear", time: "2m ago", unread: true, detail: "Sarah provided an exhaustive v2.4.0 dossier for Linear, focusing on the new roadmap features." },
    { id: 2, type: "reputation", user: "System", action: "Reputation increased by +50", time: "1h ago", unread: true, detail: "Your audit of Raycast was marked as 'Helpful' by 12 users." },
    { id: 3, type: "mention", user: "Marcus Webb", action: "mentioned you in Raycast audit", time: "3h ago", unread: false, detail: "I think SC's point about the clipboard history is spot on." },
    { id: 4, type: "system", user: "System", action: "Your dossier for Vercel is trending", time: "5h ago", unread: false, detail: "Your Vercel evaluation has reached 1,000+ views in the last 24 hours." },
    { id: 5, type: "review", user: "Alex Rivera", action: "reviewed Cal.com", time: "1d ago", unread: false, detail: "Alex highlighted the open-source scheduling benefits." },
    { id: 6, type: "system", user: "System", action: "Weekly Roundup: You are in the top 5% of auditors", time: "2d ago", unread: false, detail: "Consistency pays off. You've published 4 dossiers this week." },
  ];

  return (
    <div className={styles.page}>
      
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Notification History</h1>
          <p className={styles.subtitle}>Track your interactions, reputation gains, and platform activity.</p>
        </header>

        <div className={styles.notifList}>
          {notifications.map((n) => (
            <div key={n.id} className={`${styles.notifItem} ${n.unread ? styles.notifUnread : ""}`}>
              <div className={styles.notifHeader}>
                <div className={styles.notifAvatar}>
                  {n.user[0]}
                </div>
                <div className={styles.notifMeta}>
                  <div className={styles.notifText}>
                    <strong>{n.user}</strong> {n.action}
                  </div>
                  <div className={styles.notifTime}>{n.time}</div>
                </div>
                {n.unread && <div className={styles.unreadDot} />}
              </div>
              <div className={styles.notifDetail}>
                {n.detail}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
