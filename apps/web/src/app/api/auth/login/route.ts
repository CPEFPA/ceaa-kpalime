import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret_par_defaut_tres_long_et_securise_12345";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { candidate: true, learner: true, trainer: true, commune: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    let redirect = "/candidat";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") redirect = "/admin";
    else if (user.role === "TRAINER") redirect = "/formateur";
    else if (user.role === "LEARNER") redirect = "/apprenant";
    else if (user.role === "INSTITUTION") redirect = "/commune";
    else if (user.role === "EVALUATOR") redirect = "/admin/candidatures";

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.candidate?.firstName || user.learner?.firstName || user.trainer?.firstName || user.commune?.contactName || "Utilisateur",
        lastName: user.candidate?.lastName || user.learner?.lastName || user.trainer?.lastName || ""
      },
      redirect
    });
  } catch (error: any) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}