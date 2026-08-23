import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET : Récupérer les notifications d'un utilisateur
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId requis" }, { status: 400 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limiter à 50 notifications récentes
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false }
    });

    return NextResponse.json({
      notifications: notifications.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        read: n.read,
        createdAt: n.createdAt.toISOString()
      })),
      unreadCount
    });

  } catch (error: any) {
    console.error("❌ Erreur GET notifications:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : Créer une notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, message } = body;

    if (!userId || !title || !message) {
      return NextResponse.json({ error: "userId, title et message requis" }, { status: 400 });
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message
      }
    });

    return NextResponse.json({ 
      message: "Notification créée",
      notificationId: notification.id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Erreur POST notification:", error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}

// PUT : Marquer une notification comme lue (ou toutes)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, userId, markAllRead } = body;

    if (markAllRead && userId) {
      // Marquer toutes les notifications comme lues
      await prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true }
      });
      return NextResponse.json({ message: "Toutes les notifications marquées comme lues" });
    }

    if (notificationId) {
      // Marquer une notification spécifique comme lue
      await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true }
      });
      return NextResponse.json({ message: "Notification marquée comme lue" });
    }

    return NextResponse.json({ error: "notificationId ou markAllRead requis" }, { status: 400 });

  } catch (error: any) {
    console.error("❌ Erreur PUT notification:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}