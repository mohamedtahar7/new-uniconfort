"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { MdAddShoppingCart, MdOutlineRemoveRedEye } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Toaster, toast } from "sonner";
interface ProductCardProps {
  product: object;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useContext(CartContext);
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
      <CardFooter className="-mb-[5%] flex flex-col gap-2">
        <Button
          onClick={() => {
            addToCart(product, product?.id);
            toast.success("Ajouté au Panier");
          }}
          className="flex items-center gap-2 bg-slate-900 w-full transition hover:opacity-80 rounded-xl text-lg text-[#fffafb]"
        >
          <MdAddShoppingCart size={20} />
          Ajouter au Panier
        </Button>
        <Link className="w-full" href={"/"}>
          <Button className="flex items-center gap-2 bg-slate-900 w-full transition hover:opacity-80 rounded-xl text-lg text-[#fffafb]">
            <MdOutlineRemoveRedEye size={20} />
            Plus de Détails
          </Button>
        </Link>
      </CardFooter>
      <Toaster richColors />
    </Card>
  );
};

export default ProductCard;
