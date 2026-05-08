"use client"

import { use } from "react"
import ProductCard from "../../components/ProductCard"
import { products } from "../../lib/data"
import styles from "../../search/page.module.css"

const SLUG_MAP: Record<string, string> = {
  "dev-tools": "DEV TOOL",
  "saas": "SAAS",
  "productivity": "PRODUCTIVITY",
  "platforms": "PLATFORM",
  "ai": "AI",
  "design": "DESIGN"
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const categoryName = SLUG_MAP[slug] || slug.toUpperCase()
  
  const results = products.filter(p => p.category.toUpperCase() === categoryName)

  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Browse Category</span>
            <h1 className={styles.title}>{categoryName}</h1>
            <p className={styles.subtitle}>
              Exploring the best {categoryName} products and tools audited by the community.
            </p>
          </header>

          <div className={styles.grid}>
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          
          {results.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📂</div>
              <h2 className={styles.emptyTitle}>No products yet</h2>
              <p className={styles.emptyDesc}>Be the first to submit a product in this category!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
