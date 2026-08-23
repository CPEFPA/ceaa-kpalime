const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🧪 Création d'un devoir de test avec fichier...");

  // Trouver Kossi KODJO
  const apprenant = await prisma.learner.findFirst({
    where: { firstName: "Kossi", lastName: "KODJO" }
  });

  if (!apprenant) {
    console.log("❌ Apprenant non trouvé");
    return;
  }

  // Mettre à jour une soumission existante pour simuler un devoir rendu avec fichier
  const submission = await prisma.learnerDevoir.update({
    where: { 
      learnerId_devoirId: { 
        learnerId: apprenant.id, 
        devoirId: "devoir-demo-001" 
      } 
    },
    data: {
      status: "RENDU",
      submittedAt: new Date(),
      fileUrl: "/test-devoir.txt" // Fichier qu'on a créé plus tôt
    }
  });

  console.log("✅ Soumission mise à jour avec fichier :", submission.id);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());