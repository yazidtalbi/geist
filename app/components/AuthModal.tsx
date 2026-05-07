"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Link from "next/link"
import styles from "./AuthModal.module.css"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialView?: "login" | "signup"
}

export function AuthModal({ open, onOpenChange, initialView = "login" }: AuthModalProps) {
  const [view, setView] = React.useState<"login" | "signup">(initialView)

  React.useEffect(() => {
    setView(initialView)
  }, [initialView, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.content}>
        <DialogHeader>
          <div className={styles.logoWrapper}>
            <img src="/logo.png" alt="revvview" className={styles.logo} />
          </div>
          <DialogTitle className={styles.title}>
            {view === "login" ? "Welcome back." : "Join the community."}
          </DialogTitle>
          <DialogDescription className={styles.description}>
            {view === "login" 
              ? "Sign in to access your dashboard and manage your audits."
              : "Discover, share, and audit the best products in the world."}
          </DialogDescription>
        </DialogHeader>

        <div className={styles.socialGrid}>
          <button className={styles.socialBtn}>
            <img src="https://www.google.com/favicon.ico" alt="Google" />
            <span>Continue with Google</span>
          </button>
          <button className={styles.socialBtn}>
            <img src="https://github.com/favicon.ico" alt="Github" />
            <span>Continue with Github</span>
          </button>
          <button className={styles.socialBtn}>
            <img src="https://x.com/favicon.ico" alt="X" />
            <span>Continue with X</span>
          </button>
        </div>

        <div className={styles.divider}>
          <span>or continue with email</span>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
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

        <div className={styles.footer}>
          {view === "login" ? (
            <>
              No account? <button onClick={() => setView("signup")} className={styles.link}>Create one</button>
            </>
          ) : (
            <>
              Already have an account? <button onClick={() => setView("login")} className={styles.link}>Sign in</button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
