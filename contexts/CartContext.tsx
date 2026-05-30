"use client";
import { createContext, useState, useEffect } from "react";

type CartContextType = {
  addToCart: (product: any, id: any, quantity?: number) => void;
  clearCart: any;
  removeFromCart: any;
  increaseAmount: any;
  decreaseAmount: any;
  cart: any;
  itemAmount: any;
  total: any;
  setTotal: any;
};

const defaultCartValues: CartContextType = {
  addToCart: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
  increaseAmount: () => {},
  decreaseAmount: () => {},
  cart: [],
  itemAmount: 0,
  total: 0,
  setTotal: () => {},
};

export const CartContext = createContext<CartContextType>(defaultCartValues);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any>([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Update Total
  useEffect(() => {
    const total = cart.reduce((acc: any, item: any) => {
      return acc + item.amount * item.price;
    }, 0);
    setTotal(total);
  }, [cart]); // Added dependency array here to stop infinite re-renders

  // Update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc: number, currItem: any) => {
        return acc + currItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // Modified: Accepts an optional custom quantity increment parameter
  const addToCart = (product: any, id: any, quantity: number = 1) => {
    const newItem = { ...product, amount: quantity };

    // Check if the item is already in the cart
    const cartItem = cart.find((item: any) => item.id === id);

    // If the item is already in the cart, increment by the chosen quantity
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + quantity };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: any) => {
    const newCart = cart.filter((item: any) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id: any) => {
    const item = cart.find((item: any) => item.id === id);
    addToCart(item, id, 1); // Pass 1 explicitly for structural clarity
  };

  const decreaseAmount = (id: any) => {
    const item = cart.find((item: any) => item.id === id);
    if (item) {
      const newCart = cart.map((item: any) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (item && item.amount < 2) {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        clearCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        cart,
        itemAmount,
        total,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
