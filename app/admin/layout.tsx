"use client";
import React, { createContext, useContext, useState } from "react";
// Import your sidebar component here (adjust path if needed)
import AdminNavbar from "@/components/admin/AdminNavbar";

// Create a simple login state context
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);

  // IF NOT LOGGED IN: Render ONLY the page content (the login form) - No Sidebar!
  if (!isAuthenticated) {
    return (
      <AuthContext.Provider value={{ isAuthenticated, login }}>
        <div className="min-h-screen bg-[#FBFBFB]">{children}</div>
      </AuthContext.Provider>
    );
  }

  // IF LOGGED IN: Render the complete dashboard dashboard workspace with the sidebar layout
  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
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
    </AuthContext.Provider>
  );
}

// Custom hook to quickly call auth inside child views
export const useAdminAuth = () => useContext(AuthContext);
