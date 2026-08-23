"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Apprenant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  instrument: string;
  niveau: string;
  groupe: string;
  progression: number;
  presenceRate: number;
  dernierCours: string;
}

export default function ListeApprenantsFormateur() {
  const [apprenants, setApprenants] = useState<Apprenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprenants = async () => {
      try {
        const response = await fetch("/api/learners");
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();
        if (Array.isArray(data)) {
          setApprenants(data);
        }
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les apprenants.");
        setLoading(false);
      }
    };
    fetchApprenants();
  }, []);

  const niveauColor = (niveau: string) => {
    const map: Record<string, string> = {
      DEBUTANT: "bg-blue-100 text-blue-800",
      BEGINNER: "bg-blue-100 text-blue-800",
      INTERMEDIAIRE: "bg-amber-100 text-amber-800",
      INTERMEDIATE: "bg-amber-100 text-amber-800",
      AVANCE: "bg-purple-100 text-purple-800",
      ADVANCED: "bg-purple-100 text-purple-800",
      PERFECTIONNEMENT: "bg-red-100 text-red-800",
      PERFECTING: "bg-red-100 text-red-800"
    };
    return map[niveau.toUpperCase()] || "bg-slate-100 text-slate-800";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des apprenants...</p>
        </div>
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
              <p className="text-xs text-emerald-200">Mes apprenants</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/formateur" className="text-emerald-200 hover:text-white">Tableau de bord</Link>
            <Link href="/formateur/apprenants" className="text-amber-400 font-semibold">Apprenants</Link>
            <Link href="/formateur/cours" className="text-emerald-200 hover:text-white">Mes cours</Link>
            <Link href="/formateur/presences" className="text-emerald-200 hover:text-white">Présences</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">Mes apprenants</h2>
        <p className="text-slate-600 mb-8">{apprenants.length} apprenant(s) suivi(s) cette année</p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <p className="text-red-800 font-semibold">❌ {error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apprenants.map(a => (
            <Link key={a.id} href={`/formateur/apprenants/${a.id}`} className="group">
              <div className="bg-white p-5 rounded-xl shadow border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition duration-300 h-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition">{a.prenom} {a.nom}</h3>
                    <p className="text-xs text-slate-500">🎵 {a.instrument} • {a.groupe}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${niveauColor(a.niveau)}`}>
                    {a.niveau}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progression</span>
                    <span className="font-semibold text-emerald-800">{a.progression}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${a.progression}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span>📅 Dernier cours : {a.dernierCours}</span>
                  <span className={a.presenceRate >= 80 ? "text-green-600" : "text-amber-600"}>
                    ✅ Présence : {a.presenceRate}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {apprenants.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-100">
              Aucun apprenant assigné pour le moment.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}