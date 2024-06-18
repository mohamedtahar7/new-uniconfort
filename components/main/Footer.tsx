import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { BsInstagram, BsFacebook, BsTiktok } from "react-icons/bs";
import logoW from "../../assets/LOGO-FULL.png";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="px-16 py-20 bg-slate-900">
      <div className="flex mb-10 md:flex-row md:justify-between flex-col gap-10 justify-center">
        <div className="lg:w-[50%]">
          <Image src={logoW} height={320} width={320} alt="Uniconfort Logo" />
          <p className="text-xl xl:w-[35vw] leading-10 text-[#eee]  mt-6">
            UniConfort Fabricant algérien de Mobiliers, depuis 1996. C’est une
            entreprise algérienne, spécialisés en aménagement des Hôtels,
            Restaurants et Collectivités.
          </p>
        </div>
        <div className="pt-4 flex-col flex gap-3">
          <h3 className="text-[#eee] font-semibold text-xl">Contactez Nous</h3>
          <div className="flex items-center gap-3 mt-3">
            <AiFillHome size={25} className="text-[#eee]" />
            <h4 className="text-lg text-[#eee]">
              UniConfort Aïn Benian, Aïn Benian, Algérie
            </h4>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <FaPhoneAlt size={25} className="text-[#eee]" />
            <h4 className="text-lg text-[#eee]">+213 558 78 92 91</h4>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <LuMail size={25} className="text-[#eee]" />
            <h4 className="text-lg text-[#eee]">
              contact@uniconfortmeuble.store
            </h4>
          </div>
        </div>
        <div className="flex pt-4 flex-col gap-6">
          <h3 className="text-[#eee] text-xl font-semibold">Réseaux Sociaux</h3>
          <div className="flex items-center gap-8">
            <Link
              target="_blank"
              href="https://www.instagram.com/uniconfort.dz/"
            >
              <BsInstagram size={40} className="text-[#eee]" />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/UniConfort.dz">
              <BsFacebook size={40} className="text-[#eee]" />
            </Link>
            <Link target="_blank" href="https://www.tiktok.com/@uniconfort">
              <BsTiktok size={40} className="text-[#eee]" />
            </Link>
          </div>
        </div>
      </div>
      <h2 className="pt-6 text-2xl border-t-[2px] border-[#eee] text-[#eee] text-center mt-8">
        Copyright © 2023. All rights reserved to{" "}
        <span className="font-semibold">Uniconfort</span>
      </h2>
    </div>
  );
};

export default Footer;
