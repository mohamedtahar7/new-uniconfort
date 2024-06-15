"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Toaster, toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/actions/admin/adminActions";
interface AdminCardProps {
  product: any;
}
const AdminCard = ({ product }: AdminCardProps) => {
  const router = useRouter();
  const removeItem = async () => {
    try {
      const result = await deleteProduct(product.id);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <Card
      className={`grid place-content-center rounded-xl px-[2%] py-[5%]
       shadow-sm transition-all bg-zinc-100/50 overflow-hidden`}
    >
      <CardContent className="flex flex-col gap-4">
        <div
          className="h-[320px] w-[320px] sm:h-[280px] sm:w-[280px] xl:h-[240px] rounded-xl xl:w-[240px] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-md text-zinc-800 font-normal">
            {product.price}.00 DZD
          </p>
        </div>
      </CardContent>
      <CardFooter className="-mb-[5%] flex items-center justify-between gap-2">
        <Button
          onClick={() => {
            toast.success("Ajouté au Panier");
          }}
          variant={"outline"}
          className="flex items-center gap-2 w-full transition hover:opacity-80 rounded-xl text-lg text-slate-900 "
        >
          <CiEdit size={20} />
        </Button>
        <Button
          variant={"destructive"}
          className="flex items-center transition w-full hover:opacity-80 rounded-xl text-lg text-[#fffafb]"
          onClick={() => {
            removeItem();
            toast.success("Item Removed!");
            router.refresh();
          }}
        >
          <AiFillDelete size={20} />
        </Button>
      </CardFooter>
      <Toaster richColors />
    </Card>
  );
};

export default AdminCard;
