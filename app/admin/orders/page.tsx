"use client";
import { getOrders } from "@/actions/main/clientsActions";
import OrderCard from "@/components/admin/OrderCard";
import Spinner from "@/components/ui/Spinner";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const fetchOrders = async () => {
    const ords: any = await getOrders();
    setOrders(ords);
  };
  useEffect(() => {
    fetchOrders();
    setLoading(false);
  }, []);
  return (
    <main className="px-[20%] py-[2%]">
      <div className="flex flex-col gap-3 w-[80vw] px-[5%]">
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner d="10" />
          </div>
        ) : (
          orders.map((ord, id) => <OrderCard order={ord} />)
        )}
      </div>
    </main>
  );
};

export default page;
