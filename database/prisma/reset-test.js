const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Remise à zéro du devoir de test...");

  // Remettre le devoir-demo-001 au statut RENDU avec fileUrl
  const submission = await prisma.learnerDevoir.updateMany({
    where: { 
      devoirId: "devoir-demo-001"
    },
    data: {
      status: "RENDU",
      submittedAt: new Date(),
      fileUrl: "/test-devoir.txt",
      note: null,
      appreciation: null
    }
  });

  console.log(`✅ ${submission.count} soumission(s) remise(s) au statut RENDU avec fileUrl`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());