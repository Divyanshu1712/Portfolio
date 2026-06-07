import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: "Divyanshu Srivastava | Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Divyanshu Srivastava — Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, Python, and Blockchain. Building modern, functional, and beautiful web applications.",
  keywords: [
    "Divyanshu Srivastava",
    "Full Stack Developer",
    "UI/UX Designer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Python",
    "Blockchain",
    "IoT",
    "Portfolio",
    "Web Developer India",
  ],
  authors: [{ name: "Divyanshu Srivastava", url: "https://github.com/Divyanshu1712" }],
  creator: "Divyanshu Srivastava",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Divyanshu Srivastava | Full Stack Developer & UI/UX Designer",
    description:
      "Explore projects, skills, and experience of Divyanshu Srivastava — Full Stack Developer & UI/UX Designer.",
    siteName: "Divyanshu Srivastava Portfolio",
    images: [
      {
        url: "/Profile-avtar.jpg",
        width: 128,
        height: 128,
        alt: "Divyanshu Srivastava",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyanshu Srivastava | Full Stack Developer",
    description:
      "Full Stack Developer & UI/UX Designer — React, Next.js, Python, Blockchain.",
    creator: "@Divyans19896602",
    images: ["/Profile-avtar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          {/* <Analytics /> - Uncomment this after enabling Web Analytics in your Vercel Dashboard */}
        </ThemeProvider>
      </body>
    </html>
  );
}
