"use client"

import { use, useState, useEffect } from "react"
import ProductCard from "../../components/ProductCard"
import { getProducts, Product } from "../../lib/data"
import styles from "./tag.module.css"

const SLUG_MAP: Record<string, string> = {
  "dev": "DEV",
  "saas": "SAAS",
  "productivity": "PRODUCTIVITY",
  "platforms": "PLATFORMS",
  "ai": "AI",
  "design": "DESIGN",
  "marketing": "MARKETING",
  "analytics": "ANALYTICS",
  "web3": "WEB3",
  "utilities": "UTILITIES"
}

export default function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const tagLabel = SLUG_MAP[slug] || slug.toUpperCase().replace(/-/g, ' ')

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        const allProducts = await getProducts()
        
        // Match by looking into the tags array of each product
        const filtered = allProducts.filter(p => {
          const productTags = p.tags?.map(t => t.toLowerCase()) || []
          const slugLower = slug.toLowerCase()
          const labelLower = tagLabel.toLowerCase()
          
          return productTags.includes(slugLower) || productTags.includes(labelLower) || p.category?.toLowerCase() === slugLower
        })
        
        setResults(filtered)
      } catch (err) {
        console.error("Failed to fetch tag products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [slug, tagLabel])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Browse Tag</span>
            <h1 className={styles.title}>{tagLabel}</h1>
            <p className={styles.subtitle}>
              Exploring the best products tagged with {tagLabel} audited by the community.
            </p>
          </header>

          {loading ? (
            <div className={styles.loading}>Analyzing tag...</div>
          ) : results.length > 0 ? (
            <div className={styles.grid}>
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🏷️</div>
              <h2 className={styles.emptyTitle}>No products yet</h2>
              <p className={styles.emptyDesc}>Be the first to submit a product with this tag!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
