import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    console.log("🔍 Test API appelé");
    console.log("📝 DATABASE_URL:", process.env.DATABASE_URL ? "Présent" : "MANQUANT");
    
    const prisma = new PrismaClient();
    const userCount = await prisma.user.count();
    
    console.log("✅ Connexion réussie ! Nombre d'utilisateurs:", userCount);
    
    return NextResponse.json({ 
      success: true, 
      message: "Connexion à la base de données réussie",
      userCount 
    });
  } catch (error: any) {
    console.error("💥 ERREUR:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}