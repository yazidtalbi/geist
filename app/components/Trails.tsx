"use client";
import styles from "./Trails.module.css";

const trails = [
  { label: "COLLECTIONS", title: "Staff Picks" },
  { label: "PLATFORMS", title: "SaaS Utilities" },
  { label: "VERTICALS", title: "Dev Tools" },
  { label: "EXPERIENCE", title: "Newly Audited" },
];

export default function Trails() {
  return (
    <div className={styles.trails}>
      <h3 className={styles.header}>TRAILS</h3>
      <div className={styles.list}>
        {trails.map((trail, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.label}>{trail.label}</span>
            <span className={styles.title}>{trail.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
