import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SellerProvider } from "@/lib/seller-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PCB Exchange — Buy & Sell PCB Manufacturing Equipment",
  description:
    "Marketplace for PCB fabrication and assembly equipment. Browse drilling machines, plating lines, pick and place, AOI systems, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface font-sans text-gray-900 antialiased">
        <SellerProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </SellerProvider>
      </body>
    </html>
  );
}
