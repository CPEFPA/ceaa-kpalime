import Link from "next/link";
import { demandesMock, modulesTerritoriaux } from "@/data/communes";

export default async function SuiviDemande({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const demande = demandesMock.find(d => d.id === id);

  if (!demande) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Demande introuvable</h2>
          <Link href="/commune" className="text-blue-700 mt-4 inline-block">← Retour au tableau de bord</Link>
        </div>
      </main>
    );
  }

  const workflow = [
    { key: "BROUILLON", label: "Brouillon", icon: "📝" },
    { key: "SOUMIS", label: "Demande soumise", icon: "📤" },
    { key: "ANALYSE_BESOINS", label: "Analyse des besoins", icon: "🔍" },
    { key: "PROGRAMME_DEFINI", label: "Programme défini", icon: "📋" },
    { key: "CONVENTION_VALIDE", label: "Convention validée", icon: "✍️" },
    { key: "EN_COURS", label: "Formation en cours", icon: "🎓" },
    { key: "TERMINE", label: "Terminé", icon: "✅" }
  ];

  const currentIndex = workflow.findIndex(s => s.key === demande.statut);
  const modulesDetails = modulesTerritoriaux.filter(m => demande.modulesChoisis.includes(m.id));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">🏛️</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-blue-200">Suivi de la demande {demande.id}</p>
            </div>
          </div>
          <Link href="/commune" className="text-sm text-teal-400 hover:text-teal-300">← Tableau de bord</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-mono">Demande {demande.id}</p>
              <h2 className="text-2xl font-bold text-slate-900">{demande.nomCommune}</h2>
              <p className="text-slate-600 text-sm">👤 {demande.responsable} • {demande.fonction}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                demande.statut === "CONVENTION_VALIDE" || demande.statut === "EN_COURS" ? "bg-green-100 text-green-800" :
                demande.statut === "TERMINE" ? "bg-blue-100 text-blue-800" :
                "bg-amber-100 text-amber-800"
              }`}>
                {workflow.find(s => s.key === demande.statut)?.icon} {workflow.find(s => s.key === demande.statut)?.label}
              </span>
              <p className="text-xs text-slate-500">Soumis le {demande.dateSoumission}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4">📊 Progression du dossier</h3>
              <div className="space-y-3">
                {workflow.map((step, i) => {
                  const isDone = i < currentIndex;
                  const isCurrent = i === currentIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        isDone ? "bg-green-500 text-white" :
                        isCurrent ? "bg-teal-600 text-white ring-4 ring-teal-200" :
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

            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4">📚 Programme proposé</h3>
              <div className="space-y-3">
                {modulesDetails.map(m => (
                  <div key={m.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{m.code}</span>
                        <p className="font-semibold text-slate-900 mt-1">{m.titre}</p>
                      </div>
                      <span className="text-xs text-teal-700 font-medium bg-teal-50 px-2 py-1 rounded">⏱ {m.duree}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4">📞 Contact</h3>
              <div className="space-y-3 text-sm">
                <div><p className="text-slate-500 text-xs">Email</p><p className="font-medium">{demande.email}</p></div>
                <div><p className="text-slate-500 text-xs">Téléphone</p><p className="font-medium">{demande.telephone}</p></div>
                <div><p className="text-slate-500 text-xs">Région</p><p className="font-medium">{demande.region}</p></div>
              </div>
            </div>

            {demande.observationsAdmin && (
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h3 className="text-lg font-bold text-amber-900 mb-2">💬 Message de l'administration</h3>
                <p className="text-sm text-amber-800">{demande.observationsAdmin}</p>
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
              <p className="text-sm text-blue-900 font-semibold mb-3">Besoin d'aide ?</p>
              <button className="w-full py-2 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800 font-semibold">
                Contacter le service formation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}