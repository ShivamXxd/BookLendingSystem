import { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [foundBook, setFoundBook] = useState("");
  return <BookContext.Provider value={{ books, setBooks, foundBook, setFoundBook }}>{children}</BookContext.Provider>;
};

export const useBooks = () => useContext(BookContext);
