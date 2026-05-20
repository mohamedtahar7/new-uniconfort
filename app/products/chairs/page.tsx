"use client";
import { getProducts } from "@/actions/admin/adminActions";
import ProductCard from "@/components/main/ProductCard";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const pros: any = await getProducts();
      setProducts(pros || []);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter cleanly for the Chaises category
  const chairProducts =
    products?.filter((product: any) => product.category === "Chaises") || [];

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 px-[5%]">
      <div className="max-w-[1400px] mx-auto">
        {/* Gallery Section Editorial Header */}
        <div className="border-b border-slate-100 pb-8 mb-12 space-y-2">
          <span className="text-xs uppercase font-semibold text-[#0D2B45] tracking-[0.3em] flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#0D2B45]" />
            Showroom
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#0D2B45]">
            Collection{" "}
            <span className="font-serif italic text-slate-400">Chaises</span>
          </h1>
          <p className="text-slate-400 text-sm font-light max-w-md pt-1">
            L'équilibre parfait entre ergonomie fonctionnelle et pureté des
            lignes. Des assises haut de gamme conçues pour sublimer vos espaces
            de vie et de travail.
          </p>
        </div>

        {/* Loading and Results Processing States */}
        {loading ? (
          <div className="h-[40vh] w-full flex items-center justify-center">
            <Spinner d="10" />
          </div>
        ) : chairProducts.length === 0 ? (
          <div className="h-[40vh] w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-sm p-8 text-center">
            <p className="text-sm tracking-widest uppercase font-light text-slate-400">
              Aucun produit trouvé dans cette collection
            </p>
          </div>
        ) : (
          /* High-End Clean Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {chairProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
