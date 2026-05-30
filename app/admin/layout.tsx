"use client";
import React from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { AdminAuthProvider, useAdminAuth } from "./useAdminAuth";
import { Toaster } from "sonner";

// We create an internal layout template view inside the provider layer
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();

  // IF NOT LOGGED IN: Render ONLY the page view form framework
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBFBFB]">
        <Toaster position="bottom-right" />
        {children}
      </div>
    );
  }

  // IF LOGGED IN: Render the complete dashboard dashboard workspace with the sidebar layout
  return (
    <div className="min-h-screen flex bg-[#FBFBFB]">
      {/* Sidebar Navigation */}
      <div className="fixed inset-y-0 left-0 w-64 z-30">
        <AdminNavbar />
      </div>

      {/* Main Content Workspace Frame */}
      <div className="flex-1 lg:pl-64 min-w-0">
        <main className="p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}

// Clean Default Layout wrapper conforming strictly to Next.js requirements
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <LayoutContent>
        <Toaster position="bottom-right" />
        {children}
      </LayoutContent>
    </AdminAuthProvider>
  );
}
