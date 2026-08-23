const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const soumissions = await prisma.learnerDevoir.findMany({
    select: {
      id: true,
      status: true,
      fileUrl: true,
      submittedAt: true,
      devoir: { select: { title: true } }
    }
  });

  console.log("\n📋 État actuel des soumissions :\n");
  soumissions.forEach(s => {
    console.log(`Devoir: ${s.devoir.title}`);
    console.log(`  Statut: ${s.status}`);
    console.log(`  fileUrl: ${s.fileUrl || "NULL"}`);
    console.log(`  submittedAt: ${s.submittedAt}`);
    console.log("---");
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());