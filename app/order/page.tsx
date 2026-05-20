"use client";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import OrderForm from "@/components/main/OrderForm";
import Link from "next/link";
import { HiOutlineShoppingBag, HiOutlineCheckCircle } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { cart, total, itemAmount, clearCart } = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");

  const handleOrderSuccess = (name: string) => {
    setClientName(name);
    setIsSubmitted(true);
    clearCart(); // Wipes current cart state safely post-validation
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 px-[5%] text-[#0D2B45]">
      <div className="max-w-[1200px] mx-auto">
        {/* State A: Order Dispatched Successfully Window */}
        {isSubmitted ? (
          <div className="max-w-md mx-auto text-center py-16 space-y-6 animate-fade-in">
            <div className="flex justify-center text-emerald-500">
              <HiOutlineCheckCircle size={64} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-light uppercase tracking-wide">
                Merci, {clientName}
              </h1>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Votre commande a été enregistrée avec succès. Notre équipe
                commerciale vous contactera par téléphone pour la validation
                finale de vos articles.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/">
                <Button className="bg-[#0D2B45] text-white px-8 h-12 text-xs uppercase tracking-widest font-medium rounded-sm">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        ) : itemAmount === 0 ? (
          /* State B: Guard State for Empty Cart Entry */
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-300 gap-4">
            <HiOutlineShoppingBag size={56} strokeWidth={1} />
            <h1 className="text-sm uppercase tracking-widest font-light text-slate-400">
              Votre Panier est Vide
            </h1>
            <Link href="/" className="pt-2">
              <Button
                variant="outline"
                className="border-slate-200 text-xs text-[#0D2B45] uppercase tracking-widest font-light rounded-sm"
              >
                Découvrir le Showroom
              </Button>
            </Link>
          </div>
        ) : (
          /* State C: Active Checkout Grid Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
            {/* Left Column: Input Form block */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#0D2B45] tracking-[0.3em]">
                  Étape finale
                </span>
                <h1 className="text-3xl font-light tracking-tight uppercase">
                  Informations de livraison
                </h1>
              </div>
              <OrderForm onSuccess={handleOrderSuccess} />
            </div>

            {/* Right Column: Sticky Summary Sidebar Panel */}
            <div className="lg:col-span-5 bg-[#F9F9F9] border border-slate-100 rounded-sm p-6 md:p-8 lg:sticky lg:top-32 space-y-6">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400 border-b border-slate-200/60 pb-3">
                Résumé du Panier ({itemAmount})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-slate-200/60 max-h-[320px] overflow-y-auto pr-2 space-y-3">
                {cart.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="flex gap-4 pt-3 first:pt-0 items-center"
                  >
                    <div className="h-20 w-20 bg-white border border-slate-100 p-1 flex-shrink-0 rounded-sm flex items-center justify-center">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-light uppercase truncate tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        Qté: {item.amount}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {(item.price * item.amount).toLocaleString()}{" "}
                      <span className="text-[10px]">DZD</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Master Ledger Calculations Layout */}
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    Total Général
                  </span>
                  <span className="text-2xl font-semibold text-[#0D2B45]">
                    {total.toLocaleString()}.00{" "}
                    <span className="text-sm font-normal">DZD</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
