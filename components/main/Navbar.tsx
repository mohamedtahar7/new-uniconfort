"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // 1. Import the hook to track routes
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineXMark,
  HiOutlineTrash,
} from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import logo from "../../assets/LOGO-VIDE-2.png";
import { CartContext } from "@/contexts/CartContext";
import CartItem from "./CartItem";
import { Button } from "../ui/button";

const Navbar = () => {
  const pathname = usePathname(); // 2. Get the current route path
  const isHomePage = pathname === "/"; // 3. Condition to check if we are on "/"

  const [activeNav, setActiveNav] = useState(false);
  const [scrolledNav, setScrolledNav] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);

  useEffect(() => {
    // Only track scrolling if we are on the homepage
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolledNav(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]); // Re-run effect when the page route changes

  const navLinks = [
    { name: "Chaises", href: "/products/chairs" },
    { name: "Tables", href: "/products/tables" },
    { name: "Lits", href: "/products/beds" },
    { name: "Salons", href: "/products/salons" },
  ];

  // 4. Determine if the navbar background should be active/visible
  // It will be active if we are on any subpage OR if we scrolled on the homepage
  const isNavbarActive = !isHomePage || scrolledNav;

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-all duration-500 ${
        activeCart || activeNav ? "z-[9999]" : "z-50"
      } ${
        isNavbarActive
          ? "bg-[#0D2B45]/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-[5%] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 transition-transform hover:scale-105"
        >
          <Image
            alt="Uniconfort Logo"
            width={55}
            height={55}
            src={logo}
            className="brightness-0 invert"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-[0.1em] uppercase text-[#F8FAFC] transition-all hover:text-white/70 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setActiveCart(true)}
            className="relative p-2 text-[#F8FAFC] hover:opacity-70 transition-opacity"
          >
            <HiOutlineShoppingBag size={28} />
            {itemAmount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0D2B45] text-[10px] font-bold"
              >
                {itemAmount}
              </motion.span>
            )}
          </button>

          <button
            onClick={() => setActiveNav(!activeNav)}
            className="lg:hidden p-2 text-[#F8FAFC] z-50"
          >
            {activeNav ? <HiOutlineXMark size={30} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {activeNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 w-full h-screen bg-[#0D2B45] flex flex-col items-center justify-center gap-8 z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveNav(false)}
                className="text-3xl font-light text-[#F8FAFC] tracking-widest uppercase hover:italic"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Cart Drawer */}
      <AnimatePresence>
        {activeCart && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCart(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white z-[10001] shadow-2xl flex flex-col text-[#0D2B45]"
            >
              {/* Header */}
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-light uppercase tracking-wide text-[#0D2B45]">
                    Votre Panier
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    {itemAmount}{" "}
                    {itemAmount > 1
                      ? "articles sélectionnés"
                      : "article sélectionné"}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCart(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors group"
                >
                  <HiOutlineXMark
                    size={22}
                    className="text-slate-400 group-hover:text-[#0D2B45] transition-colors"
                  />
                </button>
              </div>

              {/* Scrollable Items Container */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 space-y-2">
                {cart.length > 0 ? (
                  cart.map((item: any, index: any) => (
                    <CartItem item={item} key={item.id || index} />
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-3">
                    <HiOutlineShoppingBag size={48} strokeWidth={1} />
                    <p className="text-sm uppercase tracking-widest font-light">
                      Votre panier est vide
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Footer block */}
              {cart.length > 0 && (
                <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 space-y-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-400 uppercase tracking-widest text-xs font-medium">
                      Sous-total
                    </span>
                    <span className="text-2xl font-semibold text-[#0D2B45]">
                      {total.toLocaleString()}.00{" "}
                      <span className="text-sm font-normal">DZD</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/order"
                      className="block w-full"
                      onClick={() => setActiveCart(false)}
                    >
                      <Button className="w-full bg-[#0D2B45] hover:bg-[#0D2B45]/90 h-14 text-sm uppercase tracking-widest font-medium rounded-sm transition-all shadow-sm">
                        Passer la commande
                      </Button>
                    </Link>

                    <button
                      onClick={() => clearCart()}
                      className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors py-2 font-medium"
                    >
                      <HiOutlineTrash size={14} /> Vider le panier
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
