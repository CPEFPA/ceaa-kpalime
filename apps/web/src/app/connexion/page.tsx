"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "ADMIN" | "FORMATEUR" | "APPRENANT" | "COMMUNE" | "CANDIDAT" | "EVALUATEUR";

interface RoleInfo {
  key: Role;
  nom: string;
  description: string;
  icon: string;
  color: string;
  redirect: string;
}

const roles: RoleInfo[] = [
  { key: "ADMIN", nom: "Administration", description: "Gestion des candidatures, tests et admissions", icon: "👨‍💼", color: "border-indigo-500 bg-indigo-50 text-indigo-800", redirect: "/admin" },
  { key: "FORMATEUR", nom: "Formateur", description: "Cours, présences et suivi des apprenants", icon: "🎓", color: "border-emerald-500 bg-emerald-50 text-emerald-800", redirect: "/formateur" },
  { key: "APPRENANT", nom: "Apprenant", description: "Mes cours, devoirs et calendrier", icon: "🎵", color: "border-violet-500 bg-violet-50 text-violet-800", redirect: "/apprenant" },
  { key: "COMMUNE", nom: "Commune / Institution", description: "Demandes de formation territoriale", icon: "🏛️", color: "border-blue-500 bg-blue-50 text-blue-800", redirect: "/commune" },
  { key: "EVALUATEUR", nom: "Évaluateur", description: "Fiches d'évaluation instrumentale", icon: "🎼", color: "border-orange-500 bg-orange-50 text-orange-800", redirect: "/admin/candidatures" },
  { key: "CANDIDAT", nom: "Candidat", description: "Suivi de mon dossier d'inscription", icon: "📋", color: "border-amber-500 bg-amber-50 text-amber-800", redirect: "/candidat" }
];

export default function ConnexionPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelectionne, setRoleSelectionne] = useState<Role>("CANDIDAT");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erreur de connexion");
        setLoading(false);
        return;
      }

      // Sauvegarder le token et les infos utilisateur
      localStorage.setItem("ceaa_token", data.token);
      localStorage.setItem("ceaa_user", JSON.stringify(data.user));

      setMessage("Connexion réussie ! Redirection...");
      setTimeout(() => {
        router.push(data.redirect);
      }, 800);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur de connexion au serveur");
      setLoading(false);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage("Veuillez entrer votre adresse e-mail.");
      return;
    }
    setMessage(`Un e-mail de récupération a été envoyé à ${email}`);
  };

  const roleActif = roles.find(r => r.key === roleSelectionne)!;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 text-white hover:opacity-80 transition">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-indigo-900 text-2xl">🎵</div>
          <div>
            <h1 className="text-xl font-bold leading-tight">CEAA Kpalimé</h1>
            <p className="text-xs text-indigo-200">Plateforme numérique - Filière Musicale</p>
          </div>
        </Link>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Colonne gauche : Sélection du rôle */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-2">Qui êtes-vous ?</h2>
            <p className="text-sm text-indigo-200 mb-6">Sélectionnez votre profil pour accéder à votre espace dédié.</p>

            <div className="space-y-2">
              {roles.map(r => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRoleSelectionne(r.key)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition flex items-center gap-3 ${
                    roleSelectionne === r.key
                      ? r.color + " border-current shadow-md"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{r.nom}</p>
                    <p className="text-xs opacity-80">{r.description}</p>
                  </div>
                  {roleSelectionne === r.key && (
                    <span className="text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-indigo-200">
                Pas encore de compte ?{" "}
                <Link href="/inscription" className="text-amber-400 font-semibold hover:text-amber-300">
                  Créer un compte candidat
                </Link>
              </p>
            </div>
          </div>

          {/* Colonne droite : Formulaire */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${roleActif.color.split(" ")[1]}`}>
                {roleActif.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {mode === "login" ? `Connexion ${roleActif.nom}` : "Récupération de compte"}
                </h2>
                <p className="text-xs text-slate-500">
                  {mode === "login"
                    ? `Accédez à votre espace ${roleActif.nom.toLowerCase()}`
                    : "Entrez votre e-mail pour recevoir un lien"}
                </p>
              </div>
            </div>

            {message && (
              <div className={`mb-4 p-3 border rounded-lg text-sm ${
                message.includes("réussie") || message.includes("envoyé")
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={mode === "login" ? handleSubmit : handleForgot} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Adresse e-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="exemple@email.com"
                  required
                />
              </div>

              {mode === "login" && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
                    <button type="button" onClick={() => setMode("forgot")} className="text-xs text-indigo-600 hover:text-indigo-800">
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-900 text-white font-bold rounded-lg hover:bg-indigo-800 transition shadow-md disabled:bg-slate-400"
              >
                {loading ? "Connexion en cours..." : mode === "login" ? `Se connecter` : "Envoyer le lien"}
              </button>
            </form>

            {mode === "forgot" && (
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <button onClick={() => { setMode("login"); setMessage(""); }} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  ← Retour à la connexion
                </button>
              </div>
            )}

            {/* Comptes de démonstration */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center mb-3">🔑 Comptes de démonstration</p>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-50 rounded">
                  <p className="font-semibold">Admin:</p>
                  <p className="text-slate-600">admin@ceaa.tg / admin123</p>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <p className="font-semibold">Formateur:</p>
                  <p className="text-slate-600">formateur@ceaa.tg / trainer123</p>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <p className="font-semibold">Apprenant:</p>
                  <p className="text-slate-600">apprenant@ceaa.tg / learner123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lien retour */}
        <div className="mt-6 text-center text-sm text-indigo-200">
          <Link href="/" className="hover:text-white transition">← Retour à l'accueil</Link>
        </div>
      </div>
    </main>
  );
}