"use client";

import Link from "next/link";
import { useState } from "react";
import { coursEnLigne } from "@/data/apprenant";

export default function MesCoursPage() {
  const [filtre, setFiltre] = useState("TOUS");
  const [filtreModule, setFiltreModule] = useState("TOUS");

  const modules = Array.from(new Set(coursEnLigne.map(c => c.module)));

  const coursFiltres = coursEnLigne.filter(c => {
    const matchType = filtre === "TOUS" || c.type === filtre;
    const matchModule = filtreModule === "TOUS" || c.module === filtreModule;
    return matchType && matchModule;
  });

  const typeIcon = (type: string) => {
    const map: Record<string, string> = { VIDEO: "🎥", PDF: "📄", AUDIO: "🎵", EXERCICE: "✏️" };
    return map[type] || "📚";
  };

  const typeColor = (type: string) => {
    const map: Record<string, string> = {
      VIDEO: "bg-violet-100 text-violet-800",
      PDF: "bg-blue-100 text-blue-800",
      AUDIO: "bg-pink-100 text-pink-800",
      EXERCICE: "bg-amber-100 text-amber-800"
    };
    return map[type] || "bg-slate-100 text-slate-800";
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-violet-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center font-bold text-violet-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-violet-200">Mes cours en ligne</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/apprenant" className="text-violet-200 hover:text-white">Tableau de bord</Link>
            <Link href="/apprenant/cours" className="text-pink-400 font-semibold">Mes cours</Link>
            <Link href="/apprenant/devoirs" className="text-violet-200 hover:text-white">Devoirs</Link>
            <Link href="/apprenant/calendrier" className="text-violet-200 hover:text-white">Calendrier</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-3xl font-bold text-violet-900 mb-2">📚 Mes cours en ligne</h2>
        <p className="text-slate-600 mb-6">Accédez à vos ressources pédagogiques : vidéos, PDF, audios et exercices.</p>

        <div className="bg-white p-4 rounded-xl shadow border border-slate-100 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Type de ressource</label>
              <select value={filtre} onChange={(e) => setFiltre(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none">
                <option value="TOUS">Tous les types</option>
                <option value="VIDEO">🎥 Vidéos</option>
                <option value="PDF">📄 Documents PDF</option>
                <option value="AUDIO">🎵 Fichiers audio</option>
                <option value="EXERCICE">✏️ Exercices</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Module</label>
              <select value={filtreModule} onChange={(e) => setFiltreModule(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none">
                <option value="TOUS">Tous les modules</option>
                {modules.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {coursFiltres.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden hover:shadow-lg transition">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${typeColor(c.type)}`}>
                    {typeIcon(c.type)} {c.type}
                  </span>
                  {c.termine && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">✓ Terminé</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{c.titre}</h3>
                <p className="text-sm text-slate-600 mb-3">{c.description}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                  <span>📚 {c.module}</span>
                  <span>⏱ {c.duree}</span>
                </div>

                {!c.termine && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Progression</span>
                      <span className="font-semibold text-violet-800">{c.progression}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-violet-600 to-pink-600 h-2 rounded-full" style={{ width: `${c.progression}%` }}></div>
                    </div>
                  </div>
                )}

                <button className={`w-full py-2 font-semibold rounded-lg transition ${
                  c.termine 
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
                    : "bg-violet-800 text-white hover:bg-violet-700"
                }`}>
                  {c.termine ? "🔄 Revoir" : c.type === "VIDEO" ? "▶️ Regarder" : c.type === "PDF" ? "📄 Télécharger" : c.type === "AUDIO" ? "🎵 Écouter" : "✏️ Commencer"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {coursFiltres.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">Aucun cours ne correspond à vos filtres.</p>
          </div>
        )}
      </div>
    </main>
  );
}