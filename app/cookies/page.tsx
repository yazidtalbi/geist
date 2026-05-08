import styles from "../static.module.css"

export const metadata = {
  title: "Cookies Policy | Revvview",
  description: "Understanding how we use cookies to enhance your audit experience.",
}

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Transparency</span>
            <h1 className={styles.title}>Cookies Policy.</h1>
          </header>

          <div className={styles.content}>
            <p>
              Revvview uses cookies to improve your browsing experience and analyze platform performance.
            </p>
            
            <h2>Essential Cookies</h2>
            <p>
              These are necessary for the platform to function correctly, such as maintaining your login session.
            </p>

            <h2>Analytics Cookies</h2>
            <p>
              We use these to understand how users interact with our audits and product dossiers.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
