"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CandidatData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  instrument: string;
  formation: string;
  statut: string;
  dateTest: string | null;
  heureTest: string | null;
  lieuTest: string | null;
  evaluateur: string;
  evaluation: {
    notes: Record<string, number>;
    observations: string | null;
    proposedLevel: string | null;
    finalLevel: string | null;
  } | null;
}

export default function FicheEvaluation({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // Lecture directe pour les composants Client
  
  const [candidat, setCandidat] = useState<CandidatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [notes, setNotes] = useState({
    technique: 0, justesse: 0, rythme: 0, lecture: 0, oreille: 0,
    interpretation: 0, expression: 0, motivation: 0, experience: 0
  });

  const [observations, setObservations] = useState("");
  const [niveauFinal, setNiveauFinal] = useState("");

  // Charger les données du candidat depuis l'API
  useEffect(() => {
    const fetchCandidat = async () => {
      try {
        const response = await fetch(`/api/candidatures/${id}`);
        if (!response.ok) {
          setError("Candidat non trouvé dans la base de données.");
          setLoading(false);
          return;
        }
        const data = await response.json();
        setCandidat(data);
        
        // Si une évaluation existe déjà, pré-remplir les champs
        if (data.evaluation) {
          setNotes(data.evaluation.notes);
          setObservations(data.evaluation.observations || "");
          setNiveauFinal(data.evaluation.finalLevel || "");
        }
        
        setLoading(false);
      } catch (err) {
        setError("Erreur de connexion au serveur.");
        setLoading(false);
      }
    };

    fetchCandidat();
  }, [id]);

  const handleChange = (critere: string, value: number) => {
    setNotes({ ...notes, [critere]: value });
    setSuccess(false);
  };

  // Calcul automatique du niveau proposé
  const niveauPropose = useMemo(() => {
    const valeurs = Object.values(notes);
    const moyenne = valeurs.reduce((sum, v) => sum + v, 0) / valeurs.length;
    
    if (moyenne >= 16) return { niveau: "PERFECTING", label: "Perfectionnement", color: "bg-red-100 text-red-800" };
    if (moyenne >= 12) return { niveau: "ADVANCED", label: "Avancé", color: "bg-purple-100 text-purple-800" };
    if (moyenne >= 8) return { niveau: "INTERMEDIATE", label: "Intermédiaire", color: "bg-amber-100 text-amber-800" };
    return { niveau: "BEGINNER", label: "Débutant", color: "bg-blue-100 text-blue-800" };
  }, [notes]);

  const moyenne = useMemo(() => {
    const valeurs = Object.values(notes);
    return (valeurs.reduce((sum, v) => sum + v, 0) / valeurs.length).toFixed(1);
  }, [notes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidatureId: id,
          notes,
          observations,
          proposedLevel: niveauPropose.niveau,
          finalLevel: niveauFinal || niveauPropose.niveau
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de la sauvegarde.");
        setSaving(false);
        return;
      }

      setSuccess(true);
      setSaving(false);

      setTimeout(() => {
        router.push("/admin/candidatures");
      }, 2000);

    } catch (err) {
      setError("Erreur de connexion au serveur.");
      setSaving(false);
    }
  };

  const criteres = [
    { key: "technique", label: "Technique instrumentale", description: "Maîtrise technique, position, doigté", icon: "🎸" },
    { key: "justesse", label: "Justesse", description: "Précision des notes, intonation", icon: "🎵" },
    { key: "rythme", label: "Rythme", description: "Sens du rythme, régularité, tempo", icon: "🥁" },
    { key: "lecture", label: "Lecture musicale", description: "Capacité à lire une partition", icon: "📖" },
    { key: "oreille", label: "Oreille musicale", description: "Reconnaissance des intervalles, mélodies", icon: "👂" },
    { key: "interpretation", label: "Interprétation", description: "Phrasé, nuances, style", icon: "🎭" },
    { key: "expression", label: "Expression", description: "Communication émotionnelle, présence", icon: "✨" },
    { key: "motivation", label: "Motivation", description: "Engagement, sérieux, assiduité", icon: "💪" },
    { key: "experience", label: "Expérience", description: "Pratique antérieure, répertoire connu", icon: "🏆" }
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des données...</p>
        </div>
      </main>
    );
  }

  if (error && !candidat) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ {error}</h2>
          <Link href="/admin/candidatures" className="text-indigo-600 hover:text-indigo-800">← Retour à la liste</Link>
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
              <p className="text-xs text-slate-400">Fiche d'évaluation instrumentale</p>
            </div>
          </div>
          <Link href="/admin/candidatures" className="text-sm text-amber-400 hover:text-amber-300">
            ← Retour aux candidatures
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
            <p className="text-green-800 font-semibold">✅ Évaluation sauvegardée avec succès !</p>
            <p className="text-sm text-green-700 mt-1">Le statut du candidat a été mis à jour. Redirection en cours...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <p className="text-red-800 font-semibold">❌ {error}</p>
          </div>
        )}

        {/* En-tête candidat */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-mono">Dossier {candidat?.id.substring(0, 8)}...</p>
              <h2 className="text-2xl font-bold text-slate-900">{candidat?.firstName} {candidat?.lastName}</h2>
              <p className="text-slate-600 text-sm">🎵 {candidat?.formation}</p>
              <p className="text-xs text-slate-500 mt-1">
                📧 {candidat?.email} • 📞 {candidat?.phone}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Statut actuel</p>
              <p className="font-semibold text-slate-900">{candidat?.statut}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Grille de notation */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-6">📊 Notation des critères</h3>
            <p className="text-sm text-slate-600 mb-6">Notez chaque critère de 0 à 20. La moyenne déterminera automatiquement le niveau proposé.</p>

            <div className="space-y-6">
              {criteres.map(c => (
                <div key={c.key} className="border-b border-slate-100 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{c.icon}</span>
                        <label className="font-semibold text-slate-900">{c.label}</label>
                      </div>
                      <p className="text-xs text-slate-500 ml-8">{c.description}</p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={notes[c.key as keyof typeof notes]}
                        onChange={(e) => handleChange(c.key, Math.min(20, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                      <span className="text-xs text-slate-500 ml-1">/20</span>
                    </div>
                  </div>
                  <div className="ml-8 mt-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={notes[c.key as keyof typeof notes]}
                      onChange={(e) => handleChange(c.key, parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé et niveau proposé */}
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-6 rounded-xl shadow-lg mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-indigo-200 text-sm mb-1">Moyenne générale</p>
                <p className="text-5xl font-bold text-amber-400">{moyenne}<span className="text-2xl text-indigo-300">/20</span></p>
              </div>
              <div className="md:text-right">
                <p className="text-indigo-200 text-sm mb-2">Niveau proposé automatiquement</p>
                <span className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${niveauPropose.color}`}>
                  {niveauPropose.label}
                </span>
              </div>
            </div>
          </div>

          {/* Niveau final (modifiable) */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">🎯 Niveau final (validation administrative)</h3>
            <p className="text-sm text-slate-600 mb-4">
              L'administration peut modifier le niveau proposé si nécessaire.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["BEGINNER", "INTERMEDIATE", "ADVANCED", "PERFECTING"].map(niv => {
                const labels: Record<string, string> = {
                  BEGINNER: "Débutant",
                  INTERMEDIATE: "Intermédiaire",
                  ADVANCED: "Avancé",
                  PERFECTING: "Perfectionnement"
                };
                const colors: Record<string, string> = {
                  BEGINNER: "border-blue-500 bg-blue-50 text-blue-800",
                  INTERMEDIATE: "border-amber-500 bg-amber-50 text-amber-800",
                  ADVANCED: "border-purple-500 bg-purple-50 text-purple-800",
                  PERFECTING: "border-red-500 bg-red-50 text-red-800"
                };
                return (
                  <button
                    key={niv}
                    type="button"
                    onClick={() => setNiveauFinal(niv)}
                    className={`p-3 border-2 rounded-lg font-semibold transition ${
                      niveauFinal === niv ? colors[niv] : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {labels[niv]}
                  </button>
                );
              })}
            </div>
            {niveauFinal && niveauFinal !== niveauPropose.niveau && (
              <p className="text-xs text-amber-700 mt-3 bg-amber-50 p-2 rounded">
                ⚠️ Vous avez sélectionné un niveau différent de la proposition automatique.
              </p>
            )}
          </div>

          {/* Observations */}
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">💬 Observations et recommandations</h3>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={6}
              placeholder="Points forts, axes d'amélioration, recommandations pédagogiques, remarques particulières..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                  Sauvegarde en cours...
                </>
              ) : (
                "✅ Valider l'évaluation"
              )}
            </button>
            <Link
              href="/admin/candidatures"
              className="flex-1 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition text-center text-lg"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}