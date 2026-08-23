import Link from "next/link";
import { candidatures } from "@/data/candidatures";

export default async function FicheCandidature({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidature = candidatures.find(c => c.id === id);

  if (!candidature) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Candidature introuvable</h2>
          <Link href="/admin/candidatures" className="text-indigo-600 mt-4 inline-block">← Retour à la liste</Link>
        </div>
      </main>
    );
  }

  const workflow = [
    { key: "DRAFT", label: "Brouillon", icon: "📝" },
    { key: "SUBMITTED", label: "Soumis", icon: "📤" },
    { key: "UNDER_REVIEW", label: "En examen", icon: "🔍" },
    { key: "TEST_SCHEDULED", label: "Test programmé", icon: "📅" },
    { key: "TEST_DONE", label: "Test effectué", icon: "✅" },
    { key: "EVALUATED", label: "Évalué", icon: "📊" },
    { key: "ADMITTED", label: "Admis", icon: "🎉" },
    { key: "VALIDATED", label: "Validé", icon: "🎓" }
  ];

  const currentIndex = workflow.findIndex(s => s.key === candidature.statut);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-slate-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900 text-xl">🎵</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-slate-400">Fiche candidature {candidature.id}</p>
            </div>
          </div>
          <Link href="/admin/candidatures" className="text-sm text-amber-400 hover:text-amber-300">
            ← Retour à la liste
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-mono">Dossier {candidature.id}</p>
              <h2 className="text-2xl font-bold text-slate-900">{candidature.prenom} {candidature.nom}</h2>
              <p className="text-slate-600 text-sm">{candidature.formation}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                ["ADMITTED", "VALIDATED"].includes(candidature.statut) ? "bg-green-100 text-green-800" :
                ["REJECTED", "REORIENTED"].includes(candidature.statut) ? "bg-red-100 text-red-800" :
                "bg-amber-100 text-amber-800"
              }`}>
                {workflow.find(s => s.key === candidature.statut)?.icon} {workflow.find(s => s.key === candidature.statut)?.label}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${candidature.typeCandidat === "INSTITUTIONNEL" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"}`}>
                {candidature.typeCandidat === "INSTITUTIONNEL" ? "🏛️ Institutionnel" : "👤 Individuel"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">👤 Informations personnelles</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-slate-500 text-xs">Email</p><p className="font-medium">{candidature.email}</p></div>
                <div><p className="text-slate-500 text-xs">Téléphone</p><p className="font-medium">{candidature.telephone}</p></div>
                <div><p className="text-slate-500 text-xs">Ville</p><p className="font-medium">{candidature.ville}</p></div>
                <div><p className="text-slate-500 text-xs">Date de naissance</p><p className="font-medium">{candidature.dateNaissance}</p></div>
                <div><p className="text-slate-500 text-xs">Niveau d'études</p><p className="font-medium">{candidature.niveauEtudes}</p></div>
                {candidature.instrument && <div><p className="text-slate-500 text-xs">Instrument</p><p className="font-medium">🎵 {candidature.instrument}</p></div>}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">📊 Progression du dossier</h3>
              <div className="space-y-2">
                {workflow.map((step, i) => {
                  const isDone = i < currentIndex;
                  const isCurrent = i === currentIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isDone ? "bg-green-500 text-white" :
                        isCurrent ? "bg-amber-500 text-slate-900 ring-4 ring-amber-200" :
                        "bg-slate-200 text-slate-400"
                      }`}>
                        {isDone ? "✓" : i + 1}
                      </div>
                      <span className={`text-sm ${i > currentIndex ? "text-slate-400" : "text-slate-700 font-medium"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {candidature.dateTest && (
              <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
                <h3 className="text-lg font-bold text-indigo-900 mb-4">🎵 Test musical</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-slate-500 text-xs">Date</p><p className="font-medium">{candidature.dateTest}</p></div>
                  <div><p className="text-slate-500 text-xs">Heure</p><p className="font-medium">{candidature.heureTest}</p></div>
                  <div><p className="text-slate-500 text-xs">Lieu</p><p className="font-medium">{candidature.lieuTest}</p></div>
                  <div><p className="text-slate-500 text-xs">Évaluateur</p><p className="font-medium">{candidature.evaluateur}</p></div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">⚡ Actions</h3>
              <div className="space-y-2">
                <button className="w-full py-2 bg-indigo-900 text-white text-sm rounded-lg hover:bg-indigo-800 font-semibold">
                  📧 Envoyer convocation
                </button>
                <Link 
                  href={`/admin/candidatures/${candidature.id}/evaluation`}
                  className="block w-full py-2 bg-amber-500 text-slate-900 text-sm rounded-lg hover:bg-amber-400 font-semibold text-center"
                >
                  📝 Fiche d'évaluation
                </Link>
                <button className="w-full py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 font-semibold">
                  📎 Documents
                </button>
                <button className="w-full py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 font-semibold">
                  ❌ Rejeter
                </button>
              </div>
            </div>

            {candidature.observations && (
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h3 className="text-lg font-bold text-amber-900 mb-2">💬 Observations</h3>
                <p className="text-sm text-amber-800">{candidature.observations}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}