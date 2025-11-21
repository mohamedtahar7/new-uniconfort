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
      orderState: order.orderState,
      clientOrder: order.clientOrder,
    },
  });
}
export async function confirmOrder(id: any) {
  try {
    const order = await db.order.update({
      where: {
        id: id,
      },
      data: {
        orderState: "Confirmed",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function shipOrder(id: any) {
  try {
    const order = await db.order.update({
      where: {
        id: id,
      },
      data: {
        orderState: "Shipped",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteOrder(id: any) {
  try {
    const order = await db.order.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getOrders() {
  try {
    const orders = await db.order.findMany();
    return orders;
  } catch (error) {
    console.log(error);
  }
}
export async function getConfirmedOrders() {
  try {
    const orders = await db.order.findMany({
      where: {
        orderState: "Confirmed",
      },
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
}
export async function getShippedOrders() {
  try {
    const orders = await db.order.findMany({
      where: {
        orderState: "Shipped",
      },
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
}
export async function getUnconfirmedOrders() {
  try {
    const orders = await db.order.findMany({
      where: {
        orderState: "Not Confirmed",
      },
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
}
