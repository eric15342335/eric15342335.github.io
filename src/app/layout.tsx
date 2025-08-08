import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Eric15342335 | HKU AppliedAI Year 2",
  description: "I am a upcoming third year undergraduate at the University of Hong Kong, studying Applied Artificial Intelligence and Computer Science.",
  authors: [{ name: "Cheng Ho Ming, Eric", url: "https://eric15342335.github.io/" }],
  keywords: ["Eric", "Cheng Ho Ming", "HKU", "Applied AI", "Computer Science", "Blog"],
  openGraph: {
    title: "Eric15342335 | HKU AppliedAI Year 2",
    description: "Personal website and blog of Eric Cheng, HKU Applied AI student",
    url: "https://eric15342335.github.io",
    siteName: "Eric15342335",
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: "@eric15342335",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/font/Inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        
        {/* GoatCounter Analytics */}
        <Script
          src="/lib/count.js"
          data-goatcounter="https://eric310.goatcounter.com/count"
          strategy="afterInteractive"
        />
        
        {/* Site JavaScript */}
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
