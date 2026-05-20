"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { HiOutlineShoppingBag, HiOutlineEye } from "react-icons/hi2";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group relative bg-white flex flex-col justify-between border border-slate-100 p-4 transition-all duration-500 hover:shadow-xl hover:shadow-slate-100/80">
      {/* Product Image Window */}
      <div className="relative aspect-square w-full bg-[#F9F9F9] overflow-hidden rounded-sm flex items-center justify-center p-6">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3">
          <Link
            href={`/product/${product.id}`}
            className="p-3 bg-white text-[#0D2B45] rounded-full shadow-md hover:bg-[#0D2B45] hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0"
            title="Plus de détails"
          >
            <HiOutlineEye size={20} />
          </Link>
          <button
            onClick={() => {
              addToCart(product, product?.id);
              toast.success("Ajouté au panier");
            }}
            className="p-3 bg-white text-[#0D2B45] rounded-full shadow-md hover:bg-[#0D2B45] hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-75"
            title="Ajouter au panier"
          >
            <HiOutlineShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="pt-5 pb-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[10px] uppercase text-slate-400 tracking-[0.2em] font-medium">
            {product.category}
          </p>
          <h3 className="text-lg font-light text-[#0D2B45] tracking-tight uppercase group-hover:text-slate-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-light">
            Prix
          </span>
          <p className="text-base font-semibold text-[#0D2B45]">
            {Number(product.price).toLocaleString()}.00{" "}
            <span className="text-xs font-normal">DZD</span>
          </p>
        </div>
      </div>

      {/* Mobile-Only Action Row (Keeps UX straightforward on mobile viewports) */}
      <div className="grid grid-cols-2 gap-2 pt-2 md:hidden">
        <Link href={`/product/${product.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full text-xs h-10 border-slate-200 text-[#0D2B45] uppercase tracking-wider font-light rounded-sm"
          >
            Détails
          </Button>
        </Link>
        <Button
          onClick={() => {
            addToCart(product, product?.id);
            toast.success("Ajouté au panier");
          }}
          className="w-full bg-[#0D2B45] text-white text-xs h-10 uppercase tracking-wider font-light rounded-sm"
        >
          Acheter
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
