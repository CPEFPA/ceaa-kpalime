import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, date, presences } = body; 
    // presences est un tableau de { learnerId: string, statut: "PRESENT" | "ABSENT" | "RETARD" }

    // Utiliser une transaction pour tout sauvegarder d'un coup
    await prisma.$transaction(
      presences.map((p: any) => {
        const dateObj = new Date(date);
        // On utilise upsert pour mettre à jour si la présence du jour existe déjà
        return prisma.presence.upsert({
          where: {
            // Astuce : on crée un ID unique basé sur learnerId + date pour l'upsert
            id: `${p.learnerId}-${dateObj.toISOString().split('T')[0]}`
          },
          update: {
            status: p.statut,
            courseId: courseId
          },
          create: {
            id: `${p.learnerId}-${dateObj.toISOString().split('T')[0]}`,
            learnerId: p.learnerId,
            courseId: courseId || "COURS_GENERIQUE",
            date: dateObj,
            status: p.statut
          }
        });
      })
    );

    return NextResponse.json({ message: "Présences enregistrées avec succès !" }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Erreur sauvegarde présences:", error);
    return NextResponse.json({ error: "Erreur interne lors de la sauvegarde." }, { status: 500 });
  }
}