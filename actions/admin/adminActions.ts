"use server";
import { Product } from "@prisma/client";
import { db } from "@/lib/db";
export async function addProduct(product: Product) {
  // omit user id means the type is user but without the id
  const result = await db.product.create({
    data: {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images,
    },
  });
}
export async function getProducts() {
  try {
    const products = await db.product.findMany();
    return products;
  } catch (error) {
    console.log(error);
  }
}
