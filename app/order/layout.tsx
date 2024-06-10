import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/main/Navbar";

const josephin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passer votre commande",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
