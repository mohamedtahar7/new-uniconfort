"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const categories = [
  {
    title: "Chaises",
    count: "01",
    link: "/products/chairs",
    image:
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // Large feature card taking up the left half
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Tables",
    count: "02",
    link: "/products/tables",
    image:
      "https://img5.su-cdn.com/cdn-cgi/image/width=600,height=600/mall/file/2022/01/20/69c43fb332794a4191d4f547002175ca.jpg",
    // Wide card taking up the top right
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Lits",
    count: "03",
    link: "/products/beds",
    image:
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // Small card bottom middle
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Salons",
    count: "04",
    link: "/products/salons",
    image:
      "https://images.pexels.com/photos/1090092/pexels-photo-1090092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // Small card bottom right
    gridClass: "md:col-span-1 md:row-span-1",
  },
];

const BrowseProducts = () => {
  return (
    <section id="products" className="bg-white py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <span className="text-[#0D2B45] uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#0D2B45]" />
              Catégories
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#0D2B45] tracking-tight">
              Notre{" "}
              <span className="font-serif italic text-[#94A3B8]">
                Collection
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-light text-sm max-w-sm md:text-right"
          >
            Trouvez l'inspiration parmi nos créations artisanales, pensées pour
            sublimer chaque espace de votre intérieur.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[70vh] min-h-[600px] max-h-[900px] auto-rows-[300px] md:auto-rows-auto">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative overflow-hidden bg-zinc-100 ${cat.gridClass}`}
            >
              <Link href={cat.link} className="block w-full h-full relative">
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-[#0D2B45]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-[#0D2B45] group-hover:border-white transition-all duration-300">
                      <FiArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                    <span className="text-white/60 font-medium text-xs tracking-widest">
                      {cat.count}
                    </span>
                  </div>

                  <div className="overflow-hidden">
                    <h3 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {cat.title}
                    </h3>
                    <div className="h-[1px] w-0 bg-white mt-4 group-hover:w-full transition-all duration-700 ease-in-out" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseProducts;
