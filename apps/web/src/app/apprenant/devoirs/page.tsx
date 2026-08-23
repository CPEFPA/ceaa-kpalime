"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Devoir {
  id: string;
  submissionId: string;
  titre: string;
  description: string;
  cours: string;
  dateLimite: string;
  statut: "A_RENDRE" | "RENDU" | "CORRIGE" | "EN_RETARD";
  note?: number;
  appreciation?: string;
  dateRendu?: string;
  fileUrl?: string;
}

export default function MesDevoirsPage() {
  const [devoirs, setDevoirs] = useState<Devoir[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState("TOUS");
  const [showSubmitModal, setShowSubmitModal] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const LEARNER_ID = "cmsy7cnao0006kslzcalhny7x";

  useEffect(() => {
    const fetchDevoirs = async () => {
      try {
        const response = await fetch(`/api/devoirs?learnerId=${LEARNER_ID}`);
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();
        if (Array.isArray(data)) {
          setDevoirs(data);
        }
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les devoirs.");
        setLoading(false);
      }
    };
    fetchDevoirs();
  }, []);

  const devoirsFiltres = devoirs.filter(d => filtre === "TOUS" || d.statut === filtre);

  const statutLabel = (statut: string) => {
    const map: Record<string, string> = {
      A_RENDRE: "À rendre", RENDU: "Rendu", CORRIGE: "Corrigé", EN_RETARD: "En retard"
    };
    return map[statut] || statut;
  };

  const statutColor = (statut: string) => {
    if (statut === "A_RENDRE") return "bg-amber-100 text-amber-800";
    if (statut === "RENDU") return "bg-blue-100 text-blue-800";
    if (statut === "CORRIGE") return "bg-green-100 text-green-800";
    if (statut === "EN_RETARD") return "bg-red-100 text-red-800";
    return "bg-slate-100 text-slate-800";
  };

  const stats = {
    aRendre: devoirs.filter(d => d.statut === "A_RENDRE").length,
    rendus: devoirs.filter(d => d.statut === "RENDU").length,
    corriges: devoirs.filter(d => d.statut === "CORRIGE").length,
    enRetard: devoirs.filter(d => d.statut === "EN_RETARD").length
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRendre = async (submissionId: string) => {
    if (!selectedFile) {
      setError("Veuillez sélectionner un fichier");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1. Uploader le fichier
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("submissionId", submissionId);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Erreur lors de l'upload");
      }

      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.fileUrl;

      // 2. Mettre à jour le statut du devoir
      const response = await fetch("/api/devoirs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          submissionId, 
          commentaire: "Devoir rendu via la plateforme",
          fileUrl 
        })
      });

      if (!response.ok) throw new Error("Erreur lors du rendu");

      // Mettre à jour l'état local
      setDevoirs(devoirs.map(d => 
        d.submissionId === submissionId 
          ? { ...d, statut: "RENDU", dateRendu: new Date().toISOString().split('T')[0], fileUrl }
          : d
      ));
      setShowSubmitModal(null);
      setSelectedFile(null);
      setSubmitting(false);
    } catch (err: any) {
      setError(err.message || "Impossible de rendre le devoir.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de vos devoirs...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-violet-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center font-bold text-violet-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-violet-200">Mes devoirs</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/apprenant" className="text-violet-200 hover:text-white">Tableau de bord</Link>
            <Link href="/apprenant/cours" className="text-violet-200 hover:text-white">Mes cours</Link>
            <Link href="/apprenant/devoirs" className="text-pink-400 font-semibold">Devoirs</Link>
            <Link href="/apprenant/calendrier" className="text-violet-200 hover:text-white">Calendrier</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h2 className="text-3xl font-bold text-violet-900 mb-2">📝 Mes devoirs</h2>
        <p className="text-slate-600 mb-6">Suivez vos devoirs à rendre, rendus et corrigés.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-amber-800">{stats.aRendre}</p>
            <p className="text-xs text-amber-700">À rendre</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-800">{stats.rendus}</p>
            <p className="text-xs text-blue-700">Rendus</p>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-800">{stats.corriges}</p>
            <p className="text-xs text-green-700">Corrigés</p>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-red-800">{stats.enRetard}</p>
            <p className="text-xs text-red-700">En retard</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-slate-100 mb-6">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Filtrer par statut</label>
          <select value={filtre} onChange={(e) => setFiltre(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none">
            <option value="TOUS">Tous les devoirs</option>
            <option value="A_RENDRE">À rendre</option>
            <option value="RENDU">Rendus</option>
            <option value="CORRIGE">Corrigés</option>
            <option value="EN_RETARD">En retard</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <p className="text-red-800 font-semibold">❌ {error}</p>
          </div>
        )}

        <div className="space-y-4">
          {devoirsFiltres.map(d => (
            <div key={d.id} className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statutColor(d.statut)}`}>
                      {statutLabel(d.statut)}
                    </span>
                    <span className="text-xs text-slate-500">📚 {d.cours}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{d.titre}</h3>
                  <p className="text-sm text-slate-600 mt-1">{d.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Date limite</p>
                  <p className="font-bold text-slate-900">{d.dateLimite}</p>
                </div>
              </div>

              {d.statut === "A_RENDRE" && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setShowSubmitModal(d.submissionId)}
                    className="w-full md:w-auto px-6 py-2 bg-violet-800 text-white font-semibold rounded-lg hover:bg-violet-700 transition"
                  >
                    📤 Rendre mon devoir
                  </button>
                </div>
              )}

              {d.statut === "RENDU" && d.dateRendu && (
                <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
                  <p>✓ Rendu le {d.dateRendu} • En attente de correction</p>
                  {d.fileUrl && (
                    <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-violet-600 hover:text-violet-800 text-xs font-semibold">
                      📎 Voir le fichier déposé
                    </a>
                  )}
                </div>
              )}

              {d.statut === "CORRIGE" && (
                <div className="mt-4 pt-4 border-t border-slate-100 bg-green-50 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-xs text-green-700">Rendu le {d.dateRendu}</p>
                      <p className="text-xs text-green-700">Corrigé par M. AGBEY</p>
                      {d.fileUrl && (
                        <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-1 text-green-700 hover:text-green-900 text-xs font-semibold">
                          📎 Voir le fichier déposé
                        </a>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Note</p>
                      <p className="text-3xl font-bold text-green-800">{d.note}<span className="text-lg text-slate-500">/20</span></p>
                    </div>
                  </div>
                  {d.appreciation && (
                    <div className="bg-white p-3 rounded-lg border border-green-200 mt-2">
                      <p className="text-xs font-semibold text-slate-700 mb-1">💬 Appréciation du formateur</p>
                      <p className="text-sm text-slate-700">{d.appreciation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {devoirsFiltres.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-100">
              Aucun devoir ne correspond aux filtres.
            </div>
          )}
        </div>

        {showSubmitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-violet-900 mb-4">📤 Rendre mon devoir</h3>
              <p className="text-sm text-slate-600 mb-4">Sélectionnez votre fichier à déposer :</p>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-violet-500 transition cursor-pointer"
              >
                {selectedFile ? (
                  <div>
                    <p className="text-4xl mb-2">📎</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedFile.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} Mo</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl mb-2">📁</p>
                    <p className="text-sm text-slate-600">Cliquez pour sélectionner un fichier</p>
                    <p className="text-xs text-slate-400 mt-1">Formats : MP3, MP4, PDF, JPG, PNG (max 50 Mo)</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".mp3,.mp4,.pdf,.jpg,.jpeg,.png,.wav"
                className="hidden"
              />

              <textarea
                placeholder="Commentaire (optionnel)..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none mb-4"
              ></textarea>

              <div className="flex gap-2">
                <button
                  onClick={() => { setShowSubmitModal(null); setSelectedFile(null); }}
                  disabled={submitting}
                  className="flex-1 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleRendre(showSubmitModal)}
                  disabled={submitting || !selectedFile}
                  className="flex-1 py-2 bg-violet-800 text-white font-bold rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Envoi...
                    </>
                  ) : "✓ Envoyer"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}