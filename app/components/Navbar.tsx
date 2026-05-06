"use client";
import { useState } from "react";
import Link from "next/link";
import { Drawer } from "./Drawer";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, type: "review", user: "Sarah Chen", action: "reviewed Linear", time: "2m ago", unread: true },
    { id: 2, type: "reputation", user: "System", action: "Reputation increased by +50", time: "1h ago", unread: true },
    { id: 3, type: "mention", user: "Marcus Webb", action: "mentioned you in Raycast audit", time: "3h ago", unread: false },
    { id: 4, type: "system", user: "System", action: "Your dossier for Vercel is trending", time: "5h ago", unread: false },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Desktop Logo */}
        <Link href="/" className={`${styles.logo} ${styles.desktopOnly}`}>
          <img src="/logo.png" alt="revvview" className={styles.logoImg} />
          <span className="logoType" style={{ paddingLeft: '4px', bottom: '1px', position: 'relative' }}>revvview</span>
        </Link>

        {/* Mobile Logo (Same as Desktop Icon) */}
        <Link href="/" className={`${styles.logoMobile} ${styles.mobileOnly}`}>
          <img src="/logo.png" alt="revvview" className={styles.logoImg} />
        </Link>

        {/* Search Bar - Center on Desktop, Right of Icon on Mobile */}
        <div className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search by Inspiration"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Desktop Actions */}
        <div className={`${styles.actions} ${styles.desktopOnly}`}>
          <Link href="/submit-product" className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Submit
          </Link>

          <button className={styles.iconBtn} aria-label="Notifications" onClick={() => setNotificationsOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className={styles.notifDot} />
          </button>

          <Link href="/profile" className={styles.avatar}>
            <span>SC</span>
          </Link>
        </div>

        <Drawer 
          open={notificationsOpen} 
          onOpenChange={setNotificationsOpen} 
          title="Activity & Notifications"
          className={styles.notifDrawer}
        >
          <div className={styles.notifList}>
            {notifications.map((n) => (
              <div key={n.id} className={`${styles.notifItem} ${n.unread ? styles.notifUnread : ""}`}>
                <div className={styles.notifAvatar}>
                  {n.user[0]}
                </div>
                <div className={styles.notifContent}>
                  <div className={styles.notifText}>
                    <strong>{n.user}</strong> {n.action}
                  </div>
                  <div className={styles.notifTime}>{n.time}</div>
                </div>
                {n.unread && <div className={styles.unreadDot} />}
              </div>
            ))}
          </div>
          <Link href="/notifications" onClick={() => setNotificationsOpen(false)}>
            <button className={styles.allNotifBtn}>View All History</button>
          </Link>
        </Drawer>

        {/* Mobile Actions (Minimal) */}
        <div className={`${styles.rightSection} ${styles.mobileOnly}`}>
          <Link href="/login" className={styles.iconBtn} aria-label="Profile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
