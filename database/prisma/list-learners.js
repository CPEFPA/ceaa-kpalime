const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const learners = await prisma.learner.findMany({
    include: { user: true }
  });

  console.log("\n📋 Liste des apprenants en base de données :\n");
  learners.forEach(l => {
    console.log(`ID: ${l.id}`);
    console.log(`Nom: ${l.firstName} ${l.lastName}`);
    console.log(`Email: ${l.user.email}`);
    console.log(`Instrument: ${l.instrument}`);
    console.log("---");
  });

  if (learners.length === 0) {
    console.log("❌ Aucun apprenant trouvé en base !");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());