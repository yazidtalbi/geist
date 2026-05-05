"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import SubmitModal from "../../../components/SubmitModal";
import { products, users, revvvviews, getInitials, getScoreColor, getMetricColor } from "../../../lib/data";
import styles from "./page.module.css";

export default function DeepDiveReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const revvview = revvvviews.find((a) => a.id === id) || revvvviews[0];
  const product = products.find((p) => p.id === revvview.productId) || products[0];
  const user = users.find((u) => u.id === revvview.auditorId) || users[0];
  const avgScore = Math.round(((revvview.metrics.usability + revvview.metrics.performance + revvview.metrics.value + revvview.metrics.trust) / 4) * 10);
  const scoreColor = getScoreColor(avgScore);

  const [scrolled, setScrolled] = useState(false);
  const [clientInfo, setClientInfo] = useState({ browser: "", os: "" });
  const [submitOpen, setSubmitOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Detect Browser
    const ua = navigator.userAgent;
    let browser = "Other";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Edge")) browser = "Edge";

    // Detect OS
    let os = "Other";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    setClientInfo({ browser, os });
  }, []);

  return (
    <div className={styles.page}>
      <Navbar onSubmitOpen={() => setSubmitOpen(true)} />

      <div className={styles.topNav}>
        <div className={styles.topNavInner}>
          <div className={styles.topNavLeft}>
            <Link href={`/product/${product.id}`} className={styles.backLinkTool} aria-label="Exit Deep Dive">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
          </div>
          
          <div className={styles.topNavCenter}>
          </div>

          <div className={styles.topNavRight}>
            <button className={styles.navActionBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share
            </button>
            <button className={styles.navActionBtn} onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Export as PDF
            </button>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroFlex}>
            <div className={styles.heroTitleContent}>
              <div className={styles.heroMeta}>
                <span className={styles.versionLabel}>V{revvview.version} DOSSIER</span>
                <span className={styles.dateLabel}>{revvview.createdAt}</span>
                <span className={styles.envLabel}>{clientInfo.browser} / {clientInfo.os}</span>
              </div>
              <h1 className={styles.heroTitle}>
                Exhaustive UX Audit: <span className={styles.italic}>{product.name}</span>
              </h1>
              
              {/* Integrated Smaller Auditor Profile */}
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

            <div className={styles.heroImageWrap}>
              <img src={product.screenshot} className={styles.heroImage} alt={product.name} />
            </div>
          </div>
        </header>

        {/* First Impression Section */}
        <section className={styles.firstImpressionSection}>
          <div className={styles.firstImpressionHeader}>
            <h2 className={styles.sectionTitle}>First Impression</h2>
          </div>
          <div className={styles.firstImpressionContent}>
            <p>Upon initial landing, the product communicates an immediate sense of {revvview.metrics.usability > 8 ? "sophistication and clarity" : "ambition, though hindered by cognitive friction"}. The visual hierarchy is {revvview.metrics.performance > 8 ? "expertly handled" : "serviceable"}, but the core value proposition requires {revvview.metrics.value < 7 ? "significant structural re-alignment" : "subtle refinement"} to truly resonate with the target demographic.</p>
          </div>
        </section>

        {/* Metrics Deep Dive */}
        <section className={styles.metricsSection}>
          <div className={styles.metricsGrid}>
            {Object.entries(revvview.metrics).map(([key, val]) => (
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
                  {key === "usability" && "A comprehensive evaluation of the interface's core intuitiveness, navigational efficiency, and the cognitive load required for first-time users to achieve their primary objectives. This includes a deep dive into interaction patterns, information architecture, and the consistency of visual metaphors across the entire user journey."}
                  {key === "performance" && "A technical assessment of the system's underlying speed, responsiveness, and resilience under various network conditions. We analyze critical rendering paths, time-to-interactive (TTI), and the smoothness of micro-animations to ensure the platform feels instantaneous and reliable, minimizing friction during high-frequency tasks."}
                  {key === "value" && "An objective measurement of the core utility provided to the end-user relative to the time, effort, and financial investment required. We look beyond basic features to assess the long-term benefit, problem-solving efficacy, and the product's ability to integrate seamlessly into existing professional or personal workflows."}
                  {key === "trust" && "An evaluation of the platform's perceived security, data transparency, and overall brand reliability. This involves a thorough review of privacy disclosures, the clarity of transactional feedback, and the subtle UX cues that either build or erode user confidence during sensitive operations like data entry or financial checkout."}
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
                {revvview.engaged.map((p, i) => (
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
                {revvview.confused.map((p, i) => (
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
            <h2 className={styles.sectionTitle}>Technical Remediation Roadmap</h2>
            <p className={styles.sectionSubtitle}>Specific, actionable fixes to resolve identified friction points.</p>
          </div>
          <div className={styles.roadmapList}>
            {revvview.suggestions.map((s, i) => (
              <div key={i} className={styles.roadmapItem}>
                <div className={styles.roadmapStatus}>
                  <div className={styles.statusDot} />
                  <span>PHASE 0{i + 1}</span>
                </div>
                <div className={styles.roadmapContent}>
                  <h4 className={styles.roadmapTask}>{s}</h4>
                  <p className={styles.roadmapImpact}>Estimated Impact: High · Priority: Critical</p>
                </div>
                <div className={styles.roadmapMetric}>
                  <span>+{Math.floor(Math.random() * 15 + 5)}%</span>
                  <label>EST. CONVERSION</label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <h2 className={styles.conclusionTitle}>Final Strategic Outlook</h2>

        <footer className={styles.conclusion}>
          <p className={styles.conclusionText}>
            The product shows strong foundational promise with {revvview.metrics.performance > 8 ? "exceptional" : "competitive"} technical performance. However, the identified friction points in {revvview.confused[0]?.toLowerCase()} suggest a need for immediate UX refinement. Implementing the suggested phases will likely yield significant retention gains.
          </p>

          <div className={styles.globalRating} style={{ color: scoreColor, borderColor: scoreColor }}>
            {avgScore}
          </div>
        </footer>

        <div className={styles.pageExitActions}>
          <Link href={`/product/${product.id}`}>
            <button className="btn-primary">Return to Product Page</button>
          </Link>
        </div>
      </main>
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
