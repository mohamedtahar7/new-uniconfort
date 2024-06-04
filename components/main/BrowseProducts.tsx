import React from "react";
import CategoryCart from "./CategoryCart";
const BrowseProducts = () => {
  return (
    <section id="products" className="px-[5%] p-[5%]">
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-semibold text-3xl ">
          Notre Collection de Produits
        </h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <CategoryCart
            title="CHAISES"
            link="/products/chairs"
            image="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CategoryCart
            title="TABLES"
            link="/products/tables"
            image="https://img5.su-cdn.com/cdn-cgi/image/width=600,height=600/mall/file/2022/01/20/69c43fb332794a4191d4f547002175ca.jpg"
          />
          <CategoryCart
            title="LITS"
            link="/products/beds"
            image="https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CategoryCart
            title="SALONS"
            link="/products/salons"
            image="https://images.pexels.com/photos/1090092/pexels-photo-1090092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      </div>
    </section>
  );
};

export default BrowseProducts;
