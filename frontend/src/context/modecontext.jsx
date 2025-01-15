import { createContext, useState, useContext } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const switchModes = () => {
    setIsDark((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  return <ModeContext.Provider value={{ isDark, switchModes }}>{children}</ModeContext.Provider>;
};

export const useMode = () => useContext(ModeContext);
