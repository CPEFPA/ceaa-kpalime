"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { evenements } from "@/data/apprenant";

export default function MonCalendrier() {
  const [moisActuel, setMoisActuel] = useState(new Date(2026, 7)); // Août 2026
  const [evenementSelectionne, setEvenementSelectionne] = useState<string | null>(null);

  const typeColor = (type: string) => {
    const map: Record<string, string> = {
      COURS: "bg-violet-500",
      DEVOIR: "bg-amber-500",
      EXAMEN: "bg-red-500",
      REPETITION: "bg-blue-500",
      EVENEMENT: "bg-green-500"
    };
    return map[type] || "bg-slate-500";
  };

  const typeColorLight = (type: string) => {
    const map: Record<string, string> = {
      COURS: "bg-violet-100 text-violet-800 border-violet-300",
      DEVOIR: "bg-amber-100 text-amber-800 border-amber-300",
      EXAMEN: "bg-red-100 text-red-800 border-red-300",
      REPETITION: "bg-blue-100 text-blue-800 border-blue-300",
      EVENEMENT: "bg-green-100 text-green-800 border-green-300"
    };
    return map[type] || "bg-slate-100 text-slate-800 border-slate-300";
  };

  const joursMois = useMemo(() => {
    const annee = moisActuel.getFullYear();
    const mois = moisActuel.getMonth();
    const premierJour = new Date(annee, mois, 1).getDay();
    const nbJours = new Date(annee, mois + 1, 0).getDate();
    const jours: (number | null)[] = [];
    for (let i = 0; i < premierJour; i++) jours.push(null);
    for (let i = 1; i <= nbJours; i++) jours.push(i);
    return jours;
  }, [moisActuel]);

  const getEvenementsDuJour = (jour: number) => {
    const annee = moisActuel.getFullYear();
    const mois = String(moisActuel.getMonth() + 1).padStart(2, "0");
    const jourStr = `${annee}-${mois}-${String(jour).padStart(2, "0")}`;
    return evenements.filter(e => e.date === jourStr);
  };

  const moisNom = moisActuel.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const moisPrecedent = () => setMoisActuel(new Date(moisActuel.getFullYear(), moisActuel.getMonth() - 1, 1));
  const moisSuivant = () => setMoisActuel(new Date(moisActuel.getFullYear(), moisActuel.getMonth() + 1, 1));

  const evenementsListes = [...evenements].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-violet-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center font-bold text-violet-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-violet-200">Mon calendrier</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/apprenant" className="text-violet-200 hover:text-white">Tableau de bord</Link>
            <Link href="/apprenant/cours" className="text-violet-200 hover:text-white">Mes cours</Link>
            <Link href="/apprenant/devoirs" className="text-violet-200 hover:text-white">Devoirs</Link>
            <Link href="/apprenant/calendrier" className="text-pink-400 font-semibold">Calendrier</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-violet-900 mb-2">📅 Mon calendrier</h2>
        <p className="text-slate-600 mb-6">Cours, devoirs, répétitions et événements à venir.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
              <div className="p-4 bg-violet-900 text-white flex justify-between items-center">
                <button onClick={moisPrecedent} className="p-2 hover:bg-violet-800 rounded">←</button>
                <h3 className="text-lg font-bold capitalize">{moisNom}</h3>
                <button onClick={moisSuivant} className="p-2 hover:bg-violet-800 rounded">→</button>
              </div>

              <div className="grid grid-cols-7 bg-slate-100 text-center text-xs font-semibold text-slate-600">
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(j => (
                  <div key={j} className="py-2">{j}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-px bg-slate-200">
                {joursMois.map((jour, i) => {
                  if (jour === null) return <div key={i} className="bg-slate-50 min-h-[80px]"></div>;
                  const evts = getEvenementsDuJour(jour);
                  return (
                    <div key={i} className="bg-white min-h-[80px] p-1 hover:bg-violet-50 transition cursor-pointer">
                      <p className="text-sm font-semibold text-slate-700 mb-1">{jour}</p>
                      <div className="space-y-0.5">
                        {evts.slice(0, 2).map(e => (
                          <div
                            key={e.id}
                            onClick={() => setEvenementSelectionne(e.id)}
                            className={`${typeColor(e.type)} text-white text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80`}
                          >
                            {e.titre}
                          </div>
                        ))}
                        {evts.length > 2 && (
                          <p className="text-xs text-slate-500 px-1">+{evts.length - 2} autre(s)</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-violet-500 rounded"></span> Cours</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded"></span> Devoir</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span> Examen</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded"></span> Répétition</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> Événement</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {evenementSelectionne ? (
              (() => {
                const evt = evenements.find(e => e.id === evenementSelectionne);
                if (!evt) return null;
                return (
                  <div className={`p-5 rounded-xl border-2 ${typeColorLight(evt.type)}`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${typeColorLight(evt.type)}`}>{evt.type}</span>
                      <button onClick={() => setEvenementSelectionne(null)} className="text-slate-500 hover:text-slate-700">✕</button>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{evt.titre}</h3>
                    <div className="space-y-2 text-sm">
                      <p>📅 <strong>{evt.date}</strong> à <strong>{evt.heure}</strong></p>
                      <p>⏱ Durée : {evt.duree}</p>
                      <p>📍 {evt.lieu}</p>
                      {evt.description && <p className="pt-2 border-t border-slate-200 text-slate-700">{evt.description}</p>}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-white p-5 rounded-xl shadow border border-slate-100">
                <h3 className="text-lg font-bold text-violet-900 mb-3">📋 Prochains événements</h3>
                <div className="space-y-3">
                  {evenementsListes.slice(0, 5).map(e => (
                    <div
                      key={e.id}
                      onClick={() => setEvenementSelectionne(e.id)}
                      className="p-3 bg-slate-50 rounded-lg hover:bg-violet-50 cursor-pointer transition border border-slate-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${typeColor(e.type)}`}></span>
                        <span className="text-xs font-semibold text-slate-600">{e.type}</span>
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">{e.titre}</p>
                      <p className="text-xs text-slate-500 mt-1">{e.date} • {e.heure}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}