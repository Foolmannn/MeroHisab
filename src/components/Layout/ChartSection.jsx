import { MdShowChart } from "react-icons/md";

export default function ChartSection() {
  return (
   <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MdShowChart className="w-6 h-6 text-emerald-600" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Spending Trends</h3>
      </div>

  <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500">
        Chart Area
      </div>
    </div>
  );
}