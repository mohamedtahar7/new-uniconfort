// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { FiChevronDown } from "react-icons/fi";

// const Hero = () => {
//   // Animation Variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         delayChildren: 0.5,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   return (
//     <section
//       id="hero"
//       className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D2B45]"
//     >
//       {/* Background Image with Parallax-like scale */}
//       <motion.div
//         initial={{ scale: 1.1, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         className="absolute inset-0 z-0"
//       >
//         <div
//           className="absolute inset-0 bg-[url('https://i.postimg.cc/BbZkmg6Q/home-bg2.jpg')] bg-cover bg-center bg-no-repeat"
//           style={{ transform: "translateZ(0)" }} // Hardware acceleration
//         />
//         {/* Modern Gradient Overlay: Darker at bottom for text contrast */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0D2B45]/80" />
//       </motion.div>

//       {/* Content */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="relative z-10 max-w-[1200px] px-6 text-center"
//       >
//         <motion.span
//           variants={itemVariants}
//           className="inline-block text-[#94A3B8] uppercase tracking-[0.4em] text-sm font-light mb-4"
//         >
//           Uniconfort — Créateur de Meubles
//         </motion.span>

//         <motion.h1
//           variants={itemVariants}
//           className="text-5xl md:text-7xl lg:text-8xl text-[#F8FAFC] font-light leading-tight mb-8"
//         >
//           L'élégance <span className="italic font-serif">intemporelle</span>
//         </motion.h1>

//         <motion.p
//           variants={itemVariants}
//           className="max-w-2xl mx-auto text-[#F8FAFC]/80 mb-12 text-lg md:text-xl font-light leading-relaxed"
//         >
//           Transformez votre intérieur avec des pièces d'exception, conçues pour
//           allier confort absolu et design architectural.
//         </motion.p>

//         <motion.div
//           variants={itemVariants}
//           className="flex flex-col sm:flex-row items-center justify-center gap-6"
//         >
//           <Link
//             href="#products"
//             className="group relative px-10 py-4 bg-[#F8FAFC] text-[#0D2B45] overflow-hidden transition-all duration-300"
//           >
//             <span className="relative z-10 font-medium tracking-wider">
//               VOIR LA COLLECTION
//             </span>
//             <motion.div className="absolute inset-0 bg-[#94A3B8] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//           </Link>

//           <Link
//             href="/contact"
//             className="px-10 py-4 border border-[#F8FAFC]/30 text-[#F8FAFC] hover:border-[#F8FAFC] transition-colors tracking-wider font-medium"
//           >
//             SUR MESURE
//           </Link>
//         </motion.div>
//       </motion.div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2, duration: 1 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F8FAFC]/50 flex flex-col items-center gap-2"
//       >
//         <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <FiChevronDown size={20} />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineChevronDown } from "react-icons/hi2";

const HeroArchitectural = () => {
  // Animation for the "Reveal" effect on text
  const revealVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-end overflow-hidden bg-zinc-900">
      {/* 1. Background Image - Focused on textures (Concrete, Wood, Stone) */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-[0.4]"
          // Replace with your specific low-color furniture/interior image
        />
        {/* Subtle Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 w-full px-[5%] pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Slogan with line accent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-[1px] w-12 bg-white/40" />
            <span className="text-white/60 text-xs font-medium tracking-[0.5em] uppercase">
              Créateur de Meubles —
            </span>
          </motion.div>

          {/* Main Heading with "Hidden" reveal effect */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-8xl lg:text-9xl text-white font-light tracking-tight leading-[0.9]"
            >
              L'essence du <br />
              <span className="font-serif italic font-normal text-[#94A3B8]">
                minimalisme.
              </span>
            </motion.h1>
          </div>

          {/* Call to Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-white/40 font-light max-w-sm leading-relaxed"
            >
              Une approche architecturale du mobilier, où chaque ligne définit
              une nouvelle façon d'habiter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6 md:justify-end"
            >
              <Link
                href="#products"
                className="px-10 py-5 bg-[#0D2B45] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#163a5a] transition-colors"
              >
                La Collection
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 border border-white/20 text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                Projets
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Decorative Elements */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"
      >
        <HiOutlineChevronDown size={30} />
      </motion.div>
    </section>
  );
};

export default HeroArchitectural;
