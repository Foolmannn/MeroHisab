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
    return localStorage.getItem("app_currency") || "रू";
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
              text: `Reminder: ${t.person}'s ${t.type} of ${currency} ${t.amount} is due today!`,
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


// For recurring expenses

useEffect(() => {
  const checkRecurringExpenses = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let newEntries = [];
    
    // 1. Map through transactions to find recurring templates
    const updatedTransactions = transactions.map(t => {
      if (!t.isRecurring) return t;

      let lastDate = new Date(t.lastProcessed);
      lastDate.setHours(0, 0, 0, 0);

      // 2. While the recurring expense is behind "today", create new ones
      while (today > lastDate) {
        // Increment the date based on frequency (e.g., Daily)
        lastDate.setDate(lastDate.getDate() + 1);

        if (lastDate <= today) {
          newEntries.push({
            ...t,
            id: `auto-${Date.now()}-${Math.random()}`,
            date: lastDate.toISOString().split('T')[0],
            isRecurring: false, // These are the "history" copies, not templates
          });
        }
      }

      // 3. Update the template's lastProcessedDate so we don't double-count tomorrow
      return { ...t, lastProcessedDate: lastDate.toISOString().split('T')[0] };
    });

    if (newEntries.length > 0) {
      setTransactions([...updatedTransactions, ...newEntries]);
    }
  };

  if (transactions.length > 0) {
    checkRecurringExpenses();
  }
}, []); // Runs once when the app is launched

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