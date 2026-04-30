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

  // UPDATE FUNCTION (New)
  const updateTransaction = (id, updatedFields) => {
    const updated = transactions.map((t) =>
      t.id === id ? { ...t, ...updatedFields } : t
    );
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  // DELETE FUNCTION
  const deleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  // Currency state
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("app_currency") || "₹";
  });

  const updateCurrency = (symbol) => {
    setCurrency(symbol);
    localStorage.setItem("app_currency", symbol);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction, // Exporting the new function
        currency,
        setTransactions,
        updateCurrency,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);