"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar({ onSubmitOpen = () => {} }: { onSubmitOpen?: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Desktop Logo */}
        <Link href="/" className={`${styles.logo} ${styles.desktopOnly}`}>
          <img src="/logo.png" alt="revvview" className={styles.logoImg} />
          <span>revvview</span>
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
          <button className="btn-primary" onClick={onSubmitOpen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Submit a product
          </button>

          <button className={styles.iconBtn} aria-label="Notifications">
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
