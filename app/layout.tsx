import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import NavigationHandler from "./components/NavigationHandler";

export const metadata: Metadata = {
  title: {
    default: "Revvview | Experience-Based Product Evaluation",
    template: "%s | Revvview"
  },
  description: "The definitive platform for community-driven product audits. Beyond shallow upvotes—real experience, real data, real truth.",
  keywords: ["product audits", "software reviews", "UX research", "brutalist design", "developer tools", "SaaS evaluation"],
  authors: [{ name: "Revvview Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://revvview.com",
    siteName: "Revvview",
    title: "Revvview | Experience-Based Product Evaluation",
    description: "Real audits, expert feedback, and the true quality of digital products.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Revvview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revvview | Product Truth Trends",
    description: "Where real users audit real digital products.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationHandler />
        <Navbar />
        <div className="page-wrapper">
          {children}
        </div>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
