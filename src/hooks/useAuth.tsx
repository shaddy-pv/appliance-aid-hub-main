import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type User = { id: string; email: string; fullName: string } | null;

interface AuthContextValue {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

async function request(path: string, init?: RequestInit) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const fullPath = path.startsWith('/') ? `${baseUrl}${path}` : path;
  const res = await fetch(fullPath, { credentials: "include", headers: { "Content-Type": "application/json" }, ...init });
  return res;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const [loading, setLoading] = React.useState(true);

  const refreshMe = React.useCallback(async () => {
    try {
      const res = await request("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = React.useCallback(async (email: string, password: string) => {
    try {
      const res = await request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Login failed with status ${res.status}`);
      }
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const register = React.useCallback(async (fullName: string, email: string, password: string) => {
    try {
      const res = await request("/api/auth/register", { method: "POST", body: JSON.stringify({ fullName, email, password }) });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Registration failed with status ${res.status}`);
      }
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  const logout = React.useCallback(async () => {
    await request("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = React.useMemo(() => ({ user, loading, login, register, logout, refreshMe }), [user, loading, login, register, logout, refreshMe]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useLoginRedirect(): (next: string) => void {
  const navigate = useNavigate();
  return (next: string) => navigate(`/login?next=${encodeURIComponent(next)}`);
}

export function useNextAfterLogin(): string {
  const [params] = useSearchParams();
  return params.get("next") || "/";
}


