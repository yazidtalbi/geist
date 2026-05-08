"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Skeleton from "../../components/Skeleton";
import ProductCard from "../../components/ProductCard";
import { getProductBySlug, getReviews, getTopReviewers, getInitials, getScoreColor, getMetricColor, Product, revvview } from "../../lib/data";
import { Drawer } from "../../components/Drawer";
import RevvviewReport from "../../components/revvviewReport";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../../components/ui/dropdown-menu";
import styles from "./page.module.css";
import { createClient } from "../../lib/supabase-browser";

const metricExplanations = {
  usability: "Interface intuitiveness and navigational efficiency.",
  performance: "Speed, responsiveness, and technical resilience.",
  value: "Core utility and problem-solving efficacy.",
  trust: "Brand reliability and data transparency."
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productrevvvviews, setProductrevvvviews] = useState<revvview[]>([]);
  const [reviewers, setReviewers] = useState<any[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const [clientInfo, setClientInfo] = useState({ date: "", browser: "", os: "" });
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prod = await getProductBySlug(slug);
        const reviews = await getReviews(prod.id);

        // Fetch reviewers for these reviews
        const reviewerIds = [...new Set(reviews.map(r => r.auditorId))];
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .in('id', reviewerIds);

        setProduct(prod);
        setProductrevvvviews(reviews);
        setReviewers(profileData || []);

        // Similar products
        const { data: similar } = await supabase
          .from('products')
          .select('*')
          .eq('category', prod.category)
          .neq('id', prod.id)
          .limit(4);

        if (similar) {
          setSimilarProducts(similar.map((p: any) => ({
            id: p.id,
            name: p.name,
            url: p.url,
            tagline: p.tagline,
            revvScore: p.revv_score,
            screenshot: p.screenshot,
            logo: p.logo,
            category: p.category,
            tags: p.tags,
            metrics: { usability: p.metrics_usability, performance: p.metrics_performance, value: p.metrics_value, trust: p.metrics_trust },
            reviewsTotal: p.reviews_total,
            createdAt: p.created_at,
          } as any)));
        }

      } catch (err) {
        console.error("Failed to fetch product data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, supabase]);

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

    setClientInfo({
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      browser,
      os
    });
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      setShowMiniHeader(window.scrollY > 400);
      if (window.scrollY < 300) {
        setActiveTab("Overview");
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["overview", "awards", "metrics", "revvvviews"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveTab(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const scrollToSection = (id: string) => {
    if (id === "Overview") {
      window.scrollTo({ top: 0, behavior: 'auto' });
      setActiveTab(id);
      return;
    }
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
      setActiveTab(id);
    }
  };

  const metricIcons = {
    usability: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" /><path d="M12 12l9 3l-4 2l-2 4l-3 -9" /></svg>,
    performance: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" /></svg>,
    value: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 6v2m0 8v2" /></svg>,
    trust: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2l4 -4" /><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /></svg>
  };

  const handleOpenrevvview = (revvviewId: string) => {
    router.push(`/revvview/deep-dive/${revvviewId}`);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageWrapper}>
          <main className={styles.main}>
            <div style={{ display: 'flex', gap: '32px', marginBottom: '48px' }}>
              <Skeleton width={80} height={80} borderRadius={16} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Skeleton width="40%" height={32} borderRadius={8} />
                <Skeleton width="20%" height={20} borderRadius={8} />
              </div>
            </div>
            <Skeleton width="100%" height={500} borderRadius={12} className="mb-8" />
            <Skeleton width="100%" height={200} borderRadius={12} />
          </main>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className={styles.page}>Product not found.</div>;
  }

  const scoreColor = getScoreColor(product.revvScore);

  return (
    <div className={styles.page}>
      <div className={styles.pageWrapper}>
        {/* Sticky Mini Header on Scroll */}
        <div className={`${styles.miniHeader} ${showMiniHeader ? styles.miniHeaderVisible : ""}`}>
          <div className={styles.miniHeaderInner}>
            <div className={styles.miniHeaderLeft}>
              <div className={styles.miniLogo}>
                {product.logo ? <img src={product.logo} alt="" /> : <span>{getInitials(product.name)}</span>}
              </div>
              <span className={styles.miniTitle}>{product.name}</span>
            </div>

            <div className={styles.miniHeaderRight}>
              <div className={styles.headerActionsMini}>
                <a href={product.url} target="_blank" className={styles.headerActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  Visit Website
                </a>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={styles.headerActionBtn}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                      Share
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${product.name} on revvview!`)}`, '_blank')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z" /></svg>
                      Twitter / X
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className={styles.miniScore} style={{ color: scoreColor, borderColor: scoreColor }}>
                {product.revvScore.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <main className={styles.main}>
          {/* Header Section */}
          <header className={styles.pageHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.logoIconLarge}>
                {product.logo ? <img src={product.logo} alt="" /> : <span>{getInitials(product.name)}</span>}
              </div>
              <div className={styles.titleArea}>
                <h1 className={styles.titleMain}>{product.name}</h1>
                <p className={styles.taglineMain}>{product.tagline}</p>
              </div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.headerActions}>
                <a href={product.url} target="_blank" className={styles.headerActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  Visit Website
                </a>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={styles.headerActionBtn}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                      Share
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${product.name} on revvview!`)}`, '_blank')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z" /></svg>
                      Twitter / X
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className={styles.overallScoreCircle} style={{ color: scoreColor, borderColor: scoreColor }}>
                {product.revvScore.toFixed(1)}
              </div>
            </div>
          </header>

          {/* Product Interface Section - FULL WIDTH BENEATH TITLE+DESC */}
          <section className={styles.interfaceSection}>
            <div className={styles.mainImageContainer}>
              {product.screenshot ? (
                <img src={product.screenshot} className={styles.mainImage} alt={product.name} />
              ) : (
                <div className={styles.imagePlaceholder}>Preview Unavailable</div>
              )}
            </div>
          </section>


          {/* Info Section */}
          <div className={styles.infoSection} id="overview">
            <div className={styles.infoLeft}>
              <div className={styles.metaGroup}>
                <h4 className={styles.metaGroupTitle}>Description</h4>
                <p className={styles.mainSummary}>
                  {product.longDescription}
                </p>
              </div>
            </div>

            <aside className={styles.infoRight}>
              <div className={styles.metaGroup}>
                <h4 className={styles.metaGroupTitle}>Published</h4>
                <p className={styles.metaValue}>
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : clientInfo.date}
                </p>
              </div>

              <div className={styles.metaGroup}>
                <h4 className={styles.metaGroupTitle}>Socials</h4>
                <div className={styles.socialButtonsRow}>
                  {product.socials?.twitter && (
                    <a href={`https://twitter.com/${product.socials.twitter}`} target="_blank" className={styles.socialCircleBtn} aria-label="Twitter">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z" /></svg>
                    </a>
                  )}
                  {product.socials?.github && (
                    <a href={`https://github.com/${product.socials.github}`} target="_blank" className={styles.socialCircleBtn} aria-label="Github">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    </a>
                  )}
                  {product.socials?.website && (
                    <a href={product.socials.website} target="_blank" className={styles.socialCircleBtn} aria-label="Website">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>

          <section className={styles.tagsFullWidthSection}>
            <div className={styles.tagsContent}>
              <p className={styles.tagsLabel}>This website was built with...</p>
              <div className={styles.tagsWrapperFull}>
                {product.tags?.map((tag, i) => (
                  <span key={i} className={styles.tagFull}>{tag}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Awards Section */}
          {product.awards && product.awards.length > 0 && (
            <section className={`${styles.awardsSection} ${styles.whiteCard}`} id="awards">
              <h4 className={styles.metaGroupTitle} style={{ marginBottom: 32 }}>Awards</h4>
              <div className={styles.awardsGrid}>
                {product.awards.slice(0, 3).map((award, i) => (
                  <div key={i} className={styles.awardCard}>
                    <span className={styles.awardEmoji}>{award.emoji}</span>
                    <span className={styles.awardName}>{award.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* product Truth Section - BIG FULL WIDTH VERTICAL */}
          <section className={`${styles.uxTruthSection} ${styles.whiteCard}`} id="metrics">
            <h4 className={styles.metaGroupTitle} style={{ marginBottom: 32 }}>Metrics</h4>
            <div className={styles.truthList}>
              {(["usability", "performance", "value", "trust"] as const).map((key) => {
                const reviewersForMetric = productrevvvviews.filter(r => r.metrics[key] !== undefined);

                return (
                  <Collapsible key={key} className={styles.truthRowNew}>
                    <CollapsibleTrigger asChild>
                      <div className={styles.truthHeaderRow}>
                        <div className={styles.truthLabelWrapper}>
                          <span className={styles.truthIcon}>{metricIcons[key]}</span>
                          <div className={styles.labelWithTooltip}>
                            <span className={styles.truthLabelNew}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <div className={styles.tooltipContainer}>
                              <span className={styles.tooltipTrigger}>?</span>
                              <div className={styles.tooltipContent}>
                                {metricExplanations[key]}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div className={styles.metricsAvatars}>
                            {reviewersForMetric.slice(0, 5).map((rev, idx) => {
                              const reviewer = reviewers.find(u => u.id === rev.auditorId);
                              return (
                                <div key={idx} className={styles.miniAvatar} title={reviewer?.name}>
                                  {reviewer?.avatar ? <img src={reviewer.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : (reviewer ? getInitials(reviewer.name) : "?")}
                                </div>
                              );
                            })}
                            {reviewersForMetric.length > 5 && (
                              <div className={styles.miniAvatar}>+{reviewersForMetric.length - 5}</div>
                            )}
                          </div>
                          <span className={styles.truthScoreNew}>{product.metrics[key].toFixed(1)}</span>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <div className={styles.truthRowBar}>
                      <div
                        className={styles.truthRowFill}
                        style={{
                          width: `${product.metrics[key] * 10}%`,
                          background: getMetricColor(product.metrics[key])
                        }}
                      />
                    </div>

                    <CollapsibleContent>
                      <div className={styles.collapsibleContent}>
                        {reviewersForMetric.map((rev, idx) => {
                          const reviewer = reviewers.find(u => u.id === rev.auditorId);
                          if (!reviewer) return null;
                          return (
                            <div key={idx} className={styles.reviewerFeedbackItem}>
                              <div className={styles.feedbackReviewerHeader}>
                                <div className={styles.feedbackAvatar}>
                                  {reviewer.avatar ? <img src={reviewer.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : getInitials(reviewer.name)}
                                </div>
                                <div className={styles.feedbackReviewerInfo}>
                                  <span className={styles.feedbackReviewerName}>{reviewer.name}</span>
                                  <span className={styles.feedbackReviewerRole}>{reviewer.role}</span>
                                </div>
                              </div>
                              <p className={styles.feedbackText}>
                                {rev.metricFeedback[key]}
                              </p>
                              <div className={styles.feedbackScore} style={{ color: getMetricColor(rev.metrics[key]) }}>
                                {rev.metrics[key].toFixed(1)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </section>


          {/* Verified revvview History Table */}
          <section className={`${styles.auditSection} ${styles.whiteCard}`} id="revvvviews">
            <div className={styles.auditPromo}>
              <p className={styles.promoText}>
                Have your say, if you used <strong>{product.name}</strong> make your revvview here!
              </p>
              <Link href={`/revvview/${product.id}`} style={{ textDecoration: 'none' }}>
                <button className={styles.promoButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  Start deep revvvviews
                </button>
              </Link>
            </div>

            {productrevvvviews.length > 0 && (
              <div className={styles.tableWrapper}>
                <table className={styles.auditTable}>
                  <thead>
                    <tr>
                      <th>revvviewer</th>
                      <th>Usability</th>
                      <th>Performance</th>
                      <th>Value</th>
                      <th>Trust</th>
                      <th style={{ textAlign: 'right' }}>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productrevvvviews.map((review) => {
                      const reviewer = reviewers.find(u => u.id === review.auditorId) || { name: "User", role: "Auditor" };
                      const avgScore = (review.metrics.usability + review.metrics.performance + review.metrics.value + review.metrics.trust) / 4;

                      return (
                        <tr key={review.id} onClick={() => handleOpenrevvview(review.id)} className={styles.clickableRow}>
                          <td>
                            <div className={styles.reviewerInfo}>
                              <div className={styles.avatarCircle}>
                                {(reviewer as any).avatar ? <img src={(reviewer as any).avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <span>{getInitials(reviewer.name)}</span>}
                              </div>
                              <div>
                                <div className={styles.reviewerNameMini}>{reviewer.name}</div>
                                <div className={styles.reviewerRole}>{(reviewer as any).role}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.tableMetric}>
                              <span className={styles.tableMetricValue}>{review.metrics.usability.toFixed(1)}</span>
                              <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.usability * 10}%`, background: getMetricColor(review.metrics.usability) }} /></div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.tableMetric}>
                              <span className={styles.tableMetricValue}>{review.metrics.performance.toFixed(1)}</span>
                              <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.performance * 10}%`, background: getMetricColor(review.metrics.performance) }} /></div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.tableMetric}>
                              <span className={styles.tableMetricValue}>{review.metrics.value.toFixed(1)}</span>
                              <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.value * 10}%`, background: getMetricColor(review.metrics.value) }} /></div>
                            </div>
                          </td>
                          <td>
                            <div className={styles.tableMetric}>
                              <span className={styles.tableMetricValue}>{review.metrics.trust.toFixed(1)}</span>
                              <div className={styles.tableMetricBar}><div style={{ width: `${review.metrics.trust * 10}%`, background: getMetricColor(review.metrics.trust) }} /></div>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <span className={styles.scoreBadge} style={{ background: getScoreColor(avgScore) + "15", color: getScoreColor(avgScore), fontSize: 16 }}>
                              {avgScore.toFixed(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </main>

        <section className={styles.similarSection}>
          <div className={styles.similarInner}>
            <h3 className={styles.auditTitle} style={{ fontSize: 32, marginBottom: 40 }}>Similar Products</h3>
            <div className={styles.similarGrid}>
              {similarProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Tabs FAB Menu */}
        <nav className={styles.tabsFab}>
          <div className={styles.fabLogo}>
            <img src="/logo.png" alt="" style={{ width: 22, height: 22, display: 'block' }} />
          </div>
          {["Overview", "Awards", "Metrics", "Revvvviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
            >
              {tab === "Revvvviews" ? "Reviews" : tab}
            </button>
          ))}
          <a href={product.url} target="_blank" className={styles.visitLink}>
            Visit Website
          </a>
        </nav>
      </div>


    </div>
  );
}
