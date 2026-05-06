"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { products, users, getScoreColor } from "../../lib/data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select";
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
  const [roadmapItems, setRoadmapItems] = useState<{ friction: string, resolution: string, priority: string, impact: string }[]>([
    { friction: "", resolution: "", priority: "Critical", impact: "High" }
  ]);
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

  const handleAddRoadmapItem = () => {
    setRoadmapItems([...roadmapItems, { friction: "", resolution: "", priority: "Medium", impact: "Medium" }]);
  };

  const handleUpdateRoadmapItem = (index: number, field: "friction" | "resolution" | "priority" | "impact", val: string) => {
    const newItems = [...roadmapItems];
    newItems[index][field] = val;
    setRoadmapItems(newItems);
  };

  const handleRemoveRoadmapItem = (index: number) => {
    if (roadmapItems.length > 1) {
      const newItems = roadmapItems.filter((_, i) => i !== index);
      setRoadmapItems(newItems);
    } else {
      // Just clear the first one if it's the only one
      setRoadmapItems([{ friction: "", resolution: "", priority: "Critical", impact: "High" }]);
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

  const isFormValid = 
    firstImpression.trim().length > 0 &&
    usabilityDesc.trim().length > 0 &&
    performanceDesc.trim().length > 0 &&
    valueDesc.trim().length > 0 &&
    trustDesc.trim().length > 0 &&
    strategicOutlook.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("Please complete all required editorial sections before publishing.");
      return;
    }
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
    { id: "ratings", label: "Metrics" },
    { id: "roadmap", label: "Roadmap" },
    { id: "outlook", label: "The Verdict" },
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
          {/* Title moved to main flow */}
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

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.sidebarLogo}>
            <img src="/logo.png" alt="revvview" className={styles.logoImgSmall} />
          </Link>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <div className={styles.contextLabel}>You are reviewing</div>
          <div className={styles.productContext}>
            <div className={styles.productIcon}>
              <span>{product.name[0]}</span>
            </div>
            <div className={styles.productMeta}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productTagline}>{product.tagline || "Streamline issues, sprints, and product roadmaps."}</p>
            </div>
          </div>
          <h1 className={styles.mainTitle}>Submit a revvview</h1>
        </div>

        <section id="impression" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              First Impression <span className={styles.requiredMark}>*</span>
            </h2>
            <p className={styles.sectionHint}>Summarize the initial impact and immediate UX feelings in a single statement.</p>
          </div>
          <textarea
            className={styles.auditInput}
            value={firstImpression}
            onChange={(e) => setFirstImpression(e.target.value)}
            placeholder="e.g. Upon initial landing, the product communicates an immediate sense of sophistication..."
            rows={4}
            maxLength={250}
          />
          <div className={styles.charCounter}>
            {firstImpression.length} / 250
          </div>
        </section>



        <section id="ratings" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Metrics <span className={styles.requiredMark}>*</span>
            </h2>
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
                maxLength={375}
              />
              <div className={styles.charCounter}>
                {usabilityDesc.length} / 375
              </div>
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
                maxLength={375}
              />
              <div className={styles.charCounter}>
                {performanceDesc.length} / 375
              </div>
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
                maxLength={375}
              />
              <div className={styles.charCounter}>
                {valueDesc.length} / 375
              </div>
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
                maxLength={375}
              />
              <div className={styles.charCounter}>
                {trustDesc.length} / 375
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              The execution roadmap <span className={styles.optionalMark}>(optional)</span>
            </h2>
            <p className={styles.sectionHint}>Define specific friction points and their strategic resolutions. These will be paired as prioritized phases in the final dossier.</p>
          </div>
          <div className={styles.roadmapGrid}>
            {roadmapItems.map((item, i) => (
              <div key={i} className={styles.roadmapFormItem}>
                <div className={styles.roadmapItemHeader}>
                  <div className={styles.roadmapPhaseLabel}>PHASE 0{i + 1}</div>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => handleRemoveRoadmapItem(i)}
                    aria-label="Remove phase"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                
                <div className={styles.roadmapInputsRow}>
                  <div className={styles.roadmapInputGroup}>
                    <label className={styles.inputLabel}>Strategic Resolution</label>
                    <textarea
                      className={styles.auditInput}
                      value={item.resolution}
                      onChange={(e) => handleUpdateRoadmapItem(i, "resolution", e.target.value)}
                      placeholder="e.g. Implement multi-select filtering to roadmap..."
                      rows={2}
                    />
                  </div>
                  
                  <div className={styles.roadmapInputGroup}>
                    <label className={styles.inputLabel}>The Friction</label>
                    <textarea
                      className={styles.auditInput}
                      value={item.friction}
                      onChange={(e) => handleUpdateRoadmapItem(i, "friction", e.target.value)}
                      placeholder="e.g. The current roadmap view lacks granular filtering capabilities..."
                      rows={3}
                    />
                  </div>

                  <div className={styles.roadmapMetaRow}>
                    <div className={styles.metaSelector}>
                      <label className={styles.inputLabel}>Priority</label>
                      <Select 
                        value={item.priority}
                        onValueChange={(val) => handleUpdateRoadmapItem(i, "priority", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className={styles.metaSelector}>
                      <label className={styles.inputLabel}>Impact</label>
                      <Select 
                        value={item.impact}
                        onValueChange={(val) => handleUpdateRoadmapItem(i, "impact", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select impact" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addBtn} onClick={handleAddRoadmapItem}>+ Add phase</button>
        </section>

        <section id="outlook" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              The Verdict <span className={styles.requiredMark}>*</span>
            </h2>
            <p className={styles.sectionHint}>Final expert conclusion on the product's future trajectory.</p>
          </div>
          <textarea
            className={styles.auditInput}
            value={strategicOutlook}
            onChange={(e) => setStrategicOutlook(e.target.value)}
            placeholder="e.g. The product shows strong foundational promise, but needs immediate refinement..."
            rows={4}
            maxLength={250}
          />
          <div className={styles.charCounter}>
            {strategicOutlook.length} / 250
          </div>
        </section>

        <section id="awards" className={styles.formSection}>
          <div 
            className={styles.collapsibleHeader} 
            onClick={() => setAwardsExpanded(!awardsExpanded)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.sectionHeader} style={{ marginBottom: 0 }}>
              <h2 className={styles.sectionTitle}>
                Awards Selection <span className={styles.optionalMark}>(optional)</span>
              </h2>
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
          <button 
            className={`${styles.submitBtn} ${!isFormValid ? styles.submitBtnDisabled : ""}`} 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Publish
          </button>
          <p className={styles.submitNotice}>Your review will be integrated into the main page for {product.name}</p>
        </div>
      </main>


    </div>
  );
}

