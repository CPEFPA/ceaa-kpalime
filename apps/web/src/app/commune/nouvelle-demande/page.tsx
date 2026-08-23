"use client";

import Link from "next/link";
import { useState } from "react";
import { modulesTerritoriaux } from "@/data/communes";

export default function NouvelleDemande() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomCommune: "", region: "", responsable: "", fonction: "", email: "", telephone: "",
    domaines: [] as string[],
    modules: [] as string[]
  });

  const toggleDomaine = (d: string) => {
    setFormData(prev => ({
      ...prev,
      domaines: prev.domaines.includes(d) ? prev.domaines.filter(x => x !== d) : [...prev.domaines, d]
    }));
  };

  const toggleModule = (mId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(mId) ? prev.modules.filter(x => x !== mId) : [...prev.modules, mId]
    }));
  };

  const domainesList = ["Culture", "Tourisme", "Patrimoine", "Développement territorial", "Animation culturelle", "Gestion de projets"];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/commune" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">🏛️</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-blue-200">Nouvelle demande de formation</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10"></div>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${step >= s ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              {s}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
          <p className="text-sm text-blue-900 font-semibold">ℹ️ Information importante</p>
          <p className="text-sm text-blue-800">Les formations destinées aux communes et acteurs locaux sont des parcours hybrides sur mesure. <strong>Aucun test musical d'entrée n'est requis.</strong></p>
        </div>

        <form className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-100">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">1. Informations de la structure</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom de la commune / structure *</label>
                  <input type="text" value={formData.nomCommune} onChange={e => setFormData({...formData, nomCommune: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Région / Préfecture *</label>
                  <input type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom du responsable *</label>
                  <input type="text" value={formData.responsable} onChange={e => setFormData({...formData, responsable: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fonction *</label>
                  <input type="text" value={formData.fonction} onChange={e => setFormData({...formData, fonction: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone *</label>
                  <input type="tel" value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Adresse e-mail *</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" required />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">2. Domaines de besoins</h2>
              <p className="text-sm text-slate-600 mb-4">Sélectionnez les domaines qui correspondent à vos besoins actuels :</p>
              <div className="grid md:grid-cols-2 gap-3">
                {domainesList.map(d => (
                  <label key={d} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${formData.domaines.includes(d) ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input type="checkbox" checked={formData.domaines.includes(d)} onChange={() => toggleDomaine(d)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500" />
                    <span className="font-medium text-slate-800">{d}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">3. Choix des modules</h2>
              <p className="text-sm text-slate-600 mb-4">Sélectionnez un ou plusieurs modules pour constituer votre programme :</p>
              <div className="space-y-3">
                {modulesTerritoriaux.map(m => (
                  <label key={m.id} className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${formData.modules.includes(m.id) ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input type="checkbox" checked={formData.modules.includes(m.id)} onChange={() => toggleModule(m.id)} className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{m.code}</span>
                        <span className="font-semibold text-slate-900">{m.titre}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{m.description}</p>
                      <p className="text-xs text-teal-700 font-medium mt-1">⏱ Durée : {m.duree}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition">
                Précédent
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="px-6 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition">
                Suivant
              </button>
            ) : (
              <button type="button" onClick={() => alert("Demande soumise avec succès ! L'équipe pédagogique vous contactera sous 48h pour l'analyse des besoins.")} className="px-6 py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition shadow-md">
                Soumettre la demande
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}