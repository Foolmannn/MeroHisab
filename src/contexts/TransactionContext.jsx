import { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  // Use Lazy Initialization to load data immediately
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

// Custom hook for easy access
export const useTransactions = () => useContext(TransactionContext);