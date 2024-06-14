"use server";
import { Order } from "@prisma/client";
import { db } from "@/lib/db";
export async function addOrder(order: Order) {
  const result = await db.order.create({
    data: {
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientTel: order.clientTel,
      clientWilaya: order.clientWilaya,
      clientAdress: order.clientAdress,
      clientOrder: order.clientOrder,
    },
  });
}
export async function getOrders() {
  try {
    const orders = await db.order.findMany();
    return orders;
  } catch (error) {
    console.log(error);
  }
}
