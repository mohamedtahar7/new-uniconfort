"use client";
import React from "react";
import { BsInstagram, BsFacebook, BsTiktok } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D2B45] py-12 px-[5%] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Copyright */}
        <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-medium">
          © {currentYear} Uniconfort — Créateur de Meubles
        </p>

        {/* Social Links Only */}
        <div className="flex items-center gap-10">
          <Link
            target="_blank"
            href="https://www.instagram.com/uniconfort.dz/"
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            <BsInstagram size={20} />
          </Link>
          <Link
            target="_blank"
            href="https://www.facebook.com/UniConfort.dz"
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            <BsFacebook size={20} />
          </Link>
          <Link
            target="_blank"
            href="https://www.tiktok.com/@uniconfort"
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            <BsTiktok size={20} />
          </Link>
        </div>

        {/* Subtle Region Mark */}
        <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-medium hidden md:block">
          Alger — Algérie
        </p>
      </div>
    </footer>
  );
};

export default Footer;
