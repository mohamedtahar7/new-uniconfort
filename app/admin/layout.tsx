import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../globals.css";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Toaster } from "sonner"; // Centered global toast mounting space

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
    <html lang="fr" className="h-full bg-slate-50/50">
      <body
        className={`${josephin.className} h-full antialiased text-[#0D2B45]`}
      >
        <div className="flex flex-col lg:flex-row min-h-screen relative w-full">
          {/* Dashboard Navigation Control Sidebar */}
          <AdminNavbar />

          {/* Dashboard Viewport Core Render Frame Workspace */}
          <main className="flex-1 w-full pt-24 lg:pt-0 lg:pl-64 xl:pl-72 min-h-screen transition-all duration-300">
            <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>

        {/* Global Toast Component Context Anchor */}
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
