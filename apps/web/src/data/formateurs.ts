export interface Apprenant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  instrument: string;
  niveau: "DEBUTANT" | "INTERMEDIAIRE" | "AVANCE" | "PERFECTIONNEMENT";
  groupe: string;
  progression: number;
  dernierCours: string;
  presenceRate: number;
}

export interface Cours {
  id: string;
  titre: string;
  description: string;
  type: "THEORIE" | "PRATIQUE" | "ENSEMBLE" | "SOLFEGE";
  date: string;
  heure: string;
  duree: string;
  lieu: string;
  apprenants: string[];
  ressources: { nom: string; type: "PDF" | "VIDEO" | "AUDIO" }[];
}

export interface Presence {
  date: string;
  coursId: string;
  apprenants: { id: string; statut: "PRESENT" | "ABSENT" | "RETARD" }[];
}

export const formateurActuel = {
  id: "F001",
  nom: "AGBEY",
  prenom: "Kodjo",
  email: "kodjo.agbey@ceaa.tg",
  specialite: "Guitare & Musique d'ensemble",
  groupes: ["GUIT-DEB-A", "GUIT-INT-B", "ENS-ADV"]
};

export const apprenants: Apprenant[] = [
  { id: "A001", nom: "KODJO", prenom: "Kossi", email: "kossi.kodjo@email.com", telephone: "+228 90 12 34 56", instrument: "Guitare", niveau: "DEBUTANT", groupe: "GUIT-DEB-A", progression: 35, dernierCours: "2026-08-15", presenceRate: 92 },
  { id: "A002", nom: "AMETEPE", prenom: "Akossiwa", email: "akossiwa@email.com", telephone: "+228 91 23 45 67", instrument: "Guitare", niveau: "INTERMEDIAIRE", groupe: "GUIT-INT-B", progression: 65, dernierCours: "2026-08-15", presenceRate: 88 },
  { id: "A003", nom: "MAVOUENGOU", prenom: "Komi", email: "komi.mav@email.com", telephone: "+228 93 45 67 89", instrument: "Guitare", niveau: "AVANCE", groupe: "ENS-ADV", progression: 82, dernierCours: "2026-08-14", presenceRate: 95 },
  { id: "A004", nom: "ADJAVON", prenom: "Yao", email: "yao.adj@email.com", telephone: "+228 95 67 89 01", instrument: "Guitare", niveau: "INTERMEDIAIRE", groupe: "GUIT-INT-B", progression: 58, dernierCours: "2026-08-15", presenceRate: 75 },
  { id: "A005", nom: "KLU", prenom: "Mensah", email: "mensah.klu@email.com", telephone: "+228 96 78 90 12", instrument: "Guitare", niveau: "DEBUTANT", groupe: "GUIT-DEB-A", progression: 28, dernierCours: "2026-08-15", presenceRate: 85 },
  { id: "A006", nom: "AGBETI", prenom: "Afi", email: "afi.agbeti@email.com", telephone: "+228 94 56 78 90", instrument: "Guitare", niveau: "AVANCE", groupe: "ENS-ADV", progression: 90, dernierCours: "2026-08-14", presenceRate: 98 }
];

export const cours: Cours[] = [
  { id: "CR001", titre: "Technique de base - Accords ouverts", description: "Apprentissage des accords majeurs et mineurs en position ouverte. Exercices de changement d'accords.", type: "PRATIQUE", date: "2026-08-20", heure: "09:00", duree: "2h", lieu: "Salle Guitare A", apprenants: ["A001", "A005"], ressources: [{ nom: "Fiche accords.pdf", type: "PDF" }, { nom: "Démonstration.mp4", type: "VIDEO" }] },
  { id: "CR002", titre: "Solfège rythmique - Niveau 2", description: "Lecture rythmique, noires, croches et syncopes. Exercices de dictée rythmique.", type: "SOLFEGE", date: "2026-08-20", heure: "14:00", duree: "1h30", lieu: "Salle Théorie", apprenants: ["A002", "A004"], ressources: [{ nom: "Exercices rythmiques.pdf", type: "PDF" }] },
  { id: "CR003", titre: "Musique d'ensemble - Répertoire togolais", description: "Travail d'ensemble sur des arrangements de morceaux traditionnels togolais. Préparation au concert.", type: "ENSEMBLE", date: "2026-08-21", heure: "16:00", duree: "2h30", lieu: "Salle de répétition", apprenants: ["A003", "A006"], ressources: [{ nom: "Partitions.pdf", type: "PDF" }, { nom: "Enregistrement_ref.mp3", type: "AUDIO" }] },
  { id: "CR004", titre: "Harmonie et accompagnement", description: "Notions d'harmonie, enchaînements d'accords, accompagnement de chant.", type: "THEORIE", date: "2026-08-22", heure: "10:00", duree: "1h30", lieu: "Salle Théorie", apprenants: ["A002", "A003", "A004"], ressources: [{ nom: "Cours harmonie.pdf", type: "PDF" }] }
];