"use client";
import { createContext, useState, useEffect } from "react";
const getInitialCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
export const CartContext = createContext();
const CartProvider = ({ children }) => {
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
    const total = cart.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0);
    setTotal(total);
  });
  // update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, currItem) => {
        return acc + currItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if the item already in the cart
    const cartItem = cart.find((item) => item.id === id);
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
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };
  const increaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    addToCart(item, id);
  };
  const decreaseAmount = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      const newCart = cart.map((item) => {
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
