const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Début de l\'injection des formations...');

  const formations = [
    {
      name: "Pratiques Musicales",
      description: "Développez votre voix et votre présence scénique à travers une pratique musicale complète et encadrée.",
      targetAudience: "Jeunes, adultes, chanteurs",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Technique vocale • Rythme • Écoute • Interprétation • Ensemble • Scène",
      requiresMusicTest: false
    },
    {
      name: "Pratiques Instrumentales",
      description: "Maîtrisez votre instrument (clavier, guitare, basse, batterie, percussions) et apprenez à jouer en groupe.",
      targetAudience: "Instrumentistes débutants à confirmés",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Instrument • Technique • Théorie appliquée • Accompagnement • Ensemble • Improvisation",
      requiresMusicTest: false
    },
    {
      name: "Technique Musicale & MAO",
      description: "De la théorie musicale à la production sur ordinateur, maîtrisez les outils de la création musicale moderne.",
      targetAudience: "Futurs producteurs et ingénieurs du son",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Théorie • Harmonie • Arrangement • MAO • Production • Enregistrement • Édition audio",
      requiresMusicTest: false
    },
    {
      name: "Musique & Communication",
      description: "Apprenez à promouvoir un artiste, gérer une image de marque et créer des stratégies de communication digitale.",
      targetAudience: "Artistes, community managers",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Communication • Réseaux sociaux • Création de contenus • Marketing • Promotion • Médias",
      requiresMusicTest: false
    },
    {
      name: "Musique & Management",
      description: "Les clés pour gérer une carrière artistique, négocier des contrats et organiser des tournées.",
      targetAudience: "Managers, agents artistiques",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Management • Booking • Production • Événementiel • Partenariats • Gestion • Entrepreneuriat",
      requiresMusicTest: false
    },
    {
      name: "Production & Événementiel Culturel",
      description: "Concevez et réalisez des événements culturels de A à Z : de la logistique à la régie technique.",
      targetAudience: "Directeurs techniques, organisateurs",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Production • Régie • Logistique • Programmation • Budget • Coordination",
      requiresMusicTest: false
    },
    {
      name: "Création de contenus musicaux & culturels",
      description: "Maîtrisez la captation, le montage et la diffusion de contenus courts et impactants pour le web.",
      targetAudience: "Créateurs de contenu, vidéastes",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Photo • Vidéo • Montage • Storytelling • Réseaux sociaux • Contenus courts",
      requiresMusicTest: false
    },
    {
      name: "Entrepreneuriat Culturel",
      description: "Transformez votre passion en entreprise viable : business plan, recherche de financements et gestion.",
      targetAudience: "Porteurs de projets culturels",
      durationMonths: 6,
      priceMonthly: 42000,
      modules: "Business model • Budget • Marketing • Financement • Gestion • Projet culturel",
      requiresMusicTest: false
    }
  ];

  // Injection en base en IGNORANT les doublons (skipDuplicates)
  // Cela évite l'erreur de suppression liée aux clés étrangères
  const result = await prisma.training.createMany({
    data: formations,
    skipDuplicates: true
  });

  console.log(`✅ Succès ! ${result.count} formation(s) ajoutée(s) ou mise(s) à jour en toute sécurité.`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });