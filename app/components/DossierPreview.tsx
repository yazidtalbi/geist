"use client";
import Link from "next/link";
import { getInitials, getScoreColor, getMetricColor } from "../lib/data";
import styles from "../revvview/[id]/page.module.css";

interface DossierPreviewProps {
  product: any;
  user: any;
  data: {
    engaged: string[];
    confused: string[];
    suggestions: string[];
    metrics: {
      usability: number;
      performance: number;
      value: number;
      trust: number;
    };
    usabilityDesc?: string;
    performanceDesc?: string;
    valueDesc?: string;
    trustDesc?: string;
    firstImpression?: string;
    strategicOutlook?: string;
  };
}

export default function DossierPreview({ product, user, data }: DossierPreviewProps) {
  const avgScore = Math.round(((data.metrics.usability + data.metrics.performance + data.metrics.value + data.metrics.trust) / 4) * 10);
  const scoreColor = getScoreColor(avgScore);

  return (
    <div className={styles.page} style={{ background: '#FFF' }}>
      <main className={styles.main} style={{ paddingTop: 0 }}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroFlex}>
            <div className={styles.heroTitleContent}>
              <div className={styles.heroMeta}>
                <span className={styles.versionLabel}>LIVE PREVIEW</span>
                <span className={styles.dateLabel}>DRAFT DOSSIER</span>
              </div>
              <h1 className={styles.heroTitle}>
                Exhaustive UX Audit: <span className={styles.italic}>{product.name}</span>
              </h1>

              <div className={styles.integratedAuditor}>
                <div className={styles.auditorAvatarSmall}>
                  <span>{getInitials(user.name)}</span>
                </div>
                <div className={styles.auditorDetailsSmall}>
                  <h3 className={styles.auditorNameSmall}>{user.name}</h3>
                  <p className={styles.auditorRoleSmall}>{user.role}</p>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* First Impression Section */}
        <section className={styles.firstImpressionSection}>
          <div className={styles.firstImpressionHeader}>
            <h2 className={styles.sectionTitle}>First Impression</h2>
          </div>
          <div className={styles.firstImpressionContent}>
            <p>{data.firstImpression || "No first impression provided yet..."}</p>
          </div>
        </section>

        {/* Metrics Deep Dive */}
        <section className={styles.metricsSection}>
          <div className={styles.metricsGrid}>
            {Object.entries(data.metrics).map(([key, val]) => (
              <div key={key} className={styles.metricCard}>
                <div className={styles.metricCardHeader}>
                  <span className={styles.metricKey}>{key}</span>
                  <span className={styles.metricVal}>{val.toFixed(1)}</span>
                </div>
                <div className={styles.metricBarTrack}>
                  <div
                    className={styles.metricBarFill}
                    style={{ width: `${(val as number) * 10}%`, background: getMetricColor(val as number) }}
                  />
                </div>
                <p className={styles.metricDesc}>
                  {key === "usability" && (data.usabilityDesc || "No justification provided...")}
                  {key === "performance" && (data.performanceDesc || "No justification provided...")}
                  {key === "value" && (data.valueDesc || "No justification provided...")}
                  {key === "trust" && (data.trustDesc || "No justification provided...")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Observations Grid */}
        <section className={styles.observationsSection}>
          <div className={styles.obsGrid}>
            <div className={styles.obsColumn}>
              <div className={styles.obsHeader}>
                <div className={styles.obsIcon} style={{ background: "var(--green)" }}>✓</div>
                <h3 className={styles.obsTitle}>Engagement Highlights</h3>
              </div>
              <div className={styles.obsList}>
                {data.engaged.filter(p => p).map((p, i) => (
                  <div key={i} className={styles.obsItem}>
                    <span className={styles.obsIndex}>0{i + 1}</span>
                    <p className={styles.obsText}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.obsColumn}>
              <div className={styles.obsHeader}>
                <div className={styles.obsIcon} style={{ background: "var(--red)" }}>×</div>
                <h3 className={styles.obsTitle}>Friction Observations</h3>
              </div>
              <div className={styles.obsList}>
                {data.confused.filter(p => p).map((p, i) => (
                  <div key={i} className={styles.obsItem}>
                    <span className={styles.obsIndex}>0{i + 1}</span>
                    <p className={styles.obsText}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Roadmap */}
        <section className={styles.roadmapSection}>
          <div className={`${styles.sectionHeader} ${styles.noBorderHeader}`}>
            <h2 className={styles.sectionTitle}>Core Adjustments</h2>
            <p className={styles.sectionSubtitle}>Specific, actionable fixes to resolve identified friction points.</p>
          </div>
          <div className={styles.roadmapList}>
            {data.suggestions.filter(s => s).map((s, i) => (
              <div key={i} className={styles.roadmapItem}>
                <div className={styles.roadmapStatus}>
                  <div className={styles.statusDot} />
                  <span>PHASE 0{i + 1}</span>
                </div>
                <div className={styles.roadmapContent}>
                  <h4 className={styles.roadmapTask}>{s}</h4>
                  <p className={styles.roadmapImpact}>Estimated Impact: High · Priority: Critical</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <h2 className={styles.conclusionTitle}>The verdict</h2>
        <footer className={styles.conclusion}>
          <div className={styles.conclusionContent}>
            <p className={styles.conclusionText}>
              {data.strategicOutlook || "The product shows strong foundational promise. Implementing the suggested phases will likely yield significant retention gains."}
            </p>
            <div className={styles.integratedAuditor}>
              <div className={styles.auditorAvatarSmall}>
                <span>{getInitials(user.name)}</span>
              </div>
              <div className={styles.auditorDetailsSmall}>
                <h3 className={styles.auditorNameSmall}>{user.name}</h3>
                <p className={styles.auditorRoleSmall}>{user.role}</p>
              </div>
            </div>
          </div>
          <div className={styles.globalRating} style={{ color: scoreColor, borderColor: scoreColor }}>
            {avgScore}
          </div>
        </footer>
      </main>
    </div>
  );
}
