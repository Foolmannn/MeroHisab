import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; // Adjust path as needed
import { MdPerson, MdCalendarToday, MdAttachMoney, MdNotes, MdCheckCircle } from "react-icons/md";

export default function LendSection() {
  const { transactions, addTransaction } = useTransactions();

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
      type: "lend", // Tagging as lend for filtering
      amount: Number(form.amount),
      person: form.name,
      date: form.date,
      returnDate: form.returnDate,
      note: form.notes,
      status: "Pending", // Default status for lending
    };

    addTransaction(newTransaction);

    // Reset Form
    setForm({
      name: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      returnDate: "",
      notes: "",
    });
  };

  return (
    <main className="ml-52 pt-20 px-6 pb-6 h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col h-full gap-6">
        
        {/* HEADER */}
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Lent Money</h2>
          <p className="text-sm text-slate-500">Track money you have lent to others</p>
        </div>

        {/* SIDE-BY-SIDE CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0 ">
          
          {/* LEFT: FORM (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col">
            <h3 className="font-semibold mb-4 dark:text-white">New Lend Record</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1">
              <Input 
                label="Lent To" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                icon={<MdPerson />} 
                placeholder="Person's name" 
              />
              <Input 
                label="Amount" 
                name="amount" 
                value={form.amount} 
                onChange={handleChange} 
                icon={<MdAttachMoney />} 
                type="number" 
                placeholder="0.00"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input 
                  label="Date" 
                  name="date" 
                  value={form.date} 
                  onChange={handleChange} 
                  icon={<MdCalendarToday />} 
                  type="date" 
                />
                <Input 
                  label="Return Date" 
                  name="returnDate" 
                  value={form.returnDate} 
                  onChange={handleChange} 
                  icon={<MdCalendarToday />} 
                  type="date" 
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">NOTES</label>
                <div className="relative mt-1">
                  <MdNotes className="absolute left-3 top-3 text-emerald-500" />
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-200 outline-none focus:ring-2 ring-emerald-500/20"
                    rows="3"
                    placeholder="Why did you lend it?"
                  />
                </div>
              </div>

              <button type="submit" className="w-full h-12 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                <MdCheckCircle className="text-xl" />
                Save Transaction
              </button>
            </form>
          </div>

          {/* RIGHT: HISTORY (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold dark:text-white">Recent Lend History</h3>
              <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
                Pending Returns
              </span>
            </div>

            {/* SCROLLABLE LIST */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {transactions.filter(t => t.type === "lend").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <p>No lending history found.</p>
                </div>
              ) : (
                transactions
                  .filter(t => t.type === "lend")
                  .map((t) => (
                    <LendItem key={t.id} transaction={t} />
                  ))
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 text-lg">
          {icon}
        </span>
        <input
          {...props}
          className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-100 outline-none focus:ring-2 ring-emerald-500/20 transition-all border border-transparent focus:border-emerald-500/50"
        />
      </div>
    </div>
  );
}

function LendItem({ transaction }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all group">
      <div className="flex flex-col">
        <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
          {transaction.person}
        </p>
        <div className="flex gap-3 items-center">
          <p className="text-xs text-slate-500">{transaction.date}</p>
          {transaction.returnDate && (
            <p className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
              Due: {transaction.returnDate}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-emerald-500 text-lg">₹{transaction.amount.toLocaleString()}</p>
        <p className="text-[10px] text-slate-400 uppercase tracking-wider">{transaction.status}</p>
      </div>
    </div>
  );
}