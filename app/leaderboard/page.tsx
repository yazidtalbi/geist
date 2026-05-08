import { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Leaderboard — Revvview",
  description: "Recognizing excellence across the Revvview community. Top products and top reviewers ranked by the community.",
};

export default function Page() {
  return <LeaderboardClient />;
}
