import { Metadata } from "next";
import BestPageClient from "./BestPageClient";

export const metadata: Metadata = {
  title: "Best Products — Revvview",
  description: "Explore the most loved and highest-rated products on Revvview, filtered by day, week, or month.",
};

export default function Page() {
  return <BestPageClient />;
}
