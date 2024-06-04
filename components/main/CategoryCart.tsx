import Link from "next/link";
import React from "react";
interface CategoryCartProps {
  image: string;
  title: string;
  link: string;
}
const CategoryCart = ({ title, image, link }: CategoryCartProps) => {
  return (
    <Link
      href={link}
      className="relative text-center text-5xl font-medium flex items-center justify-center h-64 w-[100%] transition hover:opacity-80 bg-no-repeat bg-center bg-cover text-slate-100"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <h2 className="z-20">{title}</h2>
      <div className="absolute h-full w-full top-0 bg-black opacity-45 z-10"></div>
    </Link>
  );
};

export default CategoryCart;
