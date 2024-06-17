"use client";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import CartProvider from "@/contexts/CartContext";

const josephin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uniconfort - Your Furniture Choice",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={josephin.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
