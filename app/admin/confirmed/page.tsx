"use client";
import { getConfirmedOrders } from "@/actions/main/clientsActions";
import OrderCard from "@/components/admin/OrderCard";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect, useState } from "react";
import { HiOutlineCheckBadge } from "react-icons/hi2";

const Page = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const ords: any = await getConfirmedOrders();
      setOrders(ords || []);
    } catch (error) {
      console.error("Error fetching confirmed orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fixed rerender loop by leaving dependency array clean for on-mount initialization
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in text-[#0D2B45] w-full">
      {/* Editorial Control Page Header */}
      <div className="border-b border-slate-100 pb-6 space-y-1">
        <div className="flex items-center gap-2.5 text-blue-500">
          <HiOutlineCheckBadge size={20} />
          <span className="text-[10px] uppercase font-semibold tracking-[0.2em]">
            Logistique
          </span>
        </div>
        <h1 className="text-3xl font-light uppercase tracking-tight">
          Commandes Confirmées
        </h1>
        <p className="text-xs text-slate-400 font-light">
          Commandes validées par téléphone et prêtes pour la préparation ou
          l'expédition ({orders.length} en cours)
        </p>
      </div>

      {/* Main Order Pipeline Stack View */}
      {loading ? (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <Spinner d="10" />
        </div>
      ) : orders.length === 0 ? (
        /* Minimal Empty State Display Window */
        <div className="h-[40vh] w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-sm p-8 text-center max-w-xl mx-auto">
          <p className="text-sm tracking-widest uppercase font-light text-slate-400">
            Aucune commande confirmée en attente d'expédition
          </p>
        </div>
      ) : (
        /* Vertical List Stack layout using individual updated OrderCards */
        <div className="flex flex-col gap-6 w-full">
          {orders.map((ord, id) => (
            <OrderCard key={ord.id || id} order={ord} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
