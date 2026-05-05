"use client";
import Link from "next/link";
import { users, getInitials } from "../lib/data";
import styles from "./Toprevvviewers.module.css";

export default function Toprevvviewers() {
  const top = [...users].sort((a, b) => b.reputation - a.reputation).slice(0, 5);
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        Top revvviewers This Week
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div className={styles.list}>
        {top.map((u, i) => (
          <Link key={u.id} href={`/profile/${u.id}`} className={styles.row}>
            <span className={styles.rank}>
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
            </span>
            <div className={styles.avatar}>
              <span>{getInitials(u.name)}</span>
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
        ))}
      </div>
    </div>
  );
}
