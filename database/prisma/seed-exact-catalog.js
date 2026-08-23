const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Injection EXACTE du catalogue CEAA Kpalimé 2026-2027...");

  const formations = [
    // PARCOURS ACADÉMIQUE (Flyer)
    { 
      name: "Préparation au Baccalauréat A4 & Pratique Musicale", 
      slug: "preparation-bac-a4", 
      description: "Parcours conçu pour préparer le Bac série A4 tout en développant une véritable compétence musicale. Approche académique, artistique et pratique.",
      durationMonths: 12, priceMonthly: null, targetAudience: "Lycéens, candidats officiels ou libres au Bac A4",
      modules: "Enseignements généraux • Préparation épreuves Bac A4 • Formation musicale • Pratique instrumentale • Compétences artistiques",
      requiresMusicTest: true, category: "ACADEMIQUE" 
    },
    
    // FORMATION MUSICALE MODULAIRE (Flyer + Catalogue)
    { 
      name: "Formation Musicale Modulaire (Cycle Secondaire & Supérieur)", 
      slug: "formation-musicale-modulaire", 
      description: "Programme adapté à différents profils et niveaux : cycle secondaire, supérieur, théorie, culture musicale, perfectionnement et professionnalisation.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Jeunes, adultes, élèves, personnes en reprise d'études",
      modules: "Formation modulaire • Cycle secondaire/supérieur • Théorie & Culture musicales • Perfectionnement • Professionnalisation",
      requiresMusicTest: true, category: "MUSICALE" 
    },

    // PRATIQUES MUSICALES (Catalogue p.02)
    { 
      name: "Pratiques Musicales", 
      slug: "pratiques-musicales", 
      description: "Développez votre voix et votre musicalité. Technique vocale, rythme, écoute, interprétation, expression scénique et pratique collective.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Artistes, chanteurs, autodidactes",
      modules: "Technique vocale • Rythme • Écoute • Interprétation • Ensemble • Scène • Culture musicale • Théorie appliquée",
      requiresMusicTest: true, category: "MUSICALE" 
    },

    // PRATIQUES INSTRUMENTALES (Catalogue p.03)
    { 
      name: "Pratiques Instrumentales", 
      slug: "pratiques-instrumentales", 
      description: "Apprenez, jouez, accompagnez. Maîtrise technique, théorie appliquée, accompagnement, ensemble, improvisation et interprétation.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Musiciens, instrumentistes, passionnés",
      modules: "Instrument • Technique • Théorie appliquée • Accompagnement • Ensemble • Improvisation • Interprétation",
      requiresMusicTest: true, category: "MUSICALE" 
    },

    // TECHNIQUE MUSICALE & MAO (Catalogue p.06)
    { 
      name: "Technique Musicale & MAO", 
      slug: "technique-musicale-mao", 
      description: "Passez de l'idée musicale à la production numérique. Théorie, harmonie, arrangement, MAO, production, enregistrement et édition audio.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Beatmakers, producteurs, techniciens son",
      modules: "Théorie • Harmonie • Arrangement • MAO • Production • Enregistrement • Édition audio • Programmation rythmique • Mixage",
      requiresMusicTest: false, category: "PROFESSIONNELLE" 
    },

    // MUSIQUE & COMMUNICATION (Catalogue p.04)
    { 
      name: "Musique & Communication", 
      slug: "musique-communication", 
      description: "Faites connaître votre talent. Identité artistique, réseaux sociaux, création de contenus, marketing digital, promotion et relations médias.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Créateurs de contenus, community managers artistiques",
      modules: "Identité artistique • Réseaux sociaux • Création de contenus • Marketing digital • Promotion artistique • Relations médias • Photo & vidéo",
      requiresMusicTest: false, category: "PROFESSIONNELLE" 
    },

    // MUSIQUE & MANAGEMENT (Catalogue p.05)
    { 
      name: "Musique & Management", 
      slug: "musique-management", 
      description: "Accompagnez un artiste et développez sa carrière. Booking, production, événementiel, partenariats, gestion budgétaire et entrepreneuriat culturel.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Futurs managers, organisateurs, entrepreneurs culturels",
      modules: "Management • Booking • Production • Événementiel • Partenariats • Gestion budgétaire • Entrepreneuriat culturel",
      requiresMusicTest: false, category: "PROFESSIONNELLE" 
    },

    // PRODUCTION & ÉVÉNEMENTIEL (Catalogue Tableau)
    { 
      name: "Production & Événementiel Culturel", 
      slug: "production-evenementiel", 
      description: "Maîtrisez la production culturelle. Régie, logistique, programmation, budget, coordination et gestion de projets événementiels.",
      durationMonths: 6, priceMonthly: 42000, targetAudience: "Régisseurs, producteurs, organisateurs d'événements",
      modules: "Production • Régie • Logistique • Programmation • Budget • Coordination",
      requiresMusicTest: false, category: "PROFESSIONNELLE" 
    },

    // CRÉATION DE CONTENUS (Catalogue Tableau)
    { 
      name: "Création de Contenus Musicaux & Culturels", 
      slug: "creation-contenus", 
      description: "Photo, vidéo, montage, storytelling. Apprenez à créer des contenus courts percutants pour valoriser les artistes et les projets culturels.",
      durationMonths: 5, priceMonthly: 42000, targetAudience: "Photographes, vidéastes, créateurs digitaux",
      modules: "Photo • Vidéo • Montage • Storytelling • Réseaux sociaux • Contenus courts",
      requiresMusicTest: false, category: "PROFESSIONNELLE" 
    },

    // ENTREPRENEURIAT CULTUREL (Catalogue Tableau)
    { 
      name: "Entrepreneuriat Culturel", 
      slug: "entrepreneuriat-culturel", 
      description: "Transformez votre projet culturel en activité viable. Business model, budget, marketing, financement, gestion et développement de projet.",
      durationMonths: 4, priceMonthly: 42000, targetAudience: "Porteurs de projets, associations, structures culturelles",
      modules: "Business model • Budget • Marketing • Financement • Gestion • Projet culturel",
      requiresMusicTest: false, category: "PROFESSIONNELLE" 
    },

    // CULTURE, TOURISME & TERRITOIRE (Flyer - Pour les Communes)
    { 
      name: "Culture, Tourisme & Développement Territorial", 
      slug: "culture-tourisme-territoire", 
      description: "Formation pratique pour aider les collectivités à identifier, valoriser, promouvoir et développer leurs ressources culturelles, touristiques et patrimoniales.",
      durationMonths: 3, priceMonthly: null, targetAudience: "Mairies, collectivités territoriales, services culturels, associations, acteurs du tourisme",
      modules: "Politique culturelle communale • Patrimoine culturel • Ressources du territoire • Tourisme local • Animation événementielle • Gestion projets culturels • Communication territoriale",
      requiresMusicTest: false, category: "INSTITUTIONNELLE" 
    }
  ];

  for (const f of formations) {
    await prisma.training.upsert({
      where: { slug: f.slug },
      update: f,
      create: f
    });
    console.log(`✅ ${f.name} (${f.category})`);
  }

  console.log(" Catalogue EXACT CEAA Kpalimé 2026-2027 injecté !");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());