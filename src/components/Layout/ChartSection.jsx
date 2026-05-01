
import { useState } from "react";
import { useTransactions } from "../../contexts/TransactionContext";
import { MdShowChart, MdExpandMore } from "react-icons/md";
import MainChart from "../Charts/MainChart"; 

export default function ChartSection() {
  const { transactions, currency } = useTransactions();
  const [days, setDays] = useState(7); // Default to 7 days

  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Spending Trends</h3>
          <p className="text-sm text-slate-500">Daily transaction analysis</p>
        </div>

        {/* TOP RIGHT SELECTION */}
        <div className="relative inline-block">
          <select 
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 pl-4 pr-10 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 3 Months</option>
          </select>
          <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="h-72 w-full">
        {transactions?.length > 0 ? (
          <MainChart data={transactions} days={days} />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 italic">
            No data for the selected period
          </div>
        )}
      </div>
    </div>
  );
}