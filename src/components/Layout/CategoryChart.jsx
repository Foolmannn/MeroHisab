import { MdPieChart } from "react-icons/md";

export default function CategoryChart() {
  return (
 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MdPieChart className="w-6 h-6 text-emerald-600" />
       <h3 className="font-bold text-slate-900 dark:text-slate-100">Top Categories</h3>
      </div>

<p className="text-slate-400 dark:text-slate-500">Pie Chart Here</p>
    </div>
  );
}