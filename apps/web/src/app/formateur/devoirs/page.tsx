"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DevoirACorriger {
  id: string;
  submissionId: string;
  titre: string;
  description: string;
  cours: string;
  apprenantNom: string;
  apprenantEmail: string;
  instrument: string;
  dateRendu: string;
  statut: string;
  fileUrl?: string;
}

export default function FormateurDevoirsPage() {
  const [devoirs, setDevoirs] = useState<DevoirACorriger[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevoir, setSelectedDevoir] = useState<DevoirACorriger | null>(null);
  const [note, setNote] = useState(0);
  const [appreciation, setAppreciation] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevoirs = async () => {
      try {
        const response = await fetch("/api/devoirs/corriger/liste");
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

  const handleCorriger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevoir) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/devoirs/corriger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedDevoir.submissionId,
          note: note,
          appreciation: appreciation
        })
      });

      if (!response.ok) throw new Error("Erreur lors de la correction");

      setSuccess(true);
      setSaving(false);

      setTimeout(() => {
        setDevoirs(devoirs.filter(d => d.submissionId !== selectedDevoir.submissionId));
        setSelectedDevoir(null);
        setNote(0);
        setAppreciation("");
        setSuccess(false);
      }, 2000);

    } catch (err) {
      setError("Impossible de corriger le devoir.");
      setSaving(false);
    }
  };

  // Déterminer le type de fichier pour afficher le bon lecteur
  const getFileType = (fileUrl: string) => {
    if (!fileUrl) return null;
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    if (['mp3', 'wav', 'ogg'].includes(extension || '')) return 'audio';
    if (['mp4', 'webm', 'mov'].includes(extension || '')) return 'video';
    if (['pdf'].includes(extension || '')) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
    return 'other';
  };

  const renderFilePreview = (fileUrl: string) => {
    const fileType = getFileType(fileUrl);
    
    switch (fileType) {
      case 'audio':
        return (
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-semibold text-slate-700 mb-2">🎵 Fichier audio</p>
            <audio controls className="w-full">
              <source src={fileUrl} />
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        );
      case 'video':
        return (
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-semibold text-slate-700 mb-2">🎬 Fichier vidéo</p>
            <video controls className="w-full rounded-lg">
              <source src={fileUrl} />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-semibold text-slate-700 mb-2">📄 Document PDF</p>
            <iframe src={fileUrl} className="w-full h-96 rounded-lg border border-slate-200" />
          </div>
        );
      case 'image':
        return (
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-semibold text-slate-700 mb-2">🖼️ Image</p>
            <img src={fileUrl} alt="Devoir" className="w-full rounded-lg" />
          </div>
        );
      default:
        return (
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-xs font-semibold text-slate-700 mb-2">📎 Fichier déposé</p>
            <p className="text-sm text-slate-600">Ce type de fichier ne peut pas être prévisualisé.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des devoirs à corriger...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-emerald-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-emerald-900 text-xl">🎓</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-emerald-200">Correction des devoirs</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/formateur" className="text-emerald-200 hover:text-white">Tableau de bord</Link>
            <Link href="/formateur/apprenants" className="text-emerald-200 hover:text-white">Apprenants</Link>
            <Link href="/formateur/cours" className="text-emerald-200 hover:text-white">Mes cours</Link>
            <Link href="/formateur/devoirs" className="text-amber-400 font-semibold">Devoirs</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">📝 Devoirs à corriger</h2>
        <p className="text-slate-600 mb-6">{devoirs.length} devoir(s) en attente de correction</p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
            <p className="text-red-800 font-semibold">❌ {error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Liste des devoirs */}
          <div className="lg:col-span-1 space-y-4">
            {devoirs.map(d => (
              <div
                key={d.id}
                onClick={() => setSelectedDevoir(d)}
                className={`bg-white p-5 rounded-xl shadow border-2 cursor-pointer transition ${
                  selectedDevoir?.id === d.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-100 hover:border-emerald-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{d.titre}</h3>
                    <p className="text-xs text-slate-500">📚 {d.cours}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                    À corriger
                  </span>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>👤 {d.apprenantNom}</p>
                  <p>🎵 {d.instrument}</p>
                  <p className="text-xs text-slate-500">Rendu le {d.dateRendu}</p>
                  {d.fileUrl && (
                    <p className="text-xs text-emerald-600 font-semibold">📎 Fichier joint</p>
                  )}
                </div>
              </div>
            ))}

            {devoirs.length === 0 && (
              <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-100">
                🎉 Aucun devoir à corriger pour le moment !
              </div>
            )}
          </div>

          {/* Formulaire de correction + Aperçu du fichier */}
          <div className="lg:col-span-2 sticky top-8 space-y-6">
            {selectedDevoir ? (
              <>
                {/* Aperçu du fichier déposé */}
                {selectedDevoir.fileUrl && (
                  <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-emerald-900">📎 Travail de l'apprenant</h3>
                      <a 
                        href={selectedDevoir.fileUrl} 
                        download 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-700 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition flex items-center gap-2"
                      >
                        ⬇️ Télécharger
                      </a>
                    </div>
                    {renderFilePreview(selectedDevoir.fileUrl)}
                  </div>
                )}

                {/* Formulaire de correction */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">✏️ Corriger le devoir</h3>
                  
                  <div className="bg-slate-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-slate-900">{selectedDevoir.titre}</p>
                    <p className="text-xs text-slate-600 mt-1">{selectedDevoir.description}</p>
                    <p className="text-xs text-slate-500 mt-2">👤 {selectedDevoir.apprenantNom} • {selectedDevoir.instrument}</p>
                  </div>

                  {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
                      <p className="text-green-800 font-semibold">✅ Devoir corrigé avec succès !</p>
                    </div>
                  )}

                  <form onSubmit={handleCorriger}>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Note (sur 20) : <span className="text-2xl text-emerald-800">{note}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={note}
                        onChange={(e) => setNote(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0</span>
                        <span>10</span>
                        <span>20</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Appréciation
                      </label>
                      <textarea
                        value={appreciation}
                        onChange={(e) => setAppreciation(e.target.value)}
                        rows={4}
                        placeholder="Points forts, axes d'amélioration, encouragements..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full py-3 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Sauvegarde...
                        </>
                      ) : (
                        "✅ Valider la correction"
                      )}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow border border-slate-100 text-center text-slate-500">
                <p className="text-4xl mb-2">👈</p>
                <p>Sélectionnez un devoir à corriger</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}