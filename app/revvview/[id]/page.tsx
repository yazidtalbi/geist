"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import SubmitModal from "../../components/SubmitModal";
import { products, getScoreColor } from "../../lib/data";
import styles from "./page.module.css";

export default function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) || products[0];
  const [engagedPoints, setEngagedPoints] = useState<string[]>([""]);
  const [confusedPoints, setConfusedPoints] = useState<string[]>([""]);
  const [suggestions, setSuggestions] = useState<string[]>([""]);
  const [usability, setUsability] = useState(7);
  const [performance, setPerformance] = useState(7);
  const [value, setValue] = useState(7);
  const [trust, setTrust] = useState(7);
  const [timeSpent, setTimeSpent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeSpent((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleAddPoint = (type: "engaged" | "confused" | "suggestions") => {
    if (type === "engaged") setEngagedPoints([...engagedPoints, ""]);
    else if (type === "confused") setConfusedPoints([...confusedPoints, ""]);
    else setSuggestions([...suggestions, ""]);
  };

  const handleUpdatePoint = (type: "engaged" | "confused" | "suggestions", index: number, val: string) => {
    if (type === "engaged") {
      const newPoints = [...engagedPoints];
      newPoints[index] = val;
      setEngagedPoints(newPoints);
    } else if (type === "confused") {
      const newPoints = [...confusedPoints];
      newPoints[index] = val;
      setConfusedPoints(newPoints);
    } else {
      const newPoints = [...suggestions];
      newPoints[index] = val;
      setSuggestions(newPoints);
    }
  };

  const liveScore = Math.round(((usability + performance + value + trust) / 40) * 100);
  const scoreColor = getScoreColor(liveScore);

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <Navbar onSubmitOpen={() => setSubmitOpen(true)} />
        <div className={styles.successContainer}>
          <div className={styles.checkCircleLarge}>✓</div>
          <h1 className={styles.successTitle}>Audit Published</h1>
          <p className={styles.successDesc}>
            Your exhaustive UX evaluation for <strong>{product.name}</strong> has been successfully recorded. 
            The product dossier has been updated with your strategic insights.
          </p>
          <div className={styles.successActions}>
            <Link href={`/product/${product.id}`} className="btn-primary">View Product Dossier</Link>
            <Link href="/" className="btn-secondary">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar onSubmitOpen={() => setSubmitOpen(true)} />
      
      <div className={styles.topNav}>
        <div className={styles.topNavInner}>
          <div className={styles.topNavLeft}>
            <Link href={`/product/${product.id}`} className={styles.backLinkTool} aria-label="Exit Audit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
          </div>
          
          <div className={styles.topNavCenter}>
            <div className={styles.toolTimer}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formatTime(timeSpent)}
            </div>
          </div>

          <div className={styles.topNavRight}>
            <button className={styles.navActionBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share
            </button>
            <button className={styles.navActionBtn} onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1 className={styles.pageTitle}>Perform Audit</h1>
            <p className={styles.pageSubtitle}>Reviewing {product.name} — {product.tagline}</p>
          </div>
          <div className={styles.headerScore}>
            <div className={styles.scoreCircle} style={{ color: scoreColor, borderColor: scoreColor }}>
              {liveScore}
            </div>
            <label>Live RevvScore</label>
          </div>
        </header>

        <section className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>First Impression</h2>
            <p className={styles.sectionHint}>Summarize the initial impact and immediate UX feelings.</p>
          </div>
          <div className={styles.pointsGrid}>
            {engagedPoints.map((p, i) => (
              <input
                key={i}
                className={styles.auditInput}
                value={p}
                onChange={(e) => handleUpdatePoint("engaged", i, e.target.value)}
                placeholder="e.g. Navigation is surprisingly fluid..."
              />
            ))}
          </div>
          <button className={styles.addBtn} onClick={() => handleAddPoint("engaged")}>+ Add highlight</button>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Technical Observations</h2>
            <p className={styles.sectionHint}>Identify specific friction points or confusing interactions.</p>
          </div>
          <div className={styles.pointsGrid}>
            {confusedPoints.map((p, i) => (
              <input
                key={i}
                className={styles.auditInput}
                value={p}
                onChange={(e) => handleUpdatePoint("confused", i, e.target.value)}
                placeholder="e.g. Search results are often irrelevant..."
              />
            ))}
          </div>
          <button className={styles.addBtn} onClick={() => handleAddPoint("confused")}>+ Add friction point</button>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Expert Ratings</h2>
            <p className={styles.sectionHint}>Provide quantitative scores across key product metrics.</p>
          </div>
          <div className={styles.metricsContainer}>
            {[
              { label: "Usability", val: usability, set: setUsability },
              { label: "Performance", val: performance, set: setPerformance },
              { label: "Value", val: value, set: setValue },
              { label: "Trust", val: trust, set: setTrust },
            ].map((m) => (
              <div key={m.label} className={styles.metricRow}>
                <span className={styles.metricLabel}>{m.label}</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={m.val}
                  onChange={(e) => m.set(Number(e.target.value))}
                  className={styles.rangeInput}
                />
                <span className={styles.metricVal}>{m.val}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Strategic Roadmap</h2>
            <p className={styles.sectionHint}>Define the top prioritized fixes to improve product truth.</p>
          </div>
          <div className={styles.pointsGrid}>
            {suggestions.map((p, i) => (
              <input
                key={i}
                className={styles.auditInput}
                value={p}
                onChange={(e) => handleUpdatePoint("suggestions", i, e.target.value)}
                placeholder="e.g. Implement global hotkey for search..."
              />
            ))}
          </div>
          <button className={styles.addBtn} onClick={() => handleAddPoint("suggestions")}>+ Add remediation</button>
        </section>

        <div className={styles.submitWrapper}>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Publish Full Evaluation
          </button>
          <p className={styles.submitNotice}>By publishing, your audit will be integrated into the global dossier for {product.name}.</p>
        </div>
      </main>

      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
