"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar({ onSubmitOpen }: { onSubmitOpen: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          revvview
        </Link>

        <div className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search for products, auditors, or audits..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <div className={styles.actions}>
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

          <button className="btn-primary" onClick={onSubmitOpen}>
            + Audit a Product
          </button>
        </div>
      </div>
    </nav>
  );
}
