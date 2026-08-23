"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Bell from "@/components/Bell";
import { useAuth } from "@/hooks/useAuth";

export default function ApprenantDashboard() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({ devoirsARendre: 0, devoirsCorriges: 0, progression: 35 });

  useEffect(() => {
    const fetchStats = async () => {
      // Utiliser l'ID de l'apprenant connecté (à améliorer avec une vraie relation user->learner)
      const LEARNER_ID = "cmsy7cnao0006kslzcalhny7x"; // Kossi KODJO
      try {
        const response = await fetch(`/api/devoirs?learnerId=${LEARNER_ID}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setStats({
            devoirsARendre: data.filter((d: any) => d.statut === "A_RENDRE").length,
            devoirsCorriges: data.filter((d: any) => d.statut === "CORRIGE").length,
            progression: 35
          });
        }
      } catch (err) {
        console.error("Erreur stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-800 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-violet-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center font-bold text-violet-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-violet-200">Espace Apprenant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm">
              <Link href="/apprenant" className="text-pink-400 font-semibold">Tableau de bord</Link>
              <Link href="/apprenant/cours" className="text-violet-200 hover:text-white">Mes cours</Link>
              <Link href="/apprenant/devoirs" className="text-violet-200 hover:text-white">Devoirs</Link>
              <Link href="/apprenant/calendrier" className="text-violet-200 hover:text-white">Calendrier</Link>
            </nav>
            {user && <Bell userId={user.id} theme="violet" />}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-violet-900">
            Bonjour {user?.firstName || "Apprenant"} 🎵
          </h2>
          <p className="text-slate-600 mt-1">Continuez votre apprentissage musical !</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-6 rounded-xl shadow-lg">
            <p className="text-amber-100 text-sm">Devoirs à rendre</p>
            <p className="text-4xl font-bold mt-2">{stats.devoirsARendre}</p>
            <p className="text-xs text-amber-100 mt-2">À compléter cette semaine</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-green-200 text-sm">Devoirs corrigés</p>
            <p className="text-4xl font-bold mt-2">{stats.devoirsCorriges}</p>
            <p className="text-xs text-green-200 mt-2">Avec notes et appréciations</p>
          </div>
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-violet-200 text-sm">Progression globale</p>
            <p className="text-4xl font-bold mt-2">{stats.progression}%</p>
            <p className="text-xs text-violet-200 mt-2">De votre parcours</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/apprenant/cours" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📚</span>
                <h3 className="text-xl font-bold text-violet-900 group-hover:text-violet-700">Mes cours</h3>
              </div>
              <p className="text-sm text-slate-600">Accédez à vos vidéos, PDF et exercices pédagogiques.</p>
            </div>
          </Link>

          <Link href="/apprenant/devoirs" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📝</span>
                <h3 className="text-xl font-bold text-violet-900 group-hover:text-violet-700">Mes devoirs</h3>
              </div>
              <p className="text-sm text-slate-600">Consultez et rendez vos devoirs, voyez vos notes.</p>
            </div>
          </Link>

          <Link href="/apprenant/calendrier" className="group">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📅</span>
                <h3 className="text-xl font-bold text-violet-900 group-hover:text-violet-700">Mon calendrier</h3>
              </div>
              <p className="text-sm text-slate-600">Planifiez vos cours, répétitions et événements.</p>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-pink-500 to-violet-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🏆</span>
              <h3 className="text-xl font-bold">Votre progression</h3>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Niveau actuel</span>
                <span className="font-bold">Débutant</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-white h-3 rounded-full" style={{ width: `${stats.progression}%` }}></div>
              </div>
            </div>
            <p className="text-xs text-pink-100 mt-3">Continuez vos efforts pour passer au niveau Intermédiaire !</p>
          </div>
        </div>
      </div>
    </main>
  );
}