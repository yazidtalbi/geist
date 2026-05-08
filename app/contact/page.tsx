import styles from "../static.module.css"

export const metadata = {
  title: "Contact Us | Revvview Support",
  description: "Get in touch with the Revvview team for support, partnerships, or feedback.",
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Communication</span>
            <h1 className={styles.title}>Get in Touch.</h1>
          </header>

          <div className={styles.content}>
            <p>
              For general inquiries, partnerships, or support, please reach out via email. 
              We typically respond within 24-48 business hours.
            </p>
            
            <h2>Direct Inquiries</h2>
            <p>
              <strong>General:</strong> hello@revvview.com<br />
              <strong>Support:</strong> help@revvview.com<br />
              <strong>Partnerships:</strong> labs@revvview.com
            </p>

            <h2>Social</h2>
            <p>
              Follow us on X/Twitter @revvview for the latest audits and community rank updates.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
