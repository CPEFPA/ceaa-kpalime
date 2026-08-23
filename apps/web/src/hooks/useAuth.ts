"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("ceaa_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erreur parsing user:", e);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("ceaa_token");
    localStorage.removeItem("ceaa_user");
    setUser(null);
    window.location.href = "/connexion";
  };

  return { user, loading, logout };
}