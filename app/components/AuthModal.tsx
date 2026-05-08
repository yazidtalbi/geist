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
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20c0-1.33-.108-2.622-.303-3.917z" />
                <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.33-.108-2.622-.303-3.917z" />
              </svg>
              <span>Continue with Google</span>
            </button>
            <button className={styles.socialBtn} onClick={handleGithubLogin}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
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
