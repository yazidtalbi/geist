"use client";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase-browser";
import { getFollowingFeed } from "../lib/data";
import ProductCard from "./ProductCard";
import Skeleton from "./Skeleton";
import Link from "next/link";

export default function FollowingFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchFeed = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      setUser(session.user);
      try {
        const feedData = await getFollowingFeed(session.user.id);
        setItems(feedData);
      } catch (err) {
        console.error("Failed to fetch following feed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [supabase]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Skeleton height={200} borderRadius={12} />
        <Skeleton height={200} borderRadius={12} />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Log in to see your personalized feed</h3>
        <p style={{ opacity: 0.6, marginBottom: '24px' }}>Follow reviewers and watch projects to stay updated.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', border: '1px dashed var(--border-subtle)', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Your feed is empty</h3>
        <p style={{ opacity: 0.6, marginBottom: '24px' }}>Follow top contributors or watch interesting projects to see them here.</p>
        <Link href="/leaderboard" style={{ color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'underline' }}>
          Explore Top Reviewers
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {items.map((item, i) => (
        <div key={item.id} style={{ position: 'relative' }}>
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', background: '#eee' }}>
              {item.auditor?.avatar && <img src={item.auditor.avatar} alt="" style={{ width: '100%', height: '100%' }} />}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>
              <strong>{item.auditor?.name}</strong> reviewed <strong>{item.product.name}</strong>
            </span>
          </div>
          <ProductCard product={item.product} index={i} />
        </div>
      ))}
    </div>
  );
}
