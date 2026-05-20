"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import { addProduct } from "@/actions/admin/adminActions";
import { toast } from "sonner";
import axios from "axios";
import { HiOutlineDocumentPlus, HiOutlineCloudArrowUp } from "react-icons/hi2";

const AddForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadImg = async (img: File | null) => {
    if (!img) return null;
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "uniconfort_preset");

    try {
      const api = `https://api.cloudinary.com/v1_1/dlzmmzpkw/image/upload`;
      const res = await axios.post(api, data);
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("Échec du téléchargement de l'image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || category === "Choose a Category") {
      toast.error("Veuillez choisir une catégorie valide");
      return;
    }

    setLoading(true);
    const productId = `${name.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    try {
      // Parallelized image upload for enhanced speed performance
      const [imgLink1, imgLink2] = await Promise.all([
        uploadImg(image1),
        uploadImg(image2),
      ]);

      const product = {
        id: productId,
        name,
        price: Number(price),
        category,
        description,
        images: [imgLink1, imgLink2].filter(Boolean),
      };

      await addProduct(product);

      toast.success(`Le produit "${name}" a été ajouté avec succès !`);

      // Reset form states cleanly
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage1(null);
      setImage2(null);
    } catch (error) {
      toast.error("Une erreur est survenue lors de la création du produit.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-slate-100 shadow-xl shadow-slate-100/40 rounded-sm p-6 md:p-8 text-[#0D2B45]">
      <div className="space-y-6">
        {/* Header Block */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2 bg-slate-50 text-[#0D2B45] rounded-sm">
            <HiOutlineDocumentPlus size={22} />
          </div>
          <div>
            <h2 className="text-xl font-light uppercase tracking-wide">
              Ajouter un Produit
            </h2>
            <p className="text-xs text-slate-400 font-light">
              Créer une nouvelle entrée dans votre catalogue showroom
            </p>
          </div>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
              Nom du Produit *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Ex: Table Basse en Chêne"
              className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                Prix (DZD) *
              </label>
              <Input
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                type="number"
                min={0}
                placeholder="0.00"
                className="h-12 border-slate-200 focus:border-[#0D2B45] focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                Catégorie *
              </label>
              <select
                value={category}
                className="w-full h-12 px-3 border border-slate-200 bg-white focus:border-[#0D2B45] focus:outline-none focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm text-slate-700 cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Chaises">Chaises</option>
                <option value="Tables">Tables</option>
                <option value="Lits">Lits</option>
                <option value="Salons">Salons</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails, dimensions, essences de bois, tissus et finitions du modèle..."
              className="w-full min-h-[100px] p-3 border border-slate-200 focus:border-[#0D2B45] focus:outline-none focus:ring-1 focus:ring-[#0D2B45] rounded-sm text-sm text-slate-700 placeholder-slate-400 resize-none transition-all"
            />
          </div>

          {/* Clean Media Upload Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                Image Principale *
              </label>
              <div className="relative border border-dashed border-slate-200 rounded-sm hover:border-[#0D2B45] transition-colors bg-slate-50/50 flex flex-col items-center justify-center py-4 px-3 cursor-pointer">
                <HiOutlineCloudArrowUp
                  size={20}
                  className="text-slate-400 mb-1"
                />
                <span className="text-xs text-slate-500 font-light text-center truncate max-w-full px-2">
                  {image1 ? image1.name : "Téléverser l'image 1"}
                </span>
                <input
                  required
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setImage1(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                Image Secondaire *
              </label>
              <div className="relative border border-dashed border-slate-200 rounded-sm hover:border-[#0D2B45] transition-colors bg-slate-50/50 flex flex-col items-center justify-center py-4 px-3 cursor-pointer">
                <HiOutlineCloudArrowUp
                  size={20}
                  className="text-slate-400 mb-1"
                />
                <span className="text-xs text-slate-500 font-light text-center truncate max-w-full px-2">
                  {image2 ? image2.name : "Téléverser l'image 2"}
                </span>
                <input
                  required
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setImage2(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action Submission Button */}
          <div className="pt-4">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-[#0D2B45] hover:bg-[#0D2B45]/90 text-white h-12 text-xs uppercase tracking-widest font-medium rounded-sm transition-all shadow-sm"
            >
              {loading ? <Spinner d="6" /> : "Ajouter le Produit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
