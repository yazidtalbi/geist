"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { products, getScoreColor } from "../../lib/data";
import styles from "./page.module.css";

export default function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) || products[0];
  const [step, setStep] = useState(1);
  const [engagedPoints, setEngagedPoints] = useState<string[]>([""]);
  const [confusedPoints, setConfusedPoints] = useState<string[]>([""]);
  const [wouldUse, setWouldUse] = useState<boolean | null>(null);
  const [usability, setUsability] = useState(7);
  const [performance, setPerformance] = useState(7);
  const [value, setValue] = useState(7);
  const [trust, setTrust] = useState(7);
  const [timeSpent, setTimeSpent] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeSpent((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleAddPoint = (type: "engaged" | "confused") => {
    if (type === "engaged") setEngagedPoints([...engagedPoints, ""]);
    else setConfusedPoints([...confusedPoints, ""]);
  };

  const handleUpdatePoint = (type: "engaged" | "confused", index: number, val: string) => {
    if (type === "engaged") {
      const newPoints = [...engagedPoints];
      newPoints[index] = val;
      setEngagedPoints(newPoints);
    } else {
      const newPoints = [...confusedPoints];
      newPoints[index] = val;
      setConfusedPoints(newPoints);
    }
  };

  const liveScore = Math.round(((usability + performance + value + trust) / 40) * 100);
  const scoreColor = getScoreColor(liveScore);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className={styles.layout}>
      {/* Left: Product browser viewport */}
      <div className={styles.left}>
        <div className={styles.browserBar}>
          <div className={styles.dots}>
            <span /><span /><span />
          </div>
          <div className={styles.urlBar}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            {product.url}
          </div>
          <a href={product.url} target="_blank" rel="noopener" className={styles.externalLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
        <iframe src={product.url} className={styles.iframe} title={product.name} sandbox="allow-scripts allow-same-origin" />
      </div>

      {/* Right: Audit Panel */}
      <div className={styles.right}>
        <div className={styles.panelHeader}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </Link>
          <div className={styles.timer}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {formatTime(timeSpent)}
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.productTagline}>{product.tagline}</div>
        </div>

        {!submitted ? (
          <div className={styles.auditForm}>
            {/* Step indicator */}
            <div className={styles.stepIndicator}>Step {step} of 3</div>

            {step >= 1 && (
              <div className={styles.section}>
                <label className={styles.promptLabel}>What kept you engaged? (Highlights)</label>
                <div className={styles.pointsList}>
                  {engagedPoints.map((p, i) => (
                    <input
                      key={i}
                      className={styles.pointInput}
                      placeholder="e.g. Fast search, intuitive nav..."
                      value={p}
                      onChange={(e) => handleUpdatePoint("engaged", i, e.target.value)}
                    />
                  ))}
                </div>
                <button className={styles.addPointBtn} onClick={() => handleAddPoint("engaged")}>+ Add highlight</button>
              </div>
            )}

            {step >= 1 && (
              <div className={styles.section}>
                <label className={styles.promptLabel}>What confused you? (Friction points)</label>
                <div className={styles.pointsList}>
                  {confusedPoints.map((p, i) => (
                    <input
                      key={i}
                      className={styles.pointInput}
                      placeholder="e.g. Broken link in footer, slow loading..."
                      value={p}
                      onChange={(e) => handleUpdatePoint("confused", i, e.target.value)}
                    />
                  ))}
                </div>
                <button className={styles.addPointBtn} onClick={() => handleAddPoint("confused")}>+ Add friction point</button>
              </div>
            )}

            {step >= 1 && (
              <div className={styles.section}>
                <label className={styles.promptLabel}>Would you use this product tomorrow?</label>
                <div className={styles.binaryToggle}>
                  <button
                    className={`${styles.toggleBtn} ${wouldUse === true ? styles.toggleActive : ""}`}
                    onClick={() => { setWouldUse(true); if (step < 2) setStep(2); }}
                  >
                    YES
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${wouldUse === false ? styles.toggleActiveNo : ""}`}
                    onClick={() => { setWouldUse(false); if (step < 2) setStep(2); }}
                  >
                    NO
                  </button>
                </div>
              </div>
            )}

            {step >= 2 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Rate Metrics</div>
                {[
                  { label: "Usability", val: usability, set: setUsability },
                  { label: "Performance", val: performance, set: setPerformance },
                  { label: "Value", val: value, set: setValue },
                  { label: "Trust", val: trust, set: setTrust },
                ].map((m) => (
                  <div key={m.label} className={styles.sliderRow}>
                    <span className={styles.sliderLabel}>{m.label}</span>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      value={m.val}
                      onChange={(e) => { m.set(Number(e.target.value)); if (step < 3) setStep(3); }}
                    />
                    <span className={styles.sliderVal}>{m.val}</span>
                  </div>
                ))}

                <div className={styles.liveScore}>
                  <span style={{ color: scoreColor, fontSize: 32, fontWeight: 700 }}>{liveScore}</span>
                  <span className={styles.liveScoreLabel}>Live RevvScore</span>
                </div>
              </div>
            )}

            {step >= 3 && (
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleSubmit}>
                Submit Deep Audit
              </button>
            )}
          </div>
        ) : (
          <div className={styles.submitted}>
            <div className={styles.checkCircle}>✓</div>
            <p className={styles.submittedTitle}>Audit Submitted!</p>
            <p className={styles.submittedDesc}>Your evaluation has been recorded. Thank you for contributing to UX truth.</p>
            <Link href="/">
              <button className="btn-secondary" style={{ marginTop: 16 }}>Back to Feed</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
