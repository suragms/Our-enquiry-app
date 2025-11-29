import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HexaStack Solutions - Building Digital Excellence",
  description: "We create innovative web applications, mobile solutions, and AI-powered tools that transform your business ideas into reality. Expert development services in Kerala, India.",
  keywords: ["HexaStack Solutions", "Web Development", "Mobile Apps", "AI Solutions", "Kerala", "India", "Digital Transformation", "Software Development"],
  authors: [{ name: "HexaStack Solutions" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "HexaStack Solutions - Building Digital Excellence",
    description: "Transform your business ideas into reality with innovative web applications, mobile solutions, and AI-powered tools",
    url: "https://hexastack.solutions",
    siteName: "HexaStack Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HexaStack Solutions - Building Digital Excellence",
    description: "Transform your business ideas into reality with innovative web applications, mobile solutions, and AI-powered tools",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
