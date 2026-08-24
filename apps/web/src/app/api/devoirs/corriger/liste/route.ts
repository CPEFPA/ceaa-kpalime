import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const soumissions = await prisma.learnerDevoir.findMany({
      where: { status: "RENDU" },
      include: {
        learner: { include: { user: true } },
        devoir: { include: { course: true } }
      },
      orderBy: { submittedAt: 'asc' }
    });

    const formatted = soumissions.map(s => ({
      id: s.id,
      submissionId: s.id,
      titre: s.devoir.title,
      description: s.devoir.description,
      cours: s.devoir.course.title,
      apprenantNom: s.learner.firstName + " " + s.learner.lastName,
      apprenantEmail: s.learner.user.email,
      instrument: s.learner.instrument,
      dateRendu: s.submittedAt ? s.submittedAt.toISOString().split('T')[0] : null,
      statut: s.status,
      fileUrl: null
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Erreur GET devoirs a corriger:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
