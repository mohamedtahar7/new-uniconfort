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
export async function getDashboardMetrics() {
  try {
    // 1. Fetch unconfirmed orders count
    const unconfirmedCount = await db.order.count({
      where: { orderState: "Not Confirmed" },
    });

    // 2. Fetch all successful orders to calculate real revenue
    // (Adjust 'Confirmed' or 'Shipped' based on what you count as completed revenue)
    const completedOrders = await db.order.findMany({
      where: {
        orderState: { in: ["Confirmed", "Shipped"] },
      },
      include: {
        clientOrder: true, // Includes items array to get prices and amounts
      },
    });

    // Calculate total revenue from real item sales
    const totalRevenue = completedOrders.reduce((acc, order) => {
      const orderTotal = order.clientOrder.reduce((sum: number, item: any) => {
        return sum + item.amount * item.price;
      }, 0);
      return acc + orderTotal;
    }, 0);

    // 3. Get total active catalog products count
    const productsCount = await db.product.count();

    return {
      unconfirmedCount,
      totalRevenue,
      productsCount,
    };
  } catch (error) {
    console.error("Error generating dashboard counters:", error);
    return {
      unconfirmedCount: 0,
      totalRevenue: 0,
      productsCount: 0,
    };
  }
}
