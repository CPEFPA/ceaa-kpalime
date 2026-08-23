"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Accueil", href: "/", icon: "🏠" },
  { name: "Formations", href: "/formations", icon: "🎓" },
  { name: "Débouchés", href: "/debouches", icon: "💼" },
  { name: "S'inscrire", href: "/inscription", icon: "✍️" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Barre du haut */}
      <div className="flex justify-between items-center px-4 py-3">
        <Link href="/" className="font-bold text-indigo-900 text-lg">
          CEAA Kpalimé
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
          aria-label="Menu"
        >
          {isOpen ? (
            <span className="text-2xl leading-none">✕</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Menu déroulant */}
      {isOpen && (
        <div className="bg-white border-t border-slate-100 shadow-lg absolute w-full left-0 top-full">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <Link
              href="/inscription"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full text-center px-4 py-3 bg-amber-500 text-indigo-900 font-bold rounded-lg hover:bg-amber-400 transition"
            >
              S'inscrire maintenant →
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}