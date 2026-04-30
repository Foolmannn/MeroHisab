import {
  MdTrendingUp,
  MdTrendingDown,
  MdFileDownload,
  MdAnalytics,
} from "react-icons/md";
import { useState } from "react";

export default function ReportsSection() {
    const [range, setRange] = useState("monthly");
  return (
    <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:text-slate-400 dark:bg-slate-950 transition-colors">

      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Financial Reports
            </h2>
            <p className="text-sm text-slate-500">
              Overview of your income and expenses
            </p>
          </div>

          {/* FILTER */}
{/* FILTER */}
<div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
  
  <button
    onClick={() => setRange("monthly")}
    className={`px-4 py-1.5 text-sm rounded-md transition cursor-pointer ${
      range === "monthly"
        ? "bg-white dark:bg-slate-700 shadow text-emerald-600"
        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`}
  >
    Monthly
  </button>

  <button
    onClick={() => setRange("quarterly")}
    className={`px-4 py-1.5 text-sm rounded-md transition cursor-pointer ${
      range === "quarterly"
        ? "bg-white dark:bg-slate-700 shadow text-emerald-600"
        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`}
  >
    Quarterly
  </button>

  <button
    onClick={() => setRange("yearly")}
    className={`px-4 py-1.5 text-sm rounded-md transition cursor-pointer ${
      range === "yearly"
        ? "bg-white dark:bg-slate-700 shadow text-emerald-600"
        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`}
  >
    Yearly
  </button>

</div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card
            icon={<MdTrendingUp className="text-emerald-500" />}
            title="Total Savings"
            value="रू 45,280"
            change="+12.5%"
            positive
          />

          <Card
            icon={<MdTrendingDown className="text-red-500" />}
            title="Total Expenses"
            value="रू 28,450"
            change="-2.1%"
            positive={false}
          />

          <Card
            icon={<MdAnalytics className="text-blue-500" />}
            title="Net Balance"
            value="रू 16,830"
            change="+8.3%"
            positive
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* CHART */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">
                Cash Flow
              </h3>

              {/* <button className="flex items-center gap-2 text-emerald-500 text-sm">
                <MdFileDownload />
                Export
              </button> */}
            </div>

            {/* MOCK CHART */}
            <div className="flex items-end gap-2 h-56">
              {[60, 80, 40, 70, 90, 50].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 items-end h-full">
                    <div
                      className="w-1/2 bg-emerald-400 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                    <div
                      className="w-1/2 bg-slate-300 dark:bg-slate-700 rounded-t"
                      style={{ height: `${h - 20}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">M{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY BREAKDOWN */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">
              Categories
            </h3>

            <div className="flex flex-col gap-4">

              <Progress label="Food" value={35} />
              <Progress label="Transport" value={20} />
              <Progress label="Entertainment" value={15} />
              <Progress label="Bills" value={30} />

            </div>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">
                Large Transactions
              </h3>

              <button className="text-emerald-500 text-sm flex items-center gap-1 cursor-pointer ">
                <MdFileDownload />
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-500 dark:text-slate-300 text-xs">
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-right py-2">Status</th>
                  </tr>
                </thead>

                <tbody className="dark:text-slate-400">
                  <Row date="Mar 12" desc="Rent" amount="-12500" status="Cleared" />
                  <Row date="Mar 08" desc="Groceries" amount="-4230" status="Cleared" />
                  <Row date="Mar 02" desc="Internet" amount="-1850" status="Pending" />
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

/* ---------- CARD ---------- */
function Card({ icon, title, value, change, positive }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-5 flex justify-between items-start">
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          {value}
        </h3>
      </div>

      <div className="text-right flex flex-col items-end gap-2">
        {icon}
        <span
          className={`text-xs font-semibold ${
            positive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

/* ---------- PROGRESS ---------- */
function Progress({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ---------- TABLE ROW ---------- */
function Row({ date, desc, amount, status }) {
  const isNegative = amount < 0;

  return (
    <tr className="border-b last:border-none">
      <td className="py-3 text-slate-500">{date}</td>
      <td className="py-3">{desc}</td>

      <td
        className={`py-3 text-right font-semibold ${
          isNegative ? "text-red-500" : "text-emerald-500"
        }`}
      >
        {amount}
      </td>

      <td className="py-3 text-right text-xs">
        <span
          className={`px-2 py-1 rounded-full ${
            status === "Cleared"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}