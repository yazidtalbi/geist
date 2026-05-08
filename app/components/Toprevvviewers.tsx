"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getTopReviewers, getInitials } from "../lib/data";
import styles from "./Toprevvviewers.module.css";
import Skeleton from "./Skeleton";

export default function Toprevvviewers() {
  const [top, setTop] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const data = await getTopReviewers();
        setTop(data);
      } catch (err) {
        console.error("Failed to fetch top reviewers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTop();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        Top revvviewers This Week
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div className={styles.list}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton width="100%" height={60} borderRadius={8} />
            <Skeleton width="100%" height={60} borderRadius={8} />
            <Skeleton width="100%" height={60} borderRadius={8} />
          </div>
        ) : top.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>No reviewers yet.</div>
        ) : (
          top.map((u, i) => (
            <Link key={u.id} href={`/profile/${u.id}`} className={styles.row}>
              <span className={styles.rank}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
              </span>
              <div className={styles.avatar}>
                {u.avatar ? (
                  <img src={u.avatar} alt={u.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <span>{getInitials(u.name)}</span>
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{u.name}</div>
                <div className={styles.role}>{u.role}</div>
              </div>
              <div className={styles.repWrap}>
                <span className={styles.rep}>{u.reputation.toLocaleString()}</span>
                <span className={styles.repLabel}>XP</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
