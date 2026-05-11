import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Revvview — Website Reviews for Founders",
  description: "Revvview is the review platform dedicated to the technical and aesthetic discipline of software, celebrating the talent of founders through high-fidelity design and logic audits",
  openGraph: {
    title: "Revvview — Website Reviews for Founders",
    description: "Revvview is the review platform dedicated to the technical and aesthetic discipline of software, celebrating the talent of founders through high-fidelity design and logic audits",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Revvview" }],
  },
  twitter: {
    title: "Revvview — Website Reviews for Founders",
    description: "Revvview is the review platform dedicated to the technical and aesthetic discipline of software, celebrating the talent of founders through high-fidelity design and logic audits",
    images: ["/og.jpg"],
  }
};

export default function Page() {
  return <HomeClient />;
}
