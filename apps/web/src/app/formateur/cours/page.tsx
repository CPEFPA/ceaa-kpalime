import Link from "next/link";
import { cours, apprenants } from "@/data/formateurs";

export default function MesCours() {
  const typeColor = (type: string) => {
    const map: Record<string, string> = {
      PRATIQUE: "bg-blue-100 text-blue-800",
      THEORIE: "bg-purple-100 text-purple-800",
      SOLFEGE: "bg-amber-100 text-amber-800",
      ENSEMBLE: "bg-emerald-100 text-emerald-800"
    };
    return map[type] || "bg-slate-100 text-slate-800";
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-emerald-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-emerald-900 text-xl">🎓</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-emerald-200">Mes cours</p>
            </div>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/formateur" className="text-emerald-200 hover:text-white">Tableau de bord</Link>
            <Link href="/formateur/apprenants" className="text-emerald-200 hover:text-white">Apprenants</Link>
            <Link href="/formateur/cours" className="text-amber-400 font-semibold">Mes cours</Link>
            <Link href="/formateur/presences" className="text-emerald-200 hover:text-white">Présences</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900">Mes cours</h2>
            <p className="text-slate-600">{cours.length} cours planifié(s)</p>
          </div>
          <button className="px-5 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition shadow">
            + Nouveau cours
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cours.map(c => {
            const apprenantsCours = apprenants.filter(a => c.apprenants.includes(a.id));
            return (
              <div key={c.id} className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${typeColor(c.type)}`}>
                      {c.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{c.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{c.titre}</h3>
                  <p className="text-sm text-slate-600 mb-4">{c.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <div>
                        <p className="font-semibold">{c.date}</p>
                        <p className="text-xs text-slate-500">{c.heure} • {c.duree}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <div>
                        <p className="font-semibold">{c.lieu}</p>
                        <p className="text-xs text-slate-500">{apprenantsCours.length} apprenant(s)</p>
                      </div>
                    </div>
                  </div>

                  {c.ressources.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-600 mb-2">📎 Ressources ({c.ressources.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {c.ressources.map((r, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {r.type === "PDF" ? "📄" : r.type === "VIDEO" ? "🎥" : "🎵"} {r.nom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 px-6 py-3 flex gap-2 border-t border-slate-100">
                  <button className="flex-1 py-2 text-xs bg-emerald-800 text-white rounded hover:bg-emerald-700 font-semibold">
                    ✅ Faire l'appel
                  </button>
                  <button className="flex-1 py-2 text-xs border border-emerald-800 text-emerald-800 rounded hover:bg-emerald-50 font-semibold">
                    📝 Détails
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}