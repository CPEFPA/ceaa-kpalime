export const dynamic = 'force-dynamic';

import Link from "next/link";
import InscriptionForm from "./InscriptionForm";

export const metadata = {
  title: "S'inscrire - CEAA Kpalimé",
  description: "Formulaire d'inscription aux formations du Centre d'Enseignement Artistique et Artisanal de Kpalimé.",
};

export default function InscriptionPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <Link href="/formations" className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-4 transition">
            ← Retour aux formations
          </Link>
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">S'inscrire aux Formations</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Remplissez ce formulaire pour réserver votre place. Notre équipe vous contactera sous 48h pour finaliser votre inscription.
          </p>
        </div>

        {/* Formulaire */}
        <InscriptionForm />

        {/* Infos complémentaires */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-2xl mb-2">📞</p>
            <p className="font-bold text-indigo-900">Par téléphone</p>
            <p className="text-sm text-slate-600 mt-1">+228 90588358</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-2xl mb-2">✉️</p>
            <p className="font-bold text-indigo-900">Par email</p>
            <p className="text-sm text-slate-600 mt-1">culturefusion360@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-2xl mb-2"></p>
            <p className="font-bold text-indigo-900">Sur place</p>
            <p className="text-sm text-slate-600 mt-1">CEAA Kpalimé, Togo</p>
          </div>
        </div>
      </div>
    </main>
  );
}
