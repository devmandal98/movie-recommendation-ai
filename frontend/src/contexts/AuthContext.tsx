import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "http://127.0.0.1:8000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore token on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  // ✅ OAuth2-compliant login
  const signIn = async (email: string, password: string) => {
    const form = new URLSearchParams();
    form.append("username", email); // OAuth2 expects "username"
    form.append("password", password);

    const res = await axios.post(
      `${API_BASE}/auth/login`,
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = res.data.access_token;
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };

  // ✅ Register (query params accepted by backend)
  const signUp = async (email: string, password: string) => {
    await axios.post(`${API_BASE}/auth/register`, null, {
      params: { email, password },
    });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
