"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Statut = "PRESENT" | "ABSENT" | "RETARD" | null;

interface Apprenant {
  id: string;
  nom: string;
  prenom: string;
  instrument: string;
  groupe: string;
}

export default function GestionPresencesFormateur() {
  const [apprenants, setApprenants] = useState<Apprenant[]>([]);
  const [coursId, setCoursId] = useState("COURS_GENERIQUE");
  const [dateCours, setDateCours] = useState(new Date().toISOString().split("T")[0]);
  const [presences, setPresences] = useState<Record<string, Statut>>({});
  const [enregistre, setEnregistre] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprenants = async () => {
      try {
        const response = await fetch("/api/learners");
        const data = await response.json();
        if (Array.isArray(data)) setApprenants(data);
      } catch (err) {
        console.error("Erreur chargement apprenants", err);
      }
    };
    fetchApprenants();
  }, []);

  const setStatut = (apprenantId: string, statut: Statut) => {
    setPresences({ ...presences, [apprenantId]: statut });
    setEnregistre(false);
  };

  const marquerTousPresents = () => {
    const newPresences: Record<string, Statut> = {};
    apprenants.forEach(a => { newPresences[a.id] = "PRESENT"; });
    setPresences(newPresences);
    setEnregistre(false);
  };

  const stats = {
    presents: Object.values(presences).filter(s => s === "PRESENT").length,
    absents: Object.values(presences).filter(s => s === "ABSENT").length,
    retards: Object.values(presences).filter(s => s === "RETARD").length,
    nonMarques: apprenants.length - Object.keys(presences).length
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      courseId: coursId,
      date: dateCours,
      presences: Object.entries(presences).map(([learnerId, statut]) => ({
        learnerId,
        statut: statut || "ABSENT"
      }))
    };

    try {
      const response = await fetch("/api/presences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
      
      setEnregistre(true);
      setLoading(false);
    } catch (err) {
      setError("Impossible de sauvegarder les présences.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-emerald-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-emerald-900 text-xl">🎓</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-emerald-200">Appel de présence</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/formateur" className="text-emerald-200 hover:text-white">Tableau de bord</Link>
            <Link href="/formateur/apprenants" className="text-emerald-200 hover:text-white">Apprenants</Link>
            <Link href="/formateur/cours" className="text-emerald-200 hover:text-white">Mes cours</Link>
            <Link href="/formateur/presences" className="text-amber-400 font-semibold">Présences</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">✅ Appel de présence</h2>
        <p className="text-slate-600 mb-6">Sélectionnez un cours et marquez la présence de chaque apprenant.</p>

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date du cours</label>
                <input 
                  type="date" 
                  value={dateCours} 
                  onChange={(e) => { setDateCours(e.target.value); setPresences({}); setEnregistre(false); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Cours / Groupe</label>
                <select 
                  value={coursId} 
                  onChange={(e) => { setCoursId(e.target.value); setPresences({}); setEnregistre(false); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="COURS_GENERIQUE">Cours de groupe (Général)</option>
                  <option value="GUIT-DEB-A">Guitare Débutant A</option>
                  <option value="GUIT-INT-B">Guitare Intermédiaire B</option>
                  <option value="ENS-ADV">Ensemble Avancé</option>
                </select>
              </div>
            </div>
          </div>

          {enregistre && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
              <p className="text-green-800 font-semibold">✅ Présences enregistrées avec succès dans la base de données !</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-red-800 font-semibold">❌ {error}</p>
            </div>
          )}

          {apprenants.length > 0 && (
            <div className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Liste d'appel ({apprenants.length})</h3>
                <button
                  type="button"
                  onClick={marquerTousPresents}
                  className="text-xs bg-emerald-700 text-white px-3 py-1 rounded hover:bg-emerald-600 font-semibold"
                >
                  ✓ Tous présents
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {apprenants.map(a => {
                  const statut = presences[a.id];
                  return (
                    <div key={a.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <p className="font-semibold text-slate-900">{a.prenom} {a.nom}</p>
                        <p className="text-xs text-slate-500">{a.instrument} • {a.groupe}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setStatut(a.id, "PRESENT")} className={`px-3 py-1 text-xs rounded-full font-semibold transition ${statut === "PRESENT" ? "bg-green-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-green-100"}`}>✓ Présent</button>
                        <button type="button" onClick={() => setStatut(a.id, "RETARD")} className={`px-3 py-1 text-xs rounded-full font-semibold transition ${statut === "RETARD" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-amber-100"}`}>⏰ Retard</button>
                        <button type="button" onClick={() => setStatut(a.id, "ABSENT")} className={`px-3 py-1 text-xs rounded-full font-semibold transition ${statut === "ABSENT" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-red-100"}`}>✗ Absent</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="grid grid-cols-4 gap-2 mb-4 text-center text-xs">
                  <div className="bg-green-100 text-green-800 p-2 rounded"><p className="font-bold text-lg">{stats.presents}</p><p>Présents</p></div>
                  <div className="bg-amber-100 text-amber-800 p-2 rounded"><p className="font-bold text-lg">{stats.retards}</p><p>Retards</p></div>
                  <div className="bg-red-100 text-red-800 p-2 rounded"><p className="font-bold text-lg">{stats.absents}</p><p>Absents</p></div>
                  <div className="bg-slate-100 text-slate-800 p-2 rounded"><p className="font-bold text-lg">{stats.nonMarques}</p><p>Non marqués</p></div>
                </div>

                <button
                  type="submit"
                  disabled={loading || stats.nonMarques > 0}
                  className="w-full py-3 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Sauvegarde en cours..." : (stats.nonMarques > 0 ? `Il reste ${stats.nonMarques} apprenant(s) à marquer` : "✓ Enregistrer l'appel en base de données")}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}