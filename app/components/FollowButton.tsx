"use client";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase-browser";
import { followUser, unfollowUser, isFollowing } from "../lib/data";

interface FollowButtonProps {
  followingId: string;
  variant?: "primary" | "secondary" | "minimal";
  onStatusChange?: (isFollowing: boolean) => void;
}

export default function FollowButton({ followingId, variant = "primary", onStatusChange }: FollowButtonProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setCurrentUser(authUser);
        if (authUser.id.toLowerCase() === followingId.toLowerCase()) {
          // If IDs match, we should not be showing the button at all
          setLoading(false);
          return;
        }
        const status = await isFollowing(authUser.id, followingId);
        setFollowing(status);
      }
      setLoading(false);
    };
    checkStatus();
  }, [followingId, supabase]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      // Trigger login modal if needed, but for now just alert
      alert("Please log in to follow reviewers.");
      return;
    }

    if (currentUser.id === followingId) return;

    setToggling(true);
    try {
      if (following) {
        await unfollowUser(currentUser.id, followingId);
        setFollowing(false);
        onStatusChange?.(false);
      } else {
        await followUser(currentUser.id, followingId);
        setFollowing(true);
        onStatusChange?.(true);
      }
    } catch (err) {
      console.error("Follow toggle failed:", err);
    } finally {
      setToggling(false);
    }
  };

  if (loading || (currentUser && currentUser.id.toLowerCase() === followingId.toLowerCase())) return null;

  const baseStyles = {
    padding: variant === "minimal" ? "4px 16px" : "12px 32px",
    borderRadius: "99px",
    fontSize: variant === "minimal" ? "13px" : "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: "none",
  };

  const activeStyles = following 
    ? { background: "rgba(0,0,0,0.05)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }
    : { background: "var(--text-primary)", color: "white" };

  if (variant === "secondary") {
    activeStyles.background = following ? "transparent" : "var(--bg-secondary)";
    activeStyles.color = "var(--text-primary)";
    activeStyles.border = "1px solid var(--border-subtle)";
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={toggling}
      style={{ ...baseStyles, ...activeStyles, opacity: toggling ? 0.7 : 1 }}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
