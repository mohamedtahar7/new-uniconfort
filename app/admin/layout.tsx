import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../globals.css";
import AdminNavbar from "@/components/admin/AdminNavbar";

const josephin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uniconfort - Admin Dashboard",
  description:
    "Admin dashboard for the E-commerce Store of Uniconfort Furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={josephin.className}>
        <main className="flex items-start">
          <AdminNavbar />
          {children}
        </main>
      </body>
    </html>
  );
}
