import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import {
  MdCategory,
  MdCalendarToday,
  MdSync,
  MdCheckCircle,
} from "react-icons/md";

export default function AddExpense() {
  // 1. Grab addTransaction instead of setTransactions
  const { transactions, currency, addTransaction } = useTransactions();

  const [form, setForm] = useState({
    expenseAmount: "",
    expenseCategory: "",
    expenseDate: new Date().toISOString().split("T")[0],
    expenseNote: "",
    isRecurring: false,
    frequency: "daily",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.expenseAmount || !form.expenseCategory) {
      alert("Fill required fields");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type: "expense",
      amount: Number(form.expenseAmount),
      category: form.expenseCategory,
      date: form.expenseDate,
      note: form.expenseNote,
      person: null,
      isRecurring: form.isRecurring, // State from your checkbox
      frequency: "daily", // You can add a select dropdown for this
      lastProcessed: form.expenseDate,
    };

    // 2. Use the central addTransaction function
    // This handles both state update AND LocalStorage saving
    addTransaction(newTransaction);

    // setForm({
    //   expenseAmount: "",
    //   expenseCategory: "",
    //   expenseDate: new Date().toISOString().split("T")[0],
    //   expenseNote: ""
    // });
  };

  return (
    <main className="ml-52 pt-17 px-6 pb-6 h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDE: FORM */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4 ">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                New Expense
              </h2>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* AMOUNT */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  AMOUNT
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                    {currency}
                  </span>
                  <input
                    type="number"
                    name="expenseAmount"
                    value={form.expenseAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* CATEGORY + DATE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    CATEGORY
                  </label>
                  <div className="relative mt-1">
                    <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <select
                      name="expenseCategory"
                      value={form.expenseCategory}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Shopping</option>
                      <option>Health</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    DATE
                  </label>
                  <div className="relative mt-1">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input
                      type="date"
                      name="expenseDate"
                      value={form.expenseDate}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* NOTES */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  NOTES
                </label>
                <textarea
                  name="expenseNote"
                  value={form.expenseNote}
                  onChange={handleChange}
                  rows="2"
                  placeholder="What was this for?"
                  className="w-full mt-1 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                />
              </div>
{/* RECURRING SECTION */}
<div className="relative p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
  <div className="flex justify-between items-center">
    <div className="flex gap-3 items-center">
      <MdSync className="text-emerald-500 w-5 h-5" />
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          Recurring
        </p>
        <p className="text-xs text-slate-500">Repeat {form.frequency}</p>
      </div>
    </div>
    <input
      type="checkbox"
      name="isRecurring"
      checked={form.isRecurring}
      onChange={(e) => setForm({ ...form, isRecurring: e.target.checked })}
      className="cursor-pointer w-5 h-5 accent-emerald-500"
    />
  </div>

  {/* UPWARD OPENING SELECT */}
  {form.isRecurring && (
    <div className="absolute bottom-full left-0 w-full mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 shadow-xl rounded-lg p-2">
        <label className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase px-2">
          Select Frequency
        </label>
        <select
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
          className="w-full mt-1 h-10 px-2 bg-slate-50 dark:bg-slate-900 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="daily">Daily (Every Day)</option>
          <option value="weekly">Weekly (Every Week)</option>
          <option value="monthly">Monthly (Every Month)</option>
        </select>
      </div>
      {/* Tiny Arrow pointing down to the recurring box */}
      <div className="w-3 h-3 bg-white dark:bg-slate-800 border-r border-b border-emerald-200 dark:border-slate-700 rotate-45 mx-auto -mt-1.5 shadow-sm"></div>
    </div>
  )}
</div>


              {/* BUTTONS */}
              <div className="flex gap-3 mt-1">
                <button
                  type="submit"
                  className="flex-1 h-11 bg-emerald-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition active:scale-95"
                >
                  <MdCheckCircle />
                  Save
                </button>
                <button
                  type="button"
                  className="px-6 h-11 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: RECENT HISTORY */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">
              Recent Expenses
            </h3>

            <div className="flex flex-col gap-1">
              {[...transactions] // Spread to avoid mutating original state before sort
                .filter((t) => t.type === "expense")
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
                .slice(0, 5) // Show top 5
                .map((t) => (
                  <TransactionItem
                    key={t.id}
                    title={t.category}
                    amount={`- $${t.amount}`}
                    date={t.date}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TransactionItem({ title, amount, positive, date }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-100 dark:border-slate-800 last:border-none rounded-lg">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{date}</p>
      </div>
      <div
        className={`text-sm font-semibold ${positive ? "text-emerald-500" : "text-red-500"}`}
      >
        {amount}
      </div>
    </div>
  );
}
