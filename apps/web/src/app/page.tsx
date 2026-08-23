import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* En-tête */}
        <p className="text-amber-400 font-bold mb-6 tracking-widest uppercase text-sm">
          CEAA Kpalimé - Rentrée 2026-2027
        </p>

        {/* Titre Principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          Apprendre • Se Former •<br />
          Se Professionnaliser
        </h1>

        {/* Sous-titre / Mission */}
        <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Faire de la formation artistique, musicale et culturelle un véritable levier d'éducation, d'insertion professionnelle et de développement territorial.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="/formations" 
            className="px-10 py-4 bg-amber-500 text-indigo-900 font-bold rounded-full hover:bg-amber-400 transition shadow-xl text-lg min-w-[220px]"
          >
            Découvrir nos formations ↓
          </Link>
          
          <Link 
            href="/inscription" 
            className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition backdrop-blur-sm text-lg min-w-[220px]"
          >
            S'inscrire maintenant →
          </Link>
        </div>
      </div>
    </main>
  );
}