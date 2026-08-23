const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Création des devoirs de démonstration...");

  // Trouver l'apprenant Kossi KODJO
  const apprenant = await prisma.learner.findFirst({
    where: { firstName: "Kossi", lastName: "KODJO" }
  });

  if (!apprenant) {
    console.log("❌ Apprenant Kossi KODJO non trouvé. Inscris-le d'abord.");
    return;
  }

  console.log("✅ Apprenant trouvé:", apprenant.id);

  // Créer un cours de démonstration
  const cours = await prisma.course.upsert({
    where: { id: "cours-demo-001" },
    update: {},
    create: {
      id: "cours-demo-001",
      title: "Introduction à la guitare classique",
      description: "Apprentissage des bases de la guitare",
      type: "VIDEO",
      module: "Technique instrumentale",
      duration: "25 min",
      url: "#"
    }
  });

  // Créer 3 devoirs
  const devoirs = [
    {
      id: "devoir-demo-001",
      title: "Enregistrement : progression d'accords",
      description: "Enregistrez-vous en train de jouer la progression Do - Sol - Ré - Do. Durée : 2 minutes minimum.",
      dueDate: new Date("2026-08-28"),
      courseId: cours.id
    },
    {
      id: "devoir-demo-002",
      title: "Quiz solfège - Figures de notes",
      description: "Complétez le quiz en ligne sur les figures de notes et leur durée.",
      dueDate: new Date("2026-08-30"),
      courseId: cours.id
    },
    {
      id: "devoir-demo-003",
      title: "Vidéo de présentation",
      description: "Présentez-vous et montrez la tenue correcte de la guitare.",
      dueDate: new Date("2026-08-25"),
      courseId: cours.id
    }
  ];

  for (const d of devoirs) {
    await prisma.devoir.upsert({
      where: { id: d.id },
      update: {},
      create: d
    });
    console.log("✅ Devoir créé:", d.title);
  }

  // Créer les soumissions pour l'apprenant
  const soumissions = [
    { learnerId: apprenant.id, devoirId: "devoir-demo-001", status: "A_RENDRE" },
    { learnerId: apprenant.id, devoirId: "devoir-demo-002", status: "A_RENDRE" },
    { learnerId: apprenant.id, devoirId: "devoir-demo-003", status: "A_RENDRE" }
  ];

  for (const s of soumissions) {
    await prisma.learnerDevoir.upsert({
      where: {
        learnerId_devoirId: { learnerId: s.learnerId, devoirId: s.devoirId }
      },
      update: {},
      create: s
    });
  }
  console.log("✅ Soumissions créées pour Kossi KODJO");

  console.log("🎉 Devoirs de démonstration créés avec succès !");
}

main()
  .catch((e) => { console.error("❌ Erreur:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });