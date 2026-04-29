import React, { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load from localstorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  // ADD FUNCTION
  const addTransaction = (newTransaction) => {
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  // DELETE FUNCTION
  const deleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };
  // New state for currency - defaults to ₹
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("app_currency") || "₹";
  });

  const updateCurrency = (symbol) => {
    setCurrency(symbol);
    localStorage.setItem("app_currency", symbol);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction,currency, 
      updateCurrency, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);