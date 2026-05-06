"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
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
      <Navbar  />

      <main className={styles.main}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroFlex}>
            <div className={styles.heroTitleContent}>
              <div className={styles.heroMeta}>
                <Link href={`/product/${product.id}`} className={styles.inlineBackBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6" /></svg>
                </Link>
                <div className={styles.breadcrumb}>
                  <span className={styles.breadcrumbProduct}>{product.name}</span>
                  <span className={styles.breadcrumbSeparator}>/</span>
                  <span className={styles.breadcrumbPage}>revvview</span>
                </div>
              </div>
              <h1 className={styles.heroTitle}>
                The revvview: <span className={styles.italic}>{product.name}</span>
              </h1>

              {/* Integrated Smaller Auditor Profile */}
              <div className={styles.integratedAuditor}>
                <div className={styles.auditorAvatarSmall}>
                  <span>{getInitials(user.name)}</span>
                </div>
                <div className={styles.auditorDetailsSmall}>
                  <div className={styles.auditorNameRow}>
                    <h3 className={styles.auditorNameSmall}>{user.name}</h3>
                    <span className={styles.dotSeparator}>•</span>
                    <span className={styles.dateLabelHero}>{revvview.createdAt}</span>
                  </div>
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
            <p>{revvview.firstImpression || `Upon initial landing, the product communicates an immediate sense of ${revvview.metrics.usability > 8 ? "sophistication and clarity" : "ambition, though hindered by cognitive friction"}. The visual hierarchy is ${revvview.metrics.performance > 8 ? "expertly handled" : "serviceable"}, but the core value proposition requires ${revvview.metrics.value < 7 ? "significant structural re-alignment" : "subtle refinement"} to truly resonate with the target demographic.`}</p>
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
                  {key === "usability" && "A comprehensive evaluation of the interface's core intuitiveness, navigational efficiency, and the cognitive load required for first-time users to achieve their primary objectives. This includes a deep dive into information architecture, and the consistency of visual metaphors across the entire user journey."}
                  {key === "performance" && "A technical assessment of the system's underlying speed, responsiveness, and resilience under various network conditions. We analyze critical rendering paths, time-to-interactive (TTI), and the smoothness of micro-animations to ensure the platform feels instantaneous and reliable, minimizing friction during high-frequency tasks."}
                  {key === "value" && "An objective measurement of the core utility provided to the end-user relative to the time, effort, and financial investment required. We look beyond basic features to assess the long-term benefit, problem-solving efficacy, and the product's ability to integrate seamlessly into existing professional or personal workflows."}
                  {key === "trust" && "An evaluation of the platform's perceived security, data transparency, and overall brand reliability. This involves a thorough review of privacy disclosures, the clarity of transactional feedback, and the subtle UX cues that either build or erode user confidence during sensitive operations like data entry or financial checkout."}
                </p>
              </div>
            ))}
          </div>
        </section>



        {/* Strategic Roadmap */}
        <section className={styles.roadmapSection}>
          <div className={`${styles.sectionHeader} ${styles.noBorderHeader}`}>
            <h2 className={styles.sectionTitle}>The execution roadmap</h2>
            <p className={styles.sectionSubtitle}>Friction points and their specific strategic resolutions.</p>
          </div>
          <div className={styles.roadmapList}>
            {revvview.suggestions.map((s, i) => (
              <div key={i} className={styles.roadmapItem}>
                <div className={styles.roadmapHeader}>
                  <div className={styles.roadmapStatus}>
                    <span className={styles.phaseLabel}>PHASE 0{i + 1}</span>
                    <h4 className={styles.roadmapTask}>{s}</h4>
                  </div>
                </div>

                <div className={styles.roadmapFriction}>
                  <p className={styles.roadmapFrictionText}>
                    {revvview.confused[i] || revvview.confused[0] || "The current interface architecture presents significant cognitive load during high-density operations, specifically when users attempt to navigate multi-layered project hierarchies without adequate filtering or sorting mechanisms."}
                  </p>
                </div>

                <div className={styles.roadmapMetaTags}>
                  <span className={styles.metaTag}>Priority: Critical</span>
                  <span className={styles.metaTag}>Impact: High</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <h2 className={styles.verdictTitle}>The verdict</h2>

        <footer className={styles.verdictSection}>
          <div className={styles.verdictScore} style={{ color: scoreColor, borderColor: scoreColor }}>
            {avgScore}
          </div>
          <div className={styles.verdictContent}>
            <p className={styles.verdictText}>
              {revvview.strategicOutlook || `The product shows strong foundational promise with ${revvview.metrics.performance > 8 ? "exceptional" : "competitive"} technical performance. However, the identified friction points in ${revvview.confused[0]?.toLowerCase()} suggest a need for immediate UX refinement. Implementing the suggested phases will likely yield significant retention gains.`}
            </p>

            <div className={styles.verdictAuditor}>
              <div className={styles.auditorAvatarSmall}>
                <span>{getInitials(user.name)}</span>
              </div>
              <div className={styles.auditorDetailsSmall}>
                <div className={styles.auditorNameRow}>
                  <h3 className={styles.auditorNameSmall}>{user.name}</h3>
                </div>
                <p className={styles.auditorRoleSmall}>{user.role}</p>
              </div>
            </div>
          </div>
        </footer>

        <div className={styles.shareBottom}>
          <span className={styles.shareLabelBottom}>SHARE</span>
          <div className={styles.shareIconsRow}>
            <button className={styles.shareBtn} aria-label="Share on LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </button>
            <button className={styles.shareBtn} aria-label="Share on Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54v-2.21c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg>
            </button>
            <button className={styles.shareBtn} aria-label="Share on X">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z" /></svg>
            </button>
            <button className={styles.shareBtn} aria-label="Copy Link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </button>
          </div>
        </div>

        <div className={styles.pageExitActions}>
          <Link href={`/product/${product.id}`}>
            <button className="btn-primary">Return to Product Page</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
