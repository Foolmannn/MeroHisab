import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; 
import { 
  MdPerson, 
  MdCalendarToday, 
  MdAssignmentReturn,
  MdCheckCircle,
  MdRadioButtonUnchecked
} from "react-icons/md";

export default function BorrowSection() {
  const { transactions, addTransaction, updateTransaction, currency } = useTransactions();

  const [form, setForm] = useState({
    borrowedFrom: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.borrowedFrom || !form.amount) {
      alert("Please enter the source and amount");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type: "borrow",
      amount: Number(form.amount),
      person: form.borrowedFrom,
      date: form.date,
      dueDate: form.dueDate,
      note: form.notes,
      status: "Pending", 
    };

    addTransaction(newTransaction);
    setForm({ borrowedFrom: "", amount: "", date: new Date().toISOString().split("T")[0], dueDate: "", notes: "" });
  };

  // Logic updated to "Paid"
  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Paid" : "Pending";
    updateTransaction(id, { status: newStatus });
  };

  return (
<main className="lg:ml-52 pt-20 lg:pt-23 px-4 md:px-6 pb-6 h-screen overflow-y-auto  bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: FORM */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-3 border border-transparent dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">New Borrowing</h2>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              {/* AMOUNT */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">AMOUNT</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">{currency}</span>
                  <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="0.00" className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-red-500 outline-none text-lg font-semibold text-slate-800 dark:text-white" />
                </div>
              </div>

              {/* BORROWED FROM */}
              <div className="mt-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold ">BORROWED FROM</label>
                <div className="relative mt-1">
                  <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                  <input type="text" name="borrowedFrom" value={form.borrowedFrom} onChange={handleChange} placeholder="Name" className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">DATE</label>
                  <div className="relative">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                    <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white" />
                  </div>
                </div>
                <div>
                   <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">DUE DATE</label>
                   <div className="relative">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                    <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="mt-0">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">NOTES</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows="3" placeholder="Why borrow?" className="w-full mt-1 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white" />
              </div>

              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 h-11 bg-red-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition shadow-lg cursor-pointer">
                  <MdAssignmentReturn /> Save Borrow
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: HISTORY */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-hidden h-full">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border border-transparent dark:border-slate-800 flex flex-col max-h-[80vh]">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Borrow History</h3>

            <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
              {[...transactions]
                .filter(t => t.type === "borrow")
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(t => (
                  <BorrowItem
                    key={t.id}
                    t={t}
                    currency={currency}
                    onToggle={() => handleToggleStatus(t.id, t.status)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function BorrowItem({ t, currency, onToggle }) {
  const isPaid = t.status === "Paid";

  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-100 dark:border-slate-800 rounded-lg">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggle}
          className={`text-2xl transition-colors ${isPaid ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`}
        >
          {isPaid ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
        </button>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.person}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.date}</p>
            {t.dueDate && (
              <span className={`text-[10px] font-medium ${isPaid ? "text-slate-400 line-through" : "text-red-500"}`}>
                Due: {t.dueDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className={`text-sm font-semibold ${isPaid ? "text-slate-400" : "text-red-500"}`}>
          {currency}{t.amount.toLocaleString()}
        </div>
        <span className={`text-[9px] uppercase font-bold ${isPaid ? "text-emerald-500" : "text-orange-500"}`}>
          {t.status || "Pending"}
        </span>
      </div>
    </div>
  );
}