import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const learnerId = searchParams.get("learnerId");

    if (!learnerId) {
      return NextResponse.json({ error: "learnerId requis" }, { status: 400 });
    }

    const soumissions = await prisma.learnerDevoir.findMany({
      where: { learnerId },
      include: {
        devoir: {
          include: { course: true }
        }
      },
      orderBy: { devoir: { dueDate: 'asc' } }
    });

    const formatted = soumissions.map(s => ({
      id: s.devoir.id,
      submissionId: s.id,
      titre: s.devoir.title,
      description: s.devoir.description,
      cours: s.devoir.course.title,
      dateLimite: s.devoir.dueDate.toISOString().split('T')[0],
      statut: s.status,
      note: s.note,
      appreciation: s.appreciation,
      dateRendu: s.submittedAt ? s.submittedAt.toISOString().split('T')[0] : null,
      fileUrl: s.fileUrl
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("❌ Erreur GET devoirs:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, commentaire, fileUrl } = body;

    const submission = await prisma.learnerDevoir.update({
      where: { id: submissionId },
      data: {
        status: "RENDU",
        submittedAt: new Date(),
        fileUrl: fileUrl || null
      },
      include: {
        learner: { include: { trainer: true } },
        devoir: true
      }
    });

    // Créer une notification pour le formateur
    if (submission.learner.trainer?.userId) {
      await prisma.notification.create({
        data: {
          userId: submission.learner.trainer.userId,
          title: `📤 Nouveau devoir reçu`,
          message: `${submission.learner.firstName} ${submission.learner.lastName} a rendu le devoir "${submission.devoir.title}".`
        }
      });
    }

    return NextResponse.json({ 
      message: "Devoir rendu avec succès !",
      submissionId: submission.id 
    }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Erreur POST devoir:", error);
    return NextResponse.json({ error: "Erreur lors du rendu" }, { status: 500 });
  }
}