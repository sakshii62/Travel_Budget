import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <UIContext.Provider value={{ menuOpen, toggleMenu, closeMenu }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}