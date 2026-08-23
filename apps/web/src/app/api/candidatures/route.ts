import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email, password, firstName, lastName, birthDate, gender, nationality,
      phone, whatsapp, city, address, educationLevel, school, currentStatus,
      trainingChoice, instrument, experience
    } = body;

    // 1. Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 400 });
    }

    // 2. Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Créer l'Utilisateur et le Profil Candidat en une seule transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          phone: phone || whatsapp,
          role: "CANDIDATE",
          candidate: {
            create: {
              firstName,
              lastName,
              birthDate: birthDate ? new Date(birthDate) : null,
              gender,
              nationality,
              city,
              address,
              educationLevel,
              school,
              currentStatus,
              experience: experience || null,
              // Note: mainInstrumentId et Application peuvent être ajoutés dans une V2
            }
          }
        },
        include: { candidate: true }
      });
      return user;
    });

    return NextResponse.json({ 
      message: "Inscription réussie ! Vous pouvez maintenant vous connecter.",
      userId: result.id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Erreur d'inscription:", error);
    return NextResponse.json({ error: "Erreur interne lors de l'inscription." }, { status: 500 });
    }
}