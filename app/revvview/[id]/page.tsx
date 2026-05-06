"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import SubmitModal from "../../components/SubmitModal";
import { products, users, getScoreColor } from "../../lib/data";
import styles from "./page.module.css";

const AWARDS = [
  { id: "elite_ux", name: "Elite UX", emoji: "🏆" },
  { id: "innovation", name: "Innovation", emoji: "✨" },
  { id: "solid_build", name: "Solid Build", emoji: "🛠️" },
  { id: "visual_excellence", name: "Visual Excellence", emoji: "🎨" },
  { id: "performance_pro", name: "Performance Pro", emoji: "🚀" },
  { id: "trustworthy", name: "Trustworthy", emoji: "🛡️" },
];

export default function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) || products[0];
  const [firstImpression, setFirstImpression] = useState("");
  const [engagedPoints, setEngagedPoints] = useState<string[]>([""]);
  const [confusedPoints, setConfusedPoints] = useState<string[]>([""]);
  const [suggestions, setSuggestions] = useState<string[]>([""]);
  const [strategicOutlook, setStrategicOutlook] = useState("");
  const [usability, setUsability] = useState(7);
  const [performance, setPerformance] = useState(7);
  const [value, setValue] = useState(7);
  const [trust, setTrust] = useState(7);
  const [usabilityDesc, setUsabilityDesc] = useState("");
  const [performanceDesc, setPerformanceDesc] = useState("");
  const [valueDesc, setValueDesc] = useState("");
  const [trustDesc, setTrustDesc] = useState("");
  const [selectedAwards, setSelectedAwards] = useState<string[]>([]);
  const [awardsExpanded, setAwardsExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

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

  const handleAwardToggle = (awardId: string) => {
    if (selectedAwards.includes(awardId)) {
      setSelectedAwards(selectedAwards.filter(a => a !== awardId));
    } else if (selectedAwards.length < 2) {
      setSelectedAwards([...selectedAwards, awardId]);
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

  const RatingSelect = ({ value, onChange }: { value: number, onChange: (v: number) => void }) => (
    <div className={styles.ratingContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <button
          key={n}
          type="button"
          className={`${styles.ratingCircle} ${value === n ? styles.ratingCircleActive : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );

  const [activeSection, setActiveSection] = useState("impression");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const MENU_ITEMS = [
    { id: "impression", label: "Impression" },
    { id: "highlights", label: "Highlights" },
    { id: "friction", label: "Friction" },
    { id: "ratings", label: "Ratings" },
    { id: "roadmap", label: "Roadmap" },
    { id: "outlook", label: "Outlook" },
    { id: "awards", label: "Awards" },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderLeft}>
          <Link href={`/product/${product.id}`} className={styles.backBtnHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
            Back
          </Link>
        </div>
        <div className={styles.topHeaderCenter}>
          <h1 className={styles.headerTitle}>Submit a revvview: {product.name}</h1>
        </div>
        <div className={styles.topHeaderRight}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className={styles.headerScoreLabel}>Live RevvScore</div>
            <div className={styles.scoreCircle} style={{ color: scoreColor, borderColor: scoreColor }}>
              {liveScore}
            </div>
          </div>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <nav className={styles.sideMenu}>
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.menuItem} ${activeSection === item.id ? styles.menuItemActive : ""}`}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.menuIndicatorWrapper}>
                <div className={`${styles.menuDot} ${activeSection === item.id ? styles.menuDotActive : ""}`} />
                <div className={styles.menuLine} />
              </div>
              <span className={styles.menuLabel}>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <section id="impression" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>First Impression</h2>
            <p className={styles.sectionHint}>Summarize the initial impact and immediate UX feelings in a single statement.</p>
          </div>
          <textarea
            className={styles.auditInput}
            value={firstImpression}
            onChange={(e) => setFirstImpression(e.target.value)}
            placeholder="e.g. Upon initial landing, the product communicates an immediate sense of sophistication..."
            rows={4}
          />
        </section>

        <section id="highlights" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Engagement Highlights</h2>
            <p className={styles.sectionHint}>Identify specific areas where the product excels at user engagement.</p>
          </div>
          <div className={styles.pointsGrid}>
            {engagedPoints.map((p, i) => (
              <textarea
                key={i}
                className={styles.auditInput}
                value={p}
                onChange={(e) => handleUpdatePoint("engaged", i, e.target.value)}
                placeholder="e.g. Navigation is surprisingly fluid..."
                rows={2}
              />
            ))}
          </div>
          <button className={styles.addBtn} onClick={() => handleAddPoint("engaged")}>+ Add highlight</button>
        </section>

        <section id="friction" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Friction Observations</h2>
            <p className={styles.sectionHint}>Identify specific friction points or confusing interactions.</p>
          </div>
          <div className={styles.pointsGrid}>
            {confusedPoints.map((p, i) => (
              <textarea
                key={i}
                className={styles.auditInput}
                value={p}
                onChange={(e) => handleUpdatePoint("confused", i, e.target.value)}
                placeholder="e.g. Search results are often irrelevant..."
                rows={2}
              />
            ))}
          </div>
          <button className={styles.addBtn} onClick={() => handleAddPoint("confused")}>+ Add friction point</button>
        </section>

        <section id="ratings" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Expert Ratings</h2>
            <p className={styles.sectionHint}>Provide quantitative scores across key product metrics.</p>
          </div>

          <div className={styles.metricsList}>
            <div className={styles.metricBlock}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Usability</span>
                <RatingSelect value={usability} onChange={setUsability} />
              </div>
              <textarea
                className={styles.auditInput}
                value={usabilityDesc}
                onChange={(e) => setUsabilityDesc(e.target.value)}
                placeholder="Technical justification for Usability score..."
                rows={2}
              />
            </div>

            <div className={styles.metricBlock}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Performance</span>
                <RatingSelect value={performance} onChange={setPerformance} />
              </div>
              <textarea
                className={styles.auditInput}
                value={performanceDesc}
                onChange={(e) => setPerformanceDesc(e.target.value)}
                placeholder="Technical justification for Performance score..."
                rows={2}
              />
            </div>

            <div className={styles.metricBlock}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Value</span>
                <RatingSelect value={value} onChange={setValue} />
              </div>
              <textarea
                className={styles.auditInput}
                value={valueDesc}
                onChange={(e) => setValueDesc(e.target.value)}
                placeholder="Technical justification for Value score..."
                rows={2}
              />
            </div>

            <div className={styles.metricBlock}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>Trust</span>
                <RatingSelect value={trust} onChange={setTrust} />
              </div>
              <textarea
                className={styles.auditInput}
                value={trustDesc}
                onChange={(e) => setTrustDesc(e.target.value)}
                placeholder="Technical justification for Trust score..."
                rows={2}
              />
            </div>
          </div>
        </section>

        <section id="roadmap" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Technical Roadmap</h2>
            <p className={styles.sectionHint}>Define the top prioritized fixes to improve product truth.</p>
          </div>
          <div className={styles.pointsGrid}>
            {suggestions.map((p, i) => (
              <textarea
                key={i}
                className={styles.auditInput}
                value={p}
                onChange={(e) => handleUpdatePoint("suggestions", i, e.target.value)}
                placeholder="e.g. Implement global hotkey for search..."
                rows={2}
              />
            ))}
          </div>
          <button className={styles.addBtn} onClick={() => handleAddPoint("suggestions")}>+ Add remediation</button>
        </section>

        <section id="outlook" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Strategic Outlook</h2>
            <p className={styles.sectionHint}>Final expert conclusion on the product's future trajectory.</p>
          </div>
          <textarea
            className={styles.auditInput}
            value={strategicOutlook}
            onChange={(e) => setStrategicOutlook(e.target.value)}
            placeholder="e.g. The product shows strong foundational promise, but needs immediate refinement..."
            rows={4}
          />
        </section>

        <section id="awards" className={styles.formSection}>
          <div 
            className={styles.collapsibleHeader} 
            onClick={() => setAwardsExpanded(!awardsExpanded)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.sectionHeader} style={{ marginBottom: 0 }}>
              <h2 className={styles.sectionTitle}>Awards Selection</h2>
              <p className={styles.sectionHint}>Select up to two awards for this product.</p>
            </div>
            <div className={`${styles.chevron} ${awardsExpanded ? styles.chevronRotated : ""}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
            </div>
          </div>
          
          {awardsExpanded && (
            <div className={styles.collapsibleContent}>
              <p className={styles.internalNote}>
                <strong>Note:</strong> Selected awards are for editorial classification only and will not be displayed on the public review page.
              </p>
              <div className={styles.awardsGrid}>
                {AWARDS.map((award) => (
                  <div
                    key={award.id}
                    className={`${styles.awardCard} ${selectedAwards.includes(award.id) ? styles.awardCardActive : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAwardToggle(award.id);
                    }}
                  >
                    <span className={styles.awardEmoji}>{award.emoji}</span>
                    <span className={styles.awardName}>{award.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className={styles.submitWrapper}>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Publish
          </button>
          <p className={styles.submitNotice}>By publishing, your audit will be integrated into the global dossier for {product.name}.</p>
        </div>
      </main>


      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}

