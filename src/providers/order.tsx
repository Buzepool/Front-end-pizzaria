"use client";

import { createContext, ReactNode, useState } from "react";

type OrderContextType = {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
};

type OrderProviderProps = {
  children: React.ReactNode;
};

export const OrderContext = createContext({} as OrderContextType);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onRequestOpen() {
    setIsOpen(true);
  }
  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
