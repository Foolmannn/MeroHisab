import React from "react";
import { useTransactions } from "../../contexts/TransactionContext";
import { Link } from "react-router-dom"; // Add this import

import { 
  MdTrendingUp, 
  MdTrendingDown, 
  MdRequestQuote, 
  MdVolunteerActivism, 
  MdAccountBalanceWallet ,
  MdAdd, MdArrowForward
} from "react-icons/md";

export default function SummaryCards() {
  const { transactions, currency } = useTransactions();

  const calculateData = () => {
    const data = transactions || [];

    // 1. Income: Regular income + Lent money that has been Settled
    const income = data
      .filter(t => t.type === "income" || (t.type === "lend" && t.status === "Settled"))
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    // 2. Expense: Regular expenses + Borrowed money that has been Paid
    const expense = data
      .filter(t => t.type === "expense" || (t.type === "borrow" && t.status === "Paid"))
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    // 3. Borrowed (Pending): Only money you still owe
    const borrowed = data
      .filter(t => t.type === "borrow" && t.status === "Pending")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    // 4. Lent (Pending): Only money people still owe you
    const lent = data
      .filter(t => t.type === "lend" && t.status === "Pending")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return {
      income,
      expense,
      borrowed,
      lent,
      balance: income - expense
    };
  };

  const stats = calculateData();

return (
    /* 
       The container remains grid-cols-2 for mobile.
       On desktop (lg), it switches to grid-cols-5.
    */
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
      
      {/* 
          TOTAL BALANCE: 
          - col-span-2: Takes full width on mobile.
          - lg:col-span-1: Takes only 1/5th width on desktop.
      */}
      <div className="col-span-2 lg:col-span-1">
        <Card 
          title="Total Balance" 
          value={`${currency}${stats.balance.toLocaleString()}`} 
          icon={MdAccountBalanceWallet}
          variant="balance" 
        />
      </div>

      {/* The rest of the cards stay as col-span-1 by default */}
      <Card 
        title="Real Income" 
        value={`${currency}${stats.income.toLocaleString()}`} 
        icon={MdTrendingUp} 
        variant="income"
      />
      <Card 
        title="Real Expenses" 
        value={`${currency}${stats.expense.toLocaleString()}`} 
        icon={MdTrendingDown} 
        variant="expense"
      />
      <Card 
        title="To Pay (Debt)" 
        value={`${currency}${stats.borrowed.toLocaleString()}`} 
        icon={MdRequestQuote} 
        variant="borrow"
      />
      <Card 
        title="To Get (Lent)" 
        value={`${currency}${stats.lent.toLocaleString()}`} 
        icon={MdVolunteerActivism} 
        variant="lend"
      />
    </div>
  );
}


function Card({ title, value, icon: Icon, variant }) {
  const iconColors = {
    income: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
    expense: "text-red-500 bg-red-50 dark:bg-red-900/20",
    balance: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    borrow: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
    lend: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
    default: "text-slate-500 bg-slate-50 dark:bg-slate-800"
  };

  const activeColor = iconColors[variant] || iconColors.default;
  const isBalance = variant === "balance";

  // FIXED: Explicit mapping for each variant
  const getLinkPath = () => {
    const paths = {
      balance: "/reports",
      income: "/add-income",
      expense: "/add-expense",
      borrow: "/add-borrow",
      lend: "/add-lend"
    };
    return paths[variant] || "/dashboard";
  };

  return (
    <div className={`
      relative group border rounded-xl p-4 shadow-sm flex flex-col gap-1 transition-all
      ${isBalance 
        ? "bg-blue-600 dark:bg-blue-600 border-blue-500 text-white" 
        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"}
    `}>
      
      {/* QUICK ACCESS LINK */}
<Link 
        to={getLinkPath()}
        className={`
          absolute bottom-3 right-3 flex items-center gap-1.5 transition-all z-10
          /* For Balance: Show as a pill with text. For others: Show as a circle icon */
          ${isBalance 
            ? "px-3 py-1 bg-white/20 hover:bg-white/40 text-white rounded-full text-[10px] font-bold uppercase tracking-tight" 
            : "p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white rounded-full lg:opacity-0 lg:group-hover:opacity-100"}
        `}
      >
        {isBalance ? (
          <>
            <span>See Report</span>
            <MdArrowForward size={14} />
          </>
        ) : (
          <MdAdd size={18} />
        )}
      </Link>
      <div className="flex items-center justify-between">
        <p className={`text-[10px] font-bold uppercase tracking-wider ${isBalance ? "text-blue-100" : "text-slate-500"}`}>
          {title}
        </p>
        <div className={`p-1.5 rounded-lg ${isBalance ? "bg-white/20 text-white" : activeColor}`}>
          {Icon && <Icon size={isBalance ? 22 : 18} />}
        </div>
      </div>
      
      <h2 className={`font-bold truncate pr-8 ${isBalance ? "text-2xl md:text-3xl text-white" : "text-lg md:text-2xl text-slate-900 dark:text-slate-100"}`}>
        {value}
      </h2>
    </div>
  );
}