"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const Hero = () => {
  return (
    <section
      id="hero"
      className='sm:py-80 py-36 lg:py-48 xl:py-56 2xl:py-96 px-20 bg-[url("https://i.postimg.cc/BbZkmg6Q/home-bg2.jpg")] bg-no-repeat bg-center bg-cover bg-fixed h-[100vh] w-full'
    >
      <div className="bg-black absolute top-0 left-0 opacity-[48%] h-screen w-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.h1
          whileInView={{ x: 0, opacity: 100 }}
          initial={{ x: -50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="md:text-8xl text-[2.8rem] text-[#eee] stroke-white font-semibold mb-12"
        >
          Découvrez l'élégance intemporelle
        </motion.h1>
        <motion.p
          whileInView={{ x: 0, opacity: 100 }}
          initial={{ x: -50, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[#eee] mb-12 md:text-2xl text-xl font-medium"
        >
          Transformez votre espace avec notre collection de meubles exquis..
        </motion.p>
        <Link
          href="#products"
          className="cursor-pointer md:text-xl text-lg font-medium py-3 hover:bg-[#11334f] hover:border-none transition-all md:px-8 px-6 bg-none border-white border text-white"
        >
          Voir Nos Produits
        </Link>
      </div>
    </section>
  );
};

export default Hero;
