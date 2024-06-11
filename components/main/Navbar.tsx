"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import logo from "../../assets/LOGO-VIDE-2.png";
import { CartContext } from "@/contexts/CartContext";
import CartItem from "./CartItem";
const Navbar = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [scrolledNav, setScrolledNav] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setScrolledNav(true) : setScrolledNav(false);
    });
  }, []);
  console.log(cart);

  return (
    <header
      className={`fixed transition z-40 w-full ${
        scrolledNav ? "shadow-xl" : ""
      } px-[5%] py-4 bg-slate-900`}
    >
      <nav className="flex items-center justify-between">
        <Link
          href={"/"}
          className="uppercase hover:opacity-80 transition font-semibold text-xl text-[#fffafb]"
        >
          <Image alt="uniconfort logo" width={48} height={48} src={logo} />
        </Link>
        <ul className="lg:flex hidden list-none items-center gap-8">
          <li>
            <Link
              className="text-[#fffafb] transition hover:opacity-80 text-md"
              href={"/products/chairs"}
            >
              CHAISES
            </Link>
          </li>
          <li>
            <Link
              className="text-[#fffafb] transition hover:opacity-80 text-md"
              href={"/products/tables"}
            >
              TABLES
            </Link>
          </li>
          <li>
            <Link
              className="text-[#fffafb] transition hover:opacity-80 text-md"
              href={"/products/beds"}
            >
              LITS
            </Link>
          </li>
          <li>
            <Link
              className="text-[#fffafb] transition hover:opacity-80 text-md"
              href={"/products/salons"}
            >
              SALONS
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <Button
            className="relative"
            variant={"outline"}
            onClick={() => setActiveCart(!activeCart)}
          >
            <span className="grid place-content-center w-6 h-6 absolute -top-3 -right-1 bg-slate-600 p-1 text-[16px] text-[#fffafb] rounded-full">
              {itemAmount}
            </span>
            <HiOutlineShoppingBag size={35} className="text-slate-900" />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setActiveNav(!activeNav)}
            className="relative lg:hidden flex items-center justify-center"
          >
            {activeNav ? (
              <MdClose size={33} className="text-slate-900" />
            ) : (
              <FiMenu size={30} className="text-slate-900" />
            )}
          </Button>
        </div>
        <nav
          className={`absolute ${
            activeNav ? "top-20" : "-top-96"
          } transition-all right-20 lg:hidden flex flex-col bg-slate-700 items-center gap-6 rounded-lg list-none text-white py-3 px-5`}
        >
          <li onClick={() => setActiveNav(false)}>
            <Link
              className="transition hover:opacity-80"
              href={"/products/chairs"}
            >
              CHAISES
            </Link>
          </li>
          <li onClick={() => setActiveNav(false)}>
            <Link
              className="transition hover:opacity-80"
              href={"/products/tables"}
            >
              TABLES
            </Link>
          </li>
          <li onClick={() => setActiveNav(false)}>
            <Link
              className="transition hover:opacity-80"
              href={"/products/beds"}
            >
              LITS
            </Link>
          </li>
          <li onClick={() => setActiveNav(false)}>
            <Link
              className="transition hover:opacity-80"
              href={"/products/salons"}
            >
              SALONS
            </Link>
          </li>
        </nav>
      </nav>
      {/* Cart */}
      <div
        className={`absolute z-30 ${
          activeCart ? "top-0 right-0" : "top-0 -right-full"
        } overflow-auto h-[100vh] transition-all drop-shadow-xl lg:w-[35vw] 2xl:w-[25vw] w-[100vw] md:w-[40vw] sm:w-[50vw] bg-white`}
      >
        <div className="py-8 px-8 flex justify-between items-center text-zinc-900">
          <h3 className="text-2xl font-medium text-zinc-900">
            Panier ({itemAmount})
          </h3>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => clearCart()}
              variant={"outline"}
              className=""
            >
              <FaTrashAlt size={25} className="text-slate-900 cursor-pointer" />
            </Button>
            <Button variant={"outline"} onClick={() => setActiveCart(false)}>
              <HiArrowRight
                size={30}
                className="text-slate-900 cursor-pointer"
              />
            </Button>
          </div>
        </div>
        <h4 className="text-zinc-900 text-xl font-medium px-8 mb-3">
          {" "}
          Total : {total}.00 DZD{" "}
        </h4>
        <div className="overflow-y-auto">
          {cart.map((item: any, index: any) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
        {itemAmount > 0 && (
          <div className="px-4 py-4 flex flex-col gap-3 absolute -bottom-50 left-0 right-0">
            <Button
              variant={"outline"}
              className="w-full cursor-pointer py-6 text-center text-xl font-medium"
              onClick={() => setActiveCart(false)}
            >
              Continuer Vos Achats
            </Button>
            <Link
              href={"/order"}
              onClick={() => window.scrollTo(0, 0)}
              className="w-full"
            >
              <Button className="w-full py-6 text-xl font-medium">
                Commander
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
