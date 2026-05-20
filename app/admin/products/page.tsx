"use client";
import { getProducts } from "@/actions/admin/adminActions";
import AdminCard from "@/components/admin/AdminCard";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const pros: any = await getProducts();
      setProducts(pros || []);
    } catch (error) {
      console.error("Error fetching admin products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fixed dependency loop by leaving array tracking safely empty for on-mount initialization
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in text-[#0D2B45]">
      {/* Top Action Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 text-slate-400">
            <HiOutlineSquares2X2 size={18} />
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em]">
              Stocks & Showroom
            </span>
          </div>
          <h1 className="text-3xl font-light uppercase tracking-tight">
            Tous Les Produits
          </h1>
          <p className="text-xs text-slate-400 font-light">
            Gérez vos collections visibles sur le site ({products.length}{" "}
            articles répertoriés)
          </p>
        </div>

        {/* Shortcut Quick Link to creation view */}
        <Link href="/admin/add" className="flex-shrink-0">
          <Button className="bg-[#0D2B45] hover:bg-[#0D2B45]/90 text-white text-xs uppercase tracking-widest font-medium h-11 px-5 rounded-sm flex items-center gap-2 shadow-sm transition-all">
            <HiOutlinePlus size={16} />
            Nouveau Produit
          </Button>
        </Link>
      </div>

      {/* Core Screen Processing Grid Frame */}
      {loading ? (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <Spinner d="10" />
        </div>
      ) : products.length === 0 ? (
        /* Unified Empty State Block */
        <div className="h-[40vh] w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-sm p-8 text-center max-w-xl mx-auto space-y-4">
          <p className="text-sm tracking-widest uppercase font-light text-slate-400">
            Aucun produit trouvé dans le catalogue actuel
          </p>
          <Link href="/admin/add">
            <Button
              variant="outline"
              className="border-slate-200 text-xs text-[#0D2B45] uppercase tracking-widest font-light rounded-sm"
            >
              Commencer à ajouter des articles
            </Button>
          </Link>
        </div>
      ) : (
        /* Responsive Administrative Inventory Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <AdminCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
