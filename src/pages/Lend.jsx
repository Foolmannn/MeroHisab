import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; 
import { MdPerson, MdCalendarToday, MdAttachMoney, MdNotes, MdCheckCircle } from "react-icons/md";

export default function LendSection() {
  const { transactions,currency, addTransaction } = useTransactions();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    returnDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount) {
      alert("Please enter a name and amount");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type: "lend",
      amount: Number(form.amount),
      person: form.name,
      date: form.date,
      returnDate: form.returnDate,
      note: form.notes,
      status: "Pending",
    };

    addTransaction(newTransaction);

    setForm({
      name: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      returnDate: "",
      notes: "",
    });
  };

  return (
    <main className="ml-52 pt-17 px-6 pb-6 h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: FORM (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-3 border border-transparent dark:border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                New Lending
              </h2>
            </div>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              {/* AMOUNT */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Amount</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">{currency}</span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* PERSON */}
              <div className="mt-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Lent To</label>
                <div className="relative mt-1">
                  <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DATE */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Date</label>
                  <div className="relative mt-1">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* RETURN DATE */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Return Date</label>
                  <div className="relative mt-1">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input
                      type="date"
                      name="returnDate"
                      value={form.returnDate}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* NOTES */}
              <div className="mt-0">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Why did you lend it?"
                  className="w-full mt-1 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-1">
                <button type="submit" className="flex-1 h-11 bg-emerald-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer">
                  <MdCheckCircle />
                  Save Record
                </button>
                <button type="button" className="px-6 h-11 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition dark:text-white cursor-pointer font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: HISTORY (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-hidden h-full">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border border-transparent dark:border-slate-800 flex flex-col max-h-[80vh]">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">
              Lend History
            </h3>

            <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
              {transactions.filter(t => t.type === "lend").length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm italic">
                  No records yet.
                </div>
              ) : (
                [...transactions]
                  .filter(t => t.type === "lend")
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(t => (
                    <div key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-100 dark:border-slate-800 last:border-none rounded-lg">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.person}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-slate-500 dark:text-slate-400">{t.date}</p>
                          {t.returnDate && (
                            <span className="text-[10px] text-emerald-500 font-medium">Due: {t.returnDate}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-emerald-500">
                        ₹{t.amount.toLocaleString()}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}