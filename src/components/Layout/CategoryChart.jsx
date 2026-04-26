import { MdPieChart } from "react-icons/md";

export default function CategoryChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center gap-2 mb-4">
        <MdPieChart className="w-6 h-6 text-emerald-600" />
        <h3 className="font-bold">Top Categories</h3>
      </div>

      <p className="text-slate-400">Pie Chart Here</p>
    </div>
  );
}