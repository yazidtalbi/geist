"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./date-range-picker.module.css"

interface DateRange {
  id: string
  label: string
}

interface DateRangePickerProps {
  ranges: DateRange[]
  value: string
  onChange: (value: string) => void
}

export function DateRangePicker({ ranges, value, onChange }: DateRangePickerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.arrow} 
        onClick={() => scroll("left")}
        aria-label="Previous ranges"
      >
        <ChevronLeft size={18} />
      </button>

      <div className={styles.scrollArea} ref={scrollRef}>
        {ranges.map((range) => (
          <button
            key={range.id}
            className={`${styles.item} ${value === range.id ? styles.active : ""}`}
            onClick={() => onChange(range.id)}
          >
            {range.label}
          </button>
        ))}
      </div>

      <button 
        className={styles.arrow} 
        onClick={() => scroll("right")}
        aria-label="Next ranges"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
