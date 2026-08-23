const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Injection des vraies formations du CEAA Kpalimé...");

  // 1. Nettoyer les anciennes fausses données
  await prisma.training.deleteMany({});
  await prisma.instrument.deleteMany({});
  console.log("✅ Anciennes données nettoyées");

  // 2. Créer les instruments réels
  const instruments = [
    { name: "Piano / Clavier", category: "CLAVIER" },
    { name: "Guitare", category: "CORDE" },
    { name: "Basse", category: "CORDE" },
    { name: "Batterie", category: "PERCUSSION" },
    { name: "Percussions Traditionnelles", category: "PERCUSSION" },
    { name: "Chant / Voix", category: "VOCAL" },
    { name: "MAO / Production", category: "NUMERIQUE" }
  ];

  for (const inst of instruments) {
    await prisma.instrument.create({ data: inst });
  }
  console.log("✅ Instruments créés");

  // 3. Créer les VRAIES formations du catalogue
  const formations = [
    {
      name: "Pratiques Musicales",
      slug: "pratiques-musicales",
      description: "Développez votre voix et votre musicalité. Technique vocale, rythme, écoute, interprétation, expression scénique et pratique collective.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Artistes, chanteurs, autodidactes",
      modules: "Technique vocale • Rythme • Écoute • Interprétation • Ensemble • Scène",
      requiresMusicTest: true
    },
    {
      name: "Pratiques Instrumentales",
      slug: "pratiques-instrumentales",
      description: "Apprenez, jouez, accompagnez. Maîtrise technique, théorie appliquée, accompagnement, ensemble, improvisation et interprétation.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Musiciens, instrumentistes, passionnés",
      modules: "Instrument • Technique • Théorie appliquée • Accompagnement • Ensemble • Improvisation",
      requiresMusicTest: true
    },
    {
      name: "Technique Musicale & MAO",
      slug: "technique-musicale-mao",
      description: "Passez de l'idée musicale à la production numérique. Théorie, harmonie, arrangement, MAO, production, enregistrement et édition audio.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Beatmakers, producteurs, techniciens son",
      modules: "Théorie • Harmonie • Arrangement • MAO • Production • Enregistrement • Édition audio",
      requiresMusicTest: false
    },
    {
      name: "Musique & Communication",
      slug: "musique-communication",
      description: "Faites connaître votre talent. Identité artistique, réseaux sociaux, création de contenus, marketing digital, promotion et relations médias.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Créateurs de contenus, community managers artistiques",
      modules: "Communication • Réseaux sociaux • Création de contenus • Marketing • Promotion • Médias",
      requiresMusicTest: false
    },
    {
      name: "Musique & Management",
      slug: "musique-management",
      description: "Accompagnez un artiste et développez sa carrière. Booking, production, événementiel, partenariats, gestion budgétaire et entrepreneuriat culturel.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Futurs managers, organisateurs, entrepreneurs culturels",
      modules: "Management • Booking • Production • Événementiel • Partenariats • Gestion • Entrepreneuriat",
      requiresMusicTest: false
    },
    {
      name: "Production & Événementiel Culturel",
      slug: "production-evenementiel",
      description: "Maîtrisez la production culturelle. Régie, logistique, programmation, budget, coordination et gestion de projets événementiels.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Régisseurs, producteurs, organisateurs d'événements",
      modules: "Production • Régie • Logistique • Programmation • Budget • Coordination",
      requiresMusicTest: false
    },
    {
      name: "Création de Contenus Musicaux & Culturels",
      slug: "creation-contenus",
      description: "Photo, vidéo, montage, storytelling. Apprenez à créer des contenus courts percutants pour valoriser les artistes et les projets culturels.",
      durationMonths: 5,
      priceMonthly: 42000,
      targetAudience: "Photographes, vidéastes, créateurs digitaux",
      modules: "Photo • Vidéo • Montage • Storytelling • Réseaux sociaux • Contenus courts",
      requiresMusicTest: false
    },
    {
      name: "Entrepreneuriat Culturel",
      slug: "entrepreneuriat-culturel",
      description: "Transformez votre projet culturel en activité viable. Business model, budget, marketing, financement, gestion et développement de projet.",
      durationMonths: 4,
      priceMonthly: 42000,
      targetAudience: "Porteurs de projets, associations, structures culturelles",
      modules: "Business model • Budget • Marketing • Financement • Gestion • Projet culturel",
      requiresMusicTest: false
    },
    {
      name: "Formation pour Communes & Acteurs Locaux",
      slug: "formation-communes",
      description: "Aidez les collectivités à concevoir leurs politiques culturelles. Valorisation du patrimoine, tourisme local, animation culturelle et gestion de projets territoriaux.",
      durationMonths: 3,
      priceMonthly: null, // Sur devis
      targetAudience: "Mairies, collectivités, services culturels, associations",
      modules: "Politique culturelle • Patrimoine • Tourisme local • Animation • Gestion de projets",
      requiresMusicTest: false
    }
  ];

  for (const f of formations) {
    await prisma.training.create({ data: f });
    console.log(`✅ Formation créée: ${f.name}`);
  }

  console.log("🎉 Catalogue réel du CEAA Kpalimé injecté avec succès !");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });