import React from "react";
interface OrderCardProps {
  order: any;
}
const OrderCard = ({ order }: OrderCardProps) => {
  const total = order.clientOrder.reduce((acc: any, item: any) => {
    return acc + item.amount * item.price;
  }, 0);
  const amount = order.clientOrder.reduce((acc: number, currItem: any) => {
    return acc + currItem.amount;
  }, 0);
  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-gray-100 rounded-lg">
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
      <div className="absolute bottom-0 right-4">Tahar</div>
    </div>
  );
};

export default OrderCard;
