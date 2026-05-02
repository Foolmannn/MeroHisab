import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; 

export default function AddIncome() {
  // 1. Destructure addTransaction instead of setTransactions
  const { transactions, addTransaction,currency } = useTransactions();

  const [form, setForm] = useState({
    amount: "",
    category: "Salary",
    date: new Date().toISOString().split("T")[0],
    note: "",
    person: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount) {
      alert("Amount is required");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type: "income", // Crucial for filtering
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note,
      person: form.person || null,
    };

    // 2. Use the centralized function to save and update state
    addTransaction(newTransaction);

    // Reset Form
    setForm({
      amount: "",
      category: "Salary",
      date: new Date().toISOString().split("T")[0],
      note: "",
      person: "",
    });
  };

  return (
<main className="lg:ml-52 pt-20 lg:pt-23 px-4 md:px-6 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          
          {/* FORM SECTION */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-md dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Add Income
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* AMOUNT */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    AMOUNT
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 text-xl font-bold">
                    {currency}
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-xl font-semibold
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition dark:text-slate-300 "
                    />
                  </div>
                </div>

                {/* CATEGORY + DATE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      CATEGORY
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition dark:text-slate-300 "
                    >
                      <option>Salary</option>
                      <option>Freelance</option>
                      <option>Gift</option>
                      <option>Investments</option>
                      <option>Refund</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      DATE
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition dark:text-slate-300 "
                    />
                  </div>
                </div>

                {/* NOTES */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 ">
                    NOTES (OPTIONAL)
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe where this income came from..."
                    className="w-full p-4 rounded-lg bg-slate-100 dark:bg-slate-800
                    border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition dark:text-slate-300"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col md:flex-row gap-4 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-full
                    transition active:scale-95"
                  >
                    Confirm Income
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-800
                    text-slate-700 dark:text-slate-300 font-semibold hover:opacity-80 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>

         {/* SIDE CARD: RECENT INCOMES */}
<div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-md dark:shadow-none overflow-hidden">
  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
      Recent Incomes
    </h3>
    {/* Optional: Add a count to help mobile users */}
    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
      Last 5
    </span>
  </div>

  {/* FIXED: Add max-h and overflow-y-auto here instead of the parent */}
  <div className="flex flex-col max-h-[400px] overflow-y-auto scrollbar-hide">
    {transactions.filter((t) => t.type === "income").length > 0 ? (
      [...transactions]
        .filter((t) => t.type === "income")
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map((t) => (
          <TransactionItem
            key={t.id}
            title={t.category}
            amount={`+ ${currency}${t.amount.toLocaleString()}`}
            positive
            date={t.date}
          />
        ))
    ) : (
      <div className="p-8 text-center text-sm text-slate-400">
        No income records found.
      </div>
    )}
  </div>
</div>
        </div>
      </div>
    </main>
  );
}

function TransactionItem({ title, amount, positive, date }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition border-b border-slate-100 dark:border-slate-800 last:border-none">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {date}
        </p>
      </div>
      <div className={`text-sm font-semibold ${positive ? "text-emerald-500" : "text-red-500"}`}>
        {amount}
      </div>
    </div>
  );
}