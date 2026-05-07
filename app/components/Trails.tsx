"use client";
import styles from "./Trails.module.css";

export default function Trails() {
  return (
    <div className={styles.trailsContainer}>
      {/* Network Card */}
      <div className={styles.networkCard}>
        <h2 className={styles.networkTitle}>Ship better products</h2>
        <ul className={styles.networkList}>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Get direct, high-impact feedback from a community of 1,250+ reviewers
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Connect with the people behind the world&apos;s most successful startups
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Refine your product through continuous, data-backed insights
          </li>
        </ul>
        <button className={styles.signupBtn}>Join the community</button>
      </div>

      <div className={styles.trendingCard}>
        <div className={styles.trendingHeader}>
          <span>TRENDING</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
        </div>

        <div className={styles.trendingList}>
          <div className={styles.trendingItem}>
            <div className={styles.miniIcon}>L</div>
            <div className={styles.trendingInfo}>
              <div className={styles.trendingTitle}>Linear</div>
              <div className={styles.trendingSub}>Issue tracking</div>
            </div>
            <div className={styles.avatarStack}>
              <img src="https://api.dicebear.com/9.x/dylan/svg?seed=Milo" className={styles.miniAvatar} alt="User" />
              <img src="https://api.dicebear.com/9.x/dylan/svg?seed=Luna" className={styles.miniAvatar} alt="User" />
              <img src="https://api.dicebear.com/9.x/dylan/svg?seed=Oliver" className={styles.miniAvatar} alt="User" />
            </div>
          </div>
          <div className={styles.trendingItem}>
            <div className={styles.miniIcon} style={{ background: '#000', color: '#FFF' }}>▲</div>
            <div className={styles.trendingInfo}>
              <div className={styles.trendingTitle}>Vercel</div>
              <div className={styles.trendingSub}>Deployment</div>
            </div>
          </div>
          <div className={styles.trendingItem}>
            <div className={styles.miniIcon}>R</div>
            <div className={styles.trendingInfo}>
              <div className={styles.trendingTitle}>Raycast</div>
              <div className={styles.trendingSub}>Productivity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
