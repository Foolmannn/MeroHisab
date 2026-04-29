import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; 
import { 
  MdPerson, 
  MdCalendarToday, 
  MdAttachMoney, 
  MdNotes, 
  MdAssignmentReturn 
} from "react-icons/md";

export default function BorrowSection() {
  const { transactions, addTransaction } = useTransactions();

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
      type: "borrow", // Tagged as borrow
      amount: Number(form.amount),
      person: form.borrowedFrom,
      date: form.date,
      dueDate: form.dueDate,
      note: form.notes,
      status: "Pending",
    };

    addTransaction(newTransaction);

    // Reset Form
    setForm({
      borrowedFrom: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      notes: "",
    });
  };

  return (
    <main className="ml-52 pt-20 px-6 pb-6 h-screen  bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col h-full gap-6">
        
        {/* HEADER */}
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Borrowed Money</h2>
          <p className="text-sm text-slate-500">Track debts and repayments to others</p>
        </div>

        {/* SIDE-BY-SIDE CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0 ">
          
          {/* LEFT: FORM (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col">
            <h3 className="font-semibold mb-4 dark:text-white text-red-500">Add New Debt</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto pr-1">
              <Input 
                label="Borrowed From" 
                name="borrowedFrom" 
                value={form.borrowedFrom} 
                onChange={handleChange} 
                icon={<MdPerson />} 
                placeholder="Lender's name" 
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
                  label="Due Date" 
                  name="dueDate" 
                  value={form.dueDate} 
                  onChange={handleChange} 
                  icon={<MdCalendarToday />} 
                  type="date" 
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">NOTES</label>
                <div className="relative mt-1">
                  <MdNotes className="absolute left-3 top-3 text-red-400" />
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full pl-10 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-200 outline-none focus:ring-2 ring-red-500/20"
                    rows="3"
                    placeholder="What is this debt for?"
                  />
                </div>
              </div>

              <button type="submit" className="w-full h-12 mt-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-500/20">
                <MdAssignmentReturn className="text-xl" />
                Record Debt
              </button>
            </form>
          </div>

          {/* RIGHT: HISTORY (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold dark:text-white">Debt History</h3>
              <span className="text-xs font-medium px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-500 rounded">
                Outstanding
              </span>
            </div>

            {/* SCROLLABLE LIST */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {transactions.filter(t => t.type === "borrow").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <p className="text-sm italic">You have no recorded debts.</p>
                </div>
              ) : (
                transactions
                  .filter(t => t.type === "borrow")
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((t) => (
                    <BorrowItem key={t.id} transaction={t} />
                  ))
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

/* REUSABLE INPUT */
function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg">
          {icon}
        </span>
        <input
          {...props}
          className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-100 outline-none focus:ring-2 ring-red-500/20 transition-all border border-transparent focus:border-red-500/50"
        />
      </div>
    </div>
  );
}

/* ITEM CARD */
function BorrowItem({ transaction }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-red-500/30 transition-all group">
      <div className="flex flex-col">
        <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-500 transition-colors">
          {transaction.person}
        </p>
        <div className="flex gap-3 items-center">
          <p className="text-xs text-slate-500">{transaction.date}</p>
          {transaction.dueDate && (
            <p className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
              Due: {transaction.dueDate}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-red-500 text-lg">₹{transaction.amount.toLocaleString()}</p>
        <p className="text-[10px] text-slate-400 uppercase tracking-wider">{transaction.status}</p>
      </div>
    </div>
  );
}