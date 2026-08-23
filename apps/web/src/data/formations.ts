export interface Formation {
  slug: string;
  name: string;
  description: string;
  targetAudience: string;
  requiredLevel: string;
  duration: string;
  modality: "Présentiel" | "En ligne" | "Hybride";
  requiresMusicTest: boolean;
  icon: string;
  tag: "Individuel" | "Institutionnel";
  modules: string[];
  objectives: string[];
  skills: string[];
  instrument?: string;
  admission: string[];
  documents: string[];
}

export const formations: Formation[] = [
  {
    slug: "formation-guitare",
    name: "Formation Musicale - Guitare",
    description: "Apprenez la guitare dans un parcours complet associant technique instrumentale, théorie musicale, lecture et pratique d'ensemble. Ce parcours s'adresse aux débutants comme aux musiciens souhaitant se perfectionner.",
    targetAudience: "Jeunes, adultes, artistes, musiciens souhaitant se former à la guitare",
    requiredLevel: "Accessible dès 10 ans - Test d'entrée requis",
    duration: "1 an (renouvelable) - 3h par semaine",
    modality: "Hybride",
    requiresMusicTest: true,
    icon: "🎸",
    tag: "Individuel",
    modules: [
      "Technique instrumentale",
      "Solfège et théorie musicale",
      "Lecture musicale",
      "Musique d'ensemble",
      "Répertoire togolais et africain",
      "Improvisation"
    ],
    objectives: [
      "Maîtriser les bases techniques de la guitare",
      "Lire et interpréter une partition",
      "Jouer en ensemble",
      "Développer son oreille musicale"
    ],
    skills: [
      "Technique digitale et rythmique",
      "Justesse et précision",
      "Lecture à vue",
      "Interprétation musicale"
    ],
    instrument: "Guitare",
    admission: [
      "Avoir au moins 10 ans",
      "Passer le test d'entrée instrumental",
      "Fournir un dossier complet"
    ],
    documents: [
      "Pièce d'identité",
      "Photo d'identité",
      "Dernier diplôme obtenu",
      "Fiche de renseignements signée"
    ]
  },
  {
    slug: "formation-piano",
    name: "Formation Musicale - Piano",
    description: "Parcours complet de formation pianistique alliant technique, répertoire classique, jazz et musiques africaines. Idéal pour développer une pratique solide et polyvalente.",
    targetAudience: "Enfants, adolescents, adultes - tous niveaux",
    requiredLevel: "Test d'entrée requis",
    duration: "1 an (renouvelable) - 2h30 par semaine",
    modality: "Présentiel",
    requiresMusicTest: true,
    icon: "🎹",
    tag: "Individuel",
    modules: [
      "Technique pianistique",
      "Solfège",
      "Harmonie",
      "Répertoire classique",
      "Jazz et musiques actuelles",
      "Accompagnement"
    ],
    objectives: [
      "Développer une technique pianistique solide",
      "Maîtriser l'harmonie de base",
      "Interpréter un répertoire varié"
    ],
    skills: [
      "Indépendance des mains",
      "Lecture pianistique",
      "Sensibilité musicale",
      "Mémorisation"
    ],
    instrument: "Piano",
    admission: ["Avoir au moins 8 ans", "Test d'entrée", "Dossier complet"],
    documents: ["Pièce d'identité", "Photo", "Dernier diplôme"]
  },
  {
    slug: "bac-a4",
    name: "Préparation au Baccalauréat Série A4",
    description: "Parcours associant enseignements généraux, culture musicale et pratique instrumentale pour préparer l'examen du Baccalauréat série A4 (Lettres et Arts). Une formation complète pour les futurs artistes et professionnels de la culture.",
    targetAudience: "Élèves de Terminale souhaitant passer le Bac A4",
    requiredLevel: "Niveau Première validé + test d'orientation musicale",
    duration: "1 an scolaire",
    modality: "Hybride",
    requiresMusicTest: true,
    icon: "🎓",
    tag: "Individuel",
    modules: [
      "Enseignements généraux (philosophie, lettres, langues)",
      "Culture musicale et histoire des arts",
      "Pratique instrumentale",
      "Analyse musicale",
      "Préparation aux épreuves du Bac A4"
    ],
    objectives: [
      "Réussir l'examen du Baccalauréat A4",
      "Acquérir une culture musicale solide",
      "Maîtriser un instrument à niveau d'examen"
    ],
    skills: [
      "Culture artistique générale",
      "Analyse d'œuvres musicales",
      "Pratique instrumentale avancée",
      "Méthodologie d'examen"
    ],
    instrument: "Au choix",
    admission: ["Être en classe de Terminale", "Test d'orientation musicale", "Dossier scolaire"],
    documents: ["Relevés de notes", "Pièce d'identité", "Photo", "Certificat de scolarité"]
  },
  {
    slug: "culture-tourisme-communes",
    name: "Culture, Tourisme & Développement Territorial",
    description: "Modules de formation destinés aux communes, collectivités et acteurs locaux souhaitant développer leurs politiques culturelles, valoriser leur patrimoine et structurer leur offre touristique. Formation hybride adaptée aux professionnels en activité.",
    targetAudience: "Mairies, collectivités territoriales, responsables culturels, acteurs du tourisme",
    requiredLevel: "Aucun prérequis - Pas de test musical",
    duration: "3 à 6 mois selon modules choisis",
    modality: "Hybride",
    requiresMusicTest: false,
    icon: "🏛️",
    tag: "Institutionnel",
    modules: [
      "Élaboration d'une politique culturelle communale",
      "Valorisation du patrimoine culturel et artistique",
      "Développement du tourisme local",
      "Culture et développement territorial",
      "Conception et gestion de projets culturels",
      "Animation culturelle et événementielle",
      "Communication et promotion du territoire"
    ],
    objectives: [
      "Structurer une offre culturelle territoriale",
      "Valoriser le patrimoine local",
      "Développer un tourisme culturel durable"
    ],
    skills: [
      "Gestion de projets culturels",
      "Animation territoriale",
      "Communication culturelle",
      "Partenariats institutionnels"
    ],
    admission: ["Être une collectivité ou structure partenaire", "Convention de formation"],
    documents: ["Convention signée", "Liste des participants", "Cahier des besoins"]
  }
];
