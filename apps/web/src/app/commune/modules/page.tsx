import Link from "next/link";
import { modulesTerritoriaux } from "@/data/communes";

export default function CatalogueModules() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/commune" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">🏛️</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-blue-200">Catalogue des modules territoriaux</p>
            </div>
          </Link>
          <Link href="/commune/nouvelle-demande" className="px-4 py-2 text-sm font-medium bg-teal-500 text-blue-900 rounded hover:bg-teal-400 transition font-bold">
            Faire une demande
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Nos Modules de Formation</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Des parcours hybrides conçus pour accompagner les collectivités et acteurs locaux dans le développement culturel, touristique et patrimonial de leurs territoires.
          </p>
          <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            ✓ Aucun test musical requis pour ces formations
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesTerritoriaux.map(m => (
            <div key={m.id} className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">{m.code}</span>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded">{m.domaine}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{m.titre}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{m.description}</p>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">⏱ {m.duree}</span>
                <Link href="/commune/nouvelle-demande" className="text-sm text-blue-700 font-semibold hover:text-blue-900">
                  Sélectionner →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}