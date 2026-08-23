"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface BellProps {
  userId: string;
  theme?: "indigo" | "emerald" | "violet" | "slate";
}

export default function Bell({ userId, theme = "indigo" }: BellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeColors = {
    indigo: { bg: "bg-indigo-900", hover: "hover:bg-indigo-800", text: "text-indigo-200", accent: "text-amber-400" },
    emerald: { bg: "bg-emerald-900", hover: "hover:bg-emerald-800", text: "text-emerald-200", accent: "text-amber-400" },
    violet: { bg: "bg-violet-900", hover: "hover:bg-violet-800", text: "text-violet-200", accent: "text-pink-400" },
    slate: { bg: "bg-slate-900", hover: "hover:bg-slate-800", text: "text-slate-200", accent: "text-amber-400" }
  };

  const colors = themeColors[theme];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
      } catch (err) {
        console.error("Erreur chargement notifications:", err);
      }
    };

    fetchNotifications();
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        body: JSON.stringify({ userId, markAllRead: true })
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
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg ${colors.hover} transition ${colors.text}`}
        aria-label="Notifications"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
          {/* En-tête du dropdown */}
          <div className={`${colors.bg} text-white p-4 flex justify-between items-center`}>
            <div>
              <h3 className="font-bold">Notifications</h3>
              <p className="text-xs opacity-80">
                {unreadCount > 0 ? `${unreadCount} non lue(s)` : "Aucune nouvelle notification"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
              >
                Tout marquer lu
              </button>
            )}
          </div>

          {/* Liste des notifications */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="text-4xl mb-2">📭</p>
                <p className="text-sm">Aucune notification pour le moment</p>
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => !n.read && handleMarkAsRead(n.id)}
                  className={`p-4 border-b border-slate-100 transition cursor-pointer ${
                    n.read ? "bg-white" : "bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-semibold text-sm ${n.read ? "text-slate-700" : "text-slate-900"}`}>
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{n.message}</p>
                  <p className="text-xs text-slate-400">{formatDate(n.createdAt)}</p>
                </div>
              ))
            )}
          </div>

          {/* Pied du dropdown */}
          <div className="p-3 bg-slate-50 text-center border-t border-slate-200">
            <Link href="/notifications" className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold">
              Voir toutes les notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}