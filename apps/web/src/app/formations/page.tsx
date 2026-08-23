import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function FormationsPage() {
  let formations = [];
  try {
    formations = await prisma.training.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erreur de chargement des formations (mode fallback activé):", error);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HERO SECTION */}
      <section id="accueil" className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-amber-400 font-bold tracking-wider mb-4 uppercase">CEAA Kpalimé - Rentrée 2026-2027</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Apprendre • Se Former • <br className="hidden md:block" /> Se Professionnaliser
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Une nouvelle offre de formation modulaire destinée aux jeunes, adultes, artistes et acteurs du développement territorial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#parcours-strategiques" className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-amber-400 transition shadow-lg">
              Découvrir nos parcours ↓
            </a>
            <Link href="/inscription" className="px-8 py-4 bg-amber-500 text-indigo-900 font-bold rounded-full hover:bg-amber-400 transition shadow-lg">
              S'inscrire maintenant →
            </Link>
          </div>
        </div>
      </section>

      {/* NOS PARCOURS STRATÉGIQUES */}
      <section id="parcours-strategiques" className="py-20 px-4 bg-white scroll-mt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Nos Parcours Stratégiques</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Des formations conçues pour s'adapter aux disponibilités, au niveau et aux objectifs de chaque apprenant.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Parcours 1 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition duration-300 flex flex-col">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Préparation au Baccalauréat A4 & Pratique Musicale</h3>
              <p className="text-slate-600 mb-6 flex-grow">Un parcours spécialement conçu pour préparer le Bac série A4 tout en développant une véritable compétence musicale.</p>
              <ul className="text-sm text-slate-700 space-y-2 mb-6">
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">•</span> Enseignements généraux & épreuves Bac A4</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">•</span> Formation et pratique musicales</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">•</span> Candidature officielle ou libre</li>
              </ul>
              <Link href="/inscription?formation=bac-a4" className="mt-auto text-indigo-700 font-semibold hover:text-indigo-900 flex items-center gap-2 group">
                Découvrir le parcours <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>

            {/* Parcours 2 */}
            <div className="bg-indigo-900 text-white p-8 rounded-2xl border border-indigo-800 shadow-xl flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-amber-500 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full">POPULAIRE</div>
              <div className="text-4xl mb-4">🎸</div>
              <h3 className="text-xl font-bold mb-3">Formation Musicale Modulaire (Cycle Secondaire & Supérieur)</h3>
              <p className="text-indigo-200 mb-6 flex-grow">Programme adapté à différents profils et niveaux : théorie, culture musicale, perfectionnement et professionnalisation.</p>
              <ul className="text-sm text-indigo-100 space-y-2 mb-6">
                <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span> Cycle secondaire & supérieur</li>
                <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span> Théorie & Culture musicales</li>
                <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span> Perfectionnement instrumental</li>
              </ul>
              <Link href="/inscription?formation=musicale-modulaire" className="mt-auto text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-2 group">
                Découvrir le parcours <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>

            {/* Parcours 3 */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition duration-300 flex flex-col">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Culture, Tourisme & Développement Territorial</h3>
              <p className="text-slate-600 mb-6 flex-grow">Formation pratique pour aider les collectivités à identifier, valoriser et développer leurs ressources culturelles et touristiques.</p>
              <ul className="text-sm text-slate-700 space-y-2 mb-6">
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">•</span> Politique culturelle communale</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">•</span> Valorisation du patrimoine</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-1">•</span> Gestion de projets territoriaux</li>
              </ul>
              <Link href="/inscription?formation=communes" className="mt-auto text-indigo-700 font-semibold hover:text-indigo-900 flex items-center gap-2 group">
                Découvrir le parcours <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE PROFESSIONNEL (DB) */}
      <section id="catalogue-pro" className="py-20 px-4 bg-slate-50 scroll-mt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Métiers de la Musique & du Numérique</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Parcours professionnels modulaires de 3 à 6 mois pour se spécialiser.</p>
          </div>

          {formations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((f: any) => (
                <div key={f.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-indigo-900 leading-tight">{f.name}</h3>
                      {f.requiresMusicTest && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2">Test requis</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-3 italic">👥 {f.targetAudience || "Tous publics"}</p>
                    <p className="text-sm text-slate-700 mb-4 line-clamp-3">{f.description}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Durée</span>
                      <span className="font-semibold text-indigo-900">{f.durationMonths} mois</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Tarif</span>
                      <span className="font-semibold text-green-700">
                        {f.priceMonthly ? `${f.priceMonthly.toLocaleString()} FCFA/mois` : "Sur devis"}
                      </span>
                    </div>
                    <details className="text-xs text-slate-600 mt-2">
                      <summary className="cursor-pointer font-semibold text-indigo-700 hover:text-indigo-900">Voir les modules ↓</summary>
                      <p className="mt-2 leading-relaxed">{f.modules}</p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 mb-4">Les formations professionnelles seront bientôt affichées ici.</p>
              <Link href="/debouches" className="text-indigo-600 font-semibold hover:underline">Voir les débouchés professionnels →</Link>
            </div>
          )}
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="py-20 px-4 bg-white scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">💰 Nos Formules & Tarifs</h2>
            <p className="text-slate-600">Des tarifs adaptés à chaque type de formation et public.</p>
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Produit</th>
                  <th className="px-6 py-4 font-semibold">Tarif</th>
                  <th className="px-6 py-4 font-semibold">Public</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm md:text-base">
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-indigo-900">Formation longue (6 mois)</td><td className="px-6 py-4 font-semibold text-green-700">42 000 FCFA / mois</td><td className="px-6 py-4 text-slate-600">Formation professionnelle</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-indigo-900">Formation intensive (1-2 mois)</td><td className="px-6 py-4 font-semibold text-green-700">100 000 – 250 000 FCFA</td><td className="px-6 py-4 text-slate-600">Professionnels / Autodidactes</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-indigo-900">Atelier spécialisé</td><td className="px-6 py-4 font-semibold text-green-700">10 000 – 50 000 FCFA</td><td className="px-6 py-4 text-slate-600">Grand public</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-indigo-900">Masterclass</td><td className="px-6 py-4 font-semibold text-green-700">5 000 – 25 000 FCFA</td><td className="px-6 py-4 text-slate-600">Artistes et étudiants</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-indigo-900">Cours individuel</td><td className="px-6 py-4 font-semibold text-green-700">5 000 – 15 000 FCFA / session</td><td className="px-6 py-4 text-slate-600">Musiciens / Chanteurs</td></tr>
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-indigo-900">Formation entreprise/institution</td><td className="px-6 py-4 font-semibold text-slate-500">Sur devis</td><td className="px-6 py-4 text-slate-600">Entreprises / Institutions</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DOCUMENTATION */}
      <section id="documentation" className="py-20 px-4 bg-slate-50 scroll-mt-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">📄 Documentation & Catalogues</h2>
          <p className="text-slate-600 mb-12">Téléchargez nos brochures détaillées pour découvrir tous nos parcours.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/docs/catalogue-complet.pdf" download className="flex items-center gap-4 p-6 bg-white rounded-xl shadow border border-slate-200 hover:border-indigo-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-2xl group-hover:bg-red-600 group-hover:text-white transition">📕</div>
              <div className="text-left">
                <p className="font-bold text-indigo-900">Catalogue Complet CEAA</p>
                <p className="text-xs text-slate-500">PDF • Tous les parcours détaillés</p>
              </div>
            </a>
            
            <a href="/docs/guide-metiers.pdf" download className="flex items-center gap-4 p-6 bg-white rounded-xl shadow border border-slate-200 hover:border-indigo-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition">📘</div>
              <div className="text-left">
                <p className="font-bold text-indigo-900">Guide des Métiers Musicaux</p>
                <p className="text-xs text-slate-500">PDF • Débouchés professionnels</p>
              </div>
            </a>
            
            <a href="/docs/brochure-territoire.pdf" download className="flex items-center gap-4 p-6 bg-white rounded-xl shadow border border-slate-200 hover:border-indigo-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition">📗</div>
              <div className="text-left">
                <p className="font-bold text-indigo-900">Brochure Culture & Territoire</p>
                <p className="text-xs text-slate-500">PDF • Pour communes & acteurs locaux</p>
              </div>
            </a>
            
            <a href="/docs/flyer-rentree.pdf" download className="flex items-center gap-4 p-6 bg-white rounded-xl shadow border border-slate-200 hover:border-amber-500 hover:shadow-md transition group">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-2xl group-hover:bg-amber-600 group-hover:text-white transition">📄</div>
              <div className="text-left">
                <p className="font-bold text-indigo-900">Flyer Rentrée 2026-2027</p>
                <p className="text-xs text-slate-500">PDF • Informations rapides</p>
              </div>
            </a>
          </div>
          
          <p className="text-xs text-slate-400 mt-8">* Les liens de téléchargement sont actifs. Assurez-vous d'avoir déposé les fichiers PDF dans le dossier public/docs/</p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 px-4 bg-indigo-900 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Les inscriptions sont ouvertes !</h2>
          <p className="text-indigo-200 mb-10 text-lg">Rejoignez-nous et construisons ensemble l'avenir artistique, culturel et touristique de nos territoires.</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
            <div className="bg-indigo-800 p-6 rounded-xl">
              <p className="font-bold text-amber-400 mb-2">📞 Téléphone / WhatsApp</p>
              <p className="text-sm">+228 90588358</p>
              <p className="text-sm">+228 90290223</p>
              <p className="text-sm">+228 91556062</p>
            </div>
            <div className="bg-indigo-800 p-6 rounded-xl">
              <p className="font-bold text-amber-400 mb-2">✉️ E-mail</p>
              <p className="text-sm">culturefusion360@gmail.com</p>
            </div>
            <div className="bg-indigo-800 p-6 rounded-xl">
              <p className="font-bold text-amber-400 mb-2">📍 Adresse</p>
              <p className="text-sm">CEAA Kpalimé</p>
              <p className="text-sm">Kpalimé, Togo</p>
            </div>
          </div>

          <Link href="/inscription" className="inline-block px-10 py-4 bg-amber-500 text-indigo-900 font-bold rounded-full hover:bg-amber-400 transition shadow-xl text-lg">
            S'inscrire maintenant →
          </Link>
        </div>
      </section>
    </main>
  );
}