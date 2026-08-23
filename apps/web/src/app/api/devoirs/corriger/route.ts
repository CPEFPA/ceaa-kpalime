import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, note, appreciation } = body;

    const submission = await prisma.learnerDevoir.update({
      where: { id: submissionId },
      data: {
        status: "CORRIGE",
        note: note,
        appreciation: appreciation || null
      },
      include: {
        learner: true,
        devoir: true
      }
    });

    // 🆕 CRÉER UNE NOTIFICATION POUR L'APPRENANT
    await prisma.notification.create({
      data: {
        userId: submission.learner.userId,
        title: `📝 Votre devoir "${submission.devoir.title}" a été corrigé`,
        message: `Note obtenue : ${note}/20. ${appreciation ? "Appréciation : " + appreciation : "Consultez les détails dans votre espace."}`
      }
    });

    return NextResponse.json({ 
      message: "Devoir corrigé avec succès !",
      submissionId: submission.id 
    }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Erreur correction devoir:", error);
    return NextResponse.json({ error: "Erreur lors de la correction" }, { status: 500 });
  }
}