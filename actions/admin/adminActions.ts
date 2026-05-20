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
export async function deleteProduct(id: any) {
  try {
    const deletedProduct = await db.product.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id">>,
) {
  try {
    const updated = await db.product.update({
      where: { id: id },
      data: {
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        images: data.images,
      },
    });
    return updated;
  } catch (error) {
    console.error("Prisma error modifying product data:", error);
    throw new Error("Impossible de mettre à jour le produit");
  }
}
