"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { users, getInitials } from "../lib/data";
import { createClient } from "../lib/supabase-browser";
import styles from "./page.module.css";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(users[0]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [verified, setVerified] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            ...profile,
            email: session.user.email
          });
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [supabase]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setUser({ ...user, avatar: url });
        setUploading(false);
      }, 1500);
    }
  };

  const handleVerify = () => {
    setUploading(true);
    setTimeout(() => {
      setVerified(true);
      setUploading(false);
    }, 2000);
  };

  const [activeSection, setActiveSection] = useState("profile");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: user.name,
          role: user.role,
        })
        .eq('id', user.id);

      if (error) throw error;
      alert("Changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading settings...</div>;

  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your profile, identity, and preferences.</p>
        </header>

        <div className={styles.layout}>
          {/* Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.nav}>
              <button 
                className={`${styles.navItem} ${activeSection === "profile" ? styles.active : ""}`}
                onClick={() => setActiveSection("profile")}
              >
                Profile
              </button>
              <button 
                className={`${styles.navItem} ${activeSection === "account" ? styles.active : ""}`}
                onClick={() => setActiveSection("account")}
              >
                Account
              </button>
              <button 
                className={`${styles.navItem} ${activeSection === "notifications" ? styles.active : ""}`}
                onClick={() => setActiveSection("notifications")}
              >
                Notifications
              </button>
              <button 
                className={`${styles.navItem} ${activeSection === "security" ? styles.active : ""}`}
                onClick={() => setActiveSection("security")}
              >
                Security
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className={styles.content}>
            {activeSection === "profile" && (
              <>
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Public Profile</h2>
                  
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
                      <div className={styles.avatar}>
                        {user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{getInitials(user.name)}</span>}
                        <div className={styles.avatarOverlay}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                        </div>
                      </div>
                      {uploading && <div className={styles.loader}></div>}
                    </div>
                    <div className={styles.avatarInfo}>
                      <h3 className={styles.avatarLabel}>Profile Picture</h3>
                      <p className={styles.avatarHint}>Click to upload. JPG, PNG or GIF. Max 2MB.</p>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={user.name} 
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={user.role} 
                        onValueChange={(value) => setUser({ ...user, role: value })}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Product Designer">Product Designer</SelectItem>
                          <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                          <SelectItem value="UX Researcher">UX Researcher</SelectItem>
                          <SelectItem value="Product Manager">Product Manager</SelectItem>
                          <SelectItem value="Founder">Founder</SelectItem>
                          <SelectItem value="Creative Director">Creative Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className={styles.formGroupFull}>
                      <Label htmlFor="bio">Short Bio</Label>
                      <textarea 
                        id="bio" 
                        className={styles.textarea} 
                        placeholder="Tell us about yourself..."
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      />
                    </div>
                  </div>
                </section>

                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <div>
                      <h2 className={styles.sectionTitle}>Identity Verification</h2>
                      <p className={styles.sectionDescription}>Verify your identity to earn the "Honest Critic" badge and increase your reputation weight.</p>
                    </div>
                    {!verified && <Button variant="outline" onClick={handleVerify} disabled={uploading}>
                      {uploading ? "Processing..." : "Start Verification"}
                    </Button>}
                  </div>

                  {verified ? (
                    <div className={styles.verifiedCard}>
                      <div className={styles.verifiedIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div className={styles.verifiedText}>
                        <h4 className={styles.verifiedTitle}>Identity Verified</h4>
                        <p className={styles.verifiedDesc}>Your account is now verified. You have earned the Elite Tier status.</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.unverifiedCard}>
                      <div className={styles.statusDot}></div>
                      <span>Not verified</span>
                    </div>
                  )}
                </section>
              </>
            )}

            {activeSection === "account" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Account Settings</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={getInitials(user.name).toLowerCase()} />
                  </div>
                </div>
              </section>
            )}

            {activeSection === "notifications" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <p className={styles.sectionDescription}>Configure how you want to receive updates.</p>
                
                <div className={styles.settingsBox}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Email Notifications</span>
                      <p className={styles.settingHint}>Receive daily digests and activity alerts via email.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>System Alerts</span>
                      <p className={styles.settingHint}>In-app notifications for reputation changes and rank updates.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Community Mention</span>
                      <p className={styles.settingHint}>Be notified when someone mentions you in a product audit.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </section>
            )}

            {activeSection === "security" && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Security</h2>
                <div className={styles.formGroup}>
                  <Label htmlFor="password">Change Password</Label>
                  <Button variant="outline">Update Password</Button>
                </div>
              </section>
            )}

            <div className={styles.footer}>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="ghost">Cancel</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
