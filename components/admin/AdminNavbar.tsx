"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/admin-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuSofa, LuClipboardList, LuMenu, LuX } from "react-icons/lu";
import { TbShoppingCartPlus, TbChecklist } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";

const AdminNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { name: "Tous Les Produits", href: "/admin/products", icon: LuSofa },
    {
      name: "Ajouter un Produit",
      href: "/admin/add",
      icon: TbShoppingCartPlus,
    },
    {
      name: "Toutes les commandes",
      href: "/admin/orders",
      icon: LuClipboardList,
    },
    {
      name: "Commandes Confirmées",
      href: "/admin/confirmed",
      icon: TbChecklist,
    },
    {
      name: "Commandes Livrées",
      href: "/admin/shipped",
      icon: MdOutlineLocalShipping,
    },
  ];

  return (
    <>
      {/* Mobile Top Header Ribbon (Hidden on Desktop) */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between z-[999]">
        <Link href="/admin/products" className="flex items-center">
          <Image
            src={logo}
            alt="Uniconfort logo"
            width={40}
            height={40}
            className="object-contain brightness-0 text-[#0D2B45]"
          />
          <span className="text-xs tracking-[0.2em] uppercase font-semibold pl-2 text-[#0D2B45]">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[#0D2B45] hover:bg-slate-50 rounded-sm transition-colors"
        >
          {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </header>

      {/* Primary Sidebar Drawer Layer */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-white border-r border-slate-100 z-[998]
        w-full lg:w-64 xl:w-72 p-6 flex flex-col justify-between transition-all duration-300
        lg:translate-x-0 ${isOpen ? "translate-x-0 pt-24" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="space-y-12">
          {/* Logo Brand Header Window */}
          <div className="hidden lg:flex flex-col items-center justify-center border-b border-slate-50 pb-6">
            <Link
              href="/admin/products"
              className="group text-center space-y-3"
            >
              <Image
                src={logo}
                alt="Uniconfort logo"
                width={70}
                height={70}
                className="mx-auto object-contain transition-transform group-hover:scale-105"
              />
              <div>
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#0D2B45]">
                  UNICONFORT
                </h2>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-light mt-0.5">
                  Espace Gestion
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Route Map Cluster */}
          <nav>
            <ul className="space-y-1.5 w-full">
              {adminLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3.5 px-4 h-12 text-xs uppercase tracking-wider font-medium rounded-sm transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-[#0D2B45] text-white shadow-sm shadow-[#0D2B45]/10"
                            : "text-slate-500 hover:text-[#0D2B45] hover:bg-slate-50"
                        }
                      `}
                    >
                      <IconComponent
                        size={18}
                        className={`transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-[#0D2B45]"}`}
                      />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer Identification Metadata block */}
        <div className="border-t border-slate-50 pt-4 hidden lg:block">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-light text-center">
            Uniconfort Studio © 2026
          </p>
        </div>
      </aside>

      {/* Mobile Menu Backdrop Mask Layer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[997] lg:hidden"
        />
      )}
    </>
  );
};

export default AdminNavbar;
