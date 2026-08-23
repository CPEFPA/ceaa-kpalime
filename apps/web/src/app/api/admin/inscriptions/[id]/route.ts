import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { statut } = body;

    if (!statut) {
      return NextResponse.json({ error: "Statut manquant" }, { status: 400 });
    }

    // CORRECTION : userInscription au lieu de inscription
    const updated = await prisma.userInscription.update({
      where: { id: params.id },
      data: { statut },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("ERREUR MISE À JOUR STATUT:", error);
    return NextResponse.json(
      { error: "Échec de la mise à jour", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}