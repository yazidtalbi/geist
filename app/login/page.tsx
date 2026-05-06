"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import styles from "../auth.module.css";

export default function LoginPage() {

  return (
    <div className={styles.container}>
      <Navbar  />
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="revvview" style={{ height: 32, width: 'auto', marginBottom: 12 }} />
          </Link>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Log in to your revvview account</p>
        </div>

        <div className={styles.socialAuth}>
          <button className={styles.socialBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className={styles.divider}>or</div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} placeholder="name@example.com" required />
          </div>
          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className={styles.label}>Password</label>
              <Link href="#" className={styles.link} style={{ fontSize: 13, fontWeight: 500 }}>Forgot?</Link>
            </div>
            <input type="password" className={styles.input} placeholder="••••••••" required />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
        </form>

        <div className={styles.footer}>
          Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
