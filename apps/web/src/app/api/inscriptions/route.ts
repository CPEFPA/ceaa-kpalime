import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, prenom, email, telephone, parcours } = body;

    if (!nom || !prenom || !email || !telephone || !parcours) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // Utilisation de $queryRaw pour garantir l'insertion dans UserInscription
    await prisma.$executeRaw`
      INSERT INTO "UserInscription" ("id", "nom", "prenom", "email", "telephone", "parcours", "niveau", "message", "statut", "createdAt")
      VALUES (gen_random_uuid()::text, ${nom}, ${prenom}, ${email}, ${telephone}, ${parcours}, ${body.niveau || null}, ${body.message || null}, 'EN_ATTENTE', NOW())
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("ERREUR INSERTION:", error);
    return NextResponse.json({ error: "Échec de l'enregistrement", details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}