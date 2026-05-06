"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import styles from "../auth.module.css";

export default function SignupPage() {

  return (
    <div className={styles.container}>
      <Navbar  />
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="revvview" style={{ height: 32, width: 'auto', marginBottom: 12 }} />
          </Link>
          <h1 className={styles.title}>Create account</h1>
          <p className={styles.subtitle}>Join the revvview community today</p>
        </div>

        <div className={styles.socialAuth}>
          <button className={styles.socialBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className={styles.divider}>or</div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input type="text" className={styles.input} placeholder="John Doe" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} placeholder="name@example.com" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input type="password" className={styles.input} placeholder="••••••••" required />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Create Account
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
