import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "revvview — Experience-Based Product Evaluation",
  description:
    "Where real users audit real digital products. Get a UX Truth score that goes beyond shallow upvotes.",
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
