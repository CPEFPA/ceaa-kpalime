import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "CEAA Kpalimé - Filière Musicale",
  description: "Centre d'Enseignement Artistique et Artisanal de Kpalimé",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {/* pt-16 lg:pt-0 ajoute de l'espace en haut sur mobile pour ne pas cacher le contenu sous le menu fixe */}
      <body className="pt-16 lg:pt-0 bg-slate-50 text-slate-900 antialiased">
        <MobileNav />
        
        <div className="flex min-h-screen">
          {/* Barre Latérale Fixe (visible uniquement sur grand écran grâce à hidden lg:flex dans le composant Sidebar) */}
          <Sidebar />
          
          {/* Contenu Principal */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}