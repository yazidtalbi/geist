"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { getProfileBySlug, getInitials, getScoreColor, getFollowStats, getReviewsByAuditor } from "../../lib/data";
import { createClient } from "../../lib/supabase-browser";
import { slugify } from "../../lib/utils";
import { Skeleton } from "../../components/ui/skeleton";
import styles from "../page.module.css";
import FollowButton from "../../components/FollowButton";

export default function DynamicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ followersCount: 0, followingCount: 0 });
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null | undefined>(undefined);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setCurrentUserId(authUser?.id || null);

        let profile;
        // If viewing own profile (by slug), fetch by specific ID
        if (authUser && slugify(authUser.user_metadata?.full_name || "").toLowerCase() === username.toLowerCase()) {
          const { data } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
          profile = data;
        }

        if (!profile) {
          profile = await getProfileBySlug(username);
        }
        
        setUser(profile);
        
        const statsId = profile.id;
        const followStats = await getFollowStats(statsId);
        setStats(followStats);

        const reviewsData = await getReviewsByAuditor(statsId);
        setUserReviews(reviewsData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Sidebar Skeleton */}
        <section className={styles.heroSection}>
          <Skeleton className={styles.avatar} style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
          <div style={{ marginTop: '24px' }}>
            <Skeleton style={{ width: '240px', height: '40px', marginBottom: '16px' }} />
            <Skeleton style={{ width: '140px', height: '24px', marginBottom: '16px' }} />
            <Skeleton style={{ width: '100%', height: '80px', marginBottom: '24px' }} />
            <Skeleton style={{ width: '180px', height: '24px' }} />
          </div>
        </section>

        {/* History Skeleton */}
        <section className={styles.historySection}>
          <div className={styles.historyHeader}>
            <Skeleton style={{ width: '180px', height: '32px' }} />
          </div>
          <div className={styles.auditGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.auditCard} style={{ border: 'none' }}>
                <Skeleton style={{ width: '100%', aspectRatio: '16/10', borderRadius: '16px' }} />
                <div style={{ padding: '24px' }}>
                  <Skeleton style={{ width: '60%', height: '24px', marginBottom: '12px' }} />
                  <Skeleton style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
                  <Skeleton style={{ width: '80%', height: '16px' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
  if (!user) return <div className={styles.page}>User not found.</div>;

  const isOwner = user && currentUserId && (
    currentUserId.toLowerCase() === user.id.toLowerCase() || 
    (user.name === "Yazid Talbi" && currentUserId) // Temporary safety for Yazid's duplicate accounts
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Left Column: Profile Info Stack */}
        <section className={styles.heroSection}>
          <div className={styles.avatarWrapper}>
            <div className={styles.profileAvatar}>
              {user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{getInitials(user.name)}</span>}
            </div>
            {isOwner && (
              <Link href="/settings" style={{ 
                position: 'absolute', 
                bottom: '0', 
                right: '0',
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} aria-label="Edit Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </Link>
            )}
          </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
              <h1 className={styles.profileName} style={{ fontSize: '42px', fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>{user.name}</h1>
              {user.role && (
                <p className={styles.profileRole} style={{ fontSize: '18px', fontWeight: 500, opacity: 0.5, margin: 0 }}>{user.role}</p>
              )}
              <div style={{ marginTop: '8px' }}>
                <span className={styles.xpBadge}>✦&nbsp;{user.reputation.toLocaleString('fr-FR').replace(/\u00a0/g, ' ')}</span>
              </div>
            </div>
            
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {user.bio || "Senior Product Researcher specializing in developer experience and blazingly fast interfaces."}
            </p>

          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: '500', marginBottom: '24px' }}>
            <span><strong>{stats.followersCount}</strong> Followers</span>
            <span><strong>{stats.followingCount}</strong> Following</span>
          </div>

          {!isOwner && currentUserId !== undefined && (
            <div style={{ marginBottom: '24px' }}>
              <FollowButton 
                followingId={user.id} 
                onStatusChange={(isFollowing) => {
                  setStats(prev => ({
                    ...prev,
                    followersCount: isFollowing ? prev.followersCount + 1 : prev.followersCount - 1
                  }));
                }}
              />
            </div>
          )}
        </section>

        <section className={styles.historySection}>
          <div className={styles.historyHeader}>
            <h2 className={styles.historyTitle}>Activity</h2>
            <div className={styles.historyFilter}>
              <span>Latest</span>
            </div>
          </div>

          <div className={styles.auditGrid}>
            {userReviews.length > 0 ? (
              userReviews.map((revvview) => {
                const product = revvview.product;
                const score = Math.round(
                  ((revvview.metrics.usability + revvview.metrics.performance + revvview.metrics.value + revvview.metrics.trust) / 40) * 100
                );
                return (
                  <Link href={`/revvview/${revvview.id}`} key={revvview.id} className={styles.auditCard}>
                    <div className={styles.cardImage}>
                      {product.screenshot ? (
                        <img src={product.screenshot} alt={product.name} />
                      ) : (
                        <div className={styles.placeholderImg}>{product.name}</div>
                      )}
                      <div className={styles.cardScore} style={{ background: getScoreColor(score) }}>
                        {score}
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <img src={product.logo} alt="" className={styles.cardLogo} />
                        <h4 className={styles.cardTitle}>{product.name}</h4>
                      </div>
                      <p className={styles.cardTagline}>{product.tagline}</p>
                      <div className={styles.cardMeta}>
                        <span>{new Date(revvview.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className={styles.emptyState}>No audits found for this user yet.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
