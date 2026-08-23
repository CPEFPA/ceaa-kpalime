import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Statistiques des candidatures
    const totalCandidats = await prisma.candidate.count();
    const candidaturesParStatut = await prisma.application.groupBy({
      by: ['status'],
      _count: true
    });

    const statutMap: Record<string, number> = {};
    candidaturesParStatut.forEach(c => {
      statutMap[c.status] = c._count;
    });

    // 2. Statistiques des apprenants
    const totalApprenants = await prisma.learner.count();
    const apprenantsParNiveau = await prisma.learner.groupBy({
      by: ['level'],
      _count: true
    });

    const niveauMap: Record<string, number> = {};
    apprenantsParNiveau.forEach(a => {
      niveauMap[a.level] = a._count;
    });

    const apprenantsParInstrument = await prisma.learner.groupBy({
      by: ['instrument'],
      _count: true
    });

    // 3. Statistiques des présences
    const totalPresences = await prisma.presence.count();
    const presencesPresent = await prisma.presence.count({ where: { status: "PRESENT" } });
    const presencesRetard = await prisma.presence.count({ where: { status: "RETARD" } });
    const presencesAbsent = await prisma.presence.count({ where: { status: "ABSENT" } });
    const tauxPresence = totalPresences > 0 ? Math.round((presencesPresent / totalPresences) * 100) : 0;

    // 4. Statistiques des devoirs
    const totalDevoirs = await prisma.devoir.count();
    const soumissionsParStatut = await prisma.learnerDevoir.groupBy({
      by: ['status'],
      _count: true
    });

    const devoirStatutMap: Record<string, number> = {};
    soumissionsParStatut.forEach(s => {
      devoirStatutMap[s.status] = s._count;
    });

    // 5. Statistiques des évaluations
    const evaluations = await prisma.evaluation.findMany({
      select: {
        technicalLevel: true,
        pitch: true,
        rhythm: true,
        sightReading: true,
        ear: true,
        interpretation: true,
        expression: true,
        motivation: true,
        experience: true,
        proposedLevel: true,
        finalLevel: true
      }
    });

    let moyenneGenerale = 0;
    if (evaluations.length > 0) {
      const toutesLesNotes = evaluations.flatMap(e => [
        e.technicalLevel, e.pitch, e.rhythm, e.sightReading, e.ear,
        e.interpretation, e.expression, e.motivation, e.experience
      ].filter(n => n !== null) as number[]);
      
      moyenneGenerale = toutesLesNotes.length > 0 
        ? Math.round((toutesLesNotes.reduce((sum, n) => sum + n, 0) / toutesLesNotes.length) * 10) / 10
        : 0;
    }

    const niveauxProposes: Record<string, number> = {};
    evaluations.forEach(e => {
      if (e.finalLevel) {
        niveauxProposes[e.finalLevel] = (niveauxProposes[e.finalLevel] || 0) + 1;
      }
    });

    // 6. Dernières activités
    const dernieresCandidatures = await prisma.candidate.findMany({
      take: 5,
      orderBy: { user: { createdAt: 'desc' } },
      include: { user: true }
    });

    // 7. Statistiques globales
    const totalFormateurs = await prisma.trainer.count();
    const totalCommunes = await prisma.commune.count();

    return NextResponse.json({
      candidatures: {
        total: totalCandidats,
        parStatut: statutMap
      },
      apprenants: {
        total: totalApprenants,
        parNiveau: niveauMap,
        parInstrument: apprenantsParInstrument.map(a => ({
          instrument: a.instrument,
          count: a._count
        }))
      },
      presences: {
        total: totalPresences,
        presents: presencesPresent,
        retards: presencesRetard,
        absents: presencesAbsent,
        taux: tauxPresence
      },
      devoirs: {
        total: totalDevoirs,
        parStatut: devoirStatutMap
      },
      evaluations: {
        total: evaluations.length,
        moyenneGenerale: moyenneGenerale,
        niveauxProposes: niveauxProposes
      },
      formateurs: totalFormateurs,
      communes: totalCommunes,
      dernieresCandidatures: dernieresCandidatures.map(c => ({
        id: c.id,
        nom: `${c.firstName} ${c.lastName}`,
        email: c.user.email,
        date: c.user.createdAt.toISOString().split('T')[0]
      }))
    });

  } catch (error: any) {
    console.error("❌ Erreur stats admin:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}