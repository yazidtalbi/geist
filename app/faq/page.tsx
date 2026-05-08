import styles from "../static.module.css"

export const metadata = {
  title: "FAQ | Revvview Knowledge Base",
  description: "Common questions about Revvview audits, reputation, and product submissions.",
}

export default function FAQPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Assistance</span>
            <h1 className={styles.title}>Common Queries.</h1>
          </header>

          <div className={styles.content}>
            <h2>What is a Revvvview Score?</h2>
            <p>
              The Revvvview Score is a weighted average of four core metrics: Usability, Performance, Value, and Trust. 
              It is calculated based on audits from verified community members.
            </p>
            
            <h2>How do I become a verified auditor?</h2>
            <p>
              Verification requires a history of high-quality audits and a minimum reputation score of 1,000. 
              Once you meet these criteria, you can apply for verification in your settings.
            </p>

            <h2>Can I submit my own product?</h2>
            <p>
              Yes. We encourage founders to submit their websites for community auditing. 
              Submit your product via the "Submit Website" button in the topbar.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
