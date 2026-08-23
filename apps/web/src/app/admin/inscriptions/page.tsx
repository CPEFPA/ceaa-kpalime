"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  parcours: string;
  niveau: string | null;
  message: string | null;
  statut: string;
  createdAt: string;
}

export default function AdminInscriptionsPage() {
  // Initialisation TOUJOURS avec un tableau vide pour éviter .filter sur undefined
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatut, setFilterStatut] = useState("TOUS");
  const [filterParcours, setFilterParcours] = useState("TOUS");

  useEffect(() => {
    fetch("/api/admin/inscriptions")
      .then(async res => {
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
        const data = await res.json();
        // Sécurité: s'assurer que data est bien un tableau
        if (!Array.isArray(data)) throw new Error("Format de données invalide");
        return data;
      })
      .then(data => {
        setInscriptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtres dynamiques (sécurisés car inscriptions est toujours un Array)
  const filtered = inscriptions.filter(i => {
    if (filterStatut !== "TOUS" && i.statut !== filterStatut) return false;
    if (filterParcours !== "TOUS" && i.parcours !== filterParcours) return false;
    return true;
  });

  const parcoursList = [...new Set(inscriptions.map(i => i.parcours))];
  const statutsList = ["TOUS", "EN_ATTENTE", "CONFIRMEE", "REFUSEE"];

  const updateStatut = async (id: string, newStatut: string) => {
    try {
      const res = await fetch(`/api/admin/inscriptions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: newStatut }),
      });
      if (res.ok) {
        setInscriptions(prev => prev.map(i => i.id === id ? { ...i, statut: newStatut } : i));
      } else {
        alert("Impossible de mettre à jour le statut.");
      }
    } catch (err) {
      console.error("Erreur mise à jour statut:", err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-900 font-bold">Chargement des inscriptions...</div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <p className="text-red-600 font-bold mb-4">⚠️ {error}</p>
      <p className="text-slate-600 mb-6">Vérifiez que la migration Prisma a été appliquée et que l'API fonctionne.</p>
      <Link href="/admin/inscriptions" className="px-6 py-3 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition">Réessayer</Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 inline-block">← Retour à l'accueil</Link>
            <h1 className="text-3xl font-extrabold text-indigo-900">Panneau d'Administration</h1>
            <p className="text-slate-600 mt-1">{inscriptions.length} inscription(s) au total</p>
          </div>
          
          <div className="flex gap-3">
            <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)} className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:border-indigo-500 outline-none">
              {statutsList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterParcours} onChange={e => setFilterParcours(e.target.value)} className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:border-indigo-500 outline-none">
              <option value="TOUS">Tous les parcours</option>
              {parcoursList.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Nom & Prénom</th>
                  <th className="px-6 py-4 text-left font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left font-semibold">Parcours</th>
                  <th className="px-6 py-4 text-left font-semibold">Niveau</th>
                  <th className="px-6 py-4 text-left font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">Aucune inscription trouvée avec ces filtres.</td></tr>
                ) : (
                  filtered.map(i => (
                    <tr key={i.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(i.createdAt).toLocaleDateString("fr-FR")}</td>
                      <td className="px-6 py-4 font-medium text-indigo-900">{i.nom} {i.prenom}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">{i.email}</div>
                        <div className="text-xs text-slate-500">{i.telephone}</div>
                      </td>
                      <td className="px-6 py-4"><span className="inline-flex px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">{i.parcours}</span></td>
                      <td className="px-6 py-4 text-slate-600">{i.niveau || "-"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${
                          i.statut === "CONFIRMEE" ? "bg-green-100 text-green-700" :
                          i.statut === "REFUSEE" ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>{i.statut}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={i.statut} 
                          onChange={e => updateStatut(i.id, e.target.value)}
                          className="px-2 py-1 rounded border border-slate-300 text-xs bg-white focus:border-indigo-500 outline-none cursor-pointer"
                        >
                          {statutsList.filter(s => s !== "TOUS").map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}