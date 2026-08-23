const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🏷️ Attribution des catégories aux formations existantes...");

  const updates = [
    { slug: "preparation-bac-a4", category: "ACADEMIQUE" },
    { slug: "formation-musicale-modulaire", category: "MUSICALE" },
    { slug: "culture-tourisme-territoire", category: "INSTITUTIONNELLE" },
    { slug: "pratiques-musicales", category: "MUSICALE" },
    { slug: "pratiques-instrumentales", category: "MUSICALE" },
    { slug: "technique-musicale-mao", category: "PROFESSIONNELLE" },
    { slug: "musique-communication", category: "PROFESSIONNELLE" },
    { slug: "musique-management", category: "PROFESSIONNELLE" },
    { slug: "production-evenementiel", category: "PROFESSIONNELLE" },
    { slug: "creation-contenus", category: "PROFESSIONNELLE" },
    { slug: "entrepreneuriat-culturel", category: "PROFESSIONNELLE" },
    { slug: "formation-communes", category: "INSTITUTIONNELLE" }
  ];

  for (const u of updates) {
    await prisma.training.updateMany({
      where: { slug: u.slug },
      data: { category: u.category }
    });
    console.log(`✅ ${u.slug} → ${u.category}`);
  }

  console.log(" Toutes les formations sont maintenant catégorisées !");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });