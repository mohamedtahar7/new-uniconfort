"use client";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { CartContext } from "@/contexts/CartContext";
import {
  LuShoppingBag,
  LuMinus,
  LuPlus,
  LuChevronRight,
  LuShieldCheck,
  LuTruck,
  LuAlertCircle,
} from "react-icons/lu";
import Link from "next/link";
import { getProductById } from "@/actions/main/clientsActions";
import Navbar from "@/components/main/Navbar";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { addToCart } = useContext(CartContext);

  // Page Data Loading States
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Interactive UI Management States
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch real product details from the database on mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const resolvedParams = await params;
        const data = await getProductById(resolvedParams.id);
        if (data) {
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load product page details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params]);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCartOperation = () => {
    setIsAdding(true);

    // Pass the exact quantity directly to the updated CartContext handler
    addToCart(product, product.id, quantity);

    // Trigger your customized premium Uniconfort Sonner notification layout popup instantly
    toast.custom(
      (t) => (
        <div className="w-full max-w-md bg-[#0D2B45] text-white border border-[#0D2B45]/20 p-4 rounded-sm shadow-xl flex items-center justify-between gap-4 animate-fade-in font-sans">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-white/10 rounded-sm flex-shrink-0 text-white">
              <LuShoppingBag size={18} />
            </div>
            <div className="space-y-0.5 truncate">
              <p className="text-xs font-semibold uppercase tracking-wider">
                Panier Mis à Jour
              </p>
              <p className="text-[11px] text-slate-300 font-light truncate">
                {quantity}x {product.name} ajouté au panier avec succès
              </p>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-[10px] uppercase font-bold tracking-widest text-slate-300 hover:text-white transition-colors flex-shrink-0 bg-white/5 px-2.5 py-1 rounded-xs"
          >
            Fermer
          </button>
        </div>
      ),
      { duration: 3000 },
    );

    setIsAdding(false);
    setQuantity(1); // Reset local layout stepper state back to 1
  };

  // Keep navbar accessible even during dynamic async loading delays
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBFBFB]">
        <Navbar />
        <div className="flex-1 w-full flex items-center justify-center">
          <Spinner d="10" />
        </div>
      </div>
    );
  }

  // Keep navbar accessible even if database lookups fail to match a valid product
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBFBFB]">
        <Navbar />
        <div className="flex-1 w-full flex flex-col items-center justify-center p-8 text-center text-[#0D2B45] space-y-4">
          <LuAlertCircle size={32} className="text-slate-300" />
          <p className="text-sm tracking-widest uppercase font-light text-slate-400">
            Produit Introuvable
          </p>
          <Link href="/boutique" className="pt-2">
            <Button
              variant="outline"
              className="border-slate-200 text-xs text-[#0D2B45] uppercase tracking-widest font-light rounded-sm"
            >
              Retour aux collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      {/* Render Navbar perfectly pinned at the top level header space */}
      <Navbar />

      <div className="text-[#0D2B45] py-8 md:py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Structural Breadcrumb Line */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-medium">
          <Link href="/" className="hover:text-[#0D2B45] transition-colors">
            Accueil
          </Link>
          <LuChevronRight size={10} />
          <Link
            href="/boutique"
            className="hover:text-[#0D2B45] transition-colors"
          >
            Collection
          </Link>
          <LuChevronRight size={10} />
          <span className="text-slate-500 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Primary Split Layout Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* LEFT COLUMN: Visual Media Suite Showroom Grid */}
          <div className="lg:col-span-7 space-y-4 w-full">
            <div className="relative aspect-square w-full bg-[#F9F9F9] border border-slate-100 rounded-sm overflow-hidden flex items-center justify-center p-6 transition-all duration-300">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-700 hover:scale-102"
                />
              ) : (
                <div className="text-xs text-slate-300 uppercase tracking-widest font-light">
                  Aucune image disponible
                </div>
              )}
              <span className="absolute top-4 left-4 bg-[#0D2B45] text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Bottom Thumbnails view selection block */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square bg-[#F9F9F9] border rounded-sm overflow-hidden p-2 flex items-center justify-center transition-all duration-300 group ${
                      selectedImage === img
                        ? "border-[#0D2B45] ring-1 ring-[#0D2B45]"
                        : "border-slate-100 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform group-hover:scale-102"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Transactional Metadata Configurator Panel */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8 lg:pt-2 w-full">
            {/* Header & Price Block */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-light uppercase tracking-tight text-[#0D2B45] leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold tracking-tight text-[#0D2B45]">
                  {Number(product.price).toLocaleString()}.00
                </p>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  DZD
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Description Paragraph Block */}
            {product.description && (
              <>
                <div className="space-y-2">
                  <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Description
                  </h3>
                  <p className="text-xs font-light text-slate-600 leading-relaxed antialiased">
                    {product.description}
                  </p>
                </div>
                <hr className="border-slate-100" />
              </>
            )}

            {/* Operational Counter & Action Triggers Block */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Stepper Quantity Counter Container */}
                <div className="flex items-center justify-between border border-slate-200 h-12 w-full sm:w-32 bg-white rounded-sm px-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange("dec")}
                    disabled={quantity <= 1}
                    className="p-1 text-slate-400 hover:text-[#0D2B45] disabled:opacity-30 transition-colors"
                  >
                    <LuMinus size={14} />
                  </button>
                  <span className="text-xs font-semibold w-8 text-center font-mono select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange("inc")}
                    className="p-1 text-slate-400 hover:text-[#0D2B45] transition-colors"
                  >
                    <LuPlus size={14} />
                  </button>
                </div>

                {/* Add to Cart Core Trigger Button */}
                <Button
                  onClick={handleAddToCartOperation}
                  disabled={isAdding}
                  className="w-full h-12 bg-[#0D2B45] hover:bg-[#0D2B45]/90 text-white text-xs uppercase tracking-widest font-medium rounded-sm transition-all flex items-center justify-center gap-2.5 shadow-none"
                >
                  <LuShoppingBag size={16} />
                  {isAdding ? "Traitement..." : "Ajouter au Panier"}
                </Button>
              </div>
            </div>

            {/* Trust Seal Informational Rows */}
            <div className="bg-slate-50/60 border border-slate-100 rounded-sm p-4 space-y-3.5">
              <div className="flex items-start gap-3 text-xs">
                <LuTruck
                  className="text-slate-400 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-[11px] uppercase tracking-wider">
                    Livraison Sécurisée
                  </p>
                  <p className="text-[11px] text-slate-500 font-light">
                    Expédition rapide sur toute l'Algérie avec vérification à la
                    livraison.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs border-t border-slate-100 pt-3">
                <LuShieldCheck
                  className="text-slate-400 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-[11px] uppercase tracking-wider">
                    Garantie Uniconfort
                  </p>
                  <p className="text-[11px] text-slate-500 font-light">
                    Finitions artisanales haut de gamme, matériaux durables
                    sélectionnés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
