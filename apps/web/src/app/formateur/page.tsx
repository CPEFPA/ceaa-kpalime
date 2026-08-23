"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Bell from "@/components/Bell";
import { useAuth } from "@/hooks/useAuth";

export default function FormateurDashboard() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({ apprenants: 0, devoirsACorriger: 0, presencesCeMois: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [apprenantsRes, devoirsRes] = await Promise.all([
          fetch("/api/learners"),
          fetch("/api/devoirs/corriger/liste")
        ]);
        
        const apprenants = await apprenantsRes.json();
        const devoirs = await devoirsRes.json();
        
        setStats({
          apprenants: Array.isArray(apprenants) ? apprenants.length : 0,
          devoirsACorriger: Array.isArray(devoirs) ? devoirs.length : 0,
          presencesCeMois: 0
        });
      } catch (err) {
        console.error("Erreur stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-emerald-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-emerald-900 text-xl">🎓</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-emerald-200">Espace Formateur</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm">
              <Link href="/formateur" className="text-amber-400 font-semibold">Tableau de bord</Link>
              <Link href="/formateur/apprenants" className="text-emerald-200 hover:text-white">Apprenants</Link>
              <Link href="/formateur/cours" className="text-emerald-200 hover:text-white">Mes cours</Link>
              <Link href="/formateur/presences" className="text-emerald-200 hover:text-white">Présences</Link>
              <Link href="/formateur/devoirs" className="text-emerald-200 hover:text-white">Devoirs</Link>
            </nav>
            {user && <Bell userId={user.id} theme="emerald" />}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-900">
            Bonjour {user?.firstName || "Formateur"} 👋
          </h2>
          <p className="text-slate-600 mt-1">Voici un aperçu de votre activité pédagogique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-emerald-200 text-sm">Mes apprenants</p>
            <p className="text-4xl font-bold mt-2">{stats.apprenants}</p>
            <p className="text-xs text-emerald-200 mt-2">Suivis cette année</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-amber-200 text-sm">Devoirs à corriger</p>
            <p className="text-4xl font-bold mt-2">{stats.devoirsACorriger}</p>
            <p className="text-xs text-amber-200 mt-2">En attente de correction</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-indigo-200 text-sm">Présences ce mois</p>
            <p className="text-4xl font-bold mt-2">{stats.presencesCeMois}</p>
            <p className="text-xs text-indigo-200 mt-2">Appels enregistrés</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/formateur/apprenants" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">👥</span>
                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700">Mes apprenants</h3>
              </div>
              <p className="text-sm text-slate-600">Consultez la liste de vos apprenants et suivez leur progression.</p>
            </div>
          </Link>

          <Link href="/formateur/presences" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">✅</span>
                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700">Faire l'appel</h3>
              </div>
              <p className="text-sm text-slate-600">Enregistrez les présences et absences de vos cours.</p>
            </div>
          </Link>

          <Link href="/formateur/devoirs" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📝</span>
                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700">Corriger les devoirs</h3>
              </div>
              <p className="text-sm text-slate-600">Consultez les devoirs rendus et attribuez des notes.</p>
            </div>
          </Link>

          <Link href="/formateur/cours" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📚</span>
                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700">Mes cours</h3>
              </div>
              <p className="text-sm text-slate-600">Gérez vos cours, vidéos et supports pédagogiques.</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}