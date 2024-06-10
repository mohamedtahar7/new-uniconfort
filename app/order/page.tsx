"use client";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import Navbar from "@/components/main/Navbar";
import OrderForm from "@/components/main/OrderForm";
import React from "react";
import CartItem from "@/components/main/CartItem";

const page = () => {
  const { cart, total, itemAmount } = useContext(CartContext);
  return (
    <main className="px-[5%] py-[30%] lg:py-[10%]">
      {itemAmount === 0 ? (
        <h1 className="text-center text-2xl font-semibold*">
          Votre Panier est Vide
        </h1>
      ) : (
        <div className="flex items-start gap-60">
          <div className="p-6 bg-slate-900 rounded-xl w-full flex flex-col gap-6">
            <h1 className="text-2xl text-zinc-100 font-medium">
              Remplire votre informations
            </h1>
            <OrderForm />
          </div>
          <div className="lg:flex hidden w-full flex-col gap-3">
            <h1 className="text-2xl text-zinc-900 font-medium">Panier</h1>
            <h1 className="text-2xl text-zinc-900 font-medium">
              Total: {total}.00 DZD
            </h1>
            <div className="flex flex-col gap-3">
              {cart.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex items-start gap-4 py-3 border-y-[1.5px] border-[#e1e1e1]"
                >
                  <div
                    className="h-[160px] w-[160px] rounded-xl bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${item.images[0]})` }}
                  />
                  <div className="flex flex-col gap-2">
                    <h1>{item.name}</h1>
                    <h1>Total : {item.price * item.amount}.00 DZD</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default page;
