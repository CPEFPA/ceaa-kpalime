import Link from "next/link";
import { demandesMock, modulesTerritoriaux } from "@/data/communes";

export default function CommuneDashboard() {
  const maDemande = demandesMock[0]; // Simulation de la commune connectée (Kpalimé)
  const modulesSelectionnes = modulesTerritoriaux.filter(m => maDemande.modulesChoisis.includes(m.id));

  const statutLabel = (statut: string) => {
    const map: Record<string, string> = {
      BROUILLON: "Brouillon", SOUMIS: "Soumis", ANALYSE_BESOINS: "Analyse des besoins",
      PROGRAMME_DEFINI: "Programme défini", CONVENTION_VALIDE: "Convention validée",
      EN_COURS: "Formation en cours", TERMINE: "Terminé"
    };
    return map[statut] || statut;
  };

  const statutColor = (statut: string) => {
    if (statut === "CONVENTION_VALIDE" || statut === "EN_COURS") return "bg-green-100 text-green-800";
    if (statut === "ANALYSE_BESOINS" || statut === "PROGRAMME_DEFINI") return "bg-blue-100 text-blue-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">🏛️</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-blue-200">Espace Communes & Acteurs Locaux</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/commune" className="text-teal-400 font-semibold">Tableau de bord</Link>
            <Link href="/commune/modules" className="text-blue-200 hover:text-white">Catalogue</Link>
            <Link href="/commune/nouvelle-demande" className="text-blue-200 hover:text-white">Nouvelle demande</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-xl shadow-lg mb-8">
          <p className="text-blue-200 text-sm">Espace institutionnel de</p>
          <h2 className="text-3xl font-bold">{maDemande.nomCommune}</h2>
          <p className="text-blue-200 mt-1">📍 {maDemande.region} • 👤 {maDemande.responsable} ({maDemande.fonction})</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <p className="text-xs text-slate-500 uppercase font-semibold">Demande actuelle</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">{maDemande.id}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${statutColor(maDemande.statut)}`}>
              {statutLabel(maDemande.statut)}
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
            <p className="text-xs text-slate-500 uppercase font-semibold">Modules sélectionnés</p>
            <p className="text-4xl font-bold text-teal-600 mt-1">{modulesSelectionnes.length}</p>
            <p className="text-xs text-slate-500 mt-1">Formation hybride</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-100 flex flex-col justify-center">
            <Link href="/commune/nouvelle-demande" className="block w-full py-3 bg-teal-600 text-white text-center font-bold rounded-lg hover:bg-teal-700 transition shadow">
              + Nouvelle demande
            </Link>
            <Link href={`/commune/suivi/${maDemande.id}`} className="block w-full py-3 mt-3 border-2 border-blue-900 text-blue-900 text-center font-bold rounded-lg hover:bg-blue-50 transition">
              Voir le suivi détaillé
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-blue-900">📚 Programme de formation validé</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {modulesSelectionnes.map(m => (
              <div key={m.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{m.code}</span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">{m.domaine}</span>
                  </div>
                  <p className="font-semibold text-slate-900 mt-1">{m.titre}</p>
                  <p className="text-sm text-slate-500">{m.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">⏱ {m.duree}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">✓ Validé</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {maDemande.observationsAdmin && (
          <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm font-bold text-amber-900 mb-1">💬 Message de l'administration</p>
            <p className="text-sm text-amber-800">{maDemande.observationsAdmin}</p>
          </div>
        )}
      </div>
    </main>
  );
}