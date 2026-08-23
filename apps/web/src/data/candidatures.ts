export type StatutCandidature = 
  | "DRAFT" 
  | "SUBMITTED" 
  | "UNDER_REVIEW" 
  | "TEST_SCHEDULED" 
  | "TEST_DONE" 
  | "EVALUATED" 
  | "ADMITTED" 
  | "REJECTED" 
  | "REORIENTED" 
  | "VALIDATED";

export type NiveauPropose = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PERFECTING" | null;

export interface Candidature {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  dateNaissance: string;
  formation: string;
  instrument?: string;
  niveauEtudes: string;
  statut: StatutCandidature;
  dateCreation: string;
  dateTest?: string;
  heureTest?: string;
  lieuTest?: string;
  evaluateur?: string;
  niveauPropose?: NiveauPropose;
  observations?: string;
  typeCandidat: "INDIVIDUEL" | "INSTITUTIONNEL";
}

export const candidatures: Candidature[] = [
  {
    id: "C001",
    nom: "KODJO",
    prenom: "Kossi",
    email: "kossi.kodjo@email.com",
    telephone: "+228 90 12 34 56",
    ville: "Kpalimé",
    dateNaissance: "2005-03-15",
    formation: "Formation Musicale - Guitare",
    instrument: "Guitare",
    niveauEtudes: "BEPC",
    statut: "TEST_SCHEDULED",
    dateCreation: "2026-08-10",
    dateTest: "2026-08-25",
    heureTest: "10h00",
    lieuTest: "CEAA Kpalimé - Salle A",
    evaluateur: "M. AGBEY",
    typeCandidat: "INDIVIDUEL"
  },
  {
    id: "C002",
    nom: "AMETEPE",
    prenom: "Akossiwa",
    email: "akossiwa.ametepe@email.com",
    telephone: "+228 91 23 45 67",
    ville: "Lomé",
    dateNaissance: "2003-07-22",
    formation: "Préparation au Baccalauréat Série A4",
    instrument: "Piano",
    niveauEtudes: "BAC",
    statut: "EVALUATED",
    dateCreation: "2026-08-05",
    dateTest: "2026-08-15",
    heureTest: "14h00",
    lieuTest: "CEAA Kpalimé - Salle Piano",
    evaluateur: "Mme DOSSOU",
    niveauPropose: "INTERMEDIATE",
    observations: "Bonne technique, oreille musicale à développer",
    typeCandidat: "INDIVIDUEL"
  },
  {
    id: "C003",
    nom: "TCHOUKPE",
    prenom: "Essè",
    email: "esse.tchoukpe@email.com",
    telephone: "+228 92 34 56 78",
    ville: "Atakpamé",
    dateNaissance: "2008-11-03",
    formation: "Formation Musicale - Batterie",
    instrument: "Batterie",
    niveauEtudes: "BEPC",
    statut: "SUBMITTED",
    dateCreation: "2026-08-15",
    typeCandidat: "INDIVIDUEL"
  },
  {
    id: "C004",
    nom: "MAVOUENGOU",
    prenom: "Komi",
    email: "komi.mav@email.com",
    telephone: "+228 93 45 67 89",
    ville: "Kpalimé",
    dateNaissance: "1998-05-18",
    formation: "Formation Musicale - Guitare",
    instrument: "Guitare",
    niveauEtudes: "BAC+2",
    statut: "ADMITTED",
    dateCreation: "2026-07-20",
    dateTest: "2026-08-01",
    evaluateur: "M. AGBEY",
    niveauPropose: "ADVANCED",
    typeCandidat: "INDIVIDUEL"
  },
  {
    id: "C005",
    nom: "AGBETI",
    prenom: "Afi",
    email: "afi.agbeti@email.com",
    telephone: "+228 94 56 78 90",
    ville: "Tsévié",
    dateNaissance: "2006-09-12",
    formation: "Formation Musicale - Chant",
    instrument: "Chant",
    niveauEtudes: "BEPC",
    statut: "UNDER_REVIEW",
    dateCreation: "2026-08-14",
    typeCandidat: "INDIVIDUEL"
  },
  {
    id: "C006",
    nom: "Commune de Kpalimé",
    prenom: "Service Culture",
    email: "culture@mairie-kpalime.tg",
    telephone: "+228 22 34 56 78",
    ville: "Kpalimé",
    dateNaissance: "-",
    formation: "Culture, Tourisme & Développement Territorial",
    niveauEtudes: "-",
    statut: "VALIDATED",
    dateCreation: "2026-07-10",
    typeCandidat: "INSTITUTIONNEL"
  },
  {
    id: "C007",
    nom: "ADJAVON",
    prenom: "Yao",
    email: "yao.adjavon@email.com",
    telephone: "+228 95 67 89 01",
    ville: "Notsé",
    dateNaissance: "2004-01-28",
    formation: "Formation Musicale - Violon",
    instrument: "Violon",
    niveauEtudes: "BAC",
    statut: "TEST_DONE",
    dateCreation: "2026-08-08",
    dateTest: "2026-08-18",
    evaluateur: "Mme DOSSOU",
    typeCandidat: "INDIVIDUEL"
  },
  {
    id: "C008",
    nom: "KLU",
    prenom: "Mensah",
    email: "mensah.klu@email.com",
    telephone: "+228 96 78 90 12",
    ville: "Kpalimé",
    dateNaissance: "2007-06-05",
    formation: "Formation Musicale - Piano",
    instrument: "Piano",
    niveauEtudes: "BEPC",
    statut: "DRAFT",
    dateCreation: "2026-08-17",
    typeCandidat: "INDIVIDUEL"
  }
];
