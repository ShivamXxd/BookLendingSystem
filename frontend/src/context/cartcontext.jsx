import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartAddedBooks, setCartAddedBooks] = useState([]);
  const [cartBooksWithPrice, setCartBooksWithPrice] = useState([]);

  const increaseCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const decreaseCartCount = () => {
    setCartCount((prevCount) => prevCount - 1);
  };

  return <CartContext.Provider value={{ cartCount, increaseCartCount, decreaseCartCount, cartAddedBooks, setCartAddedBooks, cartBooksWithPrice, setCartBooksWithPrice }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
