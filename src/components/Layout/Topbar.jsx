import { MdSearch,MdLightMode, MdDarkMode, MdNotifications } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import {  MdKeyboardCommandKey, MdMic } from "react-icons/md";
import { useTransactions } from "../../contexts/TransactionContext";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const {user} = useUser()
const { addTransaction, currency } = useTransactions();
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickCommand = (input) => {
    // Expected formats: 
    // e-500-Food-Pizza Party
    // l-1000-Hari-College Fee
    const parts = input.split("-");
    if (parts.length < 3) return; // Need at least type, amount, and (category or person)

    const typeCode = parts[0].toLowerCase().trim();
    const amount = Number(parts[1].trim());
    const detail = parts[2].trim(); // Category for e/i, Person for l/b
    const note = parts[3] ? parts[3].trim() : "";

    if (isNaN(amount)) return;

    // 1. Map Type Code
    const typeMap = {
      e: "expense",
      i: "income",
      l: "lend",
      b: "borrow",
    };
    const type = typeMap[typeCode];
    if (!type) return;

    // 2. Date Logic
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    // Due date (1 week from now) for lend/borrow
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const formattedNextWeek = nextWeek.toISOString().split("T")[0];

    // 3. Create Transaction Object
    const newEntry = {
      id: Date.now().toString(),
      type: type,
      amount: amount,
      date: formattedToday,
      note: note || detail, // Use detail as note if note is empty
      status: "Pending",
    };

    // Add specific fields based on type
    if (type === "lend" || type === "borrow") {
      newEntry.person = detail;
      newEntry.dueDate = formattedNextWeek;
    } else {
      newEntry.category = detail;
    }

    addTransaction(newEntry);

    // Visual Feedback
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCommand("");
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleQuickCommand(command);
    }
  };

return (
    <header className="fixed top-0 right-0 w-[calc(100%-12rem)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-8 py-2">
      
      {/* QUICK COMMAND BAR */}
      <div className={`relative flex items-center gap-3 px-4 py-2 rounded-full w-2/3 transition-all border-2 ${
        isProcessing ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "bg-slate-100 dark:bg-slate-800 border-transparent"
      }`}>
        <MdKeyboardCommandKey className={isProcessing ? "text-emerald-500" : "text-slate-400"} />
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e-500-Food-Pizza  OR  l-1000-Hari-Fee"
          className="bg-transparent outline-none text-sm w-full text-slate-800 dark:text-slate-100 font-mono"
        />
        
        {/* Helper Badge */}
        {!command && (
          <span className="absolute right-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Type-Amt-Name-Note
          </span>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Theme Toggle */}
  <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-full border border-slate-300 dark:border-slate-700">

  {/* Light Mode */}
  <button
    onClick={() => theme !== "light" && toggleTheme()}
    className={`w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer
      ${theme === "light"
        ? "bg-white text-yellow-500 shadow-sm"
        : "text-slate-500 dark:text-slate-400"
      }`}
  >
    <MdLightMode className="w-4 h-4" />
  </button>

  {/* Dark Mode */}
  <button
    onClick={() => theme !== "dark" && toggleTheme()}
    className={`w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer
      ${theme === "dark"
        ? "bg-slate-700 text-emerald-400 shadow-sm"
        : "text-slate-500"
      }`}
  >
    <MdDarkMode className="w-4 h-4" />
  </button>

</div>

        {/* Notifications */}
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
          <MdNotifications className="w-6 h-6 text-slate-600 dark:text-slate-300 cursor-pointer " />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {user?.firstName || "New User"}
            </p>
          </div>
<Link
to="/settings"
>
    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-slate-800 flex items-center justify-center border-2 border-emerald-500/20 hover:border-emerald-500 transition-all overflow-hidden">
               {/* Use placeholder if no image, or user's initials */}
               <span className="text-emerald-600 font-bold">
                 {user?.firstName ? user.firstName[0].toUpperCase() : "?"}
               </span>
            </div>
            </Link>
        </div>

      </div>
    </header>
  );
}