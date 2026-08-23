"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Bell from "@/components/Bell";

interface Stats {
  candidatures: {
    total: number;
    parStatut: Record<string, number>;
  };
  apprenants: {
    total: number;
    parNiveau: Record<string, number>;
    parInstrument: Array<{ instrument: string; count: number }>;
  };
  presences: {
    total: number;
    presents: number;
    retards: number;
    absents: number;
    taux: number;
  };
  devoirs: {
    total: number;
    parStatut: Record<string, number>;
  };
  evaluations: {
    total: number;
    moyenneGenerale: number;
    niveauxProposes: Record<string, number>;
  };
  formateurs: number;
  communes: number;
  dernieresCandidatures: Array<{
    id: string;
    nom: string;
    email: string;
    date: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ID de l'admin connecté (à remplacer plus tard par le vrai user connecté)
  const ADMIN_ID = "cmr123admin"; // ID de démo pour l'admin

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les statistiques.");
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const libelleStatut = (statut: string) => {
    const map: Record<string, string> = {
      DRAFT: "Brouillon",
      SUBMITTED: "Soumis",
      UNDER_REVIEW: "En examen",
      TEST_SCHEDULED: "Test programmé",
      TEST_DONE: "Test effectué",
      EVALUATED: "Évalué",
      ADMITTED: "Admis",
      REJECTED: "Non retenu",
      REORIENTED: "À réorienter",
      VALIDATED: "Validé"
    };
    return map[statut] || statut;
  };

  const couleurStatut = (statut: string) => {
    if (["ADMITTED", "VALIDATED"].includes(statut)) return "bg-green-500";
    if (["REJECTED", "REORIENTED"].includes(statut)) return "bg-red-500";
    if (["EVALUATED", "TEST_DONE"].includes(statut)) return "bg-blue-500";
    if (["TEST_SCHEDULED", "UNDER_REVIEW"].includes(statut)) return "bg-purple-500";
    return "bg-amber-500";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des statistiques...</p>
        </div>
      </main>
    );
  }

  if (error || !stats) {
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

  const maxInstrument = Math.max(...stats.apprenants.parInstrument.map(i => i.count), 1);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-indigo-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-indigo-900 text-xl">👨‍💼</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-indigo-200">Tableau de bord - Statistiques en temps réel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm">
              <Link href="/admin" className="text-amber-400 font-semibold">Tableau de bord</Link>
              <Link href="/admin/candidatures" className="text-indigo-200 hover:text-white">Candidatures</Link>
              <Link href="/admin/tests" className="text-indigo-200 hover:text-white">Tests</Link>
            </nav>
            <Bell userId={ADMIN_ID} theme="indigo" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">📊 Vue d'ensemble</h2>
        <p className="text-slate-600 mb-8">Statistiques en temps réel de la plateforme CEAA Kpalimé</p>

        {/* Cartes principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-indigo-200 text-sm">Candidats</p>
            <p className="text-4xl font-bold">{stats.candidatures.total}</p>
            <p className="text-xs text-indigo-200 mt-2">Total inscrits</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-emerald-200 text-sm">Apprenants</p>
            <p className="text-4xl font-bold">{stats.apprenants.total}</p>
            <p className="text-xs text-emerald-200 mt-2">Admis en formation</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-amber-200 text-sm">Formateurs</p>
            <p className="text-4xl font-bold">{stats.formateurs}</p>
            <p className="text-xs text-amber-200 mt-2">Équipe pédagogique</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-xl shadow-lg">
            <p className="text-purple-200 text-sm">Taux de présence</p>
            <p className="text-4xl font-bold">{stats.presences.taux}%</p>
            <p className="text-xs text-purple-200 mt-2">{stats.presences.total} présences enregistrées</p>
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Candidatures par statut */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">📋 Candidatures par statut</h3>
            <div className="space-y-3">
              {Object.entries(stats.candidatures.parStatut).map(([statut, count]) => {
                const pourcentage = stats.candidatures.total > 0 ? (count / stats.candidatures.total) * 100 : 0;
                return (
                  <div key={statut}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{libelleStatut(statut)}</span>
                      <span className="text-slate-500">{count} ({Math.round(pourcentage)}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`${couleurStatut(statut)} h-2 rounded-full transition-all`} style={{ width: `${pourcentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(stats.candidatures.parStatut).length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Aucune candidature pour le moment</p>
              )}
            </div>
          </div>

          {/* Apprenants par instrument */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">🎵 Apprenants par instrument</h3>
            <div className="space-y-3">
              {stats.apprenants.parInstrument.map((item) => {
                const pourcentage = (item.count / maxInstrument) * 100;
                return (
                  <div key={item.instrument}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{item.instrument}</span>
                      <span className="text-slate-500">{item.count} apprenant(s)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all" style={{ width: `${pourcentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {stats.apprenants.parInstrument.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Aucun apprenant pour le moment</p>
              )}
            </div>
          </div>
        </div>

        {/* Évaluations et Devoirs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Évaluations */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">🎯 Évaluations</h3>
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Moyenne générale</p>
              <p className="text-5xl font-bold text-indigo-800">{stats.evaluations.moyenneGenerale}<span className="text-2xl text-slate-400">/20</span></p>
              <p className="text-xs text-slate-500 mt-2">{stats.evaluations.total} évaluation(s) effectuée(s)</p>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm font-semibold text-slate-700 mb-2">Niveaux attribués</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(stats.evaluations.niveauxProposes).map(([niveau, count]) => {
                  const labels: Record<string, string> = {
                    BEGINNER: "Débutant",
                    INTERMEDIATE: "Intermédiaire",
                    ADVANCED: "Avancé",
                    PERFECTING: "Perfectionnement"
                  };
                  return (
                    <div key={niveau} className="bg-slate-50 p-2 rounded text-center">
                      <p className="text-xs text-slate-600">{labels[niveau] || niveau}</p>
                      <p className="text-lg font-bold text-indigo-800">{count}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Devoirs */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">📝 Devoirs</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-amber-800">{stats.devoirs.parStatut.A_RENDRE || 0}</p>
                <p className="text-xs text-amber-700">À rendre</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-800">{stats.devoirs.parStatut.RENDU || 0}</p>
                <p className="text-xs text-blue-700">Rendus</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-800">{stats.devoirs.parStatut.CORRIGE || 0}</p>
                <p className="text-xs text-green-700">Corrigés</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-red-800">{stats.devoirs.parStatut.EN_RETARD || 0}</p>
                <p className="text-xs text-red-700">En retard</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center">{stats.devoirs.total} devoir(s) au total</p>
          </div>
        </div>

        {/* Présences */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-8">
          <h3 className="text-xl font-bold text-indigo-900 mb-4">✅ Statistiques de présence</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-800">{stats.presences.presents}</p>
              <p className="text-xs text-green-700">Présents</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-amber-800">{stats.presences.retards}</p>
              <p className="text-xs text-amber-700">Retards</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-800">{stats.presences.absents}</p>
              <p className="text-xs text-red-700">Absents</p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Taux de présence global</span>
              <span className="font-bold text-indigo-800">{stats.presences.taux}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all" style={{ width: `${stats.presences.taux}%` }}></div>
            </div>
          </div>
        </div>

        {/* Dernières candidatures */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-4">🕐 Dernières inscriptions</h3>
          <div className="space-y-3">
            {stats.dernieresCandidatures.map(c => (
              <div key={c.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                <div>
                  <p className="font-semibold text-slate-900">{c.nom}</p>
                  <p className="text-xs text-slate-500">{c.email}</p>
                </div>
                <p className="text-xs text-slate-500">{c.date}</p>
              </div>
            ))}
            {stats.dernieresCandidatures.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Aucune inscription récente</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}