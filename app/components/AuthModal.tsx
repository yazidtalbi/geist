"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Link from "next/link"
import styles from "./AuthModal.module.css"
import { createClient } from "@/app/lib/supabase-browser"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialView?: "login" | "signup"
}

export function AuthModal({ open, onOpenChange, initialView = "login" }: AuthModalProps) {
  const [view, setView] = React.useState<"login" | "signup">(initialView)
  const [showEmailForm, setShowEmailForm] = React.useState(false)
  const supabase = createClient()

  React.useEffect(() => {
    setView(initialView)
    if (!open) {
      setShowEmailForm(false)
    }
  }, [initialView, open])

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.content}>
        <DialogHeader>
          <div className={styles.logoWrapper}>
            <img src="/logo.png" alt="revvview" className={styles.logo} />
          </div>
          <DialogTitle className={styles.title}>
            {showEmailForm 
              ? (view === "login" ? "Sign in with email." : "Create your account.")
              : (view === "login" ? "Welcome back." : "Join the community.")
            }
          </DialogTitle>
          <DialogDescription className={styles.description}>
            {view === "login" 
              ? "Sign in to access your dashboard and manage your audits."
              : "Discover, share, and audit the best products in the world."}
          </DialogDescription>
        </DialogHeader>

        {!showEmailForm ? (
          <div className={styles.socialGrid}>
            <button className={styles.socialBtn} onClick={handleGoogleLogin}>
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              <span>Continue with Google</span>
            </button>
            <button className={styles.socialBtn} onClick={handleGithubLogin}>
              <img src="https://github.com/favicon.ico" alt="Github" />
              <span>Continue with Github</span>
            </button>
            <button className={styles.socialBtn} onClick={() => setShowEmailForm(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Continue with Email</span>
            </button>
          </div>
        ) : (
          <div className={styles.emailFormWrapper}>
            <button className={styles.backBtn} onClick={() => setShowEmailForm(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              All options
            </button>
            
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" autoFocus />
              </div>
              {view === "signup" && (
                <div className={styles.field}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              )}
              <div className={styles.field}>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              
              <Button className={styles.submitBtn}>
                {view === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </div>
        )}

        <div className={styles.footer}>
          {view === "login" ? (
            <>
              No account? <button onClick={() => { setView("signup"); setShowEmailForm(false); }} className={styles.link}>Create one</button>
            </>
          ) : (
            <>
              Already have an account? <button onClick={() => { setView("login"); setShowEmailForm(false); }} className={styles.link}>Sign in</button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
