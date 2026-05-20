"use client";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HiOutlinePlus, HiOutlineMinus, HiOutlineXMark } from "react-icons/hi2";

interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  return (
    <div className="group py-6 border-b border-slate-200 last:border-0 transition-all duration-300">
      <div className="flex gap-6 items-start">
        {/* 1. Image Container */}
        <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden bg-[#F9F9F9] rounded-sm">
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-full w-full object-contain mix-blend-multiply p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* 2. Item Details */}
        <div className="flex flex-col flex-1 h-full min-h-[128px] md:min-h-[160px]">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="text-lg md:text-xl font-light text-[#0D2B45] uppercase tracking-tight">
                {item.name}
              </h4>
              <p className="text-xs text-slate-400 font-medium tracking-[0.1em] uppercase">
                Réf: {item.id.toString().slice(0, 8)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <HiOutlineXMark
                size={20}
                className="text-slate-400 group-hover:text-red-500 transition-colors"
              />
            </button>
          </div>

          {/* 3. Pricing & Quantity Bottom Row */}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-slate-200 rounded-sm">
              <button
                onClick={() => decreaseAmount(item.id)}
                className="p-2 hover:bg-slate-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <HiOutlineMinus size={14} className="text-[#0D2B45]" />
              </button>

              <span className="w-10 text-center text-sm font-medium text-[#0D2B45]">
                {item.amount}
              </span>

              <button
                onClick={() => increaseAmount(item.id)}
                className="p-2 hover:bg-slate-50 transition-colors"
                aria-label="Increase quantity"
              >
                <HiOutlinePlus size={14} className="text-[#0D2B45]" />
              </button>
            </div>

            {/* Price Calculations */}
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                Total Article
              </p>
              <p className="text-lg font-medium text-[#0D2B45]">
                {(item.price * item.amount).toLocaleString()}{" "}
                <span className="text-xs">DZD</span>
              </p>
              {item.amount > 1 && (
                <p className="text-[10px] text-slate-400 italic">
                  {item.price.toLocaleString()} DZD / unité
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
