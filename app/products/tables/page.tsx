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

  // Filter criteria logic split out cleanly
  const tableProducts =
    products?.filter((product: any) => product.category === "Tables") || [];

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
            Nos Créations de{" "}
            <span className="font-serif italic text-slate-400">Tables</span>
          </h1>
          <p className="text-slate-400 text-sm font-light max-w-md pt-1">
            Une sélection de tables de caractère conçues de manière artisanale,
            mêlant finesse géométrique et matériaux nobles.
          </p>
        </div>

        {/* Loading and Results Core Processing Switch blocks */}
        {loading ? (
          <div className="h-[40vh] w-full flex items-center justify-center">
            <Spinner d="10" />
          </div>
        ) : tableProducts.length === 0 ? (
          <div className="h-[40vh] w-full flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-sm p-8 text-center">
            <p className="text-sm tracking-widest uppercase font-light text-slate-400">
              Aucun produit trouvé dans cette collection
            </p>
          </div>
        ) : (
          /* High-End Clean Grid Pattern */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {tableProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
