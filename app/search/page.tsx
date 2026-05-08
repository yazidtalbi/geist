"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "../components/ProductCard"
import { products } from "../lib/data"
import styles from "./page.module.css"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.tagline.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Search Results</span>
        <h1 className={styles.title}>
          {query ? `Results for "${query}"` : "Search all products"}
        </h1>
        <p className={styles.subtitle}>
          Found {results.length} products matching your criteria.
        </p>
      </header>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h2 className={styles.emptyTitle}>No results found</h2>
          <p className={styles.emptyDesc}>Try searching for different keywords or categories.</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<div className={styles.loading}>Searching...</div>}>
          <SearchResults />
        </Suspense>
      </main>
    </div>
  )
}
