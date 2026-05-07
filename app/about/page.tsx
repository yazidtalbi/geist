import Navbar from "../components/Navbar"
import styles from "../static.module.css"

export const metadata = {
  title: "About Revvview | The Brutalist Product Audit Platform",
  description: "Learn about Revvview, the platform where product research meets brutalist design and community-driven audits.",
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Our Manifesto</span>
            <h1 className={styles.title}>Truth in Product.</h1>
          </header>

          <div className={styles.content}>
            <p>
              Revvview was born from a simple observation: most product reviews are shallow, biased, or buried in noise. 
              We believe that great software deserves rigorous, honest, and high-fidelity research.
            </p>
            
            <h2>The Audit Standard</h2>
            <p>
              Every product on Revvview undergoes a "Deep Dive" audit. We measure what matters: 
              Usability, Performance, Value, and Trust. No fluff. Just hard data and expert intuition.
            </p>

            <h2>Brutalist Luxury</h2>
            <p>
              Our design philosophy is "Brutalist Luxury." We strip away the unnecessary, 
              focusing on high-contrast typography and sophisticated grids. 
              It&apos;s a tribute to the raw power of the web, refined for those who appreciate precision.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
