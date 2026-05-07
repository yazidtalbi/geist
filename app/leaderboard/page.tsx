"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { products, users, getInitials } from "../lib/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import styles from "./page.module.css";

export default function LeaderboardPage() {
  const rankedProducts = [...products].sort((a, b) => b.revvScore - a.revvScore);
  const rankedUsers = [...users].sort((a, b) => b.reputation - a.reputation);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>The Leaderboard</h1>
              <p className={styles.subtitle}>Recognizing excellence across the community. Updated in real-time.</p>
            </div>

            <Tabs defaultValue="products" className={styles.tabs}>
              <TabsList>
                <TabsTrigger value="products">Top Products</TabsTrigger>
                <TabsTrigger value="users">Top Reviewers</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className={styles.tabContent}>
                <div className={styles.list}>
                  {rankedProducts.map((product, index) => (
                    <Link href={`/product/${product.id}`} key={product.id} className={styles.item}>
                      <div className={styles.rankCol}>
                        <span className={`${styles.rank} ${index < 3 ? styles[`rank${index + 1}`] : ""}`}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </span>
                      </div>
                      <div className={styles.identityCol}>
                        <div className={styles.imageBox}>
                          {product.logo ? (
                            <img src={product.logo} alt={product.name} className={styles.logo} />
                          ) : (
                            <div className={styles.placeholderLogo}>{product.name[0]}</div>
                          )}
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.name}>{product.name}</h3>
                          <p className={styles.tagline}>{product.tagline}</p>
                        </div>
                      </div>
                      <div className={styles.statsCol}>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{product.revvScore.toFixed(1)}</span>
                          <span className={styles.statLabel}>Score</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{product.reviewsTotal}</span>
                          <span className={styles.statLabel}>Reviews</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="users" className={styles.tabContent}>
                <div className={styles.list}>
                  {rankedUsers.map((user, index) => (
                    <Link href={`/profile/${user.id}`} key={user.id} className={styles.item}>
                      <div className={styles.rankCol}>
                        <span className={`${styles.rank} ${index < 3 ? styles[`rank${index + 1}`] : ""}`}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </span>
                      </div>
                      <div className={styles.identityCol}>
                        <div className={styles.avatarBox}>
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className={styles.avatar} />
                          ) : (
                            <div className={styles.placeholderAvatar}>{getInitials(user.name)}</div>
                          )}
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.name}>{user.name}</h3>
                          <p className={styles.tagline}>{user.role}</p>
                        </div>
                      </div>
                      <div className={styles.statsCol}>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{user.reputation.toLocaleString()}</span>
                          <span className={styles.statLabel}>XP</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statValue}>{user.revvvviewsCount}</span>
                          <span className={styles.statLabel}>Reviews</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </header>
        </div>
      </main>
    </>
  );
}
