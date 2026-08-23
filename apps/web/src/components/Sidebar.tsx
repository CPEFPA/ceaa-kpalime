"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Accueil", href: "/", icon: "" },
  { name: "Nos Formations", href: "/formations", icon: "🎓" },
  { name: "Débouchés", href: "/debouches", icon: "💼" },
  { name: "S'inscrire", href: "/inscription", icon: "✍️" },
];

const sectionLinks = [
  { name: "Parcours Stratégiques", href: "#parcours-strategiques", icon: "⭐" },
  { name: "Catalogue Pro", href: "#catalogue-pro", icon: "🎧" },
  { name: "Tarifs & Formules", href: "#tarifs", icon: "💰" },
  { name: "Documentation", href: "#documentation", icon: "📄" },
  { name: "Contact", href: "#contact", icon: "📞" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isFormationsPage = pathname === "/formations";

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-slate-200 p-6 overflow-y-auto">
      {/* Logo / Titre */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-indigo-900">CEAA Kpalimé</h2>
        <p className="text-xs text-slate-500 mt-1">Filière Musicale & Culturelle</p>
      </div>

      {/* Navigation Principale */}
      <nav className="space-y-2 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Menu Principal</p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Liens Rapides (Uniquement sur la page Formations) */}
      {isFormationsPage && (
        <nav className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Sur cette page</p>
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
            >
              <span>{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
      )}

      {/* Footer Sidebar */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400">Rentrée 2026-2027</p>
        <p className="text-xs text-slate-400 mt-1">Kpalimé, Togo</p>
      </div>
    </aside>
  );
}