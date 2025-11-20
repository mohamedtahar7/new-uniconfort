import Image from "next/image";
import React from "react";
import logo from "../../assets/admin-logo.png";
import Link from "next/link";
import { LuSofa, LuClipboardList } from "react-icons/lu";
import { TbShoppingCartPlus, TbChecklist } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";
const AdminNavbar = () => {
  return (
    <header className="shadow-lg p-[2%] fixed top-0 left-0 w-[20%] h-full bg-slate-700">
      <div className="flex flex-col items-center gap-24">
        <Image src={logo} alt="Uniconfort logo" width={1200} height={1200} />
        <ul className="flex flex-col items-center gap-16">
          <li className="transition hover:opacity-80 text-xl text-[#fffafb]">
            <Link className="flex items-center gap-2" href={"/admin/products"}>
              <LuSofa className="text-[#fffafb]" size={25} />
              Tous Les Produits
            </Link>
          </li>
          <li className="transition hover:opacity-80 text-xl text-[#fffafb]">
            <Link className="flex items-center gap-2" href={"/admin/add"}>
              <TbShoppingCartPlus className="text-[#fffafb]" size={25} />
              Ajouter un Produit
            </Link>
          </li>
          <li className="transition hover:opacity-80 text-xl text-[#fffafb]">
            <Link className="flex items-center gap-2" href={"/admin/orders"}>
              <LuClipboardList size={25} className="text-[#fffafb]" />
              Tous les commandes
            </Link>
          </li>
          <li className="transition hover:opacity-80 text-xl text-[#fffafb]">
            <Link className="flex items-center gap-2" href={"/admin/confirmed"}>
              <TbChecklist size={25} className="text-[#fffafb]" />
              Commandes Confirmées
            </Link>
          </li>
          <li className="transition hover:opacity-80 text-xl text-[#fffafb]">
            <Link className="flex items-center gap-2" href={"/admin/shipped"}>
              <MdOutlineLocalShipping size={25} className="text-[#fffafb]" />
              Commandes Livrées
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default AdminNavbar;
