import type { Metadata } from "next";
import { Noto_Sans_TC, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const NOTO_SANS_TC = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
});

const GEIST_MONO = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${process.env.PUBLIC_TITLE}`,
    default: process.env.PUBLIC_TITLE || "Hi Yang",
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
    title: process.env.PUBLIC_TITLE || "Hi Yang",
    description:
      "一名打滾了幾年的前端工程師，這裡是我紀錄一些自己的學習筆記，以及一些技術內容分享，還有些日常雜談的地方。",
    url: BASE_URL,
    siteName: process.env.PUBLIC_TITLE || "Hi Yang",
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.PUBLIC_TITLE || "Hi Yang",
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
      <body
        className={`${NOTO_SANS_TC.variable} ${GEIST_MONO.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
