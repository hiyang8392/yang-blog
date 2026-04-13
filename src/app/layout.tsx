import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const NOTO_SANS_TC = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: false,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_TITLE}`,
    default: process.env.NEXT_PUBLIC_TITLE || "Hi Yang",
  },
  description:
    "一名打滾了幾年的前端工程師，這裡是我紀錄一些自己的學習筆記，以及一些技術內容分享，還有些日常雜談的地方。",
  keywords: [
    "Web Development",
    "Frontend",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "Guitar",
    "Music",
    "Travel",
    "Life",
    "Blog",
  ],
  openGraph: {
    title: process.env.NEXT_PUBLIC_TITLE || "Hi Yang",
    description:
      "一名打滾了幾年的前端工程師，這裡是我紀錄一些自己的學習筆記，以及一些技術內容分享，還有些日常雜談的地方。",
    url: BASE_URL,
    siteName: process.env.NEXT_PUBLIC_TITLE || "Hi Yang",
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_TITLE || "Hi Yang",
    description:
      "一名打滾了幾年的前端工程師，這裡是我紀錄一些自己的學習筆記，以及一些技術內容分享，還有些日常雜談的地方。",
    creator: "@yang78392",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", NOTO_SANS_TC.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="mx-auto px-6 w-full max-w-3xl flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
