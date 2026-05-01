import { useState } from "react";
import { 
  MdShoppingBag, MdRestaurant, MdWork, MdRedeem, 
  MdAccountBalanceWallet, MdReceipt, MdHelpOutline, MdDeleteOutline 
} from "react-icons/md";
import { useTransactions } from "../../contexts/TransactionContext";

const getIcon = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("salary") || cat.includes("work")) return MdWork;
  if (cat.includes("grocery") || cat.includes("food")) return MdRestaurant;
  if (cat.includes("shopping")) return MdShoppingBag;
  if (cat.includes("gift")) return MdRedeem;
  if (cat.includes("bill")) return MdReceipt;
  return MdHelpOutline;
};

export default function TransactionsTable() {
  const { transactions, deleteTransaction,currency } = useTransactions();

  const handleDelete = (id, note) => {
    // Simple but effective warning popup
    const confirmDelete = window.confirm(`Are you sure you want to delete "${note || 'this transaction'}"?`);
    if (confirmDelete) {
      deleteTransaction(id);
    }
  };

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8); // Increased to 8 to show more

  return (
    <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
      <h3 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Recent Transactions</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((t) => {
                const isIncome = t.type === "income" || t.type === "borrow";
                return (
                  <Row
                    key={t.id}
                    icon={getIcon(t.category)}
                    title={t.note || t.category}
                    subtitle={t.category}
                    date={t.date}
                    amount={`${isIncome ? "+" : "-"}${currency}${Number(t.amount).toLocaleString()}`}
                    color={isIncome ? "text-green-600" : "text-red-500"}
                    onDelete={() => handleDelete(t.id, t.note)} // Pass delete handler
                  />
                );
              })
            ) : (
              <tr><td className="py-8 text-center text-slate-400">No transactions.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ icon: Icon, title, subtitle, date, amount, color, onDelete }) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition group">
      <td className="py-3 px-2 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </div>
        <div className="min-w-0"> {/* min-w-0 prevents text overflow issues */}
          <p className="font-semibold text-slate-800 dark:text-slate-100 capitalize leading-tight truncate max-w-[120px] md:max-w-full">
            {title}
          </p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
            {subtitle} • {date}
          </p>
        </div>
      </td>

      <td className="text-right py-3 px-2">
        <div className="flex items-center justify-end gap-2 md:gap-5">
          {/* Amount moved left by adding gap/padding */}
          <span className={`font-bold pr-7 text-sm md:text-base whitespace-nowrap ${color}`}>
            {amount}
          </span>
          
        {/* Permanent Delete Button */}
<button 
            onClick={onDelete}
            className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 md:border-transparent"
            aria-label="Delete Transaction"
          >
            <MdDeleteOutline className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}