"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "../components/ProductCard"
import { searchProducts, Product } from "../lib/data"
import { useState, useEffect } from "react"
import styles from "./page.module.css"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        if (!query) {
          setResults([])
          setLoading(false)
          return
        }

        const serverResults = await searchProducts(query)
        
        // Client-side fuzzy enhancement
        const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 0)
        
        const enhanced = serverResults.filter(p => {
          const name = p.name.toLowerCase()
          const tagline = p.tagline.toLowerCase()
          
          return tokens.every(token => {
            if (name.includes(token) || tagline.includes(token)) return true
            
            const words = name.split(/\s+/).concat(tagline.split(/\s+/))
            return words.some(word => {
              if (word.length < 3) return false
              return word.startsWith(token) || token.startsWith(word)
            })
          })
        })
        
        setResults(enhanced.length > 0 ? enhanced : serverResults)
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (loading) {
    return <div className={styles.loading}>Optimizing results...</div>
  }

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
