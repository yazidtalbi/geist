"use client";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase-browser";
import { watchProduct, unwatchProduct, isWatching } from "../lib/data";

interface WatchButtonProps {
  productId: string;
  variant?: "primary" | "secondary" | "minimal";
}

export default function WatchButton({ productId, variant = "primary" }: WatchButtonProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [watching, setWatching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        const status = await isWatching(session.user.id, productId);
        setWatching(status);
      }
      setLoading(false);
    };
    checkStatus();
  }, [productId, supabase]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      alert("Please log in to watch projects.");
      return;
    }

    setToggling(true);
    try {
      if (watching) {
        await unwatchProduct(currentUser.id, productId);
        setWatching(false);
      } else {
        await watchProduct(currentUser.id, productId);
        setWatching(true);
      }
    } catch (err) {
      console.error("Watch toggle failed:", err);
    } finally {
      setToggling(false);
    }
  };

  if (loading) return null;

  const baseStyles = {
    padding: "10px 24px",
    borderRadius: "99px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid var(--border-subtle)",
  };

  const activeStyles = watching 
    ? { background: "rgba(0,0,0,0.05)", color: "var(--text-primary)" }
    : { background: "white", color: "var(--text-primary)" };

  return (
    <button 
      onClick={handleToggle}
      disabled={toggling}
      style={{ ...baseStyles, ...activeStyles, opacity: toggling ? 0.7 : 1 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={watching ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
      {watching ? "Watching" : "Watch Project"}
    </button>
  );
}
