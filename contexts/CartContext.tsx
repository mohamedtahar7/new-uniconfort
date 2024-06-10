"use client";
import { createContext, useState, useEffect } from "react";
const getInitialCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
export const CartContext = createContext();
const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState(getInitialCart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [itemAmount, setItemAmount] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);
  // useEffect(()=>{
  //   const data = localStorage.getItem('my-cart')
  //   if(data) {
  //     setCart(JSON.parse(data))
  //   }
  // },[])
  // useEffect(()=>{
  //   localStorage.setItem('my-cart',JSON.stringify(cart))
  // },[cart]);

  // update Total
  useEffect(() => {
    const total = cart.reduce((acc: any, item: any) => {
      return acc + item.amount * item.price;
    }, 0);
    setTotal(total);
  });
  // update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc: number, currItem: any) => {
        return acc + currItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);
  const addToCart = (product: any, id: any) => {
    const newItem = { ...product, amount: 1 };
    // check if the item already in the cart
    const cartItem = cart.find((item: any) => item.id === id);
    // if the item already in the cart
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
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
    addToCart(item, id);
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
    if (item.amount < 2) {
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
