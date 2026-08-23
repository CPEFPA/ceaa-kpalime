import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const submissionId = formData.get("submissionId") as string;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // Vérifier la taille (max 50 Mo)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 50 Mo)" }, { status: 400 });
    }

    // Vérifier le type de fichier
    const allowedTypes = ["audio/mpeg", "audio/wav", "video/mp4", "application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = file.name.split(".").pop();
    const filename = `${submissionId}-${uniqueSuffix}.${extension}`;
    const filepath = join(uploadDir, filename);

    // Écrire le fichier
    await writeFile(filepath, buffer);

    // URL relative pour accéder au fichier
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      message: "Fichier uploadé avec succès",
      fileUrl 
    }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Erreur upload:", error);
    return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 });
  }
}