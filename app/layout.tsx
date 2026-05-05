import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revvview - Experience-Based Evaluation - Best Product Truth Trends",
  description:
    "Where real users revvview real digital products. Get a product Truth score that goes beyond shallow upvotes.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
