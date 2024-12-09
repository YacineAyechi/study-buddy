"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      document.cookie = `token=${token}; path=/`;
    } else {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const getAuthToken = () => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  const checkAuth = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setAuthToken(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthToken(null);
    }
    setLoading(false);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, checkAuth, logout, getAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
