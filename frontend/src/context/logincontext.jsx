import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}>{children}</LoginContext.Provider>;
};

export const useAuth = () => useContext(LoginContext);
