const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const devoirs = await prisma.devoir.findMany();
  const soumissions = await prisma.learnerDevoir.findMany();

  console.log("\n📋 Devoirs en base :", devoirs.length);
  devoirs.forEach(d => console.log(`  - ${d.id}: ${d.title}`));

  console.log("\n📋 Soumissions en base :", soumissions.length);
  soumissions.forEach(s => console.log(`  - LearnerId: ${s.learnerId}, DevoirId: ${s.devoirId}, Statut: ${s.status}`));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());