import { useTransactions } from "../../contexts/TransactionContext";
import CategoryPieChart from "../Charts/CategoryPieChart";

export default function CategoryChart() {
  const { transactions,currency } = useTransactions();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
        Top Categories
      </h3>
      <p className="text-xs text-slate-500 mb-6">Spending distribution</p>
      
      {transactions?.length > 0 ? (
        <CategoryPieChart data={transactions} currency={currency} />
      ) : (
        <div className="h-64 flex items-center justify-center text-slate-400 italic text-sm">
          No expenses recorded
        </div>
      )}
    </div>
  );
}