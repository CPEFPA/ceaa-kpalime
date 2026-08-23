import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Chercher le candidat avec ses applications et évaluations
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        user: true,
        applications: {
          include: {
            musicTests: {
              include: {
                evaluation: true
              }
            },
            training: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!candidate) {
      return NextResponse.json({ error: "Candidat non trouvé" }, { status: 404 });
    }

    // Formater les données pour l'interface
    const application = candidate.applications[0];
    const musicTest = application?.musicTests[0];
    const evaluation = musicTest?.evaluation;

    return NextResponse.json({
      id: candidate.id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.user.email,
      phone: candidate.user.phone,
      city: candidate.city,
      birthDate: candidate.birthDate,
      educationLevel: candidate.educationLevel,
      instrument: candidate.experience || "Non spécifié",
      formation: application?.training?.name || "Formation Musicale",
      statut: application?.status || "DRAFT",
      dateTest: musicTest?.scheduledAt,
      heureTest: musicTest?.scheduledAt ? new Date(musicTest.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : null,
      lieuTest: musicTest?.location,
      evaluateur: "Évaluateur CEAA",
      evaluation: evaluation ? {
        notes: {
          technique: evaluation.technicalLevel,
          justesse: evaluation.pitch,
          rythme: evaluation.rhythm,
          lecture: evaluation.sightReading,
          oreille: evaluation.ear,
          interpretation: evaluation.interpretation,
          expression: evaluation.expression,
          motivation: evaluation.motivation,
          experience: evaluation.experience
        },
        observations: evaluation.observations,
        proposedLevel: evaluation.proposedLevel,
        finalLevel: evaluation.finalLevel
      } : null
    });

  } catch (error: any) {
    console.error("❌ Erreur récupération candidat:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}