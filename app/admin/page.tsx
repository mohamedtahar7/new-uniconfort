"use client";
import React, { useEffect, useState } from "react";
import { useAdminAuth } from "./useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getDashboardMetrics } from "@/actions/admin/adminActions";
import {
  LuLock,
  LuUser,
  LuLayoutDashboard,
  LuInbox,
  LuTrendingUp,
  LuLayers,
} from "react-icons/lu";

const Page = () => {
  const { isAuthenticated, login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Live Metrics Metrics State
  const [metrics, setMetrics] = useState({
    unconfirmedCount: 0,
    totalRevenue: 0,
    productsCount: 0,
  });
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Fetch real statistics from database
  const fetchMetricsData = async () => {
    try {
      const data = await getDashboardMetrics();
      setMetrics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setMetricsLoading(false);
    }
  };

  // Trigger metrics retrieval once the manager logs in successfully
  useEffect(() => {
    if (isAuthenticated) {
      fetchMetricsData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === "mehdi1994" && password === "mehdi1994") {
        login();
        toast.success("Bienvenue de retour, Mehdi !");
      } else {
        toast.error("Identifiants incorrects. Veuillez réessayer.");
      }
      setIsLoading(false);
    }, 600);
  };

  // 1. AUTHENTICATED STATE: SHOW REAL METRICS WELCOME DASHBOARD
  if (isAuthenticated) {
    return (
      <div className="space-y-8 animate-fade-in text-[#0D2B45] w-full">
        {/* Hero Welcome Banner */}
        <div className="border-b border-slate-100 pb-6 space-y-1">
          <div className="flex items-center gap-2.5 text-slate-400">
            <LuLayoutDashboard size={18} />
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em]">
              Vue d'ensemble
            </span>
          </div>
          <h1 className="text-3xl font-light uppercase tracking-tight">
            Tableau de bord
          </h1>
          <p className="text-xs text-slate-400 font-light">
            Bonjour, <span className="font-semibold text-[#0D2B45]">Mehdi</span>
            . Voici l'état actuel en temps réel de votre showroom de meubles.
          </p>
        </div>

        {/* Real Live Analytical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Live Unconfirmed Orders */}
          <div className="bg-white border border-slate-100 rounded-sm p-6 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-light">
                Commandes En Attente
              </span>
              <p className="text-2xl font-semibold">
                {metricsLoading
                  ? "..."
                  : `${metrics.unconfirmedCount} nouvelle${metrics.unconfirmedCount !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-sm">
              <LuInbox size={20} />
            </div>
          </div>

          {/* Card 2: Cumulative Revenue */}
          <div className="bg-white border border-slate-100 rounded-sm p-6 flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-light">
                Chiffre d'Affaires Validé
              </span>
              <p className="text-2xl font-semibold">
                {metricsLoading ? "..." : metrics.totalRevenue.toLocaleString()}{" "}
                <span className="text-sm font-normal">DZD</span>
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-sm">
              <LuTrendingUp size={20} />
            </div>
          </div>

          {/* Card 3: Live Catalog Inventory Size */}
          <div className="bg-white border border-slate-100 rounded-sm p-6 flex items-center justify-between shadow-xs sm:col-span-2 lg:col-span-1">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-light">
                Articles au Catalogue
              </span>
              <p className="text-2xl font-semibold">
                {metricsLoading
                  ? "..."
                  : `${metrics.productsCount} produit${metrics.productsCount !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-sm">
              <LuLayers size={20} />
            </div>
          </div>
        </div>

        {/* Operational Guidelines Panel */}
        <div className="border border-dashed border-slate-200 bg-white/40 rounded-sm p-12 text-center flex flex-col items-center justify-center space-y-2 min-h-[250px]">
          <p className="text-xs uppercase tracking-widest font-medium text-slate-400">
            Prêt pour les opérations
          </p>
          <p className="text-xs text-slate-400 max-w-sm font-light leading-relaxed">
            Les données ci-dessus proviennent directement de votre base de
            données. Utilisez la barre de navigation latérale pour gérer vos
            produits showroom, valider les paniers clients ou expédier les colis
            logistiques confirmés.
          </p>
        </div>
      </div>
    );
  }

  // 2. UN-AUTHENTICATED STATE: SHOW FULL-SCREEN LOGIN PORTAL
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#FBFBFB] text-[#0D2B45] animate-fade-in">
      <div className="w-full max-w-md bg-white border border-slate-100 shadow-sm rounded-sm p-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs tracking-[0.25em] uppercase font-bold">
            UNICONFORT
          </h2>
          <p className="text-xs text-slate-400 font-light uppercase tracking-widest">
            Espace d'administration
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
              Identifiant
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <LuUser size={16} />
              </span>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-11 border-slate-200 text-xs rounded-sm focus:ring-1 focus:ring-[#0D2B45] focus:border-[#0D2B45]"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <LuLock size={16} />
              </span>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-11 border-slate-200 text-xs rounded-sm focus:ring-1 focus:ring-[#0D2B45] focus:border-[#0D2B45]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-[#0D2B45] hover:bg-[#0D2B45]/90 text-white text-xs uppercase tracking-widest font-medium rounded-sm transition-colors pt-0.5 shadow-xs"
          >
            {isLoading ? "Vérification..." : "Se connecter"}
          </Button>
        </form>

        <p className="text-center text-[10px] text-slate-300 font-light tracking-wide pt-2">
          Accès restreint aux gestionnaires autorisés Uniconfort Studio.
        </p>
      </div>
    </div>
  );
};

export default Page;
