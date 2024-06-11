"use client";
import { getProducts } from "@/actions/admin/adminActions";
import ProductCard from "@/components/main/ProductCard";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    const pros: any = await getProducts();
    setProducts(pros);
  };
  useEffect(() => {
    fetchProducts();
    setLoading(false);
  }, []);
  return (
    <main className="px-[5%] py-[10%]">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner d="10" />
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.filter((product: any) => product.category === "Chaises")
            .length === 0 ? (
            <h1 className="text-center font-semibold text-2xl">
              No Products Found
            </h1>
          ) : (
            products
              ?.filter((product: any) => product.category === "Chaises")
              .map((product, id) => <ProductCard key={id} product={product} />)
          )}
        </div>
      )}
    </main>
  );
};

export default page;
