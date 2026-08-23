"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeconnexionPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("ceaa_session");
    const timer = setTimeout(() => {
      router.push("/");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Déconnexion réussie</h2>
        <p className="text-slate-600 mb-6">Vous avez été déconnecté avec succès.</p>
        <p className="text-sm text-slate-500">Redirection vers l'accueil dans quelques secondes...</p>
      </div>
    </main>
  );
}