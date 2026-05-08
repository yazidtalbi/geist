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
import { getInitials } from "@/app/lib/data";

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
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData);
      }
    };

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

  const notifications = [
    { id: 1, type: "review", user: "Sarah Chen", action: "reviewed Linear", time: "2m ago", unread: true },
    { id: 2, type: "reputation", user: "System", action: "Reputation increased by +50", time: "1h ago", unread: true },
    { id: 3, type: "mention", user: "Marcus Webb", action: "mentioned you in Raycast audit", time: "3h ago", unread: false },
    { id: 4, type: "system", user: "System", action: "Your dossier for Vercel is trending", time: "5h ago", unread: false },
  ];

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
        </Link>

        {/* Search Bar */}
        <div className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <form action="/search">
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
                  <path d="m6 9 6 6 6-6"/>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className={styles.notifDot} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className={styles.avatarTrigger}>
                  <div className={styles.avatar}>
                    {profile?.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className={styles.avatarImg} />
                    ) : (
                      <span>{getInitials(profile?.name || user.email || "User")}</span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={styles.userDropdown}>
                  <DropdownMenuLabel>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{profile?.name || user.email}</span>
                      <span className={styles.userRole}>{profile?.role || "User"}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
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
          <div className={styles.notifList}>
            {notifications.map((n) => (
              <div key={n.id} className={`${styles.notifItem} ${n.unread ? styles.notifUnread : ""}`}>
                <div className={styles.notifAvatar}>
                  {n.user[0]}
                </div>
                <div className={styles.notifContent}>
                  <div className={styles.notifText}>
                    <strong>{n.user}</strong> {n.action}
                  </div>
                  <div className={styles.notifTime}>{n.time}</div>
                </div>
                {n.unread && <div className={styles.unreadDot} />}
              </div>
            ))}
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
