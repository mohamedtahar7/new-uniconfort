"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  confirmOrder,
  deleteOrder,
  shipOrder,
} from "@/actions/main/clientsActions";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineTrash,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from "react-icons/hi2";

interface OrderCardProps {
  order: any;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [showItems, setShowItems] = useState(false);

  const total = order.clientOrder.reduce(
    (acc: number, item: any) => acc + item.amount * item.price,
    0,
  );
  const totalAmount = order.clientOrder.reduce(
    (acc: number, item: any) => acc + item.amount,
    0,
  );

  const executeAction = async (
    actionType: string,
    actionFn: () => Promise<any>,
    successMsg: string,
  ) => {
    setLoadingAction(actionType);
    try {
      await actionFn();
      toast.success(successMsg);
      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue.");
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  };

  // State Color Badge Mapping Engine
  const getStatusStyles = (state: string) => {
    switch (state) {
      case "Confirmed":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Shipped":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 p-6 text-[#0D2B45] space-y-6 animate-fade-in">
      {/* Top Header Row Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium tracking-tight text-slate-400 bg-slate-50 px-2 py-0.5 rounded-sm">
              ID: {order.id.slice(-8).toUpperCase()}
            </span>
            <span
              className={`text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 border rounded-full ${getStatusStyles(order.orderState)}`}
            >
              {order.orderState === "Not Confirmed"
                ? "En attente"
                : order.orderState === "Confirmed"
                  ? "Confirmé"
                  : "Livré"}
            </span>
          </div>
          <h3 className="text-lg font-light tracking-tight uppercase pt-1">
            {order.clientName}
          </h3>
        </div>

        {/* Action Triggers Grid Block */}
        <div className="flex items-center gap-2">
          {order.orderState === "Not Confirmed" && (
            <Button
              size="sm"
              disabled={loadingAction !== null}
              onClick={() =>
                executeAction(
                  "confirm",
                  () => confirmOrder(order.id),
                  "Commande confirmée avec succès.",
                )
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium h-9 px-4 rounded-sm"
            >
              <HiOutlineCheckCircle size={16} />
              {loadingAction === "confirm" ? "..." : "Confirmer"}
            </Button>
          )}

          {order.orderState === "Confirmed" && (
            <Button
              size="sm"
              disabled={loadingAction !== null}
              onClick={() =>
                executeAction(
                  "ship",
                  () => shipOrder(order.id),
                  "Commande marquée comme livrée.",
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium h-9 px-4 rounded-sm"
            >
              <HiOutlineTruck size={16} />
              {loadingAction === "ship" ? "..." : "Expédier"}
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            disabled={loadingAction !== null}
            onClick={() =>
              executeAction(
                "delete",
                () => deleteOrder(order.id),
                "Commande supprimée définitivement.",
              )
            }
            className="border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center h-9 w-9 p-0 rounded-sm"
            title="Supprimer la commande"
          >
            <HiOutlineTrash size={16} />
          </Button>
        </div>
      </div>

      {/* Main Core Metadata Grid Framework */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:divide-x md:divide-slate-100">
        {/* Contact Coordinates Block */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Contact
          </h4>
          <div className="space-y-1.5 font-light text-slate-600">
            <p className="flex items-center gap-2">
              <HiOutlinePhone className="text-slate-400" size={14} />{" "}
              {order.clientTel}
            </p>
            <p className="flex items-center gap-2 truncate">
              <HiOutlineEnvelope className="text-slate-400" size={14} />{" "}
              {order.clientEmail}
            </p>
          </div>
        </div>

        {/* Logistics Routing Destination Block */}
        <div className="space-y-2.5 md:pl-6">
          <h4 className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Destination
          </h4>
          <div className="space-y-1.5 font-light text-slate-600">
            <p className="flex items-start gap-2">
              <HiOutlineMapPin
                className="text-slate-400 mt-0.5 flex-shrink-0"
                size={14}
              />
              <span>
                {order.clientAdress},{" "}
                <b className="font-semibold">{order.clientWilaya}</b>
              </span>
            </p>
          </div>
        </div>

        {/* Ledger Balancing Accounting Data Block */}
        <div className="space-y-2.5 md:pl-6">
          <h4 className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Facturation
          </h4>
          <div className="space-y-0.5">
            <p className="text-slate-400 font-light">
              {totalAmount} article{totalAmount > 1 ? "s" : ""}
            </p>
            <p className="text-base font-semibold text-[#0D2B45] pt-0.5">
              {total.toLocaleString()}.00{" "}
              <span className="text-xs font-normal">DZD</span>
            </p>
          </div>
        </div>
      </div>

      {/* Collapse Action Dropdown Block for Order Breakdown */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => setShowItems(!showItems)}
          className="flex items-center justify-between w-full text-left text-xs uppercase tracking-wider text-slate-400 hover:text-[#0D2B45] font-medium transition-colors"
        >
          <span>Détail de la commande ({totalAmount})</span>
          {showItems ? (
            <HiOutlineChevronUp size={16} />
          ) : (
            <HiOutlineChevronDown size={16} />
          )}
        </button>

        {showItems && (
          <div className="mt-4 bg-slate-50/60 border border-slate-100 rounded-sm p-4 divide-y divide-slate-100 animate-fade-in">
            {order.clientOrder.map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                className="flex gap-4 items-center py-3 first:pt-0 last:pb-0 text-xs"
              >
                {/* Product Image - Added as requested */}
                <div className="h-16 w-16 bg-white border border-slate-100 p-1 flex-shrink-0 rounded-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      item.images?.[0] ||
                      "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt={item.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Name and Unit Price */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p
                    className="font-medium text-[#0D2B45] uppercase tracking-tight truncate"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="text-slate-400 font-light">
                    {Number(item.price).toLocaleString()} DZD / unité
                  </p>
                </div>

                {/* Quantity and Line Total */}
                <div className="text-right flex-shrink-0">
                  <p className="text-slate-500 font-medium">x {item.amount}</p>
                  <p className="font-semibold text-[#0D2B45] mt-0.5">
                    {(item.price * item.amount).toLocaleString()} DZD
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
