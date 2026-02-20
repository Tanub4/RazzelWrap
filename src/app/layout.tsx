import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { CartProvider } from "@/context/CartContext";
import { CartNotification } from "@/components/layout/CartNotification";
import { CartSheet } from "@/components/features/cart/CartSheet";
import { MobileNav } from "@/components/layout/MobileNav";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Razzel Wrap - Premium Gift Wrapping",
  description: "Exquisite papers, ribbons, and boxes for every occasion.",
  icons: {
    icon: "/favicon.ico", // Or /icon.png
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ToastProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen pb-0">
              {children}
            </main>
            <Footer />
            <CartNotification />
            <CartSheet />
          </CartProvider>
        </ToastProvider>
        <MobileNav />
      </body>
    </html>
  );
}
