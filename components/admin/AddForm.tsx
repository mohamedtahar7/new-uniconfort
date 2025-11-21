"use client";
import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import { addProduct } from "@/actions/admin/adminActions";
import { useToast } from "../ui/use-toast";
import axios from "axios";
const AddForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const uploadImg = async (img: any) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "uniconfort_preset");
    try {
      let api = `https://api.cloudinary.com/v1_1/dlzmmzpkw/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      alert(error);
    }
  };
  const id = `${name}`;
  const handleSubmit = async (
    id: string,
    n: string,
    p: number,
    c: string,
    d: string,
    img1: any,
    img2: any
  ) => {
    setLoading(true);
    let imgLink1 = await uploadImg(img1);
    let imgLink2 = await uploadImg(img2);
    const images = [imgLink1, imgLink2];
    const product = {
      id,
      name: n,
      price: p,
      category: c,
      description: d,
      images: images,
    };
    try {
      const result = await addProduct(product);
      setLoading(false);
      alert(`product ${product.name} has been added successfully!`);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="w-[35%] absolute top-0 left-0 translate-x-[100%] translate-y-[20%]">
      <div className="flex flex-col gap-4 py-2 px-5 bg-slate-700 rounded-xl">
        <h2 className="text-[#fffafb] text-center text-xl font-semibold">
          Ajouter un Produit
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              id,
              name,
              price,
              category,
              description,
              image1,
              image2
            );
          }}
          className="flex flex-col gap-3"
        >
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            placeholder="Nom de Produit"
            required
          />
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            placeholder="Description de Produit"
          />
          <Input
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            required
            className="border-[#fffafb]"
            type="number"
            min={0}
            placeholder="Prix de Produit"
          />
          <select
            className="rounded-md p-3"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            <option>Choose a Category</option>
            <option value="Chaises">Chaises</option>
            <option value="Tables">Tables</option>
            <option value="Lits">Lits</option>
            <option value="Salons">Salons</option>
          </select>
          <Input
            required
            className="cursor-pointer"
            type="file"
            placeholder="Image 1"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage1(e.target.files[0]);
              }
            }}
          />
          <Input
            required
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage2(e.target.files[0]);
              }
            }}
            className="cursor-pointer"
            type="file"
            placeholder="Image 2"
          />
          <Button
            disabled={loading}
            type="submit"
            className="p-2"
            variant={"outline"}
          >
            {loading ? <Spinner d="6" /> : "Ajouter le Produit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
