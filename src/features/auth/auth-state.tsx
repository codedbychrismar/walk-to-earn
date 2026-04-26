import React, { createContext, useContext, useEffect, useState } from "react";

import { apiRequest } from "@/src/shared/services/api";

export type UserProfile = {
  userId: string;
  email: string | null;
  displayName: string;
  initials: string;
  rankTitle: string | null;
  currentRankNumber: number | null;
  pointsBalance: number;
  celoBalance: number;
  currentStreakDays: number;
  longestStreakDays: number;
  totalSteps: number;
  totalPoints: number;
  equippedShoe: {
    id: number;
    code: string;
    displayName: string;
    pointsMultiplier: number;
  } | null;
};

type AuthPayload = {
  token: string;
  user: UserProfile;
};

type AuthResponse = {
  data: AuthPayload;
};

type SettleWalkResponse = {
  data: {
    addedPoints: number;
    balanceAfter: number;
    profile: UserProfile;
  };
};

type AuthState = {
  isHydrating: boolean;
  token: string | null;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (displayName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  settleWalk: (payload: { steps: number; distanceKm: number; avgSpeedKmh: number }) => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);
const TOKEN_STORAGE_KEY = "walk-to-earn-auth-token";

function readStoredToken() {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function writeStoredToken(token: string) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

function clearStoredToken() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isHydrating, setIsHydrating] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const storedToken = readStoredToken();
      if (!storedToken) {
        setIsHydrating(false);
        return;
      }

      try {
        const response = await apiRequest<{ data: UserProfile }>("/auth/me", {
          token: storedToken,
        });
        if (cancelled) return;
        setToken(storedToken);
        setUser(response.data);
      } catch {
        clearStoredToken();
      } finally {
        if (!cancelled) setIsHydrating(false);
      }
    }

    hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email: string, password: string) {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(response.data.token);
    setUser(response.data.user);
    writeStoredToken(response.data.token);
  }

  async function register(displayName: string, email: string, password: string) {
    const response = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ displayName, email, password }),
    });
    setToken(response.data.token);
    setUser(response.data.user);
    writeStoredToken(response.data.token);
  }

  function logout() {
    setToken(null);
    setUser(null);
    clearStoredToken();
  }

  async function refreshProfile() {
    if (!token) return;
    try {
      const response = await apiRequest<{ data: UserProfile }>("/auth/me", { token });
      setUser(response.data);
    } catch (error) {
      logout();
      throw error;
    }
  }

  async function settleWalk(payload: { steps: number; distanceKm: number; avgSpeedKmh: number }) {
    if (!token) return;
    try {
      const response = await apiRequest<SettleWalkResponse>("/walk-sessions/settle", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
      setUser(response.data.profile);
    } catch (error) {
      console.warn("Failed to settle walk points", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isHydrating, token, user, login, register, logout, refreshProfile, settleWalk }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
