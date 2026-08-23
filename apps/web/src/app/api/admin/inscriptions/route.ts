import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // REQUÊTE SQL DIRECTE - contourne le problème de modèle
    const inscriptions = await prisma.$queryRaw`
      SELECT * FROM "UserInscription" 
      ORDER BY "createdAt" DESC
    `;

    return NextResponse.json(inscriptions, { status: 200 });
  } catch (error: any) {
    console.error("ERREUR SQL:", error);
    return NextResponse.json(
      { 
        error: "Erreur de chargement",
        details: error.message || String(error)
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}