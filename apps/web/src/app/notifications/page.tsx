"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Bell from "@/components/Bell";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  // ID de l'utilisateur connecté (à remplacer par le vrai user connecté)
  const USER_ID = "cmr123admin"; // ID de démo pour l'admin

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?userId=${USER_ID}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur chargement notifications:", err);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId })
      });
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err) {
      console.error("Erreur marquer comme lu:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, markAllRead: true })
      });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Erreur marquer tout comme lu:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const notificationsFiltrees = notifications.filter(n => {
    if (filter === "UNREAD") return !n.read;
    if (filter === "READ") return n.read;
    return true;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des notifications...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-indigo-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-indigo-900 text-xl">👨‍💼</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">CEAA Kpalimé</h1>
              <p className="text-xs text-indigo-200">Centre de notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm">
              <Link href="/admin" className="text-indigo-200 hover:text-white">Tableau de bord</Link>
              <Link href="/admin/candidatures" className="text-indigo-200 hover:text-white">Candidatures</Link>
              <Link href="/notifications" className="text-amber-400 font-semibold">Notifications</Link>
            </nav>
            <Bell userId={USER_ID} theme="indigo" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">🔔 Mes notifications</h2>
            <p className="text-slate-600 mt-1">
              {unreadCount > 0 
                ? `${unreadCount} notification(s) non lue(s)` 
                : "Toutes les notifications sont lues"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              ✓ Tout marquer comme lu
            </button>
          )}
        </div>

        {/* Filtres */}
        <div className="bg-white p-4 rounded-xl shadow border border-slate-100 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "ALL" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Toutes ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("UNREAD")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "UNREAD" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Non lues ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("READ")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === "READ" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Lues ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Liste des notifications */}
        <div className="space-y-3">
          {notificationsFiltrees.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow border border-slate-100 text-center">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-lg font-semibold text-slate-700">Aucune notification</p>
              <p className="text-sm text-slate-500 mt-2">
                {filter === "UNREAD" 
                  ? "Toutes vos notifications ont été lues !" 
                  : "Vous n'avez pas encore de notifications."}
              </p>
            </div>
          ) : (
            notificationsFiltrees.map(n => (
              <div
                key={n.id}
                onClick={() => !n.read && handleMarkAsRead(n.id)}
                className={`bg-white p-5 rounded-xl shadow border-2 transition cursor-pointer ${
                  n.read 
                    ? "border-slate-100 hover:border-slate-200" 
                    : "border-blue-300 bg-blue-50 hover:border-blue-400"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-lg ${n.read ? "text-slate-700" : "text-slate-900"}`}>
                    {n.title}
                  </h3>
                  {!n.read && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-2 animate-pulse"></span>
                  )}
                </div>
                <p className="text-slate-600 text-sm mb-3">{n.message}</p>
                <p className="text-xs text-slate-400">{formatDate(n.createdAt)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}