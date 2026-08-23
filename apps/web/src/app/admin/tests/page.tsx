"use client";

import Link from "next/link";
import { useState } from "react";
import { candidatures } from "@/data/candidatures";

export default function GestionTests() {
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: "T001",
      date: "2026-08-25",
      heure: "10h00",
      lieu: "CEAA Kpalimé - Salle A",
      instrument: "Guitare",
      evaluateur: "M. AGBEY",
      candidats: ["C001"]
    },
    {
      id: "T002",
      date: "2026-08-26",
      heure: "14h00",
      lieu: "CEAA Kpalimé - Salle Piano",
      instrument: "Piano",
      evaluateur: "Mme DOSSOU",
      candidats: ["C008"]
    }
  ]);

  const [newSession, setNewSession] = useState({
    date: "", heure: "", lieu: "", instrument: "", evaluateur: ""
  });

  const candidatsEligibles = candidatures.filter(c => 
    c.statut === "SUBMITTED" && c.typeCandidat === "INDIVIDUEL"
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `T${String(sessions.length + 1).padStart(3, "0")}`;
    setSessions([...sessions, { ...newSession, id: newId, candidats: [] }]);
    setShowForm(false);
    setNewSession({ date: "", heure: "", lieu: "", instrument: "", evaluateur: "" });
    alert("Session de test créée avec succès !");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-slate-900 font-sans pb-12">
      {/* En-tête admin */}
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
            <Link href="/admin/candidatures" className="text-slate-300 hover:text-white">Candidatures</Link>
            <Link href="/admin/tests" className="text-amber-400 font-semibold">Tests</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Titre + bouton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Gestion des tests musicaux</h2>
            <p className="text-slate-600">Planifiez les sessions et convoquez les candidats.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition shadow"
          >
            + Nouvelle session
          </button>
        </div>

        {/* Formulaire de création */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
            <h3 className="text-lg font-bold text-indigo-900 mb-4">Créer une nouvelle session de test</h3>
            <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                <input
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Heure</label>
                <input
                  type="time"
                  value={newSession.heure}
                  onChange={(e) => setNewSession({...newSession, heure: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Lieu</label>
                <input
                  type="text"
                  value={newSession.lieu}
                  onChange={(e) => setNewSession({...newSession, lieu: e.target.value})}
                  placeholder="Ex: CEAA Kpalimé - Salle A"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Instrument</label>
                <select
                  value={newSession.instrument}
                  onChange={(e) => setNewSession({...newSession, instrument: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="Guitare">Guitare</option>
                  <option value="Piano">Piano</option>
                  <option value="Batterie">Batterie</option>
                  <option value="Violon">Violon</option>
                  <option value="Chant">Chant</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Évaluateur</label>
                <input
                  type="text"
                  value={newSession.evaluateur}
                  onChange={(e) => setNewSession({...newSession, evaluateur: e.target.value})}
                  placeholder="Ex: M. AGBEY"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Annuler
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-900 text-white font-bold rounded-lg hover:bg-indigo-800">
                  Créer la session
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des sessions */}
        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map(s => (
            <div key={s.id} className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono text-slate-500">{s.id}</span>
                  <h3 className="text-lg font-bold text-indigo-900">{s.instrument}</h3>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                  {s.candidats.length} candidat(s)
                </span>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <p className="flex items-center gap-2"><span>📅</span> <strong>{s.date}</strong> à <strong>{s.heure}</strong></p>
                <p className="flex items-center gap-2"><span>📍</span> {s.lieu}</p>
                <p className="flex items-center gap-2"><span>👨‍🏫</span> Évaluateur : <strong>{s.evaluateur}</strong></p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-xs bg-indigo-900 text-white rounded hover:bg-indigo-800 font-semibold">
                  Convoquer
                </button>
                <button className="flex-1 py-2 text-xs border border-indigo-900 text-indigo-900 rounded hover:bg-indigo-50 font-semibold">
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Candidats en attente de test */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow border border-slate-100">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">⏳ Candidats en attente de convocation</h3>
          <div className="space-y-2">
            {candidatsEligibles.map(c => (
              <div key={c.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">{c.prenom} {c.nom}</p>
                  <p className="text-xs text-slate-500">{c.instrument} • {c.ville} • Dossier {c.id}</p>
                </div>
                <button className="px-3 py-1 text-xs bg-amber-500 text-slate-900 rounded font-semibold hover:bg-amber-400">
                  + Convoquer
                </button>
              </div>
            ))}
            {candidatsEligibles.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Aucun candidat en attente de convocation.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
