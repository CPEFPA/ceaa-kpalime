const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mise à jour sécurisée avec le vrai catalogue CEAA...");

  // 1. Mettre à jour la formation existante "Formation Musicale" en "Pratiques Musicales"
  const existingTraining = await prisma.training.findFirst({ where: { name: "Formation Musicale" } });
  
  if (existingTraining) {
    await prisma.training.update({
      where: { id: existingTraining.id },
      data: {
        name: "Pratiques Musicales",
        slug: "pratiques-musicales",
        description: "Développez votre voix et votre musicalité. Technique vocale, rythme, écoute, interprétation, expression scénique et pratique collective.",
        durationMonths: 6,
        priceMonthly: 42000,
        targetAudience: "Artistes, chanteurs, autodidactes",
        modules: "Technique vocale • Rythme • Écoute • Interprétation • Ensemble • Scène",
        requiresMusicTest: true
      }
    });
    console.log("✅ 'Formation Musicale' mise à jour vers 'Pratiques Musicales'");
  } else {
    // Si elle n'existe pas, on la crée
    await prisma.training.create({
      data: {
        name: "Pratiques Musicales",
        slug: "pratiques-musicales",
        description: "Développez votre voix et votre musicalité.",
        durationMonths: 6,
        priceMonthly: 42000,
        targetAudience: "Artistes, chanteurs, autodidactes",
        modules: "Technique vocale • Rythme • Écoute • Interprétation • Ensemble • Scène",
        requiresMusicTest: true
      }
    });
    console.log("✅ 'Pratiques Musicales' créée");
  }

  // 2. Créer les nouvelles formations manquantes
  const newFormations = [
    {
      name: "Pratiques Instrumentales",
      slug: "pratiques-instrumentales",
      description: "Apprenez, jouez, accompagnez. Maîtrise technique, théorie appliquée, accompagnement, ensemble, improvisation.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Musiciens, instrumentistes, passionnés",
      modules: "Instrument • Technique • Théorie appliquée • Accompagnement • Ensemble • Improvisation",
      requiresMusicTest: true
    },
    {
      name: "Technique Musicale & MAO",
      slug: "technique-musicale-mao",
      description: "Passez de l'idée musicale à la production numérique. Théorie, harmonie, arrangement, MAO, production, enregistrement.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Beatmakers, producteurs, techniciens son",
      modules: "Théorie • Harmonie • Arrangement • MAO • Production • Enregistrement • Édition audio",
      requiresMusicTest: false
    },
    {
      name: "Musique & Communication",
      slug: "musique-communication",
      description: "Faites connaître votre talent. Identité artistique, réseaux sociaux, création de contenus, marketing digital, promotion.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Créateurs de contenus, community managers artistiques",
      modules: "Communication • Réseaux sociaux • Création de contenus • Marketing • Promotion • Médias",
      requiresMusicTest: false
    },
    {
      name: "Musique & Management",
      slug: "musique-management",
      description: "Accompagnez un artiste et développez sa carrière. Booking, production, événementiel, partenariats, gestion budgétaire.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Futurs managers, organisateurs, entrepreneurs culturels",
      modules: "Management • Booking • Production • Événementiel • Partenariats • Gestion • Entrepreneuriat",
      requiresMusicTest: false
    },
    {
      name: "Production & Événementiel Culturel",
      slug: "production-evenementiel",
      description: "Maîtrisez la production culturelle. Régie, logistique, programmation, budget, coordination de projets événementiels.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Régisseurs, producteurs, organisateurs d'événements",
      modules: "Production • Régie • Logistique • Programmation • Budget • Coordination",
      requiresMusicTest: false
    },
    {
      name: "Création de Contenus Musicaux & Culturels",
      slug: "creation-contenus",
      description: "Photo, vidéo, montage, storytelling. Créez des contenus courts percutants pour valoriser les artistes et projets culturels.",
      durationMonths: 5,
      priceMonthly: 42000,
      targetAudience: "Photographes, vidéastes, créateurs digitaux",
      modules: "Photo • Vidéo • Montage • Storytelling • Réseaux sociaux • Contenus courts",
      requiresMusicTest: false
    },
    {
      name: "Entrepreneuriat Culturel",
      slug: "entrepreneuriat-culturel",
      description: "Transformez votre projet culturel en activité viable. Business model, budget, marketing, financement, gestion de projet.",
      durationMonths: 4,
      priceMonthly: 42000,
      targetAudience: "Porteurs de projets, associations, structures culturelles",
      modules: "Business model • Budget • Marketing • Financement • Gestion • Projet culturel",
      requiresMusicTest: false
    },
    {
      name: "Formation pour Communes & Acteurs Locaux",
      slug: "formation-communes",
      description: "Aidez les collectivités à concevoir leurs politiques culturelles. Valorisation du patrimoine, tourisme local, animation culturelle.",
      durationMonths: 3,
      priceMonthly: null,
      targetAudience: "Mairies, collectivités, services culturels, associations",
      modules: "Politique culturelle • Patrimoine • Tourisme local • Animation • Gestion de projets territoriaux",
      requiresMusicTest: false
    }
  ];

  for (const f of newFormations) {
    const exists = await prisma.training.findUnique({ where: { slug: f.slug } });
    if (!exists) {
      await prisma.training.create({ data: f });
      console.log(`✅ Nouvelle formation créée: ${f.name}`);
    } else {
      console.log(`⏭️ Formation déjà existante: ${f.name}`);
    }
  }

  // 3. Mettre à jour les instruments
  await prisma.instrument.deleteMany({});
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
  console.log("✅ Instruments mis à jour");

  console.log("🎉 Catalogue réel du CEAA Kpalimé injecté avec succès !");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });