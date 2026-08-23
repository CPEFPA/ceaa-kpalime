"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const [session, setSession] = useState<{ nomRole: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ceaa_session");
    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch {
        setSession(null);
      }
    }
  }, []);

  if (!session) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden md:block">
        <p className="text-xs text-slate-500">Connecté en tant que</p>
        <p className="text-sm font-semibold text-slate-900">{session.nomRole}</p>
      </div>
      <Link
        href="/deconnexion"
        className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-semibold"
      >
        Déconnexion
      </Link>
    </div>
  );
}