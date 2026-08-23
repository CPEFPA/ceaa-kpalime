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

    if (!["EN_ATTENTE", "CONFIRMEE", "REFUSEE"].includes(statut)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }

    const updated = await prisma.inscription.update({
      where: { id: params.id },
      data: { statut },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Erreur mise à jour inscription:", error);
    return NextResponse.json({ error: "Échec de la mise à jour." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}