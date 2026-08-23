export interface ModuleTerritorial {
  id: string;
  code: string;
  titre: string;
  description: string;
  duree: string;
  domaine: "Culture" | "Tourisme" | "Patrimoine" | "Developpement" | "Gestion";
}

export interface DemandeCommune {
  id: string;
  nomCommune: string;
  region: string;
  responsable: string;
  fonction: string;
  email: string;
  telephone: string;
  domainesCibles: string[];
  modulesChoisis: string[]; // IDs des modules
  statut: "BROUILLON" | "SOUMIS" | "ANALYSE_BESOINS" | "PROGRAMME_DEFINI" | "CONVENTION_VALIDE" | "EN_COURS" | "TERMINE";
  dateSoumission: string;
  observationsAdmin?: string;
}

export const modulesTerritoriaux: ModuleTerritorial[] = [
  { id: "M01", code: "POL-CULT", titre: "Élaboration d'une politique culturelle communale", description: "Diagnostic, axes stratégiques et plan d'action pour la culture locale.", duree: "3 jours", domaine: "Culture" },
  { id: "M02", code: "VAL-PATR", titre: "Valorisation du patrimoine culturel et artistique", description: "Identification, protection et mise en valeur des sites et traditions.", duree: "2 jours", domaine: "Patrimoine" },
  { id: "M03", code: "DEV-TOUR", titre: "Développement du tourisme local", description: "Création d'offres touristiques durables et attractives.", duree: "3 jours", domaine: "Tourisme" },
  { id: "M04", code: "CULT-TERR", titre: "Culture et développement territorial", description: "Intégrer la culture comme levier de développement économique local.", duree: "2 jours", domaine: "Developpement" },
  { id: "M05", code: "GES-PROJ", titre: "Conception et gestion de projets culturels", description: "De l'idée à l'évaluation : montage, budget et recherche de financements.", duree: "4 jours", domaine: "Gestion" },
  { id: "M06", code: "ANI-CULT", titre: "Animation culturelle et événementielle", description: "Organisation de festivals, marchés d'art et événements locaux.", duree: "2 jours", domaine: "Culture" }
];

export const demandesMock: DemandeCommune[] = [
  {
    id: "DC-001",
    nomCommune: "Mairie de Kpalimé",
    region: "Plateaux",
    responsable: "M. Koffi AMEGAN",
    fonction: "Directeur des Affaires Culturelles",
    email: "culture@mairie-kpalime.tg",
    telephone: "+228 22 34 56 78",
    domainesCibles: ["Culture", "Tourisme"],
    modulesChoisis: ["M01", "M03", "M06"],
    statut: "CONVENTION_VALIDE",
    dateSoumission: "2026-07-10",
    observationsAdmin: "Convention signée. Formation prévue en septembre."
  },
  {
    id: "DC-002",
    nomCommune: "Commune de Vogan",
    region: "Maritime",
    responsable: "Mme Afi TETTEH",
    fonction: "Maire",
    email: "mairie@vogan.tg",
    telephone: "+228 22 45 67 89",
    domainesCibles: ["Patrimoine", "Developpement"],
    modulesChoisis: ["M02", "M04"],
    statut: "ANALYSE_BESOINS",
    dateSoumission: "2026-08-12"
  }
];