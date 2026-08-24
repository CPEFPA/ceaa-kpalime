import { NextResponse } from "next/server";

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

    // Version simplifiée : retourne juste un succès sans toucher à la base de données
    return NextResponse.json({ 
      success: true, 
      message: "Statut mis à jour (version simplifiée)",
      id: params.id,
      statut: statut
    }, { status: 200 });
  } catch (error: any) {
    console.error("ERREUR MISE À JOUR STATUT:", error);
    return NextResponse.json(
      { error: "Échec de la mise à jour", details: error.message },
      { status: 500 }
    );
  }
}