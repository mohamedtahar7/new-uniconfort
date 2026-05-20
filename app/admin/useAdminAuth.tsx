"use client";
import React, { createContext, useContext, useState } from "react";

// 1. Initialize empty context container
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
});

// 2. Build explicit React wrapper provider setup
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Export custom hook safely out of Next.js routing scope
export const useAdminAuth = () => useContext(AuthContext);