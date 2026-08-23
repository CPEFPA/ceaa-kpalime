import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Initialisation de la base de données...");

  // Créer un super administrateur
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ceaa.tg" },
    update: {},
    create: {
      email: "admin@ceaa.tg",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN"
    }
  });
  console.log("✅ Super administrateur créé:", admin.email);

  // Créer un formateur de démonstration
  const trainerPassword = await bcrypt.hash("trainer123", 10);
  const trainerUser = await prisma.user.upsert({
    where: { email: "formateur@ceaa.tg" },
    update: {},
    create: {
      email: "formateur@ceaa.tg",
      passwordHash: trainerPassword,
      role: "TRAINER"
    }
  });

  await prisma.trainer.upsert({
    where: { userId: trainerUser.id },
    update: {},
    create: {
      userId: trainerUser.id,
      firstName: "Kodjo",
      lastName: "AGBEY",
      specialty: "Guitare & Musique d'ensemble",
      groups: ["GUIT-DEB-A", "GUIT-INT-B", "ENS-ADV"]
    }
  });
  console.log("✅ Formateur créé:", trainerUser.email);

  // Créer un apprenant de démonstration
  const learnerPassword = await bcrypt.hash("learner123", 10);
  const learnerUser = await prisma.user.upsert({
    where: { email: "apprenant@ceaa.tg" },
    update: {},
    create: {
      email: "apprenant@ceaa.tg",
      passwordHash: learnerPassword,
      role: "LEARNER"
    }
  });

  await prisma.learner.upsert({
    where: { userId: learnerUser.id },
    update: {},
    create: {
      userId: learnerUser.id,
      firstName: "Kossi",
      lastName: "KODJO",
      instrument: "Guitare",
      level: "Débutant",
      group: "GUIT-DEB-A",
      progression: 35
    }
  });
  console.log("✅ Apprenant créé:", learnerUser.email);

  console.log("🎉 Base de données initialisée avec succès !");
  console.log("\n📝 Comptes de démonstration :");
  console.log("   Admin: admin@ceaa.tg / admin123");
  console.log("   Formateur: formateur@ceaa.tg / trainer123");
  console.log("   Apprenant: apprenant@ceaa.tg / learner123");
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });