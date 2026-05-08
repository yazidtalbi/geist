"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { createClient } from "../lib/supabase-browser";
import { getNotifications, type Notification, getInitials } from "../lib/data";
import { formatTimeAgo } from "../lib/utils";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadNotifications() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const data = await getNotifications(session.user.id);
        setNotifications(data);
      }
      setLoading(false);
    }
    loadNotifications();
  }, [supabase]);

  if (loading) {
    return <div className={styles.loading}>Loading history...</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Notification History</h1>
          <p className={styles.subtitle}>Track your interactions, reputation gains, and platform activity.</p>
        </header>

        <div className={styles.notifList}>
          {notifications.length > 0 ? (
            notifications.map((n) => {
              const content = (
                <>
                  <div className={styles.notifHeader}>
                    <div className={styles.notifAvatar}>
                      {n.actor?.avatar ? (
                        <img src={n.actor.avatar} alt={n.actor.name} />
                      ) : (
                        <span>{getInitials(n.actor?.name || "System")}</span>
                      )}
                    </div>
                    <div className={styles.notifMeta}>
                      <div className={styles.notifText}>
                        <strong>{n.actor?.name || "System"}</strong> {n.actionText}
                      </div>
                      <div className={styles.notifTime}>{formatTimeAgo(n.createdAt)}</div>
                    </div>
                    {!n.isRead && <div className={styles.unreadDot} />}
                  </div>
                  {n.type === 'review' && (
                    <div className={styles.notifDetail}>
                      New feedback has been posted on your product dossier. View the full report in your profile.
                    </div>
                  )}
                </>
              );

              const linkHref = n.deepDiveUrl || (n.entitySlug ? `/product/${n.entitySlug}` : null);

              if (linkHref) {
                return (
                  <Link 
                    key={n.id} 
                    href={linkHref}
                    className={`${styles.notifItem} ${!n.isRead ? styles.notifUnread : ""}`}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={n.id} className={`${styles.notifItem} ${!n.isRead ? styles.notifUnread : ""}`}>
                  {content}
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <p>No activity recorded yet.</p>
              <Link href="/" className="btn-primary" style={{ marginTop: '20px' }}>Explore Products</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
