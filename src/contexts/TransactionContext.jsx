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
  //Notifications
  const [notifications, setNotifications] = useState([]);

const addNotification = (text, type = "info") => {
  const newNotif = {
    id: Date.now(),
    text,
    type,
    time: "Just now",
    read: false
  };
  setNotifications(prev => [newNotif, ...prev]);
};

// Automatic Smart Scanner
useEffect(() => {
  const scanner = () => {
    const today = new Date().toISOString().split("T")[0];
    
    // Clear old automated alerts to prevent duplicates before re-scanning
    // (Optional: depends on if you want alerts to persist)
    
    transactions.forEach(t => {
      // THE FIX: Check if status is "Pending" 
      // If it is "Paid" or "Settled", this condition will be false
      const isPendingDebt = (t.type === 'lend' || t.type === 'borrow') && t.status === "Pending";
      
      if (isPendingDebt) {
        // Only alert if it's due today
        if (t.dueDate === today) {
          // Check if we've already notified for this specific transaction ID
          // to avoid spamming the notification list
          setNotifications(prev => {
            const alreadyNotified = prev.find(n => n.txnId === t.id);
            if (alreadyNotified) return prev;

            return [{
              id: Date.now() + t.id,
              txnId: t.id, // Store the txnId so we can track it
              text: `Reminder: ${t.person}'s ${t.type} is due today!`,
              type: "warning",
              time: "Just now",
              read: false
            }, ...prev];
          });
        }
      }
    });
  };

  scanner();
}, [transactions]); // Re-runs whenever any transaction is updated (including status changes)

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
        notifications, setNotifications
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);