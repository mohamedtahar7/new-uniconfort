import {
  confirmOrder,
  deleteOrder,
  shipOrder,
} from "@/actions/main/clientsActions";
import React from "react";
import { FaTrash, FaCheckCircle, FaShippingFast } from "react-icons/fa";
interface OrderCardProps {
  order: any;
}
const OrderCard = ({ order }: OrderCardProps) => {
  const confirmItem = async () => {
    try {
      const result = await confirmOrder(order.id);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };
  const shipItem = async () => {
    try {
      const result = await shipOrder(order.id);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };
  const deleteItem = async () => {
    try {
      const result = await deleteOrder(order.id);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };
  const total = order.clientOrder.reduce((acc: any, item: any) => {
    return acc + item.amount * item.price;
  }, 0);
  const amount = order.clientOrder.reduce((acc: number, currItem: any) => {
    return acc + currItem.amount;
  }, 0);
  const id = order.id;
  return (
    <div className="relative flex flex-col gap-4 w-full p-6 bg-gray-100 rounded-lg">
      <div className="absolute flex items-center gap-3 -bottom-2 -right-2">
        {order.orderState === "Not Confirmed" && (
          <FaCheckCircle
            onClick={() => {
              confirmItem();
            }}
            className="text-green-500 hover:opacity-80 transition cursor-pointer"
            size={30}
          />
        )}
        {order.orderState === "Confirmed" && (
          <FaShippingFast
            onClick={() => {
              shipItem();
            }}
            className="text-blue-500 hover:opacity-80 transition cursor-pointer"
            size={30}
          />
        )}
        <FaTrash
          onClick={() => {
            deleteItem();
          }}
          className="text-red-500 hover:opacity-80 transition cursor-pointer"
          size={30}
        />
      </div>
      <div className="flex items-start justify-between">
        <div className="border-r-[1px] border-gray-100">
          <h2>Client: {order.clientName}</h2>
          <h2>Tel: {order.clientTel}</h2>
          <h2>Email: {order.clientEmail}</h2>
        </div>
        <div className="border-r-[1px] border-gray-100">
          <h2>Prix Total: {total}.00 DZD</h2>
          <h2>Num Produits: {amount}</h2>
        </div>
        <div className="">
          <h2>Adresse: {order.clientAdress}</h2>
          <h2>Wilaya: {order.clientWilaya}</h2>
        </div>
      </div>
      <div className="border-t-2 border-zinc-300 pt-4">
        <h2>Commande:</h2>
        <div className="grid grid-cols-4 gap-4">
          {order.clientOrder.map((item: any, id: any) => (
            <h2>
              Produit {id + 1}:{item.name} x {item.amount}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
