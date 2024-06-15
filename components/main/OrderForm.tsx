"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import Spinner from "../ui/Spinner";
import { addOrder } from "@/actions/main/clientsActions";
import { Toaster, toast } from "sonner";
const OrderForm = () => {
  const { cart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [adress, setAdress] = useState("");
  const [loading, setLoading] = useState(false);
  const id = `${name}`;
  const handleSubmit = async (
    id: string,
    n: string,
    e: string,
    t: string,
    w: string,
    a: string,
    o: any //order array
  ) => {
    setLoading(true);
    const order = {
      id,
      clientName: n,
      clientEmail: e,
      clientTel: t,
      clientWilaya: w,
      clientAdress: a,
      clientOrder: o,
    };
    try {
      const result = await addOrder(order);
      setLoading(false);
      toast.success(
        `Sir ${order.clientName}, your order has been sent successfully!`
      );
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(id, name, email, tel, wilaya, adress, cart);
      }}
      className="flex flex-col gap-3"
    >
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Nom"
      />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
      />
      <Input
        onChange={(e) => setTel(e.target.value)}
        value={tel}
        type="text"
        placeholder="Numéro de Telephone"
      />
      <Input
        onChange={(e) => setWilaya(e.target.value)}
        value={wilaya}
        type="text"
        placeholder="Wilaya"
      />
      <Input
        onChange={(e) => setAdress(e.target.value)}
        value={adress}
        type="text"
        placeholder="Adresse"
      />
      <Button type="submit" variant={"outline"}>
        {loading ? <Spinner d="6" /> : "Commander"}
      </Button>
      <Toaster />
    </form>
  );
};

export default OrderForm;
