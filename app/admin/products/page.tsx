"use client";
import { getProducts } from "@/actions/admin/adminActions";
import AdminCard from "@/components/admin/AdminCard";
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
    <main className="pl-[25%] py-[5%]">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner d="10" />
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products?.length === 0 ? (
            <h1 className="text-center font-semibold text-2xl">
              No Products Found
            </h1>
          ) : (
            products?.map((product, id) => (
              <AdminCard key={id} product={product} />
            ))
          )}
        </div>
      )}
    </main>
  );
};

export default page;
