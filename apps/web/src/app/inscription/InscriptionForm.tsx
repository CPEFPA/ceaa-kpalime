"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    nom: "", prenom: "", email: "", telephone: "", parcours: "", niveau: "", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const formationParam = searchParams.get("formation");
    if (formationParam) {
      setFormData(prev => ({ ...prev, parcours: formationParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Échec de l'inscription");
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Inscription reçue !</h3>
        <p className="text-slate-600 mb-6">Nous vous contacterons très vite au {formData.telephone} ou par email.</p>
        <button onClick={() => { setSuccess(false); setFormData({nom:"", prenom:"", email:"", telephone:"", parcours:"", niveau:"", message:""}); }} className="px-6 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 transition">
          Nouvelle inscription
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto space-y-6">
      {errorMsg && <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{errorMsg}</div>}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nom *</label>
          <input required name="nom" value={formData.nom} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Prénom *</label>
          <input required name="prenom" value={formData.prenom} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
          <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone / WhatsApp *</label>
          <input required name="telephone" value={formData.telephone} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Parcours souhaité *</label>
        <select required name="parcours" value={formData.parcours} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white">
          <option value="">-- Sélectionnez un parcours --</option>
          <option value="bac-a4">🎓 Préparation au Baccalauréat A4 & Pratique Musicale</option>
          <option value="musicale-modulaire">🎸 Formation Musicale Modulaire (Cycle Secondaire & Supérieur)</option>
          <option value="communes">🏛️ Culture, Tourisme & Développement Territorial</option>
          <option value="mao">🎧 Technique Musicale & MAO</option>
          <option value="communication">📱 Musique & Communication</option>
          <option value="management">💼 Musique & Management</option>
          <option value="production">🎤 Production & Événementiel Culturel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Niveau actuel</label>
        <select name="niveau" value={formData.niveau} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white">
          <option value="">-- Votre niveau --</option>
          <option value="debutant">Débutant complet</option>
          <option value="intermediaire">Intermédiaire</option>
          <option value="avance">Avancé / Professionnel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Message ou questions (optionnel)</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none" />
      </div>

      <button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg ${isSubmitting ? "bg-slate-400 text-white cursor-not-allowed" : "bg-amber-500 text-indigo-900 hover:bg-amber-400"}`}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer mon inscription →"}
      </button>
    </form>
  );
}