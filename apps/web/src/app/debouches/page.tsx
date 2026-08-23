import Link from "next/link";

export default function DebouchesPage() {
  const formationsModulaires = [
    {
      icon: "🎵",
      nom: "Pratiques Musicales",
      duree: "6 mois",
      modules: ["Technique vocale", "Rythme", "Écoute", "Interprétation", "Ensemble", "Scène"],
      materiel: ["Clavier", "Micros", "Enceintes", "Percussions"]
    },
    {
      icon: "🎸",
      nom: "Pratiques Instrumentales",
      duree: "6 mois",
      modules: ["Instrument", "Technique", "Théorie appliquée", "Accompagnement", "Ensemble", "Improvisation"],
      materiel: ["Clavier", "Guitare", "Basse", "Batterie", "Percussions"]
    },
    {
      icon: "🎧",
      nom: "Technique Musicale & MAO",
      duree: "6 mois",
      modules: ["Théorie", "Harmonie", "Arrangement", "MAO", "Production", "Enregistrement", "Édition audio"],
      materiel: ["Ordinateurs", "Logiciels MAO", "Interfaces audio", "Casques", "Claviers MIDI"]
    },
    {
      icon: "",
      nom: "Musique & Communication",
      duree: "6 mois",
      modules: ["Communication", "Réseaux sociaux", "Création de contenus", "Marketing", "Promotion", "Médias"],
      materiel: ["Ordinateurs", "Smartphone/Caméra", "Éclairage", "Internet", "Logiciels de montage"]
    },
    {
      icon: "🎯",
      nom: "Musique & Management",
      duree: "6 mois",
      modules: ["Management", "Booking", "Production", "Événementiel", "Partenariats", "Gestion", "Entrepreneuriat"],
      materiel: ["Ordinateurs", "Vidéoprojecteur", "Internet", "Outils de gestion"]
    },
    {
      icon: "🎪",
      nom: "Production & Événementiel Culturel",
      duree: "6 mois",
      modules: ["Production", "Régie", "Logistique", "Programmation", "Budget", "Coordination"],
      materiel: ["Sono", "Micros", "Câbles", "Ordinateur", "Matériel événementiel"]
    },
    {
      icon: "🎬",
      nom: "Création de contenus musicaux & culturels",
      duree: "4-6 mois",
      modules: ["Photo", "Vidéo", "Montage", "Storytelling", "Réseaux sociaux", "Contenus courts"],
      materiel: ["Caméra/Smartphone", "Trépied", "Éclairage", "Micros", "Ordinateurs"]
    },
    {
      icon: "",
      nom: "Entrepreneuriat Culturel",
      duree: "3-6 mois",
      modules: ["Business model", "Budget", "Marketing", "Financement", "Gestion", "Projet culturel"],
      materiel: ["Ordinateurs", "Vidéoprojecteur", "Outils bureautiques"]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-4 inline-block">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
            Débouchés professionnels et opportunités d'activités
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Découvrez les perspectives de carrière et les compétences développées dans chaque formation du CEAA Kpalimé.
          </p>
        </div>

        {/* SECTION 1 : FORMATIONS MODULAIRES PROFESSIONNELLES */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🎓</span> Formations Modulaires Professionnelles
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-900 text-white">
                  <tr>
                    <th className="px-6 py-5 text-left font-semibold text-sm">Formation</th>
                    <th className="px-6 py-5 text-left font-semibold text-sm">Durée</th>
                    <th className="px-6 py-5 text-left font-semibold text-sm">Principaux modules</th>
                    <th className="px-6 py-5 text-left font-semibold text-sm">Matériel / outils</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {formationsModulaires.map((f, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? "bg-slate-50" : "bg-white"} hover:bg-indigo-50 transition`}>
                      <td className="px-6 py-5 font-semibold text-indigo-900">
                        <span className="text-xl mr-2">{f.icon}</span>
                        {f.nom}
                      </td>
                      <td className="px-6 py-5 text-slate-700 font-medium whitespace-nowrap">{f.duree}</td>
                      <td className="px-6 py-5">
                        <ul className="text-sm text-slate-600 space-y-1">
                          {f.modules.map((m, i) => <li key={i}>• {m}</li>)}
                        </ul>
                      </td>
                      <td className="px-6 py-5">
                        <ul className="text-sm text-slate-600 space-y-1">
                          {f.materiel.map((m, i) => <li key={i}>• {m}</li>)}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* NOTE IMPORTANTE - Juste après le tableau modulaire */}
          <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-lg">
            <p className="text-indigo-100 leading-relaxed text-lg text-center">
              <strong className="text-amber-400">NB :</strong> La formation ne vise pas uniquement l'accès à un emploi salarié. 
              Elle prépare également les apprenants à exercer sous forme de prestations, d'activités indépendantes, 
              de missions, de collaborations artistiques ou de création d'entreprises culturelles.
            </p>
          </div>
        </section>

        {/* SECTION 2 : CYCLE SECONDAIRE & SUPÉRIEUR */}
        <section className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🎸</span> Formation Musicale Modulaire - Cycle Secondaire & Supérieur
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-amber-900 mb-3 text-lg">🎓 Certification et Poursuite d'Études</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                À l'issue de la formation, l'élève reçoit une <strong className="text-amber-700">certification officielle</strong> qu'il pourra joindre à son dossier de Baccalauréat. Cette certification atteste des compétences musicales et culturelles acquises et constitue un atout majeur pour :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-2">
                <li>L'inscription à l'<strong>IRES-RDEC</strong> (Institut Régional d'Enseignement Supérieur - Ressources Documentaires et Édition Culturelle)</li>
                <li>L'inscription à l'<strong>Université</strong> dans les filières liées aux arts, à la culture ou à la communication</li>
                <li>La valorisation du parcours artistique dans les dossiers de candidature</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-amber-900 mb-3 text-lg">📋 Conditions d'Accès</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-2">
                <li>Niveau secondaire requis (adaptable selon la spécialité)</li>
                <li>Aucune qualification musicale préalable obligatoire pour les parcours d'initiation</li>
                <li>Évaluation d'entrée pour déterminer le parcours approprié (initiation, mise à niveau, perfectionnement)</li>
                <li>Ouvert aux jeunes en cours de scolarité et aux adultes en reprise d'études</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3 : COMMUNES & ACTEURS LOCAUX */}
        <section className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">️</span> Culture, Tourisme & Développement Territorial - Pour Communes & Acteurs Locaux
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-emerald-900 mb-3 text-lg">🎯 Objectifs de la Formation</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Ce parcours est spécifiquement conçu pour le <strong className="text-emerald-700">renforcement des capacités des agents communaux</strong> et des acteurs du développement territorial. Il vise à :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-2">
                <li>Identifier, valoriser et promouvoir les ressources culturelles et touristiques locales</li>
                <li>Élaborer et mettre en œuvre une politique culturelle communale</li>
                <li>Gérer des projets culturels et patrimoniaux au service du développement local</li>
                <li>Créer des synergies entre culture, tourisme et développement économique territorial</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-emerald-900 mb-3 text-lg">📋 Public Cible & Modalités</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-2">
                <li><strong>Agents communaux</strong> (élus, techniciens, chargés de culture et de développement)</li>
                <li><strong>Acteurs associatifs</strong> et leaders communautaires impliqués dans le développement local</li>
                <li><strong>Aucun test musical requis</strong> - La formation est axée sur la gestion et la valorisation culturelle</li>
                <li>Niveau secondaire ou expérience professionnelle dans le domaine public suffisant</li>
                <li>Modules hybrides (présentiel et terrain) adaptés aux contraintes des agents en activité</li>
              </ul>
            </div>

            <div className="bg-emerald-100 border-l-4 border-emerald-600 p-6 rounded-r-xl">
              <p className="text-slate-800 leading-relaxed">
                <strong className="text-emerald-900">Impact territorial :</strong> Cette formation contribue directement au développement endogène des communes en formant des acteurs capables de transformer le patrimoine culturel et touristique en levier de développement économique et social durable.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <div className="text-center pb-12">
          <Link href="/inscription" className="inline-block px-10 py-4 bg-amber-500 text-indigo-900 font-bold rounded-full hover:bg-amber-400 transition shadow-xl text-lg">
            S'inscrire maintenant →
          </Link>
        </div>
      </div>
    </main>
  );
}