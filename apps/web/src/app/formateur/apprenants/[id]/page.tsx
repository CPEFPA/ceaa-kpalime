import Link from "next/link";
import { apprenants, cours } from "@/data/formateurs";

export default async function FicheApprenant({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apprenant = apprenants.find(a => a.id === id);

  if (!apprenant) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Apprenant introuvable</h2>
          <Link href="/formateur/apprenants" className="text-emerald-700 mt-4 inline-block">← Retour</Link>
        </div>
      </main>
    );
  }

  const coursApprenant = cours.filter(c => c.apprenants.includes(id));

  const evaluations = [
    { date: "2026-07-15", critere: "Technique instrumentale", note: 14, appreciation: "Bonne progression, travail régulier" },
    { date: "2026-07-15", critere: "Solfège", note: 12, appreciation: "Lecture à améliorer" },
    { date: "2026-06-20", critere: "Musique d'ensemble", note: 15, appreciation: "Très bonne écoute" }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-emerald-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-emerald-900 text-xl">🎓</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-emerald-200">Fiche apprenant</p>
            </div>
          </div>
          <Link href="/formateur/apprenants" className="text-sm text-amber-400 hover:text-amber-300">← Retour</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-mono">Dossier {apprenant.id}</p>
              <h2 className="text-2xl font-bold text-slate-900">{apprenant.prenom} {apprenant.nom}</h2>
              <p className="text-slate-600 text-sm">🎵 {apprenant.instrument} • Groupe {apprenant.groupe}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800">
                {apprenant.niveau}
              </span>
              <div className="text-right">
                <p className="text-xs text-slate-500">Progression globale</p>
                <p className="text-2xl font-bold text-emerald-800">{apprenant.progression}%</p>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full bg-slate-200 rounded-full h-3">
            <div className="bg-emerald-600 h-3 rounded-full transition-all" style={{ width: `${apprenant.progression}%` }}></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">👤 Informations</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-slate-500 text-xs">Email</p><p className="font-medium">{apprenant.email}</p></div>
                <div><p className="text-slate-500 text-xs">Téléphone</p><p className="font-medium">{apprenant.telephone}</p></div>
                <div><p className="text-slate-500 text-xs">Taux de présence</p><p className="font-medium text-green-700">{apprenant.presenceRate}%</p></div>
                <div><p className="text-slate-500 text-xs">Dernier cours</p><p className="font-medium">{apprenant.dernierCours}</p></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">📚 Cours suivis</h3>
              <div className="space-y-2">
                {coursApprenant.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-900">{c.titre}</p>
                      <p className="text-xs text-slate-500">{c.date} • {c.lieu}</p>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold">{c.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">📊 Évaluations récentes</h3>
              <div className="space-y-3">
                {evaluations.map((e, i) => (
                  <div key={i} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-slate-900">{e.critere}</p>
                      <span className="text-sm font-bold text-emerald-800">{e.note}/20</span>
                    </div>
                    <p className="text-sm text-slate-600">{e.appreciation}</p>
                    <p className="text-xs text-slate-400 mt-1">{e.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">⚡ Actions</h3>
              <div className="space-y-2">
                <button className="w-full py-2 bg-emerald-800 text-white text-sm rounded-lg hover:bg-emerald-700 font-semibold">
                  📝 Nouvelle évaluation
                </button>
                <button className="w-full py-2 bg-amber-500 text-slate-900 text-sm rounded-lg hover:bg-amber-400 font-semibold">
                  💬 Ajouter observation
                </button>
                <button className="w-full py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 font-semibold">
                  📧 Contacter
                </button>
                <button className="w-full py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 font-semibold">
                  📄 Générer bulletin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}