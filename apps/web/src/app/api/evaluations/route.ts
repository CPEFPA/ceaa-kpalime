import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidatureId, evaluatorId, notes, observations, proposedLevel, finalLevel } = body;

    const candidature = await prisma.candidate.findUnique({
      where: { id: candidatureId },
      include: { user: true }
    });

    if (!candidature) {
      return NextResponse.json({ error: "Candidat non trouvé." }, { status: 404 });
    }

    // Créer ou récupérer une formation par défaut
    let training = await prisma.training.findFirst();
    if (!training) {
      training = await prisma.training.create({
        data: {
          name: "Formation Musicale",
          slug: "formation-musicale",
          description: "Parcours d'apprentissage musical",
          targetAudience: "Tous",
          modality: "Présentiel",
          requiresMusicTest: true
        }
      });
    }

    let application = await prisma.application.findFirst({
      where: { candidateId: candidature.id },
      orderBy: { createdAt: 'desc' }
    });

    if (!application) {
      application = await prisma.application.create({
        data: {
          userId: candidature.userId,
          candidateId: candidature.id,
          trainingId: training.id,
          status: "SUBMITTED"
        }
      });
    }

    let musicTest = await prisma.musicTest.findFirst({
      where: { applicationId: application.id },
      orderBy: { id: 'desc' }
    });

    if (!musicTest) {
      let instrument = await prisma.instrument.findFirst();
      if (!instrument) {
        instrument = await prisma.instrument.create({
          data: { name: "Instrument par défaut" }
        });
      }

      musicTest = await prisma.musicTest.create({
        data: {
          applicationId: application.id,
          instrumentId: instrument.id,
          scheduledAt: new Date(),
          location: "CEAA Kpalimé",
          status: "COMPLETED"
        }
      });
    }

    const evaluation = await prisma.evaluation.upsert({
      where: { testId: musicTest.id },
      update: {
        evaluatorId: evaluatorId || null,
        technicalLevel: notes?.technique,
        pitch: notes?.justesse,
        rhythm: notes?.rythme,
        sightReading: notes?.lecture,
        ear: notes?.oreille,
        interpretation: notes?.interpretation,
        expression: notes?.expression,
        motivation: notes?.motivation,
        experience: notes?.experience,
        observations: observations || null,
        proposedLevel: proposedLevel,
        finalLevel: finalLevel || proposedLevel
      },
      create: {
        testId: musicTest.id,
        evaluatorId: evaluatorId || null,
        technicalLevel: notes?.technique,
        pitch: notes?.justesse,
        rhythm: notes?.rythme,
        sightReading: notes?.lecture,
        ear: notes?.oreille,
        interpretation: notes?.interpretation,
        expression: notes?.expression,
        motivation: notes?.motivation,
        experience: notes?.experience,
        observations: observations || null,
        proposedLevel: proposedLevel,
        finalLevel: finalLevel || proposedLevel
      }
    });

    await prisma.application.update({
      where: { id: application.id },
      data: { status: "EVALUATED" }
    });

    await prisma.musicTest.update({
      where: { id: musicTest.id },
      data: { status: "COMPLETED" }
    });

    // 🆕 CRÉER UNE NOTIFICATION POUR LE CANDIDAT
    const levelLabels: Record<string, string> = {
      BEGINNER: "Débutant",
      INTERMEDIATE: "Intermédiaire",
      ADVANCED: "Avancé",
      PERFECTING: "Perfectionnement"
    };

    await prisma.notification.create({
      data: {
        userId: candidature.userId,
        title: "🎯 Votre évaluation est disponible !",
        message: `Votre test musical a été évalué. Niveau proposé : ${levelLabels[evaluation.finalLevel || proposedLevel] || proposedLevel}. Connectez-vous pour voir les détails.`
      }
    });

    return NextResponse.json({ 
      message: "Évaluation sauvegardée avec succès !",
      evaluationId: evaluation.id,
      proposedLevel: evaluation.proposedLevel,
      finalLevel: evaluation.finalLevel
    }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Erreur d'évaluation:", error);
    return NextResponse.json({ error: "Erreur interne lors de l'évaluation." }, { status: 500 });
  }
}