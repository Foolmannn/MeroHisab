import { useState } from "react";
import {
  MdCategory,
  MdCalendarToday,
  MdSync,
  MdCheckCircle,
} from "react-icons/md";

export default function AddTransaction() {
  const [type, setType] = useState("expense");

  return (
    <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                New Transaction
              </h2>

              {/* Toggle Expense / Income */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setType("expense")}
                  className={`px-4 py-1.5 text-sm rounded-md transition ${
                    type === "expense"
                      ? "bg-white dark:bg-slate-700 text-emerald-600 shadow"
                      : "text-slate-500"
                  }`}
                >
                  Expense
                </button>

                <button
                  onClick={() => setType("income")}
                  className={`px-4 py-1.5 text-sm rounded-md transition ${
                    type === "income"
                      ? "bg-white dark:bg-slate-700 text-emerald-600 shadow"
                      : "text-slate-500"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            {/* FORM */}
            <form className="flex flex-col gap-5">

              {/* AMOUNT */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  AMOUNT
                </label>

                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                    $
                  </span>

                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full h-14 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* CATEGORY + DATE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* CATEGORY */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    CATEGORY
                  </label>

                  <div className="relative mt-1">
                    <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />

                    <select className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white">
                      <option>Select Category</option>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Shopping</option>
                    </select>
                  </div>
                </div>

                {/* DATE */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    DATE
                  </label>

                  <div className="relative mt-1">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />

                    <input
                      type="date"
                      className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
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
                  rows="3"
                  placeholder="What was this for?"
                  className="w-full mt-1 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                />
              </div>

              {/* RECURRING */}
              <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">

                <div className="flex gap-3 items-center">
                  <MdSync className="text-emerald-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      Recurring
                    </p>
                    <p className="text-xs text-slate-500">
                      Repeat daily
                    </p>
                  </div>
                </div>

                <input type="checkbox" />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-2">
                <button className="flex-1 h-12 bg-emerald-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition">
                  <MdCheckCircle />
                  Save
                </button>

                <button className="px-6 h-12 bg-slate-200 dark:bg-slate-700 rounded-full">
                  Cancel
                </button>
              </div>

            </form>
          </div>

          {/* QUICK CATEGORY */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Quick Categories
            </h3>

            <div className="flex flex-wrap gap-2">
              {["Food", "Travel", "Shopping", "Health"].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* RECENT */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">
              Recent History
            </h3>

            <div className="flex flex-col gap-3">
              <TransactionItem title="Starbucks" amount="-$4.50" />
              <TransactionItem title="Uber Ride" amount="-$18.25" />
              <TransactionItem title="Salary" amount="+$2450" positive />
            </div>
          </div>

          {/* NOTES */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-bold mb-3 text-slate-800 dark:text-white">
              Quick Notes
            </h3>

            <textarea
              placeholder="Write something..."
              className="w-full h-32 p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
            />
          </div>

        </div>
      </div>
    </main>
  );
}

function TransactionItem({ title, amount, positive }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
      <p className="text-sm text-slate-700 dark:text-slate-200">{title}</p>

      <p className={`font-semibold ${positive ? "text-green-500" : "text-red-500"}`}>
        {amount}
      </p>
    </div>
  );
}