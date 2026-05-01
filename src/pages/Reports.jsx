import {
  MdTrendingUp,
  MdTrendingDown,
  MdFileDownload,
  MdAnalytics,
} from "react-icons/md";
import { useState, useMemo } from "react";
import { useTransactions } from "../contexts/TransactionContext";

export default function ReportsSection() {
  const { transactions, currency } = useTransactions();
  const [range, setRange] = useState("monthly");

  // --- DATA FILTERING LOGIC ---
  const reportData = useMemo(() => {
    const now = new Date();
    return transactions.filter((t) => {
      const tDate = new Date(t.date);
      if (range === "monthly") {
        return (
          tDate.getMonth() === now.getMonth() &&
          tDate.getFullYear() === now.getFullYear()
        );
      }
      if (range === "quarterly") {
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const tQuarter = Math.floor(tDate.getMonth() / 3);
        return (
          currentQuarter === tQuarter &&
          tDate.getFullYear() === now.getFullYear()
        );
      }
      if (range === "yearly") {
        return tDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [transactions, range]);

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    const income = reportData
      .filter(
        (t) =>
          t.type === "income" || (t.type === "lend" && t.status === "Settled"),
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = reportData
      .filter(
        (t) =>
          t.type === "expense" || (t.type === "borrow" && t.status === "Paid"),
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      income,
      expenses,
      net: income - expenses,
    };
  }, [reportData]);

  // --- EXPORT CSV FUNCTION ---
  const exportToCSV = () => {
    if (reportData.length === 0) return alert("No data to export");

    const headers = ["Date,Description,Amount,Type,Status\n"];
    const rows = reportData.map(
      (t) =>
        `${t.date},${t.person || t.note || "N/A"},${t.amount},${t.type},${t.status}`,
    );

    const blob = new Blob([headers + rows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MeroHisab_Report_${range}.csv`;
    a.click();
  };

  return (
    <main className="lg:ml-52 pt-20 lg:pt-17 px-4 md:px-6 pb-6 h-screen overflow-y-auto lg:overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Financial Reports
            </h2>
            <p className="text-sm text-slate-500">
              Overview for current {range} period
            </p>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
            {["monthly", "quarterly", "yearly"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-1.5 text-sm rounded-md capitalize transition cursor-pointer ${
                  range === r
                    ? "bg-white dark:bg-slate-700 shadow text-emerald-600 font-bold"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            icon={<MdTrendingUp className="text-emerald-500" />}
            title={`Total Savings (${range})`}
            value={`${currency}${stats.income.toLocaleString()}`}
            positive
          />
          <Card
            icon={<MdTrendingDown className="text-red-500" />}
            title="Total Expenses"
            value={`${currency}${stats.expenses.toLocaleString()}`}
            positive={false}
          />
          <Card
            icon={<MdAnalytics className="text-blue-500" />}
            title="Net Balance"
            value={`${currency}${stats.net.toLocaleString()}`}
            positive={stats.net >= 0}
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* BAR CHART */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">
                Cash Flow Analysis
              </h3>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 text-emerald-500 text-sm cursor-pointer hover:underline"
              >
                <MdFileDownload /> Export CSV
              </button>
            </div>
            <div className="flex items-end gap-2 h-56 border-b border-slate-100 dark:border-slate-800 pb-2">
              {/* graph that scales based on data  */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-12 bg-emerald-400 rounded-t transition-all"
                  style={{
                    height: `${(stats.income / (stats.income + stats.expenses || 1)) * 100}%`,
                  }}
                />
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  In
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-12 bg-red-400 rounded-t transition-all"
                  style={{
                    height: `${(stats.expenses / (stats.income + stats.expenses || 1)) * 100}%`,
                  }}
                />
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Out
                </span>
              </div>
            </div>
          </div>

          {/* RECENT SETTLED DEBTS */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">
              Settlement Status
            </h3>
            <div className="flex flex-col gap-4">
              <Progress
                label="Lent Collected"
                value={Math.round(
                  (reportData.filter(
                    (t) => t.type === "income" && t.originalType === "lend",
                  ).length /
                    reportData.filter(
                      (t) => t.type === "lend" || t.originalType === "lend",
                    ).length || 0) * 100,
                )}
              />
              <Progress
                label="Borrow Paid"
                value={Math.round(
                  (reportData.filter(
                    (t) => t.type === "expense" && t.originalType === "borrow",
                  ).length /
                    reportData.filter(
                      (t) => t.type === "borrow" || t.originalType === "borrow",
                    ).length || 0) * 100,
                )}
              />
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
              Transaction Details
            </h3>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-500 dark:text-slate-300 text-xs sticky top-0 bg-white dark:bg-slate-900">
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Source/Person</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-right py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="dark:text-slate-400">
                  {reportData
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((t) => (
                      <Row
                        key={t.id}
                        date={t.date}
                        desc={t.person || t.note || "General"}
                        amount={t.amount}
                        status={t.status || "Completed"}
                        currency={currency}
                        type={t.type}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ icon, title, value, positive }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-5 flex justify-between items-start">
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
          {title}
        </p>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          {value}
        </h3>
      </div>
      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{icon}</div>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-slate-600 dark:text-slate-400">
          {label}
        </span>
        <span className="text-emerald-500 font-bold">{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Row({ date, desc, amount, status, currency, type }) {
  const isExpense = type === "expense" || type === "borrow";

  return (
    <tr className="border-b dark:border-slate-800 last:border-none">
      <td className="py-3 text-slate-500 text-xs">{date}</td>
      <td className="py-3 font-medium">{desc}</td>
      <td
        className={`py-3 text-right font-bold ${isExpense ? "text-red-500" : "text-emerald-500"}`}
      >
        {isExpense ? "-" : "+"}
        {currency}
        {Number(amount).toLocaleString()}
      </td>
      <td className="py-3 text-right text-[10px] font-bold uppercase">
        <span
          className={`px-2 py-1 rounded-full ${status === "Settled" || status === "Paid" || status === "Completed" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
