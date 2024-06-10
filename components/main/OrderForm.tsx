import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const OrderForm = () => {
  return (
    <form className="flex flex-col gap-3">
      <Input type="text" placeholder="Nom" />
      <Input type="email" placeholder="Email" />
      <Input type="text" placeholder="Numéro de Telephone" />
      <Input type="text" placeholder="Wilaya" />
      <Input type="text" placeholder="Adresse" />
      <Button type="submit" variant={"outline"}>
        Commander
      </Button>
    </form>
  );
};

export default OrderForm;
