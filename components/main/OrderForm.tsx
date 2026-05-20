"use client";
import React, { useState, useContext } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/CartContext";
import Spinner from "../ui/Spinner";
import { addOrder } from "@/actions/main/clientsActions";
import { toast } from "sonner";

interface OrderFormProps {
  onSuccess: (name: string) => void;
}

const OrderForm = ({ onSuccess }: OrderFormProps) => {
  const { cart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Quick frontend field check
    if (!name || !tel || !wilaya || !address) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    const orderId = `${name.trim().replace(/\s+/g, "-")}-${Date.now()}`;

    const order = {
      id: orderId,
      clientName: name,
      clientEmail: email || "Non fourni",
      clientTel: tel,
      clientWilaya: wilaya,
      clientAdress: address,
      orderState: "Not Confirmed",
      clientOrder: cart,
    };

    try {
      await addOrder(order);
      onSuccess(name); // Sends info up to morph into the validation layout screen block
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'envoi de la commande.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">
            Nom Complet *
          </label>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Ex: Mohamed Benali"
            className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">
            Téléphone *
          </label>
          <Input
            onChange={(e) => setTel(e.target.value)}
            value={tel}
            type="tel"
            placeholder="Ex: 0558 78 92 91"
            className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">
          Adresse Email (Optionnel)
        </label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Ex: client@email.com"
          className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-1">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">
            Wilaya *
          </label>
          <Input
            onChange={(e) => setWilaya(e.target.value)}
            value={wilaya}
            type="text"
            placeholder="Ex: Alger"
            className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
            required
          />
        </div>
        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] uppercase text-slate-400 tracking-wider font-medium">
            Adresse de Livraison *
          </label>
          <Input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            placeholder="Numéro de rue, quartier, appartement..."
            className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
            required
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-[#0D2B45] hover:bg-[#0D2B45]/90 text-white px-10 h-14 text-sm uppercase tracking-widest font-medium rounded-sm transition-all shadow-sm"
        >
          {loading ? <Spinner d="6" /> : "Confirmer ma Commande"}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
