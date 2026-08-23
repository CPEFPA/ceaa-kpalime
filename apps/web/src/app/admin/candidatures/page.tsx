"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Candidature {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  formation: string;
  statut: string;
  dateCreation: string;
  typeCandidat: string;
}

export default function ListeCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("TOUS");
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await fetch("/api/candidates");
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des candidatures");
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setCandidatures(data);
        } else {
          console.error("L'API n'a pas renvoyé un tableau:", data);
          setError("Format de données invalide");
        }
        
        setLoading(false);
      } catch (error: any) {
        console.error("Erreur complète:", error);
        setError(error.message || "Erreur de connexion au serveur");
        setLoading(false);
      }
    };
    
    fetchCandidatures();
  }, []);

  const libelleStatut = (statut: string) => {
    const map: Record<string, string> = {
      DRAFT: "Brouillon", SUBMITTED: "Soumis", UNDER_REVIEW: "En examen",
      TEST_SCHEDULED: "Test programmé", TEST_DONE: "Test effectué", EVALUATED: "Évalué",
      ADMITTED: "Admis", REJECTED: "Non retenu", REORIENTED: "À réorienter", VALIDATED: "Validé"
    };
    return map[statut] || statut;
  };

  const couleurStatut = (statut: string) => {
    if (["ADMITTED", "VALIDATED"].includes(statut)) return "bg-green-100 text-green-800";
    if (["REJECTED", "REORIENTED"].includes(statut)) return "bg-red-100 text-red-800";
    if (["TEST_SCHEDULED", "TEST_DONE", "EVALUATED"].includes(statut)) return "bg-blue-100 text-blue-800";
    return "bg-amber-100 text-amber-800";
  };

  const candidaturesFiltrees = candidatures.filter(c => {
    const matchStatut = filtreStatut === "TOUS" || c.statut === filtreStatut;
    const matchRecherche = recherche === "" || 
      `${c.nom} ${c.prenom} ${c.email} ${c.ville}`.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchRecherche;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des candidatures...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ {error}</h2>
          <button onClick={() => window.location.reload()} className="text-indigo-600 hover:text-indigo-800">
            Réessayer
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-slate-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-slate-400">Espace Administration</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin" className="text-slate-300 hover:text-white">Tableau de bord</Link>
            <Link href="/admin/candidatures" className="text-amber-400 font-semibold">Candidatures</Link>
            <Link href="/admin/tests" className="text-slate-300 hover:text-white">Tests</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900">Gestion des candidatures</h2>
          <p className="text-slate-600">{candidaturesFiltrees.length} candidature(s) trouvée(s)</p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-4 rounded-xl shadow border border-slate-100 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Rechercher</label>
              <input
                type="text"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Nom, email, ville..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Statut</label>
              <select
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="TOUS">Tous les statuts</option>
                <option value="DRAFT">Brouillon</option>
                <option value="SUBMITTED">Soumis</option>
                <option value="EVALUATED">Évalué</option>
                <option value="ADMITTED">Admis</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Candidat</th>
                  <th className="px-4 py-3 text-left">Formation</th>
                  <th className="px-4 py-3 text-left">Ville</th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidaturesFiltrees.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium">{c.prenom} {c.nom}</div>
                      <div className="text-xs text-slate-500">{c.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{c.formation}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{c.ville}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${couleurStatut(c.statut)}`}>
                        {libelleStatut(c.statut)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{c.dateCreation}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/candidatures/${c.id}/evaluation`} className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold">
                        Évaluer →
                      </Link>
                    </td>
                  </tr>
                ))}
                {candidaturesFiltrees.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                      {candidatures.length === 0 
                        ? "Aucune candidature pour le moment. Les candidats inscrits apparaîtront ici."
                        : "Aucune candidature ne correspond aux filtres."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}