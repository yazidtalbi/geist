import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <div className={styles.logoColumn}>
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="revvview" className={styles.logoImg} />
            </Link>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Categories</span>
              <Link href="/">Dev Tools</Link>
              <Link href="/">Productivity</Link>
              <Link href="/">SaaS</Link>
              <Link href="/">Platforms</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>App</span>
              <Link href="/submit-product">Submit Product</Link>
              <Link href="/notifications">Notifications</Link>
              <Link href="/">Explore</Link>
              <Link href="/">Leaderboard</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Account</span>
              <Link href="/profile">Profile</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
              <Link href="/notifications">Activity</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Company</span>
              <Link href="#">About Us</Link>
              <Link href="#">Contact Us</Link>
              <Link href="#">FAQs</Link>
              <Link href="#">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomSection}>
          <div className={styles.legalLinks}>
            <Link href="#">Cookies Policy</Link>
            <Link href="#">Legal Terms</Link>
            <Link href="#">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
