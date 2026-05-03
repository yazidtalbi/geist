"use client";
import { users, getInitials } from "../lib/data";
import styles from "./TopAuditors.module.css";

export default function TopAuditors() {
  const top = [...users].sort((a, b) => b.reputation - a.reputation).slice(0, 5);
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Top Auditors This Week
      </div>
      <div className={styles.list}>
        {top.map((u, i) => (
          <div key={u.id} className={styles.row}>
            <span className={styles.rank}>#{i + 1}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
