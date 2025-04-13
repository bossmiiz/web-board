"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { logout as logoutService } from "@/services/auth.service";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  user: User | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: User) => {
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);
    // Store token in localStorage for persistence
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = async () => {
    try {
      if (token) {
        await logoutService(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      // Clear stored data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
