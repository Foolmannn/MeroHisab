import React from "react";
import { useTransactions } from "../../contexts/TransactionContext";
import { 
  MdTrendingUp, 
  MdTrendingDown, 
  MdRequestQuote, 
  MdVolunteerActivism, 
  MdAccountBalanceWallet 
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card 
        title="Total Balance" 
        value={`${currency}${stats.balance.toLocaleString()}`} 
        icon={MdAccountBalanceWallet}
        variant="balance" 
      />
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

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <div className={`p-1.5 rounded-lg ${activeColor}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </h2>
    </div>
  );
}