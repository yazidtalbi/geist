"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import styles from "./page.module.css";

const MENU_ITEMS = [
  { id: "identity", label: "Product Identity" },
  { id: "media", label: "Media & Assets" },
  { id: "story", label: "The Story" },
  { id: "links", label: "Social & Links" },
];

export default function SubmitProductPage() {
  const [activeSection, setActiveSection] = useState("identity");
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    website: "",
    category: "",
    description: "",
    twitter: "",
    discord: "",
    instagram: "",
    facebook: "",
    threads: "",
    linkedin: "",
  });
  const [features, setFeatures] = useState([""]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<(string | null)[]>([null, null]);

  const handleAddFeature = () => setFeatures([...features, ""]);
  const handleRemoveFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };
  const handleFeatureChange = (index: number, val: string) => {
    const newFeatures = [...features];
    newFeatures[index] = val;
    setFeatures(newFeatures);
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeroImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newGallery = [...gallery];
      newGallery[index] = URL.createObjectURL(e.target.files[0]);
      setGallery(newGallery);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = MENU_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(MENU_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderLeft}>
          <Link href="/" className={styles.backBtnHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
            Back
          </Link>
        </div>
        <div className={styles.topHeaderCenter}>
          {/* Header Title if needed */}
        </div>
        <div className={styles.topHeaderRight}>
          {/* Action buttons if needed */}
        </div>
      </header>

      <aside className={styles.sidebar}>
        <nav className={styles.sideMenu}>
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.menuItem} ${activeSection === item.id ? styles.menuItemActive : ""}`}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
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
          <div style={{ marginBottom: '32px', padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Performance Note</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Awards, Metrics, and Truth Scores are automatically calculated based on real expert evaluations once your product is live.
            </p>
          </div>
          <Link href="/" className={styles.sidebarLogo}>
            <img src="/logo.png" alt="revvview" className={styles.logoImgSmall} />
          </Link>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <div className={styles.contextLabel}>Product Submission</div>
          <h1 className={styles.mainTitle}>Launch your product on revvview</h1>
        </div>

        <section id="identity" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Product Identity <span className={styles.requiredMark}>*</span>
            </h2>
            <p className={styles.sectionHint}>Define the core identity of your digital product.</p>
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <label className={styles.label}>Product Name</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="e.g. Linear" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Tagline</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="e.g. The issue tracker you'll actually enjoy using." 
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <Select 
                value={formData.category}
                onValueChange={(val) => setFormData({...formData, category: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Productivity">Productivity</SelectItem>
                  <SelectItem value="Design Tools">Design Tools</SelectItem>
                  <SelectItem value="Developer Tools">Developer Tools</SelectItem>
                  <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section id="media" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Media & Assets <span className={styles.requiredMark}>*</span>
            </h2>
            <p className={styles.sectionHint}>Showcase your interface with high-resolution captures.</p>
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <label className={styles.label}>Hero Shot (1920x1080 recommended)</label>
              <label className={styles.imageUploadArea} style={{ position: 'relative', overflow: 'hidden' }}>
                <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} style={{ display: 'none' }} />
                {heroImage ? (
                  <img src={heroImage} alt="Hero preview" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.uploadIcon}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className={styles.uploadText}>Upload Hero Image</span>
                    <span className={styles.uploadHint}>Drop your main product interface here</span>
                  </>
                )}
              </label>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Gallery (Feature Highlights)</label>
              <div className={styles.galleryGrid}>
                {gallery.map((img, i) => (
                  <label key={i} className={styles.galleryItem} style={{ position: 'relative', overflow: 'hidden' }}>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGalleryUpload(i, e)} style={{ display: 'none' }} />
                    {img ? (
                      <img src={img} alt={`Gallery preview ${i+1}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="#94A3B8">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="story" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              The Story <span className={styles.requiredMark}>*</span>
            </h2>
            <p className={styles.sectionHint}>Tell the experts what makes your product unique.</p>
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.field}>
              <label className={styles.label}>Detailed Description</label>
              <textarea 
                className={`${styles.input} ${styles.textarea}`} 
                placeholder="Explain the problem you're solving and your unique approach..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Core Features</label>
              <div className={styles.featuresList}>
                {features.map((feature, i) => (
                  <div key={i} className={styles.featureItem}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder={`Feature #${i + 1} (e.g. Real-time collaboration)`}
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                    />
                    <button className={styles.removeFeatureBtn} onClick={() => handleRemoveFeature(i)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button className={styles.addFeatureBtn} onClick={handleAddFeature}>+ Add core feature</button>
            </div>
          </div>
        </section>

        <section id="links" className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Social & Links</h2>
            <p className={styles.sectionHint}>Connect your community and official channels.</p>
          </div>
          
          <div className={styles.socialsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Website URL</label>
              <input 
                type="url" 
                className={styles.input} 
                placeholder="https://yourproduct.com" 
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>X / Twitter Handle</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="@yourhandle" 
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Instagram</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="@username" 
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Facebook</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Profile link" 
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Threads</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="@username" 
                value={formData.threads}
                onChange={(e) => setFormData({...formData, threads: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>LinkedIn</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Company/Personal link" 
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Discord Invite</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="discord.gg/invite" 
                value={formData.discord}
                onChange={(e) => setFormData({...formData, discord: e.target.value})}
              />
            </div>
          </div>
        </section>

        <div className={styles.submitWrapper}>
          <button className={styles.submitBtn}>
            Submit
          </button>
          <p className={styles.submitNotice}>
            By launching, your product will enter the verification queue. Once approved, it will be open for expert evaluations.
          </p>
        </div>
      </main>
    </div>
  );
}
