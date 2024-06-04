import React from "react";
import heroImg from "../../assets/pexels-pixabay-276583-removebg-preview.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
const Hero = () => {
  return (
    <section
      id="hero"
      className="overflow-y-hidden py-[10%] px-[5%] bg-zinc-100 h-screen"
    >
      {/* Text */}
      <main className="flex items-center justify-between">
        <div className="flex flex-col justify-start gap-6">
          <h1 className="text-5xl font-bold">This Is The Header</h1>
          <p className="w-[80%] text-xl font-normal">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat,
            magni tenetur consequatur enim id eum maiores. Iste aliquid, at
            ipsum, in cupiditate maxime architecto autem pariatur quos quia quae
            delectus.
          </p>
          <Link
            href={"/"}
            className="bg-gradient-to-r text-md from-[#11334f] to-sky-800 text-slate-100 py-2 px-4 rounded-xl w-fit transition hover:opacity-80"
          >
            Browse Products
          </Link>
        </div>
        {/* IMG */}
        <div>
          <img
            className="rounded-full"
            src={
              "https://i.pinimg.com/originals/0c/37/4f/0c374f8f2c40ade912ebdf5955b7f672.jpg"
            }
            alt="hero image"
          />
        </div>
      </main>
    </section>
  );
};

export default Hero;
