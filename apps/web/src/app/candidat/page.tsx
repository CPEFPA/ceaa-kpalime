"use client";

import Link from "next/link";
import { useState } from "react";

export default function CandidatDashboard() {
  // Simulation d'un dossier candidat (plus tard viendra de la base de données)
  const [dossier] = useState({
    nom: "KODJO",
    prenom: "Kossi",
    formation: "Formation Musicale - Guitare",
    statut: "TEST_SCHEDULED",
    dateTest: "2026-08-25",
    heureTest: "10h00",
    lieuTest: "CEAA Kpalimé - Salle A",
    notifications: [
      { id: 1, titre: "Convocation au test", message: "Votre test instrumental est programmé le 25/08/2026 à 10h00.", date: "Il y a 2h", nonLu: true },
      { id: 2, titre: "Dossier reçu", message: "Votre dossier a bien été soumis et est en cours d'examen.", date: "Il y a 3 jours", nonLu: false }
    ]
  });

  // Workflow complet des statuts (section 10 du cahier des charges)
  const workflow = [
    { key: "DRAFT", label: "Brouillon", icon: "📝" },
    { key: "SUBMITTED", label: "Dossier soumis", icon: "📤" },
    { key: "UNDER_REVIEW", label: "En cours d'examen", icon: "🔍" },
    { key: "TEST_SCHEDULED", label: "Test programmé", icon: "📅" },
    { key: "TEST_DONE", label: "Test effectué", icon: "✅" },
    { key: "EVALUATED", label: "Évaluation terminée", icon: "📊" },
    { key: "ADMITTED", label: "Admis", icon: "🎉" },
    { key: "VALIDATED", label: "Inscription validée", icon: "🎓" }
  ];

  const currentIndex = workflow.findIndex(s => s.key === dossier.statut);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* En-tête */}
      <header className="bg-indigo-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-indigo-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-indigo-200">Espace Candidat</p>
            </div>
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm hidden md:inline">Bonjour, {dossier.prenom}</span>
            <Link href="/" className="text-sm text-amber-400 hover:text-amber-300">Déconnexion</Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Titre */}
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Mon tableau de bord</h2>
        <p className="text-slate-600 mb-8">Suivez l'avancement de votre candidature en temps réel.</p>

        {/* Carte principale : suivi du dossier */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-slate-200">
            <div>
              <p className="text-sm text-slate-500">Formation demandée</p>
              <h3 className="text-xl font-bold text-indigo-900">{dossier.formation}</h3>
            </div>
            <div className="mt-3 md:mt-0">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 font-bold rounded-full text-sm">
                {workflow[currentIndex].icon} {workflow[currentIndex].label}
              </span>
            </div>
          </div>

          {/* Barre de progression du workflow */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Progression de votre dossier</h4>
            <div className="space-y-3">
              {workflow.map((step, i) => {
                const isDone = i < currentIndex;
                const isCurrent = i === currentIndex;
                const isFuture = i > currentIndex;
                return (
                  <div key={step.key} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isDone ? "bg-green-500 text-white" : 
                      isCurrent ? "bg-amber-500 text-indigo-900 ring-4 ring-amber-200" : 
                      "bg-slate-200 text-slate-400"
                    }`}>
                      {isDone ? "✓" : i + 1}
                    </div>
                    <span className={`text-sm ${isFuture ? "text-slate-400" : "text-slate-700 font-medium"}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Information sur le test si applicable */}
          {dossier.statut === "TEST_SCHEDULED" && (
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
              <h4 className="font-bold text-indigo-900 mb-2">📅 Votre test instrumental</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Date</p>
                  <p className="font-semibold">{dossier.dateTest}</p>
                </div>
                <div>
                  <p className="text-slate-500">Heure</p>
                  <p className="font-semibold">{dossier.heureTest}</p>
                </div>
                <div>
                  <p className="text-slate-500">Lieu</p>
                  <p className="font-semibold">{dossier.lieuTest}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Pensez à apporter votre instrument et une pièce d'identité.
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-4">🔔 Notifications</h3>
          <div className="space-y-3">
            {dossier.notifications.map(notif => (
              <div key={notif.id} className={`p-4 rounded-lg border ${notif.nonLu ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-900">{notif.titre}</h4>
                  <span className="text-xs text-slate-500">{notif.date}</span>
                </div>
                <p className="text-sm text-slate-600">{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
