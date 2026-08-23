const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(" Finalisation du catalogue CEAA...");

  // 1. Ajouter les 3 parcours du Flyer s'ils n'existent pas
  const flyerPaths = [
    { name: "Préparation au Baccalauréat A4 & Pratique Musicale", slug: "preparation-bac-a4", description: "Parcours académique et artistique pour préparer le Bac A4 tout en développant une compétence musicale.", durationMonths: 12, priceMonthly: null, targetAudience: "Lycéens, candidats officiels ou libres", modules: "Enseignements généraux • Préparation épreuves Bac A4 • Formation musicale • Pratique instrumentale • Compétences artistiques", requiresMusicTest: true, category: "ACADEMIQUE" },
    { name: "Formation Musicale Modulaire", slug: "formation-musicale-modulaire", description: "Programme adapté aux jeunes et adultes : cycle secondaire/supérieur, théorie, culture musicale, perfectionnement.", durationMonths: 6, priceMonthly: 42000, targetAudience: "Jeunes, adultes, élèves, reprise d'études", modules: "Cycle secondaire/supérieur • Théorie & Culture musicales • Perfectionnement • Professionnalisation", requiresMusicTest: true, category: "MUSICALE" },
    { name: "Culture, Tourisme & Développement Territorial", slug: "culture-tourisme-territoire", description: "Pour les communes et acteurs locaux : identifier, valoriser, promouvoir et développer les ressources culturelles et touristiques.", durationMonths: 3, priceMonthly: null, targetAudience: "Mairies, collectivités, services culturels, associations", modules: "Politique culturelle communale • Patrimoine • Ressources du territoire • Tourisme local • Animation événementielle • Gestion projets culturels • Communication territoriale", requiresMusicTest: false, category: "INSTITUTIONNELLE" }
  ];

  for (const f of flyerPaths) {
    const exists = await prisma.training.findUnique({ where: { slug: f.slug } });
    if (!exists) {
      await prisma.training.create({ data: f });
      console.log(`✅ Ajouté: ${f.name}`);
    }
  }

  // 2. Attribuer les catégories aux formations existantes
  const categories = {
    "preparation-bac-a4": "ACADEMIQUE",
    "formation-musicale-modulaire": "MUSICALE",
    "culture-tourisme-territoire": "INSTITUTIONNELLE",
    "pratiques-musicales": "MUSICALE",
    "pratiques-instrumentales": "MUSICALE",
    "technique-musicale-mao": "PROFESSIONNELLE",
    "musique-communication": "PROFESSIONNELLE",
    "musique-management": "PROFESSIONNELLE",
    "production-evenementiel": "PROFESSIONNELLE",
    "creation-contenus": "PROFESSIONNELLE",
    "entrepreneuriat-culturel": "PROFESSIONNELLE",
    "formation-communes": "INSTITUTIONNELLE"
  };

  for (const [slug, cat] of Object.entries(categories)) {
    await prisma.training.updateMany({ where: { slug }, data: { category: cat } });
  }
  console.log("️ Toutes les formations sont catégorisées !");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());