"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

const Footer = () => {
  const pathname = usePathname();

  // Hide footer on specific paths
  const hiddenPaths = ["/revvview", "/submit-product", "/signup", "/login"];
  const isHidden = hiddenPaths.some(path => pathname.startsWith(path));

  if (isHidden) return null;

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
              <Link href="/leaderboard">Leaderboard</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Company</span>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomSection}>
          <div className={styles.legalLinks}>
            <Link href="/cookies">Cookies Policy</Link>
            <Link href="/privacy">Legal Terms</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
