import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";
import type { Session } from "next-auth";
import { auth } from "@/lib/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const marketingTitle = "StopTheTea™ – Online Exposure Removal Service";
const baseDescription =
  "We help students, creators, and individuals remove harmful online posts quickly and confidentially.";
const openGraphTitle = "StopTheTea™ – Exposure Removal Service";
const openGraphDescription =
  "Fast, confidential removal of harmful posts, screenshots, leaks, and defamation.";
const heroImage = "/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stopthetea.com"),
  title: marketingTitle,
  description: baseDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: openGraphTitle,
    description: openGraphDescription,
    url: "https://www.stopthetea.com",
    siteName: "StopTheTea",
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StopTheTea™ – Online Reputation Protection",
    description: "We remove harmful online posts quickly and confidentially.",
    images: [heroImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const shouldLoadMetaPixel = process.env.NODE_ENV === "production" && Boolean(metaPixelId);
  const navLinks = [
    { href: "#what-we-do", label: "What We Do" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "/tea-app-removal-guide", label: "Removal Steps" },
  ];

  let session: Session | null = null;
  try {
    session = await auth();
  } catch (error) {
    console.error("Layout session retrieval error:", error);
  }

  const isAuthenticated = Boolean(session?.user);
  const userDisplayName = session?.user?.name ?? session?.user?.email ?? "StopTheTea account";
  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ?? session?.user?.email?.[0]?.toUpperCase() ?? "S";
  const userImage = session?.user?.image ?? null;

  return (
    <html lang="en">
      <head>
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VZJXPE09HK"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VZJXPE09HK');
          `.replace(/\s{2,}/g, " ")}
        </Script>
        {shouldLoadMetaPixel && metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `.replace(/\s{2,}/g, " ")}
          </Script>
        )}
      </head>
      <body className={`${inter.className} bg-[#F4F6F8] text-[#1F2530] antialiased`}>
        {shouldLoadMetaPixel && metaPixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <header className="bg-[#0B1F3A] text-white border-b border-white/10">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/stopthetea-logo-transparent.png"
                alt="StopTheTea Logo"
                width={340}
                height={120}
                className="h-auto w-auto max-h-24"
                priority
              />
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-white/80 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-6 ml-auto">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  aria-label={`Open dashboard for ${userDisplayName}`}
                  className="flex items-center gap-3 text-white transition hover:text-[#38B7B0]"
                >
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={`${userDisplayName} avatar`}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border border-white/30 object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-semibold text-white">
                      {userInitial}
                    </span>
                  )}
                  <span className="text-sm font-semibold hidden sm:inline">Dashboard</span>
                </Link>
              ) : (
                <Link href="/signin" className="text-white transition hover:text-[#38B7B0]">
                  Sign In
                </Link>
              )}
              <Link
                href="/intake"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3A] transition hover:bg-[#38B7B0] hover:text-[#0B1F3A]"
              >
                Start Removal
              </Link>
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100vh-200px)] bg-[#F4F6F8]">{children}</main>
        <footer className="bg-[#0B1F3A] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <p className="font-semibold">StopTheTea™</p>
              <p className="text-white/70 text-xs">
                StopTheTea™ is not a law firm and does not provide legal advice. We assist clients with preparing and submitting
                content removal requests. For legal advice, please consult a licensed attorney.
              </p>
            </div>
            <div className="grid gap-6 text-white/80 md:text-right">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-white">Navigate</p>
                <div className="flex flex-wrap gap-4 md:justify-end">
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                  <Link href="/intake" className="transition hover:text-white">
                    Secure Checkout
                  </Link>
                  <Link href="/intake" className="transition hover:text-white">
                    Start Removal
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-white">Legal</p>
                <div className="flex flex-wrap gap-4 md:justify-end">
                  <Link href="/legal/terms" className="transition hover:text-white">
                    Terms of Service
                  </Link>
                  <Link href="/legal/privacy" className="transition hover:text-white">
                    Privacy Policy
                  </Link>
                  <Link href="/legal/refund" className="transition hover:text-white">
                    Refund Policy
                  </Link>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-white">Contact</p>
                <p>
                  Contact:{" "}
                  <a href="mailto:support@stopthetea.com" className="transition hover:text-white">
                    support@stopthetea.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 px-4 py-6">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Image src="/teacrateicon.png" alt="Tea crate icon" width={32} height={32} className="h-8 w-8" />
                <p>We’ve been stopping bad tea since 1773.</p>
              </div>
              <p className="text-xs text-[#3E4A56]">Guaranteed removal or your money back.</p>
              <p className="text-xs text-[#3E4A56]">StopTheTea™ is not affiliated with the Tea App, Apple, or any third-party platform.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
