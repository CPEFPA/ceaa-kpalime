import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer tous les apprenants avec leurs infos utilisateur
    const learners = await prisma.learner.findMany({
      include: {
        user: true,
        trainer: true
      },
      orderBy: { lastName: 'asc' }
    });

    // Pour l'instant, on calcule un taux de présence fictif basé sur le nombre de présences
    const formattedLearners = await Promise.all(learners.map(async (l) => {
      const totalPresences = await prisma.presence.count({ where: { learnerId: l.id } });
      const presencesPresent = await prisma.presence.count({ where: { learnerId: l.id, status: "PRESENT" } });
      const presenceRate = totalPresences > 0 ? Math.round((presencesPresent / totalPresences) * 100) : 100;

      return {
        id: l.id,
        nom: l.lastName,
        prenom: l.firstName,
        email: l.user.email,
        telephone: l.user.phone || "Non renseigné",
        instrument: l.instrument,
        niveau: l.level,
        groupe: l.group,
        progression: l.progression,
        presenceRate: presenceRate,
        dernierCours: new Date().toISOString().split('T')[0] // À améliorer avec la vraie date du dernier cours
      };
    }));

    return NextResponse.json(formattedLearners);
  } catch (error: any) {
    console.error("❌ Erreur récupération apprenants:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}