import Navbar from "../components/Navbar"
import styles from "../static.module.css"

export const metadata = {
  title: "Privacy Policy | Revvview",
  description: "How we protect your data and maintain transparency at Revvview.",
}

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Governance</span>
            <h1 className={styles.title}>Privacy Policy.</h1>
          </header>

          <div className={styles.content}>
            <p>Last updated: May 7, 2026</p>
            <p>
              Your privacy is paramount. This policy outlines how we collect, use, and protect your information 
              when you use the Revvview platform.
            </p>
            
            <h2>1. Data Collection</h2>
            <p>
              We collect information you provide directly to us (name, email, profile info) 
              and usage data collected automatically (cookies, device info).
            </p>

            <h2>2. Usage of Information</h2>
            <p>
              Your data is used to maintain your account, calculate reputation scores, 
              and improve the accuracy of our product audits.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
