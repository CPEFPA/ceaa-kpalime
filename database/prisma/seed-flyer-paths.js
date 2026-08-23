const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Injection des parcours spécifiques du Flyer...");

  const flyerFormations = [
    {
      name: "Préparation au Baccalauréat A4 & Pratique Musicale",
      slug: "preparation-bac-a4",
      description: "Parcours conçu pour préparer le Bac série A4 tout en développant une véritable compétence musicale. Approche académique, artistique et pratique.",
      durationMonths: 12, // Parcours annuel typique pour le Bac
      priceMonthly: null, // Tarif spécifique Bac
      targetAudience: "Lycéens, candidats officiels ou libres au Bac A4",
      modules: "Enseignements généraux • Préparation épreuves Bac A4 • Formation musicale • Pratique instrumentale • Compétences artistiques",
      requiresMusicTest: true,
      category: "ACADEMIQUE"
    },
    {
      name: "Formation Musicale Modulaire (Cycle Secondaire & Supérieur)",
      slug: "formation-musicale-modulaire",
      description: "Programme adapté à différents profils et niveaux : cycle secondaire, supérieur, théorie, culture musicale, perfectionnement et professionnalisation.",
      durationMonths: 6,
      priceMonthly: 42000,
      targetAudience: "Jeunes, adultes, élèves, personnes en reprise d'études",
      modules: "Formation modulaire • Cycle secondaire/supérieur • Théorie & Culture musicales • Perfectionnement • Professionnalisation",
      requiresMusicTest: true,
      category: "MUSICALE"
    },
    {
      name: "Culture, Tourisme & Développement Territorial (Pour Communes)",
      slug: "culture-tourisme-territoire",
      description: "Formation pratique pour aider les collectivités à identifier, valoriser, promouvoir et développer leurs ressources culturelles, touristiques et patrimoniales.",
      durationMonths: 3,
      priceMonthly: null, // Sur devis pour institutions
      targetAudience: "Mairies, collectivités territoriales, services culturels, associations, acteurs du tourisme",
      modules: "Politique culturelle communale • Patrimoine culturel • Ressources du territoire • Tourisme local • Animation événementielle • Gestion projets culturels • Communication territoriale",
      requiresMusicTest: false,
      category: "INSTITUTIONNELLE"
    }
  ];

  for (const f of flyerFormations) {
    const exists = await prisma.training.findUnique({ where: { slug: f.slug } });
    if (!exists) {
      await prisma.training.create({ data: f });
      console.log(`✅ Parcours Flyer ajouté: ${f.name}`);
    } else {
      console.log(`⏭️ Déjà existant: ${f.name}`);
    }
  }

  console.log("🎉 Parcours du Flyer intégrés avec succès !");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });