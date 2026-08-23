const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Mise à jour forcée du fileUrl...");
  
  const updated = await prisma.learnerDevoir.update({
    where: { id: "cmt30n2nt0001g9fnxc0g3sfb" },
    data: { 
      fileUrl: "/test-devoir.txt",
      status: "RENDU"
    }
  });
  
  console.log("✅ Succès ! fileUrl mis à jour pour :", updated.id);
  console.log("Nouvelle valeur fileUrl :", updated.fileUrl);
}

main()
  .catch(e => console.error("❌ Erreur:", e))
  .finally(() => prisma.$disconnect());