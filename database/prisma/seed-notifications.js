const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔔 Création de notifications de démonstration...");

  // Trouver l'admin
  const admin = await prisma.user.findUnique({ where: { email: "admin@ceaa.tg" } });
  const apprenant = await prisma.user.findUnique({ where: { email: "apprenant@ceaa.tg" } });
  const formateur = await prisma.user.findUnique({ where: { email: "formateur@ceaa.tg" } });

  if (admin) {
    await prisma.notification.createMany({
      data: [
        { userId: admin.id, title: "🎉 Bienvenue sur la plateforme !", message: "Votre compte administrateur est actif. Vous pouvez gérer les candidatures et les évaluations." },
        { userId: admin.id, title: "📊 Nouveau candidat inscrit", message: "Albertine AGBAVON vient de s'inscrire à la Formation Musicale." },
        { userId: admin.id, title: "✅ Évaluation terminée", message: "L'évaluation d'Albertine AGBAVON a été complétée avec succès." }
      ]
    });
    console.log("✅ 3 notifications créées pour l'admin");
  }

  if (apprenant) {
    await prisma.notification.createMany({
      data: [
        { userId: apprenant.id, title: "🎵 Bienvenue dans votre espace !", message: "Votre inscription est confirmée. Consultez vos cours et devoirs." },
        { userId: apprenant.id, title: "📝 Nouveau devoir disponible", message: "Un nouveau devoir a été publié : 'Enregistrement : progression d'accords'. Date limite : 28/08/2026." },
        { userId: apprenant.id, title: "🎯 Votre évaluation est disponible !", message: "Votre test musical a été évalué. Niveau proposé : Intermédiaire." }
      ]
    });
    console.log("✅ 3 notifications créées pour l'apprenant");
  }

  if (formateur) {
    await prisma.notification.createMany({
      data: [
        { userId: formateur.id, title: "👋 Bienvenue formateur !", message: "Vous avez 1 apprenant assigné : Kossi KODJO." },
        { userId: formateur.id, title: "📤 Nouveau devoir reçu", message: "Kossi KODJO a rendu le devoir 'Enregistrement : progression d'accords'." }
      ]
    });
    console.log("✅ 2 notifications créées pour le formateur");
  }

  console.log("🎉 Notifications de démonstration créées !");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());