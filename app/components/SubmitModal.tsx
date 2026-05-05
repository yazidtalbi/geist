"use client";
import { useState } from "react";
import styles from "./SubmitModal.module.css";

type Step = "url" | "fetching" | "verify" | "done";

export default function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("url");
  const [url, setUrl] = useState("");
  const [fetched, setFetched] = useState({ title: "", description: "", category: "SAAS" });


  const handlePaste = (val: string) => {
    setUrl(val);
    if (val.startsWith("http")) {
      setStep("fetching");
      setTimeout(() => {
        const domain = new URL(val).hostname.replace("www.", "").split(".")[0];
        const title = domain.charAt(0).toUpperCase() + domain.slice(1);
        setFetched({
          title,
          description: `${title} is a modern digital product designed to streamline workflows and enhance productivity.`,
          category: "SAAS",
        });
        setStep("verify");
      }, 1800);
    }
  };

  const handlePublish = () => {
    setStep("done");
    setTimeout(onClose, 1200);
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <h2 className={styles.title}>Submit a Product</h2>

        {/* Step tracker */}
        <div className={styles.steps}>
          {["URL", "Verify Data", "Publish"].map((s, i) => {
            const stepIdx = step === "url" || step === "fetching" ? 0 : step === "verify" ? 1 : 2;
            return (
              <div key={s} className={`${styles.step} ${i <= stepIdx ? styles.stepActive : ""}`}>
                <span className={styles.stepDot}>{i < stepIdx ? "✓" : i + 1}</span>
                <span className={styles.stepText}>{s}</span>
              </div>
            );
          })}
        </div>

        {step === "url" && (
          <div className={styles.urlSection}>
            <label className={styles.label}>Paste Product URL</label>
            <input
              className={`input ${styles.urlInput}`}
              placeholder="e.g., https://linear.app"
              value={url}
              onChange={(e) => handlePaste(e.target.value)}
              autoFocus
            />
            <p className={styles.hint}>We&apos;ll automatically fetch product details in seconds.</p>
          </div>
        )}

        {step === "fetching" && (
          <div className={styles.fetchingSection}>
            <div className={styles.spinner} />
            <p className={styles.fetchingText}>Fetching Product Data...</p>
            <p className={styles.fetchingUrl}>{url}</p>
          </div>
        )}

        {step === "verify" && (
          <div className={styles.verifySection}>
            <div className={styles.previewCard}>
              <div className={styles.screenshotPlaceholder}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                <span>Screenshot captured</span>
              </div>
              <div className={styles.previewInfo}>
                <div className={styles.previewTitle}>{fetched.title}</div>
                <div className={styles.previewDesc}>{fetched.description}</div>
                <span className="pill">{fetched.category}</span>
              </div>
            </div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={handlePublish}>
              Publish & Start revvview
            </button>
          </div>
        )}

        {step === "done" && (
          <div className={styles.doneSection}>
            <div className={styles.checkCircle}>✓</div>
            <p className={styles.doneText}>Product Published!</p>
          </div>
        )}
      </div>
    </div>
  );
}
