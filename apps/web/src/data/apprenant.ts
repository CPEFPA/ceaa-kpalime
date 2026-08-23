export interface ApprenantProfil {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  instrument: string;
  niveau: string;
  groupe: string;
  formateur: string;
  progression: number;
  dateAdmission: string;
}

export interface CoursEnLigne {
  id: string;
  titre: string;
  description: string;
  module: string;
  duree: string;
  datePublication: string;
  type: "VIDEO" | "PDF" | "AUDIO" | "EXERCICE";
  url: string;
  progression: number; // 0 à 100
  termine: boolean;
}

export interface Devoir {
  id: string;
  titre: string;
  coursId: string;
  description: string;
  dateLimite: string;
  statut: "A_RENDRE" | "RENDU" | "CORRIGE" | "EN_RETARD";
  note?: number;
  appreciation?: string;
  dateRendu?: string;
}

export interface EvenementCalendrier {
  id: string;
  titre: string;
  date: string;
  heure: string;
  duree: string;
  lieu: string;
  type: "COURS" | "DEVOIR" | "EXAMEN" | "REPETITION" | "EVENEMENT";
  description?: string;
}

export const apprenantActuel: ApprenantProfil = {
  id: "A001",
  nom: "KODJO",
  prenom: "Kossi",
  email: "kossi.kodjo@email.com",
  instrument: "Guitare",
  niveau: "Débutant",
  groupe: "GUIT-DEB-A",
  formateur: "M. AGBEY",
  progression: 35,
  dateAdmission: "2026-08-20"
};

export const coursEnLigne: CoursEnLigne[] = [
  { id: "C01", titre: "Introduction à la guitare classique", description: "Présentation de l'instrument, posture, tenue de la guitare.", module: "Technique instrumentale", duree: "25 min", datePublication: "2026-08-21", type: "VIDEO", url: "#", progression: 100, termine: true },
  { id: "C02", titre: "Les accords majeurs ouverts", description: "Apprentissage des accords Do, Ré, Mi, Sol, La.", module: "Technique instrumentale", duree: "40 min", datePublication: "2026-08-22", type: "VIDEO", url: "#", progression: 75, termine: false },
  { id: "C03", titre: "Fiche pratique - Accords de base", description: "PDF récapitulatif des principaux accords ouverts avec schémas.", module: "Technique instrumentale", duree: "5 min", datePublication: "2026-08-22", type: "PDF", url: "#", progression: 100, termine: true },
  { id: "C04", titre: "Solfège - Les figures de notes", description: "Ronde, blanche, noire, croche : durée et comptage.", module: "Solfège", duree: "30 min", datePublication: "2026-08-23", type: "VIDEO", url: "#", progression: 50, termine: false },
  { id: "C05", titre: "Exercice de rythme n°1", description: "Audio pour travailler les rythmes de base.", module: "Solfège", duree: "10 min", datePublication: "2026-08-23", type: "AUDIO", url: "#", progression: 0, termine: false },
  { id: "C06", titre: "Exercices d'application - Accords", description: "Série d'exercices pour pratiquer les changements d'accords.", module: "Technique instrumentale", duree: "15 min", datePublication: "2026-08-24", type: "EXERCICE", url: "#", progression: 0, termine: false }
];

export const devoirs: Devoir[] = [
  { id: "D01", titre: "Enregistrement : progression d'accords", coursId: "C02", description: "Enregistrez-vous en train de jouer la progression Do - Sol - Ré - Do. Durée : 2 minutes minimum.", dateLimite: "2026-08-28", statut: "A_RENDRE" },
  { id: "D02", titre: "Quiz solfège - Figures de notes", coursId: "C04", description: "Complétez le quiz en ligne sur les figures de notes et leur durée.", dateLimite: "2026-08-30", statut: "A_RENDRE" },
  { id: "D03", titre: "Exercice de rythme n°1", coursId: "C05", description: "Écoutez l'audio et reproduisez les rythmes à la guitare.", dateLimite: "2026-08-25", statut: "RENDU", dateRendu: "2026-08-24" },
  { id: "D04", titre: "Vidéo de présentation", coursId: "C01", description: "Présentez-vous et montrez la tenue correcte de la guitare.", dateLimite: "2026-08-22", statut: "CORRIGE", note: 16, appreciation: "Très bonne posture, attention au placement du pouce.", dateRendu: "2026-08-21" }
];

export const evenements: EvenementCalendrier[] = [
  { id: "E01", titre: "Cours de guitare - Technique", date: "2026-08-20", heure: "09:00", duree: "2h", lieu: "Salle Guitare A", type: "COURS", description: "Accords ouverts et changements" },
  { id: "E02", titre: "Cours de solfège", date: "2026-08-20", heure: "14:00", duree: "1h30", lieu: "Salle Théorie", type: "COURS", description: "Figures de notes" },
  { id: "E03", titre: "Devoir : Enregistrement accords", date: "2026-08-28", heure: "23:59", duree: "-", lieu: "En ligne", type: "DEVOIR" },
  { id: "E04", titre: "Répétition ensemble musical", date: "2026-08-23", heure: "16:00", duree: "2h30", lieu: "Salle de répétition", type: "REPETITION", description: "Préparation concert de fin d'année" },
  { id: "E05", titre: "Évaluation technique", date: "2026-09-05", heure: "10:00", duree: "30 min", lieu: "Salle Guitare A", type: "EXAMEN", description: "Évaluation des accords ouverts" },
  { id: "E06", titre: "Concert des apprenants", date: "2026-09-20", heure: "18:00", duree: "2h", lieu: "Salle de spectacle", type: "EVENEMENT", description: "Concert de fin de module" }
];