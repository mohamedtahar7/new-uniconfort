"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteProduct, updateProduct } from "@/actions/admin/adminActions";
import { toast } from "sonner";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineExclamationTriangle,
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2"; // Using lightweight standard x-icons alternative pointers or matching react-icons hooks
import {
  HiOutlinePencilSquare as EditIcon,
  HiOutlineTrash as DeleteIcon,
  HiOutlineExclamationTriangle as WarnIcon,
  HiOutlineCheck as SaveIcon,
  HiOutlineXMark as CancelIcon,
} from "react-icons/hi2";

interface AdminCardProps {
  product: any;
}

const AdminCard = ({ product }: AdminCardProps) => {
  const router = useRouter();

  // App UI Interaction Control States
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Dedicated Inline Mutation Form Local States
  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState<number>(product.price);
  const [editCategory, setEditCategory] = useState(product.category);

  const handleRemoveItem = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(product.id);
      toast.success(`Le produit "${product.name}" a été supprimé.`);
      setShowConfirm(false);
      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression.");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || editPrice < 0 || !editCategory) {
      toast.error("Veuillez remplir correctement tous les champs requis.");
      return;
    }

    setIsSaving(true);
    try {
      await updateProduct(product.id, {
        name: editName,
        price: Number(editPrice),
        category: editCategory,
      });
      toast.success("Produit mis à jour avec succès !");
      setIsEditing(false);
      router.refresh(); // Refresh state data layers on view framework tree
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Revert form state fields cleanly back to default values
    setEditName(product.name);
    setEditPrice(product.price);
    setEditCategory(product.category);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-sm p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md relative overflow-hidden group text-[#0D2B45] min-h-[380px]">
      {/* Product Image Media Top Content Block */}
      <div className="space-y-4">
        <div className="relative aspect-square w-full bg-[#F9F9F9] rounded-sm overflow-hidden flex items-center justify-center p-4 border border-slate-50">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-101"
          />

          {/* Top Floating Category Micro-tag (Only shown when not actively editing) */}
          {!isEditing && (
            <span className="absolute top-2 left-2 bg-[#0D2B45] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-medium">
              {product.category}
            </span>
          )}
        </div>

        {/* Dynamic Display / Editing Form Module Frame Area */}
        {isEditing ? (
          <form
            id={`form-${product.id}`}
            onSubmit={handleSaveUpdate}
            className="space-y-3 pt-1 animate-fade-in"
          >
            {/* Inline Name Field */}
            <div className="space-y-0.5">
              <label className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                Nom
              </label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="h-9 border-slate-200 text-xs rounded-sm focus:ring-1 focus:ring-[#0D2B45] focus:border-[#0D2B45]"
                required
              />
            </div>

            {/* Price & Category Fields split inline */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
                <label className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                  Prix (DZD)
                </label>
                <Input
                  type="number"
                  min={0}
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="h-9 border-slate-200 text-xs rounded-sm focus:ring-1 focus:ring-[#0D2B45] focus:border-[#0D2B45]"
                  required
                />
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                  Catégorie
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full h-9 px-2 border border-slate-200 bg-white rounded-sm text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0D2B45]"
                  required
                >
                  <option value="Chaises">Chaises</option>
                  <option value="Tables">Tables</option>
                  <option value="Lits">Lits</option>
                  <option value="Salons">Salons</option>
                </select>
              </div>
            </div>
          </form>
        ) : (
          /* Normal Display Information Mode */
          <div className="space-y-1 animate-fade-in">
            <h3
              className="text-sm font-medium uppercase tracking-tight truncate"
              title={product.name}
            >
              {product.name}
            </h3>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-light">
                Prix Showroom
              </span>
              <p className="text-sm font-semibold text-[#0D2B45]">
                {Number(product.price).toLocaleString()}.00{" "}
                <span className="text-[10px] font-normal">DZD</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Control Action Triggers Button Bar Section */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 relative z-10">
        {isEditing ? (
          <>
            <Button
              type="button"
              disabled={isSaving}
              variant="outline"
              onClick={handleCancelEdit}
              className="w-full h-10 border-slate-200 text-slate-500 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-light rounded-sm transition-colors"
            >
              <CancelIcon size={14} />
              Annuler
            </Button>

            <Button
              type="submit"
              form={`form-${product.id}`}
              disabled={isSaving}
              className="w-full h-10 bg-[#0D2B45] hover:bg-[#0D2B45]/90 text-white flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors shadow-none"
            >
              <SaveIcon size={14} />
              {isSaving ? "..." : "Sauver"}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="w-full h-10 border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-light rounded-sm transition-colors"
            >
              <EditIcon size={16} />
              Éditer
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowConfirm(true)}
              className="w-full h-10 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-light rounded-sm transition-colors shadow-none"
            >
              <DeleteIcon size={16} />
              Supprimer
            </Button>
          </>
        )}
      </div>

      {/* Inline Confirmation Guard Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-20 p-4 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
          <div className="p-2 bg-red-50 text-red-500 rounded-full">
            <WarnIcon size={24} />
          </div>
          <div className="space-y-1 px-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-red-600">
              Confirmer la suppression ?
            </h4>
            <p className="text-[11px] text-slate-400 font-light leading-tight">
              Cette action retirera définitivement "{product.name}" du
              catalogue.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full max-w-[200px]">
            <Button
              disabled={isDeleting}
              onClick={() => setShowConfirm(false)}
              variant="outline"
              className="flex-1 h-8 text-[10px] uppercase tracking-widest rounded-sm border-slate-200"
            >
              Annuler
            </Button>
            <Button
              disabled={isDeleting}
              onClick={handleRemoveItem}
              className="flex-1 h-8 text-[10px] uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white rounded-sm"
            >
              {isDeleting ? "..." : "Oui, supprimer"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
