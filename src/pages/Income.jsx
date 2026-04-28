// import { useState, useEffect } from "react";
// export default function AddIncome({ transactions, setTransactions }) {

//   const [form, setForm] = useState({
//     amount: "",
//     category: "Salary",
//     date: new Date().toISOString().split("T")[0],
//     note: "",
//     person: "",
//   });

//   // useEffect(() => {
//   //   const saved = JSON.parse(localStorage.getItem("incomes")) || [];
//   //   setIncomes(saved);
//   // }, []);

//   // useEffect(() => {
//   //   localStorage.setItem("incomes", JSON.stringify(incomes));
//   // }, [incomes]);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.amount) {
//       alert("Amount is required");
//       return;
//     }

//     const newTransaction = {
//       id: Date.now().toString(),
//       type: "income", //  IMPORTANT
//       amount: Number(form.amount),
//       category: form.category,
//       date: form.date,
//       note: form.note,
//       person: form.person || null,
//     };

//     setTransactions((prev) => [...prev, newTransaction]);

//     setForm({
//       amount: "",
//       category: "Salary",
//       date: new Date().toISOString().split("T")[0],
//       note: "",
//       person: "",
//     });
//   };

//   return (
//     <main className="ml-52 pt-20 px-6 pb-4 h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden dark:text-slate-400 ">
//       <div className="max-w-6xl mx-auto">
//         {/* Heading */}


//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  items-start">
//           {/* FORM SECTION */}

//           <div className="lg:col-span-2 space-y-6">
//             <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-md dark:shadow-none border border-slate-100 dark:border-slate-800">
//               <h2 className="text-2xl font-bold text-on-surface dark:text-white">
//                 Add Income
//               </h2>
//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 {/* AMOUNT */}
//                 <div className="space-y-1">
//                   <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
//                     AMOUNT
//                   </label>

//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xl font-bold">
//                       $
//                     </span>

//                     <input
//                       type="number"
//                       name="amount"
//                       value={form.amount}
//                       onChange={handleChange}
//                       placeholder="0.00"
//                       className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-xl font-semibold
//                       border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
//                     />
//                   </div>
//                 </div>

//                 {/* CATEGORY + DATE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
//                       CATEGORY
//                     </label>

//                     <select
//                       name="category"
//                       value={form.category}
//                       onChange={handleChange}
//                       className="w-full h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800
//                     border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
//                     >
//                       <option>Salary</option>
//                       <option>Freelance</option>
//                       <option>Gift</option>
//                       <option>Investments</option>
//                       <option>Refund</option>
//                       <option>Other</option>
//                     </select>
//                   </div>

//                   <div className="space-y-1">
//                     <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
//                       DATE
//                     </label>

//                     <input
//                       type="date"
//                       name="date"
//                       value={form.date}
//                       onChange={handleChange}
//                       className="w-full h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800
//                       border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
//                     />
//                   </div>
//                 </div>

//                 {/* NOTES */}
//                 <div className="space-y-1 dark:text-slate-400">
//                   <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 ">
//                     NOTES (OPTIONAL)
//                   </label>

//                   <textarea
//                     name="note"
//                     value={form.note}
//                     onChange={handleChange}
//                     rows="3"
//                     placeholder="Describe where this income came from..."
//                     className="w-full p-4 rounded-lg bg-slate-100 dark:bg-slate-800
//                     border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition dark:text-slate-400"
//                   />
//                 </div>

//                 {/* BUTTONS */}
//                 <div className="flex flex-col md:flex-row gap-4 pt-1">
//                   <button
//                     type="submit"
//                     className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-full
//                     transition active:scale-95"
//                   >
//                     Confirm Income
//                   </button>

//                   <button
//                     type="button"
//                     className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-800
//                     text-slate-700 dark:text-slate-300 font-semibold hover:opacity-80 transition"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </section>

//             {/* INFO BOX */}
//             {/* <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex gap-4">
//               <span className="text-emerald-600 text-2xl">ℹ️</span>
//               <div>
//                 <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">
//                   Did you know?
//                 </h4>
//                 <p className="text-sm text-emerald-700 dark:text-emerald-400">
//                   Categorizing income helps improve financial insights and forecasting accuracy.
//                 </p>
//               </div>
//             </div> */}
//           </div>

//           {/* SIDE CARD */}
   
//          <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden h-3/4 ">
//           <div className="p-4 border-b border-slate-200 dark:border-slate-800">
//   <h3 className="text-lg font-bold text-slate-800 dark:text-white">
//     Recent Incomes
//   </h3>
// </div>

//             <div className="flex flex-col gap-3">
//               {transactions
//                 .filter((t) => t.type === "income")
//                 .slice(-5)
//                 .reverse()
//                 .map((t) => (
//                   <TransactionItem
//                     key={t.id}
//                     title={t.category}
//                     amount={`+ $${t.amount}`}
//                     positive
//                     date={t.date}
//                   />
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// function TransactionItem({ title, amount, positive, date }) {
//   return (
//     <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition border-b border-slate-100 dark:border-slate-800 last:border-none">

//       {/* LEFT SIDE */}
//       <div className="flex flex-col">
//         <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
//           {title}
//         </p>

//         <p className="text-xs text-slate-500 dark:text-slate-400">
//           {date}
//         </p>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className={`text-sm font-semibold ${
//         positive ? "text-emerald-500" : "text-red-500"
//       }`}>
//         {amount}
//       </div>

//     </div>
//   );
// }


import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; // 1. Import the hook

export default function AddIncome() {
  // 2. Consume the context
  const { transactions, setTransactions } = useTransactions();

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
      type: "income",
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note,
      person: form.person || null,
    };

    // 3. Update global state
    setTransactions((prev) => [...prev, newTransaction]);

    setForm({
      amount: "",
      category: "Salary",
      date: new Date().toISOString().split("T")[0],
      note: "",
      person: "",
    });
  };

  return (
    <main className="ml-52 pt-20 px-6 pb-4 h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden dark:text-slate-400 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          
          {/* FORM SECTION */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-md dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-4">
                Add Income
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* AMOUNT */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    AMOUNT
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xl font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-xl font-semibold
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
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
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
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
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
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
                    border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition dark:text-slate-400"
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
          <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden h-3/4 ">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Recent Incomes
              </h3>
            </div>

            <div className="flex flex-col">
              {transactions
                .filter((t) => t.type === "income")
                .slice(-5)
                .reverse()
                .map((t) => (
                  <TransactionItem
                    key={t.id}
                    title={t.category}
                    amount={`+ $${t.amount}`}
                    positive
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