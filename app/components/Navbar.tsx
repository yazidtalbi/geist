"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Drawer } from "./Drawer";
import { AuthModal } from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import styles from "./Navbar.module.css";
import { createClient } from "@/app/lib/supabase-browser";
import { getInitials, getNotifications, type Notification, markAllAsRead } from "@/app/lib/data";
import { formatTimeAgo } from "@/app/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const CATEGORIES = [
  { name: "Dev Tools", slug: "dev-tools" },
  { name: "SaaS", slug: "saas" },
  { name: "Productivity", slug: "productivity" },
  { name: "Platforms", slug: "platforms" },
  { name: "AI", slug: "ai" },
  { name: "Design", slug: "design" },
];

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const supabase = createClient();
  const router = useRouter();

  const fetchUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);

    if (session?.user) {
      // Upsert profile to ensure it exists for new Google logins
      const { data: profileData } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || "User",
          avatar: session.user.user_metadata.avatar_url || "",
          role: "User",
          reputation: 0,
          badges: ["Explorer"]
        }, { onConflict: 'id' })
        .select()
        .single();

      // Fetch notifications
      const notificationsRes = await getNotifications(session.user.id);
      
      setProfile(profileData);
      setNotifications(notificationsRes);
    } else {
      setProfile(null);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchUser();

    const checkAuthParam = () => {
      const params = new URLSearchParams(window.location.search);
      const authParam = params.get('auth');
      if (authParam === 'login' || authParam === 'signup') {
        setAuthView(authParam as "login" | "signup");
        setAuthModalOpen(true);

        // Clean up URL
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', newUrl);
      }
    };

    checkAuthParam();
    window.addEventListener('popstate', checkAuthParam);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUser();
      } else {
        setProfile(null);
        setNotifications([]);
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', checkAuthParam);
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Desktop Logo */}
        <Link href="/" className={`${styles.logo} ${styles.desktopOnly}`}>
          <img src="/logo.png" alt="revvview" className={styles.logoImg} />
          <span className="logoType" style={{ bottom: '1px', position: 'relative' }}>revvview</span>
        </Link>

        {/* Mobile Logo */}
        <Link href="/" className={`${styles.logoMobile} ${styles.mobileOnly}`}>
          <img src="/logo.png" alt="revvview" className={styles.logoImg} />
          <span className="logoType" style={{ bottom: '1px', position: 'relative', color: '#000', fontWeight: 500, fontSize: '18px', marginLeft: '4px' }}>revvview</span>
        </Link>

        {/* Search Bar */}
        <div className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const q = formData.get('q');
              if (q) router.push(`/search?q=${q}`);
            }}
          >
            <input
              name="q"
              className={styles.searchInput}
              placeholder="Search by Inspiration"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </form>
        </div>

        {/* Unified Actions Group (Responsive) */}
        <div className={styles.actions}>
          <div className={`${styles.navGroup} ${styles.desktopOnly}`}>
            <DropdownMenu>
              <DropdownMenuTrigger className={styles.navLink}>
                Explore
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CATEGORIES.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`}>
                    <DropdownMenuItem>{cat.name}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/leaderboard" className={styles.navLink}>Leaderboard</Link>
          </div>

          <button
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                setAuthView("signup");
                setAuthModalOpen(true);
              } else {
                router.push("/submit-product");
              }
            }}
            className={`btn-primary ${styles.desktopOnly}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Submit
          </button>

          {user ? (
            <>
              <button className={styles.iconBtn} aria-label="Notifications" onClick={() => setNotificationsOpen(true)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {notifications.some(n => !n.isRead) && <span className={styles.notifDot} />}
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className={styles.avatarTrigger}>
                  <div className={styles.avatar}>
                    {profile?.avatar ? (
                      <img src={profile.avatar} alt={profile?.name || user?.email} className={styles.avatarImg} />
                    ) : user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || user.email} className={styles.avatarImg} />
                    ) : (
                      <span>{getInitials(profile?.name || user?.user_metadata?.full_name || user?.email || "User")}</span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={styles.userDropdown}>
                  <DropdownMenuLabel>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{profile?.name || user?.user_metadata?.full_name || user.email}</span>
                      <span className={styles.userRole}>{profile?.role || "User"}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/profile/${getInitials(profile?.name || user?.user_metadata?.full_name || "User")}`}>
                    <DropdownMenuItem>Profile Dossier</DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className={styles.signOut} onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className={styles.guestActions}>
              <button
                className={styles.signUpBtn}
                onClick={() => {
                  setAuthView("signup");
                  setAuthModalOpen(true);
                }}
              >
                Join Now
              </button>
            </div>
          )}
        </div>

        <Drawer
          open={notificationsOpen}
          onOpenChange={setNotificationsOpen}
          title="Activity & Notifications"
          className={styles.notifDrawer}
        >
          <div className={styles.notifControls}>
            <div className={styles.markReadToggle}>
              <Label htmlFor="mark-read">Mark all as read</Label>
              <Switch 
                id="mark-read" 
                checked={notifications.every(n => n.isRead)}
                onCheckedChange={async (checked) => {
                  if (checked && user) {
                    try {
                      await markAllAsRead(user.id);
                      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.notifList}>
            {notifications.length > 0 ? (
              notifications.map((n) => {
                const content = (
                  <>
                    <div className={styles.notifAvatar}>
                      {n.actor?.avatar ? (
                        <img src={n.actor.avatar} alt={n.actor.name} className={styles.avatarImg} />
                      ) : (
                        <span>{getInitials(n.actor?.name || "System")}</span>
                      )}
                    </div>
                    <div className={styles.notifContent}>
                      <div className={styles.notifText}>
                        <strong>{n.actor?.name || "System"}</strong> {n.actionText}
                      </div>
                      <div className={styles.notifTime}>{formatTimeAgo(n.createdAt)}</div>
                    </div>
                    {!n.isRead && <div className={styles.unreadDot} />}
                  </>
                );

                const linkHref = n.deepDiveUrl || (n.entitySlug ? `/product/${n.entitySlug}` : null);

                if (linkHref) {
                  return (
                    <Link 
                      key={n.id} 
                      href={linkHref}
                      className={`${styles.notifItem} ${!n.isRead ? styles.notifUnread : ""}`}
                      onClick={() => setNotificationsOpen(false)}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div key={n.id} className={`${styles.notifItem} ${!n.isRead ? styles.notifUnread : ""}`}>
                    {content}
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyNotifs}>No notifications yet.</div>
            )}
          </div>
          <Link href="/notifications" onClick={() => setNotificationsOpen(false)}>
            <button className={styles.allNotifBtn}>View All History</button>
          </Link>
        </Drawer>

        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          initialView={authView}
        />
      </div>
    </nav>
  );
}
