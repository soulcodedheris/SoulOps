import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navigation } from "@/components/home/Navigation";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoulOps - Culturally-Relevant Mental Health Support",
  description:
    "Empowering underserved communities with culturally-relevant, accessible, and privacy-focused digital mental health solutions. Bridging the gap between traditional wisdom and modern technology.",
  keywords: [
    "mental health",
    "cultural adaptation",
    "digital wellness",
    "community support",
    "Nigeria",
    "Africa",
    "telemedicine",
  ],
  authors: [{ name: "SoulOps Team" }],
  creator: "SoulOps",
  publisher: "SoulOps",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://soulops.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SoulOps - Culturally-Relevant Mental Health Support",
    description:
      "Bridging the digital chasm for global mental health in underserved communities",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulOps - Culturally-Relevant Mental Health Support",
    description:
      "Bridging the digital chasm for global mental health in underserved communities",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* PWA meta tags */}
        <meta name="application-name" content="SoulOps" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SoulOps" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Accessibility */}
        <meta
          name="accessibility"
          content="high-contrast, large-text, voice-navigation"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <Navigation />
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <main className="flex-1 pt-16">{children}</main>
          </div>
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
