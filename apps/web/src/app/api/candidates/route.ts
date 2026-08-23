import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        user: true,
        applications: {
          include: { training: true },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { user: { createdAt: 'desc' } }
    });

    const formattedCandidates = candidates.map(c => {
      const application = c.applications[0];
      return {
        id: c.id,
        nom: c.lastName,
        prenom: c.firstName,
        email: c.user.email,
        telephone: c.user.phone || "Non renseigné",
        ville: c.city || "Non renseignée",
        formation: application?.training?.name || "Formation Musicale",
        statut: application?.status || "DRAFT",
        dateCreation: c.user.createdAt.toISOString().split('T')[0],
        typeCandidat: "INDIVIDUEL"
      };
    });

    return NextResponse.json(formattedCandidates);
  } catch (error) {
    console.error("Erreur liste candidatures:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}